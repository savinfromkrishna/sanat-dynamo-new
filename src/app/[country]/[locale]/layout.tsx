// app/[country]/[locale]/layout.tsx
import type { ReactNode } from "react"
import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import "./globals.css"
import { getTranslation, type Locale } from "@/lib/i18n"
import Header from "@/components/common/header"
import Footer from "@/components/common/footer"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

export async function generateMetadata({
  params,
}: {
  params: { country: string; locale: Locale }
}): Promise<Metadata> {
  const { country, locale } = params
  const t = getTranslation(locale)

  return {
    title: {
      default: t.seo.title,
      template: `%s | ${t.seo.title}`,
    },
    description: t.seo.description,
    keywords: t.seo.keywords,
    metadataBase: new URL("https://mitolyn-official.com"),
    alternates: {
      canonical: `/${country}/${locale}`,
      languages: {
        "en-US": `/${country}/en`,
        "es-ES": `/${country}/es`,
      },
    },
    openGraph: {
      title: t.seo.title,
      description: t.seo.description,
      url: `https://mitolyn-official.com/${country}/${locale}`,
      siteName: "Mitolyn Official",
      images: [
        {
          url: "https://res.cloudinary.com/ddywjrr08/image/upload/v1758422485/mitolyn-bottle_dj1mxc.webp",
          width: 1200,
          height: 630,
          alt: t.seo.title,
        },
      ],
      locale: locale === "es" ? "es_ES" : "en_US",
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
  }
}

export default function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode
  params: { country: string; locale: Locale }
}>) {
  const { country, locale } = params
  const translations = getTranslation(locale)
  return (
    <html lang={locale} className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header country={country} locale={locale} translations={translations} />
        <main className="flex-grow">{children}</main>
        <Footer translations={translations} />
      </body>
    </html>
  )
}
