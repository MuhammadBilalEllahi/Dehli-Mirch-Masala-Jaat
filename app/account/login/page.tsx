"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault()
          setIsLoading(true)
          setTimeout(() => setIsLoading(false), 800)
        }}
      >
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required placeholder="you@example.com" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required placeholder="••••••••" />
        </div>
        <Button disabled={isLoading} className="w-full bg-red-600 hover:bg-red-700">
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
      <p className="mt-3 text-sm">
        New here?{" "}
        <Link href="/account/signup" className="text-red-600 underline">
          Create an account
        </Link>
      </p>
    </div>
  )
}
