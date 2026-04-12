import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import {
  getTranslation,
  LOCALES,
  LOCALE_CODES,
  type Locale,
} from "@/lib/i18n";
import { BASE_URL } from "@/lib/constants";
import { buildOrganizationJsonLd, buildWebsiteJsonLd } from "@/lib/seo";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

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

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAFA" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0E1A" },
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; locale: string }>;
}): Promise<Metadata> {
  const { country, locale: rawLocale } = await params;
  const locale = (LOCALE_CODES.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : "en") as Locale;
  const t = getTranslation(locale);

  const langMap: Record<string, string> = {};
  for (const lang of LOCALE_CODES) {
    langMap[LOCALES[lang].htmlLang] = `${BASE_URL}/${country}/${lang}`;
  }
  langMap["x-default"] = `${BASE_URL}/in/en`;

  return {
    title: {
      default: t.seo.title,
      template: `%s · ${t.brand.name}`,
    },
    description: t.seo.description,
    keywords: t.seo.keywords,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `/${country}/${locale}`,
      languages: langMap,
    },
    openGraph: {
      title: t.seo.title,
      description: t.seo.description,
      url: `${BASE_URL}/${country}/${locale}`,
      siteName: t.brand.name,
      locale: `${locale}_${country.toUpperCase()}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t.seo.title,
      description: t.seo.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ country: string; locale: string }>;
}) {
  const { country, locale: rawLocale } = await params;
  const locale = (LOCALE_CODES.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : "en") as Locale;
  const t = getTranslation(locale);
  const meta = LOCALES[locale];

  const orgLd = buildOrganizationJsonLd(t);
  const siteLd = buildWebsiteJsonLd(t, locale, country);

  // AggregateRating — from testimonials (4.9/5 across 50+ engagements)
  const ratingLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: t.brand.name,
    url: `${BASE_URL}/${country}/${locale}`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      ratingCount: "50",
      reviewCount: String(t.testimonials.items.length),
    },
    review: t.testimonials.items.map((tm) => ({
      "@type": "Review",
      author: { "@type": "Person", name: tm.author },
      reviewBody: tm.quote,
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
    })),
  };

  return (
    <html
      lang={meta.htmlLang}
      dir={meta.dir}
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.classList.add('dark');else if(t==='light')document.documentElement.classList.add('light')}catch(e){}})()`,
          }}
        />

        {/* Preconnect to external origins for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />

        <link
          rel="alternate"
          hrefLang="x-default"
          href={`${BASE_URL}/in/en`}
        />
        {LOCALE_CODES.map((lang) => (
          <link
            key={lang}
            rel="alternate"
            hrefLang={LOCALES[lang].htmlLang}
            href={`${BASE_URL}/${country}/${lang}`}
          />
        ))}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ratingLd) }}
        />
      </head>
      <body className="min-h-screen font-sans text-foreground antialiased" suppressHydrationWarning>
        <Header translations={t} locale={locale} country={country} />
        <main className="flex-grow">{children}</main>
        <Footer translations={t} />
      </body>
    </html>
  );
}
