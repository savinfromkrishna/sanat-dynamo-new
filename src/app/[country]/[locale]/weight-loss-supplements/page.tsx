import type { Metadata } from "next"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import CategoryReviewsSection from "@/components/category-reviews-section"
import { getTranslation, type Locale } from "@/lib/i18n"
import ProductCards from "@/components/product-card"
import { KnowMoreSection } from "@/components/KnowMoreSection"

export async function generateMetadata({ params }: {
  params: {
    country: any; locale: Locale
  }
}): Promise<Metadata> {
  const translations = getTranslation(params.locale)
  return {
    title: translations.weightLoss.title,
    description: translations.weightLoss.description,
    metadataBase: new URL("https://mitolyn-official.com"),
    alternates: {
      canonical: `/${params.country}/${params.locale}/weight-loss-supplements`,
      languages: {
        "en-US": `/${params.country}/en/weight-loss-supplements`,
        "es-ES": `/${params.country}/es/weight-loss-supplements`,
      },
    },
    openGraph: {
      title: translations.weightLoss.title,
      description: translations.weightLoss.description,
      url: `https://mitolyn-official.com/${params.country}/${params.locale}/weight-loss-supplements`,
      siteName: "Mitolyn Official",
      images: [{ url: "https://res.cloudinary.com/ddywjrr08/image/upload/v1758422485/mitolyn-bottle_dj1mxc.webp", width: 1200, height: 630, alt: translations.weightLoss.title }],
      locale: params.locale === "es" ? "es_ES" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: translations.weightLoss.title,
      description: translations.weightLoss.description,
      images: ["https://res.cloudinary.com/ddywjrr08/image/upload/v1758422485/mitolyn-bottle_dj1mxc.webp"],
    },
  }
}

export default async function WeightLossSupplementsPage({ params }: { params: { country: string; locale: Locale } }) {
  const translations = getTranslation(params.locale)
  const t = translations.weightLoss
  console.log("translations:", translations)
  console.log("Translations for Weight Loss Supplements Page:", t)
  console.log("womensProductsSection:", translations.
womenWeightLoss
)
  return (
    <main className="min-h-screen bg-white">
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-900">{t.productsSection.title}</h2>
          <p className="text-center text-gray-600 mb-16 max-w-4xl mx-auto text-xl leading-relaxed">
            {t.productsSection.description}
          </p>
          <ProductCards
            products={[
              ...(t.productsSection?.products || []),
              ...(translations.womenWeightLoss.productsSection.products || []), 
            ].map(p => ({ ...p, id: String(p.id) }))}
            buyNowLabel={t.common.buyNow}
          />
        </div>
      </section>

      <section className="py-8 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center gap-8 flex-wrap">
            {t.trustBadges.items.map((badge: any, index: number) => (
              <Image
                key={index}
                src={badge.image || "/placeholder.svg"}
                alt={badge.alt}
                width={80}
                height={80}
                className="opacity-80 hover:opacity-100 transition-opacity"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div id="women">
              <h2 className="text-2xl font-sans font-bold mb-4">{t.genderSpecific.women.title}</h2>
              <p className="text-muted-foreground mb-4">{t.genderSpecific.women.description}</p>
              <ul className="space-y-2 mb-4">
                {t.genderSpecific.women.items.map((item: string, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground">{t.genderSpecific.women.footer}</p>
            </div>

            <div id="men">
              <h2 className="text-2xl font-sans font-bold mb-4">{t.genderSpecific.men.title}</h2>
              <p className="text-muted-foreground mb-4">{t.genderSpecific.men.description}</p>
              <ul className="space-y-2">
                {t.genderSpecific.men.items.map((item: string, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-sans font-bold text-center mb-8">{t.faqs.title}</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {t.faqs.items.map((faq: any, index: number) => (
                <AccordionItem
                  key={index}
                  value={`item-${index + 1}`}
                  className="border border-gray-200 rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-sans font-bold text-center mb-8">{t.benefits.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.benefits.items.map((benefit: string, index: number) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="p-0">
                  <CheckCircle className="h-8 w-8 text-emerald-500 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">{benefit}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-6 max-w-3xl mx-auto">{t.benefits.footer}</p>
        </div>
      </section>

      <CategoryReviewsSection category="weight-loss-supplements" translations={translations} />
            <KnowMoreSection translations={translations} />
      
    </main>
  )
}

export async function generateStaticParams() {
  return [
    { country: "us", locale: "en" },
    { country: "us", locale: "es" },
    // Add more country-locale combinations as needed
  ]
}