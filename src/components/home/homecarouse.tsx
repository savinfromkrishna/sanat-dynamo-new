"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Plus, Wand2, MousePointer2, Settings, Layers, Search, Layout } from 'lucide-react';
import Image from 'next/image';

interface HomeHeroCarouselProps {
  translations: any;
  locale: string;
  country: string;
}

interface GeoData {
  city?: string;
  region?: string;
  country?: string;
}

const EditorElement = ({
  children,
  label,
  className = "",
  isVisible = true,
  delay = "0ms"
}: {
  children: React.ReactNode;
  label: string;
  className?: string;
  isVisible: boolean;
  delay?: string;
}) => (
  <div
    className={`absolute transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'} ${className}`}
    style={{ transitionDelay: delay }}
  >
    <div className="relative group cursor-default">
      <div className="absolute -top-5 left-0 bg-blue-600 text-[9px] text-white px-1.5 py-0.5 rounded-t-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 z-50">
        <MousePointer2 size={7} /> {label}
      </div>
      <div className="absolute -inset-1.5 border border-blue-500/0 group-hover:border-blue-500/40 rounded-lg pointer-events-none transition-all duration-300">
        <div className="editor-handle -top-1 -left-1 opacity-0 group-hover:opacity-100" />
        <div className="editor-handle -top-1 -right-1 opacity-0 group-hover:opacity-100" />
        <div className="editor-handle -bottom-1 -left-1 opacity-0 group-hover:opacity-100" />
        <div className="editor-handle -bottom-1 -right-1 opacity-0 group-hover:opacity-100" />
      </div>
      {children}
    </div>
  </div>
);

export function HomeHeroCarousel({
  translations,
  locale,
  country,
}: HomeHeroCarouselProps) {
  const slides = translations.hero.slides || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [progress, setProgress] = useState(0);
  const autoPlayInterval = 8000;

  // Geo state
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
        console.error('Geo fetch failed', err);
      } finally {
        setGeoLoading(false);
      }
    }
    fetchGeo();
  }, []);

  const currentSlide = slides[activeIndex];

  const locationParts = [geo.city, geo.region, geo.country || country?.toUpperCase()].filter(Boolean);
  const location = locationParts.length > 0 ? locationParts.join(', ') : 'your city';

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setProgress(0);
    setActiveIndex((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating, slides.length]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setProgress(0);
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating, slides.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + (100 / (autoPlayInterval / 100));
      });
    }, 100);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden bg-white px-5 sm:px-6 min-h-[85vh] md:min-h-[90vh]">

      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full hero-gradient opacity-70" />
        <div className="absolute top-[15%] left-[8%] w-56 h-56 bg-blue-50 rounded-full blur-[90px] opacity-35 animate-pulse-slow" />
        <div className="absolute bottom-[15%] right-[8%] w-80 h-80 bg-purple-50 rounded-full blur-[110px] opacity-35 animate-pulse-slow" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10 flex flex-col items-center justify-center">

        {/* CENTER CONTENT */}
        <div className="text-center max-w-3xl mx-auto space-y-6 md:space-y-8 mb-12 md:mb-16 relative z-20">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-[10px] sm:text-[11px] font-semibold text-slate-600 uppercase tracking-wider transition-all duration-700 ${isAnimating ? 'opacity-0 -translate-y-3' : 'opacity-100 translate-y-0'}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            {translations.hero.badge || `Website & App Builder – ${locale.toUpperCase()}`}
          </div>

          <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-slate-900 leading-[0.95] transition-all duration-1000 ease-out transform ${isAnimating ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
            {currentSlide.name}
            <span className="block text-blue-600 mt-2 md:mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              {geoLoading ? '...' : `in ${location}`}
            </span>
          </h1>

          <p className={`text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-150 transform ${isAnimating ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'}`}>
            {translations.hero.subtitle ||
              `Professional websites, mobile apps & custom software built for businesses in ${location}. Fast • Reliable • Local focus.`}
          </p>

          <div className={`flex flex-col items-center gap-5 pt-6 md:pt-8 transition-all duration-700 delay-300 ${isAnimating ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'}`}>
            <button className="group relative bg-blue-600 text-white text-lg sm:text-xl font-semibold px-10 sm:px-12 py-4 sm:py-5 rounded-full hover:bg-blue-700 transition-all shadow-xl hover:shadow-blue-500/25 active:scale-95 flex items-center gap-2.5">
              {translations.hero.cta || 'Get Started Now'}
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Free to start • No credit card • Local support
            </p>
          </div>
        </div>

        {/* FLOATING EDITOR ELEMENTS – all scaled down */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">

          {/* 1. Header / Navigation */}
          <EditorElement label="Header" isVisible={!isAnimating} className="top-[12%] left-[4%] hidden xl:block" delay="100ms">
            <div className="glass-card p-3.5 rounded-xl flex items-center gap-5 shadow-sm w-72 animate-float-slow pointer-events-auto">
              <div className="w-7 h-7 rounded-lg bg-slate-900" />
              <div className="flex gap-3">
                <div className="w-10 h-1.5 bg-slate-200 rounded" />
                <div className="w-10 h-1.5 bg-slate-200 rounded" />
                <div className="w-10 h-1.5 bg-slate-200 rounded" />
              </div>
              <div className="ml-auto w-14 h-7 rounded-full bg-blue-100" />
            </div>
          </EditorElement>

          {/* 2. Product Card */}
          <EditorElement label="Product Card" isVisible={!isAnimating} className="top-[38%] left-[2%] hidden lg:block" delay="200ms">
            <div className="glass-card p-2.5 rounded-2xl w-56 animate-float pointer-events-auto">
              <div className="relative aspect-[4/5] bg-slate-100 rounded-xl overflow-hidden mb-2.5">
                <Image
                  src={currentSlide.image}
                  height={400}
                  width={400}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt="product preview"
                />
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white/90 flex items-center justify-center">
                  <Plus size={10} />
                </div>
              </div>
              <div className="space-y-1">
                <div className="h-2.5 w-3/4 bg-slate-200 rounded" />
                <div className="h-2.5 w-2/5 bg-slate-100 rounded" />
              </div>
            </div>
          </EditorElement>

          {/* 3. Theme Settings / Branding */}
          <EditorElement label="Theme Settings" isVisible={!isAnimating} className="bottom-[18%] left-[6%] hidden xl:block" delay="300ms">
            <div className="glass-card p-3.5 rounded-2xl flex flex-col gap-3.5 w-44 animate-float-slow pointer-events-auto">
              <div className="flex items-center gap-1.5 text-[9px] font-semibold text-slate-400 uppercase tracking-tight">
                <Settings size={11} /> Brand
              </div>
              <div className="flex justify-between gap-2">
                <div className="w-7 h-7 rounded-full shadow-inner" style={{ backgroundColor: currentSlide.brandColor || '#3b82f6' }} />
                <div className="w-7 h-7 rounded-full bg-slate-900" />
                <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200" />
                <div className="w-7 h-7 rounded-full bg-blue-500" />
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-3/4" />
              </div>
            </div>
          </EditorElement>

          {/* 4. Abstract Asset / Image Preview */}
          <EditorElement label="Asset Preview" isVisible={!isAnimating} className="top-[8%] right-[5%] hidden lg:block" delay="150ms">
            <div className="w-48 h-48 sm:w-52 sm:h-52 animate-float-slow pointer-events-auto rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={currentSlide.image}
                height={400}
                width={400}
                className="w-full h-full object-cover"
                alt="asset preview"
              />
            </div>
          </EditorElement>

          {/* 5. Design Tools Palette */}
          <EditorElement label="Tools" isVisible={!isAnimating} className="top-[32%] right-[3%] hidden xl:block" delay="250ms">
            <div className="glass-card p-2 rounded-2xl flex flex-col gap-2 shadow-2xl pointer-events-auto">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center"><Layout size={16} /></div>
              <div className="w-9 h-9 rounded-xl hover:bg-slate-50 flex items-center justify-center text-slate-400"><Layers size={16} /></div>
              <div className="w-9 h-9 rounded-xl hover:bg-slate-50 flex items-center justify-center text-slate-400"><Search size={16} /></div>
              <div className="w-9 h-9 rounded-xl hover:bg-slate-50 flex items-center justify-center text-slate-400"><Wand2 size={16} /></div>
            </div>
          </EditorElement>

      

        </div>
      </div>

      {/* FOOTER CONTROLS */}
      <div className="mt-auto w-full max-w-7xl border-t border-slate-100 py-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-30">

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5">
            {slides.map((_: any, idx: number) => (
              <button
                key={idx}
                onClick={() => {
                  if (!isAnimating && idx !== activeIndex) {
                    setIsAnimating(true);
                    setActiveIndex(idx);
                    setProgress(0);
                    setTimeout(() => setIsAnimating(false), 800);
                  }
                }}
                className={`group relative h-0.5 sm:h-1 transition-all duration-500 rounded-full overflow-hidden ${idx === activeIndex ? 'w-20 sm:w-24 bg-slate-100' : 'w-3 sm:w-4 bg-slate-200 hover:bg-slate-300'}`}
              >
                {idx === activeIndex && (
                  <div
                    className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </button>
            ))}
          </div>
          <div className="text-[9px] sm:text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            Step <span className="text-slate-900">0{activeIndex + 1}</span> / 0{slides.length}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={prevSlide}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all active:scale-95"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all active:scale-95"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Floating Cursor Tooltip */}
      <div
        className={`fixed z-[100] pointer-events-none transition-all duration-700 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
        style={{ left: '45%', top: '38%' }}
      >
        <div className="relative">
          <MousePointer2 className="text-slate-900 fill-slate-900" size={20} />
          <div className="absolute top-3 left-3 bg-blue-600 text-white text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded shadow-lg whitespace-nowrap">
            Designing in {geoLoading ? '...' : location}
          </div>
        </div>
      </div>

    </section>
  );
}