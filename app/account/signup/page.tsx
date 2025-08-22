"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-bold mb-4">Create Account</h1>
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault()
          setIsLoading(true)
          setTimeout(() => setIsLoading(false), 800)
        }}
      >
        <div>
          <Label htmlFor="name">Full name</Label>
          <Input id="name" required placeholder="Your name" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required placeholder="you@example.com" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required placeholder="••••••••" />
        </div>
        <Button disabled={isLoading} className="w-full bg-green-600 hover:bg-green-700">
          {isLoading ? "Creating..." : "Create account"}
        </Button>
      </form>
      <p className="mt-3 text-sm">
        Already have an account?{" "}
        <Link href="/account/login" className="text-red-600 underline">
          Login
        </Link>
      </p>
    </div>
  )
}
