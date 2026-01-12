import type { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"

import ProductDetailPageClient from "./ProductDetailPageClient"
import { getTranslation, type Locale } from "@/lib/i18n"
import type { ProductDetail } from "./product-data"

/* ------------------------------------------------------------------ */
/* Viewport (REQUIRED – fixes metadata warning) */
/* ------------------------------------------------------------------ */
export function generateViewport(): Viewport {
  return {
    width: "device-width",
    initialScale: 1,
  }
}

/* ------------------------------------------------------------------ */
/* Category mapping */
/* ------------------------------------------------------------------ */
type CategoryKey = "weightLoss" | "oralProbiotics"

function getCategoryKey(slug: string): CategoryKey | null {
  const map: Record<string, CategoryKey> = {
    "weight-loss-supplements": "weightLoss",
    "dental-health-supplements": "oralProbiotics",
  }
  return map[slug] || null
}

/* ------------------------------------------------------------------ */
/* Static product map */
/* ------------------------------------------------------------------ */
const productMap: Record<string, string[]> = {
  "weight-loss-supplements": ["metolyn"],
  "dental-health-supplements": ["prodentim"],
}

/* ------------------------------------------------------------------ */
/* Metadata */
/* ------------------------------------------------------------------ */
export async function generateMetadata({
  params,
}: {
  params: Promise<{
    country: string
    locale: Locale
    slug: string
    id: string
  }>
}): Promise<Metadata> {
  const { country, locale, slug, id } = await params

  const translations = getTranslation(locale)
  const categoryKey = getCategoryKey(slug)

  if (!categoryKey) {
    return { title: "Page Not Found" }
  }

  const product = translations.products?.[id] as ProductDetail | undefined

  if (!product?.seo) {
    return {
      title: translations.common?.productNotFound ?? "Product Not Found",
    }
  }

  const fallbackImage =
    "https://res.cloudinary.com/ddywjrr08/image/upload/v1758422485/mitolyn-bottle_dj1mxc.webp"

  return {
    title: product.seo.title,
    description: product.seo.description,
    keywords: product.seo.keywords?.join(", "),
    metadataBase: new URL("https://supplelogic.com"),
    alternates: {
      canonical: `/${country}/${locale}/${slug}/${product.id}`,
      languages: {
        "en-US": `/${country}/en/${slug}/${product.id}`,
        "es-ES": `/${country}/es/${slug}/${product.id}`,
      },
    },
    openGraph: {
      title: product.seo.title,
      description: product.seo.description,
      url: `https://supplelogic.com/${country}/${locale}/${slug}/${product.id}`,
      siteName: "SuppleLogic",
      images: [
        {
          url: product.image || fallbackImage,
          width: 1200,
          height: 630,
          alt: product.name ?? product.seo.title,
        },
      ],
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.seo.title,
      description: product.seo.description,
      images: [product.image || fallbackImage],
    },
  }
}

/* ------------------------------------------------------------------ */
/* Page */
/* ------------------------------------------------------------------ */
export default async function ProductPage({
  params,
}: {
  params: Promise<{
    country: string
    locale: Locale
    slug: string
    id: string
  }>
}) {
  const { country, locale, slug, id } = await params

  const translations = getTranslation(locale)
  const categoryKey = getCategoryKey(slug)

  if (!categoryKey) {
    notFound()
  }

  const product = translations.products?.[id] as ProductDetail | undefined

  if (!product) {
    notFound()
  }

  const categoryTranslations = translations[categoryKey]

  if (!categoryTranslations) {
    notFound()
  }

  const categoryProducts =
    categoryTranslations.productsSection?.products ?? []

  const relatedProducts = categoryProducts
    .filter((p: any) => String(p.id) !== id)
    .map((p: any) => ({
      ...p,
      id: String(p.id),
    }))

  return (
    <ProductDetailPageClient
      product={product}
      translations={translations}
      locale={locale}
      country={country}
      categoryKey={categoryKey}
      slug={slug}
      id={id}
      relatedProducts={relatedProducts}
    />
  )
}

/* ------------------------------------------------------------------ */
/* Static Params (SSG safe) */
/* ------------------------------------------------------------------ */
export async function generateStaticParams() {
  const locales: Locale[] = ["en", "es"]
  const countries = ["us", "in", "ca"]

  const paramsArray: {
    country: string
    locale: Locale
    slug: string
    id: string
  }[] = []

  for (const country of countries) {
    for (const locale of locales) {
      for (const slug of Object.keys(productMap)) {
        for (const id of productMap[slug]) {
          paramsArray.push({
            country,
            locale,
            slug,
            id,
          })
        }
      }
    }
  }

  return paramsArray
}
