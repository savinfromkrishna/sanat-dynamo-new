"use client"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle, Star, ShieldCheck, Truck, Leaf, Sparkles, Quote } from "lucide-react"
import type { ProductDetail } from "./product-data"
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react"

export default function ProductDetailPageClient({ product, translations, locale }: { product: ProductDetail; translations: any; locale: string }) {
  if (!product) {
    return null
  }

  const t = translations
  const savings = Math.max(product.originalPrice - product.price, 0)

  return (
    <div className="min-h-screen bg-white">
      <main className="py-10">
        {/* Hero / Summary */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Gallery */}
            <Card className="overflow-hidden">
              <CardContent className="p-4">
                <div className="w-full h-72 bg-gray-50 rounded-lg flex items-center justify-center">
                  <Image
                    id="pd-main-image"
                    src={product.image || "/placeholder.svg"}
                    alt={`${product.name} ${t.common.mainImage}`}
                    width={360}
                    height={360}
                    className="object-contain max-h-64"
                    priority
                  />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {product.gallery.map((src, i) => (
                    <button
                      key={i}
                      className="h-24 bg-gray-50 rounded-md flex items-center justify-center hover:ring-2 hover:ring-emerald-600 transition"
                      aria-label={`${t.common.viewImage} ${i + 1}`}
                      onClick={() => {
                        const main = document.getElementById("pd-main-image") as HTMLImageElement | null
                        if (main) main.src = src
                      }}
                    >
                      <img src={src || "/placeholder.svg"} alt={`${t.common.thumbnail} ${i + 1}`} className="h-16 object-contain" />
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
            {/* Purchase Panel */}
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {product.badges.map((b, i) => (
                  <Badge key={i} className={`${b.color} text-white`}>
                    {b.text}
                  </Badge>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-balance">{product.name}</h1>
              <p className="mt-2 text-gray-600">
                {product.subtitle} · {product.supply}
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex text-yellow-400" aria-hidden="true">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews.toLocaleString()} {t.common.reviews})
                </span>
              </div>
              <div className="mt-6">
                <div className="flex items-end gap-3">
                  <span className="text-5xl font-bold text-emerald-600">${product.price}</span>
                  <span className="text-gray-400 line-through text-xl">${product.originalPrice}</span>
                  {savings > 0 && (
                    <span className="text-sm font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                      {t.common.youSave} ${savings}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{product.perBottleSuffix}</p>
              </div>
              <div className="mt-6 grid gap-2">
                <Button
                  className="w-full h-12 bg-yellow-400 hover:bg-yellow-500 text-black font-bold"
                  onClick={() => window.open(product.affiliateUrl, "_blank")}
                >
                  {t.common.orderNow}
                </Button>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  {t.common.moneyBackGuarantee}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <Truck className="h-4 w-4 text-emerald-600" />
                  {t.common.shipsFromUSA}
                </div>
              </div>
              {/* Trust row */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {product.trust.map((b, i) => (
                  <div key={i} className="flex items-center justify-center">
                    <Image
                      src={b.image || "/placeholder.svg"}
                      alt={b.alt}
                      width={72}
                      height={72}
                      className="opacity-90"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* Benefits */}
        <section className="mt-12 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {product.benefits.map((benefit, i) => (
              <Card key={i} className="border-2 border-emerald-50 hover:shadow-md transition">
                <CardContent className="p-6 flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-emerald-600 flex-shrink-0" />
                  <p className="text-sm text-gray-700">{benefit}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        {/* Ingredients + How to Use */}
        <section className="mt-12 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-emerald-600" /> {t.common.ingredients}
                </h2>
                <ul className="space-y-3">
                  {product.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-emerald-600 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">{ing.name}</p>
                        {ing.note && <p className="text-sm text-gray-600">{ing.note}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.common.howToUse}</h2>
                <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                  {product.howToUse.map((step, i) => (
                    <li key={i} className="leading-relaxed">
                      {step}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        </section>
        {/* Bonuses */}
        {product.bonuses && product.bonuses.length > 0 && (
          <section className="mt-12 container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t.common.freeBonuses}</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {product.bonuses.map((b, i) => (
                <Card key={i} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="h-56 bg-gray-50 flex items-center justify-center">
                      <Image
                        src={b.image || "/placeholder.svg"}
                        alt={b.title}
                        width={300}
                        height={300}
                        className="object-contain"
                      />
                    </div>
                    <div className="p-4">
                      <p className="font-semibold text-gray-900">{b.title}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
        {/* FAQs */}
        <section className="mt-12 container mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">{t.common.faqs}</h2>
              <Accordion type="single" collapsible className="w-full">
                {product.faqs.map((f, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border-b">
                    <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                    <AccordionContent className="text-gray-700">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>
        {/* Why Consider Weight Loss Supplements? */}
        <section className="mt-12 container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-sans font-bold text-center mb-8">
            {t.common.whyWeightLossSupplements}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.common.whyWeightLossBenefits.map((benefit: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, index: Key | null | undefined) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="p-0">
                  <CheckCircle className="h-8 w-8 text-emerald-500 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">{benefit}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-6 max-w-3xl mx-auto">
            {t.common.whyWeightLossDescription}
          </p>
        </section>
        {/* Product Reviews */}
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
              {product.productReviews?.map((review) => (
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
      </main>
    </div>
  )
}