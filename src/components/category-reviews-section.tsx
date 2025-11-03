// components/category-reviews-section.tsx
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export default function CategoryReviewsSection({ category, translations }: { category: string; translations: any }) {
  const t = translations.reviews
  const reviews = t.reviews.filter((review: any) =>
    category === "weight-loss-supplements"
      ? ["MITOLYN Basic Package", "MITOLYN Popular Package", "MITOLYN Best Value Package"].includes(review.product)
      : category === "energy-supplements"
      ? ["ENERGYMAX Power Boost", "ENERGYMAX Endurance Pack", "ENERGYMAX Ultimate Bundle"].includes(review.product)
      : false
  )

  return (
    <div className="grid p-10 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {reviews.map((review: any) => (
        <Card key={review.name} className="relative overflow-hidden hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-400">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              {review.verified && (
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                  {translations.reviews.verifiedBuyer || "Verified Buyer"}
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
  )
}