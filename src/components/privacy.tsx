"use client"
import { getCurrentLocale, getTranslation } from '@/lib/i18n';
import { usePathname } from 'next/navigation';

export default function Privacy() {
  const pathname = usePathname();
  const locale = getCurrentLocale(pathname);
  const t = getTranslation(locale);
  const privacy = t.privacy;

  return (
    <div className="bg-white min-h-screen">
      {/* Cinematic Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden bg-slate-900">
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop" 
          alt="Privacy Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="relative z-10 text-center px-4">
          <p className="text-emerald-400 font-bold tracking-[0.3em] uppercase mb-4 text-sm">
            {privacy.lastUpdated}
          </p>
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.9]">
            {privacy.title}
          </h1>
        </div>
      </div>

      {/* Editorial Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="mb-20">
          <p className="text-2xl md:text-3xl font-medium text-slate-800 leading-snug border-l-4 border-emerald-500 pl-8">
            {privacy.introduction}
          </p>
        </div>

        <div className="space-y-24">
          {privacy.sections.map((section: any, index: number) => (
            <section key={index} className="relative">
              <h2 className="text-sm font-black text-emerald-600 tracking-widest uppercase mb-8 flex items-center gap-4">
                <span className="h-[1px] w-8 bg-emerald-600"></span>
                {section.title}
              </h2>

              <div className="pl-0 md:pl-12">
                {section.items ? (
                  <ul className="grid gap-6">
                    {section.items.map((item: string, itemIndex: number) => (
                      <li key={itemIndex} className="text-lg text-slate-600 leading-relaxed flex items-start gap-4">
                        <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-emerald-600 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-lg leading-relaxed text-slate-600">
                    {section.content}
                  </p>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}