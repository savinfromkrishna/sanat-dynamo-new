"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, ExternalLink } from "lucide-react"
import { usePathname } from "next/navigation"
import { getCurrentLocale, getTranslation } from "@/lib/i18n"

const featuredProducts = [
  {
    id: 1,
    name: "Mitolyn - Basic Package",
    price: "$49",
    originalPrice: "$197",
    image: "https://res.cloudinary.com/ddywjrr08/image/upload/v1758422485/mitolyn-bottle_dj1mxc.webp",
    rating: 4.8,
    reviews: 2847,
    badge: "BASIC - 1 BOTTLE",
    badgeColor: "bg-gradient-to-r from-teal-500 to-teal-600",
    supply: "30 Days Supply",
    affiliateUrl: "https://sanat-rewa.vercel.app/basic-package",
  },
  {
    id: 2,
    name: "Mitolyn - Best Value Package",
    price: "$39",
    originalPrice: "$1182",
    totalPrice: "$234",
    image: "https://res.cloudinary.com/ddywjrr08/image/upload/v1758422492/mitolyn-offer_azyjj3.png",
    rating: 4.9,
    reviews: 5632,
    badge: "BEST VALUE - 6 BOTTLES",
    badgeColor: "bg-gradient-to-r from-red-500 to-red-600",
    supply: "180 Days Supply",
    affiliateUrl: "https://sanat-rewa.vercel.app/best-value-package",
    featured: true,
  },
  {
    id: 3,
    name: "Mitolyn - Popular Package",
    price: "$59",
    originalPrice: "$591",
    totalPrice: "$177",
    image: "https://res.cloudinary.com/ddywjrr08/image/upload/v1758422485/mitolyn-3-bottles_jtgdh8.png",
    rating: 4.7,
    reviews: 3921,
    badge: "POPULAR - 3 BOTTLES",
    badgeColor: "bg-gradient-to-r from-teal-600 to-teal-700",
    supply: "90 Days Supply",
    affiliateUrl: "https://sanat-rewa.vercel.app/popular-package",
  },
]

export function FeaturedProductsSection() {
  const pathname = usePathname()
  const locale = getCurrentLocale(pathname || "/")
  const t = getTranslation(locale)

  return (
    <section className="py-16 bg-gradient-to-b from-emerald-50/50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.featured.title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.featured.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              className={`relative overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md h-[450px] flex flex-col ${
                product.featured ? "ring-2 ring-red-500/50" : ""
              }`}
            >
              <div className="relative bg-gradient-to-b from-gray-50 to-white h-[160px] flex-shrink-0">
                <Badge
                  className={`absolute top-3 right-3 text-white font-bold px-2 py-1 text-xs shadow-lg ${product.badgeColor}`}
                >
                  {product.badge}
                </Badge>
                <div className="p-4 text-center h-full flex items-center justify-center">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-[120px] object-contain mx-auto"
                  />
                </div>
              </div>

              <CardContent className="p-3 flex-grow flex flex-col">
                <div className="text-center flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{product.supply}</h3>

                    <div className="flex items-center justify-center gap-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {product.rating} ({product.reviews.toLocaleString()})
                      </span>
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-2xl font-bold text-emerald-600">{product.price}</span>
                        <span className="text-sm text-gray-500">{t.common.perBottleSuffix}</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-sm line-through text-gray-400">{product.originalPrice}</span>
                        <span className="text-lg font-bold text-emerald-600">
                          {product.totalPrice || product.price}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => window.open(product.affiliateUrl, "_blank")}
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg mt-auto"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {t.featured.orderNow}
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            onClick={() => window.open("/weight-loss-supplements", "_self")}
            className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-3 font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          >
            {t.common.viewAllWeightLoss}
          </Button>
        </div>
      </div>
    </section>
  )
}
