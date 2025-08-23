"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { fetchCategories, createCategory } from "@/lib/api/categories"

type Category = { _id: string; name: string; parent?: { _id: string; name: string }; description?: string; image?: string }

export default function CategoriesAdminPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [showDialog, setShowDialog] = useState(false)

  // Form state
  const [name, setName] = useState("")
  const [parent, setParent] = useState<string>("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(console.error)
  }, [])

  const addCategory = async () => {
    if (!name) return
    try {
      const newCat = await createCategory({ name, parent: parent || undefined, description, image })
      setCategories(prev => [newCat, ...prev])
      setShowDialog(false)
      setName(""); setParent(""); setDescription(""); setImage("")
    } catch (err: any) {
      console.error(err.message)
    }
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>Manage your categories</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setShowDialog(true)} className="mb-4 bg-green-600 hover:bg-green-700">Add Category</Button>

          {showDialog && (
            <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-md w-[400px] space-y-4">
                <h2 className="text-lg font-bold">Add Category</h2>
                <Input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                
                <select value={parent} onChange={e => setParent(e.target.value)} className="w-full p-2 border rounded">
                  <option value="">No parent</option>
                  {categories.map(c => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>

                <Input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
                <Input placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} />

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowDialog(false)}>Cancel</Button>
                  <Button onClick={addCategory} className="bg-blue-600 hover:bg-blue-700">Save</Button>
                </div>
              </div>
            </div>
          )}

          <div className="overflow-x-auto rounded border mt-4">
            <table className="min-w-full text-sm">
              <thead className="bg-neutral-50 dark:bg-neutral-900/40">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Parent</th>
                  <th className="p-3 text-left">Description</th>
                  <th className="p-3 text-left">Image</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(c => (
                  <tr key={c._id} className="border-t">
                    <td className="p-3">{c.name}</td>
                    <td className="p-3">{c.parent?.name || "—"}</td>
                    <td className="p-3">{c.description || "—"}</td>
                    <td className="p-3">{c.image ? <img src={c.image} alt={c.name} className="w-12 h-12 object-cover" /> : "—"}</td>
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

// "use client"

// import { useEffect, useMemo, useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { getSampleCategories } from "@/lib/admin-sample"
// import { fetchCategories } from "@/lib/api/categories"

// type Filter = { name: string; values: string[] }
// type Category = { id: string; name: string; parent?: string; filters: Filter[] }

// export default function CategoriesAdminPage() {
  
//   const [name, setName] = useState("")
//   const [parent, setParent] = useState<string>("")
//   const [filterName, setFilterName] = useState("")
//   const [filterValues, setFilterValues] = useState("")

//   const [categories, setCategories] = useState<Category[]>([]);

//   useEffect(() => {
//     fetchCategories()
//       .then(setCategories)
//       .catch(console.error);
//   }, []);

//   const addCategory = () => {
//     if (!name) return
//     setCategories(prev => [{ id: "c" + Math.random().toString(36).slice(2, 7), name, parent: parent || undefined, filters: [] }, ...prev])
//     setName(""); setParent("")
//   }

//   const addFilter = (id: string) => {
//     if (!filterName) return
//     setCategories(prev => prev.map(c => c.id === id ? ({ ...c, filters: [...c.filters, { name: filterName, values: filterValues.split("|").filter(Boolean) }] }) : c))
//     setFilterName(""); setFilterValues("")
//   }

//   const remove = (id: string) => setCategories(prev => prev.filter(c => c.id !== id))

//   return (
//     <div className="grid gap-6">
//       <Card>
//         <CardHeader>
//           <CardTitle>Category & Filter Manager</CardTitle>
//           <CardDescription>Create categories and attach filters (e.g., Spice Level, Weight)</CardDescription>
//         </CardHeader>
//         <CardContent className="grid gap-4">
//           <div className="grid md:grid-cols-[1fr_1fr_auto] gap-2">
//             <Input placeholder="Category name" value={name} onChange={(e) => setName(e.target.value)} />
//             <Input placeholder="Parent (optional)" value={parent} onChange={(e) => setParent(e.target.value)} />
//             <Button className="bg-green-600 hover:bg-green-700" onClick={addCategory}>Add Category</Button>
//           </div>

//           <div className="overflow-x-auto rounded border">
//             <table className="min-w-full text-sm">
//               <thead className="bg-neutral-50 dark:bg-neutral-900/40">
//                 <tr>
//                   <th className="p-3 text-left">Name</th>
//                   <th className="p-3 text-left">Parent</th>
//                   <th className="p-3 text-left">Filters</th>
//                   <th className="p-3 text-left">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {categories.map(c => (
//                   <tr key={c.id} className="border-t align-top">
//                     <td className="p-3">{c.name}</td>
//                     <td className="p-3">{c.parent ?? "—"}</td>
//                     <td className="p-3">
//                       <ul className="space-y-1">
//                         {c.filters.map((f, i) => (
//                           <li key={i}><span className="font-medium">{f.name}:</span> {f.values.join(", ")}</li>
//                         ))}
//                       </ul>
//                       <div className="mt-2 grid md:grid-cols-[1fr_1fr_auto] gap-2">
//                         <Input placeholder="Filter name" value={filterName} onChange={(e) => setFilterName(e.target.value)} />
//                         <Input placeholder="Values (| separated)" value={filterValues} onChange={(e) => setFilterValues(e.target.value)} />
//                         <Button variant="outline" onClick={() => addFilter(c.id)}>Attach</Button>
//                       </div>
//                     </td>
//                     <td className="p-3">
//                       <button className="text-red-600 hover:underline" onClick={() => remove(c.id)}>Delete</button>
//                     </td>
//                   </tr>
//                 ))}
//                 {!categories.length && <tr><td colSpan={4} className="p-4 text-center text-neutral-500">No categories</td></tr>}
//               </tbody>
//             </table>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
