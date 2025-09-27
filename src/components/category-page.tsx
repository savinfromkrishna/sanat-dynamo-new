"use client"

import type React from "react"
import Image from "next/image"
import { useMemo } from "react"
import { categoriesContent, type CategoryKey, type CategoryContent } from "@/lib/category-content"
import CategoryReviewsSection from "@/components/category-reviews-section"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

type Props = {
  category: CategoryKey
  className?: string
  productsSlot?: React.ReactNode
}

export default function CategoryPage({ category, className, productsSlot }: Props) {
  const content: CategoryContent = useMemo(() => categoriesContent[category], [category])

  return (
    <section className={cn("w-full", className)}>
      {/* Hero */}
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h1 className="text-balance text-3xl font-semibold md:text-4xl">
              {content.hero?.heading || content.title}
            </h1>
            {content.subtitle && <p className="mt-3 text-muted-foreground">{content.subtitle}</p>}
            {content.hero?.subheading && <p className="mt-2 text-muted-foreground">{content.hero.subheading}</p>}
          </div>
          {content.hero?.image && (
            <div className="relative h-64 w-full md:h-80 lg:h-96">
              <Image
                src={content.hero.image || "/placeholder.svg"}
                alt={content.hero.imageAlt || content.title}
                fill
                className="object-contain"
                sizes="(min-width: 1024px) 600px, (min-width: 768px) 50vw, 100vw"
                priority
              />
            </div>
          )}
        </div>
      </div>

      {/* Best Products heading + list */}
      <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        <h2 className="text-2xl font-semibold md:text-3xl">{content.listHeading}</h2>
        <div className="mt-6">{productsSlot ?? <div className="text-muted-foreground"></div>}</div>
      </div>

      {/* Trust Badges */}
      {content.trustBadges?.length ? (
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="flex justify-center items-center gap-8 flex-wrap">
            {content.trustBadges.map((b, i) => (
              <Image
                key={i}
                src={b.image || "/placeholder.svg"}
                alt={b.alt}
                width={80}
                height={80}
                className="opacity-80 hover:opacity-100 transition-opacity"
              />
            ))}
          </div>
        </div>
      ) : null}

      {/* Gender Sections (optional) */}
      {content.gender ? (
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
          <div className="grid md:grid-cols-2 gap-12">
            {content.gender.women ? (
              <div>
                <h3 className="text-xl font-semibold mb-4">{content.gender.women.heading}</h3>
                <ul className="space-y-2">
                  {content.gender.women.bullets.map((it, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground">
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {content.gender.men ? (
              <div>
                <h3 className="text-xl font-semibold mb-4">{content.gender.men.heading}</h3>
                <ul className="space-y-2">
                  {content.gender.men.bullets.map((it, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground">
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {/* FAQs (optional) */}
      {content.faqs?.length ? (
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-12 bg-muted/30">
          <h3 className="text-2xl font-semibold text-center mb-6">FAQs</h3>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {content.faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      ) : null}

      {/* Why Consider (always above Reviews) */}
      <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        <h3 className="text-xl font-semibold md:text-2xl">{content.whyConsider.heading}</h3>
        <ul className="mt-4 grid gap-4 md:grid-cols-3">
          {content.whyConsider.bullets.map((b, i) => (
            <li key={i} className="rounded-lg border p-4">
              <div className="font-medium">{b.title}</div>
              <p className="mt-2 text-sm text-muted-foreground">{b.description}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Category Reviews as final section */}
      <div className="mx-auto max-w-6xl px-4 pb-12 md:pb-16">
        <CategoryReviewsSection category={content.slug} />
      </div>
    </section>
  )
}
