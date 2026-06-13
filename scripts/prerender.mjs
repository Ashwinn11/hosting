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
    appId: 'shotly',
    slug: 'ozempic-injection-tracker',
    type: 'guide',
    title: 'Best Ozempic Injection Tracker App for iPhone 2026 — Shotly | briefly.live',
    metaDescription: 'Shotly is the best Ozempic injection tracker for iPhone. Log every weekly dose, track weight loss, monitor protein intake, and never miss a shot. Free on iOS.',
    faqs: [
      { question: 'What is the best app to track Ozempic injections?', answer: 'Shotly is a dedicated Ozempic tracker for iPhone. Log weekly injections with dose, site, and notes. Track your weight loss trend, monitor protein and nutrition, and see a live countdown to your next dose.' },
      { question: 'How do I remember my Ozempic injection day?', answer: 'Shotly sends a notification reminder on your chosen injection day and time. The home screen shows a live countdown — so you always know how many days until your next Ozempic dose.' },
      { question: 'Is there a free Ozempic tracker app for iPhone?', answer: 'Shotly is free to download on iOS. Core injection logging and weight tracking are free. Premium unlocks meal logging, body measurements, side effect tracking, and progress photos.' },
    ],
  },
  {
    appId: 'shotly',
    slug: 'mounjaro-weight-loss-tracker',
    type: 'guide',
    title: 'Best Mounjaro Weight Loss Tracker App for iPhone — Shotly | briefly.live',
    metaDescription: 'Shotly is a dedicated Mounjaro tracker for iPhone. Log weekly tirzepatide injections, track weight loss from 2.5mg to 15mg, and monitor nutrition. Free on iOS.',
    faqs: [
      { question: 'What is the best app to track Mounjaro injections?', answer: 'Shotly is a dedicated Mounjaro tracker for iPhone. Log every weekly tirzepatide injection with dose, site, and notes. Track weight loss from 2.5mg to 15mg and monitor protein and nutrition.' },
      { question: 'Is there a Mounjaro tracker app for iPhone?', answer: 'Shotly is free on iOS and purpose-built for Mounjaro users. It supports the full 2.5–15mg dose escalation schedule, injection site rotation, weekly weight logging, and nutrition tracking.' },
      { question: 'How much weight can I expect to lose on Mounjaro?', answer: 'Clinical trials showed average weight loss of 15–22% of body weight at the 15mg dose. Shotly tracks your personal trend — total pounds lost, average weekly rate, and progress to goal.' },
    ],
  },
  {
    appId: 'honestly',
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
  {
    appId: 'honestly',
    slug: 'morning-journaling-routine-habits',
    type: 'guide',
    title: 'Best Morning Journaling Routine for Your Mental Health | Honestly',
    metaDescription: 'Learn how to create a sustainable morning journaling routine. Science-backed techniques to reduce anxiety, improve focus, and build a habit that lasts.',
    faqs: [
      { question: 'How long should a morning journal entry be?', answer: 'Five minutes. Journaling is most effective when it\'s brief and consistent — not lengthy and sporadic. Aim for a few sentences that address your mood and intention for the day.' },
      { question: 'What should I journal about each morning?', answer: 'Start with a prompt that matches your goal (clarity, peace, focus, or energy). Answer one question honestly. Add one gratitude. End with your mood. Honestly automates this structure.' },
      { question: 'Can journaling really change your day?', answer: 'Yes. Starting your day with intention and reflection primes your brain to notice opportunities and manage stress better. Consistency matters more than depth.' },
    ],
  },
  {
    appId: 'honestly',
    slug: 'best-journaling-apps-2026',
    type: 'guide',
    title: 'Best Journaling Apps for iPhone 2026 — Honest, Private, Effective',
    metaDescription: 'Compare top journaling apps for iPhone. Find the best app for daily reflections, mood tracking, and building a sustainable journaling habit.',
    faqs: [
      { question: 'What is the best app for daily journaling?', answer: 'The best journaling app is one you\'ll use daily. Honestly works because the ritual is quick (5 minutes), prompts are varied, and your apps lock until you finish — built-in accountability.' },
      { question: 'Are journaling apps good for mental health?', answer: 'Yes. Daily reflection reduces anxiety and improves emotional awareness. The app just needs to get out of your way and help you establish the habit.' },
      { question: 'Should I use a journaling app or pen and paper?', answer: 'Both work. Digital journaling is convenient and syncs across devices. Paper is more tactile. Choose whatever you\'ll actually do consistently.' },
    ],
  },
  {
    appId: 'honestly',
    slug: 'vs-day-one-journal',
    type: 'compare',
    title: 'Honestly vs Day One — Best Morning Journal App for iPhone',
    metaDescription: 'Compare Honestly vs Day One journal apps. Honestly adds app blocking to keep you focused; Day One focuses on journaling depth and archival.',
    faqs: [
      { question: 'Is Honestly better than Day One?', answer: 'Both are excellent. Day One is better for long-form journaling and archival. Honestly is better for building a daily habit with accountability.' },
      { question: 'Does Day One have app blocking?', answer: 'No. Day One is a pure journaling app. Honestly adds app blocking to ensure you journal before social media and games unlock.' },
      { question: 'Can I use both Honestly and Day One?', answer: 'Yes. Some people use Honestly for daily ritual and Day One for deeper weekly reflection.' },
    ],
  },
  {
    appId: 'masterly',
    slug: 'vs-studysmarter',
    type: 'compare',
    title: 'Masterly AI vs StudySmarter — Best AI Study App for iPhone',
    metaDescription: 'Compare Masterly AI and StudySmarter. Masterly auto-generates study plans and locks apps; StudySmarter focuses on shared notes and AI tutoring.',
    faqs: [
      { question: 'Is Masterly AI better than StudySmarter?', answer: 'For self-generated study: yes. For accessing shared community notes: StudySmarter wins. Masterly is better if you study from your own notes and need app blocking to stay focused.' },
      { question: 'Does StudySmarter have app blocking?', answer: 'No. StudySmarter is a notes and tutoring app. Masterly is the only app that locks your phone until you study.' },
      { question: 'Should I use Masterly or StudySmarter?', answer: 'Use Masterly if you upload your own notes and need discipline. Use StudySmarter if you want to access community study sets and AI tutoring.' },
    ],
  },
  {
    appId: 'menucheck',
    slug: 'vs-fooducate',
    type: 'compare',
    title: 'Menu Check vs Fooducate — Best Food Scanner for IBS and Allergies',
    metaDescription: 'Compare Menu Check vs Fooducate for scanning restaurant menus and grocery barcodes. Menu Check specializes in IBS; Fooducate is broader.',
    faqs: [
      { question: 'Is Menu Check better than Fooducate for IBS?', answer: 'Yes. Menu Check gives IBS-specific verdicts (Safe/Limit/Avoid) based on trigger foods. Fooducate is a general nutrition app.' },
      { question: 'Does Fooducate have FODMAP tracking?', answer: 'No. Menu Check is the only app built specifically for FODMAP, IBS, and Celiac disease.' },
      { question: 'Should I use Menu Check or Fooducate?', answer: 'Use Menu Check if you have IBS, Celiac, or FODMAP sensitivity. Use Fooducate if you want general nutrition grades.' },
    ],
  },
  {
    appId: 'shotly',
    slug: 'vs-insulin-tracker',
    type: 'compare',
    title: 'Shotly vs Insulin Tracker — Best GLP-1 Injection Tracker App',
    metaDescription: 'Compare Shotly and Insulin Tracker for GLP-1 tracking. Shotly specializes in Ozempic, Wegovy, Mounjaro; Insulin Tracker is broader.',
    faqs: [
      { question: 'Is Shotly just for Ozempic?', answer: 'No. Shotly tracks all GLP-1 medications: Ozempic, Wegovy, Mounjaro, Zepbound, and Saxenda.' },
      { question: 'Can I use Insulin Tracker for GLP-1?', answer: 'Yes, but Shotly is better optimized. Shotly has pre-loaded dose schedules and weight loss tracking that insulin trackers lack.' },
      { question: 'What is the best app to track Wegovy?', answer: 'Shotly is built for Wegovy tracking with dose schedules, weight logging, and progress graphs.' },
    ],
  },
  {
    appId: 'yumeship',
    slug: 'long-distance-relationship-communication-tips',
    type: 'guide',
    title: 'Long Distance Relationship Communication Tips — How to Stay Connected',
    metaDescription: 'Long distance relationship tips for staying emotionally connected. Communication strategies, date ideas, and tools to make distance manageable.',
    faqs: [
      { question: 'How often should long distance couples talk?', answer: 'Daily is ideal. One meaningful call or video date + messaging throughout the day. Quality matters more than quantity.' },
      { question: 'What makes long distance relationships fail?', answer: 'Lack of intentional connection, unmet expectations about communication frequency, and not having visit dates planned.' },
      { question: 'Can a long distance relationship work?', answer: 'Yes. 58% of long distance relationships succeed — often because couples communicate more intentionally than in-person couples.' },
    ],
  },
  {
    appId: 'catch-wildlife',
    slug: 'best-bird-identification-app',
    type: 'guide',
    title: 'Best Bird Identification App for iPhone — Identify Birds by Photo or Sound',
    metaDescription: 'Best bird identification apps for iPhone. Identify birds by photo, sound, or behavior. Compare AI apps and learn birdwatching skills.',
    faqs: [
      { question: 'What is the best bird identification app?', answer: 'Merlin by Cornell is trusted by ornithologists. Catch Wildlife is optimized for iPhone with AI photo identification and a beautiful interface. Choose based on features you use most.' },
      { question: 'Can phone apps really identify birds?', answer: 'Yes. Modern AI is trained on thousands of bird photos and can identify most common species with 85-95% accuracy, especially with clear photos.' },
      { question: 'How do you identify a bird you don\'t know?', answer: 'Look for field marks: color patterns, wing bars, bill shape, and behavior. Compare to similar species in your region. A good field guide app narrows options quickly.' },
    ],
  },
  {
    appId: 'yumeship',
    slug: 'long-distance-relationship-app-2026',
    type: 'guide',
    title: 'Best Long Distance Relationship App 2026 | YumeShip | briefly.live',
    metaDescription: 'YumeShip is the best long distance relationship app. Share daily moments, track mood, countdown to visits, and keep your connection strong. Free on iPhone.',
    faqs: [
      { question: 'What is the best app for long distance couples?', answer: 'YumeShip is a long distance relationship app that lets couples share daily moments, track mood with colors, set visit countdowns, and keep a private timeline — all encrypted and synced across iPhone and iPad.' },
      { question: 'Can a long distance relationship app really help?', answer: 'Yes. YumeShip gives couples dedicated space to connect daily. The color mood tracking and countdown timers create rituals that keep emotional connection strong despite distance.' },
      { question: 'Is YumeShip free for long distance couples?', answer: 'YumeShip is free to download and use. All core features — shared timeline, mood tracking, countdowns — are included. Premium adds advanced features.' },
    ],
  },
  {
    appId: 'catch-wildlife',
    slug: 'best-animal-identification-app-2026',
    type: 'guide',
    title: 'Best Animal Identification App 2026 | Catch Wildlife | briefly.live',
    metaDescription: 'Catch Wildlife is the best animal identification app. Snap any wildlife and get instant AI identification. Build your personal collection. Free on iPhone.',
    faqs: [
      { question: 'What is the best animal identification app?', answer: 'Catch Wildlife is an AI-powered animal identification app that instantly identifies wildlife from a photo. See species name, habitat, behavior, and add to your personal collection.' },
      { question: 'Can an app identify animals from photos?', answer: 'Yes. Catch Wildlife uses machine learning trained on thousands of wildlife photos to identify birds, mammals, reptiles, insects, and other animals with high accuracy.' },
      { question: 'Is animal identification app free?', answer: 'Catch Wildlife is free to download on iOS. Core identification and personal collection features are free. Premium unlocks advanced filtering and detailed species data.' },
    ],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function buildHead({ title, description, keywords, canonical, appStoreUrl, downloadUrl, seoApplicationCategory, appName, appNumericId, appId, aggregateRating, screenshots, faqs }) {
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
