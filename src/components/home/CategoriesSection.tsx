"use client"
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Heart, Star, ArrowUpRight, ShieldCheck, Zap, Activity, Cpu, Layers, Terminal, Globe, ChevronRight } from 'lucide-react';
import Link from 'next/link';

type CategoryType = {
  category: string;
  items: any[];
};

type CategoriesSectionProps = {
  translations: any;
  locale: string;
  country: string;
  categoryFilter?: "weightLoss" | "energy" | "oralProbiotics" | "bellyFat" | null;
  onNavigate?: (view: 'home' | 'category', slug?: string) => void;
};

interface GeoData {
  city?: string;
  region?: string;
  country?: string;
}

const ProductModule = ({
  product,
  index,
  isFavorited,
  toggleFavorite,
  animatingId,
  onNavigate,
  onHover,
  location
}: any) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [depth, setDepth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!itemRef.current) return;
      const rect = itemRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const triggerPoint = viewportHeight * 0.45; // earlier trigger for smoother feel
      const distancePastTrigger = triggerPoint - rect.bottom;
      const scrollDepth = Math.max(0, distancePastTrigger / 800); // longer range = gentler transition
      setDepth(scrollDepth);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smoother, less aggressive physics
  const stackScale = Math.max(0.94, 1 - depth * 0.055);
  const stackOpacity = Math.max(0.38, 1 - depth * 0.95);
  const stackBlur = depth > 0 ? Math.min(4, depth * 8) : 0;
  const stackRotate = depth * -3.2;
  const translateY = depth * -28;

  const isAnimating = animatingId === (product.id || product.slug);

  return (
    <div
      ref={itemRef}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      className="sticky top-16 md:top-24 w-full mb-8 md:mb-16 transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] will-change-transform"
      style={{
        marginTop: index === 0 ? '0' : '4vh',
        transform: `perspective(1000px) scale(${stackScale}) rotateX(${stackRotate}deg) translateY(${translateY}px)`,
        opacity: stackOpacity,
        filter: stackBlur > 0 ? `blur(${stackBlur}px)` : 'none',
        zIndex: 20 - index, // reverse stacking order for natural feel
        pointerEvents: stackOpacity < 0.5 ? 'none' : 'auto'
      }}
    >
      <div className="bg-white/95 backdrop-blur-sm border border-gray-100/80 rounded-2xl md:rounded-3xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col lg:flex-row transition-all duration-500 hover:shadow-[0_30px_80px_-10px_rgba(17,109,255,0.08)] group hover:border-[#116dff]/20">

        {/* Visual Terminal Side – smaller */}
        <div className="w-full lg:w-[42%] bg-gradient-to-br from-gray-50/80 to-white p-6 md:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: `radial-gradient(#116dff 1px, transparent 0)`, backgroundSize: '16px 16px' }} />

          <div className="relative flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center border border-gray-100">
                <Cpu className="w-4 h-4 text-[#116dff]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Asset_ID</span>
                <span className="text-xs font-mono font-bold text-gray-900">MOD_{product.slug?.substring(0,6)?.toUpperCase() || 'XXXXXX'}</span>
              </div>
            </div>
            <button
              onClick={(e) => { e.preventDefault(); toggleFavorite(product.id || product.slug); }}
              className={`p-2 rounded-full transition-all duration-300 ${isFavorited ? 'text-red-500 bg-red-50/80' : 'text-gray-300 hover:text-red-400 hover:bg-white/80'}`}
            >
              <Heart className={`w-5 h-5 transition-all duration-500 ${isFavorited ? 'fill-current scale-110' : 'scale-100'} ${isAnimating ? 'animate-bounce-once' : ''}`} />
              {isAnimating && <div className="absolute inset-0 bg-red-400/20 rounded-full animate-ping pointer-events-none" />}
            </button>
          </div>

          <div className="relative aspect-square flex items-center justify-center py-4">
            <div className="absolute inset-0 bg-blue-100/10 blur-[60px] rounded-full scale-90 group-hover:scale-110 transition-transform duration-1000" />
            <img
              src={product.image || "https://picsum.photos/600/600"}
              alt={product.name}
              className="max-h-[85%] max-w-[85%] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-1000 group-hover:scale-105 group-hover:-translate-y-2"
            />
          </div>

          <div className="mt-6 flex items-center gap-4 text-[9.5px] text-gray-500 font-medium">
            <Globe size={13} className="text-[#116dff]" />
            <span>{location}</span>
          </div>
        </div>

        {/* Content Side – more compact */}
        <div className="w-full lg:w-[58%] p-6 md:p-8 lg:p-10 flex flex-col text-left">
          <div className="flex flex-wrap items-center gap-2.5 mb-6">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#116dff]/10 text-[#116dff] rounded-full text-[9px] font-black tracking-widest uppercase">
              <Star className="w-3 h-3 fill-current" />
              {product.rating} Stable
            </div>
            <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Pos: 0{index + 1}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-4.5xl font-black text-gray-900 mb-6 leading-tight tracking-tighter transition-colors group-hover:text-[#116dff]">
            {product.name}
          </h3>

          <div className="grid grid-cols-2 gap-5 mb-8 border-y border-gray-50/70 py-6">
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                <Zap size={12} className="text-amber-500" /> Latency
              </span>
              <span className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tighter">&lt;2.1ms</span>
            </div>
            <div className="flex flex-col border-l border-gray-50/70 pl-5">
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                <Globe size={12} className="text-[#116dff]" /> Uptime
              </span>
              <span className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tighter">99.99%</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 mt-auto">
            <Link
              href={product.link && product.link !== "#" ? product.link : `/category/${product.slug}`}
              target={product.link && product.link !== "#" ? "_blank" : undefined}
              rel={product.link && product.link !== "#" ? "noopener noreferrer" : undefined}
              className="w-full sm:w-auto flex-grow flex items-center justify-center gap-2.5 px-8 py-4 bg-gray-900 text-white font-bold rounded-xl transition-all hover:bg-[#116dff] hover:-translate-y-0.5 shadow-md hover:shadow-[#116dff]/20 active:scale-98 group/btn text-sm"
            >
              <span className="uppercase tracking-wider text-xs">Deploy Now</span>
              <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>

            <Link
              href={`/category/${product.slug}`}
              className="w-full sm:w-auto px-8 py-4 bg-white border border-gray-100 text-gray-600 font-bold rounded-xl hover:text-[#116dff] hover:border-[#116dff] transition-all uppercase tracking-wider text-xs flex items-center justify-center gap-1.5"
            >
              Details
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export function CategoriesSection({
  translations,
  locale,
  country,
  categoryFilter = null,
  onNavigate,
}: CategoriesSectionProps) {
  const t = translations;

  const [favorites, setFavorites] = useState<(string | number)[]>([]);
  const [animatingId, setAnimatingId] = useState<string | number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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

  const locationParts = [geo.city, geo.region, geo.country || country?.toUpperCase()].filter(Boolean);
  const location = locationParts.length > 0 ? locationParts.join(', ') : 'your city';

  const filterToCategoryName: Record<string, string> = {
    weightLoss: "Enterprise Web Development",
    energy: "Mobile App Engineering",
    oralProbiotics: "AI & Automation Solutions",
    bellyFat: "Belly Fat Supplements",
  };

  const categoryToTranslationKey: Record<string, string> = {
    "Enterprise Web Development": "weightLoss",
    "Mobile App Engineering": "energy",
    "AI & Automation Solutions": "oralProbiotics",
    "Belly Fat Supplements": "bellyFat",
  };

  const visibleCategories: CategoryType[] = useMemo(() => {
    let base = t.categories?.products || [];
    if (categoryFilter && filterToCategoryName[categoryFilter]) {
      const target = filterToCategoryName[categoryFilter];
      return base.filter((cat: CategoryType) => cat.category === target);
    }
    return base;
  }, [t.categories?.products, categoryFilter]);

  const allItems = useMemo(() => visibleCategories.flatMap(c => c.items), [visibleCategories]);

  const toggleFavorite = (id: string | number) => {
    setAnimatingId(id);
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
    setTimeout(() => setAnimatingId(null), 600);
  };

  return (
    <section id="products" className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50/30 relative overflow-x-hidden">

      {/* Subtle background */}
      <div className="absolute inset-0 opacity-[0.008] pointer-events-none" style={{ backgroundImage: `radial-gradient(#116dff 1px, transparent 0)`, backgroundSize: '32px 32px' }} />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 lg:px-12 xl:px-16">

        {/* Header – compact & elegant */}
        <div className="max-w-4xl mb-12 md:mb-20 lg:mb-28 text-left">
          <div className="flex items-center gap-3 mb-5">
            <div className="px-3 py-1 bg-blue-50/80 text-[#116dff] text-[9px] font-black tracking-widest uppercase rounded-md border border-blue-100/30">
              Local Deployment
            </div>
            <Terminal className="w-4 h-4 text-gray-400" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-gray-900 leading-[0.9]">
            Solutions for <span className="text-[#116dff]">{location}</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-600 font-light max-w-3xl">
            Professional websites, apps, AI & automation built for businesses in {location}.
          </p>
        </div>

        {/* Categories */}
        {visibleCategories.map((category: CategoryType, catIndex: number) => {
          const key = categoryToTranslationKey[category.category] || "weightLoss";
          const title = t.categories?.[key] || category.category;
          const desc = t.categories?.[`${key}Description`] || "High-performance digital solutions.";

          return (
            <div key={category.category} className={`${catIndex > 0 ? "mt-16 md:mt-24 lg:mt-32" : ""} relative`}>

              {/* Category sticky header – smaller & cleaner */}
              <div className="sticky top-16 md:top-20 z-30 bg-white/90 backdrop-blur-md py-5 md:py-6 mb-10 border-b border-gray-100/70 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-black text-[#116dff] uppercase tracking-wider">Layer_0{catIndex + 1}</span>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-gray-900 leading-none">
                    {title}
                  </h3>
                </div>
                <p className="text-sm md:text-base text-gray-500 font-light max-w-md md:text-right">
                  {desc}
                </p>
              </div>

              {/* Cards */}
              <div className="flex flex-col gap-10 md:gap-16">
                {category.items.map((product: any, itemIndex: number) => {
                  const globalIndex = allItems.findIndex(i => (i.id || i.slug) === (product.id || product.slug));

                  return (
                    <ProductModule
                      key={product.id || product.slug}
                      product={product}
                      index={globalIndex}
                      isFavorited={favorites.includes(product.id || product.slug)}
                      toggleFavorite={toggleFavorite}
                      animatingId={animatingId}
                      onNavigate={onNavigate}
                      onHover={setHoveredIndex}
                      location={location}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust badges – compact */}
      <div className="mt-20 md:mt-28 lg:mt-36 py-12 md:py-16 border-t border-gray-100/70 px-6 md:px-12 lg:px-16">
        <div className="grid md:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto">
          {[
            { icon: Activity, color: 'gray-900', title: 'Local Performance', text: `Optimized for ${location}` },
            { icon: Layers, color: '#116dff', title: 'Scalable Solutions', text: 'Grow without limits' },
            { icon: ShieldCheck, color: 'emerald-600', title: 'Secure & Compliant', text: 'ISO 27001 & SOC 2 ready' },
          ].map((item, i) => (
            <div key={i} className="space-y-4 group cursor-default">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all duration-500 group-hover:rotate-180 ${i === 0 ? 'bg-gray-900' : i === 1 ? 'bg-[#116dff]' : 'bg-emerald-600'}`}>
                <item.icon className="w-5 h-5" />
              </div>
              <h4 className="text-lg md:text-xl font-black text-gray-900 tracking-tight">{item.title}</h4>
              <p className="text-sm md:text-base text-gray-600 font-light leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}