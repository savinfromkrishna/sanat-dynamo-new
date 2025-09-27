import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ProductDetailPageClient from "./ProductDetailPageClient"
import { getTranslation, type Locale } from "@/lib/i18n"
import type { ProductDetail } from "./product-data"

export async function generateMetadata({ params }: { params: {
  country: string; 
  locale: Locale;
  slug: string;
} }): Promise<Metadata> {
  const { locale, slug, country } = await params
  
  const translations = getTranslation(locale)
  const product = translations.products[slug] as ProductDetail | undefined
  
  if (!product) {
    return {
      title: translations.common.productNotFound,
    }
  }

  return {
    title: product.seo.title,
    description: product.seo.description,
    keywords: product.seo.keywords,
    metadataBase: new URL("https://mitolyn-official.com"),
    alternates: {
      canonical: `/${country}/${locale}/weight-loss-supplements/${product.slug}`,
      languages: {
        "en-US": `/${country}/en/weight-loss-supplements/${product.slug}`,
        "es-ES": `/${country}/es/weight-loss-supplements/${product.slug}`,
      },
    },
    openGraph: {
      title: product.seo.title,
      description: product.seo.description,
      url: `https://mitolyn-official.com/${country}/${locale}/weight-loss-supplements/${product.slug}`,
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

export default async function ProductPage({ params }: { params: { 
  country: string; 
  locale: Locale; 
  slug: string 
}}) {
  const { locale, slug } = await params
  
  const translations = getTranslation(locale)
  const product = translations.products[slug] as ProductDetail | undefined
  
  if (!product) {
    notFound()
  }

  return <ProductDetailPageClient product={product} translations={translations} locale={locale} />
}

export async function generateStaticParams() {
  const locales: Locale[] = ["en", "es"];
  const countries = ["us", "in", "ca"];
  
  const paramsArray: any[] = [];
  
  for (const country of countries) {
    for (const locale of locales) {
      const translations = getTranslation(locale);
      const productSlugs = Object.keys(translations.products);
      
      for (const slug of productSlugs) {
        paramsArray.push({
          country,
          locale,
          slug
        });
      }
    }
  }
  
  return paramsArray;
}