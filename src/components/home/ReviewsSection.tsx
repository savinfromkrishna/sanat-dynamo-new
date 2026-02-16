"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { Star, Quote, CheckCircle2, ChevronLeft, ChevronRight, User, Terminal, Database, ShieldCheck } from 'lucide-react';

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
  locale: string;
  country: string;
}

interface GeoData {
  city?: string;
  region?: string;
  country?: string;
}

export function ReviewsSection({ translations, locale, country }: ReviewsSectionProps) {
  const { reviews: reviewData } = translations;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Geo state – same as other sections
  const [geo, setGeo] = useState<GeoData>({});
  const [geoLoading, setGeoLoading] = useState(true);

  useEffect(() => {
    async function fetchGeo() {
      try {
        const res = await fetch('/api/geo', { cache: 'force-cache' });
        if (res.ok) {
          const data = await res.json();
          setGeo(data);
        }
      } catch (err) {
        console.error('Geo fetch failed:', err);
      } finally {
        setGeoLoading(false);
      }
    }
    fetchGeo();
  }, []);

  const locationParts = [geo.city, geo.region, geo.country || country?.toUpperCase()].filter(Boolean);
  const visitorLocation = locationParts.length > 0 ? locationParts.join(', ') : 'your city';

  // Slightly localized review data – you can keep original or enhance further in translations
  const localizedReviews = reviewData?.reviews?.map((r: Review) => ({
    ...r,
    // Optional: make reviewer location feel more relevant
    location: r.location.includes('CTO') 
      ? `CTO, FinTech – ${visitorLocation}` 
      : r.location.includes('Founder') 
        ? `Founder, HealthTech – ${visitorLocation}` 
        : r.location,
  })) || [];

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % localizedReviews.length);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating, localizedReviews.length]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + localizedReviews.length) % localizedReviews.length);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating, localizedReviews.length]);

  if (!reviewData || !localizedReviews.length) return null;

  const currentReview = localizedReviews[activeIndex];

  return (
    <section id="reviews" className="py-28 md:py-36 lg:py-40 bg-white relative overflow-hidden">

      {/* Background Ambience – slightly softer */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#116dff 1px, transparent 0)`, backgroundSize: '38px 38px' }} />
      <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-blue-500/4 blur-[140px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-24">

          {/* Header Column – smaller text */}
          <div className="w-full lg:w-[38%] flex flex-col justify-center">
            <div className="flex items-center gap-3.5 mb-8">
              <div className="h-px w-14 bg-[#116dff]/25" />
              <span className="text-[9.5px] font-black tracking-[0.45em] text-[#116dff] uppercase">Client_Feedback_Stream</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-gray-900 leading-none mb-8">
              What <span className="text-[#116dff]">Local Businesses</span><br/>Say
            </h2>

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed font-light mb-10">
              {geoLoading 
                ? "Real feedback from businesses like yours..." 
                : `Trusted by companies in ${visitorLocation} and beyond`}
            </p>

            <div className="flex gap-4">
              <button 
                onClick={prevSlide}
                className="w-14 h-14 rounded-2xl bg-white border border-gray-100 flex items-center justify-center hover:bg-[#116dff] hover:text-white transition-all duration-400 group active:scale-95 shadow-sm"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-7 h-7 text-gray-600 group-hover:text-white transition-colors" />
              </button>
              <button 
                onClick={nextSlide}
                className="w-14 h-14 rounded-2xl bg-white border border-gray-100 flex items-center justify-center hover:bg-[#116dff] hover:text-white transition-all duration-400 group active:scale-95 shadow-sm"
                aria-label="Next review"
              >
                <ChevronRight className="w-7 h-7 text-gray-600 group-hover:text-white transition-colors" />
              </button>
            </div>

            <div className="mt-12 flex items-center gap-6 text-sm">
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Reviews</span>
                <span className="text-xl font-black text-gray-900">{localizedReviews.length.toString().padStart(2, '0')}</span>
              </div>
              <div className="w-px h-9 bg-gray-100" />
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Avg Rating</span>
                <span className="text-xl font-black text-[#116dff]">4.9<span className="text-gray-400">/5</span></span>
              </div>
            </div>
          </div>

          {/* Review Terminal Module */}
          <div className="w-full lg:w-[62%]">
            <div className="relative w-full">
              {/* Terminal Window – slightly smaller padding */}
              <div className="bg-white border border-gray-100 rounded-3xl md:rounded-[36px] overflow-hidden shadow-[0_40px_90px_-15px_rgba(0,0,0,0.07)]">

                {/* Terminal Header */}
                <div className="px-8 py-5 bg-gray-50/60 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-100 border border-red-200" />
                    <div className="w-3 h-3 rounded-full bg-amber-100 border border-amber-200" />
                    <div className="w-3 h-3 rounded-full bg-emerald-100 border border-emerald-200" />
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Database className="w-3.5 h-3.5 text-gray-300" />
                    <span className="text-[9.5px] font-mono font-bold tracking-wider text-gray-400 uppercase">
                      CLIENT_LOG::{activeIndex + 1}
                    </span>
                  </div>
                </div>

                {/* Terminal Content */}
                <div className="p-8 md:p-12 lg:p-16 min-h-[480px] md:min-h-[520px] flex flex-col justify-center relative">
                  <div className={`transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isAnimating ? 'opacity-0 translate-y-6 blur-md' : 'opacity-100 translate-y-0 blur-0'}`}>

                    <div className="flex items-start gap-5 mb-10">
                      <div className="relative shrink-0">
                        <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100 shadow-sm">
                          <User className="w-8 h-8 text-[#116dff]" />
                        </div>
                        {currentReview.verified && (
                          <div className="absolute -bottom-1.5 -right-1.5 bg-[#116dff] p-1.5 rounded-lg border-2 border-white">
                            <ShieldCheck className="w-3.5 h-3.5 text-white" />
                          </div>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <h4 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
                          {currentReview.name}
                        </h4>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-sm text-gray-500 font-medium">
                            {currentReview.location}
                          </span>
                          {currentReview.verified && (
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50/80 text-[#116dff] text-[9.5px] font-black uppercase rounded-full border border-blue-100/50">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#116dff] animate-pulse" />
                              Verified Local Partner
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="relative mb-12 md:mb-14">
                      <Quote className="absolute -top-8 -left-6 md:-left-10 text-gray-100/70 w-20 h-20 md:w-28 md:h-28 -z-0 pointer-events-none rotate-180" />
                      <p className="text-xl sm:text-2xl md:text-3xl lg:text-3.5xl text-gray-700 leading-tight font-medium italic relative z-10 pl-4 md:pl-0">
                        "{currentReview.text}"
                      </p>
                    </div>

                    <div className="flex items-center gap-6 pt-8 border-t border-gray-100">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Rating</span>
                        <div className="flex text-amber-400 gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={16} 
                              className={i < currentReview.rating ? "fill-current" : "text-gray-200"} 
                            />
                          ))}
                        </div>
                      </div>
                      <div className="h-9 w-px bg-gray-100" />
                      <div className="flex flex-col">
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Trust Score</span>
                        <div className="h-1.5 w-32 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#116dff] w-[98%]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Dots – smaller */}
              <div className="absolute -bottom-10 right-0 flex gap-2">
                {localizedReviews.map((_: any, i: number) => (
                  <button 
                    key={i} 
                    onClick={() => { if(!isAnimating) setActiveIndex(i); }}
                    className={`h-1.5 rounded-full transition-all duration-600 ${i === activeIndex ? 'w-14 bg-[#116dff]' : 'w-5 bg-gray-100 hover:bg-gray-200'}`} 
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}