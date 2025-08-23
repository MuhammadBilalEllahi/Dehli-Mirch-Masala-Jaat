"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function HomeNewsletter() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder submit
    setSent(true)
    setTimeout(() => setSent(false), 2500)
    setEmail("")
  }

  return (
    <form onSubmit={onSubmit} className="max-w-lg">
      <div className="text-sm mb-2">Get spicy offers and recipes in your inbox.</div>
      <div className="flex gap-2">
        <Input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button className="bg-orange-600 hover:bg-orange-700">{sent ? "Subscribed" : "Subscribe"}</Button>
      </div>
    </form>
  )
}

export function NewsletterInline() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setSent(true)
        setTimeout(() => setSent(false), 2500)
        setEmail("")
      }}
      className="space-y-2"
    >
      <Input
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button className="w-full bg-orange-600 hover:bg-orange-700">{sent ? "Thanks!" : "Subscribe"}</Button>
    </form>
  )
}
