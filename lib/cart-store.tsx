// "use client"

// import { createContext, useContext, useEffect, useMemo, useReducer } from "react"

// type CartItem = {
//   id: string
//   title: string
//   price: number
//   image?: string
//   qty: number
// }

// type State = {
//   items: CartItem[]
// }

// type Action =
//   | { type: "ADD"; payload: { item: Omit<CartItem, "qty">; qty: number } }
//   | { type: "REMOVE"; payload: { id: string } }
//   | { type: "UPDATE_QTY"; payload: { id: string; qty: number } }
//   | { type: "CLEAR" }
//   | { type: "HYDRATE"; payload: State }

// const CartCtx = createContext<{
//   items: CartItem[]
//   add: (item: Omit<CartItem, "qty">, qty?: number) => void
//   remove: (id: string) => void
//   updateQty: (id: string, qty: number) => void
//   clear: () => void
//   count: number
//   subtotal: number
// }>({
//   items: [],
//   add: () => {},
//   remove: () => {},
//   updateQty: () => {},
//   clear: () => {},
//   count: 0,
//   subtotal: 0,
// })

// const STORAGE_KEY = "dm-cart"

// function normalizeStored(value: any): CartItem[] {
//   if (!value) return []
//   if (Array.isArray(value)) return value
//   if (typeof value === "object" && Array.isArray(value.items)) return value.items
//   return []
// }

// function reducer(state: State, action: Action): State {
//   switch (action.type) {
//     case "HYDRATE":
//       return action.payload
//     case "ADD": {
//       const { item, qty = 1 } = action.payload
//       const existing = state.items.find((i) => i.id === item.id)
//       if (existing) {
//         return {
//           items: state.items.map((i) => (i.id === item.id ? { ...i, qty: i.qty + qty } : i)),
//         }
//       }
//       return { items: [...state.items, { ...item, qty }] }
//     }
//     case "REMOVE":
//       return { items: state.items.filter((i) => i.id !== action.payload.id) }
//     case "UPDATE_QTY":
//       return {
//         items: state.items.map((i) => (i.id === action.payload.id ? { ...i, qty: Math.max(1, action.payload.qty) } : i)),
//       }
//     case "CLEAR":
//       return { items: [] }
//     default:
//       return state
//   }
// }

// export function CartProvider({ children }: { children: React.ReactNode }) {
//   const [state, dispatch] = useReducer(reducer, { items: [] })

//   // hydrate
//   useEffect(() => {
//     try {
//       const raw = localStorage.getItem(STORAGE_KEY)
//       const parsed = raw ? JSON.parse(raw) : null
//       const items = normalizeStored(parsed)
//       dispatch({ type: "HYDRATE", payload: { items } })
//     } catch {
//       dispatch({ type: "HYDRATE", payload: { items: [] } })
//     }
//   }, [])

//   // persist
//   useEffect(() => {
//     try {
//       const items = Array.isArray(state.items) ? state.items : []
//       localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
//     } catch {
//       // ignore
//     }
//   }, [state.items])

//   const add = (item: Omit<CartItem, "qty">, qty = 1) => dispatch({ type: "ADD", payload: { item, qty } })
//   const remove = (id: string) => dispatch({ type: "REMOVE", payload: { id } })
//   const updateQty = (id: string, qty: number) => dispatch({ type: "UPDATE_QTY", payload: { id, qty } })
//   const clear = () => dispatch({ type: "CLEAR" })

//   const { count, subtotal } = useMemo(() => {
//     const items = Array.isArray(state.items) ? state.items : []
//     const c = items.reduce((sum, i) => sum + i.qty, 0)
//     const s = items.reduce((sum, i) => sum + i.qty * i.price, 0)
//     return { count: c, subtotal: s }
//   }, [state.items])

//   return (
//     <CartCtx.Provider value={{ items: state.items, add, remove, updateQty, clear, count, subtotal }}>
//       {children}
//     </CartCtx.Provider>
//   )
// }

// export function useCart() {
//   const ctx = useContext(CartCtx)
//   if (!ctx) throw new Error("useCart must be used within CartProvider")
//   return ctx
// }


"use client"

import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react"

export type CartItem = {
  id: string
  title: string
  price: number
  image?: string
  qty: number
}

type State = {
  items: CartItem[]
}

type Action =
  | { type: "ADD"; payload: { item: Omit<CartItem, "qty">; qty: number } }
  | { type: "REMOVE"; payload: { id: string } }
  | { type: "UPDATE_QTY"; payload: { id: string; qty: number } }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; payload: State }

const CartCtx = createContext<{
  items: CartItem[]
  add: (item: Omit<CartItem, "qty">, qty?: number) => void
  remove: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clear: () => void
  count: number
  subtotal: number
  isAdding: boolean
}>({
  items: [],
  add: () => {},
  remove: () => {},
  updateQty: () => {},
  clear: () => {},
  count: 0,
  subtotal: 0,
  isAdding: false,
})

const STORAGE_KEY = "dm-cart"

function normalizeStored(value: any): CartItem[] {
  if (!value) return []
  if (Array.isArray(value)) return value
  if (typeof value === "object" && Array.isArray(value.items)) return value.items
  return []
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "HYDRATE":
      return action.payload
    case "ADD": {
      const { item, qty = 1 } = action.payload
      const existing = state.items.find((i) => i.id === item.id)
      if (existing) {
        return {
          items: state.items.map((i) => (i.id === item.id ? { ...i, qty: i.qty + qty } : i)),
        }
      }
      return { items: [...state.items, { ...item, qty }] }
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.id !== action.payload.id) }
    case "UPDATE_QTY":
      return {
        items: state.items.map((i) => (i.id === action.payload.id ? { ...i, qty: Math.max(1, action.payload.qty) } : i)),
      }
    case "CLEAR":
      return { items: [] }
    default:
      return state
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] })
  const [isHydrated, setIsHydrated] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  // hydrate
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const parsed = raw ? JSON.parse(raw) : null
      const items = normalizeStored(parsed)
      dispatch({ type: "HYDRATE", payload: { items } })
      setIsHydrated(true)
    } catch (error) {
      console.error("Error hydrating cart:", error)
      dispatch({ type: "HYDRATE", payload: { items: [] } })
      setIsHydrated(true)
    }
  }, [])

  // persist
  useEffect(() => {
    if (!isHydrated) return // Don't persist until hydration is complete
    try {
      const items = Array.isArray(state.items) ? state.items : []
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch (error) {
      console.error("Error persisting cart:", error)
    }
  }, [state.items, isHydrated])

  const add = (item: Omit<CartItem, "qty">, qty = 1) => {
    if (isAdding) return // Prevent duplicate additions
    setIsAdding(true)
    dispatch({ type: "ADD", payload: { item, qty } })
    // Reset the flag after a short delay to prevent rapid clicks
    setTimeout(() => setIsAdding(false), 500)
  }
  
  const remove = (id: string) => dispatch({ type: "REMOVE", payload: { id } })
  const updateQty = (id: string, qty: number) => dispatch({ type: "UPDATE_QTY", payload: { id, qty } })
  const clear = () => dispatch({ type: "CLEAR" })

  const { count, subtotal } = useMemo(() => {
    const items = Array.isArray(state.items) ? state.items : []
    const c = items.reduce((sum, i) => sum + i.qty, 0)
    const s = items.reduce((sum, i) => sum + i.qty * i.price, 0)
    return { count: c, subtotal: s }
  }, [state.items])

  return (
    <CartCtx.Provider value={{ items: state.items, add, remove, updateQty, clear, count, subtotal, isAdding }}>
      {children}
    </CartCtx.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartCtx)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
