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
  date?: string
  rating: number
  verified?: boolean
  content: string
  location: string
  product: string
}

/* --------------------------------------------------------------- */
/* 2. Helper to map product by ID (based on provided data structure) */
/* --------------------------------------------------------------- */
const getProductById = (id: number): string => {
  if (id >= 1 && id <= 3) return "MITOLYN"
  if (id >= 4 && id <= 6) return "PRODENTIM"
  if (id >= 7 && id <= 9) return "Sleep Lean"
  if (id >= 10 && id <= 12) return "BellyFlush"
  return "Our Supplements"
}

/* --------------------------------------------------------------- */
/* 3. Component                                                    */
/* --------------------------------------------------------------- */
export function ReviewsSection({ translations }: { translations: any }) {
  const t = translations?.reviews || {}

  /* ----------------------------------------------------------------- */
  /* Guard – no reviews → fallback UI                                 */
  /* ----------------------------------------------------------------- */
  if (!t.reviews || !Array.isArray(t.reviews) || t.reviews.length === 0) {
    console.error("ReviewsSection: No valid reviews data", t)
    return (
      <section id="reviews" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-muted-foreground">
            No reviews found.
          </p>
        </div>
      </section>
    )
  }

  /* Map raw data to Review interface */
  const reviews: Review[] = t.reviews.map((rawReview: any) => ({
    name: rawReview.name,
    rating: rawReview.rating,
    verified: rawReview.verified ?? false,
    content: rawReview.text,
    location: rawReview.location,
    product: getProductById(rawReview.id),
  }))

  /* ----------------------------------------------------------------- */
  /* Embla Carousel setup                                             */
  /* ----------------------------------------------------------------- */
  const autoplayOptions = { delay: 6000, stopOnInteraction: true }
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      containScroll: "trimSnaps",
      slidesToScroll: 1,
      breakpoints: {
        "(min-width: 640px)": { slidesToScroll: 2 },
        "(min-width: 1024px)": { slidesToScroll: 3 }
      }
    },
    [Autoplay(autoplayOptions)]
  )

  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()

  /* Sync selected index with Embla */
  const onSelect = () => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }

  /* Fixed useEffect – return cleanup directly */
  useEffect(() => {
    if (!emblaApi) return

    onSelect()
    emblaApi.on("select", onSelect)

    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi])

  /* ----------------------------------------------------------------- */
  /* Render                                                           */
  /* ----------------------------------------------------------------- */
  return (
    <section id="reviews" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title + subtitle */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-sans font-bold text-foreground mb-4">
            {t.title || "What Our Customers Say"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle || "Real stories from real people who transformed their lives with our supplements."}
          </p>
        </div>

        {/* Embla Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex items-stretch gap-4">
              {reviews.map((review, index) => (
                <div
                  key={`${review.name}-${index}`} // Simplified key since no date
                  className="flex-none w-full sm:w-1/2 lg:w-1/3"
                >
                  <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
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
                            {t.verifiedBuyer || "Verified Buyer"}
                          </span>
                        )}
                      </div>

                      {/* Review text */}
                      <p className="text-muted-foreground mb-4 leading-relaxed italic">
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
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background rounded-full p-2 shadow-md transition-colors z-10"
            aria-label="Previous review"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background rounded-full p-2 shadow-md transition-colors z-10"
            aria-label="Next review"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => emblaApi?.scrollTo(idx)}
                className={`h-2 w-2 rounded-full transition-colors ${idx === selectedIndex ? "bg-primary" : "bg-muted"
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