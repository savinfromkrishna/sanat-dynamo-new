
"use client"
import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Star, ChevronLeft, ChevronRight, User, ShieldCheck, Activity, Terminal, Database } from "lucide-react";

interface Review {
  name: string;
  location: string;
  rating: number;
  date?: string;
  title?: string;
  content: string;
  verified?: boolean;
  product?: string;
}

export default function CategoryReviewsSection({
  category,
  locale,
  country,
  translations,
}: {
  category: string;
  locale: string;
  country: string;
  translations: any;
}) {
  const CATEGORY_MAP: Record<string, string> = {
    "web-dev": "weightLoss",
    "ai-solutions": "oralProbiotics",
    "cloud-devops": "energy",
    "cybersecurity": "bellyFat",
  };

  const key = CATEGORY_MAP[category] || "weightLoss";
  const categoryData = translations?.[key];
  const reviewsData = categoryData?.reviews || translations.reviews;
  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: false, containScroll: "trimSnaps" },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  );

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const reviews: Review[] = reviewsData?.items || reviewsData?.reviews || [];

  if (!reviews.length) return null;

  return (
    <section className="py-48 bg-gray-50 relative overflow-hidden">
      {/* Blueprint background snippet */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none" style={{ backgroundImage: `radial-gradient(#000 1px, transparent 0)`, backgroundSize: '20px 20px' }} />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-24 text-left">
          <div className="max-w-3xl space-y-8">
            <div className="flex items-center gap-4">
              <div className="h-[2px] w-16 bg-blue-600 shadow-[0_0_10px_rgba(17,109,255,0.3)]" />
              <span className="text-[11px] font-black tracking-[0.5em] text-blue-600 uppercase flex items-center gap-3">
                <Terminal size={14} /> System_Telemetry_Log
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-gray-900 uppercase italic leading-[0.85]">
              VALIDATION<br /><span className="text-blue-600">FEEDBACK.</span>
            </h2>
            <p className="text-2xl text-gray-400 font-light max-w-xl">
              Performance verification data collected from live production nodes across our global infrastructure.
            </p>
          </div>
          
          <div className="flex gap-5">
            <button onClick={scrollPrev} className="w-20 h-20 rounded-[28px] bg-white border border-gray-100 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-90 group">
              <ChevronLeft className="w-8 h-8 transition-transform group-hover:-translate-x-1" />
            </button>
            <button onClick={scrollNext} className="w-20 h-20 rounded-[28px] bg-white border border-gray-100 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-90 group">
              <ChevronRight className="w-8 h-8 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-8">
            {reviews.map((review, index) => (
              <div key={index} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_40%] pl-8">
                <div className="h-full bg-white rounded-[48px] border border-gray-100 p-12 flex flex-col relative group overflow-hidden hover:shadow-[0_40px_100px_-20px_rgba(17,109,255,0.08)] transition-all duration-700">
                  <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/0 group-hover:bg-blue-600 transition-all duration-700" />
                  
                  <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-1.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className={i < review.rating ? "fill-blue-600 text-blue-600" : "text-gray-100"} />
                      ))}
                    </div>
                    {review.verified && (
                      <div className="flex items-center gap-2 px-4 py-1.5 bg-blue-50 rounded-xl border border-blue-100 shadow-sm">
                        <ShieldCheck size={14} className="text-blue-600" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">VALIDATED</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-grow space-y-8 text-left">
                    {review.title && <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight leading-tight">{review.title}</h3>}
                    <p className="text-gray-400 font-light text-xl leading-relaxed italic">"{review.content}"</p>
                  </div>

                  <div className="mt-16 pt-10 border-t border-gray-50 flex items-center justify-between">
                     <div className="flex items-center gap-5 text-left">
                        <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                           <User size={24} className="text-gray-300 group-hover:text-blue-600" />
                        </div>
                        <div className="flex flex-col">
                           <div className="text-sm font-black text-gray-900 uppercase tracking-tight">{review.name}</div>
                           <div className="text-[10px] text-gray-400 uppercase font-bold tracking-[0.2em]">{review.location}</div>
                        </div>
                     </div>
                     <div className="flex flex-col items-end gap-2">
                        <Activity size={20} className="text-blue-500/20 group-hover:text-blue-500 transition-colors animate-pulse" />
                        <div className="w-12 h-1 bg-gray-100 rounded-full overflow-hidden">
                           <div className="h-full bg-blue-500 w-3/4" />
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
