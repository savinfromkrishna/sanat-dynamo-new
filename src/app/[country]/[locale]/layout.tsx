// src/app/[country]/[locale]/layout.tsx

import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";

import { getTranslation, type Locale } from "@/lib/i18n";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { TranslationProvider } from "@/context/TranslationContext";

import { validCountryISOs } from "@/middleware";
import { getUserGeo } from "@/lib/getUserGeo"; // ✅ GEO SERVER HELPER

// ------------------------------------------------

const supportedCountries = validCountryISOs;
const supportedLanguages: Locale[] = ["en", "es"];

// Fonts
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


// ========================================================
// ✅ HELPER TO GET LOCALIZED COUNTRY NAME
// ========================================================
function getCountryName(code: string, locale: Locale): string {
  const lowerCode = code.toLowerCase();
  const maps: Record<Locale, Record<string, string>> = {
    en: {
      // Add supported countries here, e.g.
      us: "United States",
      es: "Spain",
      in: "India",
      // ... add more from validCountryISOs
    },
    es: {
      us: "Estados Unidos",
      es: "España",
      in: "India",
      // ... add more
    },
  };

  return maps[locale][lowerCode] || code.toUpperCase();
}


// ========================================================
// ✅ SEO METADATA WITH CITY + REGION
// ========================================================

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; locale: string }>;
}): Promise<Metadata> {

  const { country, locale: rawLocale } = await params;
  const locale = rawLocale as Locale;

  const t = await getTranslation(locale);

  // ✅ Get GEO data (SERVER SIDE) with locale for localization
  const geo = await getUserGeo();

  // Country readable name (localized)
  const fallbackCountryName = geo.country
    ? getCountryName(geo.country, locale)
    : getCountryName(country, locale);

  // ✅ Build dynamic location (using localized geo data if available)
  let locationLabel = fallbackCountryName;

  if (geo.city && geo.region) {
    locationLabel = `${geo.city}, ${geo.region}`;
  } else if (geo.city) {
    locationLabel = `${geo.city}, ${fallbackCountryName}`;
  } else if (geo.region) {
    locationLabel = `${geo.region}, ${fallbackCountryName}`;
  }

  // FINAL SEO TITLE
  const finalTitle = `${t.seo.title} | ${locationLabel}`;

  // hreflang map
  const langMap: Record<string, string> = {};

  for (const lang of supportedLanguages) {
    for (const cty of supportedCountries) {
      const region = cty.toUpperCase();
      langMap[`${lang}-${region}`] = `/${cty}/${lang}`;
    }
  }

  langMap["x-default"] = "/us/en";

  return {
    title: finalTitle,
    description: t.seo.description,
    keywords: t.seo.keywords,

    metadataBase: new URL("https://sanat-rewa.vercel.app"),

    alternates: {
      canonical: `/${country}/${locale}`,
      languages: langMap,
    },

    openGraph: {
      title: finalTitle,
      description: t.seo.description,
      url: `https://sanat-rewa.vercel.app/${country}/${locale}`,
      siteName: "Mitolyn Official",
      images: [
        {
          url: "https://res.cloudinary.com/ddywjrr08/image/upload/v1758422485/mitolyn-bottle_dj1mxc.webp",
          width: 1200,
          height: 630,
          alt: finalTitle,
        },
      ],
      locale: `${locale}_${country.toUpperCase()}`,
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: t.seo.description,
      images: [
        "https://res.cloudinary.com/ddywjrr08/image/upload/v1758422485/mitolyn-bottle_dj1mxc.webp",
      ],
    },

    robots: "index, follow",
    viewport: "width=device-width, initial-scale=1",
  };
}


// ========================================================
// ✅ ROOT LAYOUT
// ========================================================

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ country: string; locale: string }>;
}) {

  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;

  const translations = await getTranslation(locale);

  return (
    <html
      lang={locale}
      className={`${spaceGrotesk.variable} ${dmSans.variable}`}
    >
      <body
        data-hydrated="true"
        className="min-h-screen flex flex-col"
      >
        <Header
          translations={{
            nav: { home: "home" },
          }}
        />

        <main className="flex-grow">
          <TranslationProvider locale={locale}>
            {children}
          </TranslationProvider>
        </main>

        <Footer translations={translations} />
      </body>
    </html>
  );
}