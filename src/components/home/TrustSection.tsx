
"use client"
import React from "react";
import { ShieldCheck, Activity, Terminal, Lock, Cpu, Globe, ShieldAlert } from "lucide-react";

export function TrustSection({ translations }: { translations: any }) {
  const t = translations;

  if (!t.trust) return null;

  return (
    <section id="trust" className="py-40 bg-[#f0f4f9] relative overflow-hidden">
      {/* Visual Background: Subtle Blue Grids and Ambient Glows */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#116dff 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Professional Header */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-28 space-y-8">
          <div className="inline-flex items-center gap-4 px-5 py-2 rounded-full border border-blue-100 bg-white shadow-sm">
             <div className="w-2 h-2 rounded-full bg-[#116dff] animate-pulse" />
             <span className="text-[10px] font-black tracking-[0.3em] text-blue-600 uppercase">Verification_Protocol_v9.0</span>
          </div>
          
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-gray-900 uppercase leading-[0.85]">
            Certified<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#116dff] to-blue-400">Integrity.</span>
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed font-light max-w-2xl">
            {t.trust.description || "Our infrastructure undergoes continuous multi-layered validation to ensure absolute compliance with global security standards."}
          </p>
        </div>

        {/* Technical Badge Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {t.trust.badges.map((badge: any, index: number) => (
            <div 
              key={index} 
              className="group relative flex flex-col items-center p-10 rounded-[40px] bg-white border border-gray-100 hover:border-[#116dff]/30 transition-all duration-700 hover:-translate-y-4 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)]"
            >
              {/* Internal Scanning Beam */}
              <div className="absolute inset-0 overflow-hidden rounded-[40px] pointer-events-none">
                 <div className="absolute top-[-100%] left-0 w-full h-24 bg-gradient-to-b from-transparent via-[#116dff]/5 to-transparent group-hover:animate-[scan_2s_linear_infinite]" />
              </div>
              
              <div className="relative w-32 h-32 mb-10 transition-transform duration-700 group-hover:scale-110">
                <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <img
                  src={badge.image || "/placeholder.svg"}
                  alt={badge.alt}
                  className="w-full h-full object-contain filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                />
              </div>
              
              <div className="text-center">
                 <div className="flex items-center justify-center gap-2 mb-3">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#116dff]" />
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em]">Module_Validated</span>
                 </div>
                 <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest group-hover:text-[#116dff] transition-colors">
                   {badge.alt}
                 </h3>
              </div>

              {/* Design Handles Aesthetic */}
              <div className="absolute top-4 left-4 w-1.5 h-1.5 bg-white border border-gray-200 group-hover:border-[#116dff] transition-colors" />
              <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-white border border-gray-200 group-hover:border-[#116dff] transition-colors" />
              <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-white border border-gray-200 group-hover:border-[#116dff] transition-colors" />
              <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-white border border-gray-200 group-hover:border-[#116dff] transition-colors" />
            </div>
          ))}
        </div>

        {/* Telemetry Bar */}
        <div className="mt-32 p-10 rounded-[40px] bg-white border border-gray-100 shadow-xl flex flex-wrap justify-between items-center gap-12 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#116dff]/20 to-transparent" />
           
           <div className="flex items-center gap-6 group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#116dff] border border-blue-100 group-hover:bg-[#116dff] group-hover:text-white transition-all duration-500">
                 <Activity className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                 <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Response_Time</span>
                 <span className="text-sm font-bold text-gray-900 group-hover:text-[#116dff] transition-colors">0.42ms Global Latency</span>
              </div>
           </div>

           <div className="flex items-center gap-6 group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#116dff] border border-blue-100 group-hover:bg-[#116dff] group-hover:text-white transition-all duration-500">
                 <Globe className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                 <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Redundancy</span>
                 <span className="text-sm font-bold text-gray-900 group-hover:text-[#116dff] transition-colors">Tier-4 Distributed Cluster</span>
              </div>
           </div>

           <div className="flex items-center gap-6 group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#116dff] border border-blue-100 group-hover:bg-[#116dff] group-hover:text-white transition-all duration-500">
                 <ShieldAlert className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                 <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Encryption</span>
                 <span className="text-sm font-bold text-gray-900 group-hover:text-[#116dff] transition-colors">AES-256 Protocol</span>
              </div>
           </div>

           <div className="hidden lg:flex items-center gap-3">
              <div className="flex flex-col items-end">
                 <span className="text-[8px] font-black text-gray-300 uppercase tracking-widest">Network_Stability</span>
                 <span className="text-[10px] font-mono text-[#116dff] font-bold">OPTIMAL_99.9%</span>
              </div>
              <div className="w-16 h-1 bg-gray-100 rounded-full overflow-hidden">
                 <div className="h-full bg-[#116dff] w-[94%]" />
              </div>
           </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: -100%; }
          100% { top: 200%; }
        }
      `}</style>
    </section>
  );
}
