import type { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"

import ProductDetailPageClient from "./ProductDetailPageClient"
import { getTranslation, type Locale } from "@/lib/i18n"
import type { ProductDetail } from "./product-data"
import { validCountryISOs } from "@/middleware"
import { countryNamesByISO } from "@/lib/country"

const supportedCountries = validCountryISOs;
const supportedLanguages: Locale[] = ["en", "es"];

export function generateViewport(): Viewport {
  return { width: "device-width", initialScale: 1 }
}

type CategoryKey = "weightLoss" | "oralProbiotics"

function getCategoryKey(slug: string): CategoryKey | null {
  const map: Record<string, CategoryKey> = {
    "weight-loss-supplements": "weightLoss",
    "dental-health-supplements": "oralProbiotics",
  }
  return map[slug] || null
}

const productMap: Record<string, string[]> = {
  "weight-loss-supplements": ["metolyn"],
  "dental-health-supplements": ["prodentim"],
}

/* ------------------------------------------------------------------ */
/* Metadata with Dynamic Hreflang */
/* ------------------------------------------------------------------ */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; locale: Locale; slug: string; id: string }>
}): Promise<Metadata> {
  const { country, locale, slug, id } = await params

  const translations = await getTranslation(locale)
  const categoryKey = getCategoryKey(slug)

  if (!categoryKey) return { title: "Page Not Found" }

  const product = translations.products?.[id] as ProductDetail | undefined

  if (!product?.seo) {
    return { title: translations.common?.productNotFound ?? "Product Not Found" }
  }

  // Generate dynamic hreflang alternates
  const langMap: Record<string, string> = {};
  for (const lang of supportedLanguages) {
    for (const cty of supportedCountries) {
      const region = cty.toUpperCase();
      const hrefLang = `${lang}-${region}`;
      langMap[hrefLang] = `/${cty}/${lang}/${slug}/${id}`;
    }
  }
  langMap["x-default"] = `/us/en/${slug}/${id}`;

  const fallbackImage = "https://res.cloudinary.com/ddywjrr08/image/upload/v1758422485/mitolyn-bottle_dj1mxc.webp"

  return {
    title: `${product.seo.title} | ${countryNamesByISO[country?.toLowerCase() as keyof typeof countryNamesByISO]}`,
    description: product.seo.description,
    keywords: product.seo.keywords?.join(", "),
    metadataBase: new URL("https://supplelogic.com"),
    alternates: {
      canonical: `/${country}/${locale}/${slug}/${id}`,
      languages: langMap,
    },
    openGraph: {
      title: product.seo.title,
      description: product.seo.description,
      url: `https://supplelogic.com/${country}/${locale}/${slug}/${id}`,
      siteName: "SuppleLogic",
      images: [{ url: product.image || fallbackImage, width: 1200, height: 630, alt: product.name }],
      locale: `${locale}_${country.toUpperCase()}`,
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
/* Page Component */
/* ------------------------------------------------------------------ */
export default async function ProductPage({
  params,
}: {
  params: Promise<{ country: string; locale: Locale; slug: string; id: string }>
}) {
  const { country, locale, slug, id } = await params

  const translations = await getTranslation(locale)
  const categoryKey = getCategoryKey(slug)

  if (!categoryKey) notFound()

  const product = translations.products?.[id] as ProductDetail | undefined
  if (!product) notFound()

  const categoryTranslations = translations[categoryKey]
  if (!categoryTranslations) notFound()

  const categoryProducts = categoryTranslations.productsSection?.products ?? []
  const relatedProducts = categoryProducts
    .filter((p: any) => String(p.id) !== id)
    .map((p: any) => ({ ...p, id: String(p.id) }))

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

export async function generateStaticParams() {
  const paramsArray: any[] = []
  for (const country of supportedCountries) {
    for (const locale of supportedLanguages) {
      for (const slug of Object.keys(productMap)) {
        for (const id of productMap[slug]) {
          paramsArray.push({ country, locale, slug, id })
        }
      }
    }
  }
  return paramsArray
}