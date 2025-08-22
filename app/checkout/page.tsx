"use client"

import { useCart } from "@/lib/cart-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [method, setMethod] = useState("cod")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      const orderId = "DM" + Math.floor(Math.random() * 1_000_000).toString()
      clear()
      router.push(`/order/success?orderId=${orderId}`)
    }, 1200)
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <p>Your cart is empty.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section className="rounded-lg border p-4">
            <h2 className="font-semibold mb-3">Contact</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input id="name" required placeholder="Your name" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required placeholder="you@example.com" />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" required placeholder="+92 3XX XXXXXXX" />
              </div>
            </div>
          </section>

          <section className="rounded-lg border p-4">
            <h2 className="font-semibold mb-3">Delivery</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" required placeholder="Street address" />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" required />
              </div>
              <div>
                <Label htmlFor="postal">Postal code</Label>
                <Input id="postal" required />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input id="country" required defaultValue="Pakistan" />
              </div>
            </div>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Estimated delivery: 2–4 business days
            </p>
          </section>

          <section className="rounded-lg border p-4">
            <h2 className="font-semibold mb-3">Payment</h2>
            <RadioGroup defaultValue={method} onValueChange={setMethod}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="jazzcash" id="jazzcash" />
                <Label htmlFor="jazzcash">JazzCash</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="easypaisa" id="easypaisa" />
                <Label htmlFor="easypaisa">Easypaisa</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cod" id="cod" />
                <Label htmlFor="cod">Cash on Delivery</Label>
              </div>
            </RadioGroup>
          </section>
        </div>

        <aside className="rounded-lg border p-4 h-fit">
          <h2 className="font-semibold mb-3">Order Summary</h2>
          <ul className="space-y-2 text-sm max-h-64 overflow-auto pr-2">
            {items.map((it) => (
              <li key={it.id} className="flex items-center justify-between">
                <span className="line-clamp-1">
                  {it.title} × {it.qty}
                </span>
                <span>${(it.qty * it.price).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-center justify-between">
            <span>Subtotal</span>
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Delivery</span>
            <span className="font-semibold">${subtotal > 50 ? "0.00" : "4.99"}</span>
          </div>
          <Button type="submit" disabled={isSubmitting} className="mt-4 w-full bg-green-600 hover:bg-green-700">
            {isSubmitting ? "Placing order..." : "Confirm Order"}
          </Button>
        </aside>
      </form>
    </div>
  )
}
