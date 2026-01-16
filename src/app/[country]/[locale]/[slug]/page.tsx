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
import { validCountryISOs } from "@/middleware"
import { countryNamesByISO } from "@/lib/country"

const supportedCountries = validCountryISOs;
const supportedLanguages: Locale[] = ["en", "es"];

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
/* Category mapping */
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
/* Metadata with Dynamic Hreflang */
/* ------------------------------------------------------------------ */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; locale: string; slug: string }>
}): Promise<Metadata> {
  const { country, locale, slug } = await params

  const safeLocale: Locale = locale === "es" ? "es" : "en"
  const translations = await getTranslation(safeLocale)
  const categoryKey = getCategoryKey(slug)

  if (!categoryKey || !translations?.[categoryKey]?.seo) {
    return {
      title: "Supplements – Not Found",
      description: "Category not found",
    }
  }

  const t = translations[categoryKey]

  // Generate dynamic hreflang alternates
  const langMap: Record<string, string> = {};
  for (const lang of supportedLanguages) {
    for (const cty of supportedCountries) {
      const region = cty.toUpperCase();
      const hrefLang = `${lang}-${region}`;
      langMap[hrefLang] = `/${cty}/${lang}/${slug}`;
    }
  }
  langMap["x-default"] = `/us/en/${slug}`;

  return {
    title: `${t.seo.title} | ${countryNamesByISO[country?.toLowerCase() as keyof typeof countryNamesByISO]}`,
    description: t.seo.description,
    metadataBase: new URL("https://supplelogic.com"),
    alternates: {
      canonical: `/${country}/${safeLocale}/${slug}`,
      languages: langMap,
    },
    openGraph: {
      title: t.seo.title,
      description: t.seo.description,
      url: `https://supplelogic.com/${country}/${safeLocale}/${slug}`,
      locale: `${safeLocale}_${country.toUpperCase()}`,
      type: "website",
    }
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
  const translations = await getTranslation(safeLocale)
  const categoryKey = getCategoryKey(slug)

  if (!categoryKey) {
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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold mb-4">Content Not Available</h1>
        </div>
      </div>
    )
  }

  const knowMoreData = translations.knowMore?.[categoryKey]

  return (
    <main className="min-h-screen bg-white">
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <CategoriesSection
          translations={translations}
          locale={safeLocale}
          categoryFilter={categoryKey}
          country={country}
        />
      </section>

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

      {t.trustBadges && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-2xl font-semibold mb-8">{t.trustBadges.title}</h3>
            <div className="flex flex-wrap justify-center gap-8">
              {t.trustBadges.items.map((b: any, i: number) => (
                <div key={i} className="flex flex-col items-center">
                  <Image src={b.image} alt={b.alt} width={90} height={90} className="object-contain" />
                  <p className="mt-2 text-sm text-gray-600">{b.alt}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CategoryReviewsSection category={slug} translations={translations} />

      {t.faqs && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-10">{t.faqs.title}</h2>
            <Accordion type="single" collapsible className="w-full">
              {t.faqs.items.map((faq: any, i: number) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      {knowMoreData && (
        <ProductknowMoreSection translations={{ productKnowMore: knowMoreData }} />
      )}
    </main>
  )
}

export async function generateStaticParams() {
  const slugs = ["weight-loss-supplements", "dental-health-supplements"]
  return validCountryISOs.flatMap((country) =>
    supportedLanguages.flatMap((locale) =>
      slugs.map((slug) => ({ country, locale, slug }))
    )
  )
}