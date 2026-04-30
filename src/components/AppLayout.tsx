import React from 'react';
import type { AppConfig } from '../config/apps';
import { Link } from 'react-router-dom';
import SEOBox from './SEOBox';

interface AppLayoutProps {
  app: AppConfig;
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ app, children }) => {
  return (
    <div
      className={`min-h-screen ${app.design.fontFamily} transition-colors duration-700`}
      style={{
        backgroundColor: app.design.bg,
        color: app.design.templateId === 'academic' ? '#2D4F1E' : app.design.templateId === 'zen' ? '#1A1A1A' : 'white'
      }}
    >
      <SEOBox
        title={app.seo.title}
        description={app.seo.description}
        keywords={app.seo.keywords}
        appId={app.id}
      />

      {app.design.mesh && <div className="mesh-bg opacity-30" />}
      {app.design.grain && (
        <div
          className="grain-overlay"
          style={{ opacity: app.design.grain }}
        />
      )}

      {/* App Specific Header/Navigation could go here */}

      <main className="relative z-10 min-h-screen">
        {children}
      </main>

      <footer className="relative z-10 py-10 px-6 border-t border-white/5 opacity-40 hover:opacity-100 transition-opacity">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-dm-mono uppercase tracking-widest">
          <div className="flex gap-8 font-bold">
            <Link to={`/${app.id}/privacy-policy`} className="hover:opacity-60 transition-opacity">Privacy</Link>
            <Link to={`/${app.id}/terms-of-service`} className="hover:opacity-60 transition-opacity">Terms</Link>
            <Link to={`/${app.id}/support`} className="hover:opacity-60 transition-opacity">Support</Link>
          </div>
          <p>© 2026 Ashwin Anbazhagan // briefly.live</p>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
