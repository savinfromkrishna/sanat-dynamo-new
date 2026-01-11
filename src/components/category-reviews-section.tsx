
"use client"

import React, { useEffect, useState, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "./ui/card"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"

/* --------------------------------------------------------------- */
/* Review Interface                                                */
/* --------------------------------------------------------------- */
interface Review {
  name: string
  location: string
  rating: number
  date?: string
  title?: string
  content: string
  verified?: boolean
  product?: string
}

/* --------------------------------------------------------------- */
/* Map slug → translation key & product names for filtering       */
/* --------------------------------------------------------------- */
const categoryConfig: Record<string, {
  translationKey: string
  allowedProducts: string[]
}> = {
  "weight-loss-supplements": {
    translationKey: "weightLoss",
    allowedProducts: [
      "MITOLYN Basic Package",
      "MITOLYN Popular Package",
      "MITOLYN Best Value Package",
      "Sleep Lean Basic Package",
      "BellyFlush Basic Package",
    ]
  },
  "dental-health-supplements": {
    translationKey: "weightLoss", // In the user's JSON, both are under weightLoss.reviews
    allowedProducts: [
      "PRODENTIM - Basic Package",
      "PRODENTIM - Duo Package",
      "PRODENTIM - Popular",
    ]
  },
}

/* --------------------------------------------------------------- */
/* Main Component                                                  */
/* --------------------------------------------------------------- */
export default function CategoryReviewsSection({
  category,
  translations,
}: {
  category: string
  translations: any
}) {
  const config = categoryConfig[category]

  if (!config) {
    return (
      <section id="reviews" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center text-gray-500">
          No reviews section configured for this category yet.
        </div>
      </section>
    )
  }

  // Get reviews from correct place in translations
  const categoryReviews = translations?.[config.translationKey]?.reviews

  if (!categoryReviews?.items || !Array.isArray(categoryReviews.items)) {
    return (
      <section id="reviews" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center text-gray-500">
          No customer reviews available.
        </div>
      </section>
    )
  }

  // Filter reviews by allowed products to ensure correct category items are shown
  const filteredReviews: Review[] = categoryReviews.items.filter((review: Review) =>
    !review.product || config.allowedProducts.includes(review.product)
  )

  if (filteredReviews.length === 0) {
    return null
  }

  // ── Carousel setup ──────────────────────────────────────────────
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: "start", 
      skipSnaps: false,
      containScroll: "trimSnaps" 
    },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  )

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  // Fix: Define scrollPrev function for carousel navigation
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  // Fix: Define scrollNext function for carousel navigation
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
    onSelect()
    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <section id="reviews" className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-gray-900 capitalize">
            {category.replace(/-/g, ' ')} Reviews
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {categoryReviews.description}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto">
          <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex -ml-4">
              {filteredReviews.map((review, index) => (
                <div
                  key={`${review.name}-${index}`}
                  className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-4"
                >
                  <Card className="h-full border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 bg-white">
                    <CardContent className="p-6 md:p-8 relative h-full flex flex-col">
                      <Quote className="absolute top-6 right-6 h-12 w-12 text-blue-500/5 pointer-events-none" />

                      {/* Stars + Verified */}
                      <div className="flex flex-wrap items-center gap-3 mb-6">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(review.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                        {review.verified && (
                          <span className="text-[10px] uppercase tracking-widest font-bold bg-green-50 text-green-700 border border-green-100 px-2.5 py-1 rounded">
                            Verified
                          </span>
                        )}
                      </div>

                      {/* Review content */}
                      <div className="flex-grow">
                        {review.title && (
                          <h3 className="text-lg font-bold mb-3 text-gray-900 line-clamp-2">
                            {review.title}
                          </h3>
                        )}
                        <p className="text-gray-600 leading-relaxed mb-6 text-sm md:text-base">
                          "{review.content}"
                        </p>
                      </div>

                      {/* Author info */}
                      <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{review.name}</p>
                          <p className="text-[11px] text-gray-400 mt-0.5">{review.location}</p>
                        </div>
                        <div className="text-right">
                           <p className="text-[10px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full inline-block">
                             {review.date}
                           </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="hidden md:block">
            <button
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 lg:-translate-x-10 bg-white hover:bg-blue-600 hover:text-white text-gray-400 shadow-xl rounded-full p-4 transition-all z-10 border border-gray-100 active:scale-95"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 lg:translate-x-10 bg-white hover:bg-blue-600 hover:text-white text-gray-400 shadow-xl rounded-full p-4 transition-all z-10 border border-gray-100 active:scale-95"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-12">
            {scrollSnaps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => emblaApi?.scrollTo(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === selectedIndex
                    ? "bg-blue-600 w-8"
                    : "bg-gray-200 w-3 hover:bg-gray-300"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
