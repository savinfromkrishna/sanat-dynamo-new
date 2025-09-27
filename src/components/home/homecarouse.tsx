"use client"

import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Shield, Award, Truck } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export function HomeHeroCarousel({ translations }: { translations: any }) {
  const t = translations
  console.log("Hero translations:", t.hero);
  console.log("Common translations:", t.common); // Debug the common section

  // Fallback values for button text
  const buyNowText = t.common?.buyNow || "Buy Now";
  const learnMoreText = t.common?.learnMore || "Learn More";

  return (
    <section className="relative py-6 lg:py-10 bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <Carousel
            className="w-full"
            plugins={[
              Autoplay({
                delay: 4500,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            opts={{ loop: true }}
          >
            <CarouselContent>
              {t.hero.slides.map((slide: any, idx: number) => (
                <CarouselItem key={idx}>
                  <div className="grid lg:grid-cols-2 gap-6 items-center">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-yellow-400 text-black font-bold uppercase tracking-wider">
                            {slide.isNew ? "#NEW" : ""}
                          </Badge>
                          <Badge className="bg-accent text-accent-foreground">{slide.category}</Badge>
                        </div>
                        <h1 className="text-3xl lg:text-5xl font-sans font-bold text-foreground leading-tight text-balance">
                          {t.hero.title} <span className="text-primary">MITOLYN</span>
                        </h1>
                        <p className="text-sm lg:text-base text-muted-foreground max-w-xl">{t.hero.description}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-current" />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {slide.rating.toFixed(1)}/5 ({slide.reviews.toLocaleString()})
                          </span>
                        </div>
                        <div className="hidden sm:flex items-center gap-3 text-xs lg:text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-primary" />
                            {t.hero.guarantee}
                          </div>
                          <div className="flex items-center gap-2">
                            <Award className="h-4 w-4 text-primary" />
                            {t.hero.fdaRegistered}
                          </div>
                          <div className="flex items-center gap-2">
                            <Truck className="h-4 w-4 text-primary" />
                            {t.hero.freeShipping}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">{slide.supply}</div>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                          size="default"
                          className="text-base px-6"
                          onClick={() => window.open(slide.buyUrl, "_blank")}
                        >
                          {buyNowText}
                        </Button>
                        <Button
                          variant="outline"
                          size="default"
                          className="text-base px-6 bg-transparent"
                          onClick={() => window.open(slide.learnMoreUrl, "_blank")}
                        >
                          {learnMoreText}
                        </Button>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="relative z-10 h-[320px] sm:h-[360px] md:h-[420px] lg:h-[500px]">
                        <Image
                          src={slide.image || "/placeholder.svg"}
                          alt={slide.name}
                          fill
                          sizes="(min-width: 1024px) 520px, 100vw"
                          className="object-contain w-full h-full"
                          priority={idx === 0}
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl" />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 md:-left-8 bg-white/90 hover:bg-white shadow-sm" />
            <CarouselNext className="-right-4 md:-right-8 bg-white/90 hover:bg-white shadow-sm" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}