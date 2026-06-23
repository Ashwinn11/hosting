import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';

// Re-export the canonical content sources so the prerender script consumes the
// exact same data the SPA renders. This is the single source of truth — never
// duplicate the app list or pSEO pages in scripts/prerender.mjs.
export { apps } from './config/apps';
export { pseoPages } from './config/pseo';

export function render(url: string): string {
  return renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </React.StrictMode>
  );
}
