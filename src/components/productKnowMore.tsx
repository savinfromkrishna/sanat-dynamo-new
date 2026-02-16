"use client"
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Star, Cpu, Database, Binary, ShieldAlert, Zap, Activity, Info, Terminal, ArrowDownCircle, Quote, Layout } from "lucide-react";

interface Section {
  type: "text" | "list" | "stat" | "table" | "quote" | "faq" | "cta";
  heading?: string;
  content?: string;
  items?: string[];
  stats?: { value: string; label: string }[];
  table?: { headers: string[]; rows: string[][] };
  quote?: string;
  author?: string;
  rating?: number;
  faqs?: { q: string; a: string }[];
  link?: { text: string; href: string };
  button?: { text: string; href: string };
}

interface KnowMoreData {
  title: string;
  summary: string;
  knowMore: string;
  knowLess: string;
  sections: Section[];
}

interface GeoData {
  city?: string;
  region?: string;
  country?: string;
}

interface ProductknowMoreSectionProps {
  translations: any;
  locale: string;
  country: string;
}

// Internal 3D Card Component (with geo context passed down)
const KnowledgeCard = ({ section, index, isExpanded, location }: { 
  section: Section; 
  index: number; 
  isExpanded: boolean;
  location: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [depth, setDepth] = useState(0);

  useEffect(() => {
    if (!isExpanded) return;
    
    const handleScroll = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const stickyThreshold = 160;
      const scrollProgress = Math.max(0, (stickyThreshold - rect.top) / 600);
      setDepth(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isExpanded]);

  const scale = Math.max(0.87, 1 - depth * 0.09);
  const opacity = Math.max(0.35, 1 - depth * 0.65);
  const blur = Math.min(7, depth * 9);
  const rotateX = depth * -4.5;
  const translateY = depth * -35;

  return (
    <div 
      ref={cardRef}
      className="sticky top-36 md:top-40 w-full mb-10 md:mb-24 transition-all duration-400 ease-out will-change-transform"
      style={{
        transform: `perspective(1800px) scale(${scale}) rotateX(${rotateX}deg) translateY(${translateY}px)`,
        opacity: opacity,
        filter: `blur(${blur}px)`,
        zIndex: 10 + index,
        marginTop: index === 0 ? '0' : '8vh'
      }}
    >
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-[0_35px_90px_-18px_rgba(0,0,0,0.05)] overflow-hidden group hover:border-[#116dff]/15 transition-all duration-600">
        <div className="flex flex-col lg:flex-row min-h-[480px]">
          
          {/* Section ID and Visual Marker Side – smaller */}
          <div className="w-full lg:w-[35%] bg-gray-50/55 p-8 md:p-12 lg:p-14 border-r border-gray-100 flex flex-col justify-between relative overflow-hidden">
             <div className="absolute inset-0 opacity-[0.04] pointer-events-none" 
                  style={{ backgroundImage: `radial-gradient(#116dff 0.5px, transparent 0)`, backgroundSize: '14px 14px' }} />
             
             <div className="relative flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-gray-100 transition-transform duration-600 group-hover:scale-105 group-hover:-rotate-4">
                  {section.type === 'text' && <Cpu className="w-7 h-7 text-[#116dff]" />}
                  {section.type === 'list' && <Database className="w-7 h-7 text-[#116dff]" />}
                  {section.type === 'stat' && <Binary className="w-7 h-7 text-[#116dff]" />}
                  {section.type === 'table' && <Activity className="w-7 h-7 text-[#116dff]" />}
                  {section.type === 'faq' && <Zap className="w-7 h-7 text-[#116dff]" />}
                  {section.type === 'quote' && <Quote className="w-7 h-7 text-[#116dff]" />}
                  {section.type === 'cta' && <Info className="w-7 h-7 text-[#116dff]" />}
                </div>
                <div className="flex flex-col">
                  <span className="text-[9.5px] font-black text-gray-400 uppercase tracking-widest">Module_ID</span>
                  <span className="text-xs font-mono font-black text-gray-900">LAYER_0{index + 1}</span>
                </div>
             </div>

             <div className="relative mt-10">
               <div className="text-[100px] md:text-[110px] font-black text-gray-100/45 leading-none select-none tracking-tighter">0{index + 1}</div>
             </div>

             <div className="mt-auto pt-8">
                <div className="flex items-center gap-2.5 text-[9.5px] text-gray-500 font-medium">
                  <span>Optimized for {location}</span>
                </div>
             </div>
          </div>

          {/* Main Content Side – smaller text */}
          <div className="w-full lg:w-[65%] p-8 md:p-12 lg:p-14 flex flex-col justify-center">
             {section.heading && (
                <div className="flex items-center gap-3.5 mb-8">
                   <div className="w-9 h-px bg-[#116dff]" />
                   <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 uppercase tracking-tight leading-none">
                     {section.heading}
                   </h3>
                </div>
             )}

             <div className="space-y-8">
                {section.type === "text" && (
                  <p className="text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed max-w-4xl font-light italic">
                    {section.content}
                  </p>
                )}

                {section.type === "list" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.items?.map((item, i) => (
                      <div key={i} className="flex items-center gap-5 p-5 rounded-2xl bg-gray-50/60 border border-gray-100 hover:bg-blue-50/40 transition-all duration-400">
                        <div className="w-2 h-2 rounded-full bg-[#116dff] shadow-[0_0_8px_rgba(17,109,255,0.35)]" />
                        <span className="text-base font-semibold text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                {section.type === "stat" && section.stats && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {section.stats.map((stat, i) => (
                      <div key={i} className="p-8 rounded-[32px] bg-gray-50/40 border border-gray-100 text-center transition-all duration-600 hover:bg-white hover:shadow-lg">
                         <div className="text-4xl md:text-5xl font-black text-gray-900 mb-2 tracking-tighter">{stat.value}</div>
                         <div className="text-[9.5px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {section.type === "table" && section.table && (
                  <div className="overflow-x-auto rounded-[28px] border border-gray-100 bg-white shadow-inner">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-50/60">
                          {section.table.headers.map((h, i) => (
                            <th key={i} className="p-5 text-[9.5px] font-black text-gray-400 uppercase tracking-widest">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {section.table.rows.map((row, i) => (
                          <tr key={i} className="hover:bg-blue-50/20 transition-colors">
                            {row.map((cell, j) => (
                              <td key={j} className={`p-5 text-base ${j === 0 ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {section.type === "faq" && section.faqs && (
                  <div className="space-y-4">
                    {section.faqs.map((faq, i) => (
                      <details key={i} className="group/faq rounded-2xl border border-gray-100 bg-gray-50/50 transition-all duration-500 hover:border-blue-200 overflow-hidden">
                        <summary className="p-6 md:p-7 font-semibold cursor-pointer list-none flex justify-between items-center text-gray-900 hover:text-[#116dff] transition-colors">
                          <span className="text-lg md:text-xl uppercase italic">{faq.q}</span>
                          <div className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center group-open/faq:rotate-180 transition-all duration-600 bg-white">
                            <ChevronDown className="w-5 h-5" />
                          </div>
                        </summary>
                        <div className="px-6 md:px-7 pb-8 pt-2 border-t border-gray-100 bg-white/60">
                          <p className="text-base md:text-lg text-gray-600 leading-relaxed font-light">{faq.a}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export function ProductknowMoreSection({ translations, locale, country }: { 
  translations: any; 
  locale: string; 
  country: string; 
}) {
  // Geo fetch – same as other sections
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
  const location = locationParts.length > 0 ? locationParts.join(', ') : 'your city';

  const rawData = translations?.productKnowMore;
  const t: KnowMoreData = (rawData?.productKnowMore ? rawData.productKnowMore : rawData) ?? {
    title: "KNOWLEDGE BASE",
    summary: "Everything you need to know about building digital products in your region...",
    knowMore: "SHOW MORE DETAILS",
    knowLess: "HIDE DETAILS",
    sections: []
  };

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="knowledge" className="py-32 md:py-40 bg-[#f8faff] relative overflow-hidden min-h-[400px]">

      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #116dff 1px, transparent 0)`, backgroundSize: '38px 38px' }} />
      
      <div className="container mx-auto px-5 sm:px-6 md:px-10 lg:px-12 relative z-10">
        
        {/* Module Header – smaller & localized */}
        <div className="max-w-5xl mx-auto text-center space-y-8 md:space-y-10 mb-20 md:mb-28">
          <div className="flex items-center justify-center gap-5">
            <div className="h-px w-16 bg-gray-200" />
            <Terminal className="w-4.5 h-4.5 text-gray-400" />
            <span className="text-[10px] font-black tracking-[0.45em] text-gray-400 uppercase">Local_Knowledge_001</span>
            <div className="h-px w-16 bg-gray-200" />
          </div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-gray-900 uppercase leading-[0.82]">
            {t.title} <span className="text-[#116dff]">in {geoLoading ? '...' : location}</span>
          </h2>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed font-light max-w-3xl mx-auto italic">
            {geoLoading 
              ? t.summary 
              : t.summary.replace(/your\s+city|region|location/gi, location)}
          </p>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="group relative inline-flex items-center gap-6 px-10 py-5 rounded-[28px] bg-white border border-gray-100 hover:border-[#116dff]/30 transition-all duration-400 active:scale-98 shadow-lg hover:shadow-xl"
          >
            <div className="flex flex-col items-start text-left">
               <span className="text-[9.5px] font-black tracking-[0.18em] text-gray-400 uppercase mb-0.5">State: {isExpanded ? 'Expanded' : 'Collapsed'}</span>
               <span className="text-base md:text-lg font-black tracking-wider text-[#116dff] uppercase">
                 {isExpanded ? t.knowLess : t.knowMore}
               </span>
            </div>
            <div className={`w-12 h-12 rounded-2xl bg-[#116dff] text-white flex items-center justify-center transition-all duration-600 shadow-md ${isExpanded ? 'rotate-180 bg-gray-900' : 'rotate-0'}`}>
              <ArrowDownCircle className="w-7 h-7" />
            </div>
          </button>
        </div>

        {/* Expanded Content with 3D Cards */}
        <div
          className={`overflow-hidden transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${
            isExpanded ? "max-h-[18000px] opacity-100 visible" : "max-h-0 opacity-0 invisible"
          }`}
        >
          <div className="max-w-6xl mx-auto flex flex-col pt-16 md:pt-20 relative">
            {t.sections && Array.isArray(t.sections) && t.sections.map((section, idx) => (
              <KnowledgeCard 
                key={idx} 
                section={section} 
                index={idx} 
                isExpanded={isExpanded} 
                location={location}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M3 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h4c0 3.5-7 4.5-7 4.5V21z" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2h-3c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h4c0 3.5-7 4.5-7 4.5V21z" />
    </svg>
  );
}