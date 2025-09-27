"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

export function ReviewsSection({ translations }: { translations: any }) {
  const t = translations?.reviews || {}

  // Fallback if reviews data is missing
  if (!t.reviews || !Array.isArray(t.reviews)) {
    console.error("ReviewsSection: No valid reviews data found in translations", t)
    return (
      <section id="reviews" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-muted-foreground">No se encontraron reseñas.</p>
        </div>
      </section>
    )
  }

  console.log("ReviewsSection translations:", t)

  return (
    <section id="reviews" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-sans font-bold text-foreground mb-4">
            {t.title || "Reseñas de Clientes"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.description || "Descubre lo que nuestros clientes dicen sobre MITOLYN."}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.reviews.map((review: any) => (
            <Card
              key={review.name + review.date} // Use a unique key
              className="relative overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="absolute top-4 right-4 text-primary/20">
                  <Quote className="h-8 w-8" />
                </div>

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

                <p className="text-muted-foreground mb-4 leading-relaxed">"{review.content}"</p>

                <div className="border-t pt-4">
                  <p className="font-sans font-semibold text-foreground">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{review.location}</p>
                  <p className="text-sm text-muted-foreground">{review.product}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}