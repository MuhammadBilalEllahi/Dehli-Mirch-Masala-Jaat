"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Package, Truck, Clock } from 'lucide-react'

const steps = [
  { key: "received", title: "Order Received", icon: Clock },
  { key: "processing", title: "Processing", icon: Package },
  { key: "shipped", title: "Shipped", icon: Truck },
  { key: "delivered", title: "Delivered", icon: CheckCircle2 },
] as const

export default function TrackOrderPage() {
  const [order, setOrder] = useState("")
  const [progress, setProgress] = useState<number | null>(null)

  const onTrack = () => {
    if (!order) return
    setProgress(Math.floor(Math.random() * steps.length))
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-2">Track Your Order</h1>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">Enter your order ID to view status.</p>
      <div className="flex max-w-lg gap-2">
        <Input placeholder="e.g., DM123456" value={order} onChange={(e) => setOrder(e.target.value)} />
        <Button onClick={onTrack} className="bg-red-600 hover:bg-red-700">
          Track
        </Button>
      </div>

      {progress !== null && (
        <div className="mt-10">
          <ol className="relative border-s pl-6">
            {steps.map((s, idx) => {
              const Icon = s.icon
              const done = idx <= progress
              return (
                <li key={s.key} className="mb-10 ms-6">
                  <span
                    className={`absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-white ${
                      done ? "bg-green-600 text-white" : "bg-neutral-200 text-neutral-600"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <h3 className={`font-medium leading-tight ${done ? "" : "opacity-70"}`}>{s.title}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{done ? "Completed" : "Pending"}</p>
                </li>
              )
            })}
          </ol>
        </div>
      )}
    </div>
  )
}
