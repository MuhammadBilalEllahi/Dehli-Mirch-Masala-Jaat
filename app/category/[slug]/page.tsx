import { RootProviders } from "@/components/root-providers"
import { CategoryClient } from "@/components/category-client"
import { getAllProducts } from "@/lib/mock-data"

export const dynamic = "force-dynamic"

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const allProducts = await getAllProducts()

  return (
    <RootProviders>
      <CategoryClient slug={slug} allProducts={allProducts} />
    </RootProviders>
  )
}
