"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Star,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Shield,
  Award,
  Truck,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Heart,
  Share2,
  MapPin,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { ProductDetail } from "./product-data"
import type { Locale } from "@/lib/i18n"

interface ProductDetailPageClientProps {
  product: ProductDetail
  translations: any
  locale: Locale
  country: string
  categoryKey: string
  slug: string
  relatedProducts: any[]
  id?: string;
}

export default function ProductDetailPageClient({
  product,
  locale,
  categoryKey,
  country,
  slug,
  relatedProducts,
  id
}: ProductDetailPageClientProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedTab, setSelectedTab] = useState<"benefits" | "ingredients" | "howToUse">("benefits")
  const [isKnowMoreExpanded, setIsKnowMoreExpanded] = useState(false)
  console.log("my slug", slug)
  const filteredRelatedProducts = relatedProducts.filter(
    (relatedProduct) => relatedProduct.slug !== id
  )
  console.log("my id", filteredRelatedProducts)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.gallery.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.gallery.length) % product.gallery.length)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
          <div className="grid lg:grid-cols-[45%_55%] gap-0">
            {/* Left Side - Image Gallery */}
            <div className="p-3 md:p-4 lg:p-6 bg-white border-r border-border">
              {/* Main Image with Zoom */}
              <div className="sticky top-4">
                <div className="relative w-full aspect-square max-w-[500px] mx-auto bg-white rounded-lg overflow-hidden mb-3 border border-border/50 group">
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src={product.gallery[currentImageIndex] || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 500px"
                      className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-125"
                      priority
                      quality={90}
                    />
                  </div>

                  {/* Wishlist & Share Icons */}
                  <div className="absolute top-2 right-2 flex gap-2 z-10">
                    <button className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full hover:bg-white shadow-sm transition-all">
                      <Heart className="w-3.5 h-3.5" />
                    </button>
                    <button className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full hover:bg-white shadow-sm transition-all">
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Navigation Arrows */}
                  {product.gallery.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-1.5 rounded-full hover:bg-white transition-all shadow-sm z-10"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-1.5 rounded-full hover:bg-white transition-all shadow-sm z-10"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {product.gallery.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {product.gallery.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`relative flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-md overflow-hidden border-2 transition-all ${idx === currentImageIndex ? "border-primary" : "border-border hover:border-primary/50"
                          }`}
                      >
                        <Image
                          src={img || "/placeholder.svg"}
                          alt={`View ${idx + 1}`}
                          fill
                          sizes="64px"
                          className="object-contain p-1"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {/* <Button variant="outline" className="w-full">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button> */}
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white" asChild>
                    <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer">
                      Buy Now
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Side - Product Details */}
            <div className="p-3 md:p-4 lg:p-6 bg-gradient-to-b from-white to-gray-50/50">
              {/* Badges */}
              <div className="flex flex-wrap gap-1.5 mb-2">
                {product.badges.map((badge, idx) => (
                  <Badge key={idx} className={`${badge.color} text-white border-0 text-[10px] px-2 py-0.5`}>
                    {badge.text}
                  </Badge>
                ))}
              </div>

              {/* Product Name */}
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-1.5 leading-tight text-balance">
                {product.name}
              </h1>

              {/* Subtitle */}
              <p className="text-xs md:text-sm text-muted-foreground mb-2">{product.subtitle}</p>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border">
                <div className="flex items-center gap-1 bg-emerald-600 text-white px-2 py-0.5 rounded-md">
                  <span className="font-semibold text-xs">{product.rating}</span>
                  <Star className="w-3 h-3 fill-white" />
                </div>
                <span className="text-xs text-muted-foreground font-medium">
                  {product.reviews.toLocaleString()} Ratings
                </span>
              </div>

              {/* Pricing Section */}
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl md:text-3xl font-bold text-foreground">${product.price}</span>
                  <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
                  <span className="text-emerald-600 font-semibold text-sm">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground">{product.perBottleSuffix}</p>
                <p className="text-xs font-medium text-foreground mt-0.5">{product.supply}</p>
              </div>

              {/* Delivery Information */}
              <div className="bg-white border border-border rounded-lg p-3 mb-3">
                <div className="flex items-start gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-medium mb-0.5">Delivery</p>
                    <p className="text-[10px] text-muted-foreground">Usually delivered in 5-7 business days</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Truck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-emerald-600">Free Shipping</p>
                    <p className="text-[10px] text-muted-foreground">On orders above $50</p>
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="mb-3">
                <h3 className="font-semibold text-xs mb-2">Highlights</h3>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-2 text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>100% Natural Ingredients</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Made in FDA Approved Facility</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>GMP Certified Manufacturing</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Non-GMO & Gluten-Free</span>
                  </li>
                </ul>
              </div>

              {/* Trust Badges */}
              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-lg p-3 mb-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-emerald-600" />
                    <div>
                      <p className="text-[10px] font-semibold">100% Secure</p>
                      <p className="text-[9px] text-muted-foreground">Payment</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <RefreshCw className="w-4 h-4 text-emerald-600" />
                    <div>
                      <p className="text-[10px] font-semibold">60-Day</p>
                      <p className="text-[9px] text-muted-foreground">Money Back</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <div>
                      <p className="text-[10px] font-semibold">Made in USA</p>
                      <p className="text-[9px] text-muted-foreground">Premium Quality</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-emerald-600" />
                    <div>
                      <p className="text-[10px] font-semibold">Fast Ship</p>
                      <p className="text-[9px] text-muted-foreground">5-7 Days</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Money Back Guarantee */}
              <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-300">
                <CardContent className="p-3">
                  <div className="flex items-start gap-2">
                    <div className="bg-amber-500 text-white rounded-full p-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-xs mb-0.5">60-Day Money Back Guarantee</p>
                      <p className="text-[10px] text-muted-foreground leading-relaxed">
                        Not satisfied? Get a full refund within 60 days, no questions asked.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section - More concise padding */}
      <div className="bg-muted/30 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-center text-balance">
              About This Product
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground text-pretty">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Section - Professional alignment */}
      <div className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 md:mb-12 text-center text-balance">
            Why Choose {product.name.split("–")[0].trim()}?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
            {product.whyChoose.map((reason, idx) => (
              <Card key={idx} className="border-border/50 hover:border-primary/50 transition-all hover:shadow-lg group">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="bg-emerald-600/10 p-2 rounded-lg flex-shrink-0 group-hover:bg-emerald-600/20 transition-colors">
                      <Check className="w-5 h-5 text-emerald-600" />
                    </div>
                    <p className="text-sm leading-relaxed text-pretty">{reason}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* What Is Section */}
      <div className="bg-gradient-to-br from-primary/5 to-primary/10 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-center text-balance">
              What Is {product.name.split("–")[0].trim()}?
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground text-pretty">{product.whatIs}</p>
          </div>
        </div>
      </div>

      {/* How It Works - More refined spacing */}
      <div className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 md:mb-12 text-center text-balance">
            How It Works
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
            {product.howItWorks.map((step, idx) => (
              <Card key={idx} className="border-2 border-border/50 hover:shadow-lg transition-shadow">
                <CardContent className="p-5 md:p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <span className="text-sm md:text-base leading-relaxed text-pretty">{step}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits, Ingredients, How to Use Tabs */}
      <div className="bg-muted/30 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-center gap-2 mb-6 md:mb-8 flex-wrap">
              <Button
                variant={selectedTab === "benefits" ? "default" : "outline"}
                onClick={() => setSelectedTab("benefits")}
                size="lg"
                className="text-sm md:text-base"
              >
                Key Benefits
              </Button>
              <Button
                variant={selectedTab === "ingredients" ? "default" : "outline"}
                onClick={() => setSelectedTab("ingredients")}
                size="lg"
                className="text-sm md:text-base"
              >
                Ingredients
              </Button>
              <Button
                variant={selectedTab === "howToUse" ? "default" : "outline"}
                onClick={() => setSelectedTab("howToUse")}
                size="lg"
                className="text-sm md:text-base"
              >
                How to Use
              </Button>
            </div>

            <Card className="shadow-xl">
              <CardContent className="p-6 md:p-8">
                {selectedTab === "benefits" && (
                  <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                    {product.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm md:text-base">{benefit}</span>
                      </div>
                    ))}
                  </div>
                )}

                {selectedTab === "ingredients" && (
                  <div className="space-y-4">
                    {product.ingredients.map((ingredient, idx) => (
                      <div key={idx} className="border-b border-border pb-4 last:border-0 last:pb-0">
                        <h4 className="font-semibold text-base md:text-lg mb-1">{ingredient.name}</h4>
                        <p className="text-sm md:text-base text-muted-foreground">{ingredient.note}</p>
                      </div>
                    ))}
                  </div>
                )}

                {selectedTab === "howToUse" && (
                  <div className="space-y-4">
                    {product.howToUse.map((instruction, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                          {idx + 1}
                        </div>
                        <p className="pt-1 text-sm md:text-base font-medium">{instruction}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Trust Badges Section */}
      <div className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 md:mb-12 text-center text-balance">
            Trusted & Certified
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
            {product.trust.map((badge, idx) => (
              <div
                key={idx}
                className="grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100 hover:scale-110"
              >
                <Image
                  src={badge.image || "/placeholder.svg"}
                  alt={badge.alt}
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pros & Cons */}
      <div className="bg-gradient-to-br from-background to-muted/20 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 md:mb-12 text-center text-balance">
            Pros & Cons
          </h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
            <Card className="border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-900 hover:shadow-xl transition-shadow">
              <CardContent className="p-5 md:p-6">
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center gap-2">
                  <Check className="w-6 h-6 text-emerald-600" />
                  Pros
                </h3>
                <ul className="space-y-2 md:space-y-3">
                  {product.pros.map((pro, idx) => (
                    <li key={idx} className="flex items-start gap-2 md:gap-3">
                      <Check className="w-4 h-4 md:w-5 md:h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base leading-relaxed text-pretty">{pro}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-amber-200 bg-amber-50/50 dark:bg-amber-950/20 dark:border-amber-900 hover:shadow-xl transition-shadow">
              <CardContent className="p-5 md:p-6">
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center gap-2">
                  <X className="w-6 h-6 text-amber-600" />
                  Cons
                </h3>
                <ul className="space-y-2 md:space-y-3">
                  {product.cons.map((con, idx) => (
                    <li key={idx} className="flex items-start gap-2 md:gap-3">
                      <X className="w-4 h-4 md:w-5 md:h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base leading-relaxed text-pretty">{con}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 md:mb-12 text-center text-balance">
            What Customers Say
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
            {product.productReviews.map((review) => (
              <Card key={review.id} className="border-border/50 hover:shadow-xl transition-shadow">
                <CardContent className="p-5 md:p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed mb-4 text-muted-foreground text-pretty">{review.text}</p>
                  <div>
                    <p className="font-semibold text-sm">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.location}</p>
                    {review.verified && (
                      <Badge variant="secondary" className="mt-2 text-xs">
                        <Check className="w-3 h-3 mr-1" />
                        Verified Purchase
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-muted/30 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 md:mb-12 text-center text-balance">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3 md:space-y-4">
              {product.faqs.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`faq-${idx}`}
                  className="border rounded-lg px-4 md:px-6 bg-background hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-4">
                    <span className="font-semibold text-sm md:text-base text-pretty">{faq.q}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed text-sm md:text-base text-pretty pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-12 md:py-16 bg-gradient-to-br from-primary/10 to-emerald-600/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-balance">
            Ready to Transform Your Health?
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto text-pretty">
            Join thousands of satisfied customers and experience the benefits today
          </p>
          <Button
            size="lg"
            className="h-12 md:h-14 px-6 md:px-8 text-base md:text-lg font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-all hover:scale-105"
            asChild
          >
            <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer">
              <ShoppingCart className="mr-2 w-5 h-5" />
              Get Your Supply Now
            </a>
          </Button>
        </div>
      </div>

      {filteredRelatedProducts.length > 0 && (
        <div className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 md:mb-12 text-center text-balance">
              You May Also Like
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
              {filteredRelatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="group hover:shadow-xl transition-all hover:scale-[1.02]">
                  <CardContent className="p-0">
                    <Link href={`/${country}/${locale}/${relatedProduct?.
                      categorySlug}/${relatedProduct.slug}`}>
                      <div className="relative aspect-square bg-gradient-to-br from-accent/10 to-accent/5 rounded-t-lg overflow-hidden">
                        <Image
                          src={relatedProduct.image || "/placeholder.svg"}
                          alt={relatedProduct.name}
                          fill
                          className="object-contain p-6 transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-base md:text-lg mb-2 text-balance">{relatedProduct.name}</h3>
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(relatedProduct.rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                            />
                          ))}
                          <span className="ml-1 text-sm font-semibold">{relatedProduct.rating}</span>
                        </div>
                        <div className="flex items-baseline gap-2 mb-4">
                          <span className="text-xl md:text-2xl font-bold text-primary">${relatedProduct.price}</span>
                          <span className="text-sm text-muted-foreground line-through">
                            ${relatedProduct.originalPrice}
                          </span>
                        </div>
                      </div>
                    </Link>
                    <div className="px-5 pb-5">
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" asChild>
                        <Link href={`/${country}/${locale}/${categoryKey}/${relatedProduct.slug}`}>
                          View Product
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      <section className="py-12 md:py-16 bg-gradient-to-br from-background via-muted/10 to-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 md:mb-6 text-balance">
            Complete Guide to {product.name.split("–")[0].trim()}
          </h2>

          <div className="max-w-4xl mx-auto text-center">
            <p className="text-base md:text-lg text-muted-foreground mb-6 leading-relaxed text-pretty">
              Discover everything you need to know about {product.name.split("–")[0].trim()}, from scientific background
              to usage guidelines and real customer experiences. This comprehensive resource provides detailed insights
              to help you make an informed decision.
            </p>
            <button
              onClick={() => setIsKnowMoreExpanded(!isKnowMoreExpanded)}
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline focus:outline-none transition-colors text-sm md:text-base"
              aria-expanded={isKnowMoreExpanded}
              aria-controls="know-more-content"
            >
              {isKnowMoreExpanded ? "Show Less" : "Read Complete Guide"}
              {isKnowMoreExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
          </div>

          <div
            id="know-more-content"
            className={`mt-12 overflow-hidden transition-all duration-500 ease-in-out ${isKnowMoreExpanded ? "max-h-[10000px] opacity-100" : "max-h-0 opacity-0"
              }`}
          >
            <div className="max-w-4xl mx-auto space-y-12 md:space-y-16">
              {/* Science & Mechanism */}
              <article>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-balance">
                  The Science Behind {product.name.split("–")[0].trim()}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed text-pretty">{product.whatIs}</p>
                <div className="bg-primary/5 rounded-xl p-5 md:p-6 border border-primary/10">
                  <h4 className="font-semibold text-base md:text-lg mb-3">How It Works:</h4>
                  <ul className="space-y-2">
                    {product.howItWorks.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <span className="text-sm md:text-base leading-relaxed text-pretty">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>

              {/* Comprehensive Benefits */}
              <article>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-balance">Complete List of Benefits</h3>
                <p className="text-muted-foreground mb-4 text-sm md:text-base text-pretty">
                  {product.name.split("–")[0].trim()} offers a comprehensive range of health benefits backed by its
                  unique formulation:
                </p>
                <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                  {product.benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 bg-emerald-50/50 dark:bg-emerald-950/20 p-4 rounded-lg border border-emerald-200/50 dark:border-emerald-900/50"
                    >
                      <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </article>

              {/* Detailed Ingredients */}
              <article>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-balance">
                  Active Ingredients & Their Functions
                </h3>
                <p className="text-muted-foreground mb-6 text-sm md:text-base text-pretty">
                  Each ingredient in {product.name.split("–")[0].trim()} is carefully selected for its specific health
                  benefits and synergistic effects:
                </p>
                <div className="space-y-4">
                  {product.ingredients.map((ingredient, idx) => (
                    <div
                      key={idx}
                      className="border-l-4 border-primary pl-5 md:pl-6 py-3 bg-background/50 rounded-r-lg"
                    >
                      <h4 className="font-bold text-base md:text-lg mb-2">{ingredient.name}</h4>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed text-pretty">
                        {ingredient.note}
                      </p>
                    </div>
                  ))}
                </div>
              </article>

              {/* Usage Guidelines */}
              <article>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-balance">Proper Usage Guidelines</h3>
                <div className="bg-muted/50 rounded-xl p-5 md:p-6 border border-border">
                  <p className="text-muted-foreground mb-4 text-sm md:text-base text-pretty">
                    For optimal results, follow these recommended usage instructions:
                  </p>
                  <div className="space-y-3">
                    {product.howToUse.map((instruction, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                          {idx + 1}
                        </div>
                        <p className="pt-1 text-sm md:text-base font-medium">{instruction}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>

              {/* Pros & Cons Analysis */}
              <article>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-balance">
                  Honest Evaluation: Advantages & Limitations
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-base md:text-lg mb-3 flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                      <Check className="w-5 h-5" />
                      Key Advantages
                    </h4>
                    <ul className="space-y-2">
                      {product.pros.map((pro, idx) => (
                        <li
                          key={idx}
                          className="text-sm md:text-base leading-relaxed text-muted-foreground text-pretty"
                        >
                          • {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-base md:text-lg mb-3 flex items-center gap-2 text-amber-700 dark:text-amber-400">
                      <X className="w-5 h-5" />
                      Considerations
                    </h4>
                    <ul className="space-y-2">
                      {product.cons.map((con, idx) => (
                        <li
                          key={idx}
                          className="text-sm md:text-base leading-relaxed text-muted-foreground text-pretty"
                        >
                          • {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>

              {/* Customer Testimonials */}
              <article>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-balance">Real Customer Experiences</h3>
                <p className="text-muted-foreground mb-6 text-sm md:text-base text-pretty">
                  See what verified customers are saying about their experience with {product.name.split("–")[0].trim()}
                  :
                </p>
                <div className="space-y-4">
                  {product.productReviews.map((review) => (
                    <blockquote
                      key={review.id}
                      className="border-l-4 border-amber-400 pl-5 md:pl-6 py-4 bg-background/50 rounded-r-lg"
                    >
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <p className="italic mb-3 text-sm md:text-base leading-relaxed text-pretty">"{review.text}"</p>
                      <footer className="text-xs md:text-sm font-medium">
                        — {review.name}, {review.location}
                        {review.verified && (
                          <Badge variant="secondary" className="ml-2 text-xs">
                            <Check className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </footer>
                    </blockquote>
                  ))}
                </div>
              </article>

              {/* Comprehensive FAQ */}
              <article>
                <h3 className="text-xl md:text-2xl font-bold mb-6 text-balance">Complete FAQ Reference</h3>
                <div className="space-y-4">
                  {product.faqs.map((faq, idx) => (
                    <details
                      key={idx}
                      className="group bg-background border border-border rounded-lg p-4 md:p-5 hover:shadow-md transition-shadow"
                    >
                      <summary className="font-semibold cursor-pointer list-none flex justify-between items-start gap-3 text-sm md:text-base text-pretty">
                        <span>{faq.q}</span>
                        <ChevronDown className="h-5 w-5 flex-shrink-0 transition-transform group-open:rotate-180 mt-0.5" />
                      </summary>
                      <p className="mt-3 text-sm md:text-base text-muted-foreground pl-0 leading-relaxed text-pretty">
                        {faq.a}
                      </p>
                    </details>
                  ))}
                </div>
              </article>

              {/* Trust & Certification */}
              <article>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-balance">Quality Assurance & Certifications</h3>
                <p className="text-muted-foreground mb-6 text-sm md:text-base text-pretty">
                  {product.name.split("–")[0].trim()} is manufactured under strict quality control standards to ensure
                  safety, purity, and potency:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-muted/30 rounded-xl p-6 md:p-8">
                  {product.trust.map((badge, idx) => (
                    <div key={idx} className="text-center">
                      <Image
                        src={badge.image || "/placeholder.svg"}
                        alt={badge.alt}
                        width={80}
                        height={80}
                        className="object-contain mx-auto mb-3 grayscale-0"
                      />
                      <p className="text-xs md:text-sm font-medium">{badge.alt}</p>
                    </div>
                  ))}
                </div>
              </article>

              {/* Final CTA in Know More */}
              <div className="text-center bg-primary/5 rounded-xl p-6 md:p-8 border border-primary/20">
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-balance">Ready to Experience the Benefits?</h3>
                <p className="text-muted-foreground mb-6 text-sm md:text-base max-w-2xl mx-auto text-pretty">
                  Join thousands of satisfied customers who have transformed their health with{" "}
                  {product.name.split("–")[0].trim()}. Order now with our risk-free guarantee.
                </p>
                <Button
                  size="lg"
                  className="h-12 md:h-14 px-6 md:px-8 text-base md:text-lg font-semibold bg-emerald-600 hover:bg-emerald-700 text-white"
                  asChild
                >
                  <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer">
                    <ShoppingCart className="mr-2 w-5 h-5" />
                    Order {product.name.split("–")[0].trim()} Now
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: product.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.a,
              },
            })),
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description,
            image: product.gallery[0] || "/placeholder.svg",
            offers: {
              "@type": "Offer",
              price: product.price,
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: product.rating,
              reviewCount: product.reviews,
            },
          }),
        }}
      />
    </div>
  )
}