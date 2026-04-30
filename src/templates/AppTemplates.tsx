import React from 'react';
import type { AppConfig } from '../config/apps';
import { ChevronLeft, Camera, Zap, Utensils, Lock, BookOpen, Flame, Activity, Trophy, Clock, Cloud, Moon, Shield, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import AppLayout from '../components/AppLayout';

interface TemplateProps {
  app: AppConfig;
  section?: 'privacy' | 'terms' | 'support';
}

const IconMap: Record<string, any> = {
  Camera, Zap, Utensils, Lock, BookOpen, Flame, Activity, Trophy, Clock, Cloud, Moon, ShieldHighlight: Shield, Info
};

const LegalContent: React.FC<TemplateProps> = ({ app, section }) => {
  const content = section === 'privacy' ? app.legal.privacyPolicy : 
                  section === 'terms' ? app.legal.termsOfService : 
                  app.legal.support;
                  
  if (!content) return null;

  return (
    <div className="max-w-3xl mx-auto py-20 px-6">
      <Link to={`/${app.id}`} className="inline-flex items-center gap-2 mb-12 opacity-50 hover:opacity-100 transition-opacity">
        <ChevronLeft size={16} /> Back to {app.name}
      </Link>
      <h1 className="text-4xl font-bold mb-4 capitalize">{section?.replace('-', ' ')}</h1>
      <p className="text-sm opacity-50 mb-12 uppercase tracking-widest">Last Updated: {app.legal.lastUpdated}</p>
      <div className="opacity-80 leading-relaxed space-y-8">
        {content.split('\n\n').map((paragraph, i) => (
          <div key={i} className="space-y-2">
            {paragraph.split('\n').map((line, j) => (
              <p key={j} className={j === 0 && paragraph.includes('\n') ? 'font-bold text-lg' : 'opacity-80'}>
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export const ZenTemplate: React.FC<TemplateProps> = ({ app, section }) => {
  if (section === 'privacy' || section === 'terms' || section === 'support') {
    return (
      <AppLayout app={app}>
        <div className="text-inherit">
          <LegalContent app={app} section={section} />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout app={app}>
      <header className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-sm">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity" style={{ color: app.design.primary }}>
          <ChevronLeft size={20} className="hidden sm:block" />
          <div className="w-8 h-8 rounded-lg overflow-hidden border" style={{ borderColor: `${app.design.primary}33` }}>
            <img src={`/${app.id}.png`} alt={app.name} className="w-full h-full object-cover" />
          </div>
          <span className={`font-black text-xl tracking-tight`}>{app.name}</span>
        </Link>
        <div className="flex items-center gap-6 text-sm font-dm-mono opacity-60">
          <Link to={`/${app.id}/support`} className="hover:opacity-100 transition-opacity">Support</Link>
          <a href={app.externalUrl || app.appStoreUrl} className="text-white px-4 py-2 rounded-full font-bold" style={{ backgroundColor: app.design.primary }}>
            {app.externalUrl ? 'Visit Site' : 'Get App'}
          </a>
        </div>
      </header>

      <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
          <div className="animate-in fade-in slide-in-from-bottom duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-dm-mono font-bold mb-6 uppercase" style={{ backgroundColor: `${app.design.primary}15`, color: app.design.primary }}>
              <Zap size={14} /> {app.category}
            </div>
            <h1 className={`text-6xl md:text-7xl font-black leading-[1.05] tracking-tight mb-8`}>
              {app.marketing.headline}
            </h1>
            <p className="text-xl opacity-60 font-medium mb-10 max-w-lg leading-relaxed">
              {app.marketing.subheadline}
            </p>
            <div className="flex flex-wrap gap-4">
               {app.appStoreUrl && <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform active:scale-95">
                <img src="/appstore.png" alt="Download on App Store" className="h-10" />
              </a>}
              {app.playStoreUrl && <a href={app.playStoreUrl} target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform active:scale-95">
                <img src="/playstore.png" alt="Get it on Google Play" className="h-10" />
              </a>}
              {app.externalUrl && (
                <a href={app.externalUrl} target="_blank" rel="noopener noreferrer" className="text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform active:scale-95" style={{ backgroundColor: app.design.primary }}>
                  Visit Live Site
                </a>
              )}
            </div>
          </div>
          
            <div className="relative w-full flex flex-col items-center pt-20 overflow-hidden">
              {app.marketing.screenshots ? (
                <div className="w-full max-w-[1600px]">
                  {/* Raw Frame Screenshot Showcase */}
                  <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10 px-4">
                    {app.marketing.screenshots.slice(0, 3).map((src, i) => (
                      <div 
                        key={i} 
                        className={`relative group animate-in fade-in slide-in-from-bottom duration-700 delay-[${i * 200}ms] flex-1 max-w-[450px]`}
                      >
                        {/* Subtle Atmospheric Glow */}
                        <div className="absolute -inset-12 bg-gradient-to-tr opacity-0 group-hover:opacity-10 blur-[100px] rounded-full transition-opacity duration-1000" style={{ backgroundImage: `linear-gradient(to top right, ${app.design.primary}, transparent)` }} />
                        
                        <img 
                          src={src} 
                          className="w-full aspect-[9/19] object-cover rounded-none shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] border border-black/5 hover:scale-[1.02] transition-all duration-700" 
                          alt={`Screenshot ${i + 1}`} 
                        />
                        
                        {/* Minimalist Order Badge */}
                        <div className="absolute -top-4 -left-4 w-12 h-12 rounded-none bg-white shadow-xl flex items-center justify-center border border-black/5 z-20 transition-transform group-hover:-translate-y-1">
                           <span className="font-dm-mono text-sm font-black" style={{ color: app.design.primary }}>0{i + 1}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tagline Pill */}
                  <div className="flex justify-center mt-20">
                    <div className="inline-flex items-center gap-6 px-12 py-5 rounded-full bg-black/5 backdrop-blur-md border border-black/5 shadow-sm">
                       <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: app.design.primary }} />
                       <span className="text-sm font-dm-mono uppercase tracking-[0.6em] font-black text-black/50">{app.tagline}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative bg-white rounded-[3rem] p-8 shadow-2xl border" style={{ borderColor: `${app.design.primary}15`, boxShadow: `0 50px 100px -20px ${app.design.primary}33` }}>
                   <div className="aspect-[9/16] rounded-[2rem] overflow-hidden flex items-center justify-center relative" style={{ backgroundColor: `${app.design.primary}08` }}>
                    <div className="text-center">
                        <div className="w-32 h-32 rounded-[2.5rem] mx-auto mb-6 shadow-2xl overflow-hidden border-4 border-white p-1 bg-white">
                          <img src={`/${app.id}.png`} alt={app.name} className="w-full h-full object-contain rounded-[1.8rem]" />
                        </div>
                        <div className="bg-white px-4 py-2 rounded-2xl shadow-sm text-sm font-bold border" style={{ color: app.design.primary, borderColor: `${app.design.primary}15` }}>
                          {app.tagline}
                        </div>
                     </div>
                   </div>
                </div>
              )}
            </div>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-8 mb-32">
          {app.marketing.benefits.map((benefit, i) => {
            const Icon = IconMap[benefit.icon] || Info;
            return (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] border hover:shadow-xl transition-all duration-500 hover:-translate-y-2" style={{ borderColor: `${app.design.primary}15` }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8" style={{ backgroundColor: `${app.design.primary}15`, color: app.design.primary }}>
                  <Icon size={28} />
                </div>
                <h3 className={`text-2xl font-black mb-4`}>{benefit.title}</h3>
                <p className="opacity-60 font-medium leading-relaxed">{benefit.description}</p>
              </div>
            );
          })}
        </div>

        {/* PAS Section */}
        <div className="rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden" style={{ backgroundColor: '#1A1A1A' }}>
          <div className="absolute top-0 right-0 w-64 h-64 blur-[100px]" style={{ backgroundColor: `${app.design.primary}33` }} />
          <div className="max-w-3xl relative z-10">
            <h2 className={`text-4xl md:text-5xl font-black mb-12 leading-tight`}>{app.marketing.headline}</h2>
            <div className="space-y-10 text-lg opacity-80">
              <p>{app.marketing.problem}</p>
              <p className="border-l-4 pl-8 italic" style={{ borderColor: app.design.primary }}>{app.marketing.agitation}</p>
              <p>{app.marketing.solution}</p>
            </div>
          </div>
        </div>


      </div>
    </AppLayout>
  );
};

export const AcademicTemplate: React.FC<TemplateProps> = ({ app, section }) => {
  if (section === 'privacy' || section === 'terms' || section === 'support') {
    return (
      <AppLayout app={app}>
        <div className="text-[#2D4F1E]">
          <LegalContent app={app} section={section} />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout app={app}>
      <header className="fixed top-0 w-full z-50 p-6 flex justify-between items-center text-[#2D4F1E]">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <ChevronLeft size={20} className="hidden sm:block" />
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-[#2D4F1E]/20">
            <img src={`/${app.id}.png`} alt={app.name} className="w-full h-full object-cover" />
          </div>
          <span className="font-syne font-black text-2xl tracking-tighter">{app.name}</span>
        </Link>
        <div className="font-dm-mono text-[10px] tracking-[0.2em] uppercase text-[#2D4F1E]/50 flex items-center gap-6">
          <Link to={`/${app.id}/support`} className="hover:text-[#2D4F1E]">Help</Link>
          <a href={app.externalUrl || app.appStoreUrl} className="text-[#2D4F1E] border-[3px] border-[#2D4F1E] px-4 py-1 rounded-[12px] font-bold hover:bg-[#2D4F1E] hover:text-[#FDFBF7] transition-all shadow-[2px_3px_0px_rgba(45,79,30,0.1)]">{app.externalUrl ? 'Visit Site' : 'Get App'}</a>
        </div>
      </header>

      <main className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-16 items-start">
          <div className="lg:col-span-3 space-y-10">
            <div className="inline-block font-dm-mono text-[10px] bg-[#E9B44C]/20 text-[#2D4F1E] px-4 py-1 rounded-[12px] uppercase tracking-[0.2em] border-[2px] border-[#2D4F1E]/20 font-bold">
               Strategic Study Protocol // iOS
            </div>
            <h1 className="text-6xl md:text-8xl font-syne font-black leading-[0.95] tracking-tighter text-[#2D4F1E]">
               {app.marketing.headline}
            </h1>
            <p className="text-2xl font-handlee text-[#5C7A4E] max-w-xl leading-snug">
              {app.marketing.subheadline}
            </p>
            
            <div className="pt-4">
              <div className="flex flex-wrap items-center gap-4">
                <a href={app.externalUrl || app.appStoreUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 bg-[#2D4F1E] text-[#FDFBF7] px-8 py-4 rounded-[20px] font-syne font-black text-xl hover:translate-x-2 transition-transform shadow-[4px_6px_0px_rgba(45,79,30,0.2)] border-[3px] border-[#2D4F1E]">
                  START MY STREAK <Flame size={24} className="text-[#E9B44C]" />
                </a>
                {app.appStoreUrl && (
                  <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform active:scale-95 ml-2">
                    <img src="/appstore.png" alt="Download on App Store" className="h-10" />
                  </a>
                )}
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-8 pt-16">
              {app.marketing.benefits.map((benefit, i) => (
                <div key={i} className="space-y-4">
                  <div className="w-12 h-12 bg-[#FDFBF7] border-[3px] border-[#2D4F1E] rounded-[16px] flex items-center justify-center text-[#E9B44C] shadow-[2px_3px_0px_rgba(45,79,30,0.1)]">
                    {React.createElement(IconMap[benefit.icon] || Info, { size: 22 })}
                  </div>
                  <h3 className="font-syne font-bold text-xl text-[#2D4F1E]">{benefit.title}</h3>
                  <p className="font-handlee text-sm text-[#5C7A4E] leading-relaxed opacity-80">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 sticky top-32">
            <div className="relative group p-6 bg-[#2D4F1E]/5 rounded-[40px] border-[2px] border-[#2D4F1E]/10">
               <div className="relative aspect-[9/18] bg-[#FDFBF7] rounded-[32px] shadow-2xl overflow-hidden border-[4px] border-[#2D4F1E]">
                  {app.marketing.videoHero ? (
                    <video 
                      src={app.marketing.videoHero} 
                      className="w-full h-full object-cover" 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                    />
                  ) : (
                    <div className="p-6 flex flex-col justify-between h-full">
                      <div className="space-y-8 relative z-10">
                        <div className="w-24 h-24 rounded-[2.5rem] overflow-hidden p-2 border-[4px] border-[#2D4F1E] bg-white mx-auto shadow-lg">
                           <img src={`/${app.id}.png`} alt={app.name} className="w-full h-full object-contain rounded-[1.8rem]" />
                        </div>
                        <div className="flex justify-between px-2">
                           <div className="font-dm-mono text-[10px] uppercase font-bold text-[#2D4F1E]/40 tracking-widest">Protocol 01</div>
                           <div className="font-dm-mono text-[10px] uppercase font-bold text-[#E9B44C] tracking-widest">Omni-Discovery</div>
                        </div>
                        <div className="space-y-3">
                           <div className="h-2 w-full bg-[#2D4F1E]/10 rounded-full overflow-hidden">
                              <div className="h-full bg-[#E9B44C] w-[65%]" />
                           </div>
                           <div className="h-[120px] w-full bg-[#F5F2EA] rounded-[16px] border-[3px] border-[#DECFBA] border-dashed flex items-center justify-center">
                              <p className="font-handlee text-xs text-[#2D4F1E]/30 uppercase tracking-widest font-bold">Paste Syllabus</p>
                           </div>
                        </div>
                      </div>
                      <div className="relative z-10 pt-4 border-t-[2px] border-[#2D4F1E]/5">
                         <div className="text-center font-syne text-[80px] font-black text-[#E9B44C] leading-none tracking-tighter" style={{ textShadow: '3px 4px 0px rgba(45,79,30,0.1)' }}>07</div>
                         <div className="text-center font-dm-mono text-[10px] uppercase tracking-[0.4em] text-[#2D4F1E] font-bold mt-2">Day Streak</div>
                      </div>
                    </div>
                  )}
               </div>
            </div>
          </div>
        </div>

        <section className="mt-40 border-t-[3px] border-[#2D4F1E]/5 pt-20">
           <div className="max-w-3xl mx-auto space-y-16">
              <div className="relative">
                <div className="absolute -left-12 top-0 text-[100px] font-syne font-black text-[#2D4F1E]/5 leading-none">"</div>
                <p className="text-3xl font-handlee text-[#2D4F1E] leading-relaxed italic">
                   {app.marketing.problem}
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-12 pt-10">
                 <div className="p-8 bg-[#A44231]/5 border-[3px] border-[#A44231]/20 rounded-[24px]">
                    <h4 className="font-dm-mono text-[10px] uppercase font-bold text-[#A44231] mb-6 tracking-widest">// The Agitation</h4>
                    <p className="font-handlee text-lg text-[#A44231]/80 leading-relaxed">{app.marketing.agitation}</p>
                 </div>
                 <div className="p-8 bg-[#2D4F1E]/5 border-[3px] border-[#2D4F1E]/20 rounded-[24px]">
                    <h4 className="font-dm-mono text-[10px] uppercase font-bold text-[#2D4F1E] mb-6 tracking-widest">// The Masterly Solution</h4>
                    <p className="font-handlee text-lg text-[#2D4F1E]/80 leading-relaxed">{app.marketing.solution}</p>
                 </div>
              </div>
           </div>
        </section>
      </main>
    </AppLayout>
  );
};

export const ArcadeTemplate: React.FC<TemplateProps> = ({ app, section }) => {
  if (section === 'privacy' || section === 'terms' || section === 'support') {
    return (
      <AppLayout app={app}>
        <LegalContent app={app} section={section} />
      </AppLayout>
    );
  }

  return (
    <AppLayout app={app}>
      <header className="fixed top-0 w-full z-50 p-6 flex justify-between items-center text-[#4ECDC4]">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <ChevronLeft size={20} className="hidden sm:block" />
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-[#4ECDC4]/20">
            <img src={`/${app.id}.png`} alt={app.name} className="w-full h-full object-cover" />
          </div>
          <span className="font-arcade text-lg tracking-tighter hover:glow-cyan uppercase">{app.name}</span>
        </Link>
        <div className="font-dm-mono text-[10px] tracking-widest uppercase flex items-center gap-8">
          <Link to={`/${app.id}/support`} className="hover:text-white">Help</Link>
          <a href={app.externalUrl || app.appStoreUrl} className="border border-[#4ECDC4]/30 px-4 py-1 hover:bg-[#4ECDC4] hover:text-black transition-all">Play Now</a>
        </div>
      </header>

      <main className="pt-20 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="relative min-h-screen flex items-center">
          <div className="grid lg:grid-cols-2 gap-20 items-center w-full z-10">
            <div>
              <div className="inline-flex items-center gap-3 px-3 py-1 bg-white/5 border border-white/10 rounded-sm mb-8">
                 <div className="w-2 h-2 rounded-full bg-[#4ECDC4] animate-pulse" />
                 <span className="font-arcade text-[8px] uppercase">{app.category}</span>
              </div>
              <h1 className="text-7xl md:text-9xl font-inter font-black italic uppercase tracking-tighter mb-8 leading-[0.85] text-white">
                {app.name}
              </h1>
              <p className="text-2xl font-dm-mono text-[#4ECDC4] mb-12 opacity-80">
                {app.marketing.headline}
              </p>
              <div className="flex gap-4 mb-20">
                {app.appStoreUrl && <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer" className="h-10 hover:scale-105 transition-transform active:scale-95"><img src="/appstore.png" alt="App Store" className="h-full" /></a>}
                {app.playStoreUrl && <a href={app.playStoreUrl} target="_blank" rel="noopener noreferrer" className="h-10 hover:scale-105 transition-transform active:scale-95"><img src="/playstore.png" alt="Google Play" className="h-full" /></a>}
                {app.externalUrl && (
                  <a href={app.externalUrl} target="_blank" rel="noopener noreferrer" className="border border-[#4ECDC4] text-[#4ECDC4] px-8 py-4 font-bold hover:bg-[#4ECDC4] hover:text-black transition-all">
                    Visit Live Site
                  </a>
                )}
              </div>

              <div className="grid sm:grid-cols-3 gap-10 opacity-60">
                {app.marketing.benefits.map((benefit, i) => (
                  <div key={i} className="space-y-3 group cursor-default">
                    <div className="text-[#4ECDC4] group-hover:scale-110 transition-transform duration-300">
                      {React.createElement(IconMap[benefit.icon] || Info, { size: 24 })}
                    </div>
                    <h3 className="font-inter font-black text-xs uppercase tracking-widest">{benefit.title}</h3>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-20 bg-[#4ECDC4]/20 blur-[150px] rounded-full animate-pulse group-hover:bg-[#4ECDC4]/30 transition-colors duration-700" />
              {app.marketing.screenshots ? (
                <div className="flex gap-8 relative z-10 py-10 px-6 items-end">
                  {app.marketing.screenshots.map((src, i) => (
                    <div key={i} className={`relative aspect-[9/16] overflow-hidden rounded-2xl border border-[#4ECDC4]/50 shadow-[0_0_30px_rgba(78,205,196,0.3)] group/img transition-all duration-700 ${i === 1 ? 'w-[200px] mb-20 scale-110 shadow-[0_0_50px_rgba(78,205,196,0.4)]' : 'w-[160px] opacity-70 hover:opacity-100 hover:scale-105'}`}>
                      <img src={src} className="w-full h-full object-cover transition-all duration-500" alt={`Game Preview ${i}`} />
                      <div className="absolute inset-x-0 bottom-0 h-1 bg-[#4ECDC4] shadow-[0_0_15px_#4ECDC4]" />
                      <div className="absolute inset-0 border-[8px] border-black/80 rounded-2xl pointer-events-none" />
                    </div>
                  ))}
                  <div className="absolute -bottom-4 -right-4 bg-[#4ECDC4] text-black font-arcade text-[10px] px-3 py-1 shadow-[4px_4px_0px_#fff] uppercase font-bold z-20">
                    LIVE_RENDER
                  </div>
                </div>
              ) : (
                <div className="relative aspect-square md:aspect-[4/3] bg-white/[0.02] border border-white/10 rounded-3xl flex items-center justify-center p-20 transform hover:-rotate-1 transition-transform duration-700">
                   <div className="grid grid-cols-4 gap-4 w-full h-full opacity-10">
                     {Array.from({length: 16}).map((_, i) => (
                       <div key={i} className="border border-white/20 aspect-square rounded-sm" />
                     ))}
                   </div>
                   <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#4ECDC4] to-transparent shadow-[0_0_20px_#4ECDC4]" />
                </div>
              )}
            </div>
          </div>
          {/* Scanline Overlay */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-10 z-[100]">
             <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
          </div>
        </div>

        <section className="py-40 border-t border-white/5 flex flex-col items-center text-center">
           <h2 className="text-4xl font-inter font-black italic uppercase tracking-tighter mb-12 max-w-2xl">{app.marketing.subheadline}</h2>
           <div className="grid md:grid-cols-2 gap-20 text-left max-w-4xl opacity-50 font-dm-mono text-sm leading-[1.8]">
             <div className="space-y-6">
                <p>{app.marketing.problem}</p>
                <p className="text-[#4ECDC4] font-bold tracking-widest">// AGITATION_DETECTED</p>
                <p>{app.marketing.agitation}</p>
             </div>
             <div className="space-y-6">
                <p className="text-[#4ECDC4] font-bold tracking-widest">// RESOLUTION_PULSE</p>
                <p>{app.marketing.solution}</p>
             </div>
           </div>
        </section>
      </main>
    </AppLayout>
  );
};

export const SanctuaryTemplate: React.FC<TemplateProps> = ({ app, section }) => {
  if (section === 'privacy' || section === 'terms' || section === 'support') {
    return (
      <AppLayout app={app}>
        <LegalContent app={app} section={section} />
      </AppLayout>
    );
  }

  return (
    <AppLayout app={app}>
      <header className="fixed top-0 w-full z-50 p-12 flex justify-between items-center font-playfair italic text-white">
        <Link to="/" className="flex items-center gap-3 hover:opacity-100 opacity-60 transition-opacity">
          <ChevronLeft size={20} className="hidden sm:block" />
          <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20">
            <img src={`/${app.id}.png`} alt={app.name} className="w-full h-full object-cover" />
          </div>
          <span className="text-2xl">{app.name}</span>
        </Link>
        <div className="font-inter text-[10px] tracking-[0.4em] uppercase opacity-40 hover:opacity-100 transition-opacity">
          <Link to={`/${app.id}/support`}>Support</Link>
        </div>
      </header>

      <main className="relative pt-40 pb-40 px-6 max-w-4xl mx-auto flex flex-col items-center text-center">
        <div className="animate-in fade-in duration-1000">
          <div className="w-24 h-24 rounded-full bg-white/5 backdrop-blur-3xl border border-white/10 flex items-center justify-center mx-auto mb-16 shadow-2xl shadow-indigo-500/10 overflow-hidden p-2">
            <img src={`/${app.id}.png`} alt={app.name} className="w-full h-full object-contain rounded-full" />
          </div>
          <h1 className="text-7xl md:text-8xl font-playfair font-light tracking-tighter mb-8 italic text-white">
            {app.name}
          </h1>
          <p className="text-2xl font-inter font-extralight tracking-widest opacity-60 mb-16 uppercase text-white">
            {app.marketing.headline}
          </p>

          {app.marketing.screenshots && app.marketing.screenshots[0] && (
            <div className="mb-20 flex justify-center">
              <div className="relative group max-w-[280px]">
                <div className="absolute -inset-10 bg-white/5 blur-[80px] rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-1000" />
                <div className="relative bg-white/5 backdrop-blur-md rounded-[3rem] p-3 border border-white/10 shadow-2xl">
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black/40 rounded-b-2xl z-20 backdrop-blur-xl" />
                   <img 
                     src={app.marketing.screenshots[0]} 
                     className="w-full aspect-[9/19] object-cover rounded-[2.5rem]" 
                     alt="App Preview" 
                   />
                </div>
              </div>
            </div>
          )}

          <div className="w-px h-32 bg-gradient-to-b from-white/20 to-transparent mb-20 mx-auto" />
        </div>

        <div className="grid gap-40 w-full">
           <section className="space-y-12">
              <p className="text-xl md:text-2xl font-inter font-extralight leading-relaxed opacity-80 max-w-2xl mx-auto">
                 {app.marketing.subheadline}
              </p>
              <div className="flex justify-center gap-12 pt-10">
                 {app.marketing.benefits.map((benefit, i) => (
                   <div key={i} className="group cursor-default">
                      <div className="opacity-40 group-hover:opacity-100 transition-opacity duration-700 flex flex-col items-center gap-4">
                        {React.createElement(IconMap[benefit.icon] || Info, { size: 20, strokeWidth: 1 })}
                        <p className="text-[10px] uppercase tracking-[0.2em]">{benefit.title}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </section>

           <div className="relative group">
              <div className="absolute -inset-40 bg-indigo-500/5 blur-[150px] rounded-full opacity-30 pointer-events-none" />
              <section className="relative text-left p-12 md:p-20 bg-white/[0.02] backdrop-blur-2xl border border-white/5 rounded-3xl space-y-12">
                 <p className="text-playfair italic text-3xl opacity-40">{app.marketing.problem}</p>
                 <div className="w-20 h-px bg-white/10" />
                 <p className="text-inter font-extralight text-lg opacity-60 leading-relaxed font-italic">{app.marketing.solution}</p>
                 <div className="pt-10 flex justify-center gap-4">
                    {app.appStoreUrl && <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer" className="h-10 hover:scale-105 transition-transform active:scale-95 opacity-80 hover:opacity-100">
                      <img src="/appstore.png" alt="App Store" className="h-full" />
                    </a>}
                    {app.playStoreUrl && <a href={app.playStoreUrl} target="_blank" rel="noopener noreferrer" className="h-10 hover:scale-105 transition-transform active:scale-95 opacity-80 hover:opacity-100">
                      <img src="/playstore.png" alt="Google Play" className="h-full" />
                    </a>}
                    {app.externalUrl && <a href={app.externalUrl} className="px-12 py-5 border border-white/10 rounded-full hover:bg-white/5 transition-all uppercase text-[10px] tracking-[0.5em] font-inter">
                      Visit Website
                    </a>}
                 </div>
              </section>
           </div>
        </div>
      </main>
    </AppLayout>
  );
};
