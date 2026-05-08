import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight, BookOpen, Clock, Sparkles } from "lucide-react";
import {
  getTranslation,
  type Locale,
  LOCALE_CODES,
  LOCALES,
} from "@/lib/i18n";
import {
  BASE_URL,
  INDEXABLE_LOCALES,
  isIndexable,
} from "@/lib/constants";
import { INDIA_CITIES, getCityBySlug } from "@/lib/cities";
import { getCityIdentity } from "@/lib/city-identity";
import { getCityPosts } from "@/lib/city-blog";
import { buildBreadcrumbJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section, Eyebrow } from "@/components/primitives/section";
import { Cta } from "@/components/sections/Cta";
import { cityIdentityVisuals } from "@/components/illustrations/CityIdentityVisuals";
import LocalizedLink from "@/components/LocalizedLink";

const BLOG_PATH = "blog";

export async function generateStaticParams() {
  const locales: Locale[] = ["en", "hi"];
  const country = "in";
  const params: Array<{ country: string; locale: string; city: string }> = [];
  for (const city of INDIA_CITIES) {
    for (const locale of locales) {
      params.push({ country, locale, city: city.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; locale: string; city: string }>;
}): Promise<Metadata> {
  const { country, locale, city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return { title: "Not found" };

  const lc = (LOCALE_CODES.includes(locale as Locale) ? locale : "en") as Locale;
  const identity = getCityIdentity(citySlug);

  const title = `${city.name} Journal — Field Notes on Building Revenue Systems in ${city.name}${identity ? ` (${identity.nickname})` : ""} · Sanat Dynamo`;
  const description = `Long-form posts on what we ship in ${city.name}: local SEO, lead routing, dealer portals, and the moves agencies serving ${city.name} consistently miss.`;

  const canonical = `/${country}/${lc}/cities/${city.slug}/${BLOG_PATH}`;
  const languages: Record<string, string> = {};
  for (const lang of INDEXABLE_LOCALES) {
    languages[LOCALES[lang].htmlLang] =
      `${BASE_URL}/in/${lang}/cities/${city.slug}/${BLOG_PATH}`;
  }
  languages["x-default"] = `${BASE_URL}/in/en/cities/${city.slug}/${BLOG_PATH}`;

  return {
    title,
    description,
    keywords: `${city.name} blog, ${city.name} insights, ${city.name} marketing, ${city.name} digital strategy, ${city.name} agency notes, ${city.name} case studies`,
    metadataBase: new URL(BASE_URL),
    alternates: { canonical, languages },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}${canonical}`,
      siteName: "Sanat Dynamo",
      locale: `${lc}_${country.toUpperCase()}`,
      type: "website",
      images: [{ url: `${BASE_URL}/og.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${BASE_URL}/og.png`],
    },
    robots: isIndexable(country, lc)
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
      : { index: false, follow: true, googleBot: { index: false, follow: true } },
  };
}

export default async function CityBlogIndexPage({
  params,
}: {
  params: Promise<{ country: string; locale: string; city: string }>;
}) {
  const { country, locale, city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city || country !== "in") notFound();

  const lc = (LOCALE_CODES.includes(locale as Locale) ? locale : "en") as Locale;
  const t = getTranslation(lc);
  const identity = getCityIdentity(citySlug);
  const Identity = cityIdentityVisuals[citySlug];
  const posts = getCityPosts(citySlug);

  const homeUrl = `${BASE_URL}/${country}/${lc}`;
  const cityUrl = `${homeUrl}/cities/${city.slug}`;
  const blogUrl = `${cityUrl}/${BLOG_PATH}`;

  const breadcrumbLd = buildBreadcrumbJsonLd([
    { name: t.nav.home, url: homeUrl },
    { name: "Cities", url: `${homeUrl}/cities` },
    { name: city.name, url: cityUrl },
    { name: "Journal", url: blogUrl },
  ]);

  // Blog ItemList schema
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${blogUrl}#blog`,
    name: `${city.name} Journal — Sanat Dynamo`,
    url: blogUrl,
    description: `Long-form posts on operating in ${city.name}.`,
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.excerpt,
      url: `${blogUrl}/${p.slug}`,
      datePublished: p.publishedAt,
      author: { "@type": "Organization", name: t.brand.name },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />

      <PageHero
        eyebrow={`${city.name} journal`}
        title={
          <>
            Field notes from{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: identity
                  ? `linear-gradient(120deg, ${identity.themeColor}, ${identity.themeColorAccent})`
                  : undefined,
              }}
            >
              building revenue systems in {city.name}
            </span>
            .
          </>
        }
        subtitle={`Long-form posts on what we ship locally — and the moves agencies serving ${city.name} consistently miss.`}
        breadcrumb={`${city.name} · Journal`}
      />

      {/* Sub-nav chips */}
      <Section className="pt-8">
        <div className="flex flex-wrap items-center gap-2">
          <LocalizedLink
            href={`/cities/${city.slug}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-accent/40 hover:text-foreground"
          >
            {city.name} overview
          </LocalizedLink>
          <LocalizedLink
            href={`/cities/${city.slug}/about`}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-accent/40 hover:text-foreground"
          >
            About {identity?.nickname ?? city.name}
          </LocalizedLink>
          <span
            className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-accent"
          >
            <BookOpen size={11} />
            Journal · {posts.length} {posts.length === 1 ? "post" : "posts"}
          </span>
        </div>
      </Section>

      {/* Identity strip — small version of the city visual at the top */}
      {Identity && identity && (
        <Section className="pt-6">
          <div
            className="overflow-hidden rounded-3xl border p-2"
            style={{
              borderColor: identity.themeColor.replace(")", " / 0.3)"),
              background: `linear-gradient(120deg, ${identity.themeColor.replace(")", " / 0.06)")}, transparent 70%)`,
            }}
          >
            <Identity className="rounded-2xl" />
          </div>
        </Section>
      )}

      {/* Posts grid */}
      <Section className="pt-0">
        {posts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border bg-surface/30 p-10 text-center">
            <p className="text-muted-foreground">
              The {city.name} journal launches soon. Check back for posts on
              local revenue-system tactics — or read our pan-India journal in
              the meantime.
            </p>
            <LocalizedLink
              href="/blogs"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
            >
              Pan-India journal <ArrowUpRight size={14} />
            </LocalizedLink>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-12">
            {/* Featured post — first one bigger */}
            {posts[0] && (
              <article className="lg:col-span-12">
                <LocalizedLink
                  href={`/cities/${city.slug}/blog/${posts[0].slug}`}
                  className="group block overflow-hidden rounded-3xl border border-border bg-surface/40 transition-all hover:-translate-y-0.5 hover:border-accent/40"
                  style={{
                    background: identity
                      ? `linear-gradient(140deg, ${identity.themeColor.replace(")", " / 0.06)")}, transparent 60%)`
                      : undefined,
                  }}
                >
                  <div className="grid gap-6 p-6 lg:grid-cols-12 lg:gap-10 lg:p-10">
                    <div className="lg:col-span-7">
                      <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                        <span
                          className="rounded-full border px-2 py-0.5"
                          style={{
                            borderColor:
                              identity?.themeColor.replace(")", " / 0.4)") ??
                              "var(--border)",
                            color: identity?.themeColor ?? "var(--accent)",
                          }}
                        >
                          <Sparkles size={9} className="mr-1 inline" />
                          Featured
                        </span>
                        <span>{posts[0].publishedAt}</span>
                        <span className="flex items-center gap-1">
                          <Clock size={11} />
                          {posts[0].readTime} min read
                        </span>
                      </div>
                      <h2 className="text-balance mt-4 font-display text-2xl font-semibold leading-tight tracking-tight text-foreground transition-colors group-hover:text-accent sm:text-3xl lg:text-4xl">
                        {posts[0].title}
                      </h2>
                      <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                        {posts[0].subtitle}
                      </p>
                      <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-5 py-2.5 text-sm font-semibold text-accent">
                        Read the post
                        <ArrowUpRight
                          size={14}
                          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </div>
                    </div>
                    <div className="lg:col-span-5">
                      <div className="space-y-2">
                        {posts[0].sections.slice(0, 3).map((s, i) => (
                          <div
                            key={i}
                            className="rounded-xl border border-border bg-background/60 p-3"
                          >
                            <div
                              className="font-mono text-[9px] uppercase tracking-[0.22em]"
                              style={{
                                color: identity?.themeColor ?? "var(--accent)",
                              }}
                            >
                              §{String(i + 1).padStart(2, "0")}
                            </div>
                            <div className="mt-1 line-clamp-1 text-sm font-semibold text-foreground">
                              {s.heading}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </LocalizedLink>
              </article>
            )}

            {/* Subsequent posts — grid */}
            {posts.slice(1).map((p) => (
              <article key={p.slug} className="lg:col-span-4">
                <LocalizedLink
                  href={`/cities/${city.slug}/blog/${p.slug}`}
                  className="group block h-full rounded-3xl border border-border bg-surface/40 p-6 transition-all hover:-translate-y-0.5 hover:border-accent/40 sm:p-7"
                >
                  <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                    <span>{p.publishedAt}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock size={10} />
                      {p.readTime} min
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-accent sm:text-xl">
                    {p.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {p.excerpt}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-accent">
                    Read post <ArrowUpRight size={12} />
                  </div>
                </LocalizedLink>
              </article>
            ))}
          </div>
        )}
      </Section>

      <Cta t={t} country={country} />
    </>
  );
}
