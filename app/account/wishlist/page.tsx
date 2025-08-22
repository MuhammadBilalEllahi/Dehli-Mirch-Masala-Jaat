"use client"

import { useWishlist } from "@/lib/wishlist-store"
import Link from "next/link"

export default function WishlistPage() {
  const { list } = useWishlist()
  if (list.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Wishlist</h1>
        <p>Your wishlist is empty.</p>
        <Link href="/category/all" className="text-red-600 underline mt-2 inline-block">
          Browse products
        </Link>
      </div>
    )
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Wishlist</h1>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((p) => (
          <li key={p.id} className="rounded border p-3">
            <img
              src={p.image || "/placeholder.svg?height=128&width=224&query=wishlist image"}
              alt={p.title}
              className="h-32 w-full object-cover rounded"
            />
            <div className="mt-2 font-medium line-clamp-1">{p.title}</div>
            <div className="text-sm">${p.price.toFixed(2)}</div>
            <Link href={`/product/${p.slug}`} className="mt-2 inline-block text-red-600 underline">
              View
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
