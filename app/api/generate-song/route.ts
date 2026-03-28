import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"
export const maxDuration = 60

const KIE_API_BASE = "https://api.kie.ai/api/v1"

async function pollForResult(taskId: string, apiKey: string, maxWait = 50000): Promise<any> {
  const start = Date.now()
  while (Date.now() - start < maxWait) {
    await new Promise((r) => setTimeout(r, 5000))
    const res = await fetch(`${KIE_API_BASE}/generate/record-info?taskId=${taskId}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    })
    if (!res.ok) continue
    const json = await res.json()
    const status = json?.data?.status
    if (status === "SUCCESS" || status === "FIRST_SUCCESS") return json.data
    if (status?.includes("FAILED") || status?.includes("ERROR")) throw new Error(status)
  }
  throw new Error("Timed out waiting for song generation")
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { prompt, genre, mood, bpm, duration, audioQuality } = body

    if (!prompt && !genre) {
      return NextResponse.json(
        { error: "Please provide a prompt or genre" },
        { status: 400 }
      )
    }

    const moodStr = Array.isArray(mood) ? mood.join(", ") : mood || "energetic"
    const style = `${genre || "Pop"}, ${moodStr}, ${bpm || 120}bpm`
    const fullPrompt = `${genre || "Pop"} song, ${moodStr} mood, ${bpm || 120} BPM. ${prompt || ""}`

    // ── Try kie.ai Suno API ──
    if (process.env.SUNO_API_KEY) {
      try {
        const genRes = await fetch(`${KIE_API_BASE}/generate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.SUNO_API_KEY}`,
          },
          body: JSON.stringify({
            prompt: prompt || fullPrompt,
            customMode: false,
            instrumental: false,
            model: "V3_5",
            style,
            title: `${genre || "Track"} - ${moodStr}`,
            callBackUrl: "",
          }),
        })

        if (genRes.ok) {
          const genData = await genRes.json()
          const taskId = genData?.data?.taskId
          if (taskId) {
            const result = await pollForResult(taskId, process.env.SUNO_API_KEY)
            const track = result?.response?.sunoData?.[0]
            if (track?.audioUrl) {
              return NextResponse.json({
                audioUrl: track.audioUrl,
                title: track.title || `${genre || "Track"}`,
                genre: genre || "Pop",
                bpm: bpm || 120,
                duration: track.duration || duration || 30,
                lyrics: track.lyric || "",
                model: "Suno AI (kie.ai)",
                generatedAt: new Date().toISOString(),
              })
            }
          }
        }
      } catch (e) {
        console.warn("kie.ai Suno failed, trying OpenAI fallback", e)
      }
    }

    // ── OpenAI TTS fallback ──
    if (process.env.OPENAI_API_KEY) {
      const text = prompt || `A ${genre || "pop"} song with ${moodStr} vibes at ${bpm || 120} BPM`
      const ttsRes = await fetch("https://api.openai.com/v1/audio/speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "tts-1-hd",
          input: text,
          voice: "onyx",
          speed: 1.0,
        }),
      })
      if (ttsRes.ok) {
        const buffer = await ttsRes.arrayBuffer()
        const base64 = Buffer.from(buffer).toString("base64")
        return NextResponse.json({
          audioUrl: `data:audio/mpeg;base64,${base64}`,
          title: `${genre || "Track"} Preview`,
          genre: genre || "Pop",
          bpm: bpm || 120,
          duration: duration || 30,
          lyrics: text,
          model: "OpenAI TTS",
          generatedAt: new Date().toISOString(),
        })
      }
    }

    // ── No keys configured ──
    return NextResponse.json(
      {
        error: "No AI API keys configured. Add SUNO_API_KEY or OPENAI_API_KEY in Vercel Environment Variables.",
        setupGuide: "vercel.com -> your project -> Settings -> Environment Variables",
      },
      { status: 503 }
    )
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error"
    console.error("[generate-song]", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    configured: {
      suno: !!process.env.SUNO_API_KEY,
      openai: !!process.env.OPENAI_API_KEY,
    },
  })
}
