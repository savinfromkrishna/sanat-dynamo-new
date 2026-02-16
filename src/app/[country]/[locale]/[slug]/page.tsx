import type { Metadata, Viewport } from "next"
import Image from "next/image"
import { 
  ArrowRight, Binary, CheckCircle, Code2, Shield, Zap, Activity, Cpu, 
  Terminal, Globe, Layers, Database, Fingerprint, MousePointer2, 
  Settings, Layout, Command, Hash 
} from "lucide-react"

import CategoryReviewsSection from "@/components/category-reviews-section"
import { CategoriesSection } from "@/components/home/CategoriesSection"
import { ProductknowMoreSection } from "@/components/productKnowMore"

import { getTranslation, type Locale } from "@/lib/i18n"
import { validCountryISOs } from "@/middleware"
import { countryNamesByISO } from "@/lib/country"
import { ClientNavigationWrapper } from "@/components/ClientNavigationWrapper"
import { getUserGeo } from "@/lib/getUserGeo"

const supportedCountries = validCountryISOs
const supportedLanguages: Locale[] = ["en", "es"]

/* ------------------------------------------------------------------ */
/* Viewport */
/* ------------------------------------------------------------------ */
export function generateViewport(): Viewport {
  return {
    width: "device-width",
    initialScale: 1,
    themeColor: "#0f172a",
    colorScheme: "light dark",
  }
}

/* ------------------------------------------------------------------ */
/* Category → Key Mapping */
/* ------------------------------------------------------------------ */
type CategoryKey = "weightLoss" | "oralProbiotics" | "sleepStress" | "gutHealth"

const CATEGORY_MAP: Record<string, CategoryKey> = {
  "web-dev": "weightLoss",
  "ai-solutions": "oralProbiotics",
  "cloud-devops": "sleepStress",
  "cybersecurity": "gutHealth",
} as const

function getCategoryKey(slug: string): CategoryKey | null {
  return CATEGORY_MAP[slug as keyof typeof CATEGORY_MAP] ?? null
}

/* ------------------------------------------------------------------ */
/* Metadata – Ultra-localized with City + Region */
/* ------------------------------------------------------------------ */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; locale: string; slug: string }>
}): Promise<Metadata> {
  const { country, locale: rawLocale, slug } = await params
  const locale = (rawLocale === "es" ? "es" : "en") as Locale

  const translations = await getTranslation(locale)
  const categoryKey = getCategoryKey(slug)

  if (!categoryKey || !translations?.[categoryKey]?.seo) {
    return {
      title: "ArchLayer – Node Not Found",
      description: "The requested digital module could not be located in registry.",
    }
  }

  const t = translations[categoryKey]
  const geo = await getUserGeo()
  const countryName = countryNamesByISO[country.toLowerCase() as keyof typeof countryNamesByISO] || country.toUpperCase()
  let location = countryName
  if (geo.city && geo.region) {
    location = `${geo.city}, ${geo.region}`
  } else if (geo.city) {
    location = geo.city
  } else if (geo.region) {
    location = geo.region
  }

  const pageTitle = `${t.seo.title} • ${location}`
  const pageDesc = `${t.seo.description} – Tailored digital excellence for businesses in ${location}.`

  const langMap: Record<string, string> = {}
  supportedLanguages.forEach(lang => {
    supportedCountries.forEach(cty => {
      langMap[`${lang}-${cty.toUpperCase()}`] = `/${cty}/${lang}/${slug}`
    })
  })
  langMap["x-default"] = `/us/en/${slug}`

  return {
    title: pageTitle,
    description: pageDesc,
    keywords: `${t.seo.keywords}, ${location.toLowerCase()}, ${slug.replace('-', ' ')} development, best in ${location}`,
    metadataBase: new URL("https://your-domain.com"),
    alternates: {
      canonical: `/${country}/${locale}/${slug}`,
      languages: langMap,
    },
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      url: `https://your-domain.com/${country}/${locale}/${slug}`,
      siteName: "ArchLayer",
      images: [{ url: "/og-category.webp", width: 1200, height: 630, alt: pageTitle }],
      locale: `${locale}_${country.toUpperCase()}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDesc,
      images: ["/og-category.webp"],
    },
    other: {
      "geo.region": geo.region || country.toUpperCase(),
      "geo.placename": location,
    },
  }
}

/* ------------------------------------------------------------------ */
/* Compact Tech Decoration Frame */
/* ------------------------------------------------------------------ */
const TechNode = ({ label, className = "" }: { label: string; className?: string }) => (
  <div className={`absolute pointer-events-none hidden lg:block ${className}`}>
    <div className="relative p-2.5 border border-blue-500/8 rounded-xl bg-white/20 backdrop-blur-lg shadow-sm">
      <div className="absolute -top-2 left-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-[8px] text-white px-1.5 py-0.5 font-black uppercase tracking-widest rounded-sm flex items-center gap-1 shadow-sm">
        <MousePointer2 size={6} /> {label}
      </div>
      <div className="w-24 h-1 bg-gradient-to-r from-blue-500/30 to-transparent rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 w-2/3 animate-pulse-slow" />
      </div>
    </div>
  </div>
)

/* ------------------------------------------------------------------ */
/* Main Page – Ultra-Aesthetic & Premium */
/* ------------------------------------------------------------------ */
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ country: string; locale: string; slug: string }>
}) {
  const { country, locale: rawLocale, slug } = await params
  const locale = (rawLocale === "es" ? "es" : "en") as Locale

  const translations = await getTranslation(locale)
  const categoryKey = getCategoryKey(slug)

  if (!categoryKey) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white">
        <div className="text-center p-12 border border-slate-200/50 rounded-3xl bg-white/70 backdrop-blur-xl shadow-2xl max-w-lg mx-6">
          <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Node Offline</h1>
          <p className="text-slate-500 font-mono text-sm">/{slug} not found in registry.</p>
        </div>
      </div>
    )
  }

  const t = translations?.[categoryKey]

  if (!t) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white">
        <div className="p-12 bg-white/70 backdrop-blur-xl rounded-3xl border border-slate-200/50 shadow-2xl text-center">
          <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Stream Disconnected</h1>
        </div>
      </div>
    )
  }

  const geo = await getUserGeo()

  const countryName = countryNamesByISO[country.toLowerCase() as keyof typeof countryNamesByISO] || country.toUpperCase()
  let location = countryName
  if (geo.city && geo.region) location = `${geo.city}, ${geo.region}`
  else if (geo.city) location = geo.city
  else if (geo.region) location = geo.region

  return (
    <div className="bg-gradient-to-b from-white via-slate-50/70 to-white min-h-screen relative overflow-x-hidden pt-16 md:pt-20">

      {/* Cinematic backdrop */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(#e2e8f0_0.8px,transparent_0.8px)] [background-size:20px_20px] opacity-30 -z-10" />
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-t from-white via-transparent to-slate-50/30 -z-10" />
      <div className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-scan-slow z-10" />

      {/* Hero – Luxe & Compact */}
      <section className="relative pt-28 md:pt-36 pb-20 md:pb-32 overflow-hidden border-b border-slate-100/80">
        <TechNode label="Core" className="top-28 right-[7%]" />
        <TechNode label="Node" className="bottom-32 left-[6%]" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 via-transparent to-indigo-500/3 pointer-events-none" />

        <div className="container mx-auto px-5 sm:px-6 lg:px-10 max-w-6xl relative z-10 text-left">
          <div className="space-y-10 md:space-y-14">
            <div className="inline-flex items-center gap-4 px-5 py-2 rounded-full bg-white/70 backdrop-blur-md border border-slate-200/60 shadow-sm">
              <Terminal size={14} className="text-blue-600" />
              <span className="text-[10px] font-black tracking-[0.4em] text-slate-600 uppercase">Sector • {slug.toUpperCase()}</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-slate-950 leading-[0.88] uppercase">
              {t.title.split('–')[0]}<span className="text-blue-600">.</span>
              <br className="hidden sm:block" />
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl block mt-3 bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                {t.title.split('–')[1] || "ARCHITECTURE"}
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-slate-600 font-light leading-relaxed max-w-4xl">
              {t.intro} — Precision-engineered for businesses in <span className="text-blue-600 font-medium">{location}</span>.
            </p>

            <div className="flex flex-wrap gap-5 pt-6">
              {[
                { icon: Binary, label: "Modular", value: "v4.3" },
                { icon: Shield, label: "Secure", value: "ISO 27001" },
              ].map((stat, i) => (
                <div 
                  key={i}
                  className="flex items-center gap-4 px-5 py-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-slate-200/60 shadow-sm hover:border-blue-400/40 hover:shadow-md transition-all group"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-50/80 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <stat.icon size={18} />
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">{stat.label}</span>
                    <span className="text-sm font-black text-slate-900">{stat.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section – already refined */}
      <section className="relative border-y border-slate-100/60 bg-gradient-to-b from-slate-50/40 to-white/30 backdrop-blur-sm">
        <ClientNavigationWrapper country={country} locale={locale}>
          <CategoriesSection
            translations={translations}
            locale={locale}
            country={country}
            categoryFilter={categoryKey as any}
          />
        </ClientNavigationWrapper>
      </section>

      {/* Benefits – Ultra-compact premium cards */}
      {t.benefits && (
        <section className="py-28 md:py-36 relative">
          <div className="container mx-auto px-5 sm:px-6 lg:px-10 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="space-y-8 text-left">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-xl bg-blue-50/70 text-blue-600 text-[10px] font-black uppercase tracking-wider border border-blue-100/40 shadow-sm">
                  <Zap size={14} className="animate-pulse" /> Core Engineering
                </div>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-slate-950 leading-[0.9]">
                  Built for <span className="text-blue-600">Excellence</span>
                </h2>
                <p className="text-lg sm:text-xl text-slate-600 font-light leading-relaxed max-w-xl">
                  Enterprise-grade architecture tailored for {location}'s fastest-growing businesses.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {t.benefits.items.map((item: string, i: number) => (
                  <div 
                    key={i}
                    className="group relative p-6 md:p-7 rounded-2xl bg-white/70 backdrop-blur-md border border-slate-200/60 hover:border-blue-400/30 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/5 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-transparent group-hover:from-blue-500/5 transition-all" />
                    <div className="relative z-10 space-y-5">
                      <div className="w-10 h-10 rounded-xl bg-blue-50/70 flex items-center justify-center text-blue-600 border border-blue-100/50 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        {i % 2 === 0 ? <Code2 size={20} /> : <Database size={20} />}
                      </div>
                      <h3 className="text-lg md:text-xl font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors leading-tight">
                        {item}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Reviews – localized */}
      <CategoryReviewsSection 
        category={slug} 
        translations={translations} 
        locale={locale} 
        country={country} 
      />

      {/* Trust Badges – delicate & premium */}
      {t.trustBadges && (
        <section className="py-28 md:py-36 border-t border-slate-100/60 bg-gradient-to-b from-white to-slate-50/30">
          <div className="container mx-auto px-5 sm:px-6 lg:px-10 max-w-6xl text-center">
            <div className="space-y-6 mb-12">
              <span className="text-[10px] font-black tracking-[0.4em] text-slate-500 uppercase">Certified Ecosystem</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-slate-950">
                Trusted by <span className="text-blue-600">Industry Leaders</span>
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-10 md:gap-16 lg:gap-20">
              {t.trustBadges.items.map((b: any, i: number) => (
                <div 
                  key={i}
                  className="flex flex-col items-center group transition-all duration-600 hover:scale-105 hover:-translate-y-1"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 mb-5 relative opacity-60 group-hover:opacity-100 transition-all duration-700 grayscale group-hover:grayscale-0">
                    <Image 
                      src={b.image} 
                      alt={b.alt} 
                      fill 
                      className="object-contain drop-shadow-lg" 
                    />
                  </div>
                  <span className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-wider group-hover:text-blue-600 transition-colors">
                    {b.alt}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Knowledge Section */}
      <ProductknowMoreSection 
        translations={translations} 
        locale={locale} 
        country={country} 
      />

      {/* Final CTA – cinematic & luxurious */}
      <section className="py-40 md:py-56 relative bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: `radial-gradient(white 0.8px, transparent 0.8px)`, backgroundSize: '26px 26px' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        <div className="container mx-auto px-5 sm:px-6 lg:px-10 text-center relative z-10 max-w-5xl">
          <div className="space-y-10 md:space-y-14">
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.88] uppercase">
              Ready to <span className="text-cyan-400">Launch?</span>
            </h2>

            <p className="text-xl md:text-2xl text-slate-300 font-light max-w-3xl mx-auto">
              Deploy world-class digital infrastructure optimized for {location}.
            </p>

            <button className="group relative inline-flex items-center gap-6 px-14 md:px-20 py-7 md:py-9 rounded-3xl bg-white text-slate-950 font-black uppercase text-base md:text-lg tracking-widest hover:bg-cyan-500 hover:text-white transition-all duration-600 shadow-2xl hover:shadow-[0_40px_100px_-15px_rgba(6,182,212,0.5)] active:scale-98">
              Begin Deployment
              <ArrowRight className="w-8 h-8 md:w-9 md:h-9 group-hover:translate-x-3 transition-transform duration-700" />
            </button>

            <div className="flex flex-wrap justify-center gap-8 md:gap-12 pt-12 border-t border-white/10">
              {[
                { icon: Globe, text: "Global Edge Network" },
                { icon: Fingerprint, text: "Zero-Trust Security" },
                { icon: Activity, text: "Live Telemetry" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity">
                  <item.icon size={18} className="text-cyan-400" />
                  <span className="text-xs md:text-sm font-black text-white/90 uppercase tracking-wider">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export async function generateStaticParams() {
  const slugs = ["web-dev", "ai-solutions", "cloud-devops", "cybersecurity"]
  return validCountryISOs.flatMap(country =>
    supportedLanguages.flatMap(locale =>
      slugs.map(slug => ({ country, locale, slug }))
    )
  )
}