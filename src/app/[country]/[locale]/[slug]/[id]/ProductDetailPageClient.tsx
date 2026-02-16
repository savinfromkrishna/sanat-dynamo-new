"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Star,
  Check,
  ChevronLeft,
  ChevronRight,
  Shield,
  RefreshCw,
  Heart,
  MapPin,
  Terminal,
  Activity,
  Cpu,
  Fingerprint,
  Globe,
  Binary,
  ArrowRight,
  Hash,
  Box,
  Zap,
  ShieldCheck,
  Package,
  Sparkles,
  ArrowUpRight,
  Maximize2
} from "lucide-react"

interface ProductDetail {
  name: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  description: string;
  rating: number;
  reviews: number;
  gallery: string[];
  badges: Array<{ text: string; color: string }>;
  perBottleSuffix: string;
  supply: string;
  whyChoose: string[];
  whatIs: string[];
  howItWorks: string[];
  benefits: string[];
  ingredients: Array<{ name: string; note: string }>;
  howToUse: string[];
  trust: Array<{ image: string; alt: string }>;
  pros: string[];
  cons: string[];
  productReviews: Array<{ id: string; name: string; location: string; rating: number; text: string; verified: boolean }>;
  faqs: Array<{ q: string; a: string }>;
  affiliateUrl: string;
}

interface ProductDetailPageClientProps {
  product: ProductDetail
  translations: any
  locale: string
  country: string
  categoryKey: string
  slug: string
  relatedProducts: any[]
  id?: string;
}

const StudioBadge = ({ children }: { children: React.ReactNode }) => (
  <div className="px-3 py-1 bg-white border border-gray-100 shadow-sm rounded-full text-[10px] font-semibold tracking-wider text-gray-500 flex items-center gap-2">
    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
    {children}
  </div>
);

export default function ProductDetailPageClient({
  product,
  locale,
  categoryKey,
  country,
  slug,
  relatedProducts,
  id
}: ProductDetailPageClientProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedTab, setSelectedTab] = useState<"benefits" | "ingredients" | "howToUse">("benefits")

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % product.gallery.length)
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + product.gallery.length) % product.gallery.length)

  return (
    <div className="min-h-screen bg-[#fcfcfd] pt-24 pb-20 selection:bg-indigo-600 selection:text-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* LEFT: The Gallery Display */}
          <div className="w-full lg:w-[55%] sticky top-32">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-50/50 to-purple-50/50 blur-3xl opacity-50 -z-10 rounded-[60px]" />
              
              <div className="bg-white rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] overflow-hidden relative aspect-[4/5] md:aspect-square flex items-center justify-center p-12">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 1.05 }}
                    transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                    src={product.gallery[currentImageIndex] || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </AnimatePresence>

                {/* Floating Nav Handles */}
                <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <button onClick={prevImage} className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md shadow-lg flex items-center justify-center hover:bg-white transition-all active:scale-90"><ChevronLeft size={20}/></button>
                  <button onClick={nextImage} className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md shadow-lg flex items-center justify-center hover:bg-white transition-all active:scale-90"><ChevronRight size={20}/></button>
                </div>

                <div className="absolute top-6 right-6">
                   <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-indigo-600 transition-colors"><Maximize2 size={18} /></button>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-4 mt-8 justify-center overflow-x-auto no-scrollbar py-2">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-20 h-20 rounded-2xl bg-white shadow-sm border-2 transition-all flex-shrink-0 p-3 overflow-hidden ${idx === currentImageIndex ? "border-indigo-600 scale-110 shadow-indigo-100" : "border-transparent opacity-60 hover:opacity-100"}`}
                  >
                    <img src={img} className="w-full h-full object-contain" alt="thumb" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Sophisticated Controls */}
          <div className="w-full lg:w-[45%] space-y-12">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                {product.badges.map((badge, idx) => (
                  <StudioBadge key={idx}>{badge.text}</StudioBadge>
                ))}
              </div>
              
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                  {product.name.split('–')[0]}
                </h1>
                <p className="text-lg md:text-xl text-gray-400 font-medium leading-relaxed max-w-lg">
                  {product.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-200"} />
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-900">{product.rating} <span className="text-gray-300 font-medium">/ 5.0 Rating</span></span>
                <div className="h-4 w-px bg-gray-200" />
                <span className="text-sm font-bold text-indigo-600 uppercase tracking-widest">{product.reviews.toLocaleString()} Verified Clients</span>
              </div>
            </div>

            <div className="p-8 rounded-[32px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-50 space-y-8">
              <div className="flex items-baseline justify-between">
                <div className="space-y-1">
                   <div className="flex items-baseline gap-3">
                      <span className="text-5xl font-black text-gray-900 tracking-tighter">${product.price}</span>
                      <span className="text-xl text-gray-300 line-through font-light">${product.originalPrice}</span>
                   </div>
                   <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{product.perBottleSuffix} // {product.supply}</p>
                </div>
                <div className="bg-indigo-50 px-3 py-1.5 rounded-xl text-indigo-600 text-xs font-bold uppercase tracking-tighter">
                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% Savings
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 rounded-2xl bg-gray-50/50 border border-gray-100 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-indigo-600"><MapPin size={18}/></div>
                    <div className="flex flex-col">
                       <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ships to</span>
                       <span className="text-xs font-bold text-gray-900">{country} (5-7 Days)</span>
                    </div>
                 </div>
                 <div className="p-4 rounded-2xl bg-gray-50/50 border border-gray-100 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-indigo-600"><ShieldCheck size={18}/></div>
                    <div className="flex flex-col">
                       <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Warranty</span>
                       <span className="text-xs font-bold text-gray-900">60-Day Guarantee</span>
                    </div>
                 </div>
              </div>

              <button className="w-full bg-gray-900 text-white font-bold uppercase text-xs tracking-[0.3em] py-6 rounded-2xl hover:bg-indigo-600 transition-all shadow-[0_20px_40px_-10px_rgba(79,70,229,0.3)] active:scale-95 flex items-center justify-center gap-4 group">
                Purchase Initial Package
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex justify-center gap-6 pt-2">
                 <div className="flex items-center gap-2 opacity-40 grayscale group hover:grayscale-0 hover:opacity-100 transition-all">
                    <Package size={16} />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Instant Deploy</span>
                 </div>
                 <div className="flex items-center gap-2 opacity-40 grayscale group hover:grayscale-0 hover:opacity-100 transition-all">
                    <Sparkles size={16} />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Premium Support</span>
                 </div>
              </div>
            </div>

            <div className="space-y-6">
               <h3 className="text-sm font-bold text-gray-900 uppercase tracking-[0.3em]">System Attributes</h3>
               <div className="grid grid-cols-1 gap-4">
                  {product.benefits.slice(0, 3).map((benefit, i) => (
                    <div key={i} className="flex items-center gap-4 group cursor-default">
                       <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all"><Check size={14}/></div>
                       <span className="text-base font-medium text-gray-600 group-hover:text-gray-900 transition-colors">{benefit}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* SYNOPSIS SECTION */}
      <section className="mt-40 py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-50/30 opacity-50" />
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.4em]">Architecture Deep Dive</span>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">
              The Framework for <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Peak Resilience.</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed text-balanced">
              {product.description}
            </p>
          </div>
        </div>
      </section>

      {/* DYNAMIC TABS SECTION */}
      <section className="py-40 bg-[#fcfcfd]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col gap-16">
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { id: "benefits", label: "Protocol Benefits" },
                { id: "ingredients", label: "Component Registry" },
                { id: "howToUse", label: "Execution Logic" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id as any)}
                  className={`px-8 py-4 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] transition-all
                    ${selectedTab === tab.id ? 'bg-gray-900 text-white shadow-xl' : 'bg-white text-gray-400 hover:text-gray-900 shadow-sm'}
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="max-w-5xl mx-auto w-full">
              <motion.div 
                layout
                className="bg-white rounded-[48px] p-12 lg:p-20 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.04)] border border-gray-50 relative overflow-hidden"
              >
                 <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedTab}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      {selectedTab === "benefits" && (
                        <div className="grid md:grid-cols-2 gap-12">
                          {product.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-start gap-6 group">
                              <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all shrink-0"><Zap size={20} /></div>
                              <div className="space-y-2">
                                <span className="text-xl font-bold text-gray-900 block">{benefit}</span>
                                <p className="text-sm text-gray-400 font-medium">Engineered for sub-millisecond response and peak structural load.</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {selectedTab === "ingredients" && (
                        <div className="grid md:grid-cols-2 gap-10">
                          {product.ingredients.map((ingredient, idx) => (
                            <div key={idx} className="p-8 rounded-3xl bg-gray-50/50 border border-gray-100 hover:bg-white hover:shadow-lg transition-all duration-500">
                              <h4 className="text-lg font-extrabold text-gray-900 mb-2">{ingredient.name}</h4>
                              <p className="text-sm text-gray-500 font-medium leading-relaxed">{ingredient.note}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {selectedTab === "howToUse" && (
                        <div className="grid gap-6">
                          {product.howToUse.map((instruction, idx) => (
                            <div key={idx} className="flex items-center gap-10 p-8 bg-gray-50/30 rounded-3xl group">
                              <div className="text-4xl font-black text-gray-100 group-hover:text-indigo-600 transition-colors shrink-0">0{idx + 1}</div>
                              <p className="text-lg font-bold text-gray-700">{instruction}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                 </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section className="py-40 bg-gray-900 relative overflow-hidden rounded-t-[60px] md:rounded-t-[100px]">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent)] pointer-events-none" />
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
           <div className="max-w-3xl mb-24">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.4em] mb-6 block">Validation Logs</span>
              <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                Verified by Global <br />Architecture Teams.
              </h2>
           </div>

           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {product.productReviews.map((review) => (
               <div key={review.id} className="bg-white/5 backdrop-blur-xl rounded-[40px] border border-white/10 p-10 flex flex-col hover:bg-white/10 transition-all duration-500 group">
                  <div className="flex items-center gap-1 mb-8">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className={i < review.rating ? "fill-amber-400 text-amber-400" : "text-white/20"} />
                    ))}
                  </div>
                  <p className="text-xl text-gray-300 font-light leading-relaxed italic mb-12">"{review.text}"</p>
                  <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-8">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white"><Box size={20} /></div>
                        <div className="flex flex-col">
                           <span className="text-sm font-bold text-white">{review.name}</span>
                           <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">{review.location}</span>
                        </div>
                     </div>
                     {review.verified && (
                       <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-white"><Check size={14} strokeWidth={3}/></div>
                     )}
                  </div>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* FINAL DEPLOYMENT CTA */}
      <section className="py-48 text-center bg-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto space-y-12">
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight">
              Ready to <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 animate-gradient">Deploy System?</span>
            </h2>
            <p className="text-lg text-gray-400 font-medium max-w-lg mx-auto">
              Join over 1,200 enterprise clusters utilizing ArchLayer for high-throughput digital orchestration.
            </p>
            <button className="px-12 py-8 rounded-full bg-gray-900 text-white font-bold uppercase text-sm tracking-[0.3em] hover:bg-indigo-600 transition-all shadow-2xl shadow-indigo-200 flex items-center gap-6 mx-auto group">
              Get Started Now
              <ArrowUpRight size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description,
            image: product.gallery[0] || "/placeholder.svg",
            offers: {
              "@type": "Offer",
              price: product.price,
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: product.rating,
              reviewCount: product.reviews,
            },
          }),
        }}
      />
    </div>
  )
}