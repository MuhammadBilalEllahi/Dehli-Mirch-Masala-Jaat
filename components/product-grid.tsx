"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { ProductCard } from "./product-card"
import { cn } from "@/lib/utils"
import type { Product } from "@/lib/mock-data"

export function ProductGrid({
  products = [],
  view = "grid",
  pageSize = 12,
  enableInfinite = true,
}: {
  products?: Product[]
  view?: "grid" | "list"
  pageSize?: number
  enableInfinite?: boolean
}) {
  const [page, setPage] = useState(1)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setPage(1)
  }, [JSON.stringify(products)])

  useEffect(() => {
    if (!enableInfinite) return
    const el = sentinelRef.current
    if (!el) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setPage((p) => p + 1)
        }
      })
    })
    io.observe(el)
    return () => io.disconnect()
  }, [enableInfinite, sentinelRef])

  const paged = useMemo(() => {
    return products.slice(0, page * pageSize)
  }, [products, page, pageSize])

  return (
    <div>
      {view === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {paged.map((p) => (
            <ProductCard key={p.id} product={p} variant="grid" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {paged.map((p) => (
            <ProductCard key={p.id} product={p} variant="list" />
          ))}
        </div>
      )}

      {paged.length < products.length && (
        <div className={cn("mt-6 flex items-center justify-center", enableInfinite ? "opacity-70" : "")}>
          {enableInfinite ? (
            <div ref={sentinelRef} className="h-8 w-8 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
          ) : (
            <button
              onClick={() => setPage((p) => p + 1)}
              className="rounded-md border px-4 py-2 text-sm"
            >
              Load more
            </button>
          )}
        </div>
      )}
    </div>
  )
}
