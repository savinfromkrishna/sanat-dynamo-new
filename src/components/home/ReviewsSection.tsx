"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Star, Quote, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility, otherwise use standard template strings

interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  verified: boolean;
}

interface ReviewsSectionProps {
  translations: any;
}

export function ReviewsSection({ translations }: ReviewsSectionProps) {
  const { reviews: reviewData } = translations;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  if (!reviewData || !reviewData.reviews) return null;

  return (
    <section className="py-16 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {reviewData.title}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {reviewData.subtitle}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {reviewData.reviews.map((review: Review) => (
                <div
                  key={review.id}
                  className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.33%] px-4"
                >
                  <div className="h-full bg-white rounded-2xl p-8 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
                    <div>
                      {/* Stars */}
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            className={cn(
                              "fill-current",
                              i < review.rating ? "text-yellow-400" : "text-slate-200"
                            )}
                          />
                        ))}
                      </div>

                      {/* Quote Icon */}
                      <Quote className="text-blue-100 mb-4" size={32} fill="currentColor" />

                      {/* Review Text */}
                      <p className="text-slate-700 leading-relaxed mb-6 italic">
                        "{review.text}"
                      </p>
                    </div>

                    {/* Reviewer Info */}
                    <div className="mt-auto pt-6 border-t border-slate-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-slate-900">{review.name}</h4>
                          <p className="text-sm text-slate-500">{review.location}</p>
                        </div>
                        {review.verified && (
                          <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-medium">
                            <CheckCircle2 size={14} />
                            {reviewData.verifiedBuyer}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white p-3 rounded-full shadow-lg text-slate-700 hover:text-blue-600 transition-colors hidden md:block"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white p-3 rounded-full shadow-lg text-slate-700 hover:text-blue-600 transition-colors hidden md:block"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {reviewData.reviews.slice(0, Math.ceil(reviewData.reviews.length / (typeof window !== 'undefined' && window.innerWidth > 1024 ? 3 : 1))).map((_: any, index: number) => (
              <button
                key={index}
                className={cn(
                  "h-2 w-2 rounded-full transition-all duration-300",
                  selectedIndex === index ? "bg-blue-600 w-6" : "bg-slate-300"
                )}
                onClick={() => emblaApi?.scrollTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}