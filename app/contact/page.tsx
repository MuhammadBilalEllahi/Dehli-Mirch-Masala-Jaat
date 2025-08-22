"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <form
        className="max-w-xl space-y-3"
        onSubmit={(e) => {
          e.preventDefault()
          alert("Thanks! We'll get back to you.")
        }}
      >
        <Input placeholder="Your name" required />
        <Input type="email" placeholder="you@example.com" required />
        <Textarea placeholder="How can we help?" required />
        <Button className="bg-red-600 hover:bg-red-700">Send</Button>
      </form>
    </div>
  )
}
