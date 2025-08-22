import { notFound } from "next/navigation"
import { getAllProducts, getProductBySlug, type Product } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Star, Truck, ShieldCheck, Share2, SendHorizontal, Facebook, Twitter } from 'lucide-react'
import Link from "next/link"

// Lightweight versions of the referenced components.
// If you already have richer implementations, you can keep those and remove these.
import { ProductImages } from "@/components/product-images"
import { AddToCartSection } from "@/components/add-to-cart-section"
import { AddToWishlistButton } from "@/components/wishlist-button"
import { Reviews } from "@/components/reviews"
import { YouMayAlsoLike } from "@/components/you-may-also-like"

export async function generateStaticParams() {
  const products = await getAllProducts()
  return products.map((p) => ({ slug: p.slug }))
}

export default async function Page({ params }: { params: { slug: string } }) {
  const {slug}  = await params;
  const product = await getProductBySlug(slug)

  if (!product) {
    return notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-8">
        <ProductImages images={product.images} title={product.title} />
        <div>
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>
            <AddToWishlistButton productId={product.id} />
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
            <div className="inline-flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="opacity-70">({product.reviews.length})</span>
            </div>
            <span>•</span>
            <span>{`Spice Level: ${"🌶".repeat(product.spiceLevel)}${"🌶".repeat(
              Math.max(0, 5 - product.spiceLevel)
            )}`}</span>
            <span>•</span>
            <span>{product.vegetarian ? "Vegetarian" : "Non-Veg"}</span>
          </div>

          <div className="mt-4 text-3xl font-extrabold text-red-600">
            ${product.price.toFixed(2)}
          </div>

          <AddToCartSection product={product as Product} />

          <Separator className="my-6" />

          <div className="grid sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm">
              <Truck className="h-4 w-4 text-green-600" /> Fast Delivery
            </div>
            <div className="flex items-center gap-2 text-sm">
              <ShieldCheck className="h-4 w-4 text-orange-500" /> Secure Checkout
            </div>
          </div>

          <div className="mt-6">
            <h2 className="font-semibold mb-2">Ingredients</h2>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              {product.ingredients}
            </p>
          </div>
          <div className="mt-4">
            <h2 className="font-semibold mb-2">Instructions</h2>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              {product.instructions}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Button
              variant="outline"
              className="gap-2"
              // onClick={() =>
              //   navigator.share?.({
              //     title: product.title,
              //     url: typeof window !== "undefined" ? window.location.href : "/",
              //   })
              // }
            >
              <Share2 className="h-4 w-4" /> Share
            </Button>
            <a
              className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm"
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                product.title
              )}&url=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.href : ""
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="h-4 w-4" /> Tweet
            </a>
            <a
              className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm"
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.href : ""
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="h-4 w-4" /> Share
            </a>
            <a
              className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm"
              href={`https://wa.me/?text=${encodeURIComponent(
                `${product.title} - ${
                  typeof window !== "undefined" ? window.location.href : ""
                }`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SendHorizontal className="h-4 w-4" /> WhatsApp
            </a>
          </div>

          <div className="mt-6 text-sm text-neutral-600 dark:text-neutral-400">
            <span className="font-semibold">Refund policy:</span>{" "}
            Items can be returned within 7 days if unopened.{" "}
            <Link href="/returns" className="text-green-700 underline">
              Read full policy
            </Link>
          </div>
        </div>
      </div>

      <section className="mt-12">
        <Reviews productId={product.id} initialReviews={product.reviews} />
      </section>

      <section className="mt-12">
        <YouMayAlsoLike currentId={product.id} />
      </section>
    </div>
  )
}
