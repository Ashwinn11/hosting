import { useEffect } from 'react';
import type React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { apps } from '../config/apps';
import { ZenTemplate, AcademicTemplate, ArcadeTemplate, SanctuaryTemplate } from '../templates/AppTemplates';
import MasterlyLanding from './MasterlyLanding';
import GutPalLanding from './GutPalLanding';
import HonestlyLanding from './HonestlyLanding';
import YumeshipLanding from './YumeshipLanding';
import Her75Landing from './Her75Landing';
import SnipsyLanding from './SnipsyLanding';


interface AppLandingProps {
  section?: 'privacy' | 'terms' | 'support';
  appId?: string;
}

const AppLanding: React.FC<AppLandingProps> = ({ section, appId: propAppId }) => {
  const { appId: paramAppId } = useParams<{ appId: string }>();
  const effectiveAppId = propAppId || paramAppId;
  const app = apps.find((a) => a.id === effectiveAppId);

  const externalRedirect = !!app?.externalUrl && !section;

  useEffect(() => {
    if (app) {
      document.title = app.seo.title;
    }
  }, [app]);

  // External apps redirect after mount — never as a render side effect.
  useEffect(() => {
    if (externalRedirect && app?.externalUrl) {
      window.location.href = app.externalUrl;
    }
  }, [externalRedirect, app]);

  if (!app) {
    return <Navigate to="/" replace />;
  }

  if (externalRedirect) {
    return null;
  }

  // Custom landing pages per app
  if (app.id === 'masterly') return <MasterlyLanding app={app} section={section} />;
  if (app.id === 'gutpal') return <GutPalLanding app={app} section={section} />;
  if (app.id === 'honestly') return <HonestlyLanding app={app} section={section} />;
  if (app.id === 'yumeship') return <YumeshipLanding app={app} section={section} />;
  if (app.id === 'her75') return <Her75Landing app={app} section={section} />;
  if (app.id === 'snipsy') return <SnipsyLanding app={app} section={section} />;


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
