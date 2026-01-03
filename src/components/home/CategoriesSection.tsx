"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Star, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useState, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Link from "next/link"

type CategoryType = {
  category: string
  items: any[]
}

type CategoriesSectionProps = {
  translations: any // Full JSON data
  locale: string
  country: string
  categoryFilter?: "weightLoss" | "energy" | "oralProbiotics" | "bellyFat" | null
}

export function CategoriesSection({
  translations,
  locale,
  country,
  categoryFilter = null,
}: CategoriesSectionProps) {
  const t = translations
  const [favorites, setFavorites] = useState<number[]>([])

  // Mapping: filter key → actual category name
  const filterToCategoryName: Record<
    NonNullable<CategoriesSectionProps["categoryFilter"]>,
    string
  > = {
    weightLoss: "Weight Loss Supplements",
    energy: "Energy Supplements",
    oralProbiotics: "Oral Health Supplements",
    bellyFat: "Belly Fat Supplements",
  }

  // Mapping: category name → translation key (used in t.categories)
  const categoryToTranslationKey: Record<string, string> = {
    "Weight Loss Supplements": "weightLoss",
    "Energy Supplements": "energy",
    "Oral Health Supplements": "oralProbiotics",
    "Belly Fat Supplements": "bellyFat",
  }

  // Mapping: filter key → URL slug
  const filterToSlug: Record<
    NonNullable<CategoriesSectionProps["categoryFilter"]>,
    string
  > = {
    weightLoss: "weight-loss-supplements",
    energy: "energy-supplements",
    oralProbiotics: "dental-health-supplements",
    bellyFat: "belly-fat-supplements",
  }

  // Start with all products
  let visibleCategories: CategoryType[] = t.categories?.products || []

  // If filtering by category, narrow it down
  if (categoryFilter && filterToCategoryName[categoryFilter]) {
    const targetCategory = filterToCategoryName[categoryFilter]
    visibleCategories = visibleCategories.filter(
      (cat: CategoryType) => cat.category === targetCategory
    )
  }

  // Create one Embla carousel per visible category
  const emblaConfigs = visibleCategories.map(() =>
    useEmblaCarousel({
      align: "start",
      containScroll: "trimSnaps",
      breakpoints: { "(min-width: 768px)": { active: false } },
    })
  )

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    )
  }

  return (
    <section id="products" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {visibleCategories.map((category: CategoryType, categoryIndex: number) => {
          const [emblaRef, emblaApi] = emblaConfigs[categoryIndex]

          const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
          const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

          // Get the correct translation key for this category
          const translationKey =
            categoryToTranslationKey[category.category] || "weightLoss"

          // Fetch title and description directly from t.categories
          const title = t.categories?.[translationKey] || category.category
          const description =
            t.categories?.[`${translationKey}Description`] ||
            "Discover premium natural supplements designed to support your wellness goals."

          // Determine the slug for product links
          const currentCategorySlug = categoryFilter
            ? filterToSlug[categoryFilter]
            : filterToSlug[
                Object.entries(filterToCategoryName).find(
                  ([_, name]) => name === category.category
                )?.[0] as keyof typeof filterToSlug
              ] || "weight-loss-supplements"

          return (
            <div
              key={category.category}
              className={categoryIndex > 0 ? "mt-16" : ""}
            >
              {/* Category Title & Description */}
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {title}
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  {description}
                </p>
              </div>

              {/* Carousel */}
              <div className="relative max-w-7xl mx-auto">
                {/* Mobile Prev/Next Buttons */}
                <Button
                  variant="outline"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg md:hidden"
                  onClick={scrollPrev}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg md:hidden"
                  onClick={scrollNext}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>

                <div className="overflow-hidden" ref={emblaRef}>
                  <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.items.map((product: any) => (
                      <div
                        key={product.id || product.slug}
                        className="flex-[0_0_290px] md:flex-none pr-4 md:pr-0"
                      >
                        <Link
                          href={`/${country}/${locale}/${product.categorySlug || currentCategorySlug}/${product.slug}`}
                        >
                          <Card className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full border border-gray-100">
                            <div className="relative">
                              {/* Favorite Heart */}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  toggleFavorite(product.id || product.slug)
                                }}
                                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 hover:bg-white shadow-md transition"
                              >
                                <Heart
                                  className={`w-5 h-5 transition-colors ${
                                    favorites.includes(product.id || product.slug)
                                      ? "text-red-500 fill-red-500"
                                      : "text-gray-600"
                                  }`}
                                />
                              </button>

                              {/* Product Image */}
                              <div className="h-48 bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-6">
                                <Image
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  width={160}
                                  height={180}
                                  className="object-contain max-h-full drop-shadow-md"
                                />
                              </div>
                            </div>

                            <CardContent className="p-5 flex flex-col flex-grow">
                              {/* Rating & Reviews */}
                              <div className="flex items-center gap-3 mb-3">
                                <div className="flex items-center gap-1 bg-teal-50 px-3 py-1.5 rounded-lg">
                                  <Star className="w-4 h-4 text-teal-600 fill-current" />
                                  <span className="text-sm font-bold text-teal-800">
                                    {product.rating}
                                  </span>
                                </div>
                                <span className="text-sm text-gray-600">
                                  {product.reviews?.toLocaleString()} reviews
                                </span>
                              </div>

                              {/* Product Name */}
                              <h3 className="font-semibold text-gray-900 mb-4 line-clamp-2">
                                {product.name}
                              </h3>

                              {/* Pricing & CTA */}
                              <div className="mt-auto space-y-3">
                                <div className="flex items-center gap-3">
                                  <span className="text-2xl font-bold text-gray-900">
                                    {product.price}
                                  </span>
                                  {product.originalPrice && (
                                    <span className="text-sm text-gray-500 line-through">
                                      {product.originalPrice}
                                    </span>
                                  )}
                                  {product.discount && (
                                    <span className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                      {product.discount}
                                    </span>
                                  )}
                                </div>

                                {product.premiumPrice && (
                                  <p className="text-sm text-orange-600 font-medium">
                                    <Star className="w-4 h-4 inline fill-current" />{" "}
                                    {product.premiumPrice}{" "}
                                    {t.common?.premiumMemberSuffix || "for Premium Members"}
                                  </p>
                                )}

                                <p className="text-sm text-gray-600">
                                  {product.supply}
                                </p>

                                <Button
                                  size="lg"
                                  className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    window.open(product.link, "_blank")
                                  }}
                                >
                                  {product.buyNow || t.common?.buyNow || "Buy Now"}
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
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