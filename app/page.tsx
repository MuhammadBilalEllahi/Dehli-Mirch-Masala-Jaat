import { HomeSearchBar } from "@/components/home-search-bar"
import { HomeHero } from "@/components/home-hero"
import { HomeFeaturedProducts } from "@/components/home-featured-products"
import { HomeCategories } from "@/components/home-categories"
import { HomeBlogPreview } from "@/components/home-blog-preview"
import { HomeTestimonials } from "@/components/home-testimonials"
import { HomeNewsletter } from "@/components/home-newsletter"
import { getFeaturedProducts, getFeaturedBlogs, getCategories } from "@/lib/mock-data"

export default async function HomePage() {
  // Server Component fetching placeholder data. Interactive sections are client components.
  const [featured, blogs, categories] = await Promise.all([
    getFeaturedProducts(),
    getFeaturedBlogs(),
    getCategories(),
  ])

  return (
    <div>
      <section className="border-b bg-neutral-50/60 dark:bg-neutral-900/30">
        <div className="container mx-auto px-4 py-3">
          <HomeSearchBar categories={categories} />
        </div>
      </section>

      <HomeHero />

      <section className="container mx-auto px-4 py-10 md:py-14">
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        <HomeFeaturedProducts products={featured} />
      </section>

      <section className="container mx-auto px-4 py-10 md:py-14">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <HomeCategories categories={categories} />
      </section>

      <section className="container mx-auto px-4 py-10 md:py-14">
        <HomeBlogPreview blogs={blogs} />
      </section>

      <section className="container mx-auto px-4 py-10 md:py-14">
        <HomeTestimonials />
      </section>

      <section className="bg-neutral-50 dark:bg-neutral-900/40">
        <div className="container mx-auto px-4 py-12">
          <HomeNewsletter />
        </div>
      </section>
    </div>
  )
}
