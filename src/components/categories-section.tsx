"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Star, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useState, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { usePathname } from "next/navigation"
import { getCurrentLocale, getTranslation } from "@/lib/i18n"

const categories = [
  {
    icon: Heart,
    title: "Weight Loss Supplements",
    description: "Premium natural supplements scientifically formulated for optimal weight loss results",
    count: "3 Products",
    slug: "weight-loss-supplements",
    products: [
      {
        name: "MITOLYN Basic Package",
        price: "$59",
        originalPrice: "₹2,999",
        discount: "16% off",
        image: "https://res.cloudinary.com/ddywjrr08/image/upload/v1758422485/mitolyn-bottle_dj1mxc.webp",
        supply: "30 Days Supply",
        link: "https://supplelogic.com/basic-package",
        rating: 4.8,
        reviews: 2847,
        premiumPrice: "₹2,424",
        id: 1,
      },
      {
        name: "MITOLYN Best Value Package",
        price: "₹6,899",
        originalPrice: "₹8,099",
        discount: "14% off",
        image: "https://res.cloudinary.com/ddywjrr08/image/upload/v1758422492/mitolyn-offer_azyjj3.png",
        supply: "180 Days Supply",
        link: "https://supplelogic.com/best-value",
        rating: 4.9,
        reviews: 5632,
        premiumPrice: "₹6,692",
        id: 2,
      },
      {
        name: "MITOLYN Popular Package",
        price: "₹4,449",
        originalPrice: "₹5,999",
        discount: "25% off",
        image: "https://res.cloudinary.com/ddywjrr08/image/upload/v1758422485/mitolyn-3-bottles_jtgdh8.png",
        supply: "90 Days Supply",
        link: "https://supplelogic.com/popular",
        rating: 4.7,
        reviews: 3921,
        premiumPrice: "₹4,336",
        id: 3,
      },
    ],
  },
  // {
  //   icon: Heart,
  //   title: "Energy Supplements",
  //   description: "Natural energy boosters and performance enhancers for active lifestyle and daily vitality",
  //   count: "3 Products",
  //   slug: "energy-supplements",
  //   products: [
  //     {
  //       name: "ENERGYMAX Power Boost",
  //       price: "₹1,899",
  //       originalPrice: "₹2,299",
  //       discount: "17% off",
  //       image: "https://res.cloudinary.com/ddywjrr08/image/upload/v1758422485/mitolyn-bottle_dj1mxc.webp",
  //       supply: "30 Days Supply",
  //       link: "https://supplelogic.com/energy-boost",
  //       rating: 4.6,
  //       reviews: 1847,
  //       premiumPrice: "₹1,799",
  //       id: 4,
  //     },
  //     {
  //       name: "ENERGYMAX Endurance Pack",
  //       price: "₹5,499",
  //       originalPrice: "₹6,999",
  //       discount: "21% off",
  //       image: "https://res.cloudinary.com/ddywjrr08/image/upload/v1758422485/mitolyn-3-bottles_jtgdh8.png",
  //       supply: "90 Days Supply",
  //       link: "https://supplelogic.com/endurance-pack",
  //       rating: 4.8,
  //       reviews: 2934,
  //       premiumPrice: "₹5,299",
  //       id: 5,
  //     },
  //     {
  //       name: "ENERGYMAX Ultimate Bundle",
  //       price: "₹8,999",
  //       originalPrice: "₹11,999",
  //       discount: "25% off",
  //       image: "https://res.cloudinary.com/ddywjrr08/image/upload/v1758422492/mitolyn-offer_azyjj3.png",
  //       supply: "180 Days Supply",
  //       link: "https://supplelogic.com/ultimate-bundle",
  //       rating: 4.9,
  //       reviews: 4521,
  //       premiumPrice: "₹8,699",
  //       id: 6,
  //     },
  //   ],
  // },
]

export function CategoriesSection({ showAddToCart = true }: { showAddToCart?: boolean }) {
  const pathname = usePathname()
  const locale = getCurrentLocale(pathname || "/")
  const t = getTranslation(locale)
  const [favorites, setFavorites] = useState<number[]>([])
  const [emblaRef1, emblaApi1] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    breakpoints: {
      "(min-width: 768px)": { active: false },
    },
  })
  const [emblaRef2, emblaApi2] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    breakpoints: {
      "(min-width: 768px)": { active: false },
    },
  })

  const scrollPrev1 = useCallback(() => emblaApi1 && emblaApi1.scrollPrev(), [emblaApi1])
  const scrollNext1 = useCallback(() => emblaApi1 && emblaApi1.scrollNext(), [emblaApi1])
  const scrollPrev2 = useCallback(() => emblaApi2 && emblaApi2.scrollPrev(), [emblaApi2])
  const scrollNext2 = useCallback(() => emblaApi2 && emblaApi2.scrollNext(), [emblaApi2])

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const handleProductClick = (productId: number) => {
    window.location.href = "/weight-loss-supplements"
  }

  return (
    <section id="products" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {categories.map((category, categoryIndex) => {
          const emblaRef = categoryIndex === 0 ? emblaRef1 : emblaRef2
          const scrollPrev = categoryIndex === 0 ? scrollPrev1 : scrollPrev2
          const scrollNext = categoryIndex === 0 ? scrollNext1 : scrollNext2

          const titleMap: Record<string, string> = {
            "Weight Loss Supplements": t.categories.weightLoss,
            "Energy Supplements": t.categories.energy,
          }
          const descMap: Record<string, string> = {
            "Premium natural supplements scientifically formulated for optimal weight loss results":
              "en" === locale
                ? "Premium natural supplements scientifically formulated for optimal weight loss results"
                : "Suplementos naturales premium científicamente formulados para obtener resultados óptimos en la pérdida de peso",
            "Natural energy boosters and performance enhancers for active lifestyle and daily vitality":
              "en" === locale
                ? "Natural energy boosters and performance enhancers for active lifestyle and daily vitality"
                : "Aumentadores de energía naturales y potenciadores del rendimiento para un estilo de vida activo y vitalidad diaria",
          }

          return (
            <div key={category.slug} className={categoryIndex > 0 ? "mt-16" : ""}>
              <div className="text-center mb-12">
                <h2 className="text-2xl font-medium text-gray-800 mb-2">
                  {titleMap[category.title] || category.title}
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {descMap[category.description] || category.description}
                </p>
              </div>

              <div className="relative max-w-6xl mx-auto">
                <Button
                  variant="outline"
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg md:hidden"
                  onClick={scrollPrev}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg md:hidden"
                  onClick={scrollNext}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>

                <div className="overflow-hidden" ref={emblaRef}>
                  <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6">
                    {category.products.map((product) => (
                      <div key={product.id} className="flex-[0_0_280px] md:flex-none mr-4 md:mr-0">
                        <Card
                          className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden w-full max-w-xs mx-auto cursor-pointer h-full"
                          onClick={() => handleProductClick(product.id)}
                        >
                          <div className="relative">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleFavorite(product.id)
                              }}
                              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 hover:bg-white transition-colors duration-200 shadow-sm"
                            >
                              <Heart
                                className={`w-4 h-4 ${favorites.includes(product.id)
                                    ? "text-red-500 fill-current"
                                    : "text-gray-400 hover:text-red-400"
                                  }`}
                              />
                            </button>

                            <div className="h-40 p-3 flex items-center justify-center bg-gray-50">
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                width={120}
                                height={140}
                                className="object-contain max-h-full"
                              />
                            </div>
                          </div>

                          <CardContent className="p-3 h-60 flex flex-col">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex items-center gap-1 bg-teal-50 px-2 py-1 rounded-md">
                                <span className="text-sm font-semibold text-teal-700">{product.rating}</span>
                                <Star className="w-3 h-3 text-teal-500 fill-current" />
                              </div>
                              <span className="text-xs text-gray-600">{product.reviews.toLocaleString()} reviews</span>
                            </div>

                            <h3 className="text-sm font-semibold text-gray-900 mb-2 leading-tight h-10 flex items-start">
                              {product.name}
                            </h3>

                            <div className="mb-3 flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-lg font-bold text-gray-900">{product.price}</span>
                                <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                                  {product.discount}
                                </span>
                              </div>

                              {/* <div className="flex items-center gap-1 text-xs text-orange-600 mb-2">
                                <Star className="w-3 h-3 text-orange-500 fill-current" />
                                <span className="font-medium">
                                  {product.premiumPrice} {t.common.premiumMemberSuffix}
                                </span>
                              </div> */}

                              <div className="text-xs text-gray-600 font-medium">{product.supply}</div>
                            </div>

                            <div className="space-y-1.5 mt-auto">
                              {showAddToCart && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full h-8 border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300 bg-transparent text-sm font-medium"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    window.open(product.link, "_blank")
                                  }}
                                >
                                  <ShoppingCart className="w-4 h-4 mr-2" />
                                  {t.common.addToCart}
                                </Button>
                              )}
                              <Button
                                size="sm"
                                className="w-full h-8 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  window.open(product.link, "_blank")
                                }}
                              >
                                {t.common.buyNow}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
