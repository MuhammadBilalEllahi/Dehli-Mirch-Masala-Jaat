"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getSampleCategories } from "@/lib/admin-sample"

type Filter = { name: string; values: string[] }
type Category = { id: string; name: string; parent?: string; filters: Filter[] }

export default function CategoriesAdminPage() {
  const [categories, setCategories] = useState<Category[]>(useMemo(()=>getSampleCategories(),[]))
  const [name, setName] = useState("")
  const [parent, setParent] = useState<string>("")
  const [filterName, setFilterName] = useState("")
  const [filterValues, setFilterValues] = useState("")

  const addCategory = ()=>{
    if(!name) return
    setCategories(prev=>[{ id:"c"+Math.random().toString(36).slice(2,7), name, parent: parent || undefined, filters: [] }, ...prev])
    setName(""); setParent("")
  }

  const addFilter = (id: string)=>{
    if(!filterName) return
    setCategories(prev=>prev.map(c=> c.id===id ? ({...c, filters:[...c.filters, { name: filterName, values: filterValues.split("|").filter(Boolean)}]}) : c))
    setFilterName(""); setFilterValues("")
  }

  const remove = (id: string)=> setCategories(prev=>prev.filter(c=>c.id!==id))

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Category & Filter Manager</CardTitle>
          <CardDescription>Create categories and attach filters (e.g., Spice Level, Weight)</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid md:grid-cols-[1fr_1fr_auto] gap-2">
            <Input placeholder="Category name" value={name} onChange={(e)=>setName(e.target.value)} />
            <Input placeholder="Parent (optional)" value={parent} onChange={(e)=>setParent(e.target.value)} />
            <Button className="bg-green-600 hover:bg-green-700" onClick={addCategory}>Add Category</Button>
          </div>

          <div className="overflow-x-auto rounded border">
            <table className="min-w-full text-sm">
              <thead className="bg-neutral-50 dark:bg-neutral-900/40">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Parent</th>
                  <th className="p-3 text-left">Filters</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(c=>(
                  <tr key={c.id} className="border-t align-top">
                    <td className="p-3">{c.name}</td>
                    <td className="p-3">{c.parent ?? "—"}</td>
                    <td className="p-3">
                      <ul className="space-y-1">
                        {c.filters.map((f,i)=>(
                          <li key={i}><span className="font-medium">{f.name}:</span> {f.values.join(", ")}</li>
                        ))}
                      </ul>
                      <div className="mt-2 grid md:grid-cols-[1fr_1fr_auto] gap-2">
                        <Input placeholder="Filter name" value={filterName} onChange={(e)=>setFilterName(e.target.value)} />
                        <Input placeholder="Values (| separated)" value={filterValues} onChange={(e)=>setFilterValues(e.target.value)} />
                        <Button variant="outline" onClick={()=>addFilter(c.id)}>Attach</Button>
                      </div>
                    </td>
                    <td className="p-3">
                      <button className="text-red-600 hover:underline" onClick={()=>remove(c.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
                {!categories.length && <tr><td colSpan={4} className="p-4 text-center text-neutral-500">No categories</td></tr>}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
