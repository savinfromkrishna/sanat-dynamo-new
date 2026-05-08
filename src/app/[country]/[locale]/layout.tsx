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
import {
  BASE_URL,
  INDEXABLE_LOCALES,
  isIndexable,
} from "@/lib/constants";
import { buildOrganizationJsonLd, buildWebsiteJsonLd } from "@/lib/seo";
import Header from "@/components/common/header";
import type { CityNavItem } from "@/components/common/MegaMenu";
import Footer from "@/components/common/footer";
import { INDIA_CITIES } from "@/lib/cities";
import { getCityIdentity } from "@/lib/city-identity";

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

  // Hreflang for the homepage only — child pages override via their own
  // `generateMetadata`. Cluster includes only the locales we want indexed
  // (INDEXABLE_LOCALES); other locales resolve but ship `noindex` and stay
  // out of the cluster so Google doesn't fold near-duplicate translation
  // fallbacks back into the canonical EN/HI versions.
  const langMap: Record<string, string> = {};
  for (const lang of INDEXABLE_LOCALES) {
    langMap[LOCALES[lang].htmlLang] = `${BASE_URL}/in/${lang}`;
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
    // Only INDEXABLE country+locale combinations are indexed (currently
    // /in/en and /in/hi). Everything else resolves but ships `noindex,follow`
    // so Google doesn't fold near-duplicates back into the canonical pages.
    // This is the indexability lever — keep this check tight.
    robots: isIndexable(country, locale)
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
          },
        }
      : {
          index: false,
          follow: true,
          googleBot: { index: false, follow: true },
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

  // Slim city nav data for the header mega-menu — built server-side so the
  // full CITY_IDENTITY object never enters the client bundle. Only the
  // fields the menu actually renders (slug/name/state/nickname/themeColor)
  // are sent down.
  const cityNavItems: CityNavItem[] = INDIA_CITIES.map((c) => {
    const id = getCityIdentity(c.slug);
    return {
      slug: c.slug,
      name: c.name,
      state: c.state,
      nickname: id?.nickname,
      themeColor: id?.themeColor,
    };
  });

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

        {/* Hreflang is emitted by Next.js from metadata.alternates.languages
            on each page. We deliberately do NOT emit hardcoded <link rel="alternate">
            tags here — the layout doesn't know the page path, so any tags it
            emits would point at the country root instead of the actual page.
            That mismatch (HTML hreflang vs sitemap hreflang) was killing
            cluster recognition; Google would discard the cluster and fold
            variants together. */}
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
        <Header
          translations={t}
          locale={locale}
          country={country}
          cities={cityNavItems}
        />
        <main className="flex-grow">{children}</main>
        <Footer translations={t} />
      </body>
    </html>
  );
}
