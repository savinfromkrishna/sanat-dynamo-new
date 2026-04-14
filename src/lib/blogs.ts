/**
 * Blog data — hand-curated long-form posts. Each post is a rich, opinionated
 * piece of writing with structured sections so the detail page can render
 * headings, paragraphs, bullets, callouts and inline sketches cleanly.
 *
 * Post body (sections) is maintained in English and surfaces for every
 * locale. Title / subtitle / excerpt can be overridden per-locale via the
 * `translations` field — see `localizePost` below for the resolver.
 */

import type { Locale } from "@/lib/i18n";

export type BlogCategory =
  | "growth"
  | "automation"
  | "seo"
  | "case-study"
  | "ops";

export const BLOG_CATEGORIES: { key: BlogCategory | "all"; label: string }[] = [
  { key: "all",         label: "All posts"  },
  { key: "growth",      label: "Growth"     },
  { key: "automation",  label: "Automation" },
  { key: "seo",         label: "SEO"        },
  { key: "case-study",  label: "Case study" },
  { key: "ops",         label: "Ops"        },
];

export type BlogSketchKey =
  | "auditLens"
  | "leakyFunnel"
  | "whatsappFlow"
  | "layerStack"
  | "seoPeakGraph";

export interface BlogSection {
  heading: string;
  /**
   * Each paragraph can contain inline markdown-style links that will be
   * parsed into real <a> tags at render time. Format: `[anchor text](/path)`.
   * Use relative paths (they'll be wrapped through LocalizedLink).
   */
  paragraphs: string[];
  bullets?: string[];
  callout?: { title: string; body: string };
  pullQuote?: string;
}

/**
 * SEO keyword metadata. `searchVolume` is an approximate monthly search
 * count (India-wide, from common keyword tools). `difficulty` is the
 * strategic difficulty to rank 1–10 within 6 months.
 */
export interface BlogKeywords {
  primary: string;
  secondary: string[];
  searchVolume: number;
  difficulty: "low" | "medium" | "high";
  intent: "informational" | "commercial" | "transactional";
}

export interface BlogFaq {
  question: string;
  answer: string;
}

/** Localized strings per post — title/subtitle/excerpt only. */
export interface BlogPostTranslation {
  title?: string;
  subtitle?: string;
  excerpt?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: BlogCategory;
  readTime: number;
  publishedAt: string;
  updatedAt?: string;
  author: { name: string; role: string; bio?: string };
  heroSketch: BlogSketchKey;
  keywords: BlogKeywords;
  takeaways: string[];
  sections: BlogSection[];
  tags: string[];
  /** Slugs of posts this article explicitly links to in the body. */
  relatedSlugs: string[];
  /** Contextual cross-page links (services, case-studies, contact, etc). */
  crossPageLinks?: { href: string; label: string; note: string }[];
  /** Short FAQ section appended to the post body and used for FAQPage JSON-LD. */
  faq?: BlogFaq[];
  /** Featured flag — surfaces in the hero carousel. */
  featured?: boolean;
  /** Estimated popularity (0-100) used for the "most read" strip ordering. */
  popularityScore?: number;
  /** Per-locale overrides for title/subtitle/excerpt. Missing entries fall back to English. */
  translations?: Partial<Record<Locale, BlogPostTranslation>>;
}

/**
 * Returns the post with title/subtitle/excerpt swapped for the locale
 * translation if one exists. Falls back to the English base strings.
 */
export function localizePost(post: BlogPost, locale: Locale): BlogPost {
  const tr = post.translations?.[locale];
  if (!tr) return post;
  return {
    ...post,
    title: tr.title ?? post.title,
    subtitle: tr.subtitle ?? post.subtitle,
    excerpt: tr.excerpt ?? post.excerpt,
  };
}

/** Topic clusters — hub-and-spoke structure for SEO internal linking. */
export const TOPIC_CLUSTERS: {
  key: string;
  title: string;
  description: string;
  slugs: string[];
  primaryKeyword: string;
}[] = [
  {
    key: "conversion",
    title: "Conversion & growth systems",
    description:
      "Everything from the 45-minute audit to the 7-second hero to the 2-hour form fix — the mechanics that take an SME from 1.9% CVR to 4%+ without touching the design.",
    slugs: [
      "revenue-audit-45-minutes",
      "why-websites-leak-leads",
      "7-second-hero-section",
      "d2c-catalog-conversion",
      "5-layer-revenue-stack",
    ],
    primaryKeyword: "revenue audit",
  },
  {
    key: "automation",
    title: "WhatsApp & sales automation",
    description:
      "Why WhatsApp is the cheapest closing channel in India, the three-tier bot→RM→human stack, the WhatsApp-as-CRM architecture, and per-industry automation playbooks.",
    slugs: [
      "whatsapp-sales-agent-in-7-days",
      "whatsapp-as-crm",
      "real-estate-lead-scoring",
      "clinic-reception-automation",
    ],
    primaryKeyword: "whatsapp sales automation",
  },
  {
    key: "seo",
    title: "SEO & organic growth",
    description:
      "Topical authority, the three signals Google trusts, Core Web Vitals for SMEs, and the paid + organic interplay that compounds over 6 months.",
    slugs: [
      "seo-that-actually-ranks",
      "core-web-vitals-90-minute-fix",
      "google-ads-that-pay",
      "ai-copywriting-india",
    ],
    primaryKeyword: "seo strategy india",
  },
];

/** Posts sorted newest → oldest. */
export function getLatestPosts(count = 6): BlogPost[] {
  return [...BLOG_POSTS]
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, count);
}

/** Posts ranked by popularityScore descending. */
export function getMostReadPosts(count = 5): BlogPost[] {
  return [...BLOG_POSTS]
    .sort((a, b) => (b.popularityScore ?? 0) - (a.popularityScore ?? 0))
    .slice(0, count);
}

/** Every post that has `featured: true`. */
export function getFeaturedPosts(): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.featured);
}

/** Posts grouped by category. */
export function getPostsByCategory(
  category: BlogCategory
): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.category === category);
}

/**
 * Parse markdown-style inline links in a paragraph. Returns an array of
 * text/link tokens that the blog detail page renders as JSX. The renderer
 * is intentionally tiny — it only handles `[anchor](/path)` pairs.
 */
export function parseInlineLinks(
  text: string
): Array<{ kind: "text"; value: string } | { kind: "link"; value: string; href: string }> {
  const tokens: Array<
    { kind: "text"; value: string } | { kind: "link"; value: string; href: string }
  > = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ kind: "text", value: text.slice(lastIndex, match.index) });
    }
    tokens.push({ kind: "link", value: match[1], href: match[2] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    tokens.push({ kind: "text", value: text.slice(lastIndex) });
  }
  return tokens;
}

export const BLOG_POSTS: BlogPost[] = [
  // ------------------------------------------------------------------------
  {
    slug: "revenue-audit-45-minutes",
    title: "The 45-Minute Revenue Audit (And What We Actually Look For)",
    subtitle:
      "Most \"audits\" are dashboards in disguise. Here's the six-layer inspection we run instead — and the three leaks we find on almost every SME site.",
    excerpt:
      "A real revenue audit isn't a GA4 screenshot. It's a forensic walk through six specific layers of your system, ending in a punch list of fixes you can ship in a week.",
    category: "growth",
    readTime: 9,
    publishedAt: "2026-03-28",
    updatedAt: "2026-04-08",
    featured: true,
    popularityScore: 98,
    translations: {
      hi: {
        title: "45-मिनट का Revenue Audit (और हम असल में क्या देखते हैं)",
        subtitle:
          "ज़्यादातर \"audits\" सिर्फ़ dashboards होते हैं। यहाँ वो six-layer inspection है जो हम असल में करते हैं — और तीन leaks जो हर SME website पर मिलती हैं।",
        excerpt:
          "असली revenue audit कोई GA4 screenshot नहीं है। यह आपके system के छह layers की forensic जाँच है, जो एक हफ़्ते में ship करने लायक fix list के साथ खत्म होती है।",
      },
    },
    author: {
      name: "Kanha Singh",
      role: "Founder, Sanat Dynamo",
      bio: "Writes about revenue systems, SME conversion, and the unglamorous ops work that compounds.",
    },
    heroSketch: "auditLens",
    tags: ["audit", "conversion", "diagnosis"],
    keywords: {
      primary: "revenue audit",
      secondary: ["website audit", "conversion audit", "sme growth audit", "website audit checklist"],
      searchVolume: 720,
      difficulty: "medium",
      intent: "commercial",
    },
    relatedSlugs: ["why-websites-leak-leads", "5-layer-revenue-stack"],
    crossPageLinks: [
      { href: "/services", label: "Revenue Systems", note: "the full service scope" },
      { href: "/case-studies", label: "Case Studies", note: "audits turned into shipped fixes" },
      { href: "/contact", label: "Book an audit", note: "3 slots open this week" },
    ],
    faq: [
      {
        question: "How long does a real revenue audit take?",
        answer:
          "A focused inspection takes 45 minutes. Anything longer usually means the auditor is building a consulting pitch rather than diagnosing a system.",
      },
      {
        question: "What's the difference between an audit and an analytics review?",
        answer:
          "Analytics describes what is — bounce rate, CVR, session count. An audit prescribes what to do about it, with a dated punch list of fixes and an owner assigned to each.",
      },
      {
        question: "What are the three most common SME conversion leaks?",
        answer:
          "A dead hero (company-speak instead of customer-problem), friction-stuffed forms (five fields when two would do), and the ghost CRM (a lead sits in an inbox because no human owns the next step).",
      },
    ],
    takeaways: [
      "An audit is a diagnosis, not a dashboard — it ends in fixes, not charts.",
      "The six layers: traffic, offer, asset, capture, nurture, retention.",
      "The three most common leaks we find: dead hero, friction in the form, ghost CRM.",
      "A good audit names the fix AND the owner AND the deadline.",
      "If an audit takes longer than 45 minutes, it's probably a consulting pitch.",
    ],
    sections: [
      {
        heading: "Why most \"audits\" are just vanity dashboards",
        paragraphs: [
          "If someone hands you a 40-slide PDF full of bounce rates and impressions, you haven't been audited — you've been measured. A measurement tells you what is. An audit tells you what to do about it.",
          "A good revenue audit is a forensic walk. We're not looking at your dashboard; we're looking at the places where money disappears between a visitor landing on your site and a signed invoice. Those places are almost always the same six.",
        ],
        callout: {
          title: "The smell test",
          body:
            "If the audit doesn't end with a dated, owner-assigned punch list, it's a consulting pitch wearing a lab coat. Ask for the owner column.",
        },
      },
      {
        heading: "The six layers we actually inspect",
        paragraphs: [
          "We don't audit \"the website.\" We audit a system with six distinct layers, each with its own failure modes. Each layer gets a five-minute inspection and a verdict — green, amber, or red — with a named fix.",
        ],
        bullets: [
          "Traffic — is it the right traffic, from the right intent, at the right cost?",
          "Offer — is what you're selling legible in 7 seconds on a phone screen?",
          "Asset — does your landing page do the one job it was built for?",
          "Capture — how many qualified leads is the form actually catching?",
          "Nurture — what happens in the next 48 hours after someone fills the form?",
          "Retention — how many buyers come back or refer? What's the loop look like?",
        ],
      },
      {
        heading: "The three leaks we find on almost every SME site",
        paragraphs: [
          "After running this inspection on 120+ businesses in the last eighteen months, the same three leaks show up over and over. If your site is bleeding money, it's probably here.",
          "The first is the dead hero — a headline that describes the company instead of the customer's problem. We wrote the template fix for this in [the 7-second hero section](/blogs/7-second-hero-section). The second is friction-stuffed forms that ask for everything up front. The third is the ghost CRM: a lead comes in, sits in an inbox, and slowly dies because no one owns the next step — we solved that with [your CRM should live in WhatsApp](/blogs/whatsapp-as-crm).",
          "If your site is D2C, add a fourth leak: the catalog page. We've seen 40% of paid traffic bounce at the product listing page before ever seeing a product — unpacked in [your D2C catalog page is losing you 40% of sales](/blogs/d2c-catalog-conversion). And if the technical foundation is red on Core Web Vitals, none of these fixes compound — start instead with [the 90-minute CWV fix](/blogs/core-web-vitals-90-minute-fix).",
        ],
        pullQuote:
          "A form is not a contract. Ask for the minimum. You can qualify on the call.",
      },
      {
        heading: "What a real audit report looks like",
        paragraphs: [
          "The deliverable is two pages, not forty. Page one is a single diagram of your current system with the six layers color-coded by verdict. Page two is a punch list — every fix has an owner, a deadline, and an expected impact range.",
          "We deliberately refuse to include analytics screenshots. Screenshots make people feel measured; punch lists make people ship.",
        ],
      },
      {
        heading: "Three things we always fix first",
        paragraphs: [
          "When a business only has a week to act on the audit, we always point to the same three moves. They're cheap, fast, and measurable within the month. If the form is the biggest leak — and it usually is — start with the piece we cover in depth in [why your website leaks leads](/blogs/why-websites-leak-leads).",
          "The other two often connect to larger structural issues. If the CRM is a ghost, you're missing Layer 4 of the [5-layer revenue stack](/blogs/5-layer-revenue-stack). If the hero is dead, it's a messaging problem — we fix that as part of a [Revenue Systems engagement](/services).",
        ],
        bullets: [
          "Rewrite the hero around the customer's job-to-be-done, not your company name.",
          "Collapse every form to name + email + one qualifier. Move the rest to the call.",
          "Put a human owner and a 2-hour SLA on every inbound lead.",
        ],
      },
    ],
  },

  // ------------------------------------------------------------------------
  {
    slug: "why-websites-leak-leads",
    title: "Why Your Website Leaks Leads (And The Fix Nobody Talks About)",
    subtitle:
      "Four quiet places where traffic disappears — and a 2-hour fix that took one client from 1.9% to 4.3% CVR without touching the design.",
    excerpt:
      "Most conversion advice is cosmetic. The real leaks happen in four specific places — and the biggest one is the form field nobody thinks to instrument.",
    category: "growth",
    readTime: 8,
    publishedAt: "2026-03-20",
    updatedAt: "2026-04-02",
    featured: true,
    popularityScore: 92,
    translations: {
      hi: {
        title: "आपकी Website Leads क्यों खो रही है (और वो Fix जिसकी कोई बात नहीं करता)",
        subtitle:
          "चार जगहें जहाँ traffic चुपचाप गायब हो जाता है — और वो 2-घंटे का fix जिसने एक client को design बदले बिना 1.9% से 4.3% CVR तक पहुँचाया।",
        excerpt:
          "ज़्यादातर conversion सलाह सिर्फ़ cosmetic है। असली leaks चार specific जगहों पर होते हैं — और सबसे बड़ा leak वो form field है जिसे कोई instrument नहीं करता।",
      },
    },
    author: {
      name: "Kanha Singh",
      role: "Founder, Sanat Dynamo",
      bio: "Writes about revenue systems, SME conversion, and the unglamorous ops work that compounds.",
    },
    heroSketch: "leakyFunnel",
    tags: ["conversion", "funnel", "cvr"],
    keywords: {
      primary: "website conversion rate optimization",
      secondary: ["landing page conversion", "form conversion rate", "lead leak", "cro"],
      searchVolume: 1900,
      difficulty: "medium",
      intent: "commercial",
    },
    relatedSlugs: ["revenue-audit-45-minutes", "5-layer-revenue-stack", "whatsapp-sales-agent-in-7-days"],
    crossPageLinks: [
      { href: "/services", label: "Conversion Engineering", note: "our full CRO service" },
      { href: "/case-studies", label: "the 1.9% → 4.3% case", note: "real numbers" },
      { href: "/contact", label: "audit your funnel", note: "free 45-min diagnosis" },
    ],
    faq: [
      {
        question: "What are the most common reasons a website doesn't convert?",
        answer:
          "The four biggest leaks are: a hero section that talks about the company instead of the customer's job, forms that ask for too much data, lead-magnet gating that filters out high-intent visitors, and a missing 2-hour SLA on the inbound lead.",
      },
      {
        question: "How much can form changes alone improve conversion rate?",
        answer:
          "In our case work, form simplification alone typically lifts CVR by 1.5–3× without touching copy, design, or traffic. The biggest lever is moving the phone field to the last step.",
      },
      {
        question: "Should I gate my case studies behind a form?",
        answer:
          "No. Gating content in 2026 filters out the exact high-intent visitors you want to catch. Ungate the content and add a soft CTA at the bottom instead.",
      },
    ],
    takeaways: [
      "Traffic doesn't leave, it slips through four specific seams.",
      "The biggest leak is usually the form, not the design.",
      "Instrument every field drop-off — don't just track submits.",
      "Lead-magnet gating kills mid-funnel intent. Don't do it.",
      "CVR usually lifts 1.5–3× from form fixes alone — zero design change.",
    ],
    sections: [
      {
        heading: "The four places traffic silently disappears",
        paragraphs: [
          "When a website \"doesn't convert,\" what's usually happening is that visitors ARE acting — they're just abandoning between two very specific screens. The job is to find which two.",
          "We instrument four seams on every audit: above the fold (which is why [the 7-second hero section template](/blogs/7-second-hero-section) matters so much), mid-page CTAs, form field drop-off, and post-submit dead time. Every site we've ever inspected has exactly one dominant leak. Find it, fix it, ignore the rest — this is the same discipline behind our [45-minute revenue audit](/blogs/revenue-audit-45-minutes).",
          "If you're running paid traffic into any of these pages and watching the money evaporate, the other place to look is upstream: [the anatomy of a Google Ads campaign that actually pays back](/blogs/google-ads-that-pay) covers why most SME ad accounts lose money before the landing page ever gets a chance.",
        ],
      },
      {
        heading: "A form field is not a form",
        paragraphs: [
          "Most teams measure form submits. That tells you the win rate, not where the losses happen. The trick is to instrument each field with a focus-blur-without-submit event. Suddenly you can see exactly which question makes people bail.",
          "In 9 out of 10 cases, it's the phone field — not because people don't want to share their number, but because putting it third in a five-field form signals \"sales call incoming\" before the prospect has decided they want the product.",
        ],
        callout: {
          title: "Rule of thumb",
          body:
            "Move the phone field to the LAST question, after a perceived-value step. The drop-off halves.",
        },
      },
      {
        heading: "Why lead-magnet gating kills mid-funnel intent",
        paragraphs: [
          "Gating a case study behind a form in 2026 is like asking someone for a business card before letting them see the menu. The gate filters out the exact high-intent visitors you wanted to catch.",
          "Ungate the content. Add a soft, optional conversion at the bottom. Your absolute lead count usually drops 10–20% but the lead QUALITY jumps by a factor of 2–3. You're trading vanity volume for real meetings.",
        ],
        pullQuote:
          "A high-intent visitor will always convert if the path is clear. Your job is to remove the gates, not add them.",
      },
      {
        heading: "Instrumenting the real leak points",
        paragraphs: [
          "You don't need a heatmap tool. You need four custom events: hero_view, cta_click, form_field_focus (per field), form_abandon. Ship them once and you'll see the truth inside 48 hours.",
        ],
        bullets: [
          "hero_view — how many actually see the offer above the fold",
          "cta_click — how many act on it",
          "form_field_focus — where they stop, field by field",
          "form_abandon — blur without submit, per field",
        ],
      },
      {
        heading: "The 2-hour fix that moved a client from 1.9% to 4.3%",
        paragraphs: [
          "One D2C skincare client had a 1.9% CVR on their paid landing page. The brand team had quoted ₹6 lakh for a full redesign. We didn't touch the design.",
          "What we changed: collapsed the form from 5 fields to 2, moved the phone prompt to a post-submit thank-you screen, and added a countdown on the CTA button that reset every time the page loaded. Ship took two hours. CVR in the next 14 days: 4.3%. We documented more of this shape of work in our [case studies](/case-studies), and the underlying diagnostic is the same [45-minute revenue audit](/blogs/revenue-audit-45-minutes) we run on every engagement.",
          "If you're closing leads on WhatsApp after capture, the same 2-hour mindset applies downstream — we break down the three-tier close flow in [building a WhatsApp sales agent in 7 days](/blogs/whatsapp-sales-agent-in-7-days).",
        ],
      },
    ],
  },

  // ------------------------------------------------------------------------
  {
    slug: "whatsapp-sales-agent-in-7-days",
    title: "Build an Always-On WhatsApp Sales Agent in 7 Days",
    subtitle:
      "A three-tier bot → RM → human automation stack that closes qualified leads while you sleep — without feeling like spam.",
    excerpt:
      "In India, WhatsApp is the cheapest closing channel ever invented. Here's the exact 7-day rollout we use to ship a three-tier sales agent for SMEs — without killing the human touch.",
    category: "automation",
    readTime: 11,
    publishedAt: "2026-03-12",
    updatedAt: "2026-03-26",
    featured: true,
    popularityScore: 95,
    translations: {
      hi: {
        title: "7 दिनों में Always-On WhatsApp Sales Agent बनाएँ",
        subtitle:
          "एक three-tier bot → RM → human automation stack जो आपके सोते समय qualified leads close करता है — बिना spam जैसा लगे।",
        excerpt:
          "India में WhatsApp अब तक का सबसे सस्ता closing channel है। यहाँ वो exact 7-day rollout है जिससे हम SMEs के लिए three-tier sales agent ship करते हैं — human touch बचाकर।",
      },
    },
    author: {
      name: "Kanha Singh",
      role: "Founder, Sanat Dynamo",
      bio: "Writes about revenue systems, SME conversion, and the unglamorous ops work that compounds.",
    },
    heroSketch: "whatsappFlow",
    tags: ["whatsapp", "automation", "sales"],
    keywords: {
      primary: "whatsapp sales automation",
      secondary: [
        "whatsapp business automation",
        "whatsapp sales bot",
        "whatsapp crm india",
        "whatsapp business api",
      ],
      searchVolume: 5400,
      difficulty: "high",
      intent: "commercial",
    },
    relatedSlugs: ["5-layer-revenue-stack", "why-websites-leak-leads", "revenue-audit-45-minutes"],
    crossPageLinks: [
      { href: "/services", label: "WhatsApp Automation", note: "our implementation scope" },
      { href: "/industries", label: "D2C · Real Estate · Clinics", note: "where we've shipped it" },
      { href: "/contact", label: "start the 7-day sprint", note: "free scoping call" },
    ],
    faq: [
      {
        question: "Why is WhatsApp a better sales channel than email in India?",
        answer:
          "WhatsApp open rates in India sit at 85–95% within the first 10 minutes. Email sits at 18–25%. The difference is where attention actually lives on mobile — not where teams are used to sending messages.",
      },
      {
        question: "What's the three-tier WhatsApp automation stack?",
        answer:
          "Tier 1 is the bot — it qualifies intent, collects two data points, and schedules a slot. Tier 2 is the RM — a templated human response within 5 minutes. Tier 3 is the closer — a human who jumps in on high-value or high-objection conversations.",
      },
      {
        question: "How long does it take to ship a WhatsApp sales agent?",
        answer:
          "A full three-tier sales agent fits in a 7-day sprint if scope is frozen on day 1. Day 1 maps the tiers, days 2–4 wire the bot and RM handoff, day 5 is an internal dry run, days 6–7 are the soft launch and full cut-over.",
      },
    ],
    takeaways: [
      "A WhatsApp sales agent is three tiers, not one bot.",
      "Tier 1 is the bot. Tier 2 is the RM. Tier 3 is the human.",
      "Conversion on WhatsApp runs 3–6× email for qualified traffic.",
      "The killer detail is handoff — who receives and when.",
      "A full rollout fits in 7 days if scope is frozen.",
    ],
    sections: [
      {
        heading: "Why WhatsApp is the cheapest closing channel in India",
        paragraphs: [
          "Open rates on WhatsApp in India sit at 85–95% within the first 10 minutes. Email sits at 18–25%. SMS sits at 12%. The channel isn't magic; it's just where attention actually lives on mobile.",
          "What most teams get wrong is treating WhatsApp like a broadcast channel. It's not. It's a closing channel. The goal is to move a qualified lead from \"I filled a form\" to \"I'm paying\" inside one conversation. This is Layer 4 of the [5-layer revenue stack](/blogs/5-layer-revenue-stack) — and if you're building it from scratch, start with our full [automation service scope](/services).",
        ],
      },
      {
        heading: "The three-tier automation stack (bot → RM → human)",
        paragraphs: [
          "A good WhatsApp sales agent has three tiers. Each tier has a clear scope and a clear hand-off trigger.",
          "Tier 1 is the bot — it qualifies, confirms intent, and collects two data points. Tier 2 is the RM (relationship manager) — a templated but typed response from a real person within 5 minutes. Tier 3 is the closer — a human who jumps in when the conversation needs nuance.",
        ],
        bullets: [
          "Tier 1 (bot): qualifies intent, captures name + budget, schedules a slot",
          "Tier 2 (RM): templated human response, 5-minute SLA, sends proof",
          "Tier 3 (closer): jumps in on high-value deals, handles objections",
        ],
        callout: {
          title: "The handoff rule",
          body:
            "Never let a bot promise something a human has to deliver. If the tier can't fulfill, escalate before it gets quoted.",
        },
      },
      {
        heading: "Writing messages that don't feel like spam",
        paragraphs: [
          "The tone rule is simple: write like a smart junior teammate texting a friend, not like a brand. No emojis unless they're already in the brand voice. No formal salutations. No \"Dear valued customer.\"",
          "Every outbound message should be answerable with one word. If it can't be, break it into two messages. A question like \"Are you looking for a quote today?\" converts. A question like \"Let us know what you are looking for so we can assist you better\" does not.",
        ],
        pullQuote:
          "WhatsApp is not marketing. It's closing. Write like a closer, not a brand manager.",
      },
      {
        heading: "Measuring conversion without killing the experience",
        paragraphs: [
          "Don't instrument every message with click trackers — it shows in the link preview and tanks trust. Instead, track three KPIs: tier-1-to-tier-2 handoff rate, 5-minute RM SLA compliance, and conversation-to-cash conversion.",
          "The one metric that matters most is \"time to first human reply.\" Keep it under 5 minutes and the conversion rate stays above 20%. Let it drift past 15 minutes and it collapses to 6%.",
        ],
      },
      {
        heading: "Day-by-day rollout timeline",
        paragraphs: [
          "A full WhatsApp sales agent fits in a 7-day sprint if scope is frozen. Here's the timeline we run with SMEs every time. Once it's live, the natural next step is [turning WhatsApp itself into your CRM](/blogs/whatsapp-as-crm) — no dashboard logins, no friction, just labels and a webhook.",
          "For real estate SMEs, also wire [the four-variable lead scoring model](/blogs/real-estate-lead-scoring) into this flow so hot leads hit the closer within minutes. For clinics, this same three-tier stack doubles as [a no-show reminder system that drops no-shows from 30% to under 8%](/blogs/clinic-reception-automation).",
        ],
        bullets: [
          "Day 1 — map the three tiers, freeze scope, get the WhatsApp Business API approved",
          "Day 2 — write all tier-1 templates (qualify, confirm, schedule)",
          "Day 3 — wire the bot flow, webhook, and the RM handoff trigger",
          "Day 4 — train the RM on the 5-minute SLA and objection kit",
          "Day 5 — internal dry run with 20 synthetic leads",
          "Day 6 — soft-launch with 10% of real inbound",
          "Day 7 — full cut-over, measure, iterate",
        ],
      },
    ],
  },

  // ------------------------------------------------------------------------
  {
    slug: "5-layer-revenue-stack",
    title: "The 5-Layer Revenue Stack Every SME Needs",
    subtitle:
      "Most SMEs build one of the layers and wonder why it doesn't compound. Here's the full stack, layer by layer, with the minimum viable version of each.",
    excerpt:
      "You can't skip layers. Growth compounds only when attention, conversion, qualification, nurture, and retention all exist — and each feeds the next.",
    category: "ops",
    readTime: 10,
    publishedAt: "2026-03-04",
    updatedAt: "2026-03-30",
    popularityScore: 84,
    translations: {
      hi: {
        title: "हर SME को चाहिए यह 5-Layer Revenue Stack",
        subtitle:
          "ज़्यादातर SMEs सिर्फ़ एक layer बनाते हैं और सोचते हैं growth क्यों नहीं compound हो रहा। यहाँ पूरा stack है, हर layer का MVP version।",
        excerpt:
          "आप कोई layer skip नहीं कर सकते। Growth तभी compound होता है जब attention, conversion, qualification, nurture और retention — पाँचों मौजूद हों।",
      },
    },
    author: {
      name: "Kanha Singh",
      role: "Founder, Sanat Dynamo",
      bio: "Writes about revenue systems, SME conversion, and the unglamorous ops work that compounds.",
    },
    heroSketch: "layerStack",
    tags: ["systems", "ops", "architecture"],
    keywords: {
      primary: "sme revenue stack",
      secondary: [
        "marketing architecture",
        "revenue system",
        "sme growth architecture",
        "growth stack india",
      ],
      searchVolume: 420,
      difficulty: "low",
      intent: "informational",
    },
    relatedSlugs: ["revenue-audit-45-minutes", "why-websites-leak-leads", "seo-that-actually-ranks"],
    crossPageLinks: [
      { href: "/services", label: "full-stack revenue systems", note: "all 5 layers" },
      { href: "/about", label: "our philosophy", note: "why we build it this way" },
      { href: "/contact", label: "book a systems review", note: "free 45 min" },
    ],
    faq: [
      {
        question: "Why can't I skip a layer in the revenue stack?",
        answer:
          "Because each layer feeds the next. Attention without a conversion asset is pure cost. Conversion without nurture is a leaking bucket. Nurture without retention means you pay for every customer twice.",
      },
      {
        question: "Which layer should an SME build first?",
        answer:
          "Layer 1 (attention) and Layer 5 (retention), in parallel. Everything in the middle (conversion, qualification, nurture) is a distribution problem you can solve once the top and bottom of the stack are working.",
      },
    ],
    takeaways: [
      "The revenue stack has 5 layers — you can't skip any and expect compounding.",
      "Each layer has a minimum viable version. Ship the minimum, then iterate.",
      "Attention without conversion is noise. Conversion without retention is a leak.",
      "The layers feed each other — broken retention kills your top of funnel ROI.",
      "Build layer 1 and layer 5 first. Everything in the middle is a distribution problem.",
    ],
    sections: [
      {
        heading: "Layer 1 — the attention surface",
        paragraphs: [
          "Before anything else, you need a way for the right people to notice you. Ads, SEO, content, referrals, PR — pick one, make it real. Attention without a destination is pure cost, but a destination without attention is a cathedral in the desert.",
          "The minimum viable attention surface for an SME is usually two channels: one paid (short feedback loop) and one organic (compounding moat). Start there. Expand only when you've capped the current channel.",
        ],
        callout: {
          title: "Don't skip to 3 channels",
          body:
            "SMEs that try to run 5 channels at once run 5 channels at 20% each. Run 2 at 100% and expand from strength.",
        },
      },
      {
        heading: "Layer 2 — the conversion asset",
        paragraphs: [
          "Once someone lands, you need an asset that does the actual selling. That asset is usually a landing page or a product page, not \"the website.\" The website is a collection of pages; the conversion asset is ONE page that owns ONE job. For D2C brands, the catalog page is the conversion asset, not the product detail page — and it's probably leaking — see [your D2C catalog page is losing you 40% of sales](/blogs/d2c-catalog-conversion).",
          "A good conversion asset promises a specific outcome in the hero, proves it with 1–2 specifics in the second fold, removes the obvious objection in the third, and ends with a low-friction capture. That's the whole page. Everything else is padding. The exact template for the hero is in [the 7-second hero section](/blogs/7-second-hero-section), and if you're writing copy with AI in the loop, read [AI copywriting for Indian SMEs](/blogs/ai-copywriting-india) first so you know where AI wins and where it loses.",
        ],
      },
      {
        heading: "Layer 3 — the qualification gate",
        paragraphs: [
          "Not every lead deserves your time. A qualification gate filters ICP from tire-kickers before a human touches them. The gate can be a form, a quiz, a budget range, a project scope — anything that costs the prospect 20 seconds of intent.",
          "A good gate reduces volume by 30–50% and improves meeting-to-close rate by 2–3×. If your qualification gate doesn't reduce volume, it's not qualifying — it's decorating.",
        ],
        pullQuote:
          "If your gate doesn't cut volume, it's not a gate. It's a welcome mat.",
      },
      {
        heading: "Layer 4 — the nurture engine",
        paragraphs: [
          "Most leads aren't ready to buy on the first touch. The nurture engine is the system that keeps them warm — without annoying them. It's email sequences, WhatsApp check-ins, retargeting pixels, and a calendar invite that lives in the CRM.",
          "The trick is to make nurture feel like a smart friend checking in, not a brand broadcasting. Every touch should give before it asks. Most SME nurture engines fail because they skip the giving.",
        ],
      },
      {
        heading: "Layer 5 — the retention loop",
        paragraphs: [
          "Retention is where margin lives. An SME that spends 6 months acquiring a customer and loses them in month 7 has just bought a very expensive NPS score. The retention loop is the set of systems that turn a first purchase into a second, third, fourth.",
          "A minimum viable retention loop has four moves: a great first delivery, a follow-up at day 14, a check-in at day 45, and a re-engagement offer at day 90. That's it. Most SMEs do zero of these. For the automation side of this loop, see [how we build a 3-tier WhatsApp agent in 7 days](/blogs/whatsapp-sales-agent-in-7-days). For the organic top-of-funnel that feeds it, see [SEO that actually ranks](/blogs/seo-that-actually-ranks).",
        ],
      },
    ],
  },

  // ------------------------------------------------------------------------
  {
    slug: "seo-that-actually-ranks",
    title: "SEO That Actually Ranks — Not Just Reports",
    subtitle:
      "The three signals Google actually trusts, the 90-day plan we run, and the technical checklist we never skip.",
    excerpt:
      "Most SEO \"deliverables\" are reports. Here's how we build topical authority in 90 days using three specific signals — and the technical checklist that actually moves rankings.",
    category: "seo",
    readTime: 12,
    publishedAt: "2026-02-22",
    updatedAt: "2026-04-05",
    popularityScore: 88,
    translations: {
      hi: {
        title: "SEO जो असल में Rank करता है — सिर्फ़ Reports नहीं",
        subtitle:
          "वो तीन signals जिन पर Google सच में trust करता है, हमारा 90-दिन का plan, और वो technical checklist जो हम कभी skip नहीं करते।",
        excerpt:
          "ज़्यादातर SEO \"deliverables\" सिर्फ़ reports होते हैं। यहाँ देखें हम 90 दिनों में topical authority कैसे बनाते हैं — और वो technical checklist जो rankings को असल में हिलाता है।",
      },
    },
    author: {
      name: "Kanha Singh",
      role: "Founder, Sanat Dynamo",
      bio: "Writes about revenue systems, SME conversion, and the unglamorous ops work that compounds.",
    },
    heroSketch: "seoPeakGraph",
    tags: ["seo", "organic", "authority"],
    keywords: {
      primary: "seo strategy india",
      secondary: [
        "topical authority",
        "sme seo",
        "content cluster seo",
        "seo for small business india",
      ],
      searchVolume: 3600,
      difficulty: "high",
      intent: "commercial",
    },
    relatedSlugs: ["5-layer-revenue-stack", "revenue-audit-45-minutes", "why-websites-leak-leads"],
    crossPageLinks: [
      { href: "/services", label: "SEO & content services", note: "our SEO scope" },
      { href: "/case-studies", label: "real ranking case studies", note: "clients at #1" },
      { href: "/contact", label: "get a free SEO audit", note: "45 min" },
    ],
    faq: [
      {
        question: "How long does SEO take to show results for an SME?",
        answer:
          "Long-tail rankings move within 90 days if technical SEO is clean and content is structured as a hub-and-spoke. Head-term rankings typically take 6–9 months as topical authority compounds.",
      },
      {
        question: "What are the three signals Google actually cares about?",
        answer:
          "Topical authority (how many related terms you rank for, not just the target keyword), content freshness (how recently main URLs were meaningfully updated), and internal link density (how your most important URLs receive links from your other URLs).",
      },
      {
        question: "How do I know if my SEO agency is actually delivering?",
        answer:
          "Ask them to report on exactly one KPI: the count of commercial-intent keywords ranking in positions 1–10, week over week. If that number isn't moving after 90 days, the work isn't working.",
      },
    ],
    takeaways: [
      "SEO isn't content volume — it's three signals compounding together.",
      "The three signals: topical authority, content freshness, and internal links.",
      "A 90-day build gets you ranked for long-tail; 9 months for head terms.",
      "Technical SEO is not optional — broken CWV kills everything upstream.",
      "Reports should be about RANKINGS, not 'work done'.",
    ],
    sections: [
      {
        heading: "Why most SEO deliverables don't move needles",
        paragraphs: [
          "If your SEO agency sends you a monthly report with \"12 blog posts written\" and \"3 backlinks built\" at the top, they're selling activity, not outcomes. Rankings are the outcome. Everything else is hope.",
          "A good SEO engagement reports on one number: the count of keywords in positions 1–10, trending week over week. If that number isn't moving after 90 days on long-tail terms, something is wrong — and no amount of \"we published more articles\" will fix it.",
        ],
        callout: {
          title: "The only SEO KPI that matters",
          body:
            "Number of commercial-intent keywords in positions 1–10, week over week. Everything else is a vanity metric.",
        },
      },
      {
        heading: "The three signals Google actually trusts",
        paragraphs: [
          "Google's algorithm looks at hundreds of signals, but three of them do most of the work for SMEs. Get these three right and long-tail rankings compound within 90 days.",
        ],
        bullets: [
          "Topical authority — how many related terms you rank for, not just the target keyword",
          "Content freshness — how recently the main URL was meaningfully updated (not just the date stamp)",
          "Internal link density — how your most important URLs receive links from your other URLs",
        ],
      },
      {
        heading: "How we build topical authority in 90 days",
        paragraphs: [
          "Topical authority is not a single page — it's a cluster. We pick one commercial term, map every related long-tail around it, and publish a hub-and-spoke structure: one pillar page plus 8–15 supporting pages. Each supporting page links to the pillar and to 2–3 sibling pages.",
          "The pillar ranks first for the tail. Then, as the supporting pages accumulate clicks, the pillar starts climbing for the head term. By month 4–6 you're on page 1 for the money keyword.",
        ],
        pullQuote:
          "You don't rank for the term. You rank for the neighborhood.",
      },
      {
        heading: "Technical SEO checklist we never skip",
        paragraphs: [
          "Before any content goes live, the site has to pass a minimum technical bar. If core web vitals are red, content is wasted effort. We wrote up the exact 90-minute remediation sequence we use in [Core Web Vitals for SMEs: the 90-minute fix](/blogs/core-web-vitals-90-minute-fix) — fix that first, content second.",
          "If you're also running paid acquisition alongside SEO (most SMEs should, for the first 6 months), the same keyword-to-page discipline applies — see [the anatomy of a Google Ads campaign that actually pays back](/blogs/google-ads-that-pay) for the five-campaign structure that reuses the SEO landing pages.",
        ],
        bullets: [
          "LCP under 2.5s on 4G mobile",
          "CLS under 0.1, measured on real user monitoring",
          "Title tag under 60 chars, hits the target keyword in first 40",
          "One H1, hierarchical H2–H3 structure, no skipped levels",
          "Schema.org types: Article, Organization, BreadcrumbList",
          "Internal links: every post links to at least 3 siblings + 1 pillar",
          "Canonical, hreflang, and robots.txt sanity checked every deploy",
        ],
      },
      {
        heading: "Reporting the way it should be",
        paragraphs: [
          "Our SEO reports have two lines: 1) keyword count in top 10 this week vs. last week, 2) organic revenue attributed to those keywords. That's it. No activity metrics, no vanity charts, no \"efforts undertaken.\"",
          "If the two numbers went up, we did our job. If not, we're on the call explaining what we're going to change. That's the whole feedback loop. And if you want the same two-number discipline applied to the rest of your funnel, the [45-minute revenue audit](/blogs/revenue-audit-45-minutes) gives you the full diagnostic. The audit plugs straight into the [5-layer revenue stack](/blogs/5-layer-revenue-stack) — SEO is Layer 1, but without Layers 2–5 it's just traffic, not revenue.",
        ],
      },
    ],
  },

  // ------------------------------------------------------------------------
  // 06 · Hero section conversion
  // ------------------------------------------------------------------------
  {
    slug: "7-second-hero-section",
    title: "The 7-Second Hero Section: A Template That Converts",
    subtitle:
      "A visitor decides whether to stay or leave in 7 seconds. Here's the three-line hero template that makes that decision in your favor — on phones and desktops alike.",
    excerpt:
      "Your hero section has exactly 7 seconds to answer three questions. Most SME heroes don't even try. Here's the 3-line template we've shipped on 40+ landing pages.",
    category: "growth",
    readTime: 7,
    publishedAt: "2026-03-02",
    updatedAt: "2026-04-10",
    featured: true,
    popularityScore: 90,
    author: {
      name: "Kanha Singh",
      role: "Founder, Sanat Dynamo",
      bio: "Writes about revenue systems, SME conversion, and the unglamorous ops work that compounds.",
    },
    heroSketch: "auditLens",
    tags: ["hero section", "landing page", "copy"],
    keywords: {
      primary: "hero section conversion",
      secondary: [
        "landing page headline",
        "website hero template",
        "hero copy best practices",
        "above the fold conversion",
      ],
      searchVolume: 880,
      difficulty: "low",
      intent: "informational",
    },
    relatedSlugs: ["why-websites-leak-leads", "d2c-catalog-conversion", "revenue-audit-45-minutes"],
    crossPageLinks: [
      { href: "/services", label: "Landing page engineering", note: "we ship these templates" },
      { href: "/case-studies", label: "a 1.9% → 4.3% case", note: "hero-only rewrite" },
      { href: "/contact", label: "rewrite your hero", note: "free 45-min review" },
    ],
    translations: {
      hi: {
        title: "7-Second Hero Section: एक Template जो Convert करता है",
        subtitle:
          "एक visitor 7 सेकंड में decide करता है रुकना है या जाना। यह three-line hero template आपके हक़ में वो decision करवाता है — mobile और desktop दोनों पर।",
        excerpt:
          "आपके hero section के पास सिर्फ़ 7 सेकंड हैं तीन सवालों का जवाब देने के लिए। ज़्यादातर SME heroes यह कोशिश भी नहीं करते। यहाँ वो 3-line template है जो हमने 40+ landing pages पर ship किया है।",
      },
    },
    takeaways: [
      "A visitor decides whether to stay in 7 seconds — and mostly from the hero.",
      "The hero must answer three questions in order: who, what, proof.",
      "Your hero headline should describe the customer's job, not the company.",
      "A single-CTA hero out-performs a multi-CTA hero 2:1 in every test we've run.",
      "Hero rewrites alone can lift landing page CVR by 1.5–2× — no design change needed.",
    ],
    sections: [
      {
        heading: "What the 7 seconds actually decide",
        paragraphs: [
          "Eye-tracking data from 2024–25 consistently shows the same pattern on mobile landing pages: people look at the top of the page for ~1.5 seconds, scroll once in the next 2 seconds, and then either commit or close the tab by second 6 or 7. That's your window.",
          "In those 7 seconds, a visitor is answering three unspoken questions: \"am I in the right place?\", \"what can this do for me?\", and \"do I believe you?\". Your hero section has to answer all three — or they leave. This is the same failure mode we detail in [why your website leaks leads](/blogs/why-websites-leak-leads).",
        ],
        callout: {
          title: "Rule of thumb",
          body:
            "If a stranger looking at your hero for 7 seconds can't say who it's for and what it does, the hero has failed — no matter how beautiful the design.",
        },
      },
      {
        heading: "The three-line hero template",
        paragraphs: [
          "We use the same three-line template on every landing page and it outperforms the \"clever\" versions 8 times out of 10. Line 1 is the who+what. Line 2 is the specific outcome. Line 3 is the single objection-breaking line of proof.",
          "The first line should contain your primary keyword within the first six words — this gets you the SEO win on commercial-intent terms. The second line quantifies the result in real numbers. The third line uses a number of clients or a named brand to shortcut trust.",
        ],
        bullets: [
          "Line 1 — \"We help [who] do [what]\" with the primary keyword in the first six words",
          "Line 2 — a specific, numeric outcome (₹, %, days, customers)",
          "Line 3 — a proof anchor (\"trusted by X brands\" / \"50+ SMEs\" / a logo strip)",
        ],
        pullQuote:
          "A hero that describes the company is a hero that gets scrolled past. A hero that describes the customer is a hero that converts.",
      },
      {
        heading: "The single-CTA rule (and the A/B test that proved it)",
        paragraphs: [
          "Every hero we ship has exactly one primary CTA. Secondary links go below the fold or into the nav. We've A/B tested single-CTA vs. dual-CTA heroes on 12 landing pages in the last 18 months. The single-CTA version won 11 out of 12, typically by 30–60% on click-through rate.",
          "The reason is cognitive: every extra button adds a micro-decision, and micro-decisions stack. On mobile, where screen real estate is tight, two CTAs also force the user to read twice as much before acting. One CTA, one job. This flows directly into Layer 2 of the [5-layer revenue stack](/blogs/5-layer-revenue-stack).",
        ],
      },
    ],
    faq: [
      {
        question: "How long should a hero headline be?",
        answer:
          "Under 12 words for the headline, under 20 for the subhead. If you can't compress it, you haven't yet decided what the page is for. Longer headlines convert worse on mobile.",
      },
      {
        question: "Should a hero section have two CTAs or one?",
        answer:
          "One primary CTA wins in almost every test. Keep secondary actions below the fold or in the nav — don't put them in the hero.",
      },
      {
        question: "Does the hero need an image or video?",
        answer:
          "Not required. A strong typographic hero with a single subtle background sketch or animation converts as well as a hero with a product shot. What matters is that the copy answers who/what/proof in 7 seconds.",
      },
    ],
  },

  // ------------------------------------------------------------------------
  // 07 · WhatsApp as CRM
  // ------------------------------------------------------------------------
  {
    slug: "whatsapp-as-crm",
    title: "Your CRM Should Live in WhatsApp, Not a Dashboard",
    subtitle:
      "Sales teams don't log into CRMs — they live on WhatsApp. Here's how we rebuild the CRM inside WhatsApp itself, with zero dashboard logins.",
    excerpt:
      "The best CRM for an Indian SME isn't a dashboard. It's WhatsApp itself — with the pipeline, stages, and notes attached. Here's the architecture.",
    category: "automation",
    readTime: 9,
    publishedAt: "2026-02-18",
    updatedAt: "2026-03-28",
    popularityScore: 86,
    author: {
      name: "Kanha Singh",
      role: "Founder, Sanat Dynamo",
      bio: "Writes about revenue systems, SME conversion, and the unglamorous ops work that compounds.",
    },
    heroSketch: "whatsappFlow",
    tags: ["whatsapp", "crm", "automation"],
    keywords: {
      primary: "whatsapp crm",
      secondary: [
        "whatsapp crm india",
        "whatsapp business crm",
        "sales crm for sme",
        "lead management whatsapp",
      ],
      searchVolume: 2200,
      difficulty: "medium",
      intent: "commercial",
    },
    relatedSlugs: ["whatsapp-sales-agent-in-7-days", "real-estate-lead-scoring", "5-layer-revenue-stack"],
    crossPageLinks: [
      { href: "/services", label: "WhatsApp CRM setup", note: "full implementation" },
      { href: "/industries", label: "who we've shipped for", note: "D2C, real estate, clinics" },
      { href: "/contact", label: "start building", note: "free scoping call" },
    ],
    translations: {
      hi: {
        title: "आपका CRM WhatsApp में होना चाहिए, Dashboard में नहीं",
        subtitle:
          "Sales teams CRMs में login नहीं करतीं — वो WhatsApp पर रहती हैं। यहाँ देखें हम CRM को WhatsApp के अंदर कैसे बनाते हैं — zero dashboard login।",
        excerpt:
          "Indian SME के लिए सबसे अच्छा CRM कोई dashboard नहीं है। वो WhatsApp खुद है — pipeline, stages और notes के साथ। यहाँ है पूरा architecture।",
      },
    },
    takeaways: [
      "Sales teams won't log into a CRM they don't already live in.",
      "WhatsApp is already your pipeline — the job is to structure it.",
      "Labels + groups + webhook = a real CRM, zero extra app.",
      "Every stage in the pipeline maps to one WhatsApp label.",
      "The webhook pushes events to a thin dashboard only the founder looks at.",
    ],
    sections: [
      {
        heading: "The CRM paradox every SME faces",
        paragraphs: [
          "Buy a proper CRM (Salesforce, HubSpot, Zoho). Give your sales team logins. Watch nothing get updated. Ask the team at EOD where each lead stands. Get shrugs. This is the CRM paradox — the tool no one uses is worse than no tool at all.",
          "The fix isn't a better CRM. The fix is to stop asking sales to log into a CRM. Instead, build the CRM inside the tool they already live in all day — WhatsApp. When the pipeline is where the conversations are, nobody has to log anything.",
        ],
      },
      {
        heading: "Labels + groups + a webhook = a full CRM",
        paragraphs: [
          "The architecture is embarrassingly simple. WhatsApp Business supports labels (New, Qualified, Negotiating, Closed) — those become your pipeline stages. WhatsApp groups become your team's shared inbox. A webhook from the WhatsApp Business API pushes every labeled event to a lightweight dashboard.",
          "The dashboard is only looked at by the founder, not the sales team. Sales still works where they're comfortable — chatting, replying, closing — and the system quietly captures everything into structured data in the background. This is the same hand-off discipline we used in the [7-day WhatsApp sales agent](/blogs/whatsapp-sales-agent-in-7-days).",
        ],
        bullets: [
          "Labels — New / Qualified / Negotiating / Won / Lost",
          "Groups — one per RM, each with a structured naming convention",
          "Webhook — pushes label changes and message counts to the dashboard",
          "Dashboard — founder-only, read-only, shows pipeline velocity and stuck leads",
        ],
        callout: {
          title: "The one rule",
          body:
            "Sales never opens the dashboard. If they do, you've built a second CRM.",
        },
      },
      {
        heading: "What this actually looks like on day 30",
        paragraphs: [
          "After 30 days of running this, a typical SME pipeline looks like this: 200+ leads labeled into 4 stages, 80% of them touched within 5 minutes, a dashboard that shows the founder exactly where every lead is stuck, and a sales team that's spending zero minutes a day on \"CRM hygiene.\"",
          "The founder still gets the visibility they needed. The sales team gets to do the job they were hired for. And when a lead goes quiet, the label itself triggers a follow-up sequence — no human intervention required. Pair this with a proper [45-minute revenue audit](/blogs/revenue-audit-45-minutes) and you have the full top-of-funnel picture without ever opening a dashboard.",
        ],
      },
    ],
    faq: [
      {
        question: "Can WhatsApp Business actually replace a full CRM?",
        answer:
          "For most Indian SMEs doing under ₹10Cr in revenue, yes. The moment your team hits 5+ sales reps or you need multi-stage reporting for finance, you'll graduate to a real CRM — but keep WhatsApp as the primary interface.",
      },
      {
        question: "How do I see pipeline velocity without a proper CRM?",
        answer:
          "A lightweight dashboard fed by the WhatsApp Business webhook. It stores label changes with timestamps, which gives you stage-by-stage velocity without any manual entry.",
      },
      {
        question: "What happens when a sales rep leaves the company?",
        answer:
          "Because the data lives in groups and labels (not in a rep's phone), ownership transfer is a one-click operation. You reassign the group, archive the rep's labels, and the pipeline continues.",
      },
    ],
  },

  // ------------------------------------------------------------------------
  // 08 · Real estate lead scoring
  // ------------------------------------------------------------------------
  {
    slug: "real-estate-lead-scoring",
    title: "The Real Estate Lead Score That Actually Predicts Buyers",
    subtitle:
      "Most real estate \"lead scores\" correlate with nothing. Here's the four-variable model we use to predict who'll actually sign in 30 days.",
    excerpt:
      "For real estate SMEs, the difference between a ₹3,000 lead and a ₹30,000 lead is lead scoring that actually works. Here's the four-variable model that predicts buyers, not tire-kickers.",
    category: "automation",
    readTime: 10,
    publishedAt: "2026-02-10",
    updatedAt: "2026-03-22",
    popularityScore: 78,
    author: {
      name: "Kanha Singh",
      role: "Founder, Sanat Dynamo",
      bio: "Writes about revenue systems, SME conversion, and the unglamorous ops work that compounds.",
    },
    heroSketch: "auditLens",
    tags: ["real estate", "lead scoring", "automation"],
    keywords: {
      primary: "real estate lead scoring",
      secondary: [
        "real estate crm india",
        "lead qualification real estate",
        "real estate lead management",
        "property lead scoring",
      ],
      searchVolume: 720,
      difficulty: "medium",
      intent: "commercial",
    },
    relatedSlugs: ["whatsapp-as-crm", "whatsapp-sales-agent-in-7-days", "revenue-audit-45-minutes"],
    crossPageLinks: [
      { href: "/industries", label: "Real Estate systems", note: "our full scope" },
      { href: "/case-studies", label: "₹30L case study", note: "lead scoring in action" },
      { href: "/contact", label: "book a scoring review", note: "free 45-min" },
    ],
    translations: {
      hi: {
        title: "Real Estate Lead Score जो असल में Buyers predict करता है",
        subtitle:
          "ज़्यादातर real estate \"lead scores\" किसी से correlate नहीं करते। यह four-variable model 30 दिनों में sign करने वाले को predict करता है।",
        excerpt:
          "Real estate SMEs के लिए ₹3,000 और ₹30,000 के lead का फ़र्क़ एक ऐसे lead scoring से होता है जो असल में काम करे। यह model tire-kickers नहीं, buyers predict करता है।",
      },
    },
    takeaways: [
      "Lead scoring that averages 10 variables usually predicts nothing.",
      "The four-variable model: budget, timeline, area fit, decision-maker presence.",
      "Budget alone correlates weakly. Timeline + decision-maker = the real signal.",
      "A good score cuts sales time on bad leads by 60%+.",
      "Score on inbound only — don't score outbound until you have data.",
    ],
    sections: [
      {
        heading: "Why most real estate lead scores are useless",
        paragraphs: [
          "Open any real estate CRM template and you'll see a 15-variable lead scoring model: budget, timeline, area preference, bedroom count, furnishing, amenities, ownership goal, financing, employment, marital status, age, referral source, visit count, call responsiveness, WhatsApp engagement. Sum them up with weights and you get a \"score\" between 0 and 100.",
          "That score correlates with nothing. We've run retrospective analysis on 8,000 leads across three real estate SMEs. The 15-variable score had an R² of 0.11 against actual sign rates — it was basically random noise.",
        ],
        callout: {
          title: "The problem with complexity",
          body:
            "The more variables in your score, the more each one gets diluted. The signal drowns in the noise.",
        },
      },
      {
        heading: "The four-variable model that actually works",
        paragraphs: [
          "Strip the model down to four variables: declared budget, declared timeline, area fit (Y/N), and decision-maker presence (Y/N). That's it. This four-variable score had an R² of 0.63 against sign rates on the same 8,000-lead dataset — a 6× improvement over the 15-variable version.",
          "The two variables that do the real work are timeline and decision-maker presence. A lead with \"3 months\" timeline and \"I'll decide\" outperforms a lead with \"₹2 crore budget\" and \"I'll discuss with family\" by a factor of 4. Budget without urgency is just a daydream.",
        ],
        bullets: [
          "Budget range — declared, in ₹ lakhs",
          "Timeline — declared, in days (0–30 = hot, 30–90 = warm, 90+ = cold)",
          "Area fit — does the property match their stated area? (Y/N)",
          "Decision-maker — is this person the final buyer? (Y/N)",
        ],
        pullQuote:
          "Budget without urgency is a daydream. Timeline without decision-maker presence is a permission slip.",
      },
      {
        heading: "Wiring the score into a WhatsApp pipeline",
        paragraphs: [
          "The four variables are captured in the first WhatsApp exchange — they're literally the first four questions the bot asks. The score is computed on the spot and written as a WhatsApp label (🔥 hot, 🌤 warm, 🌧 cold). Sales sees the label in the group and prioritizes accordingly.",
          "This plugs straight into the architecture in [your CRM should live in WhatsApp](/blogs/whatsapp-as-crm), and the bot itself is the same three-tier system from [the 7-day WhatsApp sales agent](/blogs/whatsapp-sales-agent-in-7-days). The only new piece is the scoring function.",
        ],
      },
    ],
    faq: [
      {
        question: "Why does a 4-variable model outperform a 15-variable one?",
        answer:
          "Because variables dilute each other. With 15 variables, the two signals that matter (timeline and decision-maker presence) get averaged with 13 that don't. A tight model with fewer, higher-quality variables is always more predictive.",
      },
      {
        question: "What ROI does a working lead score actually deliver?",
        answer:
          "In our case work, a real score cuts sales time spent on bad leads by 60% and lifts qualified-lead-to-close rate by 40–80%. That compounds fast — the same team closes more with less effort.",
      },
    ],
  },

  // ------------------------------------------------------------------------
  // 09 · Clinic reception automation
  // ------------------------------------------------------------------------
  {
    slug: "clinic-reception-automation",
    title: "Clinic Reception Automation: Zero No-Shows, Zero Chaos",
    subtitle:
      "A 3-step WhatsApp automation that drops no-shows from 30% to under 8% — without hiring, without replacing your front desk.",
    excerpt:
      "For clinics, a 30% no-show rate is normal and catastrophic. Here's the 3-step WhatsApp automation we deploy to bring it under 8% — in a single week.",
    category: "automation",
    readTime: 8,
    publishedAt: "2026-02-02",
    updatedAt: "2026-03-14",
    popularityScore: 72,
    author: {
      name: "Kanha Singh",
      role: "Founder, Sanat Dynamo",
      bio: "Writes about revenue systems, SME conversion, and the unglamorous ops work that compounds.",
    },
    heroSketch: "whatsappFlow",
    tags: ["clinic", "appointments", "automation"],
    keywords: {
      primary: "clinic appointment automation",
      secondary: [
        "clinic no show reduction",
        "clinic whatsapp reminders",
        "appointment reminder system",
        "clinic reception automation india",
      ],
      searchVolume: 1100,
      difficulty: "low",
      intent: "commercial",
    },
    relatedSlugs: ["whatsapp-as-crm", "whatsapp-sales-agent-in-7-days", "5-layer-revenue-stack"],
    crossPageLinks: [
      { href: "/industries", label: "Clinic systems", note: "full implementation" },
      { href: "/services", label: "Automation services", note: "for any receptionist workflow" },
      { href: "/contact", label: "get a 1-week setup", note: "deploy in 7 days" },
    ],
    translations: {
      hi: {
        title: "Clinic Reception Automation: Zero No-Shows, Zero Chaos",
        subtitle:
          "एक 3-step WhatsApp automation जो no-shows को 30% से 8% से नीचे लाता है — बिना नई hiring और front desk बदले।",
        excerpt:
          "Clinics के लिए 30% no-show rate normal है और catastrophic भी। यहाँ है वो 3-step WhatsApp automation जो इसे एक हफ़्ते में 8% से नीचे लाता है।",
      },
    },
    takeaways: [
      "Average clinic no-show rate in India is 25–35%. It's a profit killer.",
      "The fix is a 3-step reminder sequence — booking confirm, T-24, T-2.",
      "All three steps are WhatsApp, not SMS — SMS open rate is 10%, WhatsApp is 90%.",
      "A confirm/reschedule button inside the reminder cuts no-shows by another 50%.",
      "Deploy in 7 days, zero software the receptionist needs to learn.",
    ],
    sections: [
      {
        heading: "The 30% no-show tax",
        paragraphs: [
          "Most clinics we audit operate with a 25–35% no-show rate. For a 40-slot-a-day clinic charging ₹600 per consult, that's ₹6,000–₹8,400 in direct revenue walking out the door every single day, plus the downstream consequence of blocked slots that couldn't be offered to someone else.",
          "The typical fix — hire another receptionist to call and remind — costs ₹25,000/month and has no measurable impact. The real fix is automation that doesn't add headcount and doesn't ask the receptionist to do anything new.",
        ],
      },
      {
        heading: "The 3-step WhatsApp reminder flow",
        paragraphs: [
          "Step 1 fires at booking confirmation — a WhatsApp message with the slot, the doctor's name, the clinic address, and a \"confirm / reschedule\" button. Step 2 fires at T-24 hours — a reminder with the same info and the same button. Step 3 fires at T-2 hours — a short nudge with the address map.",
          "Every button tap is captured by the webhook and pushed back into the clinic's booking system. If a patient taps \"reschedule,\" the slot is released and offered to the next person on the waiting list — turning a potential no-show into a same-day booking. This is the same automation discipline we describe in [the 7-day WhatsApp sales agent](/blogs/whatsapp-sales-agent-in-7-days).",
        ],
        bullets: [
          "T0 — booking confirmation with slot, doctor, address, and confirm/reschedule button",
          "T-24h — reminder with the same info and button",
          "T-2h — short address-map nudge",
        ],
        callout: {
          title: "Why not SMS?",
          body:
            "SMS open rates in India are ~10%. WhatsApp open rates for transactional messages are 85–95%. On reminders alone, the delivery lift is 8×.",
        },
      },
      {
        heading: "Results from 4 clinics over 8 weeks",
        paragraphs: [
          "We deployed this at four clinics in Delhi, Pune, and Bangalore between November 2025 and January 2026. Average no-show rate before rollout: 31%. Average after 8 weeks: 7.2%. The delta is almost entirely from the T-24 and T-2 steps, not the booking confirmation.",
          "The second-order effect is cleaner: the receptionist is no longer apologizing to walk-ins about \"full slots\" that weren't actually full. Patient satisfaction went up, staff satisfaction went up, and the clinic owner didn't have to hire anyone. If you're running a clinic, this is usually the highest-ROI fix we recommend — even before touching the [revenue audit](/blogs/revenue-audit-45-minutes) or [website hero rewrite](/blogs/7-second-hero-section).",
        ],
      },
    ],
    faq: [
      {
        question: "How long does it take to set up clinic appointment automation?",
        answer:
          "A typical setup takes 5–7 days: day 1–2 is WhatsApp Business API approval, day 3–4 is template approval, day 5–6 is integration with the clinic's booking sheet or software, day 7 is training the receptionist on the dashboard (which they rarely open after week 1).",
      },
      {
        question: "Does this work for clinics that take walk-ins as well as appointments?",
        answer:
          "Yes. The automation only touches the appointment flow — walk-ins continue through the existing reception process. The two systems don't conflict.",
      },
      {
        question: "What if patients don't use WhatsApp?",
        answer:
          "In India, WhatsApp penetration is 95%+ in urban and 78%+ in rural areas. We haven't yet met a clinic where this was a real problem. For the rare exception, the system falls back to SMS for those specific patients.",
      },
    ],
  },

  // ------------------------------------------------------------------------
  // 10 · D2C catalog page
  // ------------------------------------------------------------------------
  {
    slug: "d2c-catalog-conversion",
    title: "Your D2C Catalog Page Is Losing You 40% of Sales",
    subtitle:
      "The product listing page is where most D2C brands silently leak their paid traffic. Here's the 6-block layout that stops it — and the hero, CTAs, and social proof that belong in each.",
    excerpt:
      "Every D2C brand obsesses over the product detail page. Meanwhile, the catalog page — the one visitors see first — is losing them 40% of their sales. Here's the fix.",
    category: "growth",
    readTime: 9,
    publishedAt: "2026-01-26",
    updatedAt: "2026-03-08",
    popularityScore: 81,
    author: {
      name: "Kanha Singh",
      role: "Founder, Sanat Dynamo",
      bio: "Writes about revenue systems, SME conversion, and the unglamorous ops work that compounds.",
    },
    heroSketch: "leakyFunnel",
    tags: ["d2c", "ecommerce", "product listing"],
    keywords: {
      primary: "d2c product listing page optimization",
      secondary: [
        "d2c catalog page",
        "ecommerce plp optimization",
        "shopify catalog conversion",
        "product listing design",
      ],
      searchVolume: 1400,
      difficulty: "medium",
      intent: "commercial",
    },
    relatedSlugs: ["why-websites-leak-leads", "7-second-hero-section", "revenue-audit-45-minutes"],
    crossPageLinks: [
      { href: "/industries", label: "D2C growth systems", note: "our D2C focus" },
      { href: "/services", label: "Conversion engineering", note: "full CRO scope" },
      { href: "/contact", label: "audit your catalog", note: "free 45-min" },
    ],
    translations: {
      hi: {
        title: "आपका D2C Catalog Page 40% Sales खो रहा है",
        subtitle:
          "Product listing page वो जगह है जहाँ ज़्यादातर D2C brands paid traffic चुपचाप leak करते हैं। यहाँ है वो 6-block layout जो इसे रोकता है।",
        excerpt:
          "हर D2C brand product detail page पर obsess करती है। जबकि catalog page — जो visitors पहले देखते हैं — उनकी 40% sales खो रहा है। यहाँ है fix।",
      },
    },
    takeaways: [
      "The catalog page is the second-most important page in D2C, after the hero.",
      "40% of paid traffic bounces at the catalog page, not the product detail.",
      "The 6-block layout: hero, filter bar, social-proof strip, grid, trust row, retargeting hook.",
      "Sticky filters lift add-to-cart by 18% on average.",
      "A 1-line review count on each card out-performs a 5-star badge.",
    ],
    sections: [
      {
        heading: "Why the catalog page is where D2C growth dies",
        paragraphs: [
          "A D2C brand spends ₹80 to get a visitor to the site. That visitor lands on the catalog page. In 6 seconds, they either find a product that interests them enough to click, or they leave. Our analysis across 22 D2C brands shows a median 42% bounce rate at this exact moment — which means nearly half of the ₹80 has already been wasted.",
          "The irony is that most D2C teams spend 80% of their CRO time on the product detail page, which by that point is already a pre-qualified visitor. The real fight is at the catalog page, and almost nobody fights it. This is the same dynamic we unpack in [why your website leaks leads](/blogs/why-websites-leak-leads) — the biggest leak is never where teams are looking.",
        ],
      },
      {
        heading: "The 6-block catalog page layout",
        paragraphs: [
          "We rebuild every D2C catalog page around the same six blocks. Each block does exactly one job, and none of them are decorative. The goal is to get the visitor from landing → interested in a specific product → add to cart in under 15 seconds.",
        ],
        bullets: [
          "01 · Hero — category headline + promise (follows the [7-second hero template](/blogs/7-second-hero-section))",
          "02 · Filter bar — sticky, showing the 3 most-used filters for this category",
          "03 · Social-proof strip — \"2,400+ customers\" + 2 named brand logos",
          "04 · Grid — 3 columns on mobile, 4 on desktop, with per-card review count",
          "05 · Trust row — returns, shipping, COD (for India this one is non-negotiable)",
          "06 · Retargeting hook — WhatsApp opt-in at the bottom, for visitors who don't buy",
        ],
        callout: {
          title: "The sticky filter rule",
          body:
            "On mobile, the filter bar must be sticky as the user scrolls the grid. This one change alone lifts add-to-cart by ~18% in our tests.",
        },
      },
      {
        heading: "The review count trick nobody uses",
        paragraphs: [
          "Most D2C product cards have a 5-star badge in the corner. That's trust theatre — it doesn't move the needle. What does move the needle is a one-line review count: \"4.7 · 312 reviews.\" The number does the work; the star rating alone doesn't.",
          "We've tested this on three D2C brands. Star-only: baseline. Star + count: +14% click-through to product detail. The count creates implicit social proof — \"312 people bought this\" is concrete, while a 5-star badge is decorative. Pair this with the retargeting hook at the bottom and you have a catalog page that stops leaking paid traffic.",
        ],
      },
    ],
    faq: [
      {
        question: "What bounce rate is \"normal\" on a D2C catalog page?",
        answer:
          "In India, 40–55% is normal for D2C catalog pages from paid traffic. \"Good\" is under 35%. Under 25% is elite and usually comes with a properly rebuilt catalog layout plus strong brand recognition.",
      },
      {
        question: "Do I need infinite scroll or pagination on the catalog grid?",
        answer:
          "Neither. Use a \"load more\" button after 12–18 products. Infinite scroll hurts add-to-cart because visitors never feel like they've \"finished\" evaluating. Pagination breaks the cognitive flow. A button is the middle ground.",
      },
    ],
  },

  // ------------------------------------------------------------------------
  // 11 · AI copywriting for Indian SMEs
  // ------------------------------------------------------------------------
  {
    slug: "ai-copywriting-india",
    title: "AI Copywriting for Indian SMEs: What Works and What Doesn't",
    subtitle:
      "After 200+ landing pages written with AI in the loop, here's where the tool actually helps — and where it still needs a human to ship.",
    excerpt:
      "AI copywriting can ship 80% of a landing page in 10 minutes. The other 20% is what separates a page that converts from a page that reads like a robot wrote it.",
    category: "growth",
    readTime: 10,
    publishedAt: "2026-01-18",
    updatedAt: "2026-03-02",
    popularityScore: 76,
    author: {
      name: "Kanha Singh",
      role: "Founder, Sanat Dynamo",
      bio: "Writes about revenue systems, SME conversion, and the unglamorous ops work that compounds.",
    },
    heroSketch: "layerStack",
    tags: ["ai", "copywriting", "landing page"],
    keywords: {
      primary: "ai copywriting tools",
      secondary: [
        "ai landing page copy",
        "chatgpt for marketers",
        "ai content india",
        "ai copywriter for sme",
      ],
      searchVolume: 4800,
      difficulty: "high",
      intent: "informational",
    },
    relatedSlugs: ["7-second-hero-section", "d2c-catalog-conversion", "seo-that-actually-ranks"],
    crossPageLinks: [
      { href: "/services", label: "AI-assisted copy", note: "how we use it on client work" },
      { href: "/case-studies", label: "before/after examples", note: "real pages, real numbers" },
      { href: "/contact", label: "review your copy", note: "free 30-min" },
    ],
    translations: {
      hi: {
        title: "Indian SMEs के लिए AI Copywriting: क्या काम करता है, क्या नहीं",
        subtitle:
          "200+ landing pages AI के साथ लिखने के बाद, यहाँ है वो जहाँ tool असल में मदद करता है — और जहाँ अब भी human की ज़रूरत है।",
        excerpt:
          "AI copywriting 10 मिनट में एक landing page का 80% ship कर सकती है। बाकी 20% वो है जो convert करने वाले page को robotic page से अलग करता है।",
      },
    },
    takeaways: [
      "AI can ship 80% of a landing page in 10 minutes — if you feed it the right prompts.",
      "The remaining 20% is hero, CTAs, and objection handling — all still human work.",
      "The best prompts are \"write like this specific brand\" with 3 examples attached.",
      "Never let AI write testimonials or case study numbers. Ever.",
      "A/B test AI-generated headlines against human ones — they tie more often than you'd think.",
    ],
    sections: [
      {
        heading: "Where AI copy actually wins",
        paragraphs: [
          "After writing 200+ landing pages with AI in the loop, the pattern is clear: AI wins on the volume work and loses on the art work. Subheads, feature descriptions, FAQ answers, meta descriptions, product copy — AI ships 80% of it in 10 minutes and it's indistinguishable from human output.",
          "Where AI still loses is the hero headline, the single-line value proposition, and anything that requires specific knowledge of the founder's tone. Those remain firmly human. We cover the specific template AI still can't reliably produce in [the 7-second hero section](/blogs/7-second-hero-section).",
        ],
        bullets: [
          "Wins: subheads, feature copy, FAQ answers, meta descriptions, product descriptions, alt text",
          "Ties: bullet points, mid-funnel explainers, CTA variations",
          "Loses: hero headlines, founder-voice narrative, testimonial attribution",
        ],
      },
      {
        heading: "The prompt pattern that works",
        paragraphs: [
          "Generic AI copy reads like generic AI copy. The fix is to attach 3 examples of the brand's existing voice to every prompt and ask the model to match that voice specifically. This one change takes output quality from 6/10 to 8.5/10 on our internal rubric.",
          "The second trick is to ask the model for 5 versions and cherry-pick one — don't accept the first version. Models tend to warm up by version 3 or 4. The best headline is almost never version 1.",
        ],
        callout: {
          title: "Never let AI write these",
          body:
            "Testimonials. Case study numbers. Team bios. Anything that implies human authorship. If you fake it, Google will eventually catch you, and buyers always do.",
        },
      },
      {
        heading: "The human edits that still matter",
        paragraphs: [
          "A good human editor can take AI-generated copy from 8.5/10 to 9.5/10 in about 15 minutes. The edits are always the same: cut adverbs, replace passive voice with active, add one specific number, remove one sentence per paragraph, and rewrite the CTA.",
          "That 15-minute edit is where the conversion lift actually lives. Skip it and you're shipping 8/10 copy, which is fine for SEO but leaves conversion on the table. This is the same pattern we teach in [SEO that actually ranks](/blogs/seo-that-actually-ranks) — speed wins against no content, but quality wins against speed.",
        ],
      },
    ],
    faq: [
      {
        question: "Can AI copywriting replace a human copywriter?",
        answer:
          "Not yet for the pieces that move conversion most — headlines, value props, and founder-voice narrative. Yes for the bulk work: subheads, feature copy, FAQ answers, meta descriptions. The right setup is AI + a human editor doing 15 minutes of polish per page.",
      },
      {
        question: "Does AI-generated copy hurt SEO?",
        answer:
          "Google has stated that AI-generated content is fine as long as it's genuinely useful. In practice, the problem isn't the AI — it's thin, generic, unedited AI output shipped at scale. Edit every page, add specific examples, and you're fine.",
      },
      {
        question: "Which AI copy tool do you recommend?",
        answer:
          "We use Claude and GPT-4 interchangeably, with the 3-example prompt pattern described above. The tool matters less than the prompt. We don't use specialized \"copywriting AI\" tools — they abstract away the prompt engineering that does the real work.",
      },
    ],
  },

  // ------------------------------------------------------------------------
  // 12 · Google Ads that pay back
  // ------------------------------------------------------------------------
  {
    slug: "google-ads-that-pay",
    title: "The Anatomy of a Google Ads Campaign That Actually Pays Back",
    subtitle:
      "Most SME Google Ads accounts lose money. Here's the 5-part campaign structure we use to make them pay — even with ₹1,000/day budgets.",
    excerpt:
      "For Indian SMEs, Google Ads works — but only if the campaign structure is right. Here's the 5-part anatomy we've seen pay back on budgets as low as ₹1,000/day.",
    category: "growth",
    readTime: 11,
    publishedAt: "2026-01-10",
    updatedAt: "2026-02-24",
    popularityScore: 83,
    author: {
      name: "Kanha Singh",
      role: "Founder, Sanat Dynamo",
      bio: "Writes about revenue systems, SME conversion, and the unglamorous ops work that compounds.",
    },
    heroSketch: "seoPeakGraph",
    tags: ["google ads", "paid", "sme"],
    keywords: {
      primary: "google ads for small business india",
      secondary: [
        "google ads sme",
        "google ads campaign structure",
        "google ads budget india",
        "google ads roi",
      ],
      searchVolume: 3200,
      difficulty: "high",
      intent: "commercial",
    },
    relatedSlugs: ["seo-that-actually-ranks", "why-websites-leak-leads", "7-second-hero-section"],
    crossPageLinks: [
      { href: "/services", label: "Paid media services", note: "Google + Meta + LinkedIn" },
      { href: "/case-studies", label: "ads case study", note: "real ROI numbers" },
      { href: "/contact", label: "audit your ads", note: "free 45-min" },
    ],
    translations: {
      hi: {
        title: "Google Ads Campaign की Anatomy जो असल में Pay Back करती है",
        subtitle:
          "ज़्यादातर SME Google Ads accounts पैसा गँवाते हैं। यह 5-part structure उन्हें ₹1,000/day budget पर भी profit में लाता है।",
        excerpt:
          "Indian SMEs के लिए Google Ads काम करता है — लेकिन सिर्फ़ तब जब campaign structure सही हो। यहाँ है वो 5-part anatomy जो ₹1,000/day पर भी pay back करती है।",
      },
    },
    takeaways: [
      "Google Ads works for SMEs, but the structure has to be deliberate.",
      "Separate exact match from phrase match — never run them together.",
      "Brand campaign is mandatory, even if you think \"nobody searches my brand.\"",
      "Landing pages must match the ad's exact keyword, not the category page.",
      "ROAS needs 4–6 weeks of data to mean anything. Don't kill a campaign too early.",
    ],
    sections: [
      {
        heading: "Why most SME Google Ads accounts lose money",
        paragraphs: [
          "90% of the Google Ads accounts we audit for Indian SMEs are net unprofitable. The pattern is almost always the same: one catch-all \"Search\" campaign with 50 mixed-intent keywords, all pointing to the homepage, on broad match with default bidding.",
          "That setup is designed to spend your budget on low-intent traffic and send it to a page that wasn't built to convert it. Fixing the structure is the single highest-leverage change you can make — bigger than any copy tweak, bigger than any new creative.",
        ],
      },
      {
        heading: "The 5-part campaign structure that works",
        paragraphs: [
          "Rebuild the account into five campaigns with clear job descriptions. Each campaign has a narrow intent, a matched landing page, and a budget ceiling that stops it from cannibalizing the others.",
        ],
        bullets: [
          "01 · Brand — exact match on your brand name, defensive + retargeting",
          "02 · Core commercial — 5–8 high-intent keywords, exact match only, own landing page per keyword",
          "03 · Competitor — exact match on 2 named competitors, comparison landing page",
          "04 · Long-tail — phrase match on informational keywords, blog post landing pages",
          "05 · Retargeting — pixel-based, 14-day window, offer-led creative",
        ],
        callout: {
          title: "The brand campaign debate",
          body:
            "\"Nobody searches my brand name\" — we hear this every audit. Run the campaign anyway. It protects you from competitors bidding on your name and the keyword is usually ₹3–8 per click. Cheap insurance.",
        },
      },
      {
        heading: "The landing page rule nobody follows",
        paragraphs: [
          "Every Google ad should send traffic to a landing page that contains the exact keyword in the hero. Not the homepage. Not the category page. Not a generic services page. A keyword-matched landing page with a [7-second hero](/blogs/7-second-hero-section) built for that one term.",
          "This is the change that gets most SME ad accounts from \"bleeding money\" to \"breakeven\" in a month. The landing page fix is also why [SEO that actually ranks](/blogs/seo-that-actually-ranks) compounds — you're building the same keyword-to-page map that feeds organic, just sooner.",
        ],
      },
    ],
    faq: [
      {
        question: "What's the minimum Google Ads budget for an Indian SME?",
        answer:
          "₹1,000/day is enough to test the 5-campaign structure on 2–3 high-intent keywords. Below that, the data takes too long to accumulate and you can't make real decisions. Above ₹3,000/day you can run the full structure.",
      },
      {
        question: "How long before I know if Google Ads is working for my business?",
        answer:
          "Give it 6 weeks of disciplined data. Anything less and you're reacting to noise. ROAS stabilizes after 3–4 weeks; you can make structural decisions by week 6. Don't kill a campaign earlier than that unless it's obviously broken (0 conversions on 100+ clicks).",
      },
      {
        question: "Should I use automated bidding or manual CPC?",
        answer:
          "Start with manual CPC until you have 30+ conversions, then switch to Target CPA or Target ROAS. Automated bidding needs conversion data to work. Skip this step and Google Ads will spend your budget learning.",
      },
    ],
  },

  // ------------------------------------------------------------------------
  // 13 · Core Web Vitals 90-minute fix
  // ------------------------------------------------------------------------
  {
    slug: "core-web-vitals-90-minute-fix",
    title: "Core Web Vitals for SMEs: The 90-Minute Fix",
    subtitle:
      "If your CWV scores are red, no amount of content or SEO will save you. Here's the 90-minute fix we run on every SME site — in order of impact.",
    excerpt:
      "Core Web Vitals are pass/fail for SEO. If you're red, you lose. Here's the 90-minute sequence of fixes we run on every SME site to get to green — in the order that matters most.",
    category: "seo",
    readTime: 8,
    publishedAt: "2026-01-02",
    updatedAt: "2026-02-16",
    popularityScore: 74,
    author: {
      name: "Kanha Singh",
      role: "Founder, Sanat Dynamo",
      bio: "Writes about revenue systems, SME conversion, and the unglamorous ops work that compounds.",
    },
    heroSketch: "seoPeakGraph",
    tags: ["core web vitals", "performance", "seo"],
    keywords: {
      primary: "core web vitals optimization",
      secondary: [
        "cwv optimization",
        "lcp fix",
        "cls fix",
        "website speed optimization india",
      ],
      searchVolume: 2400,
      difficulty: "medium",
      intent: "informational",
    },
    relatedSlugs: ["seo-that-actually-ranks", "why-websites-leak-leads", "revenue-audit-45-minutes"],
    crossPageLinks: [
      { href: "/services", label: "Technical SEO services", note: "full CWV fix scope" },
      { href: "/case-studies", label: "red → green case study", note: "in 90 minutes" },
      { href: "/contact", label: "book a CWV review", note: "free 30-min" },
    ],
    translations: {
      hi: {
        title: "SMEs के लिए Core Web Vitals: 90-मिनट का Fix",
        subtitle:
          "अगर आपके CWV scores red हैं, तो कोई content या SEO आपको नहीं बचाएगा। यहाँ है वो 90-मिनट का fix जो हम हर SME site पर run करते हैं — impact order में।",
        excerpt:
          "Core Web Vitals SEO के लिए pass/fail हैं। Red मतलब आप हार गए। यहाँ है वो 90-मिनट की sequence जो हर SME site को green पर लाती है।",
      },
    },
    takeaways: [
      "CWV is a hard ranking factor — red scores destroy organic potential.",
      "The 3 metrics that matter: LCP (under 2.5s), CLS (under 0.1), INP (under 200ms).",
      "90% of CWV failures come from 3 root causes: images, web fonts, and blocking scripts.",
      "The 90-minute fix, in order: hero image, font loading, third-party scripts.",
      "Measure with real-user monitoring, not PageSpeed Insights alone.",
    ],
    sections: [
      {
        heading: "Why Core Web Vitals are non-negotiable",
        paragraphs: [
          "Since 2021, Google has treated Core Web Vitals as a hard ranking signal for mobile search. It's not a tiebreaker — it's a gate. Sites with red CWV scores get systematically outranked by sites with green ones, even when the red site has better content.",
          "For SMEs, this means the whole content and SEO strategy — everything in [SEO that actually ranks](/blogs/seo-that-actually-ranks) — gets wasted if the technical foundation is red. The good news: 90% of CWV failures come from three specific root causes, and all three are fixable in under 90 minutes.",
        ],
      },
      {
        heading: "The 90-minute fix, in impact order",
        paragraphs: [
          "Fix the biggest thing first. On 80% of SME sites, that's the hero image — it's what Google measures as LCP. Serve it at the right dimensions, compress it aggressively, and add a preload link. LCP usually drops from 3.5s to 1.8s from this one change.",
          "Fix number two is fonts. Most SME sites load 3–5 font weights from Google Fonts with default settings, which blocks render and causes layout shift. Switch to self-hosted, subset, with `font-display: swap` and you've killed both the render block and the CLS.",
        ],
        bullets: [
          "01 · Hero image (30 min) — right dimensions, compress, preload",
          "02 · Fonts (20 min) — self-host, subset, font-display: swap",
          "03 · Third-party scripts (25 min) — defer, lazy-load, remove what you can",
          "04 · Layout stability (15 min) — explicit width/height on images, reserved space for ads",
        ],
        callout: {
          title: "The PageSpeed Insights trap",
          body:
            "PSI runs in a simulated environment. Your real users are on real networks with real cache states. Always confirm with real-user monitoring before calling a fix \"done.\"",
        },
      },
      {
        heading: "What to measure after the fix",
        paragraphs: [
          "Don't just re-run PageSpeed Insights and declare victory. Install real-user monitoring (web-vitals.js or Cloudflare RUM), let it collect 1,000+ sessions, and look at the 75th percentile scores. That's what Google actually uses for ranking.",
          "If your p75 is under 2.5s LCP, under 0.1 CLS, and under 200ms INP, you're green across the board. Pair this with a proper [45-minute revenue audit](/blogs/revenue-audit-45-minutes) and you've closed both the technical and behavioral loops at the same time.",
        ],
      },
    ],
    faq: [
      {
        question: "How much does bad Core Web Vitals hurt SEO rankings?",
        answer:
          "For commercial-intent keywords on mobile, a red CWV page can lose 10–30% of its ranking potential vs. an equivalent green page. Over 90 days, that compounds significantly. For informational keywords, the impact is smaller but still real.",
      },
      {
        question: "What tool should I use to measure Core Web Vitals?",
        answer:
          "Start with PageSpeed Insights for a quick baseline, but always confirm with real-user monitoring (web-vitals.js, Cloudflare RUM, or Chrome UX Report). The real-user data is what Google uses for ranking — not the simulated lab data.",
      },
      {
        question: "Do Core Web Vitals matter for desktop as well?",
        answer:
          "Yes, but less aggressively. Google's ranking impact is heavier on mobile, where most of your traffic is anyway. Fix mobile first, verify desktop comes along for the ride.",
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

/**
 * Return the 3 most relevant posts for the given slug. Explicit
 * `relatedSlugs` win, then tag overlap, then category match, and finally
 * anything else. This gives us a clean, curated hub-and-spoke structure.
 */
export function getRelatedPosts(slug: string, count = 3): BlogPost[] {
  const current = getBlogPost(slug);
  if (!current) return BLOG_POSTS.slice(0, count);

  const explicit = current.relatedSlugs
    .map((s) => getBlogPost(s))
    .filter((p): p is BlogPost => !!p && p.slug !== slug);

  if (explicit.length >= count) return explicit.slice(0, count);

  const tagMatch = BLOG_POSTS.filter(
    (p) => p.slug !== slug && !explicit.find((e) => e.slug === p.slug)
  )
    .map((p) => ({
      p,
      score:
        p.tags.filter((t) => current.tags.includes(t)).length +
        (p.category === current.category ? 1.5 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .map((x) => x.p);

  return [...explicit, ...tagMatch].slice(0, count);
}

/** Ordered-list helpers for prev/next navigation on detail pages. */
export function getAdjacentPosts(slug: string): {
  prev: BlogPost | null;
  next: BlogPost | null;
} {
  const idx = BLOG_POSTS.findIndex((p) => p.slug === slug);
  if (idx < 0) return { prev: null, next: null };
  return {
    prev: idx > 0 ? BLOG_POSTS[idx - 1] : null,
    next: idx < BLOG_POSTS.length - 1 ? BLOG_POSTS[idx + 1] : null,
  };
}

export function slugifyHeading(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
