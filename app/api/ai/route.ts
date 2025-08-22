import { NextResponse } from "next/server"
import { generateText } from "ai"
import { xai } from "@ai-sdk/xai"

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const { prompt } = body as { prompt?: string }

  if (!prompt || prompt.trim().length === 0) {
    return NextResponse.json({ ok: false, text: "Please provide a prompt." }, { status: 400 })
  }

  if (!process.env.XAI_API_KEY) {
    const canned =
      "Based on your taste, try Medium spice. Recipe tip: Toast whole spices in a dry pan until fragrant, then grind and add towards the end for maximum aroma."
    return NextResponse.json({ ok: true, text: canned })
  }

  try {
    const { text } = await generateText({
      model: xai("grok-3"),
      system:
        "You are a helpful spice sommelier. Keep answers short, actionable, and specific to South Asian cooking.",
      prompt,
    })
    return NextResponse.json({ ok: true, text })
  } catch (e) {
    return NextResponse.json(
      { ok: false, text: "AI service is currently unavailable. Please try again later." },
      { status: 500 }
    )
  }
}
