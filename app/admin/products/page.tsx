"use client"

import { useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { downloadCSV, parseCSVProducts } from "@/lib/csv"
import { getSampleProducts } from "@/lib/admin-sample"

type ProductDraft = {
  id?: string
  title: string
  description: string
  price: number
  quantity: number
  sku: string
  type: string
  ingredients: string
  instructions: string
  categories: string[]
  tags: string[]
  discount?: number
  image?: string
  images?: string[]
  seoTitle?: string
  seoDescription?: string
}

export default function ProductsAdminPage() {
  const initial = useMemo(()=>getSampleProducts(),[])
  const [items, setItems] = useState<ProductDraft[]>(initial)
  const [q, setQ] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<ProductDraft | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const filtered = useMemo(()=>items.filter(p=>p.title.toLowerCase().includes(q.toLowerCase())),[items,q])

  const resetDraft = (): ProductDraft => ({
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    sku: "",
    type: "Spice",
    ingredients: "",
    instructions: "",
    categories: ["Spices"],
    tags: [],
    discount: 0,
    image: "",
    images: [],
    seoTitle: "",
    seoDescription: "",
  })

  const [draft, setDraft] = useState<ProductDraft>(resetDraft())

  const openNew = () => { setEditing(null); setDraft(resetDraft()); setShowForm(true) }
  const openEdit = (p: ProductDraft) => { setEditing(p); setDraft(p); setShowForm(true) }

  const save = () => {
    if (!draft.title) return
    if (editing) {
      setItems(prev => prev.map(p => p === editing ? { ...draft } : p))
    } else {
      const id = "p"+Math.random().toString(36).slice(2,8)
      setItems(prev => [{...draft, id}, ...prev])
    }
    setShowForm(false)
  }

  const remove = (id?: string) => setItems(prev => prev.filter(p => p.id !== id))

  const onBulkCSV = async (f: File) => {
    const text = await f.text()
    const newItems = parseCSVProducts(text)
    setItems(prev => [...newItems, ...prev])
  }

  const exportCSV = () => {
    const rows = [
      ["title","description","price","quantity","sku","type","ingredients","instructions","categories","tags","discount","image"],
      ...items.map(p=>[
        p.title,p.description,p.price,p.quantity,p.sku,p.type,p.ingredients,p.instructions,
        p.categories.join("|"), p.tags.join("|"), p.discount ?? 0, p.image ?? ""
      ])
    ]
    downloadCSV(rows, "products.csv")
  }

  const imagePreview = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const file = e.target.files?.[0]; if(!file) return;
    const reader = new FileReader()
    reader.onload = () => setDraft(d=>({ ...d, image: reader.result as string }))
    reader.readAsDataURL(file)
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Product Management</CardTitle>
          <CardDescription>Add, edit, bulk upload, and manage inventory</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <Input placeholder="Search products..." value={q} onChange={(e)=>setQ(e.target.value)} />
            <div className="flex gap-2">
              <Button className="bg-green-600 hover:bg-green-700" onClick={openNew}>Add Product</Button>
              <Button variant="outline" onClick={()=>fileRef.current?.click()}>Bulk Upload (CSV)</Button>
              <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={(e)=>{const f=e.target.files?.[0]; if(f) onBulkCSV(f)}} />
              <Button variant="outline" onClick={exportCSV}>Export CSV</Button>
            </div>
          </div>

          {showForm && (
            <div className="rounded-lg border p-4 grid gap-3">
              <div className="grid md:grid-cols-2 gap-3">
                <Input placeholder="Title" value={draft.title} onChange={(e)=>setDraft(d=>({...d,title:e.target.value}))}/>
                <Input placeholder="SKU" value={draft.sku} onChange={(e)=>setDraft(d=>({...d,sku:e.target.value}))}/>
                <Input type="number" step="0.01" placeholder="Price" value={draft.price} onChange={(e)=>setDraft(d=>({...d,price:Number(e.target.value)}))}/>
                <Input type="number" placeholder="Quantity" value={draft.quantity} onChange={(e)=>setDraft(d=>({...d,quantity:Number(e.target.value)}))}/>
                <Input placeholder="Type" value={draft.type} onChange={(e)=>setDraft(d=>({...d,type:e.target.value}))}/>
                <Input placeholder="Categories (| separated)" value={draft.categories.join("|")} onChange={(e)=>setDraft(d=>({...d,categories:e.target.value.split("|").filter(Boolean)}))}/>
                <Input placeholder="Tags (| separated)" value={draft.tags.join("|")} onChange={(e)=>setDraft(d=>({...d,tags:e.target.value.split("|").filter(Boolean)}))}/>
                <Input type="number" placeholder="Discount %" value={draft.discount ?? 0} onChange={(e)=>setDraft(d=>({...d,discount:Number(e.target.value)}))}/>
              </div>
              <Textarea placeholder="Description" value={draft.description} onChange={(e)=>setDraft(d=>({...d,description:e.target.value}))}/>
              <div className="grid md:grid-cols-2 gap-3">
                <Textarea placeholder="Ingredients" value={draft.ingredients} onChange={(e)=>setDraft(d=>({...d,ingredients:e.target.value}))}/>
                <Textarea placeholder="Instructions" value={draft.instructions} onChange={(e)=>setDraft(d=>({...d,instructions:e.target.value}))}/>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <Input placeholder="SEO Title" value={draft.seoTitle ?? ""} onChange={(e)=>setDraft(d=>({...d,seoTitle:e.target.value}))}/>
                <Input placeholder="SEO Description" value={draft.seoDescription ?? ""} onChange={(e)=>setDraft(d=>({...d,seoDescription:e.target.value}))}/>
              </div>
              <div className="grid md:grid-cols-[1fr_auto] gap-3 items-center">
                <Input type="file" accept="image/*" onChange={imagePreview}/>
                {draft.image ? <img src={draft.image || "/placeholder.svg"} alt="Preview" className="h-16 w-16 rounded object-cover border" /> : <div className="text-xs text-neutral-500">Upload image</div>}
              </div>
              <div className="flex gap-2">
                <Button className="bg-red-600 hover:bg-red-700" onClick={save}>{editing ? "Save Changes" : "Save Product"}</Button>
                <Button variant="outline" onClick={()=>setShowForm(false)}>Cancel</Button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto rounded border">
            <table className="min-w-full text-sm">
              <thead className="bg-neutral-50 dark:bg-neutral-900/40">
                <tr>
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-left">SKU</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-left">Qty</th>
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p)=>(
                  <tr key={p.id ?? p.title+Math.random()} className="border-t">
                    <td className="p-3">{p.title}</td>
                    <td className="p-3">{p.sku}</td>
                    <td className="p-3">${Number(p.price).toFixed(2)}</td>
                    <td className="p-3">{p.quantity}</td>
                    <td className="p-3">{p.type}</td>
                    <td className="p-3">
                      <div className="flex gap-3">
                        <button className="text-green-700 hover:underline" onClick={()=>openEdit(p)}>Edit</button>
                        <button className="text-red-600 hover:underline" onClick={()=>remove(p.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!filtered.length && (
                  <tr><td colSpan={6} className="p-4 text-center text-neutral-500">No products found</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-neutral-500">Tip: Wire these actions to your CMS/DB and add image storage.</p>
        </CardContent>
      </Card>
    </div>
  )
}
