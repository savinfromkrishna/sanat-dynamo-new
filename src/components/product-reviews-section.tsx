"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

export type ProductReview = {
  id: number
  name: string
  location: string
  rating: number
  text: string
  verified?: boolean
}

export function ProductReviewsSection({
  title = "What Customers Say",
  subtitle = "Real reviews from verified buyers",
  reviews = [],
}: {
  title?: string
  subtitle?: string
  reviews: ProductReview[]
}) {
  if (!reviews?.length) return null

  return (
    <section id="reviews" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-sans font-bold text-foreground mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <Card key={review.id} className="relative overflow-hidden hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="absolute top-4 right-4 text-primary/20">
                  <Quote className="h-8 w-8" />
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-yellow-400" aria-label={`${review.rating} star rating`}>
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  {review.verified && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Verified Buyer</span>
                  )}
                </div>

                <p className="text-muted-foreground mb-4 leading-relaxed">"{review.text}"</p>

                <div className="border-t pt-4">
                  <p className="font-sans font-semibold text-foreground">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{review.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
