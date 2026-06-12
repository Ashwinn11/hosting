import React, { useEffect } from 'react';
import { apps } from '../config/apps';
import { SanctuaryTemplate } from '../templates/AppTemplates';

interface CatchWildlifeLandingProps {
  section?: 'privacy' | 'terms' | 'support';
}

const CatchWildlifeLanding: React.FC<CatchWildlifeLandingProps> = ({ section }) => {
  const app = apps.find((a) => a.id === 'catch-wildlife');

  useEffect(() => {
    if (app) {
      document.title = app.seo.title;
    }
  }, [app]);

  if (!app) {
    return <div>App not found</div>;
  }

  return <SanctuaryTemplate app={app} section={section} />;
};

export default CatchWildlifeLanding;
