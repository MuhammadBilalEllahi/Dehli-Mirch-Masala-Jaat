import Link from "next/link"
import type { Blog } from "@/lib/mock-data"

export function HomeBlogPreview({ blogs }: { blogs: Blog[] }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">From our Blog</h2>
        <Link href="/blog" className="text-red-600 hover:underline">
          View all
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {blogs.map((b) => (
          <article key={b.slug} className="rounded-2xl border bg-white dark:bg-neutral-900 overflow-hidden hover:shadow-md transition-shadow">
            <Link href={`/blog/${b.slug}`}>
              <img src={b.image || "/placeholder.svg"} alt={b.title} className="w-full h-44 object-cover" />
            </Link>
            <div className="p-4">
              <Link href={`/blog/${b.slug}`} className="font-semibold hover:underline line-clamp-2">
                {b.title}
              </Link>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3">{b.excerpt}</p>
              <Link href={`/blog/${b.slug}`} className="mt-3 inline-block text-sm text-green-700 hover:underline">
                Read more
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
