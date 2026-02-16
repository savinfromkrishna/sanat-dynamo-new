"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Zap, 
  Globe, 
  Terminal, 
  Cpu, 
  Activity, 
  ArrowUpRight, 
  ShieldCheck, 
  Layers, 
  Github, 
  Twitter, 
  Linkedin,
  MapPin,
  ChevronRight,
  Database,
  Search,
  Settings
} from 'lucide-react';

interface FooterProps {
  translations: any;
  onNavigate?: (view: 'home' | 'category', slug?: string) => void;
}

const FooterLink = ({ children, onClick, href = "#" }: { children: React.ReactNode, onClick?: () => void, href?: string }) => (
  <a 
    href={href}
    onClick={(e) => {
      if (onClick) {
        e.preventDefault();
        onClick();
      }
    }}
    className="group flex items-center gap-2 text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-[0.25em] transition-all duration-500 cursor-pointer"
  >
    <span className="w-0 group-hover:w-4 h-[1px] bg-indigo-500 transition-all duration-500 ease-out" />
    <span className="group-hover:translate-x-1 transition-transform duration-500">{children}</span>
  </a>
);

const TelemetryNode = ({ label, value, colorClass = "text-indigo-400" }: { label: string, value: string, colorClass?: string }) => {
  const [displayValue, setDisplayValue] = useState(value);
  
  // Simulate jitter for that "live data" look
  useEffect(() => {
    if (value.includes('.')) {
      const interval = setInterval(() => {
        const num = parseFloat(value);
        const jitter = (Math.random() - 0.5) * 0.01;
        setDisplayValue((num + jitter).toFixed(3) + "ms");
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [value]);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center text-[8px] font-black text-gray-600 uppercase tracking-widest">
        <span>{label}</span>
        <span className={colorClass}>{displayValue}</span>
      </div>
      <div className="h-1 bg-white/5 rounded-full overflow-hidden relative">
        <motion.div 
          className={`h-full bg-current ${colorClass.replace('text', 'bg')}`}
          initial={{ width: "0%" }}
          animate={{ width: "75%" }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <motion.div 
          className="absolute inset-0 bg-white/20"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
};

export default function Footer({ translations, onNavigate }: FooterProps) {
  const footerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <footer ref={footerRef} className=" text-slate-600  relative overflow-hidden">
      {/* Advanced Background Layers */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: `radial-gradient(#6366f1 1px, transparent 0)`, backgroundSize: '40px 40px' }} 
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
      
      {/* Animated Scanline Effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent h-1/2 w-full pointer-events-none -z-0"
        animate={{ y: ["-100%", "200%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      <motion.div 
        style={{ opacity, y }}
        className="container mx-auto px-6 lg:px-12 relative z-10"
      >
        <div className="flex flex-col gap-32">
          
          {/* Header Deck: Brand Identity */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: 90 }}
                  className="w-16 h-16 bg-indigo-600 rounded-[22px] flex items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.3)] cursor-pointer transition-all"
                >
                  <Zap size={32} className="fill-current" />
                </motion.div>
                <div className="space-y-1">
                  <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[8px] font-black uppercase tracking-[0.3em] text-indigo-400 inline-block">
                    Architectural_Node // ID: AL-992-0
                  </div>
                  <h2 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8]">
                    ARCH<span className="text-indigo-600 italic">LAYER</span>
                  </h2>
                </div>
              </div>
            </div>
            
            <div className="lg:text-right space-y-6">
              <p className="text-gray-500 text-sm font-medium max-w-sm lg:ml-auto leading-relaxed uppercase tracking-tight">
                Crafting resilient digital architecture for high-throughput enterprise systems. We blend boutique design with mission-critical performance.
              </p>
              <div className="flex flex-wrap lg:justify-end gap-3">
                {[Github, Twitter, Linkedin].map((Icon, idx) => (
                  <motion.button 
                    key={idx}
                    whileHover={{ y: -4, backgroundColor: "rgb(79, 70, 229)" }}
                    className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all group"
                  >
                    <Icon size={20} className="group-hover:scale-110 transition-transform" />
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Core Navigation Deck */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-24 pt-24 border-t border-white/5">
            <div className="space-y-10">
              <h4 className="text-[11px] font-black text-white uppercase tracking-[0.5em] flex items-center gap-3">
                <Layers size={14} className="text-indigo-500" /> Sector_Registry
              </h4>
              <ul className="space-y-5">
                <li><FooterLink onClick={() => onNavigate?.('category', 'web-dev')}>Web_Systems</FooterLink></li>
                <li><FooterLink onClick={() => onNavigate?.('category', 'ai-solutions')}>Intelligence_Nodes</FooterLink></li>
                <li><FooterLink onClick={() => onNavigate?.('category', 'cloud-devops')}>Cloud_Elasticity</FooterLink></li>
                <li><FooterLink onClick={() => onNavigate?.('category', 'cybersecurity')}>Deep_Security</FooterLink></li>
              </ul>
            </div>

            <div className="space-y-10">
              <h4 className="text-[11px] font-black text-white uppercase tracking-[0.5em] flex items-center gap-3">
                <Terminal size={14} className="text-indigo-500" /> Infrastructure
              </h4>
              <ul className="space-y-5">
                <li><FooterLink>Documentation</FooterLink></li>
                <li><FooterLink>API_Deployment</FooterLink></li>
                <li><FooterLink>Node_Status</FooterLink></li>
                <li><FooterLink>Logic_Library</FooterLink></li>
              </ul>
            </div>

            <div className="space-y-10">
              <h4 className="text-[11px] font-black text-white uppercase tracking-[0.5em] flex items-center gap-3">
                <Cpu size={14} className="text-indigo-500" /> The_Studio
              </h4>
              <ul className="space-y-5">
                <li><FooterLink>The_Architects</FooterLink></li>
                <li><FooterLink>Our_Methodology</FooterLink></li>
                <li><FooterLink>Project_Journal</FooterLink></li>
                <li><FooterLink>Connect_Node</FooterLink></li>
              </ul>
            </div>

            {/* Advanced Network Telemetry Box */}
            <div className="space-y-10">
              <h4 className="text-[11px] font-black text-white uppercase tracking-[0.5em] flex items-center gap-3">
                <Globe size={14} className="text-indigo-500" /> Global_Ops
              </h4>
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-8 relative group hover:border-indigo-500/30 transition-all">
                <div className="absolute top-4 right-4">
                  <Activity size={12} className="text-emerald-500 animate-pulse" />
                </div>
                
                <div className="space-y-6">
                  <TelemetryNode label="System_Latency" value="0.018ms" />
                  <TelemetryNode label="Global_Throughput" value="128/s" colorClass="text-emerald-400" />
                  <TelemetryNode label="Cache_Efficiency" value="99.992%" colorClass="text-purple-400" />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-gray-950 bg-gray-800" />
                    ))}
                  </div>
                  <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Active_Architects</span>
                </div>

                <button className="w-full py-4 bg-white text-black rounded-xl text-[9px] font-black uppercase tracking-[0.2em] hover:bg-indigo-600 hover:text-white transition-all active:scale-95">
                  Initialize_Connectivity
                </button>
              </div>
            </div>
          </div>

          {/* Footer Metrics & Legal */}
          <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex flex-col md:flex-row items-center gap-12">
               <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">Core_Deploy_Stable</span>
                  <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">© 2024 ArchLayer Systems Ltd.</span>
               </div>
               <div className="flex flex-wrap justify-center gap-8">
                 <FooterLink href="#">Privacy_Protocol</FooterLink>
                 <FooterLink href="#">Service_Agreement</FooterLink>
                 <FooterLink href="#">Node_Security</FooterLink>
               </div>
            </div>
            
            <div className="flex items-center gap-16">
               <div className="flex items-center gap-4 group cursor-default">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)] group-hover:animate-ping" />
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Protocol_Health</span>
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">OPERATIONAL</span>
                  </div>
               </div>
               <div className="hidden sm:flex items-center gap-4 group cursor-default">
                  <MapPin size={16} className="text-indigo-500 group-hover:translate-y-[-2px] transition-transform" />
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">System_Location</span>
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">SAN_FRANCISCO_CA</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
