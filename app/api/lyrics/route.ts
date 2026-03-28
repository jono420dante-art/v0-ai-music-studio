import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  try {
    const { prompt, genre, mood } = await req.json()

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY not set in Vercel Environment Variables" },
        { status: 500 }
      )
    }

    const moodStr = Array.isArray(mood) ? mood.join(", ") : mood || "energetic"

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are a professional songwriter. Write complete song lyrics with [Verse 1], [Chorus], [Verse 2], and [Bridge] sections. Style: ${genre || "Pop"}, Mood: ${moodStr}. Output ONLY the lyrics, no extra commentary.`,
          },
          {
            role: "user",
            content: `Write a song about: ${prompt || "life, love and music"}`,
          },
        ],
        max_tokens: 600,
        temperature: 0.85,
      }),
    })

    const data = await res.json()
    const lyrics = data.choices?.[0]?.message?.content || ""
    return NextResponse.json({ lyrics })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
