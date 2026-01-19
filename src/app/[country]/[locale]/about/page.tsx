// app/[locale]/about/page.tsx
import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Shield, Award, Users, Leaf, CheckCircle } from "lucide-react"
import Image from "next/image"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { getTranslation, type Locale } from "@/lib/i18n"

const iconMap = {
  Leaf,
  Shield,
  Award,
  Users,
  Heart,
  CheckCircle,
}

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const translations = getTranslation(params.locale)
  return {
    title: translations.about.title,
    description: translations.about.description,
    metadataBase: new URL("https://supplelogic.com"),
    alternates: {
      canonical: `/${params.locale}/about`,
      languages: {
        "en-US": "/en/about",
        "es-ES": "/es/about",
      },
    },
    openGraph: {
      title: translations.about.title,
      description: translations.about.description,
      url: `https://supplelogic.com/${params.locale}/about`,
      siteName: "Mitolyn Official",
      images: [{ url: "https://res.cloudinary.com/ddywjrr08/image/upload/v1758422485/mitolyn-bottle_dj1mxc.webp", width: 1200, height: 630, alt: translations.about.title }],
      locale: params.locale === "es" ? "es_ES" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: translations.about.title,
      description: translations.about.description,
      images: ["https://res.cloudinary.com/ddywjrr08/image/upload/v1758422485/mitolyn-bottle_dj1mxc.webp"],
    },
  }
}

export default async function AboutPage({ params }: { params: { locale: Locale } }) {
  const translations = getTranslation(params.locale)
  const t = translations.about

  return (
    <main className="pt-8">
      <section className="py-16 bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-emerald-100 text-emerald-800 hover:bg-emerald-100">{t.hero.badge}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-balance">
              {t.hero.title}{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {t.hero.titleHighlight}
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">{t.hero.description}</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.story.title}</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                {t.story.content.map((paragraph: string, index: number) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl p-8 h-96 flex items-center justify-center">
                <Image
                  src="https://res.cloudinary.com/dpqnfjpdw/image/upload/fl_preserve_transparency/v1768831083/Gemini_Generated_Image_rsy1pmrsy1pmrsy1_nx90mc.jpg?_s=public-apps"
                  alt="MITOLYN Premium Supplements"
                  fill
                  className="object-fit rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.values.title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t.values.description}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.values.items.map((value: any, index: number) => {
              const Icon = iconMap[value.icon as keyof typeof iconMap]
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.certifications.title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t.certifications.description}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            {t.certifications.items.map((cert: any, index: number) => (
              <div key={index} className="text-center">
                <Image src={cert.image} alt={cert.alt} width={80} height={80} className="mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">{cert.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.faq.title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t.faq.description}</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {t.faq.items.map((item: any, index: number) => (
                <AccordionItem key={index} value={`q${index + 1}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </main>
  )
}