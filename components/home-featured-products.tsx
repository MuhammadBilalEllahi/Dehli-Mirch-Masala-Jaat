"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Product } from "@/lib/mock-data"
import { ProductCard } from "@/components/product-card"

export function HomeFeaturedProducts({ products }: { products: Product[] }) {
  const scroller = useRef<HTMLDivElement>(null)
  const scrollBy = (dir: "left" | "right") => {
    const el = scroller.current
    if (!el) return
    const amount = el.clientWidth * 0.9
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" })
  }

  return (
    <div className="relative">
      <div
        ref={scroller}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2"
      >
        {products.map((p) => (
          <div key={p.id} className="min-w-[260px] md:min-w-[280px] snap-start">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
      <div className="hidden md:block">
        <button
          aria-label="Scroll left"
          onClick={() => scrollBy("left")}
          className="absolute -left-3 top-1/2 -translate-y-1/2 rounded-full border bg-white p-2 shadow"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="Scroll right"
          onClick={() => scrollBy("right")}
          className="absolute -right-3 top-1/2 -translate-y-1/2 rounded-full border bg-white p-2 shadow"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
