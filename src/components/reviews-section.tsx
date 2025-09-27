// src/components/reviews-section.tsx
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import { usePathname } from "next/navigation"
import { getCurrentLocale, getTranslation } from "@/lib/i18n"

const reviews = [
  {
    id: 1,
    name: "Sarah M.",
    location: "California, USA",
    rating: 5,
    text: "After just a few weeks of taking Mitolyn, I noticed a huge boost in my daily energy. I feel lighter, more focused, and the stubborn weight finally started coming off. Highly recommend this supplement!",
    verified: true,
  },
  {
    id: 2,
    name: "James R.",
    location: "Texas, USA",
    rating: 5,
    text: "I've tried countless supplements for weight loss, but nothing worked until Mitolyn. Not only did it help with fat loss, but I also feel sharper mentally. A real game-changer.",
    verified: true,
  },
  {
    id: 3,
    name: "Linda P.",
    location: "Florida, USA",
    rating: 5,
    text: "I was skeptical at first, but Mitolyn has exceeded my expectations. More energy, better mood, and I've already lost 12 pounds in 2 months. The best part—it feels natural.",
    verified: true,
  },
]

export function ReviewsSection() {
  const pathname = usePathname()
  const locale = getCurrentLocale(pathname || "/in/en")
  const t = getTranslation(locale)

  return (
    <section id="reviews" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-sans font-bold text-foreground mb-4">
            {t.weightLoss.reviews?.title || "What Our Customers Say"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.weightLoss.reviews?.subtitle || "Real feedback from customers who’ve transformed their lives with these supplements."}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <Card key={review.id} className="relative overflow-hidden hover:shadow-lg transition-all duration-300">
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
                      {t.weightLoss.reviews?.verifiedBuyer || "Verified Buyer"}
                    </span>
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