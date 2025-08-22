"use client"

import { useCart } from "@/lib/cart-store"
import type { Product } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Heart } from 'lucide-react'
import { useWishlist } from "@/lib/wishlist-store"
import { Input } from "@/components/ui/input"

export function AddToCartSection({ product }: { product: Product }) {
  const { add } = useCart()
  const { toggle, has } = useWishlist()
  const [qty, setQty] = useState(1)

  // Track recently viewed
  useEffect(() => {
    const raw = localStorage.getItem("dm-viewed") ?? "[]"
    const ids = new Set<string>(JSON.parse(raw))
    ids.add(product.id)
    localStorage.setItem("dm-viewed", JSON.stringify(Array.from(ids)))
  }, [product.id])

  return (
    <div className="mt-4">
      <div className="flex items-center gap-3">
        <Input
          type="number"
          min={1}
          className="w-20"
          value={qty}
          onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
        />
        <Button className="bg-green-600 hover:bg-green-700" onClick={() => add(product, qty)}>
          Add to Cart
        </Button>
        <button onClick={() => toggle(product)} className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm">
          <Heart className={`h-4 w-4 ${has(product.id) ? "text-red-600 fill-red-600" : ""}`} />
          Wishlist
        </button>
      </div>

      {/* Mobile sticky bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-white/95 p-3 md:hidden">
        <div className="container mx-auto flex items-center gap-2">
          <div className="font-semibold text-red-600">${product.price.toFixed(2)}</div>
          <Button className="ml-auto w-full bg-green-600 hover:bg-green-700" onClick={() => addItem(product, qty)}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}
