import type { Metadata } from "next"
import { Badge } from "@/components/ui/badge"
import { Star, TrendingUp, Users, Award } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import CategoryReviewsSection from "@/components/category-reviews-section"
import { getTranslation, type Locale } from "@/lib/i18n"
import CTAButton from "@/components/cta-button"

const iconMap = {
  Users,
  Star,
  TrendingUp,
  Award,
}

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const translations = getTranslation(params.locale)
  return {
    title: translations.reviews.title,
    description: translations.reviews.description,
    metadataBase: new URL("https://mitolyn-official.com"),
    alternates: {
      canonical: `/${params.locale}/reviews`,
      languages: {
        "en-US": "/en/reviews",
        "es-ES": "/es/reviews",
      },
    },
    openGraph: {
      title: translations.reviews.title,
      description: translations.reviews.description,
      url: `https://mitolyn-official.com/${params.locale}/reviews`,
      siteName: "Mitolyn Official",
      images: [{ url: "https://res.cloudinary.com/ddywjrr08/image/upload/v1758422485/mitolyn-bottle_dj1mxc.webp", width: 1200, height: 630, alt: translations.reviews.title }],
      locale: params.locale === "es" ? "es_ES" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: translations.reviews.title,
      description: translations.reviews.description,
      images: ["https://res.cloudinary.com/ddywjrr08/image/upload/v1758422485/mitolyn-bottle_dj1mxc.webp"],
    },
  }
}

export default async function ReviewsPage({ params }: { params: { locale: Locale } }) {
  const translations = getTranslation(params.locale)
  const t = translations.reviews

  return (
    <main className="pt-8">
      <section className="py-16 bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-emerald-100 text-emerald-800 hover:bg-emerald-100">{t.hero.badge}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-balance">{t.hero.title}</h1>
            <p className="text-xl text-gray-600 leading-relaxed">{t.hero.description}</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {t.stats.map((stat: any, index: number) => {
              const Icon = iconMap[stat.icon as keyof typeof iconMap]
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{t.categories.title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t.categories.description}</p>
          </div>

          <Tabs defaultValue="weight-loss" className="w-full">
            <div className="flex justify-center">
              <TabsList className="grid grid-cols-3">
                {t.categories.tabs.map((tab: any) => (
                  <TabsTrigger key={tab.value} value={tab.value}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {t.categories.tabs.map((tab: any) => (
              <TabsContent key={tab.value} value={tab.value} className="mt-8">
                <CategoryReviewsSection category={`${tab.value}-supplements`} translations={translations} />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">{t.cta.title}</h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">{t.cta.description}</p>
          <CTAButton url={t.cta.url} label={t.cta.button} />
        </div>
      </section>
    </main>
  )
}
