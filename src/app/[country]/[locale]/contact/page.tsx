
"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Terminal, 
  Cpu, 
  Activity, 
  Globe, 
  Mail, 
  User, 
  MessageSquare, 
  Layers, 
  Hash, 
  Radio,
  Workflow,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Zap,
  Box,
  Binary,
  Building2,
  Rocket,
  Code2,
  Database,
  Smartphone
} from 'lucide-react';

interface ContactViewProps {
  translations: any;
  onNavigate?: (view: 'home' | 'category' | 'contact', slug?: string) => void;
}

const PhaseIndicator = ({ currentStep, totalSteps }: { currentStep: number, totalSteps: number }) => (
  <div className="flex items-center gap-2">
    {Array.from({ length: totalSteps }).map((_, i) => (
      <div key={i} className="flex items-center">
        <div className={`h-1.5 rounded-full transition-all duration-700 ${i + 1 <= currentStep ? 'w-12 bg-indigo-600' : 'w-4 bg-gray-100'}`} />
        {i < totalSteps - 1 && <div className="w-1 h-1 rounded-full bg-gray-200 mx-1" />}
      </div>
    ))}
  </div>
);

const StepWrapper = ({ children, title, subtitle }: { children: React.ReactNode, title: string, subtitle: string }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className="space-y-12"
  >
    <div className="space-y-3">
      <h3 className="text-4xl font-black tracking-tighter text-gray-900 uppercase italic">
        {title}<span className="text-indigo-600">.</span>
      </h3>
      <p className="text-gray-400 font-medium text-lg leading-relaxed">{subtitle}</p>
    </div>
    {children}
  </motion.div>
);

export default function ContactView({ translations, onNavigate }: ContactViewProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    service: 'Custom_Software',
    projectScope: '',
    timeline: '3_Months',
    budgetRange: 'Enterprise',
    phone: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [protocolId] = useState(() => `LEAD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`);

  const handleNext = () => setStep(s => Math.min(s + 1, 4));
  const handleBack = () => setStep(s => Math.max(s - 1, 1));

  const finalizeLead = () => {
    setIsSending(true);
    
    // Construct a high-impact WhatsApp lead manifest
    const message = `*NEW_ARCHLAYER_SOFTWARE_LEAD*%0A%0A` +
      `*ID:* ${protocolId}%0A` +
      `*Partner:* ${formData.name}%0A` +
      `*Company:* ${formData.company}%0A` +
      `*Service:* ${formData.service}%0A` +
      `*Timeline:* ${formData.timeline}%0A` +
      `*Budget:* ${formData.budgetRange}%0A` +
      `*Scope:* ${formData.projectScope}%0A%0A` +
      `*Contact:* ${formData.email} | ${formData.phone}`;

    const whatsappUrl = `https://wa.me/918305838352?text=${message}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsSending(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] pt-40 pb-24 relative overflow-hidden">
      {/* Dynamic Aesthetic Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_50%_50%,#6366f110,transparent_70%)]" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-200 to-transparent" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-20 items-stretch">
          
          {/* LEFT: Lead Telemetry & Context */}
          <div className="lg:col-span-4 flex flex-col justify-between py-4">
            <div className="space-y-12">
              <div className="space-y-6">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-[20px] bg-gray-950 flex items-center justify-center text-white shadow-xl shadow-indigo-100">
                       <Rocket size={24} className="fill-current" />
                    </div>
                    <div>
                       <div className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-1">Growth // Engine</div>
                       <div className="text-xl font-black text-gray-900 tracking-tighter italic uppercase">Lead_Protocol_v5</div>
                    </div>
                 </div>
                 <h1 className="text-huge font-black tracking-tighter leading-[0.8] text-gray-900 uppercase italic">
                   Deploy<br /><span className="text-indigo-600 not-italic">Vision.</span>
                 </h1>
              </div>

              {/* Real-time Data Log Sidebar */}
              <div className="p-8 bg-white border border-gray-100 rounded-[40px] shadow-2xl shadow-indigo-100/50 space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                  <Activity size={12} className="text-indigo-600 animate-pulse" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <span>Transmission_Status</span>
                    <span className="text-indigo-600">Phase_0{step}</span>
                  </div>
                  <PhaseIndicator currentStep={step} totalSteps={4} />
                </div>

                <div className="bg-gray-950 rounded-2xl p-6 font-mono text-[9px] text-gray-500 space-y-3">
                   <div className="text-indigo-400"> REQ_ID: {protocolId}</div>
                   <div className={formData.name ? "text-emerald-500" : ""}> ENTITY_NAME: {formData.name || 'AWAITING...'}</div>
                   <div className={formData.service ? "text-indigo-300" : ""}> SECTOR_TARGET: {formData.service}</div>
                   <div className={formData.budgetRange ? "text-amber-500" : ""}> BUDGET_EST: {formData.budgetRange}</div>
                   <div className="animate-pulse"> _BUFFER_COLLECTING_PAYLOAD...</div>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-6 pt-12">
               <div className="w-px h-12 bg-gray-100" />
               <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed max-w-[200px]">
                 Professional software orchestration. Your lead is encrypted and transmitted directly to our partners.
               </p>
            </div>
          </div>

          {/* RIGHT: The 4-Phase Lead Wizard */}
          <div className="lg:col-span-8">
            <div className="bg-white p-8 md:p-16 lg:p-20 rounded-[60px] border border-gray-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.04)] relative min-h-[650px] flex flex-col justify-between">
              
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <StepWrapper key="step1" title="Phase 01: Identity" subtitle="Register your identity and organization to begin the handshake.">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-2">Partner_Name</label>
                        <input 
                          type="text" 
                          placeholder="Your Full Name..."
                          className="w-full bg-gray-50 border-none rounded-2xl p-6 text-sm font-bold text-gray-900 focus:ring-4 ring-indigo-50 transition-all placeholder:text-gray-300"
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-2">Organization</label>
                        <input 
                          type="text" 
                          placeholder="Company / Agency..."
                          className="w-full bg-gray-50 border-none rounded-2xl p-6 text-sm font-bold text-gray-900 focus:ring-4 ring-indigo-50 transition-all placeholder:text-gray-300"
                          value={formData.company}
                          onChange={e => setFormData({...formData, company: e.target.value})}
                        />
                      </div>
                      <div className="space-y-4 md:col-span-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-2">Corporate_Email</label>
                        <input 
                          type="email" 
                          placeholder="you@company.com"
                          className="w-full bg-gray-50 border-none rounded-2xl p-6 text-sm font-bold text-gray-900 focus:ring-4 ring-indigo-50 transition-all placeholder:text-gray-300"
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                    </div>
                  </StepWrapper>
                )}

                {step === 2 && (
                  <StepWrapper key="step2" title="Phase 02: Expertise" subtitle="Which technical sector requires architectural intervention?">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[
                        { id: 'Custom_Software', icon: Code2, label: 'Software' },
                        { id: 'AI_Automation', icon: Cpu, label: 'AI/ML' },
                        { id: 'Mobile_App', icon: Smartphone, label: 'Mobile' },
                        { id: 'Cloud_SaaS', icon: Globe, label: 'SaaS' },
                        { id: 'Web_Platform', icon: Layers, label: 'Web' },
                        { id: 'Backend_DB', icon: Database, label: 'Infra' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setFormData({...formData, service: item.id})}
                          className={`flex flex-col items-center gap-4 p-8 rounded-3xl border-2 transition-all group
                            ${formData.service === item.id ? 'border-indigo-600 bg-indigo-50/30' : 'border-gray-50 hover:border-gray-100'}
                          `}
                        >
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all
                            ${formData.service === item.id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200' : 'bg-white text-gray-300 group-hover:text-indigo-600'}
                          `}>
                             <item.icon size={24}/>
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </StepWrapper>
                )}

                {step === 3 && (
                  <StepWrapper key="step3" title="Phase 03: Blueprint" subtitle="Outline the project scope and expected transmission payload.">
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-2">Project_Brief</label>
                        <textarea 
                          placeholder="What problem are we solving together? Define the scope..."
                          className="w-full bg-gray-50 border-none rounded-[32px] p-10 text-lg font-medium text-gray-900 focus:ring-4 ring-indigo-50 transition-all placeholder:text-gray-300 min-h-[220px] resize-none"
                          value={formData.projectScope}
                          onChange={e => setFormData({...formData, projectScope: e.target.value})}
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-2">Velocity_Goal (Timeline)</label>
                        <div className="flex flex-wrap gap-4">
                           {['< 1 Month', '1-3 Months', '3-6 Months', 'Long_Term'].map(time => (
                              <button
                                key={time}
                                type="button"
                                onClick={() => setFormData({...formData, timeline: time})}
                                className={`px-8 py-3 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all
                                  ${formData.timeline === time ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-gray-100 text-gray-400 hover:border-indigo-600'}
                                `}
                              >
                                {time}
                              </button>
                           ))}
                        </div>
                      </div>
                    </div>
                  </StepWrapper>
                )}

                {step === 4 && (
                  <StepWrapper key="step4" title="Phase 04: Finalize" subtitle="Initialize the secure linkage via WhatsApp for rapid deployment.">
                    <div className="space-y-8">
                      <div className="grid md:grid-cols-2 gap-8">
                         <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-2">WhatsApp_Comm</label>
                          <input 
                            type="tel" 
                            placeholder="+91 XXXX XXX XXX"
                            className="w-full bg-gray-50 border-none rounded-2xl p-6 text-sm font-bold text-gray-900 focus:ring-4 ring-indigo-50 transition-all"
                            value={formData.phone}
                            onChange={e => setFormData({...formData, phone: e.target.value})}
                          />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-2">Budget_Allocation</label>
                          <select 
                            className="w-full bg-gray-50 border-none rounded-2xl p-6 text-sm font-bold text-gray-900 focus:ring-4 ring-indigo-50 transition-all appearance-none"
                            value={formData.budgetRange}
                            onChange={e => setFormData({...formData, budgetRange: e.target.value})}
                          >
                             <option value="MVP_Scale">MVP_Scale ($5k - $15k)</option>
                             <option value="Enterprise">Enterprise ($15k - $50k)</option>
                             <option value="Global">Global_Infra ($50k+)</option>
                             <option value="Not_Set">To Be Determined</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="p-10 rounded-[40px] bg-indigo-50/50 border border-indigo-100 space-y-6 text-left">
                         <div className="flex items-center gap-4">
                            <ShieldCheck size={24} className="text-indigo-600" />
                            <h4 className="text-lg font-black text-gray-900 uppercase tracking-tighter italic">Transmission_Ready</h4>
                         </div>
                         <p className="text-sm text-indigo-400 font-medium leading-relaxed">
                           You are initiating a high-priority business signal. ArchLayer's executive architects will review your project manifest (ID: {protocolId}) and establish visual contact shortly.
                         </p>
                      </div>
                    </div>
                  </StepWrapper>
                )}
              </AnimatePresence>

              {/* Functional Control Cluster */}
              <div className="flex items-center justify-between pt-16 border-t border-gray-50 mt-12">
                 <button
                  onClick={handleBack}
                  disabled={step === 1 || isSending}
                  className={`flex items-center gap-4 px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all
                    ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-400 hover:text-indigo-600 hover:bg-gray-50'}
                  `}
                 >
                   <ChevronLeft size={16} /> Back
                 </button>

                 {step < 4 ? (
                   <button
                    onClick={handleNext}
                    className="flex items-center gap-6 px-14 py-6 bg-black text-white rounded-[24px] text-[10px] font-black uppercase tracking-[0.4em] hover:bg-indigo-600 transition-all active:scale-95 shadow-2xl shadow-indigo-100"
                   >
                     Phase_0{step + 1} Engagement
                     <ChevronRight size={18} />
                   </button>
                 ) : (
                   <button
                    onClick={finalizeLead}
                    disabled={isSending}
                    className={`flex items-center gap-8 px-20 py-7 rounded-[28px] text-[12px] font-black uppercase tracking-[0.5em] transition-all shadow-2xl active:scale-95
                      ${isSending ? 'bg-gray-100 text-gray-300' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200'}
                    `}
                   >
                     {isSending ? (
                       <>Syncing Manifest... <Activity size={20} className="animate-spin" /></>
                     ) : (
                       <>Engage Protocol <Send size={20} /></>
                     )}
                   </button>
                 )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
