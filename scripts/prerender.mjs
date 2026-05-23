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
    appNumericId: '67533760295',
    category: 'EducationApplication',
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
    appNumericId: '6755035965',
    category: 'HealthApplication',
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
    id: 'morningjournal',
    name: 'Honestly: Morning Journal',
    appStoreUrl: 'https://apps.apple.com/in/app/honestly-morning-journal/id6759817879',
    appNumericId: '6759817879',
    category: 'LifestyleApplication',
    aggregateRating: { ratingValue: '4.7', ratingCount: '31' },
    screenshots: ['/morningjournal/journal.png'],
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
    id: 'pepkit',
    name: 'PepKit',
    appStoreUrl: 'https://apps.apple.com/us/app/peptide-calculator-pepkit/id6764238552',
    appNumericId: '6764238552',
    category: 'HealthApplication',
    aggregateRating: { ratingValue: '4.9', ratingCount: '56' },
    screenshots: ['/pepkit/03.png', '/pepkit/04.png', '/pepkit/05.png'],
    seo: {
      title: 'PepKit | Peptide Calculator, Cycle Tracker & GLP-1 Dose Logger',
      description: 'The complete peptide research toolkit. Reconstitution calculator, cycle planner, inventory tracker, lab results, and compound level charts. Free on iOS.',
      keywords: ['Peptide Calculator', 'GLP-1 Tracker', 'Peptide Reconstitution Calculator', 'Peptide Cycle Tracker'],
    },
    faqs: [
      { question: 'What is the best peptide calculator app for iPhone?', answer: 'PepKit is a peptide reconstitution calculator for iOS that walks you through vial size, BAC water volume, and desired dose — giving the exact units to draw. Supports BPC-157, TB-500, Semaglutide, Tirzepatide, and hundreds more.' },
      { question: 'Is there an app for tracking BPC-157 dosing?', answer: 'PepKit includes a full cycle planner and dose log for BPC-157 and other peptides. Each injection is logged with date, dose, and body map injection site. Compound level curves are calculated from half-life data.' },
      { question: 'How do I calculate how much BAC water to add to a peptide vial?', answer: "PepKit's reconstitution calculator takes your vial size (e.g., 5mg), desired dose (e.g., 250mcg), and desired concentration, then tells you exactly how many mL of BAC water to add and how many units to draw per dose." },
      { question: 'Is PepKit free on iOS?', answer: 'PepKit is free to download on the App Store. Core reconstitution calculations and cycle tracking are free; inventory management and lab results tracking are available via subscription.' },
      { question: 'What peptide tracking app works for GLP-1 like Semaglutide or Tirzepatide?', answer: 'PepKit tracks GLP-1 peptides including Semaglutide and Tirzepatide with dose escalation scheduling, compound level curves, and injection site logging. It also tracks lab results alongside your active protocol.' },
    ],
  },
];

const homeSeo = {
  title: 'Ashwin Anbazhagan | Premium App Creator',
  description: 'Crafting high-fidelity mobile experiences and AI-powered digital products. Exploring the intersection of design, code, and wellness.',
  keywords: ['Ashwin Anbazhagan', 'App Developer', 'iOS Developer', 'SaaS Founder'],
};

// ─── pSEO pages (mirrors pseo.ts — keep in sync) ────────────────────────────
const pseoPages = [
  {
    appId: 'masterly',
    slug: 'vs-anki',
    type: 'compare',
    title: 'Masterly AI vs Anki — AI Flashcard App Alternative | briefly.live',
    metaDescription: 'Comparing Masterly AI vs Anki for studying. Masterly auto-generates flashcards from your own notes and locks your phone until you pass — no manual card creation needed.',
    faqs: [
      { question: 'Is Masterly AI a good Anki alternative?', answer: "Masterly AI is an Anki alternative that auto-generates flashcards from your own uploaded notes and syllabus — no manual card creation needed. It also adds app blocking so your phone stays locked until you pass today's quiz." },
      { question: 'Does Masterly AI work without manually creating cards?', answer: 'Yes. Masterly AI generates all flashcards and quizzes automatically from PDFs or text you upload. You never manually enter a card.' },
      { question: 'Which is better for medical students — Anki or Masterly AI?', answer: "Both work for medical students. Anki has a larger shared deck community. Masterly AI wins if you study from your own lecture notes and want built-in app blocking to enforce your study schedule." },
    ],
  },
  {
    appId: 'masterly',
    slug: 'vs-quizlet',
    type: 'compare',
    title: 'Masterly AI vs Quizlet — Free Quizlet Alternative for iPhone | briefly.live',
    metaDescription: 'Masterly AI vs Quizlet: compare AI flashcard generation, app blocking, and study plan features. Masterly builds your entire study schedule from your own notes — free on iPhone.',
    faqs: [
      { question: 'Is there a free Quizlet alternative for iPhone?', answer: 'Masterly AI is a free Quizlet alternative for iPhone that generates flashcards from your own uploaded notes. Unlike Quizlet, it also builds a day-by-day study plan and locks your apps until you pass each quiz.' },
      { question: 'Does Masterly AI have Quizlet-style flashcards?', answer: 'Yes. Masterly AI generates flip flashcards and multiple-choice quizzes automatically from your notes — similar to Quizlet but without the manual card creation.' },
      { question: 'Why would I use Masterly over Quizlet?', answer: 'Masterly AI adds a built-in study planner and app blocker that Quizlet lacks. If you need discipline to stick to a study schedule — not just a flashcard library — Masterly is the stronger choice.' },
    ],
  },
  {
    appId: 'masterly',
    slug: 'ai-flashcard-generator-pdf',
    type: 'guide',
    title: 'AI Flashcard Generator from PDF — Masterly AI for iPhone | briefly.live',
    metaDescription: 'Masterly AI generates flashcards automatically from any PDF, syllabus, or notes you upload. No manual card creation. Free AI flashcard maker for iPhone.',
    faqs: [
      { question: 'Is there an app that generates flashcards from a PDF?', answer: 'Masterly AI generates flip flashcards and multiple-choice quizzes from any PDF, syllabus, or notes you upload. It also builds a day-by-day study plan from your exam date.' },
      { question: 'How do I turn my lecture notes into flashcards on iPhone?', answer: 'Upload your lecture notes or syllabus PDF to Masterly AI. The app uses AI to extract key concepts and generate flashcards and quizzes automatically — no editing required.' },
      { question: 'Is the AI flashcard generator in Masterly free?', answer: 'Masterly AI is free to download. Basic AI generation is included; unlimited flashcard sets and app blocking require a subscription.' },
    ],
  },
  {
    appId: 'masterly',
    slug: 'flashcard-app-medical-students',
    type: 'guide',
    title: 'Best Flashcard App for Medical Students — Masterly AI | briefly.live',
    metaDescription: 'Masterly AI generates medical flashcards from your own lecture notes and builds a day-by-day USMLE or exam study plan. App blocking enforces your study schedule.',
    faqs: [
      { question: 'What is the best flashcard app for medical students?', answer: 'Masterly AI is a flashcard app for medical students that generates cards from your own uploaded lecture notes and textbook PDFs. It builds a day-by-day study schedule toward your exam date and uses app blocking to enforce it.' },
      { question: 'Can Masterly AI help with USMLE prep?', answer: 'Masterly AI can generate flashcards and quizzes from any USMLE study material you upload. Set your exam date and it builds a structured daily plan to cover all content before you sit.' },
      { question: 'Does Masterly AI work for anatomy or pharmacology?', answer: 'Yes. Masterly AI works with any subject material you upload — anatomy diagrams with descriptions, pharmacology PDFs, or clinical notes all generate valid flashcards and quizzes.' },
    ],
  },
  {
    appId: 'menucheck',
    slug: 'vs-spoonful',
    type: 'compare',
    title: 'Menu Check vs Spoonful — Best FODMAP Scanner App Comparison | briefly.live',
    metaDescription: 'Menu Check vs Spoonful for FODMAP scanning. Menu Check adds restaurant menu photo scanning and 100+ gut conditions. Compare features, pricing, and IBS support.',
    faqs: [
      { question: 'Is Menu Check better than Spoonful for FODMAP?', answer: 'Menu Check supports FODMAP alongside 100+ other gut conditions, adds restaurant menu photo scanning, and uses OpenFoodFacts for 3M+ product barcodes. Spoonful focuses primarily on grocery barcodes with a FODMAP-first lens.' },
      { question: 'What FODMAP app also works in restaurants?', answer: 'Menu Check scans physical restaurant menus via your camera. AI reads and scores every dish against your FODMAP, IBS, or gut health profile — no manual searching required.' },
      { question: 'Is there a free Spoonful alternative for IBS?', answer: 'Menu Check is a free Spoonful alternative for IBS and FODMAP that adds restaurant menu scanning and support for Celiac, IBD, histamine intolerance, and 100+ other conditions.' },
    ],
  },
  {
    appId: 'menucheck',
    slug: 'best-fodmap-apps-2026',
    type: 'guide',
    title: 'Best Low FODMAP Apps 2026 — iPhone Gut Health Scanner Guide | briefly.live',
    metaDescription: 'The best low FODMAP apps for iPhone in 2026. Menu Check tops the list with restaurant menu scanning, 3M+ barcode database, and support for 100+ gut conditions.',
    faqs: [
      { question: 'What is the best FODMAP app for iPhone in 2026?', answer: 'Menu Check is the top FODMAP app for iPhone in 2026. It combines barcode scanning for 3M+ grocery products with restaurant menu photo scanning — giving Safe, Limit, or Avoid verdicts in real time.' },
      { question: 'Which FODMAP app works at restaurants?', answer: 'Menu Check is the only major FODMAP app that lets you point your camera at a restaurant menu and get AI-powered verdicts on every dish, scored against your specific gut health profile.' },
      { question: 'Is there a free FODMAP scanner app?', answer: 'Yes. Menu Check is free to download on iOS. Core FODMAP scanning for barcodes and restaurant menus is free; premium unlocks unlimited AI recipe generation and advanced dietary filtering.' },
    ],
  },
  {
    appId: 'menucheck',
    slug: 'ibs-food-scanner-restaurants',
    type: 'guide',
    title: 'IBS Food Scanner for Restaurants — Menu Check App | briefly.live',
    metaDescription: 'Menu Check scans restaurant menus for IBS with AI. Point your camera, get instant Safe/Limit/Avoid verdicts for every dish. Free on iPhone.',
    faqs: [
      { question: 'Is there an app that scans restaurant menus for IBS?', answer: 'Menu Check lets you photograph any restaurant menu. AI reads every dish and gives a Safe, Limit, or Avoid verdict based on your IBS, FODMAP, or gut health profile.' },
      { question: 'How does Menu Check work in restaurants?', answer: 'Open Menu Check, tap the menu scan button, and point your camera at the menu. The app reads the text, identifies dishes and ingredients, and scores each one against your profile in seconds.' },
      { question: 'Does Menu Check work offline in restaurants?', answer: 'Menu Check requires an internet connection for AI menu analysis. Barcode scanning uses cached data and works with limited connectivity for previously scanned products.' },
    ],
  },
  {
    appId: 'pepkit',
    slug: 'bpc-157-dosage-calculator',
    type: 'guide',
    title: 'BPC-157 Dosage Calculator App — PepKit for iPhone | briefly.live',
    metaDescription: 'PepKit is a BPC-157 dosage calculator app for iPhone. Calculate BAC water volume, draw units, log injections, and track compound levels. Free on iOS.',
    faqs: [
      { question: 'Is there a BPC-157 dosage calculator app?', answer: 'PepKit is a BPC-157 dosage calculator for iPhone. Enter your vial size, desired dose, and BAC water volume — PepKit calculates the exact units to draw and logs each injection with date and body map site.' },
      { question: 'How do I calculate BPC-157 reconstitution?', answer: 'In PepKit, add a new peptide (BPC-157), enter vial size (e.g., 5mg) and target dose (e.g., 250mcg), and the app calculates how many mL of BAC water to add and how many units to draw per injection.' },
      { question: 'Can PepKit track a BPC-157 cycle?', answer: 'Yes. PepKit logs every BPC-157 injection, tracks your cycle start and end dates, auto-deducts inventory with low-stock alerts, and plots compound level curves based on the peptide half-life.' },
    ],
  },
  {
    appId: 'pepkit',
    slug: 'semaglutide-dose-calculator',
    type: 'guide',
    title: 'Semaglutide Dose Calculator App — PepKit for iPhone | briefly.live',
    metaDescription: 'PepKit is a semaglutide dose calculator app for iPhone. Calculate GLP-1 injection amounts, log doses, track escalation schedules, and monitor compound levels. Free.',
    faqs: [
      { question: 'Is there a semaglutide dose calculator app for iPhone?', answer: 'PepKit is a semaglutide dose calculator for iPhone. It calculates reconstitution ratios, tracks your dose escalation schedule, logs injections, and plots semaglutide compound levels over time.' },
      { question: 'How do I track my semaglutide injections with an app?', answer: 'In PepKit, create a semaglutide cycle with your starting dose and escalation schedule. The app logs each injection, shows what dose is due today, tracks inventory, and visualizes compound levels.' },
      { question: 'Does PepKit support tirzepatide and other GLP-1 peptides?', answer: 'Yes. PepKit supports Semaglutide, Tirzepatide, and all major GLP-1 peptides with individual reconstitution calculators, dose escalation tracking, and half-life compound level curves.' },
    ],
  },
  {
    appId: 'morningjournal',
    slug: 'vs-day-one',
    type: 'compare',
    title: 'Honestly vs Day One — Best Morning Journal App for iPhone 2026 | briefly.live',
    metaDescription: 'Honestly: Morning Journal vs Day One for iPhone. Honestly adds app blocking, structured morning rituals, and home screen widgets. Compare features for your daily routine.',
    faqs: [
      { question: 'Is Honestly a good Day One alternative?', answer: 'Honestly: Morning Journal is a Day One alternative optimized for morning routines. It structures your session into 4 steps (Mood, Journal, 3 Big Wins, Gratitude), adds app blocking, and syncs widgets to your home screen — features Day One does not have.' },
      { question: 'What morning journal app blocks social media?', answer: 'Honestly: Morning Journal blocks distracting apps via iOS Screen Time until you complete your daily reflection ritual. Day One has no app blocking features.' },
      { question: 'Which is better for a morning routine — Day One or Honestly?', answer: "If you want an unstructured long-form journal, Day One is the better fit. If you want a structured morning ritual with app blocking and home screen widgets to start your day intentionally, Honestly is the stronger choice." },
    ],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function buildHead({ title, description, keywords, canonical, appStoreUrl, category, appName, appNumericId, appId, aggregateRating, screenshots, faqs }) {
  const kw = keywords.join(', ');
  const image = `${BASE}/og-image.png`;

  const appSchema = appName ? JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: appName,
    description,
    applicationCategory: category || 'HealthApplication',
    operatingSystem: 'iOS',
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
    <script type="application/ld+json">${appSchema}</script>${faqSchema}`.trim();
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
      category: app.category,
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
  const headContent = buildHead({
    title: page.title,
    description: page.metaDescription,
    keywords: app ? app.seo.keywords : [],
    canonical,
    appStoreUrl: app?.appStoreUrl,
    category: app?.category,
    appName: app?.name,
    appNumericId: app?.appNumericId,
    appId: page.appId,
    aggregateRating: null,
    screenshots: null,
    faqs: page.faqs,
  });

  writeRoute(templateHtml, routePath, headContent, bodyHtml);
}

console.log('\nDone. All routes pre-rendered with full HTML.\n');
