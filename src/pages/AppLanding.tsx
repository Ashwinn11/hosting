import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { apps } from '../config/apps';
import { ZenTemplate, AcademicTemplate, ArcadeTemplate, SanctuaryTemplate } from '../templates/AppTemplates';

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
      document.title = `${app.name} | Briefly.live`;
    }
  }, [app]);

  if (!app) {
    return <Navigate to="/" replace />;
  }

  // Handle external redirects if accidentally navigated to (though Home handles this with <a> tags)
  if (app.externalUrl && !section) {
    window.location.href = app.externalUrl;
    return null;
  }

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
