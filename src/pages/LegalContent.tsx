import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import type { AppConfig } from '../config/apps';

interface Props {
  app: AppConfig;
  section: 'privacy' | 'terms' | 'support';
}

const LegalContent: React.FC<Props> = ({ app, section }) => {
  const content =
    section === 'privacy' ? app.legal.privacyPolicy :
    section === 'terms'   ? app.legal.termsOfService :
    app.legal.support;

  if (!content) return null;

  return (
    <div className="max-w-3xl mx-auto py-20 px-6">
      <Link to={`/${app.id}`} className="inline-flex items-center gap-2 mb-12 opacity-50 hover:opacity-100 transition-opacity">
        <ChevronLeft size={16} /> Back to {app.name}
      </Link>
      <h1 className="text-4xl font-bold mb-4 capitalize">{section.replace('-', ' ')}</h1>
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

export default LegalContent;
