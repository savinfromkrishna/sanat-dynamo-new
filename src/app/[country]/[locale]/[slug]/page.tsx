import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

import CategoryReviewsSection from "@/components/category-reviews-section";
import { ProductknowMoreSection } from "@/components/productKnowMore";
import { CategoriesSection } from "@/components/home/CategoriesSection";

import { getTranslation, type Locale } from "@/lib/i18n";

/* ---------------------------------------------
   REQUIRED: viewport export (Next.js App Router)
---------------------------------------------- */
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

/* ---------------------------------------------
   Category mapping
---------------------------------------------- */
type CategoryKey = "weightLoss" | "bellyFat" | "oralProbiotics";

function getCategoryKey(slug: string): CategoryKey | null {
  const map: Record<string, CategoryKey> = {
    "weight-loss-supplements": "weightLoss",
    "belly-fat-supplements": "bellyFat",
    "dental-health-supplements": "oralProbiotics",
  };
  return map[slug] ?? null;
}

/* ---------------------------------------------
   Metadata
---------------------------------------------- */
export async function generateMetadata({
  params,
}: {
  params: { country: string; locale: Locale; slug: string };
}): Promise<Metadata> {
  const { country, locale, slug } = params;

  const translations = getTranslation(locale);
  const categoryKey = getCategoryKey(slug);

  if (!categoryKey) {
    return { title: "Page Not Found" };
  }

  const t = translations[categoryKey];
  if (!t) {
    return { title: "Page Not Found" };
  }

  const image =
    t.productsSection?.products?.[0]?.image ??
    "https://res.cloudinary.com/ddywjrr08/image/upload/v1758422485/mitolyn-bottle_dj1mxc.webp";

  return {
    title: t.seo?.title,
    description: t.seo?.description,
    metadataBase: new URL("https://supplelogic.com"),
    alternates: {
      canonical: `/${country}/${locale}/${slug}`,
      languages: {
        "en-US": `/${country}/en/${slug}`,
        "es-ES": `/${country}/es/${slug}`,
      },
    },
    openGraph: {
      title: t.seo?.title,
      description: t.seo?.description,
      url: `https://supplelogic.com/${country}/${locale}/${slug}`,
      siteName: "SuppleLogic",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: t.seo?.title,
        },
      ],
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t.seo?.title,
      description: t.seo?.description,
      images: [image],
    },
  };
}

/* ---------------------------------------------
   Page
---------------------------------------------- */
export default async function SupplementsPage({
  params,
}: {
  params: { country: string; locale: Locale; slug: string };
}) {
  const { country, locale, slug } = params;

  const translations = getTranslation(locale);
  const categoryKey = getCategoryKey(slug);

  if (!categoryKey) notFound();

  const t = translations[categoryKey];
  if (!t) notFound();

  const knowMoreData = translations.knowMore?.[categoryKey] ?? {};

  return (
    <main className="min-h-screen bg-white">
      {/* Categories */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <CategoriesSection
            translations={translations}
            locale={locale}
            categoryFilter={categoryKey}
            country={country}
          />
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8">
            {t.benefits?.title}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.benefits?.items?.map((benefit: string, index: number) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="p-0">
                  <CheckCircle className="h-8 w-8 text-emerald-500 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">{benefit}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-center text-muted-foreground mt-6 max-w-3xl mx-auto">
            {t.benefits?.footer}
          </p>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8">
            {t.trustBadges?.title}
          </h2>

          <div className="flex justify-center gap-8 flex-wrap">
            {t.trustBadges?.items?.map((badge: any, index: number) => (
              <Image
                key={index}
                src={badge.image ?? "/placeholder.svg"}
                alt={badge.alt ?? ""}
                width={80}
                height={80}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Gender Sections */}
      <section className="py-12">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              {t.genderSpecific?.women?.title}
            </h2>
            <p className="text-muted-foreground mb-4">
              {t.genderSpecific?.women?.description}
            </p>
            <ul className="space-y-2">
              {t.genderSpecific?.women?.items?.map(
                (item: string, index: number) => (
                  <li key={index} className="flex gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                    <span>{item}</span>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">
              {t.genderSpecific?.men?.title}
            </h2>
            <p className="text-muted-foreground mb-4">
              {t.genderSpecific?.men?.description}
            </p>
            <ul className="space-y-2">
              {t.genderSpecific?.men?.items?.map(
                (item: string, index: number) => (
                  <li key={index} className="flex gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                    <span>{item}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <CategoryReviewsSection category={slug} translations={translations} />

      {/* FAQs */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8">
            {t.faqs?.title}
          </h2>

          <Accordion type="single" collapsible className="max-w-3xl mx-auto">
            {t.faqs?.items?.map((faq: any, index: number) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Know More */}
      <ProductknowMoreSection
        translations={{ productKnowMore: knowMoreData }}
      />
    </main>
  );
}

/* ---------------------------------------------
   Static Params
---------------------------------------------- */
export async function generateStaticParams() {
  return [
    { country: "in", locale: "en", slug: "weight-loss-supplements" },
    { country: "in", locale: "en", slug: "dental-health-supplements" },
    { country: "us", locale: "en", slug: "weight-loss-supplements" },
    { country: "us", locale: "en", slug: "dental-health-supplements" },
    { country: "us", locale: "es", slug: "weight-loss-supplements" },
    { country: "us", locale: "es", slug: "dental-health-supplements" },
  ];
}
