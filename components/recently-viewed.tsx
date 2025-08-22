"use client"

import { useEffect, useState } from "react"
import { getAllProducts, type Product } from "@/lib/data"
import { ProductCard } from "./product-card"

export function RecentlyViewed({ currentId }: { currentId: string }) {
  const [items, setItems] = useState<Product[]>([])

  useEffect(() => {
    ;(async () => {
      const all = await getAllProducts()
      const raw = localStorage.getItem("dm-viewed") ?? "[]"
      const ids = (JSON.parse(raw) as string[]).filter((id) => id !== currentId)
      const mapped = all.filter((p) => ids.includes(p.id)).slice(-4).reverse()
      setItems(mapped)
    })()
  }, [currentId])

  if (items.length === 0) return null

  return (
    <div className="container mx-auto px-0">
      <h2 className="text-xl font-semibold mb-4">Recently Viewed</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}
