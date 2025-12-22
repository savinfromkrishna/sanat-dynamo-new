import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ProductDetailPageClient from "./ProductDetailPageClient"
import { getTranslation, type Locale } from "@/lib/i18n"
import type { ProductDetail } from "./product-data"

function getCategoryKey(slug: string): string | null {
  const map: Record<string, string> = {
    "weight-loss-supplements": "weightLoss",
    "dental-health-supplements": "oralProbiotics",
  }
  return map[slug] || null
}

const productMap: Record<string, string[]> = {
  "weight-loss-supplements": ["metolyn-1"],
  "dental-health-supplements": ["prodentim-1"],
}

export async function generateMetadata({
  params,
}: {
  params: {
    country: string
    locale: Locale
    slug: string
    id: string
  }
}): Promise<Metadata> {
  const { locale, slug, id, country } = params

  const translations = getTranslation(locale)
  const categoryKey = getCategoryKey(slug)
  if (!categoryKey) {
    return {
      title: "Page Not Found",
    }
  }
  const product = translations.products?.[id] as ProductDetail | undefined

  if (!product) {
    return {
      title: translations.common.productNotFound,
    }
  }

  return {
    title: product.seo.title,
    description: product.seo.description,
    keywords: product.seo.keywords?.join(", "),
    metadataBase: new URL("https://mitolyn-official.com"),
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
      url: `https://mitolyn-official.com/${country}/${locale}/${slug}/${product.id}`,
      siteName: "Mitolyn Official",
      images: [{ url: product.image, width: 1200, height: 630, alt: product.name }],
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.seo.title,
      description: product.seo.description,
      images: [product.image],
    },
  }
}

export default async function ProductPage({
  params,
}: {
  params: {
    country: string
    locale: Locale
    slug: string
    id: string
  }
}) {
  const { locale, slug, id } = params

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
  const categoryProducts = categoryTranslations.productsSection?.products || []
  const relatedProducts = categoryProducts
    .filter((p: any) => String(p.id) !== id)
    .map((p: any) => ({ ...p, id: String(p.id) }))

  return (
    <ProductDetailPageClient
      product={product}
      translations={translations}
      locale={locale}
      categoryKey={categoryKey}
      slug={slug}
      relatedProducts={relatedProducts}
    />
  )
}

export async function generateStaticParams() {
  const locales: Locale[] = ["en", "es"]
  const countries = ["us", "in", "ca"]

  const paramsArray: any[] = []

  for (const country of countries) {
    for (const locale of locales) {
      for (const slug in productMap) {
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
