import React from 'react';

const PremiumFooter: React.FC = () => {
  return (
    <footer className="py-20 border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/[0.02]" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <h3 className="font-outfit text-2xl font-bold tracking-tight mb-2">
              Ashwin Anbazhagan
            </h3>
            <p className="text-white/50 text-sm font-inter max-w-xs">
              Building premium digital experiences that solve real problems with AI.
            </p>
          </div>

          <div className="flex gap-8 text-sm font-inter text-white/40">
            <a href="https://twitter.com/shwiinn" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a>
            <a href="https://github.com/Ashwinn11" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href="mailto:ashwinnanbazhagan@gmail.com" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-dm-mono text-white/20">
          <p>© 2026 Ashwin Anbazhagan. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/privacy-policy" className="hover:text-white/40">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:text-white/40">Terms of Service</a>
            <a href="/support" className="hover:text-white/40">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PremiumFooter;
