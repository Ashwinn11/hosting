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
    appStoreUrl: 'https://apps.apple.com/in/app/masterly-ai-quiz-study-app/id6753760295',
    downloadUrl: 'https://apps.apple.com/in/app/masterly-ai-quiz-study-app/id6753760295',
    appNumericId: '6753760295',
    category: 'EducationApplication',
    seoApplicationCategory: 'EducationApplication',
    aggregateRating: { ratingValue: '4.8', ratingCount: '89' },
    screenshots: ['/masterly_demo.mp4'],
    seo: {
      title: 'Masterly AI | AI Study Planner, Flashcards & App Blocker for Exams',
      description: "Upload your syllabus. Masterly builds a day-by-day exam plan, generates flashcards and quizzes from your notes, and locks your apps until you pass. Free on iOS.",
      keywords: ['Study App', 'AI Study Planner', 'App Blocker for Students', 'Flashcard App', 'Exam Prep', 'AI Flashcards'],
    },
    faqs: [
      { question: 'Is there an app that blocks social media until I finish studying?', answer: "Masterly AI uses iOS Screen Time to lock chosen apps during your study window. Apps only unlock after you pass the day's AI-generated quiz — built from your own uploaded notes and syllabus." },
      { question: 'Can an app generate flashcards from my own notes?', answer: 'Masterly AI generates flip flashcards and multiple-choice quizzes directly from PDFs or text you upload. Every flashcard is unique to your material, not generic content.' },
      { question: 'What is the best AI study planner app for exams?', answer: 'Masterly AI takes your exam date and syllabus, then builds a day-by-day study plan automatically. Each day includes a lesson, flashcards, and a quiz — so you always know exactly what to study next.' },
      { question: 'Is Masterly AI free for iPhone?', answer: 'Masterly AI is free to download on iOS. Full AI lesson generation and app blocking features require a subscription, available via Apple App Store.' },
      { question: "How does Masterly AI's app blocker work?", answer: "Masterly AI uses Apple's Family Controls and Screen Time API to lock selected apps during your study window. Once you complete and pass the daily quiz, the apps automatically unlock." },
    ],
  },
  {
    id: 'menucheck',
    name: 'Menu Check',
    appStoreUrl: 'https://apps.apple.com/in/app/gut-buddy-food-scanner-ibs/id6755035965',
    downloadUrl: 'https://apps.apple.com/in/app/gut-buddy-food-scanner-ibs/id6755035965',
    appNumericId: '6755035965',
    category: 'HealthApplication',
    seoApplicationCategory: 'HealthApplication',
    aggregateRating: { ratingValue: '4.8', ratingCount: '47' },
    screenshots: ['/menucheck/02.png', '/menucheck/03.png', '/menucheck/04.png'],
    seo: {
      title: 'Menu Check | IBS Food Scanner, FODMAP & Celiac Barcode Scanner',
      description: "Scan restaurant menus and 3M+ grocery barcodes for IBS, Celiac, Crohn's, FODMAP & 100+ conditions. Get instant Safe/Limit/Avoid verdicts. Free on iOS.",
      keywords: ['IBS Food Scanner', 'FODMAP Scanner', 'Celiac App', 'Barcode Scanner Gut Health', 'Restaurant Menu Scanner'],
    },
    faqs: [
      { question: 'Is there an app that scans restaurant menus for IBS?', answer: 'Menu Check scans restaurant menus using AI to give instant Safe, Limit, or Avoid verdicts for IBS, FODMAP, Celiac, and 100+ conditions. Point your camera at any menu and get results in seconds.' },
      { question: 'What barcode scanner app works for FODMAP?', answer: 'Menu Check scans over 3 million grocery product barcodes via OpenFoodFacts, cross-referencing every ingredient against your specific FODMAP, Celiac, or gut health profile.' },
      { question: 'Is Menu Check free on iPhone?', answer: 'Yes. Menu Check is free to download on iOS. Core scanning features are free; a premium subscription unlocks unlimited AI recipe generation and advanced filtering.' },
      { question: 'Can Menu Check detect hidden ingredients for Celiac disease?', answer: 'Menu Check checks every ingredient and sub-ingredient against a Celiac-specific database, flagging gluten-containing additives, starch derivatives, and cross-contamination warnings where available.' },
      { question: 'Which food scanner app supports the most dietary conditions?', answer: "Menu Check supports over 100 conditions, allergies, and diets — including IBS, Celiac, IBD, Crohn's, SIBO, histamine intolerance, FODMAP, dairy-free, nut-free, and more." },
    ],
  },
  {
    id: 'honestly',
    name: 'Honestly: Morning Journal',
    appStoreUrl: 'https://apps.apple.com/in/app/honestly-morning-journal/id6759817879',
    downloadUrl: 'https://apps.apple.com/in/app/honestly-morning-journal/id6759817879',
    appNumericId: '6759817879',
    category: 'LifestyleApplication',
    seoApplicationCategory: 'LifestyleApplication',
    aggregateRating: { ratingValue: '4.7', ratingCount: '31' },
    screenshots: ['/honestly/journal.png'],
    seo: {
      title: 'Honestly: Morning Journal | App Blocker & Daily Reflection',
      description: 'Start your day with intention. Honestly blocks your distracting apps until you complete your morning reflection.',
      keywords: ['Journaling', 'App Blocker', 'Morning Routine', 'Screen Time', 'Mindfulness'],
    },
    faqs: [
      { question: 'What is the best morning journaling app for iPhone?', answer: 'Honestly: Morning Journal guides you through a 4-step ritual — Mood check-in, freeform journal, 3 Big Wins goal-setting, and Gratitude — synced across iPhone and iPad with interactive home screen widgets.' },
      { question: 'Is there a journaling app that also blocks distracting apps?', answer: 'Honestly blocks your chosen distracting apps in the morning using iOS Screen Time. Apps unlock only after you complete your daily reflection ritual.' },
      { question: 'Does Honestly journal sync between iPhone and iPad?', answer: 'Yes. Honestly uses iCloud to sync your journal entries, mood logs, and streaks seamlessly across all your Apple devices.' },
      { question: 'Is Honestly: Morning Journal free?', answer: 'Honestly is free to download on iOS. A premium subscription unlocks unlimited journal history, advanced widgets, and additional ritual customization.' },
      { question: 'What are alternatives to Day One for morning routines?', answer: 'Honestly: Morning Journal combines structured reflection (mood, intentions, gratitude) with app blocking — ideal for users who want both a journaling habit and a distraction-free morning, unlike Day One which is unstructured long-form journaling.' },
    ],
  },
  {
    id: 'shotly',
    name: 'Shotly',
    appStoreUrl: 'https://apps.apple.com/us/app/glp-1-tracker-shotly/id6776381502',
    downloadUrl: 'https://apps.apple.com/us/app/glp-1-tracker-shotly/id6776381502',
    appNumericId: '6776381502',
    category: 'HealthApplication',
    seoApplicationCategory: 'HealthApplication',
    aggregateRating: { ratingValue: '4.9', ratingCount: '12' },
    screenshots: ['/shotly/01.png', '/shotly/02.png', '/shotly/03.png', '/shotly/04.png'],
    seo: {
      title: 'Shotly | GLP-1 Tracker for Ozempic, Wegovy, Mounjaro & Zepbound',
      description: 'Track GLP-1 injections, log weight loss, and monitor nutrition. Built for Ozempic, Wegovy, Mounjaro, and Zepbound users. Free on iOS.',
      keywords: ['GLP-1 Tracker', 'Ozempic Tracker', 'Wegovy App', 'Mounjaro Tracker', 'Zepbound App'],
    },
    faqs: [
      { question: 'What is the best app to track Ozempic injections?', answer: 'Shotly is a dedicated injection tracker for Ozempic, Wegovy, Mounjaro, and Zepbound. Log every weekly dose with site, amount, and notes. See your full injection history and know exactly when your next dose is due.' },
      { question: 'Is there an app for tracking weight loss on Mounjaro?', answer: 'Shotly tracks your weight weekly alongside your injection log, showing a chart of your full journey. See total pounds lost, average loss per week, and your progress toward your goal weight.' },
      { question: 'How do I track Wegovy dose escalation on my phone?', answer: 'Shotly supports the full dose escalation schedule for Wegovy (0.25 → 0.5 → 1.0 → 1.7 → 2.4 mg). Your current dose is tracked and displayed on every injection log entry.' },
      { question: 'Is Shotly free on iPhone?', answer: 'Shotly is free to download on iOS. Core injection and weight tracking are free. Premium unlocks unlimited meal logging, body measurements, side effect tracking, and progress photos.' },
      { question: 'Can I track nutrition on a GLP-1 medication?', answer: 'Shotly includes a meal logger with calories, protein, fiber, and fat — with daily goals calibrated for GLP-1 users.' },
    ],
  },
  {
    id: 'yumeship',
    name: 'YumeShip',
    appStoreUrl: 'https://apps.apple.com/app/yumeship-anime-kpop-canon/id6773642234',
    downloadUrl: 'https://apps.apple.com/app/yumeship-anime-kpop-canon/id6773642234',
    appNumericId: '6773642234',
    category: 'EntertainmentApplication',
    seoApplicationCategory: 'EntertainmentApplication',
    seo: {
      title: 'YumeShip | Personal Fan Creative Space for Ships & F/Os',
      description: 'A private vault for your favourite characters. Write love letters, build headcanons, track dates, choose templates — all on your device, never shared.',
      keywords: ['yumeshipping', 'fictive', 'fandom app', 'f/o app', 'ship journal', 'fan creative space', 'yumeship', 'character journal', 'kin app', 'fan diary']
    },
    faqs: [
      { question: 'What is YumeShip?', answer: 'YumeShip is a private creative vault for fans. Every character or ship gets its own page with templates, love letters, headcanons, and date tracking.' },
      { question: 'Is YumeShip free?', answer: 'YumeShip is free to download. All core creative features are included.' },
      { question: 'Does YumeShip sync my data?', answer: 'Everything in YumeShip stays on your device. No accounts, no cloud, no sharing — just yours.' },
    ],
  },
  {
    id: 'catch-wildlife',
    name: 'Catch Wildlife',
    appStoreUrl: 'https://apps.apple.com/us/app/catch-wildlife-collection/id6778048762',
    downloadUrl: 'https://apps.apple.com/us/app/catch-wildlife-collection/id6778048762',
    appNumericId: '6778048762',
    category: 'GameApplication',
    seoApplicationCategory: 'GameApplication',
    seo: {
      title: 'Catch Wildlife | Animal Collection Game for iPhone',
      description: 'Snap real animals in nature with your camera and collect them as stickers. Build your wildlife album with location-based rarity. Free on iOS.',
      keywords: ['nature', 'collection', 'catch', 'wildlife', 'dex', 'pokedex', 'catalog', 'inventory', 'log', 'album', 'gallery']
    },
    faqs: [
      { question: 'How does Catch Wildlife work?', answer: 'Snap a photo of any real animal with your camera. AI lifts the animal off the photo as a sticker and it lands in your collection.' },
      { question: 'Is rarity different in different locations?', answer: 'Yes. The same animal has different rarity depending on where you catch it.' },
      { question: 'Is Catch Wildlife free?', answer: 'Catch Wildlife is free to download on iOS. Core catching and collection features are free.' },
    ],
  },
];

const homeSeo = {
  title: 'Ashwin Anbazhagan | Premium App Creator',
  description: 'Crafting high-fidelity mobile experiences and AI-powered digital products. Exploring the intersection of design, code, and wellness.',
  keywords: ['Ashwin Anbazhagan', 'App Developer', 'iOS Developer', 'SaaS Founder'],
};

// ─── pSEO pages (dynamically read from pseo.ts) ───────────────────────────────
// Parse pseo.ts to extract all pages dynamically (keeps prerender in sync with source)
const pseoRaw = fs.readFileSync(path.join(ROOT, 'src/config/pseo.ts'), 'utf-8');

// Extract the array content: find "export const pseoPages..." and capture everything until the final "];"
const arrayStartIndex = pseoRaw.indexOf('export const pseoPages');
const arrayEndIndex = pseoRaw.lastIndexOf('];');
const pseoPages = arrayStartIndex !== -1 && arrayEndIndex !== -1 ?
  eval(`(${pseoRaw.substring(arrayStartIndex + 'export const pseoPages: PSEOPage[] = '.length, arrayEndIndex + 1)})`) : [];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function buildHead({ title, description, keywords, canonical, appStoreUrl, downloadUrl, seoApplicationCategory, appName, appNumericId, appId, aggregateRating, screenshots, faqs, breadcrumbs, pageType, datePublished }) {
  const kw = keywords.join(', ');
  const image = `${BASE}/og-image.png`;

  const appSchema = appName ? JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: appName,
    description,
    applicationCategory: seoApplicationCategory || 'HealthApplication',
    operatingSystem: 'iOS 15.0+',
    downloadUrl: downloadUrl || appStoreUrl,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    url: appStoreUrl || canonical,
    author: { '@type': 'Person', name: 'Ashwin Anbazhagan', url: BASE },
    ...(aggregateRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: aggregateRating.ratingValue,
        ratingCount: aggregateRating.ratingCount,
      },
    }),
    ...(screenshots?.length && {
      screenshot: screenshots.map(s => `${BASE}${s}`),
    }),
  }) : JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Briefly',
    url: BASE,
    logo: `${BASE}/apple-touch-icon.png`,
    sameAs: ['https://twitter.com/shwiinn'],
    founder: { '@type': 'Person', name: 'Ashwin Anbazhagan' },
  });

  const breadcrumbSchema = (breadcrumbs && breadcrumbs.length > 0) ? `
    <script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((b, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: b.name,
        item: b.url,
      })),
    })}</script>` : '';

  const faqSchema = (faqs && faqs.length > 0) ? `
    <script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(f => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    })}</script>` : '';

  const appMetaTags = (appId && appNumericId) ? `
    <meta name="apple-itunes-app" content="app-id=${appNumericId}, app-argument=${BASE}/${appId}">
    <meta property="al:ios:app_name" content="${appName}">
    <meta property="al:ios:app_store_id" content="${appNumericId}">
    <meta property="al:ios:url" content="${appId}://home">
    <meta name="twitter:app:name:iphone" content="${appName}">
    <meta name="twitter:app:id:iphone" content="${appNumericId}">` : '';

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
    <meta name="twitter:creator" content="@shwiinn">${appMetaTags}
    <script type="application/ld+json">${appSchema}</script>${breadcrumbSchema}${faqSchema}`.trim();
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
    appId: null,
    appNumericId: null,
    aggregateRating: null,
    screenshots: null,
    faqs: null,
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
      downloadUrl: sec ? null : app.downloadUrl,
      seoApplicationCategory: sec ? null : app.seoApplicationCategory,
      appName: app.name,
      appNumericId: sec ? null : app.appNumericId,
      appId: sec ? null : app.id,
      aggregateRating: sec ? null : app.aggregateRating,
      screenshots: sec ? null : app.screenshots,
      faqs: sec ? null : app.faqs,
    });

    writeRoute(templateHtml, routePath, headContent, bodyHtml);
  }
}

// pSEO routes
for (const page of pseoPages) {
  const routePath = `/${page.appId}/${page.type}/${page.slug}`;
  const canonical = `${BASE}${routePath}`;
  const app = apps.find(a => a.id === page.appId);

  const bodyHtml = render(routePath);
  const breadcrumbs = [
    { name: 'Home', url: `${BASE}/` },
    { name: app?.name || '', url: `${BASE}/${page.appId}` },
    { name: page.h1 || page.title, url: canonical },
  ];
  const headContent = buildHead({
    title: page.title,
    description: page.metaDescription,
    keywords: app ? app.seo.keywords : [],
    canonical,
    appStoreUrl: app?.appStoreUrl,
    seoApplicationCategory: app?.seoApplicationCategory,
    appName: app?.name,
    appNumericId: app?.appNumericId,
    appId: page.appId,
    aggregateRating: null,
    screenshots: null,
    faqs: page.faqs,
    breadcrumbs,
    pageType: page.type,
    datePublished: page.datePublished,
  });

  writeRoute(templateHtml, routePath, headContent, bodyHtml);
}

// Generate sitemap.xml
const sitemapEntries = [];

// Home page
sitemapEntries.push({
  loc: BASE,
  priority: 1.0,
  changefreq: 'monthly',
});

// App landing pages
for (const app of apps) {
  sitemapEntries.push({
    loc: `${BASE}/${app.id}`,
    priority: 0.9,
    changefreq: 'monthly',
  });

  // App legal/support pages
  for (const sec of ['privacy-policy', 'terms-of-service', 'support']) {
    sitemapEntries.push({
      loc: `${BASE}/${app.id}/${sec}`,
      priority: 0.3,
      changefreq: 'yearly',
    });
  }
}

// pSEO pages
for (const page of pseoPages) {
  sitemapEntries.push({
    loc: `${BASE}/${page.appId}/${page.type}/${page.slug}`,
    priority: 0.8,
    changefreq: 'monthly',
  });
}

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map(entry => `  <url>
    <loc>${entry.loc}</loc>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemapXml);

console.log('\nDone. All routes pre-rendered with full HTML.\n');
