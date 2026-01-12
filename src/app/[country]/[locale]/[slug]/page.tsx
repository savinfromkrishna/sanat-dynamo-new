import type { Metadata, Viewport } from "next"
import Image from "next/image"
import { CheckCircle } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

import CategoryReviewsSection from "@/components/category-reviews-section"
import { CategoriesSection } from "@/components/home/CategoriesSection"
import { ProductknowMoreSection } from "@/components/productKnowMore"

import { getTranslation, type Locale } from "@/lib/i18n"

/* ------------------------------------------------------------------ */
/* Viewport */
/* ------------------------------------------------------------------ */
export function generateViewport(): Viewport {
  return {
    width: "device-width",
    initialScale: 1,
  }
}

/* ------------------------------------------------------------------ */
/* Category mapping (TYPE-SAFE) */
/* ------------------------------------------------------------------ */
export type CategoryKey = "weightLoss" | "oralProbiotics"

const CATEGORY_MAP: Record<string, CategoryKey> = {
  "weight-loss-supplements": "weightLoss",
  "dental-health-supplements": "oralProbiotics",
} as const

function getCategoryKey(slug: string): CategoryKey | null {
  return CATEGORY_MAP[slug as keyof typeof CATEGORY_MAP] ?? null
}

/* ------------------------------------------------------------------ */
/* Metadata */
/* ------------------------------------------------------------------ */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; locale: string; slug: string }>
}): Promise<Metadata> {
  const { country, locale, slug } = await params

  const safeLocale: Locale = locale === "es" ? "es" : "en"
  const translations = getTranslation(safeLocale)
  const categoryKey = getCategoryKey(slug)

  if (!categoryKey || !translations?.[categoryKey]?.seo) {
    return {
      title: "Supplements – Not Found",
      description: "Category not found",
    }
  }

  const t = translations[categoryKey]

  return {
    title: t.seo.title,
    description: t.seo.description,
    metadataBase: new URL("https://supplelogic.com"),
    alternates: {
      canonical: `/${country}/${safeLocale}/${slug}`,
    },
  }
}

/* ------------------------------------------------------------------ */
/* Page Component */
/* ------------------------------------------------------------------ */
export default async function SupplementsPage({
  params,
}: {
  params: Promise<{ country: string; locale: string; slug: string }>
}) {
  const { country, locale, slug } = await params

  const safeLocale: Locale = locale === "es" ? "es" : "en"
  const translations = getTranslation(safeLocale)
  const categoryKey = getCategoryKey(slug)

  // Early return with better debugging in development
  if (!categoryKey) {
    console.error(`Invalid category slug: "${slug}"`)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold mb-4">Invalid Category</h1>
          <p>Slug <code>{slug}</code> is not recognized.</p>
        </div>
      </div>
    )
  }

  const t = translations?.[categoryKey]

  if (!t) {
    console.error(`Missing translation for category: ${categoryKey} (locale: ${safeLocale})`)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold mb-4">Content Not Available</h1>
          <p>Translation missing for <strong>{categoryKey}</strong></p>
          <p className="text-sm text-gray-500 mt-4">
            Check your translation file structure
          </p>
        </div>
      </div>
    )
  }

  const knowMoreData = translations.knowMore?.[categoryKey]

  return (
    <main className="min-h-screen bg-white">
      {/* Categories */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <CategoriesSection
          translations={translations}
          locale={safeLocale}
          categoryFilter={categoryKey}
          country={country}
        />
      </section>

      {/* Benefits */}
      {t.benefits && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              {t.benefits.title}
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {t.benefits.items.map((item: string, i: number) => (
                <Card key={i} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <CheckCircle className="mx-auto mb-4 h-10 w-10 text-emerald-500" />
                    <p className="text-gray-700 font-medium">{item}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trust Badges */}
      {t.trustBadges && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-semibold text-center mb-8">
              {t.trustBadges.title || "Certified Quality You Can Trust"}
            </h3>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {t.trustBadges.items.map((b: { image: string; alt: string }, i: number) => (
                <div key={i} className="flex flex-col items-center">
                  <Image
                    src={b.image}
                    alt={b.alt}
                    width={90}
                    height={90}
                    className="object-contain"
                  />
                  <p className="mt-2 text-sm text-gray-600">{b.alt}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reviews */}
      <CategoryReviewsSection category={slug} translations={translations} />

      {/* FAQs */}
      {t.faqs && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              {t.faqs.title || "Frequently Asked Questions"}
            </h2>

            <Accordion type="single" collapsible className="w-full">
              {t.faqs.items.map((faq: { question: string; answer: string }, i: number) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-b py-2">
                  <AccordionTrigger className="text-left font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 text-gray-700">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      {/* Know More / Additional Info */}
      {knowMoreData && (
        <ProductknowMoreSection
          translations={{ productKnowMore: knowMoreData }}
        />
      )}
    </main>
  )
}

/* ------------------------------------------------------------------ */
/* Static Params – Add more combinations as needed */
/* ------------------------------------------------------------------ */
export async function generateStaticParams() {
  const locales = ["en", "es"]
  const countries = ["in", "us"]
  const slugs = ["weight-loss-supplements", "dental-health-supplements"]

  return countries.flatMap((country) =>
    locales.flatMap((locale) =>
      slugs.map((slug) => ({
        country,
        locale,
        slug,
      }))
    )
  )
}