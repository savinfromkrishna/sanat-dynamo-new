"use client"
import Image from "next/image"
import Link from "next/link"
import Autoplay from "embla-carousel-autoplay"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export function HomeHeroCarousel({
  translations,
  locale,
  country,
}: { translations: any; locale: string; country: string }) {
  const t = translations
  // Fallback values for button text
  const buyNowText = t.common?.buyNow || "Buy Now"
  const learnMoreText = t.common?.learnMore || "Learn More"

  // Automatically construct unique descriptions for each slide if not provided
  // This ensures backward compatibility; falls back to global hero.description
  const getSlideDescription = (slide: any) => {
    if (slide.description) {
      return slide.description
    }
    // Auto-construct based on slug/category for common products (expand as needed)
    const autoDescriptions: Record<string, string> = {
      mitolyn: "Revolutionary formula to restore mitochondrial health, improve fat burning, and boost overall vitality with natural ingredients like CoQ10 and resveratrol.",
      "sleep-lean": "Advanced night-time supplement to enhance deep sleep, balance hormones, and burn fat naturally while you rest, reducing cravings and boosting metabolism.",
      bellyflush: "Natural digestive cleanse to reduce bloating, support gut health, and promote a flatter belly with gentle, plant-based ingredients like marshmallow root.",
      prodentim: "Unique oral probiotic with 3.5 billion CFUs to balance mouth microbiome, strengthen gums, whiten teeth, and freshen breath for optimal dental health.",
    }

    return autoDescriptions[slide.slug] || t.hero.description || "Discover the power of natural supplements to boost energy, support weight loss, enhance oral health, and overall wellness."
  }

  return (
    <section className="relative bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto">
        <div className="relative">
          <h1 className="absolute inset-0 z-[-1] flex items-center justify-center text-7xl lg:text-9xl xl:text-[12rem] font-bold leading-none tracking-wider opacity-5 bg-clip-text text-transparent bg-gradient-to-r from-zinc-300 via-zinc-100 to-zinc-300 drop-shadow-md text-center pointer-events-none">
            {t.hero.mainHeading}
          </h1>
          <Carousel
            className="w-full"
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            opts={{ loop: true }}
          >
            <CarouselContent className="-ml-4">
              {t.hero.slides.map((slide: any, idx: number) => (
                <CarouselItem key={idx} className="pl-4">
                  <div className="border bg-card overflow-hidden shadow-sm rounded-xl">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 p-8 lg:p-12 items-center">
                      {/* Content Section */}
                      <div className="space-y-6">
                        {/* Badges */}
                        <div className="flex items-center gap-2">
                          {slide.isNew && (
                            <Badge className="bg-primary text-primary-foreground font-semibold">NEW</Badge>
                          )}
                          <Badge variant="secondary" className="font-medium">
                            {slide.category}
                          </Badge>
                        </div>

                        {/* Title & Description */}
                        <div className="space-y-3">
                          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
                            {slide.name}
                          </h2>
                          <p className="text-lg text-muted-foreground leading-relaxed">
                            {getSlideDescription(slide)}
                          </p>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2">
                          <div className="flex text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-5 w-5 fill-current" />
                            ))}
                          </div>
                          <span className="text-sm font-medium text-foreground">
                            {slide.rating.toFixed(1)} ({slide.reviews.toLocaleString()} reviews)
                          </span>
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span>✓ {t.hero.guarantee}</span>
                          <span>✓ {t.hero.fdaRegistered}</span>
                          <span>✓ {t.hero.freeShipping}</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                          <Link href={`/${country}/${locale}/${slide.categorySlug}`}>
                            <Button
                              size="lg"
                              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
                            >
                              {buyNowText}
                            </Button>
                          </Link>
                          <Link href={`/${country}/${locale}/${slide.categorySlug}/${slide.slug}`}>
                            <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                              {learnMoreText}
                              <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>

                      {/* Product Image */}
                      <div className="relative h-[350px] lg:h-[450px]">
                        <Image
                          src={slide.image || "/placeholder.svg"}
                          alt={slide.name}
                          fill
                          sizes="(min-width: 1024px) 50vw, 100vw"
                          className="object-contain"
                          priority={idx === 0}
                        />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="left-4 lg:left-8 absolute top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-1.5 rounded-full hover:bg-white transition-all shadow-sm z-10">
              <ChevronLeft className="h-4 w-4" />
            </CarouselPrevious>
            <CarouselNext className="right-4 lg:right-8 absolute top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-1.5 rounded-full hover:bg-white transition-all shadow-sm z-10">
              <ChevronRight className="h-4 w-4" />
            </CarouselNext>
          </Carousel>
        </div>
      </div>
    </section>
  )
}