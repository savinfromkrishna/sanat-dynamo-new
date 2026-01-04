// components/home/KnowMoreSection.tsx
"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, ChevronRight, Star } from "lucide-react"

interface Section {
  type: "text" | "list" | "stat" | "table" | "quote" | "faq" | "cta"
  heading?: string
  content?: string
  items?: string[]
  stats?: { value: string; label: string }[]
  table?: { headers: string[]; rows: string[][] }
  quote?: string
  author?: string
  rating?: number
  faqs?: { q: string; a: string }[]
  link?: { text: string; href: string }
  button?: { text: string; href: string }
}

interface KnowMoreData {
  title: string
  summary: string
  knowMore: string
  knowLess: string
  sections: Section[]
}

export function ProductknowMoreSection({ translations }: { translations: any }) {
  // ── SAFE FALLBACK ─────────────────────────────────────
  console.log("KnowMoreSection Translations:", translations)
  const t: KnowMoreData = translations?.productKnowMore ?? {
    title: "Learn More",
    summary: "Content is loading…",
    knowMore: "Know More",
    knowLess: "Show Less",
    sections: []
  }

  const [isExpanded, setIsExpanded] = useState(false)

  // ── SAFE FAQ CHECK ────────────────────────────────────
  const hasFaq = Array.isArray(t.sections) && t.sections.some(s => s.type === "faq")

  return (
    <>
      {/* FAQ Schema */}
      {hasFaq && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: t.sections
                .filter((s): s is { type: "faq"; faqs: { q: string; a: string }[] } => s.type === "faq")
                .flatMap(s => s.faqs!.map(faq => ({
                  "@type": "Question",
                  name: faq.q,
                  acceptedAnswer: { "@type": "Answer", text: faq.a }
                })))
            })
          }}
        />
      )}

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-sans font-bold text-center mb-6">
            {t.title}
          </h2>

          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              {t.summary}
            </p>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline focus:outline-none transition-colors"
              aria-expanded={isExpanded}
              aria-controls="know-more-content"
            >
              {isExpanded ? t.knowLess : t.knowMore}
              {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
          </div>

          {/* Expandable Content */}
          <div
            id="know-more-content"
            className={`mt-12 overflow-hidden transition-all duration-500 ease-in-out ${
              isExpanded ? "max-h-[10000px] opacity-100" : "max-h-0 opacity-0"
            }`}
            style={{ transition: "max-height 0.5s ease, opacity 0.3s ease" }}
          >
            <div className="max-w-4xl mx-auto space-y-16">
              {/* ← GUARD HERE */}
              {t.sections && Array.isArray(t.sections) && t.sections.map((section, idx) => (
                <div key={idx}>
                  {/* TEXT */}
                  {section.type === "text" && (
                    <article>
                      <h3 className="text-2xl font-bold mb-3">{section.heading}</h3>
                      <p className="text-muted-foreground mb-4">{section.content}</p>
                      {section.link && (
                        <a href={section.link.href} className="inline-flex items-center gap-1 text-primary hover:underline">
                          {section.link.text} <ChevronRight className="h-4 w-4" />
                        </a>
                      )}
                    </article>
                  )}

                  {/* LIST */}
                  {section.type === "list" && (
                    <article>
                      <h3 className="text-2xl font-bold mb-3">{section.heading}</h3>
                      <p className="text-muted-foreground mb-3">{section.content}</p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-4">
                        {section.items?.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                      {section.link && (
                        <a href={section.link.href} className="inline-flex items-center gap-1 text-primary hover:underline">
                          {section.link.text} <ChevronRight className="h-4 w-4" />
                        </a>
                      )}
                    </article>
                  )}

                  {/* STATS */}
                  {section.type === "stat" && section.stats && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                      {section.stats.map((stat, i) => (
                        <div key={i}>
                          <div className="text-4xl font-bold text-primary">{stat.value}</div>
                          <div className="text-muted-foreground">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* TABLE */}
                  {section.type === "table" && section.table && (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            {section.table.headers.map((h, i) => (
                              <th key={i} className="text-left py-2 font-semibold">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {section.table.rows.map((row, i) => (
                            <tr key={i} className="border-b">
                              {row.map((cell, j) => (
                                <td key={j} className="py-2">{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* QUOTE */}
                  {section.type === "quote" && (
                    <blockquote className="border-l-4 border-primary pl-6 italic text-lg">
                      <p className="mb-2">"{section.quote}"</p>
                      <footer className="text-sm font-medium">
                        — {section.author}
                        {section.rating && (
                          <span className="ml-2 inline-flex">
                            {[...Array(section.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </span>
                        )}
                      </footer>
                    </blockquote>
                  )}

                  {/* FAQ */}
                  {section.type === "faq" && section.faqs && (
                    <article>
                      <h3 className="text-2xl font-bold mb-6">{section.heading}</h3>
                      <div className="space-y-6">
                        {section.faqs.map((faq, i) => (
                          <details key={i} className="group">
                            <summary className="font-medium cursor-pointer list-none flex justify-between items-center">
                              {faq.q}
                              <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                            </summary>
                            <p className="mt-2 text-muted-foreground pl-6">{faq.a}</p>
                          </details>
                        ))}
                      </div>
                    </article>
                  )}

                  {/* CTA */}
                  {/* {section.type === "cta" && (
                    <div className="text-center bg-primary/5 rounded-xl p-8">
                      <h3 className="text-2xl font-bold mb-3">{section.heading}</h3>
                      <p className="text-muted-foreground mb-6">{section.content}</p>
                      {section.button && (
                        <a
                          href={section.button.href}
                          className="inline-block bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition"
                        >
                          {section.button.text}
                        </a>
                      )}
                    </div>
                  )} */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}