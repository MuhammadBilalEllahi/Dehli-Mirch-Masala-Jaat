export default function CareersPage() {
  const jobs = [
    { title: "E-commerce Manager", location: "Remote / PK", type: "Full-time" },
    { title: "Content Writer (Food)", location: "Remote", type: "Contract" },
  ]
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Careers</h1>
      <ul className="space-y-3">
        {jobs.map((j) => (
          <li key={j.title} className="rounded border p-4">
            <div className="font-semibold">{j.title}</div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              {j.location} • {j.type}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
