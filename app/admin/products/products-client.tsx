"use client"

import type { Product } from "@/lib/data"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ProductsAdmin({ initial }: { initial: Product[] }) {
  const [items, setItems] = useState(initial)
  const [q, setQ] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [draft, setDraft] = useState<Partial<Product>>({ title: "", price: 0, brand: "", category: "" })

  const filtered = useMemo(
    () => items.filter((p) => p.title.toLowerCase().includes(q.toLowerCase())),
    [items, q]
  )

  const addProduct = () => {
    if (!draft.title || !draft.price) return
    const slug = String(draft.title).toLowerCase().replace(/\s+/g, "-")
    const id = "p" + Math.random().toString(36).slice(2, 8)
    const product: Product = {
      id,
      slug,
      title: draft.title as string,
      price: Number(draft.price),
      image: draft.image || "/new-product-launch.png",
      images: [draft.image || "/new-product-launch.png"],
      brand: (draft.brand as string) || "Delhi Mirch",
      category: (draft.category as string) || "Spices",
      spiceLevel: Number(draft.spiceLevel ?? 3),
      vegetarian: draft.vegetarian ?? true,
      rating: 0,
      ingredients: draft.ingredients || "",
      instructions: draft.instructions || "",
      reviews: [],
    }
    setItems((prev) => [product, ...prev])
    setShowForm(false)
    setDraft({ title: "", price: 0, brand: "", category: "" })
  }

  const remove = (id: string) => setItems((prev) => prev.filter((p) => p.id !== id))

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Products</h2>
        <div className="flex items-center gap-2">
          <Input placeholder="Search products" value={q} onChange={(e) => setQ(e.target.value)} />
          <Button className="bg-green-600 hover:bg-green-700" onClick={() => setShowForm((s) => !s)}>
            {showForm ? "Close" : "Add Product"}
          </Button>
        </div>
      </div>

      {showForm && (
        <div className="mb-4 rounded-lg border p-4">
          <h3 className="font-semibold mb-2">New Product</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <Input placeholder="Title" value={draft.title ?? ""} onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))} />
            <Input type="number" step="0.01" placeholder="Price" value={draft.price ?? 0} onChange={(e) => setDraft((d) => ({ ...d, price: Number(e.target.value) }))} />
            <Input placeholder="Brand" value={draft.brand ?? ""} onChange={(e) => setDraft((d) => ({ ...d, brand: e.target.value }))} />
            <Input placeholder="Category" value={draft.category ?? ""} onChange={(e) => setDraft((d) => ({ ...d, category: e.target.value }))} />
            <Input type="number" min={1} max={5} placeholder="Spice Level (1-5)" value={draft.spiceLevel ?? 3} onChange={(e) => setDraft((d) => ({ ...d, spiceLevel: Number(e.target.value) }))} />
            <Input placeholder="Image URL" value={draft.image ?? ""} onChange={(e) => setDraft((d) => ({ ...d, image: e.target.value }))} />
            <Textarea placeholder="Ingredients" value={draft.ingredients ?? ""} onChange={(e) => setDraft((d) => ({ ...d, ingredients: e.target.value }))} />
            <Textarea placeholder="Instructions" value={draft.instructions ?? ""} onChange={(e) => setDraft((d) => ({ ...d, instructions: e.target.value }))} />
          </div>
          <div className="mt-3">
            <Button className="bg-red-600 hover:bg-red-700" onClick={addProduct}>Save Product</Button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded border">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-50 dark:bg-neutral-900/40">
            <tr>
              <th className="text-left p-3">Title</th>
              <th className="text-left p-3">Brand</th>
              <th className="text-left p-3">Category</th>
              <th className="text-left p-3">Price</th>
              <th className="text-left p-3">Spice</th>
              <th className="text-left p-3">Inventory</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3">{p.title}</td>
                <td className="p-3">{p.brand}</td>
                <td className="p-3">{p.category}</td>
                <td className="p-3">${p.price.toFixed(2)}</td>
                <td className="p-3">{p.spiceLevel}/5</td>
                <td className="p-3">—</td>
                <td className="p-3">
                  <button className="text-red-600 hover:underline" onClick={() => remove(p.id)}>Remove</button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="p-4 text-center text-neutral-500">No products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-neutral-500">Note: This is a placeholder. Wire to your CMS or DB to persist changes.</p>
    </div>
  )
}
