// src/app/[country]/[locale]/layout.tsx
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";
import { getTranslation, type Locale } from "@/lib/i18n";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { TranslationProvider } from "@/context/TranslationContext";
import { validCountryISOs } from "@/middleware";
import { countryNamesByISO } from "@/lib/country";

// Define supported countries and languages (adjust based on your actual list from "@/i18n" or elsewhere)
const supportedCountries = validCountryISOs; // Example: Add all your valid country codes here, lowercase
const supportedLanguages: Locale[] = ["en", "es"];

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

// generateMetadata: async + await params + return
export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; locale: string }>;
}): Promise<Metadata> {
  const { country, locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const t = await getTranslation(locale); // Ensure getTranslation is async if needed

  // Generate the full set of hreflang alternates for all country-language combinations
  const langMap: Record<string, string> = {};
  for (const lang of supportedLanguages) {
    for (const cty of supportedCountries) {
      const region = cty.toUpperCase();
      const hrefLang = `${lang}-${region}`;
      const url = `/${cty}/${lang}`;
      langMap[hrefLang] = url;
    }
  }
  // Optionally add x-default (e.g., point to a default like /us/en)
  langMap["x-default"] = "/us/en"; // Adjust to your preferred default

  return {
    title:  `${t.seo.title} | ${countryNamesByISO[(country?.toLowerCase() as keyof typeof countryNamesByISO)] || country || 'Unknown'}`,
    description: t.seo.description,
    keywords: t.seo.keywords,
    metadataBase: new URL("https://supplelogic.com"),
    alternates: {
      canonical: `/${country}/${locale}`,
      languages: langMap,
    },
    openGraph: {
      title: t.seo.title,
      description: t.seo.description,
      url: `https://supplelogic.com/${country}/${locale}`,
      siteName: "Mitolyn Official",
      images: [
        {
          url: "https://res.cloudinary.com/ddywjrr08/image/upload/v1758422485/mitolyn-bottle_dj1mxc.webp",
          width: 1200,
          height: 630,
          alt: t.seo.title,
        },
      ],
      locale: `${locale}_${country.toUpperCase()}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t.seo.title,
      description: t.seo.description,
      images: [
        "https://res.cloudinary.com/ddywjrr08/image/upload/v1758422485/mitolyn-bottle_dj1mxc.webp",
      ],
    },
    // Additional SEO-related metadata (optional enhancements)
    robots: "index, follow", // Controls search engine crawling
    viewport: "width=device-width, initial-scale=1", // Mobile responsiveness
    // You can add more like verification for Google Search Console if needed
    // verification: { google: "your-google-site-verification-code" },
  };
}

// Layout: async + await params
export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ country: string; locale: string }>;
}) {
  const { country, locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const translations = await getTranslation(locale); // Ensure async if needed

  return (
    <html lang={locale} className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <body data-hydrated="true" className="min-h-screen flex flex-col">
        <Header country={country} locale={locale} translations={translations} />
        <main className="flex-grow">
          <TranslationProvider locale={locale}>{children}</TranslationProvider>
        </main>
        <Footer country={country} locale={locale} translations={translations} />
      </body>
    </html>
  );
}