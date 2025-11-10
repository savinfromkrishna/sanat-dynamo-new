// components/category-reviews-section.tsx
"use client"

import { useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"

/* --------------------------------------------------------------- */
/* 1. Review type                                                  */
/* --------------------------------------------------------------- */
interface Review {
  name: string
  rating: number
  verified?: boolean
  content: string
  location: string
  product: string
}

/* --------------------------------------------------------------- */
/* 2. Component                                                    */
/* --------------------------------------------------------------- */
export default function CategoryReviewsSection({ category, translations }: { category: string; translations: any }) {
  const t = translations?.reviews || {}

  /* ----------------------------------------------------------------- */
  /* Filter reviews by category                                        */
  /* ----------------------------------------------------------------- */
  const filteredReviews: Review[] = (t.reviews || []).filter((review: any) =>
    category === "weight-loss-supplements"
      ? ["MITOLYN Basic Package", "MITOLYN Popular Package", "MITOLYN Best Value Package"].includes(review.product)
      : category === "energy-supplements"
      ? ["ENERGYMAX Power Boost", "ENERGYMAX Endurance Pack", "ENERGYMAX Ultimate Bundle"].includes(review.product)
      : false
  )

  /* ----------------------------------------------------------------- */
  /* Guard – no reviews → fallback UI                                 */
  /* ----------------------------------------------------------------- */
  if (filteredReviews.length === 0) {
    return (
      <section id="reviews" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-muted-foreground">
            No se encontraron reseñas para esta categoría.
          </p>
        </div>
      </section>
    )
  }

  /* ----------------------------------------------------------------- */
  /* Embla Carousel setup                                               */
  /* ----------------------------------------------------------------- */
  const autoplayOptions = { delay: 6000, stopOnInteraction: true }
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay(autoplayOptions)]
  )

  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()

  const onSelect = () => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    return () => {
      // ensure cleanup returns void
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi])

  /* ----------------------------------------------------------------- */
  /* Render                                                             */
  /* ----------------------------------------------------------------- */
  return (
    <section id="reviews" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title + description */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-sans font-bold text-foreground mb-4">
            {t.title || "Reseñas de Clientes"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.description || `Descubre lo que dicen los clientes sobre ${category === "weight-loss-supplements" ? "MITOLYN" : "ENERGYMAX"}.`}
          </p>
        </div>

        {/* Embla Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {filteredReviews.map((review, index) => (
                <div
                  key={`${review.name}-${review.product}-${index}`}
                  className="flex-none w-full px-4 md:px-0"
                >
                  <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300 max-w-2xl mx-auto">
                    <CardContent className="p-6">
                      {/* Quote icon */}
                      <div className="absolute top-4 right-4 text-primary/20">
                        <Quote className="h-8 w-8" />
                      </div>

                      {/* Rating + verified */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex text-yellow-400">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current" />
                          ))}
                        </div>
                        {review.verified && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                            {t.verifiedBuyer || "Comprador Verificado"}
                          </span>
                        )}
                      </div>

                      {/* Review text */}
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        "{review.content}"
                      </p>

                      {/* Author */}
                      <div className="border-t pt-4">
                        <p className="font-sans font-semibold text-foreground">
                          {review.name}
                        </p>
                        <p className="text-sm text-muted-foreground">{review.location}</p>
                        <p className="text-sm text-muted-foreground">{review.product}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={scrollPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background rounded-full p-2 shadow-md transition-colors"
            aria-label="Previous review"
          >
            <ChevronLeft className="h-5 w-5" />
 

          </button>
          <button
            onClick={scrollNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background rounded-full p-2 shadow-md transition-colors"
            aria-label="Next review"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {filteredReviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => emblaApi?.scrollTo(idx)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  idx === selectedIndex ? "bg-primary" : "bg-muted"
                }`}
                aria-label={`Go to review ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}