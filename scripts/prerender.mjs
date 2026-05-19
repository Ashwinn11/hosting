/**
 * Post-build SSR prerender: builds a server bundle from entry-server.tsx,
 * renders each route with renderToString, and writes complete HTML files
 * (full body + injected head meta) to dist/ so crawlers see real content.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const DIST_SSR = path.join(ROOT, 'dist-ssr');
const BASE = 'https://briefly.live';

// ─── App definitions (mirrors apps.ts — keep in sync) ───────────────────────
const apps = [
  {
    id: 'masterly',
    name: 'Masterly AI',
    appStoreUrl: 'https://apps.apple.com/in/app/masterly-ai-quiz-study-app/id67533760295',
    category: 'EducationApplication',
    seo: {
      title: 'Masterly AI | AI Study Planner, Flashcards & App Blocker for Exams',
      description: "Upload your syllabus. Masterly builds a day-by-day exam plan, generates flashcards and quizzes from your notes, and locks your apps until you pass. Free on iOS.",
      keywords: ['Study App', 'AI Study Planner', 'App Blocker for Students', 'Flashcard App', 'Exam Prep', 'AI Flashcards'],
    },
  },
  {
    id: 'menucheck',
    name: 'Menu Check',
    appStoreUrl: 'https://apps.apple.com/in/app/gut-buddy-food-scanner-ibs/id6755035965',
    category: 'HealthApplication',
    seo: {
      title: 'Menu Check | IBS Food Scanner, FODMAP & Celiac Barcode Scanner',
      description: "Scan restaurant menus and 3M+ grocery barcodes for IBS, Celiac, Crohn's, FODMAP & 100+ conditions. Get instant Safe/Limit/Avoid verdicts. Free on iOS.",
      keywords: ['IBS Food Scanner', 'FODMAP Scanner', 'Celiac App', 'Barcode Scanner Gut Health', 'Restaurant Menu Scanner'],
    },
  },
  {
    id: 'morningjournal',
    name: 'Honestly: Morning Journal',
    appStoreUrl: 'https://apps.apple.com/in/app/honestly-morning-journal/id6759817879',
    category: 'LifestyleApplication',
    seo: {
      title: 'Honestly: Morning Journal | App Blocker & Daily Reflection',
      description: 'Start your day with intention. Honestly blocks your distracting apps until you complete your morning reflection.',
      keywords: ['Journaling', 'App Blocker', 'Morning Routine', 'Screen Time', 'Mindfulness'],
    },
  },
  {
    id: 'pepkit',
    name: 'PepKit',
    appStoreUrl: 'https://apps.apple.com/us/app/peptide-calculator-pepkit/id6764238552',
    category: 'HealthApplication',
    seo: {
      title: 'PepKit | Peptide Calculator, Cycle Tracker & GLP-1 Dose Logger',
      description: 'The complete peptide research toolkit. Reconstitution calculator, cycle planner, inventory tracker, lab results, and compound level charts. Free on iOS.',
      keywords: ['Peptide Calculator', 'GLP-1 Tracker', 'Peptide Reconstitution Calculator', 'Peptide Cycle Tracker'],
    },
  },
];

const homeSeo = {
  title: 'Ashwin Anbazhagan | Premium App Creator',
  description: 'Crafting high-fidelity mobile experiences and AI-powered digital products. Exploring the intersection of design, code, and wellness.',
  keywords: ['Ashwin Anbazhagan', 'App Developer', 'iOS Developer', 'SaaS Founder'],
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
function buildHead({ title, description, keywords, canonical, appStoreUrl, category, appName }) {
  const kw = keywords.join(', ');
  const image = `${BASE}/og-image.png`;

  const schema = appName
    ? JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: appName,
        description,
        applicationCategory: category || 'HealthApplication',
        operatingSystem: 'iOS',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        url: appStoreUrl || canonical,
        author: { '@type': 'Person', name: 'Ashwin Anbazhagan', url: BASE },
      })
    : JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Ashwin Anbazhagan',
        jobTitle: 'App Developer & Founder',
        url: BASE,
      });

  return `
    <title>${title}</title>
    <meta name="description" content="${description}">
    <meta name="keywords" content="${kw}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${canonical}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${image}">
    <meta property="og:site_name" content="Briefly.live">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${image}">
    <meta name="twitter:creator" content="@shwiinn">
    <script type="application/ld+json">${schema}</script>`.trim();
}

function writeRoute(templateHtml, routePath, headContent, bodyHtml) {
  const dir = path.join(DIST, ...routePath.split('/').filter(Boolean));
  fs.mkdirSync(dir, { recursive: true });

  let html = templateHtml;
  html = html.replace('</head>', `  ${headContent}\n  </head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);

  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log(`  ✓ ${routePath || '/'}`);
}

// ─── Build SSR bundle ─────────────────────────────────────────────────────────
console.log('\nBuilding SSR bundle...');
execSync(
  'npx vite build --ssr src/entry-server.tsx --outDir dist-ssr --emptyOutDir',
  { stdio: 'inherit', cwd: ROOT }
);

// ─── Load render function ─────────────────────────────────────────────────────
const { render } = await import(path.join(DIST_SSR, 'entry-server.js'));

// ─── Read client template ─────────────────────────────────────────────────────
const templateHtml = fs.readFileSync(path.join(DIST, 'index.html'), 'utf-8');

// ─── Generate routes ──────────────────────────────────────────────────────────
console.log('\nPrerendering routes...');

// Home
{
  const bodyHtml = render('/');
  const headContent = buildHead({
    title: homeSeo.title,
    description: homeSeo.description,
    keywords: homeSeo.keywords,
    canonical: BASE,
    appName: null,
  });
  let html = templateHtml;
  html = html.replace('</head>', `  ${headContent}\n  </head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);
  fs.writeFileSync(path.join(DIST, 'index.html'), html);
  console.log('  ✓ /');
}

// App routes
for (const app of apps) {
  const sections = ['', 'privacy-policy', 'terms-of-service', 'support'];
  for (const sec of sections) {
    const routePath = sec ? `/${app.id}/${sec}` : `/${app.id}`;
    const canonical = `${BASE}${routePath}`;
    const title = sec
      ? `${sec.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} | ${app.name}`
      : app.seo.title;

    const bodyHtml = render(routePath);
    const headContent = buildHead({
      title,
      description: app.seo.description,
      keywords: app.seo.keywords,
      canonical,
      appStoreUrl: app.appStoreUrl,
      category: app.category,
      appName: app.name,
    });

    writeRoute(templateHtml, routePath, headContent, bodyHtml);
  }
}

console.log('\nDone. All routes pre-rendered with full HTML.\n');
