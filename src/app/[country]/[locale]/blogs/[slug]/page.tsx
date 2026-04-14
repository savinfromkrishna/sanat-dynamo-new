import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Bookmark,
  Calendar,
  ChevronRight,
  Clock,
  ExternalLink,
  Linkedin,
  Quote,
  RefreshCw,
  Sparkles,
  Tag,
  Target,
  Twitter,
  Zap,
} from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/primitives/section";
import LocalizedLink from "@/components/LocalizedLink";
import { Cta } from "@/components/sections/Cta";
import { getTranslation, type Locale } from "@/lib/i18n";
import { BASE_URL } from "@/lib/constants";
import {
  BLOG_CATEGORIES,
  BLOG_POSTS,
  getAdjacentPosts,
  getBlogPost,
  getRelatedPosts,
  localizePost,
  parseInlineLinks,
  slugifyHeading,
  type BlogCategory,
} from "@/lib/blogs";
import { getBlogUi } from "@/lib/blog-i18n";
import { BlogSketch } from "@/components/illustrations";

// ---------------------------------------------------------------------------
// Static params & metadata
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; locale: string; slug: string }>;
}): Promise<Metadata> {
  const { country, locale, slug } = await params;
  const base = getBlogPost(slug);
  if (!base) return { title: "Post not found" };
  const post = localizePost(base, locale as Locale);

  const canonical = `${BASE_URL}/${country}/${locale}/blogs/${slug}`;
  const description = post.excerpt;

  return {
    title: `${post.title}`,
    description,
    keywords: [post.keywords.primary, ...post.keywords.secondary, ...post.tags],
    authors: [{ name: post.author.name, url: `${BASE_URL}/${country}/${locale}/about` }],
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description,
      url: canonical,
      siteName: "Sanat Dynamo",
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author.name],
      tags: [post.keywords.primary, ...post.keywords.secondary, ...post.tags],
      locale: `${locale}_${country.toUpperCase()}`,
      images: [
        {
          url: `${BASE_URL}/og.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [`${BASE_URL}/og.png`],
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
    other: {
      "article:published_time": post.publishedAt,
      "article:modified_time": post.updatedAt ?? post.publishedAt,
      "article:author": post.author.name,
      "article:section": post.category,
      "article:tag": [post.keywords.primary, ...post.keywords.secondary].join(","),
    },
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale === "hi" ? "hi-IN" : "en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function categoryLabel(key: BlogCategory) {
  return BLOG_CATEGORIES.find((c) => c.key === key)?.label ?? key;
}

/**
 * Server-component renderer for a paragraph that may contain
 * `[anchor](/path)` style inline links. Relative paths are routed
 * through LocalizedLink, absolute URLs render as external <a>.
 */
function ParagraphWithLinks({ text }: { text: string }) {
  const tokens = parseInlineLinks(text);
  return (
    <p className="text-base leading-[1.75] text-muted-foreground sm:text-lg">
      {tokens.map((tok, i) => {
        if (tok.kind === "text") {
          return <span key={i}>{tok.value}</span>;
        }
        const isExternal = /^https?:\/\//.test(tok.href);
        if (isExternal) {
          return (
            <a
              key={i}
              href={tok.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent"
            >
              {tok.value}
            </a>
          );
        }
        return (
          <LocalizedLink
            key={i}
            href={tok.href}
            className="font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent"
          >
            {tok.value}
          </LocalizedLink>
        );
      })}
    </p>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ country: string; locale: string; slug: string }>;
}) {
  const { country, locale, slug } = await params;
  const base = getBlogPost(slug);
  if (!base) notFound();
  const loc = locale as Locale;
  const post = localizePost(base, loc);

  const t = getTranslation(loc);
  const ui = getBlogUi(loc);
  const prefix = `/${country.toLowerCase()}/${locale.toLowerCase()}`;
  const canonical = `${BASE_URL}${prefix}/blogs/${slug}`;
  const related = getRelatedPosts(slug, 3).map((p) => localizePost(p, loc));
  const adj = getAdjacentPosts(slug);
  const prev = adj.prev ? localizePost(adj.prev, loc) : null;
  const next = adj.next ? localizePost(adj.next, loc) : null;

  const wordCount = post.sections.reduce(
    (sum, s) => sum + s.paragraphs.join(" ").split(/\s+/).length,
    0
  );

  // ---------- JSON-LD ----------
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": canonical,
    headline: post.title,
    alternativeHeadline: post.subtitle,
    description: post.excerpt,
    image: [`${BASE_URL}/og.png`],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    wordCount,
    timeRequired: `PT${post.readTime}M`,
    inLanguage: locale,
    articleSection: categoryLabel(post.category),
    keywords: [post.keywords.primary, ...post.keywords.secondary, ...post.tags].join(", "),
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
      url: `${BASE_URL}${prefix}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: "Sanat Dynamo",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/og.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
    isPartOf: {
      "@type": "Blog",
      "@id": `${BASE_URL}${prefix}/blogs`,
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}${prefix}` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}${prefix}/blogs` },
      { "@type": "ListItem", position: 3, name: post.title, item: canonical },
    ],
  };

  const faqLd = post.faq && post.faq.length > 0 && {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  // Twitter/LinkedIn share URLs (target="_blank")
  const shareUrl = encodeURIComponent(canonical);
  const shareTitle = encodeURIComponent(post.title);
  const twitterShare = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`;
  const linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}

      <PageHero
        eyebrow={`Blog · ${categoryLabel(post.category)}`}
        title={post.title}
        subtitle={post.subtitle}
        breadcrumb={post.title}
        bgVariant="center"
      />

      {/* ================================================================ */}
      {/* Post meta strip                                                   */}
      {/* ================================================================ */}
      <Section className="pt-6 pb-0">
        <div className="flex flex-col gap-3 border-y border-border py-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4 sm:py-5">
          <div className="flex flex-wrap items-center gap-5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            <span className="flex items-center gap-1.5 text-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {post.author.name}
            </span>
            <span>{post.author.role}</span>
            <span className="flex items-center gap-1.5">
              <Calendar size={11} />
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt, locale)}
              </time>
            </span>
            {post.updatedAt && (
              <span className="flex items-center gap-1.5 text-accent">
                <RefreshCw size={11} />
                {ui.updatedOn}{" "}
                <time dateTime={post.updatedAt}>
                  {formatDate(post.updatedAt, locale)}
                </time>
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock size={11} />
              {ui.readTime(post.readTime)} · {ui.wordsCount(wordCount)}
            </span>
          </div>
          <LocalizedLink
            href="/blogs"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft size={11} />
            {ui.allPostsBackLink}
          </LocalizedLink>
        </div>
      </Section>

      {/* ================================================================ */}
      {/* Hero sketch                                                       */}
      {/* ================================================================ */}
      <Section className="pt-8 pb-0 sm:pt-10">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-surface/40 p-4 pt-12 sm:rounded-3xl sm:p-10">
          <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground sm:left-6 sm:top-6 sm:text-[10px]">
            <Sparkles size={11} className="text-accent" />
            {ui.fieldSketch} · {post.heroSketch}
          </div>
          <BlogSketch
            sketchKey={post.heroSketch}
            className="mx-auto h-auto w-full max-w-4xl"
          />
        </div>
      </Section>

      {/* ================================================================ */}
      {/* Main content layout: body + sticky TOC sidebar                    */}
      {/* ================================================================ */}
      <Section className="pt-10 sm:pt-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_260px] lg:gap-12">
          {/* ---------- Article body ---------- */}
          <article className="prose-like max-w-3xl">
            {/* Mobile-only TOC: collapsible above the TLDR for small screens */}
            <details className="mb-6 rounded-2xl border border-border bg-surface/40 p-5 lg:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                  {ui.onThisPage}
                </span>
                <ChevronRight
                  size={14}
                  className="text-accent transition-transform group-open:rotate-90"
                />
              </summary>
              <ol className="mt-4 space-y-3">
                {post.sections.map((section, i) => (
                  <li key={section.heading}>
                    <a
                      href={`#${slugifyHeading(section.heading)}`}
                      className="flex gap-3 text-sm leading-snug text-muted-foreground transition hover:text-foreground"
                    >
                      <span className="font-mono text-[10px] text-accent">
                        §{String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{section.heading}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </details>

            {/* TLDR */}
            <div className="rounded-2xl border border-border bg-surface/40 p-6 sm:p-7">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                <Zap size={11} className="text-accent" />
                {ui.tldr}
              </div>
              <p className="mt-4 text-base leading-relaxed text-foreground sm:text-lg">
                {post.excerpt}
              </p>
            </div>

            {/* Key takeaways callout */}
            <div className="mt-6 rounded-2xl border border-accent/40 bg-accent/5 p-6 sm:p-8">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                <Bookmark size={11} />
                {ui.keyTakeaways}
              </div>
              <ul className="mt-5 space-y-3">
                {post.takeaways.map((k, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-base leading-relaxed text-foreground"
                  >
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    <span>{k}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Keyword targeting strip (transparency + SEO anchor text) */}
            <div className="mt-6 rounded-2xl border border-border bg-background/60 p-5">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                <Target size={11} className="text-accent" />
                {ui.whatThisPostIsFor}
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                    {ui.primaryKeyword}
                  </div>
                  <div className="mt-1 font-display text-base font-semibold text-foreground">
                    {post.keywords.primary}
                  </div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                    ~{post.keywords.searchVolume.toLocaleString()} {ui.monthlySearchesLabel}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                    {ui.alsoAnswers}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {post.keywords.secondary.map((kw) => (
                      <span
                        key={kw}
                        className="rounded-full border border-border bg-surface/60 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sections */}
            <div className="mt-12 space-y-12 sm:mt-14 sm:space-y-16">
              {post.sections.map((section, i) => {
                const id = slugifyHeading(section.heading);
                return (
                  <section key={id} id={id} className="scroll-mt-28">
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
                        §{String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="h-px flex-1 bg-border" />
                    </div>
                    <h2 className="mt-4 font-display text-2xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                      {section.heading}
                    </h2>

                    <div className="mt-6 space-y-5">
                      {section.paragraphs.map((p, pi) => (
                        <ParagraphWithLinks key={pi} text={p} />
                      ))}
                    </div>

                    {section.bullets && (
                      <ul className="mt-6 space-y-3 rounded-xl border border-border bg-surface/30 p-5">
                        {section.bullets.map((b, bi) => (
                          <li
                            key={bi}
                            className="flex gap-3 text-base leading-relaxed text-foreground"
                          >
                            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.pullQuote && (
                      <figure className="relative mt-8 rounded-2xl border border-border bg-surface/40 p-6 pl-11 sm:p-8 sm:pl-14">
                        <Quote
                          className="absolute left-3 top-5 text-accent sm:left-5 sm:top-6"
                          size={22}
                        />
                        <blockquote className="font-display text-lg leading-[1.4] tracking-tight text-foreground sm:text-xl lg:text-2xl">
                          &ldquo;{section.pullQuote}&rdquo;
                        </blockquote>
                        <figcaption className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                          — {post.author.name}, {post.author.role}
                        </figcaption>
                      </figure>
                    )}

                    {section.callout && (
                      <div className="mt-6 rounded-2xl border border-accent/40 bg-accent/5 p-5 sm:p-6">
                        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                          <Sparkles size={11} />
                          {section.callout.title}
                        </div>
                        <p className="mt-3 text-base leading-relaxed text-foreground">
                          {section.callout.body}
                        </p>
                      </div>
                    )}
                  </section>
                );
              })}
            </div>

            {/* Cross-page internal links — the on-page SEO linking box */}
            {post.crossPageLinks && post.crossPageLinks.length > 0 && (
              <div className="mt-16 rounded-2xl border border-border bg-surface/40 p-6 sm:p-8">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                  <ExternalLink size={11} />
                  {ui.takeNextStep}
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {post.crossPageLinks.map((link) => (
                    <LocalizedLink
                      key={link.href}
                      href={link.href}
                      className="group flex items-start gap-3 rounded-xl border border-border bg-background/60 p-4 transition hover:border-accent/50"
                    >
                      <ChevronRight
                        size={14}
                        className="mt-1 flex-shrink-0 text-accent transition-transform group-hover:translate-x-0.5"
                      />
                      <div>
                        <div className="font-display text-sm font-semibold text-foreground">
                          {link.label}
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          {link.note}
                        </div>
                      </div>
                    </LocalizedLink>
                  ))}
                </div>
              </div>
            )}

            {/* Post FAQ — feeds FAQPage schema and is real readable content */}
            {post.faq && post.faq.length > 0 && (
              <div className="mt-12">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                  <BookOpen size={11} />
                  {ui.frequentlyAsked}
                </div>
                <h2 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                  {ui.faqIntro}
                </h2>
                <div className="mt-8 space-y-4">
                  {post.faq.map((f, i) => (
                    <details
                      key={i}
                      className="group rounded-2xl border border-border bg-surface/40 p-5 transition hover:border-border-strong"
                    >
                      <summary className="flex cursor-pointer items-start justify-between gap-4">
                        <span className="font-display text-lg font-semibold text-foreground">
                          {f.question}
                        </span>
                        <ChevronRight
                          size={18}
                          className="mt-1 flex-shrink-0 text-accent transition-transform group-open:rotate-90"
                        />
                      </summary>
                      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                        {f.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            )}

            {/* End of article */}
            <div className="mt-16 flex items-center gap-4 border-t border-border pt-10">
              <div className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                {ui.endOfPost} · {ui.readTime(post.readTime)} · {ui.wordsCount(wordCount)}
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>

            {/* Share + tags */}
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                {ui.share}
              </span>
              <a
                href={twitterShare}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Twitter"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition hover:border-accent/50 hover:text-accent"
              >
                <Twitter size={11} />
                Twitter
              </a>
              <a
                href={linkedinShare}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on LinkedIn"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition hover:border-accent/50 hover:text-accent"
              >
                <Linkedin size={11} />
                LinkedIn
              </a>
              <span className="mx-2 h-4 w-px bg-border" />
              <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                <Tag size={11} className="text-accent" />
                {ui.tags}
              </span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-surface/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Author block */}
            <div className="mt-10 rounded-2xl border border-border bg-surface/40 p-6 sm:p-8">
              <div className="flex items-start gap-5">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 font-display text-xl font-semibold text-accent">
                  {post.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                    {ui.writtenBy}
                  </div>
                  <div className="mt-1 font-display text-lg font-semibold text-foreground">
                    {post.author.name}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {post.author.role}
                  </div>
                  {post.author.bio && (
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {post.author.bio}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </article>

          {/* ---------- Sticky sidebar ---------- */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-5">
              {/* Table of contents */}
              <div className="rounded-2xl border border-border bg-surface/40 p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                  {ui.onThisPage}
                </div>
                <ol className="mt-4 space-y-3">
                  {post.sections.map((section, i) => (
                    <li key={section.heading}>
                      <a
                        href={`#${slugifyHeading(section.heading)}`}
                        className="group flex gap-3 text-sm leading-snug text-muted-foreground transition hover:text-foreground"
                      >
                        <span className="font-mono text-[10px] text-accent">
                          §{String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{section.heading}</span>
                      </a>
                    </li>
                  ))}
                </ol>

                <div className="mt-5 border-t border-border pt-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    {ui.writtenBy}
                  </div>
                  <div className="mt-1 font-display text-sm font-semibold text-foreground">
                    {post.author.name}
                  </div>
                  <div className="text-xs text-muted-foreground">{post.author.role}</div>
                </div>

                <LocalizedLink
                  href="/contact"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-4 py-2.5 text-xs font-semibold text-accent-foreground transition hover:-translate-y-0.5"
                >
                  {ui.bookAudit}
                  <ArrowUpRight size={12} />
                </LocalizedLink>
              </div>

              {/* Related posts (explicit, from relatedSlugs) */}
              <div className="rounded-2xl border border-border bg-surface/40 p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                  {ui.readNext}
                </div>
                <ul className="mt-4 space-y-4">
                  {related.slice(0, 3).map((rp) => (
                    <li key={rp.slug}>
                      <LocalizedLink
                        href={`/blogs/${rp.slug}`}
                        className="group block"
                      >
                        <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                          {categoryLabel(rp.category)} · {rp.readTime} {ui.minRead}
                        </div>
                        <div className="mt-1 font-display text-sm font-semibold leading-snug text-foreground transition group-hover:text-accent">
                          {rp.title}
                        </div>
                      </LocalizedLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {/* ================================================================ */}
      {/* Prev / next navigation                                            */}
      {/* ================================================================ */}
      <Section className="pt-8 pb-0">
        <div className="grid gap-3 border-y border-border py-6 sm:gap-4 sm:py-8 md:grid-cols-2">
          {prev ? (
            <LocalizedLink
              href={`/blogs/${prev.slug}`}
              className="group flex flex-col rounded-2xl border border-border bg-surface/40 p-5 transition hover:border-accent/40"
            >
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                <ArrowLeft size={11} />
                {ui.previousPost}
              </div>
              <div className="mt-3 font-display text-base font-semibold leading-snug text-foreground transition group-hover:text-accent">
                {prev.title}
              </div>
            </LocalizedLink>
          ) : (
            <div />
          )}
          {next ? (
            <LocalizedLink
              href={`/blogs/${next.slug}`}
              className="group flex flex-col rounded-2xl border border-border bg-surface/40 p-5 text-right transition hover:border-accent/40"
            >
              <div className="flex items-center justify-end gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                {ui.nextPost}
                <ArrowRight size={11} />
              </div>
              <div className="mt-3 font-display text-base font-semibold leading-snug text-foreground transition group-hover:text-accent">
                {next.title}
              </div>
            </LocalizedLink>
          ) : (
            <div />
          )}
        </div>
      </Section>

      {/* ================================================================ */}
      {/* Related posts grid                                                */}
      {/* ================================================================ */}
      <Section className="pt-8">
        <div className="mb-8 flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
            {ui.keepReading}
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {related.map((rp) => (
            <LocalizedLink
              key={rp.slug}
              href={`/blogs/${rp.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-border bg-surface/40 p-5 transition hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface"
            >
              <div className="mb-4 overflow-hidden rounded-xl border border-border bg-background/60 p-3">
                <BlogSketch sketchKey={rp.heroSketch} className="h-auto w-full" />
              </div>
              <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-accent">
                {categoryLabel(rp.category)} · {rp.readTime} {ui.minRead}
              </div>
              <h3 className="mt-3 font-display text-lg font-semibold leading-tight tracking-tight text-foreground">
                {rp.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {rp.excerpt}
              </p>
              <div className="mt-4 inline-flex items-center gap-1 text-xs text-accent">
                Read
                <ArrowUpRight
                  size={12}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
            </LocalizedLink>
          ))}
        </div>
      </Section>

      <Cta t={t} />
    </>
  );
}
