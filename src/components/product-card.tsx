"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Star } from "lucide-react";
import CTAButton from "./cta-button";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

interface Product {
  id: string;
  image: string;
  name: string;
  rating: number;
  reviews: number;
  price: string;
  originalPrice: string;
  discount: string;
  premiumPrice: string;
  supply: string;
  link: string;
}

interface ProductCardsProps {
  products: Product[];
  buyNowLabel: string;
}

function chunkIntoSlides(products: Product[]) {
  const slides: Product[][] = [];
  for (let i = 0; i < products.length; i += 6) {
    slides.push(products.slice(i, i + 6));
  }
  return slides;
}

function ProductCard({ product, buyNowLabel }: { product: Product; buyNowLabel: string }) {
  return (
    <div className="w-full h-full">
      <Card className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 overflow-hidden w-full h-full flex flex-col">
        <div className="relative">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/90 hover:bg-white transition-colors shadow-sm"
          >
            <Heart className="w-4 h-4 text-gray-500 hover:text-red-500 transition-colors" />
          </button>

          <div className="h-36 p-3 flex items-center justify-center bg-gray-50">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={100}
              height={110}
              className="object-contain max-h-full"
            />
          </div>
        </div>

        <CardContent className="p-3 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1 bg-teal-50 px-2 py-1 rounded text-sm">
              <span className="font-bold text-teal-700">{product.rating}</span>
              <Star className="w-3 h-3 text-teal-500 fill-current" />
            </div>
            <span className="text-xs text-gray-600">{product.reviews.toLocaleString()} reviews</span>
          </div>

          <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-2 leading-tight">
            {product.name}
          </h3>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-base font-bold text-gray-900">{product.price}</span>
              <span className="text-xs text-gray-500 line-through">{product.originalPrice}</span>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded">
                {product.discount}
              </span>
            </div>

            {/* <div className="flex items-center gap-1 text-xs text-orange-600 mb-1">
              <Star className="w-3 h-3 text-orange-500 fill-current" />
              <span className="font-medium">{product.premiumPrice}</span>
            </div> */}

            <div className="text-xs text-gray-600 font-medium">{product.supply}</div>
          </div>

          <div className="mt-3">
            <CTAButton
              url={product.link}
              label={buyNowLabel}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ProductCards({ products, buyNowLabel }: ProductCardsProps) {
  const shouldScroll = products.length > 6;

  const [emblaRef, emblaApi] = useEmblaCarousel(
    shouldScroll
      ? { loop: false, align: "start", containScroll: "trimSnaps", slidesToScroll: 1 }
      : {}
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const slides = chunkIntoSlides(products);

  return (
    <section className="relative max-w-7xl mx-auto px-4 py-6">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, slideIdx) => (
            <div
              key={slideIdx}
              className="flex-shrink-0 w-full grid grid-cols-1 sm:grid-cols-3 gap-4 px-1 min-w-0"
            >
              <div className="col-span-full grid grid-cols-1 sm:grid-cols-3 gap-4">
                {slide.slice(0, 3).map((p) => (
                  <Link href={p.link} key={p.id} className="block h-full">
                    <ProductCard product={p} buyNowLabel={buyNowLabel} />
                  </Link>
                ))}
              </div>

              <div className="col-span-full grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                {slide.slice(3, 6).map((p) => (
                  <Link href={p.link} key={p.id} className="block h-full">
                    <ProductCard product={p} buyNowLabel={buyNowLabel} />
                  </Link>
                ))}
              </div>

              {slide.length < 6 &&
                Array.from({ length: 6 - slide.length }).map((_, i) => (
                  <div key={`empty-${i}`} className="hidden sm:block" />
                ))}
            </div>
          ))}
        </div>
      </div>

      {shouldScroll && (
        <>
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition z-10"
            onClick={scrollPrev}
            aria-label="Previous"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition z-10"
            onClick={scrollNext}
            aria-label="Next"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </section>
  );
}