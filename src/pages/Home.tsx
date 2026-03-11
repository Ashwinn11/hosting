import React from 'react';
import { apps } from '../config/apps';
import { Link } from 'react-router-dom';
import { Smartphone, Globe, ArrowRight, Github, Twitter, Mail } from 'lucide-react';
import SEOBox from '../components/SEOBox';
const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white font-inter selection:bg-indigo-500/30">
      <SEOBox
        title="Ashwin Anbazhagan | Premium App Creator"
        description="Crafting high-fidelity mobile experiences and AI-powered digital products. Exploring the intersection of design, code, and wellness."
        keywords={['Ashwin Anbazhagan', 'App Developer', 'iOS Developer', 'SaaS Founder', 'UI/UX Design']}
      />

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
      </div>

      <nav className="fixed top-0 w-full z-50 border-b border-white/5 backdrop-blur-md bg-black/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <h1 className="text-xl font-outfit font-black tracking-tighter">
            BRIEFLY<span className="text-indigo-500">.</span>
          </h1>
          <div className="flex gap-8 text-xs font-dm-mono uppercase tracking-widest text-white/40">
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="mailto:ashwinnanbazhagan@gmail.com" className="hover:text-white transition-colors">Collaborate</a>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-48 pb-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[10px] font-dm-mono uppercase tracking-widest mb-10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Building for the future
            </div>
            <h1 className="text-6xl md:text-8xl font-outfit font-bold tracking-tight mb-8 leading-[0.9]">
              Ashwin Anbazhagan<span className="text-indigo-500 italic block mt-2 text-4xl md:text-6xl">Digital Architect.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/40 max-w-2xl mx-auto font-inter font-light leading-relaxed mb-12">
              Transforming complex problems into elegant, premium digital experiences. Specialist in AI-integrated mobile ecosystem and wellness tech.
            </p>

            {/* App Icon Reel */}
            <div className="flex flex-wrap justify-center gap-4 mb-16 opacity-60 hover:opacity-100 transition-opacity">
              {apps.map((app) => (
                <div
                  key={app.id}
                  className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/5 border border-white/10 p-2 backdrop-blur-sm group hover:-translate-y-1 transition-all overflow-hidden"
                  title={app.name}
                >
                  <img
                    src={`/${app.id}.png`}
                    alt={app.name}
                    className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all rounded-[0.7rem]"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-6">
              <a href="#projects" className="px-8 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform">View Work</a>
              <div className="flex items-center gap-4 text-white/40">
                <a href="https://github.com/Ashwinn11" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Github size={20} /></a>
                <a href="https://twitter.com/shwiinn" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Twitter size={20} /></a>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section id="projects" className="py-32 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-20">
            <div>
              <p className="text-indigo-400 font-dm-mono text-[10px] uppercase tracking-[0.3em] mb-4">Selected Works</p>
              <h2 className="text-4xl md:text-6xl font-outfit font-bold tracking-tight">The Ecosystem.</h2>
            </div>
            <p className="text-white/40 max-w-sm text-sm font-inter">A curated collection of products focusing on study discipline, digestive health, and digital mindfulness.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {apps.map((app) => (
              <div key={app.id} className="group relative">
                <div
                  className="absolute -inset-0.5 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-10 transition-opacity duration-1000"
                  style={{ backgroundColor: app.design.primary }}
                />
                <div className="relative h-[500px] glass-card p-10 flex flex-col justify-between overflow-hidden">
                  <div className="relative z-20">
                    <div className="flex justify-between items-start mb-10">
                      <div
                        className="w-20 h-20 rounded-[1.5rem] flex items-center justify-center shadow-2xl overflow-hidden p-2 bg-white/5 border border-white/10"
                      >
                        <img src={`/${app.id}.png`} alt={app.name} className="w-full h-full object-contain rounded-[1rem]" />
                      </div>
                      <div className="flex gap-4 text-white/20">
                        {app.platforms.includes('ios') && <Smartphone size={18} />}
                        {app.platforms.includes('web') && <Globe size={18} />}
                      </div>
                    </div>

                    <h3 className="text-4xl font-outfit font-bold mb-4">{app.name}</h3>
                    <p className="text-white/40 font-inter font-light max-w-xs leading-relaxed mb-6 italic">{app.tagline}</p>
                    <p className="text-white/60 text-sm font-inter leading-relaxed max-w-sm group-hover:text-white/90 transition-colors">
                      {app.description}
                    </p>
                  </div>

                  <div className="relative z-20 mt-10">
                    {app.externalUrl ? (
                      <a
                        href={app.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-indigo-400 group/link"
                      >
                        Visit Live Site <ArrowRight size={16} className="group-hover/link:translate-x-2 transition-transform" />
                      </a>
                    ) : (
                      <Link
                        to={`/${app.id}`}
                        className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-[#B8FF00] group/link"
                        style={{ color: app.design.primary }}
                      >
                        Explore Experience <ArrowRight size={16} className="group-hover/link:translate-x-2 transition-transform" />
                      </Link>
                    )}
                  </div>

                  {/* Decorative element based on template */}
                  <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                    {app.design.templateId === 'arcade' && <div className="w-full h-full border-[20px] border-white rotate-45" />}
                    {app.design.templateId === 'zen' && <div className="w-full h-full rounded-full border-[20px] border-white" />}
                    {app.design.templateId === 'sanctuary' && <div className="w-full h-full bg-gradient-to-tr from-white to-transparent blur-3xl" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-40 px-6 border-t border-white/5 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/5 blur-[150px] rounded-full pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-5xl md:text-7xl font-outfit font-bold tracking-tight mb-10">Have a vision? Let's build it.</h2>
            <p className="text-xl text-white/40 font-inter font-light mb-12">I'm currently open to selective partnerships and new product ventures.</p>
            <a href="mailto:ashwinnanbazhagan@gmail.com" className="inline-flex items-center gap-3 px-10 py-5 bg-indigo-600 rounded-full font-bold hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-500/20">
              Get in Touch <Mail size={18} />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;

