// src/app/in/[locale]/MenWeightLossClient.tsx
"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { ReviewsSection } from "@/components/reviews-section"
import { usePathname } from "next/navigation"
import { getCurrentLocale, getTranslation } from "@/lib/i18n"
import { ProductsSection } from "@/components/products-section"
import ProductCards from "@/components/product-card"
import { KnowMoreSection } from "@/components/KnowMoreSection"

export default function MenWeightLossClient() {
  const pathname = usePathname()
  const locale = getCurrentLocale(pathname || "/in/en")
  const t = getTranslation(locale)

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 py-14">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 text-balance">
            {t.weightLoss.genderSpecific.men.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed text-pretty">
            {t.weightLoss.genderSpecific.men.description}
          </p>
        </div>
      </header>

      <section className="py-14 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-10 text-gray-900">
            {t.weightLoss.productsSection.title}
          </h2>

          {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {c.map((product: any) => (
              <Card
                key={product.id}
                className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden"
              >
                <div className="relative h-44 p-4 flex items-center justify-center bg-gray-50">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={160}
                    height={160}
                    className="object-contain max-h-full"
                  />
                  <span
                    className={`absolute top-2 left-2 text-xs text-white font-semibold px-2 py-1 rounded ${product.badgeColor}`}
                  >
                    {product.badge}
                  </span>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-semibold text-gray-900">{product.name}</h3>
                    <div className="text-sm text-gray-500">{product.supply}</div>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl font-bold text-gray-900">{product.price}</span>
                    <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                    {product.total && (
                      <span className="text-sm font-semibold text-emerald-600">{product.total}</span>
                    )}
                  </div>

                  <div className="text-xs text-gray-600 mb-2">{product.shipping}</div>
                  <div className="text-xs text-gray-600 mb-2">{product.premiumPrice}</div>
                  <div className="text-xs text-emerald-600 mb-4">{product.discount}</div>

                  <Button
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                    onClick={() => window.open(product.link, "_blank")}
                  >
                    {t.weightLoss.common.buyNow || "Buy Now"}
                  </Button>

                  <div className="mt-4 text-xs text-gray-500">
                    {product.reviews.toLocaleString()}+ reviews • Rated {product.rating}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div> */}
          <ProductCards
            products={[
              ...(t.weightLoss.productsSection?.products || []),
               // if you have this key
            ].map(p => ({ ...p, id: String(p.id) }))}
            buyNowLabel={t.weightLoss.common.buyNow}
          />
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">
            {t.weightLoss.genderSpecific.men.title}
          </h2>
          <ProductsSection />
          <div className="grid md:grid-cols-3 gap-6">
            {t.weightLoss.genderSpecific.men.items.map((benefit: string, i: number) => (
              <div key={i} className="flex items-start gap-3 bg-white border rounded-lg p-5">
                <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5" />
                <p className="text-sm text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center gap-8 flex-wrap">
            {t.weightLoss.trustBadges.items.map((badge: any, index: number) => (
              <Image
                key={index}
                src={badge.image || "/placeholder.svg"}
                alt={badge.alt}
                width={80}
                height={80}
                className="opacity-80 hover:opacity-100 transition-opacity"
              />
            ))}
          </div>
        </div>
      </section>

      <ReviewsSection />
    </div>
  )
}