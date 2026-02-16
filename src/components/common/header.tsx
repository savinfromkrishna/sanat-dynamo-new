
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import {
  Search,
  Menu,
  X,
  ChevronDown,
  Cpu,
  Shield,
  Terminal,
  Globe,
  Layers,
  Layout,
  Code2,
  Rocket,
  ArrowRight,
  Command,
  Activity,
  Box,
  Hash,
  Fingerprint
} from 'lucide-react';
import React from 'react';
import LocalizedLink from '../LocalizedLink';

interface ServiceItemProps {
  name: string;
  icon: React.ReactNode;
  desc: string;
  slug: string;
}

const ServiceItem = ({ name, icon, desc, slug }: ServiceItemProps) => (
  <LocalizedLink
    href={`${slug}`}
    className="group/item flex items-start gap-4 p-5 rounded-[24px] hover:bg-blue-50/50 border border-transparent hover:border-blue-100 transition-all duration-500 ease-out relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-blue-500/0 group-hover/item:from-blue-500/[0.03] transition-all duration-700" />

    <div className="mt-1 p-3 rounded-2xl bg-white shadow-sm border border-gray-100 group-hover/item:border-blue-500/50 group-hover/item:text-blue-600 transition-all duration-500 group-hover/item:scale-110 group-hover/item:rotate-3 relative z-10">
      {React.cloneElement(icon as React.ReactElement<{ size?: number }>, { size: 20 })}
    </div>

    <div className="text-left relative z-10">
      <div className="flex items-center gap-2">
        <p className="text-gray-900 font-bold text-sm tracking-tight group-hover/item:text-blue-600 transition-colors">
          {name}
        </p>
        <div className="h-1 w-1 rounded-full bg-blue-500/20 group-hover/item:w-3 group-hover/item:bg-blue-500 transition-all duration-500" />
      </div>
      <p className="text-gray-400 text-xs mt-1.5 leading-relaxed font-medium line-clamp-2">{desc}</p>
    </div>
  </LocalizedLink>
);

interface MenuItem {
  label: string;
  path: string;
  id?: string;
  mega?: boolean;
  content?: Array<{
    name: string;
    slug: string;
    icon: React.ReactNode;
    desc: string;
  }>;
}

interface HeaderProps {
  translations: {
    nav: {
      home: string;
    };
  };
}

export default function Header({ translations }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const menuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll Progress Logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (id: string) => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    setActiveMenu(id);
  };

  const handleMouseLeave = () => {
    menuTimeoutRef.current = setTimeout(() => setActiveMenu(null), 250);
  };

  const menuItems: MenuItem[] = [
    { label: translations.nav.home, path: '/' },
    {
      label: 'Capabilities',
      path: 'web-dev',
      id: 'services',
      mega: true,
      content: [
        { name: 'Reactive Web', slug: 'web-dev', icon: <Code2 />, desc: 'Atomic design systems & high-performance engines' },
        { name: 'Cloud Core', slug: 'cloud-devops', icon: <Layers />, desc: 'Zero-latency edge distribution & orchestration' },
        { name: 'Mobile Edge', slug: 'mobile-apps', icon: <Layout />, desc: 'Hyper-responsive native multi-platform experiences' },
        { name: 'System Logic', slug: 'ui-ux', icon: <Rocket />, desc: 'Mathematical clarity in human-digital interaction' },
      ],
    },
    {
      label: 'Intelligence',
      path: 'ai-solutions',
      id: 'solutions',
      mega: true,
      content: [
        { name: 'Neural AI', slug: 'ai-solutions', icon: <Cpu />, desc: 'Cognitive LLM integration & vector processing' },
        { name: 'Shield Layer', slug: 'cybersecurity', icon: <Shield />, desc: 'End-to-end cryptographic infrastructure' },
      ],
    },
    { label: 'Connect', path: 'contact' },

  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled
          ? 'py-4 bg-white/70 backdrop-blur-3xl border-b border-black/5 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.03)]'
          : 'py-8 bg-transparent'
        }`}
    >
      {/* Scroll Progress Indicator */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 origin-left z-50"
        style={{ scaleX }}
      />

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Advanced Logo Section */}
        <LocalizedLink href="/" className="group flex items-center gap-5 relative">
          <div className="relative">
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="w-12 h-12 bg-gray-900 rounded-[18px] flex items-center justify-center border border-white/10 relative z-10 overflow-hidden shadow-xl shadow-blue-500/10"
            >
              <Terminal className="text-white" size={24} />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
            {/* Visual Glitch Accents */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse border-2 border-white" />
          </div>

          <div className="flex flex-col text-left">
            <div className="flex items-center gap-2">
              <span className="text-gray-900 font-black tracking-tighter text-2xl leading-none uppercase flex items-center gap-1">
                ArchLayer<span className="text-blue-600 italic"></span>
              </span>
              <div className="h-4 w-[1px] bg-gray-200 hidden sm:block" />
              <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 rounded text-[9px] font-black text-blue-600 tracking-widest uppercase">
                <Activity size={10} className="animate-pulse" /> Live
              </div>
            </div>
            <div className="flex items-center gap-3 mt-1.5 font-mono">
              <span className="text-[9px] text-gray-400 uppercase tracking-[0.2em] font-bold">Node_Active: v4.0.2</span>
              <div className="flex gap-1">
                {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 bg-gray-200 rounded-full" />)}
              </div>
            </div>
          </div>
        </LocalizedLink>

        {/* Technical Nav Menu */}
        <nav className="hidden lg:flex items-center gap-4 bg-gray-50/50 p-1.5 rounded-[22px] border border-black/[0.03]">
          {menuItems.map((item, idx) => {
            const hasMega = item.mega && item.id;

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => hasMega && handleMouseEnter(item.id!)}
                onMouseLeave={handleMouseLeave}
              >
                <LocalizedLink
                  href={item.path}
                  className={`group/nav px-5 py-3 text-xs font-black transition-all duration-500 rounded-2xl flex items-center gap-2.5 uppercase tracking-widest relative overflow-hidden
                    ${activeMenu === item.id ? 'text-blue-600 bg-white shadow-sm' : 'text-gray-400 hover:text-gray-900 hover:bg-white/50'}
                  `}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {item.label === translations.nav.home && <Hash size={12} className="opacity-40" />}
                    {item.label}
                  </span>
                  {hasMega && (
                    <ChevronDown
                      size={14}
                      className={`transition-all duration-500 relative z-10 ${activeMenu === item.id ? 'rotate-180 text-blue-500' : 'opacity-30'
                        }`}
                    />
                  )}
                  {activeMenu === item.id && (
                    <motion.div layoutId="nav-bg" className="absolute inset-0 bg-white rounded-2xl shadow-sm -z-0" />
                  )}
                </LocalizedLink>

                <AnimatePresence>
                  {hasMega && activeMenu === item.id && item.content && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.98, filter: 'blur(10px)' }}
                      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: 10, scale: 0.98, filter: 'blur(15px)' }}
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-5 origin-top z-[250]"
                    >
                      <div className="bg-white/95 border border-black/10 backdrop-blur-[40px] rounded-[36px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden w-[640px] p-8 grid grid-cols-2 gap-4 relative">
                        {/* Interactive Background Elements */}
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/5 blur-[80px] rounded-full" />
                        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/5 blur-[80px] rounded-full" />

                        <div className="col-span-2 flex items-center justify-between mb-4 px-2">
                          <div className="flex items-center gap-2 text-[10px] font-black text-blue-600/40 uppercase tracking-[0.2em]">
                            <Box size={12} /> Component_Modules
                          </div>
                          <div className="h-[1px] flex-grow mx-4 bg-gray-100" />
                        </div>

                        {item.content.map((sub) => (
                          <ServiceItem key={sub.slug} {...sub} />
                        ))}

                        <div className="col-span-2 mt-6 pt-6 border-t border-black/5 flex justify-between items-center px-4">
                          <div className="flex items-center gap-3">
                            <div className="flex -space-x-1.5">
                              {[1, 2, 3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 overflow-hidden shadow-sm" />)}
                            </div>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active_Sessions: 1.2k+</span>
                          </div>
                          <LocalizedLink
                            href="#"
                            className="group/link text-[10px] font-black text-gray-900 flex items-center gap-3 hover:text-blue-600 transition-all uppercase tracking-[0.2em] bg-gray-50 px-5 py-3 rounded-full hover:bg-blue-50"
                          >
                            Documentation
                            <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                          </LocalizedLink>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Global Control Center Mockup */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-1.5 p-1.5 bg-gray-50/50 rounded-2xl border border-black/5 transition-all hover:border-blue-500/20 group">
            <button
              type="button"
              className="p-3 text-gray-400 group-hover:text-blue-600 hover:bg-white rounded-xl transition-all shadow-none hover:shadow-sm"
              aria-label="Search System"
            >
              <Search size={18} />
            </button>
            <div className="w-px h-5 bg-black/5 mx-1" />
            <div className="flex items-center gap-2 px-4 py-2 text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest bg-white rounded-xl shadow-sm border border-black/5">
              <Command size={11} className="text-blue-600" /> K
            </div>
          </div>

          <LocalizedLink
            href="#"
            className="relative px-10 py-4 overflow-hidden group rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-blue-900/10 hover:shadow-blue-900/20 active:scale-95 transition-all"
          >
            <div className="absolute inset-0 bg-gray-900 group-hover:bg-blue-600 transition-all duration-700 ease-out" />
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 text-white flex items-center gap-3">
              <Fingerprint size={16} className="text-blue-400 group-hover:text-white transition-colors" />
              Initialize
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </LocalizedLink>
        </div>

        {/* Mobile Dynamic Trigger */}
        <button
          className={`lg:hidden w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-500 border
            ${isMobileMenuOpen ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/30' : 'bg-gray-50 text-gray-900 border-black/5'}
          `}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Advanced Mobile Matrix Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 top-[84px] bg-white z-[90] lg:hidden flex flex-col"
          >
            <div className="flex-grow p-8 sm:p-12 overflow-y-auto">
              <div className="space-y-16 text-left">
                {menuItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                  >
                    <LocalizedLink
                      href={item.path}
                      className="group flex items-center gap-4 text-5xl font-black text-gray-200 hover:text-gray-900 transition-all duration-500 uppercase tracking-tighter"
                    >
                      <span className="text-blue-500/20 group-hover:text-blue-500 font-mono text-xl">0{i + 1}</span>
                      {item.label}
                    </LocalizedLink>

                    {item.mega && item.content && (
                      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 pl-8 border-l-2 border-blue-100">
                        {item.content.map((sub) => (
                          <LocalizedLink
                            key={sub.slug}
                            href={`#`}
                            className="flex items-center gap-6 py-4 px-6 rounded-3xl bg-gray-50 hover:bg-blue-50 transition-all duration-500 group/sub"
                          >
                            <div className="p-4 rounded-2xl bg-white border border-black/5 group-hover/sub:border-blue-500/30 text-gray-400 group-hover/sub:text-blue-600 transition-all">
                              {React.cloneElement(sub.icon as React.ReactElement<{ size?: number }>, { size: 24 })}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-lg font-black uppercase tracking-tight text-gray-900">{sub.name}</span>
                              <span className="text-xs text-gray-400 font-medium line-clamp-1">{sub.desc}</span>
                            </div>
                          </LocalizedLink>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="p-8 sm:p-12 bg-gray-50 border-t border-black/5 mt-auto flex flex-col gap-8">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><Globe size={18} /></div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Regional_Node</span>
                    <span className="text-xs font-bold text-gray-900">US_EAST_01</span>
                  </div>
                </div>
                <div className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" /> System_Optimized
                </div>
              </div>

              <LocalizedLink
                href="#"
                className="w-full block py-7 bg-gray-900 rounded-[32px] font-black text-lg text-center text-white shadow-2xl shadow-blue-900/20 transition-all uppercase tracking-[0.3em] active:scale-95 hover:bg-blue-600"
              >
                DEPLOY SYSTEM
              </LocalizedLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
