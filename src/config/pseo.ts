export interface PSEOPage {
  appId: string;
  slug: string;
  type: 'compare' | 'guide';
  title: string;
  h1: string;
  metaDescription: string;
  targetKeyword: string;
  intro: string;
  sections: Array<{ heading: string; body: string }>;
  comparisonTable?: Array<{ feature: string; app: string; competitor: string }>;
  faqs: Array<{ question: string; answer: string }>;
  cta: string;
}

export const pseoPages: PSEOPage[] = [
  {
    appId: 'masterly',
    slug: 'vs-anki',
    type: 'compare',
    title: 'Masterly AI vs Anki — AI Flashcard App Alternative | briefly.live',
    h1: 'Masterly AI vs Anki: Which Flashcard App Is Right for You?',
    metaDescription: 'Comparing Masterly AI vs Anki for studying. Masterly auto-generates flashcards from your own notes and locks your phone until you pass — no manual card creation needed.',
    targetKeyword: 'anki alternative with AI',
    intro: "Anki has been the gold standard for spaced repetition flashcards for over a decade. But it requires hours of manual card creation before you can study a single concept. Masterly AI takes the opposite approach: upload your syllabus or lecture notes, and the AI builds your entire flashcard deck and study schedule automatically. If you're a student who wants to actually study rather than spend time setting up your study system, Masterly AI is built for you.",
    sections: [
      {
        heading: 'How Flashcard Creation Works',
        body: "In Anki, every card is manually created — you type the question, the answer, and choose the deck. For complex subjects like medicine or law, building a quality Anki deck can take as long as studying the material itself. Masterly AI eliminates this entirely. Upload a PDF, paste in your notes, or drop in your syllabus, and the app generates flip flashcards and multiple-choice quizzes automatically. The AI extracts key concepts, definitions, and testable facts — ready to review in minutes, not hours.",
      },
      {
        heading: 'Study Scheduling',
        body: "Anki uses a spaced repetition algorithm (SM-2) that schedules cards based on how well you remember them. It's powerful but passive — Anki tells you what to review, not what to study next. Masterly AI adds a structured study planner: set your exam date, and the app builds a day-by-day plan that covers your entire syllabus in sequence. Each day has a lesson, flashcards, and a quiz. You always know exactly what to study next.",
      },
      {
        heading: 'App Blocking',
        body: "Anki has no focus or distraction management features. Masterly AI uses iOS Screen Time to lock your chosen apps — Instagram, TikTok, YouTube — during your study window. Your apps unlock automatically once you pass the day's quiz. This is the feature that makes Masterly genuinely different: it's not just a flashcard tool, it's a study discipline system.",
      },
      {
        heading: 'Platform and Pricing',
        body: "Anki is free on desktop and Android, but the iOS app costs $24.99 (one-time). Masterly AI is free on iOS with a subscription for full AI generation and app blocking. If you're primarily studying on iPhone and want zero manual setup, Masterly AI has a lower barrier to entry.",
      },
    ],
    comparisonTable: [
      { feature: 'Auto-generates cards from your notes', app: 'Yes', competitor: 'No — manual only' },
      { feature: 'Day-by-day study planner', app: 'Yes', competitor: 'No' },
      { feature: 'App blocking (Screen Time)', app: 'Yes', competitor: 'No' },
      { feature: 'Spaced repetition algorithm', app: 'Yes', competitor: 'Yes (SM-2)' },
      { feature: 'Shared community decks', app: 'No', competitor: 'Yes (AnkiWeb)' },
      { feature: 'Free on iOS', app: 'Yes (subscription)', competitor: '$24.99 one-time' },
    ],
    faqs: [
      { question: 'Is Masterly AI a good Anki alternative?', answer: "Masterly AI is an Anki alternative that auto-generates flashcards from your own uploaded notes and syllabus — no manual card creation needed. It also adds app blocking so your phone stays locked until you pass today's quiz." },
      { question: 'Does Masterly AI work without manually creating cards?', answer: 'Yes. Masterly AI generates all flashcards and quizzes automatically from PDFs or text you upload. You never manually enter a card.' },
      { question: 'Which is better for medical students — Anki or Masterly AI?', answer: "Both work for medical students. Anki has a larger shared deck community for pre-made medical cards. Masterly AI wins if you study from your own lecture notes and want built-in app blocking to enforce your study schedule." },
    ],
    cta: 'Try Masterly AI Free on iPhone',
  },
  {
    appId: 'masterly',
    slug: 'vs-quizlet',
    type: 'compare',
    title: 'Masterly AI vs Quizlet — Free Quizlet Alternative for iPhone | briefly.live',
    h1: 'Masterly AI vs Quizlet: The Better iPhone Study App in 2026',
    metaDescription: 'Masterly AI vs Quizlet: compare AI flashcard generation, app blocking, and study plan features. Masterly builds your entire study schedule from your own notes — free on iPhone.',
    targetKeyword: 'free quizlet alternative iphone',
    intro: "Quizlet is the most popular study app in the world, but in 2026 it's increasingly paywalled — and it still requires you to manually create every card. Masterly AI is a free Quizlet alternative for iPhone that generates your flashcards and study plan automatically from your own notes. No manual input. No paywall for the core features. And one thing Quizlet has never had: app blocking that keeps you focused until you actually learn the material.",
    sections: [
      {
        heading: 'AI Flashcard Generation',
        body: "Quizlet's AI features (Magic Notes, Q-Chat) are paywalled behind Quizlet Plus ($35.99/year). Even with a subscription, you still need to review and edit the AI output. Masterly AI generates flashcards from your uploads with no manual editing required. The AI formats cards for flip review and multiple-choice quizzes — ready to use immediately.",
      },
      {
        heading: 'Study Planning',
        body: "Quizlet gives you flashcard sets to study but no schedule for how to use them. Masterly AI takes your exam date and builds a structured day-by-day plan. You know what to study today, tomorrow, and every day until your exam. The plan adapts to your pace as you complete each day's quiz.",
      },
      {
        heading: 'App Blocking',
        body: "Neither Quizlet nor any other mainstream study app locks your phone during study time. Masterly AI does. Using iOS Screen Time, Masterly locks your chosen apps until you pass the day's quiz. This accountability layer is the reason students who've tried everything else finally stick to a study schedule with Masterly.",
      },
      {
        heading: 'Cost Comparison',
        body: "Quizlet's free tier is heavily restricted in 2026 — most useful features require Quizlet Plus. Masterly AI is free to download with core AI generation included. The app blocking and unlimited study sets require a Masterly subscription, priced competitively with Quizlet Plus.",
      },
    ],
    comparisonTable: [
      { feature: 'Auto-generates cards from your notes', app: 'Yes (free tier)', competitor: 'Yes (paid only)' },
      { feature: 'Day-by-day exam study plan', app: 'Yes', competitor: 'No' },
      { feature: 'App blocking', app: 'Yes', competitor: 'No' },
      { feature: 'Study streak tracking', app: 'Yes', competitor: 'Yes' },
      { feature: 'Pre-made community sets', app: 'No', competitor: 'Yes (millions)' },
      { feature: 'Free iOS download', app: 'Yes', competitor: 'Yes (restricted)' },
    ],
    faqs: [
      { question: 'Is there a free Quizlet alternative for iPhone?', answer: 'Masterly AI is a free Quizlet alternative for iPhone that generates flashcards from your own uploaded notes. Unlike Quizlet, it also builds a day-by-day study plan and locks your apps until you pass each quiz.' },
      { question: 'Does Masterly AI have Quizlet-style flashcards?', answer: 'Yes. Masterly AI generates flip flashcards and multiple-choice quizzes automatically from your notes — similar to Quizlet but without the manual card creation.' },
      { question: 'Why would I use Masterly over Quizlet?', answer: 'Masterly AI adds a built-in study planner and app blocker that Quizlet lacks. If you need discipline to stick to a study schedule — not just a flashcard library — Masterly is the stronger choice.' },
    ],
    cta: 'Get Masterly AI Free',
  },
  {
    appId: 'masterly',
    slug: 'ai-flashcard-generator-pdf',
    type: 'guide',
    title: 'AI Flashcard Generator from PDF — Masterly AI for iPhone | briefly.live',
    h1: 'Turn Any PDF into Flashcards in Minutes with Masterly AI',
    metaDescription: 'Masterly AI generates flashcards automatically from any PDF, syllabus, or notes you upload. No manual card creation. Free AI flashcard maker for iPhone.',
    targetKeyword: 'AI flashcard maker from PDF notes',
    intro: "Every student has the same problem: your notes and readings pile up, but converting them into something you can actually study takes hours. Masterly AI is an AI flashcard generator for iPhone that turns any PDF, syllabus, or pasted text into a complete set of flip flashcards and quizzes — automatically. Upload your material, set your exam date, and Masterly builds your entire study schedule. No manual card creation. No formatting. Just studying.",
    sections: [
      {
        heading: 'How to Generate Flashcards from a PDF',
        body: "Open Masterly AI and create a new course. Tap 'Upload Material' and select a PDF from your Files app, or paste in text directly. The AI analyzes the content, identifies key concepts, definitions, and testable facts, and generates a full set of flip flashcards and multiple-choice quiz questions. For a typical lecture PDF (10–20 pages), generation takes under 30 seconds.",
      },
      {
        heading: 'What Kinds of PDFs Work Best',
        body: "Masterly AI works with any text-based PDF: lecture slides, textbook chapters, study guides, syllabi, and research papers. It handles academic subjects across all disciplines — medicine, law, engineering, business, history, languages, and more. Image-heavy PDFs (pure scanned pages with no text layer) work best when you add text context alongside the upload.",
      },
      {
        heading: 'From Flashcards to a Full Study Plan',
        body: "Unlike basic flashcard generators that just create cards, Masterly AI builds a complete study schedule. Set your exam date, and the app calculates how many days you have and how to pace through your material. Each day has a lesson, flashcard review session, and a quiz. Pass the quiz to unlock your apps for the day — and mark that day's progress in your streak.",
      },
      {
        heading: 'The App Blocking Difference',
        body: "Most flashcard generators stop at making cards. Masterly AI closes the loop: your chosen apps (social media, games, streaming) stay locked via iOS Screen Time until you pass today's quiz. The PDF upload is just the starting point. The accountability system is what makes students actually use the flashcards they generate.",
      },
    ],
    faqs: [
      { question: 'Is there an app that generates flashcards from a PDF?', answer: 'Masterly AI generates flip flashcards and multiple-choice quizzes from any PDF, syllabus, or notes you upload. It also builds a day-by-day study plan from your exam date.' },
      { question: 'How do I turn my lecture notes into flashcards on iPhone?', answer: 'Upload your lecture notes or syllabus PDF to Masterly AI. The app uses AI to extract key concepts and generate flashcards and quizzes automatically — no editing required.' },
      { question: 'Is the AI flashcard generator in Masterly free?', answer: 'Masterly AI is free to download. Basic AI generation is included; unlimited flashcard sets and app blocking require a subscription.' },
    ],
    cta: 'Generate Flashcards from Your PDF',
  },
  {
    appId: 'masterly',
    slug: 'flashcard-app-medical-students',
    type: 'guide',
    title: 'Best Flashcard App for Medical Students — Masterly AI | briefly.live',
    h1: 'The Flashcard App That Builds Your Med School Study Plan',
    metaDescription: 'Masterly AI generates medical flashcards from your own lecture notes and builds a day-by-day USMLE or exam study plan. App blocking enforces your study schedule.',
    targetKeyword: 'flashcard app for medical students',
    intro: "Medical school demands more than flashcards — it demands a system. You need to cover an enormous volume of material in a fixed window, stay consistent every day, and actually retain what you study. Masterly AI is a flashcard app for medical students that generates cards from your own lecture notes, builds a day-by-day study plan toward your exam date, and uses iOS Screen Time to keep you off social media until you've completed each day's session.",
    sections: [
      {
        heading: 'Generate Flashcards from Your Own Lecture Notes',
        body: "Pre-made decks like Anki's Zanki or Lightyear are popular in medical school, but they don't match your professor's lectures, your school's curriculum, or your own learning gaps. Masterly AI generates flashcards from the specific PDFs and notes you upload — so every card is directly relevant to what you'll be tested on. Upload your anatomy block PDFs, pharmacology lecture slides, or clinical case summaries and get a custom flashcard set in under a minute.",
      },
      {
        heading: 'Structured Daily Study Plan',
        body: "Medical school exams have fixed dates. Masterly AI uses your exam date and syllabus to build a day-by-day study plan that covers everything in sequence. Each day includes a lesson review, flashcard session, and a multiple-choice quiz. The plan tells you exactly what to study today — removing the paralysis of deciding where to start and the anxiety of not knowing if you're on pace.",
      },
      {
        heading: 'App Blocking for Sustained Focus',
        body: "The biggest study problem in medical school isn't material volume — it's focus. Masterly AI uses Apple's Family Controls API to lock distracting apps during your study window. Instagram, Reddit, YouTube, and any other apps you choose stay locked until you pass today's quiz. For students who know they're smart enough but struggle to actually sit down and study, this is the difference-maker.",
      },
      {
        heading: 'Streak System and Progress Tracking',
        body: "Masterly AI tracks your daily quiz completion streak. Medical school requires months of consistent study — not just cramming the night before. The streak system provides a concrete daily goal: don't break the chain. Combined with the app blocker, it creates the strongest accountability loop available in any study app.",
      },
    ],
    faqs: [
      { question: 'What is the best flashcard app for medical students?', answer: 'Masterly AI is a flashcard app for medical students that generates cards from your own uploaded lecture notes and textbook PDFs. It builds a day-by-day study schedule toward your exam date and uses app blocking to enforce it.' },
      { question: 'Can Masterly AI help with USMLE prep?', answer: 'Masterly AI can generate flashcards and quizzes from any USMLE study material you upload. Set your exam date and it builds a structured daily plan to cover all content before you sit.' },
      { question: 'Does Masterly AI work for anatomy or pharmacology?', answer: 'Yes. Masterly AI works with any subject material you upload — anatomy lecture slides, pharmacology PDFs, or clinical case notes all generate valid flashcards and quizzes.' },
    ],
    cta: 'Start Studying with Masterly AI',
  },
  {
    appId: 'menucheck',
    slug: 'vs-spoonful',
    type: 'compare',
    title: 'Menu Check vs Spoonful — Best FODMAP Scanner App Comparison | briefly.live',
    h1: 'Menu Check vs Spoonful: Which FODMAP App Is Better?',
    metaDescription: 'Menu Check vs Spoonful for FODMAP scanning. Menu Check adds restaurant menu photo scanning and 100+ gut conditions. Compare features, pricing, and IBS support.',
    targetKeyword: 'spoonful alternative FODMAP',
    intro: "Both Menu Check and Spoonful help you find safe foods when you have gut conditions. But they take different approaches — and for many users with IBS, Celiac, or complex multi-condition profiles, the difference matters enormously. This comparison breaks down what each app does, where each excels, and which one is right for your situation.",
    sections: [
      {
        heading: 'Barcode Scanning',
        body: "Both apps scan grocery barcodes. Spoonful has a curated database optimized for FODMAP accuracy. Menu Check uses OpenFoodFacts (3M+ products) combined with AI ingredient analysis, giving broader product coverage at the cost of requiring internet for real-time analysis. For mainstream grocery products, both apps perform well. For specialty, international, or store-brand products, Menu Check's larger database is the advantage.",
      },
      {
        heading: 'Restaurant Menu Scanning',
        body: "This is Menu Check's biggest differentiator. Point your camera at any restaurant menu and Menu Check's AI reads every dish and ingredient, then scores each one against your profile. Spoonful has no restaurant menu scanning. For users who eat out regularly — one of the hardest parts of living with IBS or Celiac — Menu Check is the only option.",
      },
      {
        heading: 'Condition Coverage',
        body: "Spoonful is built primarily for FODMAP and a handful of common allergens. Menu Check supports 100+ conditions: IBS, Celiac, Crohn's, IBD, SIBO, histamine intolerance, salicylate sensitivity, and many more — plus custom allergen combinations. If your profile is complex (e.g., low-FODMAP + Celiac + nut allergy), Menu Check's multi-condition profiling gives more useful verdicts.",
      },
      {
        heading: 'Pricing',
        body: "Spoonful offers a free tier with limited scans and a premium subscription for unlimited access. Menu Check is free with core scanning included; premium unlocks AI recipe generation and advanced filtering. Both are comparable on price.",
      },
    ],
    comparisonTable: [
      { feature: 'Barcode scanning', app: 'Yes (3M+ products)', competitor: 'Yes (curated database)' },
      { feature: 'Restaurant menu photo scan', app: 'Yes', competitor: 'No' },
      { feature: 'FODMAP support', app: 'Yes', competitor: 'Yes (primary focus)' },
      { feature: 'Celiac / gluten-free support', app: 'Yes', competitor: 'Yes' },
      { feature: 'Conditions supported', app: '100+', competitor: '~10' },
      { feature: 'AI recipe generation', app: 'Yes (premium)', competitor: 'No' },
      { feature: 'Free tier', app: 'Yes', competitor: 'Yes (limited)' },
    ],
    faqs: [
      { question: 'Is Menu Check better than Spoonful for FODMAP?', answer: 'Menu Check supports FODMAP alongside 100+ other gut conditions, adds restaurant menu photo scanning, and uses OpenFoodFacts for 3M+ product barcodes. Spoonful focuses primarily on grocery barcodes with a FODMAP-first lens.' },
      { question: 'What FODMAP app also works in restaurants?', answer: 'Menu Check scans physical restaurant menus via your camera. AI reads and scores every dish against your FODMAP, IBS, or gut health profile — no manual searching required.' },
      { question: 'Is there a free Spoonful alternative for IBS?', answer: 'Menu Check is a free Spoonful alternative for IBS and FODMAP that adds restaurant menu scanning and support for Celiac, IBD, histamine intolerance, and 100+ other conditions.' },
    ],
    cta: 'Try Menu Check Free on iPhone',
  },
  {
    appId: 'menucheck',
    slug: 'best-fodmap-apps-2026',
    type: 'guide',
    title: 'Best Low FODMAP Apps 2026 — iPhone Gut Health Scanner Guide | briefly.live',
    h1: 'The Best FODMAP Apps for iPhone in 2026',
    metaDescription: 'The best low FODMAP apps for iPhone in 2026. Menu Check tops the list with restaurant menu scanning, 3M+ barcode database, and support for 100+ gut conditions.',
    targetKeyword: 'best low FODMAP app 2026',
    intro: "Managing IBS or a low-FODMAP diet is hard enough without spending 20 minutes in the grocery aisle reading every ingredient label — or guessing what's safe at a restaurant. The right FODMAP app turns those moments from stressful into simple. Here's a guide to the best low FODMAP apps available on iPhone in 2026, what each does well, and which one is right for your specific situation.",
    sections: [
      {
        heading: 'What Makes a Great FODMAP App',
        body: "A great FODMAP app needs three things: a large, accurate food database; fast results; and customization for your specific dietary profile. FODMAP sensitivity varies widely between people — some react to fructans but not lactose, others to polyols but not fructose. An app that scores food against a generic FODMAP threshold misses this entirely. The best apps let you build a detailed profile and then score every food against YOUR sensitivities.",
      },
      {
        heading: 'Menu Check — Best Overall FODMAP App for iPhone',
        body: "Menu Check is the most comprehensive gut health scanner on iPhone. It supports FODMAP alongside 100+ other conditions (Celiac, IBD, Crohn's, histamine intolerance, SIBO, and custom allergen combinations). Scan grocery barcodes from a database of 3M+ products, or photograph a restaurant menu and get AI-powered verdicts on every dish. Each result is scored against your personal profile with a clear Safe, Limit, or Avoid label. Available free on iOS.",
      },
      {
        heading: 'Spoonful — Best for FODMAP-Only Users',
        body: "Spoonful is purpose-built for FODMAP with a curated, accuracy-focused barcode database. If your only concern is FODMAP and you primarily shop at mainstream grocery stores, Spoonful is reliable and well-designed. It lacks restaurant menu scanning and doesn't support complex multi-condition profiles.",
      },
      {
        heading: 'FODMAP by Monash University — Best for Evidence-Based Reference',
        body: "The official Monash University FODMAP app is the research-backed standard reference for FODMAP content in foods. It's not a fast scanner — it's a reference guide. Use it to understand why a food is high-FODMAP and in what serving sizes it becomes safe. Best used alongside a scanner like Menu Check rather than as a standalone tool.",
      },
    ],
    faqs: [
      { question: 'What is the best FODMAP app for iPhone in 2026?', answer: 'Menu Check is the top FODMAP app for iPhone in 2026. It combines barcode scanning for 3M+ grocery products with restaurant menu photo scanning — giving Safe, Limit, or Avoid verdicts in real time.' },
      { question: 'Which FODMAP app works at restaurants?', answer: 'Menu Check is the only major FODMAP app that lets you point your camera at a restaurant menu and get AI-powered verdicts on every dish, scored against your specific gut health profile.' },
      { question: 'Is there a free FODMAP scanner app?', answer: 'Yes. Menu Check is free to download on iOS. Core FODMAP scanning for barcodes and restaurant menus is free; premium unlocks unlimited AI recipe generation and advanced dietary filtering.' },
    ],
    cta: 'Download Menu Check Free',
  },
  {
    appId: 'menucheck',
    slug: 'ibs-food-scanner-restaurants',
    type: 'guide',
    title: 'IBS Food Scanner for Restaurants — Menu Check App | briefly.live',
    h1: 'How to Scan Restaurant Menus for IBS with Menu Check',
    metaDescription: 'Menu Check scans restaurant menus for IBS with AI. Point your camera, get instant Safe/Limit/Avoid verdicts for every dish. Free on iPhone.',
    targetKeyword: 'low FODMAP restaurant app',
    intro: "Eating at restaurants with IBS is one of the most stressful parts of managing a gut condition. The menu doesn't list every ingredient. The waiter isn't sure. You have to guess — and pay for it later. Menu Check is an IBS food scanner for restaurants that uses AI to read any menu and score every dish against your personal gut health profile. Safe, Limit, or Avoid — in seconds.",
    sections: [
      {
        heading: 'How Restaurant Menu Scanning Works',
        body: "Open Menu Check and tap the menu scan button. Point your camera at the restaurant menu — a physical menu, a board, or a screen. The AI reads the text, identifies each dish and its ingredients, and cross-references them against your profile (IBS, FODMAP, Celiac, or your specific conditions). You see a scored list of every dish within seconds. Green is safe. Yellow is limit. Red is avoid.",
      },
      {
        heading: 'Your Personal Gut Health Profile',
        body: "Menu Check isn't scoring foods against a generic IBS database — it's scoring against your specific profile. When you set up the app, you add your exact conditions, allergens, and dietary restrictions. FODMAP sensitivity, Celiac disease, Crohn's, IBD, histamine intolerance, specific food allergies — all of these combine into your personal profile. The restaurant scan verdicts are specific to you, not averaged across all IBS sufferers.",
      },
      {
        heading: 'Beyond Restaurants: Grocery Barcode Scanning',
        body: "Menu Check also scans grocery product barcodes via a database of 3M+ products. The same profile that drives your restaurant verdicts drives your grocery verdicts. Scan a new sauce, a bread, a prepared meal — and instantly know if it's safe for your conditions. The barcode and restaurant scanner work together as a single integrated tool for your daily food decisions.",
      },
      {
        heading: 'Tips for Using Menu Check at Restaurants',
        body: "For best results, scan the menu in good lighting with the text clearly visible. If the menu is on a screen or digital display, take a screenshot and upload it through the photo scan option. For menus with heavy imagery and little text, manually entering the dish name in the search bar gives faster results. Always verify with the server for dishes flagged as 'Limit' — cross-contamination risks vary by kitchen.",
      },
    ],
    faqs: [
      { question: 'Is there an app that scans restaurant menus for IBS?', answer: 'Menu Check lets you photograph any restaurant menu. AI reads every dish and gives a Safe, Limit, or Avoid verdict based on your IBS, FODMAP, or gut health profile.' },
      { question: 'How does Menu Check work in restaurants?', answer: 'Open Menu Check, tap the menu scan button, and point your camera at the menu. The app reads the text, identifies dishes and ingredients, and scores each one against your profile in seconds.' },
      { question: 'Does Menu Check work offline in restaurants?', answer: 'Menu Check requires an internet connection for AI menu analysis. Barcode scanning uses cached data and works with limited connectivity for previously scanned products.' },
    ],
    cta: 'Scan Your Next Restaurant Menu',
  },
  {
    appId: 'pepkit',
    slug: 'bpc-157-dosage-calculator',
    type: 'guide',
    title: 'BPC-157 Dosage Calculator App — PepKit for iPhone | briefly.live',
    h1: 'BPC-157 Reconstitution Calculator and Dose Tracker for iPhone',
    metaDescription: 'PepKit is a BPC-157 dosage calculator app for iPhone. Calculate BAC water volume, draw units, log injections, and track compound levels. Free on iOS.',
    targetKeyword: 'BPC-157 dosage calculator app',
    intro: "BPC-157 reconstitution requires precision. Too little BAC water and you're injecting dangerously concentrated doses. Too much and your dosing math falls apart. PepKit is a BPC-157 dosage calculator for iPhone that walks you through the exact reconstitution math, logs every injection with the correct draw amount, tracks your inventory, and plots your compound levels over time. No spreadsheets. No guessing.",
    sections: [
      {
        heading: 'How to Reconstitute BPC-157 with PepKit',
        body: "Open PepKit and add BPC-157 as a new compound. Enter your vial size (e.g., 5mg), your target dose per injection (e.g., 250mcg), and your preferred BAC water volume. PepKit calculates exactly how many mL of BAC water to add to the vial, and how many units on an insulin syringe to draw for each dose. Step-by-step instructions walk you through the process. No math errors.",
      },
      {
        heading: 'BPC-157 Cycle Planning',
        body: "PepKit's cycle planner lets you set your BPC-157 protocol: start date, end date, injection frequency (daily, every other day, or custom), and dose per injection. The app shows you what's due today, your injection history for the cycle, and how many doses remain in your current vial before you need a new one. Low inventory alerts notify you when you're running low.",
      },
      {
        heading: 'Injection Logging and Body Map',
        body: "Log each BPC-157 injection with date, time, dose, and injection site. PepKit includes a body map for selecting subcutaneous or intramuscular injection locations. Rotating sites and tracking history helps you avoid injecting the same spot repeatedly — which matters for comfort and absorption on longer protocols.",
      },
      {
        heading: 'Compound Level Curves',
        body: "PepKit plots your estimated BPC-157 compound levels over time using pharmacokinetic half-life data. See how your levels accumulate at the start of a protocol, stabilize during maintenance, and decline after the last injection. This visualization helps you understand timing — for example, whether to front-load doses or maintain a steady schedule.",
      },
    ],
    faqs: [
      { question: 'Is there a BPC-157 dosage calculator app?', answer: 'PepKit is a BPC-157 dosage calculator for iPhone. Enter your vial size, desired dose, and BAC water volume — PepKit calculates the exact units to draw and logs each injection with date and body map site.' },
      { question: 'How do I calculate BPC-157 reconstitution?', answer: 'In PepKit, add a new peptide (BPC-157), enter vial size (e.g., 5mg) and target dose (e.g., 250mcg), and the app calculates how many mL of BAC water to add and how many units to draw per injection.' },
      { question: 'Can PepKit track a BPC-157 cycle?', answer: 'Yes. PepKit logs every BPC-157 injection, tracks your cycle start and end dates, auto-deducts inventory with low-stock alerts, and plots compound level curves based on the peptide half-life.' },
    ],
    cta: 'Calculate Your BPC-157 Dose',
  },
  {
    appId: 'pepkit',
    slug: 'semaglutide-dose-calculator',
    type: 'guide',
    title: 'Semaglutide Dose Calculator App — PepKit for iPhone | briefly.live',
    h1: 'Track Your Semaglutide Doses and Escalation Schedule with PepKit',
    metaDescription: 'PepKit is a semaglutide dose calculator app for iPhone. Calculate GLP-1 injection amounts, log doses, track escalation schedules, and monitor compound levels. Free.',
    targetKeyword: 'semaglutide dose calculator app',
    intro: "Semaglutide (compounded or branded as Ozempic/Wegovy) requires careful dose escalation — starting low, titrating up on a schedule, and tracking each weekly injection. PepKit is a semaglutide dose calculator for iPhone that handles the reconstitution math for compounded semaglutide, tracks your escalation schedule, logs every injection, and visualizes your compound levels. Precision tracking for a precision compound.",
    sections: [
      {
        heading: 'Reconstitution Calculator for Compounded Semaglutide',
        body: "Compounded semaglutide vials vary widely — 2mg, 5mg, 10mg — and the desired concentration determines how much bacteriostatic water to add. PepKit's reconstitution calculator takes your vial size and target concentration, then tells you exactly how many mL of BAC water to add and how many units to draw for each dose in your escalation schedule. Eliminates the most error-prone part of self-administration.",
      },
      {
        heading: 'Dose Escalation Scheduling',
        body: "Standard semaglutide protocols start at 0.25mg/week for 4 weeks, then escalate to 0.5mg, 1mg, and higher based on tolerance. PepKit lets you enter your escalation schedule — with different dose amounts and timing per phase. The app shows your current phase, what dose is due on your next injection day, and when to escalate. No more forgetting which week you're on.",
      },
      {
        heading: 'Injection Logging',
        body: "Log each semaglutide injection with date, dose, and injection site. Weekly injection tracking shows your full history at a glance. If you're tracking both a GLP-1 and another peptide (like BPC-157 or TB-500), PepKit manages multiple active compounds simultaneously — with separate logs, schedules, and inventory for each.",
      },
      {
        heading: 'Compound Level Visualization',
        body: "Semaglutide has a ~7-day half-life, meaning levels accumulate over the first several weeks of a protocol. PepKit plots estimated compound levels based on your injection history and dose amounts. This is particularly useful when you're evaluating whether to escalate — seeing your current trough levels relative to your therapeutic range helps inform the timing decision.",
      },
    ],
    faqs: [
      { question: 'Is there a semaglutide dose calculator app for iPhone?', answer: 'PepKit is a semaglutide dose calculator for iPhone. It calculates reconstitution ratios, tracks your dose escalation schedule, logs injections, and plots semaglutide compound levels over time.' },
      { question: 'How do I track my semaglutide injections with an app?', answer: 'In PepKit, create a semaglutide cycle with your starting dose and escalation schedule. The app logs each injection, shows what dose is due today, tracks inventory, and visualizes compound levels.' },
      { question: 'Does PepKit support tirzepatide and other GLP-1 peptides?', answer: 'Yes. PepKit supports Semaglutide, Tirzepatide, and all major GLP-1 peptides with individual reconstitution calculators, dose escalation tracking, and half-life compound level curves.' },
    ],
    cta: 'Track Your Semaglutide Protocol',
  },
  {
    appId: 'morningjournal',
    slug: 'vs-day-one',
    type: 'compare',
    title: 'Honestly vs Day One — Best Morning Journal App for iPhone 2026 | briefly.live',
    h1: 'Honestly vs Day One: Which Morning Journal App Is Right for You?',
    metaDescription: 'Honestly: Morning Journal vs Day One for iPhone. Honestly adds app blocking, structured morning rituals, and home screen widgets. Compare features for your daily routine.',
    targetKeyword: 'day one alternatives iphone',
    intro: "Day One and Honestly: Morning Journal are both journaling apps for iPhone, but they're built for entirely different purposes. Day One is a comprehensive long-form journal — a diary, a memory keeper, a photo journal. Honestly is a structured morning ritual tool — a 4-step sequence that clears your head and sets your day's intentions, with app blocking to make sure you actually do it. If you're looking for a Day One alternative to build a morning routine, this comparison is for you.",
    sections: [
      {
        heading: 'Journaling Approach',
        body: "Day One gives you a blank canvas: write as much or as little as you want, attach photos, add location data, tag entries, and search your history going back years. It's the best long-form journaling app on iPhone, full stop. Honestly takes a structured approach: four specific prompts (Mood, Journal, 3 Big Wins, Gratitude), each designed to take 2–3 minutes. The structure is the point — you're building a consistent 10-minute morning ritual, not writing a memoir.",
      },
      {
        heading: 'App Blocking',
        body: "Day One has no app blocking features. Honestly uses iOS Screen Time to lock your chosen apps until you complete your morning ritual. This is the biggest practical difference for people trying to build a morning routine. If you reach for your phone and open Instagram before getting out of bed, no journaling app will help — unless it locks the apps you're trying to avoid. Honestly does.",
      },
      {
        heading: 'Home Screen Widgets',
        body: "Day One has static reminder widgets. Honestly has interactive home screen widgets that show your 3 Big Wins for the day, your current streak, and your mood — updating as you complete your ritual. The widget integration makes your morning progress visible throughout the day, reinforcing the habit.",
      },
      {
        heading: 'iCloud Sync and Privacy',
        body: "Both apps sync via iCloud. Day One also offers end-to-end encrypted sync through their own servers. Honestly stores journal data locally on-device with iCloud sync — no third-party servers, no analytics, no tracking. For users concerned about the privacy of their personal reflections, Honestly's local-first approach is reassuring.",
      },
    ],
    comparisonTable: [
      { feature: 'Structured morning ritual', app: 'Yes (4-step)', competitor: 'No (free-form)' },
      { feature: 'App blocking', app: 'Yes', competitor: 'No' },
      { feature: 'Interactive home screen widgets', app: 'Yes', competitor: 'Basic reminder only' },
      { feature: 'Long-form journaling', app: 'Basic', competitor: 'Yes (primary feature)' },
      { feature: 'Photo journal', app: 'No', competitor: 'Yes' },
      { feature: 'iCloud sync', app: 'Yes', competitor: 'Yes' },
      { feature: 'Streak tracking', app: 'Yes', competitor: 'No' },
    ],
    faqs: [
      { question: 'Is Honestly a good Day One alternative?', answer: 'Honestly: Morning Journal is a Day One alternative optimized for morning routines. It structures your session into 4 steps (Mood, Journal, 3 Big Wins, Gratitude), adds app blocking, and syncs widgets to your home screen — features Day One does not have.' },
      { question: 'What morning journal app blocks social media?', answer: 'Honestly: Morning Journal blocks distracting apps via iOS Screen Time until you complete your daily reflection ritual. Day One has no app blocking features.' },
      { question: 'Which is better for a morning routine — Day One or Honestly?', answer: "If you want an unstructured long-form journal, Day One is the better fit. If you want a structured morning ritual with app blocking and home screen widgets to start your day intentionally, Honestly is the stronger choice." },
    ],
    cta: 'Start Your Morning Ritual with Honestly',
  },
];
