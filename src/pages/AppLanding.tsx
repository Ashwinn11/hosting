import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { apps } from '../config/apps';
import { ZenTemplate, AcademicTemplate, ArcadeTemplate, SanctuaryTemplate } from '../templates/AppTemplates';
import MasterlyLanding from './MasterlyLanding';
import MenuCheckLanding from './MenuCheckLanding';
import PepKitLanding from './PepKitLanding';

interface AppLandingProps {
  section?: 'privacy' | 'terms' | 'support';
  appId?: string;
}

const AppLanding: React.FC<AppLandingProps> = ({ section, appId: propAppId }) => {
  const { appId: paramAppId } = useParams<{ appId: string }>();
  const effectiveAppId = propAppId || paramAppId;
  const app = apps.find((a) => a.id === effectiveAppId);

  useEffect(() => {
    if (app) {
      document.title = app.seo.title;
    }
  }, [app]);

  if (!app) {
    return <Navigate to="/" replace />;
  }

  if (app.externalUrl && !section && typeof window !== 'undefined') {
    window.location.href = app.externalUrl;
    return null;
  }

  // Custom landing pages per app
  if (app.id === 'masterly') return <MasterlyLanding app={app} section={section} />;
  if (app.id === 'menucheck') return <MenuCheckLanding app={app} section={section} />;
  if (app.id === 'pepkit') return <PepKitLanding app={app} section={section} />;

  // Fallback to template system (Morning Journal → SanctuaryTemplate)
  const TemplateMap = {
    zen: ZenTemplate,
    academic: AcademicTemplate,
    arcade: ArcadeTemplate,
    sanctuary: SanctuaryTemplate,
  };

  const SelectedTemplate = TemplateMap[app.design.templateId] || ZenTemplate;
  return <SelectedTemplate app={app} section={section} />;
};

export default AppLanding;
