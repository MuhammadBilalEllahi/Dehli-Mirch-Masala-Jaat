"use client"

import { useState } from "react"

type User = { id: string; name: string; email: string; role: "guest" | "user" | "admin" }

export default function UsersAdminPage() {
  const [users, setUsers] = useState<User[]>([
    { id: "u1", name: "Ayesha Khan", email: "ayesha@example.com", role: "admin" },
    { id: "u2", name: "Rahul Singh", email: "rahul@example.com", role: "user" },
  ])

  const setRole = (id: string, role: User["role"]) =>
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)))

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Users</h2>
      <div className="overflow-x-auto rounded border">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-50 dark:bg-neutral-900/40">
            <tr>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">
                  <select className="rounded border bg-transparent p-1" value={u.role} onChange={(e) => setRole(u.id, e.target.value as User["role"])}>
                    <option value="guest">Guest</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={3} className="p-4 text-center text-neutral-500">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-neutral-500">Connect to your auth provider (e.g., Supabase) to manage real user roles.</p>
    </div>
  )
}
