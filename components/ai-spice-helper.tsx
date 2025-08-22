"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function AISpiceHelper({ productTitle }: { productTitle: string }) {
  const [prompt, setPrompt] = useState(`Suggest spice level and a quick recipe tip for ${productTitle}.`)
  const [answer, setAnswer] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const run = async () => {
    setLoading(true)
    setAnswer(null)
    try {
      const res = await fetch("/api/ai", { method: "POST", body: JSON.stringify({ prompt }) })
      const data = await res.json()
      setAnswer(data?.text ?? "No suggestion available.")
    } catch {
      setAnswer("AI service unavailable right now.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-lg border p-4">
      <h3 className="font-semibold mb-2">AI Spice Assistant</h3>
      <Textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      <Button onClick={run} className="mt-2 bg-orange-600 hover:bg-orange-700" disabled={loading}>
        {loading ? "Thinking..." : "Get Suggestion"}
      </Button>
      {answer && <p className="mt-3 text-sm">{answer}</p>}
    </div>
  )
}
