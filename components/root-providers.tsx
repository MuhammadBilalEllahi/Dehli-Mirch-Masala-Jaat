"use client"

import { CartProvider } from "@/lib/cart-store"
import { WishlistProvider } from "@/lib/wishlist-store"
import { ReactNode, useEffect } from "react"

export function RootProviders({ children }: { children: ReactNode }) {
  // prevent hydration issues by ensuring client-only providers after mount if necessary
  // Here we render immediately; providers are safe for SSR as they are client components.
  return (
    <CartProvider>
      <WishlistProvider>{children}</WishlistProvider>
    </CartProvider>
  )
}
