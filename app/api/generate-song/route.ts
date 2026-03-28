import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"
export const maxDuration = 60

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
    const fullPrompt = `${genre || "Pop"} song, ${moodStr} mood, ${bpm || 120} BPM. ${prompt || ""}`

    // ── Try Suno API ──
    if (process.env.SUNO_API_KEY) {
      const tags = `${genre || "pop"}, ${moodStr}, ${bpm || 120}bpm`
      try {
        const sunoRes = await fetch("https://studio-api.suno.ai/api/generate/v2/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.SUNO_API_KEY}`,
          },
          body: JSON.stringify({
            gpt_description_prompt: prompt || fullPrompt,
            tags,
            make_instrumental: false,
            mv: "chirp-v3-5",
          }),
        })
        if (sunoRes.ok) {
          const data = await sunoRes.json()
          const clip = Array.isArray(data) ? data[0] : data?.clips?.[0] || data
          if (clip?.audio_url) {
            return NextResponse.json({
              audioUrl: clip.audio_url,
              title: clip.title || `${genre || "Track"}`,
              genre: genre || "Pop",
              bpm: bpm || 120,
              duration: duration || 30,
              lyrics: clip.metadata?.prompt || "",
              model: "Suno AI",
              generatedAt: new Date().toISOString(),
            })
          }
        }
      } catch (e) {
        console.warn("Suno failed, trying fallback", e)
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
