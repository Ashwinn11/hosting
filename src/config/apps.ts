export interface Benefit {
  title: string;
  description: string;
  icon: string;
}

export interface FAQ {
  question: string;
  answer: string;
  learnMoreSlug?: string; // slug of one of this app's pSEO pages — renders a "Learn more" link when it resolves
}

export interface Testimonial {
  quote: string;
  author: string;
  detail?: string; // e.g. "App Store review"
}

export interface ComparisonHighlight {
  us: string;
  them: string;
}

export interface AppConfig {
  id: string;
  name: string;
  appStoreName?: string; // exact live App Store listing name — used for JSON-LD + app meta tags
  category: string;
  seoApplicationCategory: string;
  tagline: string;
  platforms: ('ios' | 'android' | 'web')[];
  description: string;
  externalUrl?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  aggregateRating?: { ratingValue: string; ratingCount: string };
  pricingNote?: string; // hero chip, e.g. "Free · iOS"
  testimonials?: Testimonial[]; // real, user-supplied reviews only
  comparisonHighlights?: ComparisonHighlight[]; // short "us vs. the usual" rows
  downloadUrl?: string;
  appNumericId?: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  marketing: {
    headline: string;
    subheadline: string;
    problem: string;
    agitation: string;
    solution: string;
    benefits: Benefit[];
    screenshots?: string[];
    videoHero?: string;
    faqs?: FAQ[];
  };
  legal: {
    privacyPolicy: string;
    termsOfService: string;
    support: string;
    lastUpdated: string;
  };
  design: {
    primary: string;
    bg: string;
    fontFamily: string;
    templateId: 'zen' | 'academic' | 'arcade' | 'sanctuary';
    grain?: number;
    mesh?: boolean;
  };
}

export const apps: AppConfig[] = [
  {
    id: 'gutpal',
    name: 'GutPal',
    appStoreName: 'IBS Meal Planner - GutPal',
    category: 'Health & Fitness',
    seoApplicationCategory: 'HealthApplication',
    tagline: 'AI Gut-Health Meal Planner for IBS & FODMAP',
    platforms: ['ios'],
    description: 'The AI meal planner for IBS, IBD, and low-FODMAP diets. Tell GutPal what\'s in your kitchen — it builds a week of gut-safe meals around your conditions, triggers, and diet. No logging. No guessing.',
    appStoreUrl: 'https://apps.apple.com/app/ibs-meal-planner-gutpal/id6755035965',
    // aggregateRating intentionally omitted: only 2 real store ratings as of 2026-07 — re-add once volume is defensible
    pricingNote: 'Free · iOS',
    comparisonHighlights: [
      { them: 'Food logging apps make you track every bite.', us: 'No logging — just meals you can eat.' },
      { them: 'Generic meal planners ignore your conditions.', us: 'Built around your IBS, IBD & FODMAP triggers.' },
      { them: 'FODMAP databases hand you data.', us: 'GutPal hands you the actual dinner.' },
    ],
    downloadUrl: 'https://apps.apple.com/app/ibs-meal-planner-gutpal/id6755035965',
    appNumericId: '6755035965',
    seo: {
      title: 'GutPal | IBS Meal Planner, Low FODMAP & IBD Diet App',
      description: 'GutPal builds gut-safe weekly meal plans for IBS, IBD, SIBO, and low-FODMAP diets from what\'s already in your kitchen — and scans restaurant menus to tell you what\'s safe to order. Monash-aligned. Free on iOS.',
      keywords: ['IBS Meal Planner', 'Low FODMAP App', 'IBD Diet App', 'Gut Health Meal Planner', 'FODMAP Meal Plan', 'IBS Diet App', 'Crohn\'s Meal Planner', 'SIBO Diet', 'Monash FODMAP App', 'FODMAP Recipes', 'IBS Restaurant Menu Scanner', 'Gut Health App iPhone']
    },
    marketing: {
      headline: 'Finally know what to eat for your gut.',
      subheadline: 'Tell GutPal what\'s in your kitchen and how your gut behaves. Get a week of gut-safe meals — personalized for IBS, IBD, FODMAP, and more. No logging. No guessing.',
      problem: 'You\'ve read every FODMAP list. You know your triggers. You still don\'t know what to make for dinner without spending 20 minutes second-guessing every ingredient.',
      agitation: 'Food logging apps want you to track every bite. Generic meal planners ignore your conditions. FODMAP databases give you data — not meals. None of them just tell you what to eat.',
      solution: 'GutPal asks what\'s in your kitchen and how your gut behaves, then hands you a week of meals that work for your body. Every suggestion respects your conditions, triggers, and diet — cooked from what you already have.',
      benefits: [
        { title: 'Kitchen-first meal plans', description: 'Enter what\'s in your fridge and pantry. GutPal generates gut-safe meals from what you already have — no specialty shopping required.', icon: 'Utensils' },
        { title: 'Personalized to your gut', description: 'Set up your profile: IBS, IBD, SIBO, Crohn\'s, Colitis, Celiac, GERD, lactose or histamine intolerance. Every meal respects your exact triggers.', icon: 'Heart' },
        { title: 'Eat out without anxiety', description: 'Scan the menu at any restaurant — GutPal reads it and tells you what to order and what to skip based on your conditions.', icon: 'ShieldCheck' }
      ],
      screenshots: [
        '/gutpal/screenshots/01.webp',
        '/gutpal/screenshots/02.webp',
        '/gutpal/screenshots/03.webp',
        '/gutpal/screenshots/04.webp',
        '/gutpal/screenshots/05.webp',
        '/gutpal/screenshots/06.webp',
        '/gutpal/screenshots/07.webp',
      ],
      faqs: [
        { question: 'Is there an app that plans meals for IBS?', answer: 'GutPal is an AI meal planner built specifically for IBS, IBD, and low-FODMAP diets. Set up your gut profile, tell us what\'s in your kitchen, and GutPal generates a week of gut-safe meals. Free on iOS.', learnMoreSlug: 'ibs-meal-planner-app' },
        { question: 'What is the best low FODMAP meal planning app?', answer: 'GutPal builds FODMAP-safe meal plans aligned with Monash University research. You tell it your pantry, it gives you meals — no food logging, no calorie counting.', learnMoreSlug: 'low-fodmap-meal-plan-app' },
        { question: 'Can GutPal help with Crohn\'s or Colitis?', answer: 'Yes. GutPal supports IBD including Crohn\'s Disease and Ulcerative Colitis. Set your conditions and trigger foods in your gut profile — every meal plan respects them.', learnMoreSlug: 'crohns-disease-safe-food-scanner' },
        { question: 'Can GutPal tell me what to order at restaurants?', answer: 'Yes. Scan or photograph the menu and GutPal reads every dish, then tells you what\'s safe to order and what to skip based on your gut profile.', learnMoreSlug: 'ibs-safe-restaurant-eating' },
        { question: 'What should I eat during an IBS flare-up?', answer: 'Gentle, low-trigger meals — and no experiments. Tell GutPal your gut is flaring and it plans the week around foods your profile tolerates, cooked from what\'s already in your kitchen.', learnMoreSlug: 'what-to-eat-ibs-flare-up' },
        { question: 'Is GutPal free on iPhone?', answer: 'GutPal is free to download on iOS. GutPal Pro unlocks unlimited meal plans, restaurant guides, and advanced personalization. A 3-day free trial is included.' },
        { question: 'Does GutPal follow Monash University FODMAP guidelines?', answer: 'Yes. All FODMAP content in GutPal is aligned with Monash University research — the gold standard for IBS and low-FODMAP diets.', learnMoreSlug: 'vs-monash-fodmap-app' },
      ]
    },
    legal: {
      privacyPolicy: `Last updated: 19 June 2026\n\n1. Information We Collect\nGutPal collects information you provide directly: your gut health profile including conditions (IBS, IBD, SIBO, etc.), trigger foods, allergies, dietary preferences, and pantry items. We also collect your Apple ID sign-in token for authentication.\n\n2. Health Data\nYour gut profile and meal preferences are stored securely in our database (Supabase) to generate personalized meal plans. This data is used solely to provide GutPal's meal planning service.\n\n3. AI Processing\nMeal plans are generated using Google Gemini AI. Your profile data is sent to Gemini to generate relevant meal suggestions. Your data is not used to train AI models.\n\n4. Use of Information\nWe use your information to generate personalized gut-safe meal plans, improve our service, and provide customer support. We do not sell your personal data to third parties.\n\n5. Data Security\nWe use industry-standard security measures including encrypted storage and secure API connections to protect your data.\n\n6. Data Deletion\nYou can delete your account and all associated data at any time via Settings → Delete Account in the app.\n\n7. Contact\nQuestions? Email us at ashwinnanbazhagan@gmail.com`,
      termsOfService: `Last updated: 19 June 2026\n\n1. Medical Disclaimer\nGutPal is a meal planning tool and is not a medical device. It does not provide medical advice, diagnosis, or treatment. The meal suggestions are for general informational purposes only. Always consult your physician or dietitian regarding your specific dietary needs and medical conditions.\n\n2. Subscription\nGutPal Pro is available as an auto-renewing subscription through the Apple App Store. A 3-day free trial is included. Payment is charged to your Apple ID at confirmation of purchase. Subscriptions renew automatically unless cancelled at least 24 hours before the end of the current period. Manage or cancel subscriptions in your Apple ID Account Settings.\n\n3. User Accounts\nYou are responsible for maintaining the confidentiality of your account and for all activities that occur under your account. Sign-in is handled via Apple ID.\n\n4. Acceptable Use\nYou agree not to use GutPal for any unlawful purpose or in any way that could damage or impair the service.\n\n5. Changes to Terms\nWe reserve the right to modify these terms at any time. Continued use of the app after changes constitutes acceptance of the new terms.\n\n6. Apple EULA\nBy using this app, you also agree to Apple's Standard Licensed Application End User License Agreement: https://www.apple.com/legal/internet-services/itunes/dev/stdeula/\n\n7. Contact\nEmail: ashwinnanbazhagan@gmail.com`,
      support: `For help with GutPal, email us at ashwinnanbazhagan@gmail.com\n\nWe typically respond within 24–48 hours.\n\nCommon issues:\n• Meal plan not generating — check your pantry has at least 3 items entered\n• Subscription questions — manage via Apple ID Account Settings → Subscriptions\n• Profile reset — go to Settings → Reset Profile in the app`,
      lastUpdated: '19 June 2026'
    },
    design: {
      primary: '#d97757',
      bg: '#f4ede2',
      fontFamily: 'font-hanken',
      templateId: 'zen',
      grain: 0.03
    }
  },
  {
    id: 'masterly',
    name: 'Masterly AI',
    appStoreName: 'App Blocker & Study - Masterly',
    category: 'Education',
    seoApplicationCategory: 'EducationApplication',
    tagline: 'App Blocker, AI Flashcards & Study Planner',
    platforms: ['ios'],
    description: 'Distracting apps lock up to 3 times a day — and unlock only when you pass short quizzes from your own notes. AI flashcards, spaced repetition, and day-by-day exam planning.',
    appStoreUrl: 'https://apps.apple.com/app/app-blocker-study-masterly/id6753760295',
    // aggregateRating intentionally omitted: only 5 real store ratings as of 2026-07 — re-add once volume is defensible
    pricingNote: 'Free · iOS',
    comparisonHighlights: [
      { them: 'App blockers you can bypass in a tap.', us: 'Apps unlock only when you pass the quiz.' },
      { them: 'Flashcards from someone else\'s material.', us: 'Quizzes generated from your own notes.' },
      { them: 'No link between studying and your phone.', us: 'Your study session is the unlock.' },
    ],
    downloadUrl: 'https://apps.apple.com/app/app-blocker-study-masterly/id6753760295',
    appNumericId: '6753760295',
    seo: {
      title: 'Masterly | App Blocker for Students, AI Flashcards & Quiz',
      description: 'Masterly locks your distracting apps up to 3 times a day — pass short quizzes generated from your own notes and PDFs to unlock them. AI flashcards with spaced repetition, study timetables, and exam planning. Free on iOS.',
      keywords: ['App Blocker for Students', 'Study App', 'AI Flashcards', 'Quiz App', 'Focus App', 'Spaced Repetition App', 'AI Study Planner', 'Exam Prep', 'Study Timetable', 'Study Discipline', 'Masterly', 'Syllabus Planner']
    },
    marketing: {
      headline: 'The AI Study App That Locks Your Phone Until You Learn.',
      subheadline: 'Your apps lock up to 3 times a day. Pass short quizzes from your own notes and PDFs to earn them back — with AI flashcards, spaced repetition, and a day-by-day exam plan.',
      problem: 'You open Instagram to "quickly check" something and lose an hour. You don\'t know what to study or in what order. The night before the exam, your notes feel pointless.',
      agitation: 'Existing app blockers are too easy to bypass. Generic study tools give you flashcards for someone else\'s material. And no app actually connects your studying to your phone unlocking.',
      solution: 'Masterly turns your phone into a focused workspace. Distracting apps lock up to 3 times a day — to unlock them, pass short quizzes generated from your own notes or PDFs. Upload a syllabus and set your exam date for a day-by-day plan with flashcards, quizzes, and study notes.',
      benefits: [
        { title: 'App Blocker Gate', description: 'Apps lock up to 3 times a day via iOS Screen Time. Pass a short quiz on your own material to earn access back — no workarounds.', icon: 'Lock' },
        { title: 'AI Study Plan', description: 'Set your exam date. AI breaks your syllabus or PDFs into a day-by-day plan so you always know what to study next.', icon: 'BookOpen' },
        { title: 'Flashcards + Quiz', description: 'AI generates flip flashcards with spaced repetition and multiple-choice quizzes from your own uploaded notes.', icon: 'Zap' },
        { title: 'Progress & Heatmaps', description: 'Daily quiz completion builds your streak — with focus heatmaps and analytics to see your consistency.', icon: 'Flame' }
      ],
      screenshots: [
        '/masterly/screenshots/01.webp',
        '/masterly/screenshots/02.webp',
        '/masterly/screenshots/03.webp',
        '/masterly/screenshots/04.webp',
      ],
      videoHero: '/masterly_demo.mp4',
      faqs: [
        { question: 'Is there an app that blocks social media until I finish studying?', answer: 'Masterly uses iOS Screen Time to lock your chosen apps up to 3 times a day. They only unlock after you pass a short AI-generated quiz — built from your own uploaded notes and PDFs.', learnMoreSlug: 'study-without-phone-distractions' },
        { question: 'Can an app generate flashcards from my own notes?', answer: 'Masterly generates flip flashcards and multiple-choice quizzes directly from PDFs or text you upload, with spaced repetition built in. Every flashcard is unique to your material, not generic content.', learnMoreSlug: 'ai-flashcard-generator-pdf' },
        { question: 'What is the best AI study planner app for exams?', answer: 'Masterly takes your exam date and syllabus, then builds a day-by-day study plan automatically. Each day includes a lesson, flashcards, and a quiz — so you always know exactly what to study next.', learnMoreSlug: 'exam-study-planner-app' },
        { question: 'Can Masterly build a study schedule from my syllabus?', answer: 'Yes. Upload your syllabus PDF and set your exam date — Masterly breaks it into a day-by-day timetable that covers everything before you sit.', learnMoreSlug: 'app-that-makes-study-schedule-from-syllabus' },
        { question: 'Does Masterly work for MCAT, bar exam, or NCLEX prep?', answer: 'Yes. Masterly builds flashcards, quizzes, and a daily plan from whatever material you upload — MCAT content, bar outlines, or NCLEX review notes.', learnMoreSlug: 'mcat-study-app' },
        { question: 'Is Masterly free for iPhone?', answer: 'Masterly is free to download on iOS. Masterly Pro unlocks AI quiz generation, flashcards, study notes, heatmaps, exam planning, and app blocking — $9.99/month or $79.99/year.' },
        { question: 'How does Masterly\'s app blocker work?', answer: 'Masterly uses Apple\'s Family Controls and Screen Time API to lock selected apps up to 3 times a day. Complete and pass the quiz, and your apps automatically unlock.', learnMoreSlug: 'focus-app-for-students' },
      ]
    },
    legal: {
      privacyPolicy: '1. Information We Collect\nMasterly collects minimal data required to function. This includes your email for authentication, uploaded syllabus PDFs for lesson generation, and Screen Time data via Apple Family Controls to facilitate app blocking during study sessions.\n\n2. Use of AI\nYour study materials are processed by Google Gemini API to generate personalized lessons and quizzes. Your data is not used to train global AI models.\n\n3. Family Controls\nWe use Apple\'s Family Controls and Device Activity API to monitor app usage and enforce study blocks. We do not track browsing history or personal messages.\n\n4. Data Deletion\nYou can delete your account and all associated data at any time via the Settings menu.\n\n5. Contact Us\nIf you have any questions about this Privacy Policy, please contact us at ashwinnanbazhagan@gmail.com.',
      termsOfService: '1. Acceptance of Terms\nBy using Masterly, you agree to allow the app to manage your device\'s app access during scheduled study windows.\n\n2. Subscription\nMasterly requires an active subscription for full access to AI-generated lessons and app blocking features. Payments are handled via Apple App Store.\n\n3. Responsible Use\nYou are responsible for ensuring that blocking educational or emergency apps does not interfere with your safety or critical obligations.\n\n4. Changes to Terms\nWe reserve the right to modify these terms at any time. We will notify you of any significant changes by posting the new terms in the app.\n\n5. Contact Information\nEmail: ashwinnanbazhagan@gmail.com',
      support: 'For any issues or questions regarding Masterly, please reach out to our support team.\n\nEmail: ashwinnanbazhagan@gmail.com\n\nWe typically respond within 24-48 hours.',
      lastUpdated: '15 March 2026'
    },
    design: {
      primary: '#2D4F1E',
      bg: '#FDFBF7',
      fontFamily: 'font-syne',
      templateId: 'academic'
    }
  },

  {
    id: 'honestly',
    name: 'Honestly',
    appStoreName: 'Honestly - Reflect & Manifest',
    category: 'Lifestyle',
    seoApplicationCategory: 'LifestyleApplication',
    tagline: 'Reflect & Manifest — Journal, Mood Tracker & App Blocker',
    platforms: ['ios'],
    description: 'Honestly is a free journaling ritual — check your mood, write freely, note what you\'re grateful for and what you\'re manifesting, and watch your Sprout grow as your streak builds. Premium keeps distracting apps locked on a schedule until you\'ve journaled.',
    appStoreUrl: 'https://apps.apple.com/app/honestly-reflect-manifest/id6759817879',
    // aggregateRating intentionally omitted: only 2 real store ratings as of 2026-07 — re-add once volume is defensible
    pricingNote: 'Free · iOS',
    comparisonHighlights: [
      { them: 'Blank-page apps give you nothing to hold onto.', us: 'Mood, a free-write, and affirmations — in under 3 minutes.' },
      { them: 'Willpower and timers don\'t hold.', us: 'Yours stay asleep until you\'ve written.' },
      { them: 'Affirmations you read once and forget.', us: 'Your own words come back on your Lock Screen.' },
    ],
    downloadUrl: 'https://apps.apple.com/app/honestly-reflect-manifest/id6759817879',
    appNumericId: '6759817879',
    seo: {
      title: 'Honestly | Reflect & Manifest — Journal, Mood Tracker & App Blocker',
      description: 'Honestly is a free journaling ritual for iPhone — mood check, free writing, gratitude & manifest — with a Sprout that grows as your streak builds. Premium locks distracting apps on a schedule and syncs your journal to iCloud.',
      keywords: ['Honestly', 'Morning Journal App', 'Manifestation Journal', 'Mood Tracker', 'Gratitude Journal', 'App Blocker', 'Affirmations App', 'Shadow Work Prompts', 'Screen Time App', 'Mindfulness', 'Morning Routine iPhone', 'Journaling App', 'Lock Screen Widget']
    },
    marketing: {
      headline: 'Journal first. Then your apps unlock.',
      subheadline: 'Mood check, free writing, gratitude & manifest — a morning ritual in minutes. Then your apps wake up.',
      problem: 'You wake up and reach for Instagram, TikTok, or X before you\'ve had a single thought of your own. Before you\'re even out of bed, you\'re already reacting to everyone else\'s morning.',
      agitation: 'Willpower doesn\'t work. Timers don\'t work. There\'s no friction between you and the scroll — so you scroll, and the morning is gone before it started.',
      solution: 'Honestly opens with your mood, then a free-write to empty your head, then gratitude and what you\'re manifesting — with optional reflection and shadow-work prompts to go deeper. Your Sprout grows as your streak builds, and with Premium your distracting apps stay locked on your schedule until you\'ve journaled.',
      benefits: [
        { title: 'Mood Check-In', description: 'Happy, Confused, Sad, Awful, or Cry — tap what\'s actually true. It colors the rest of your page.', icon: 'Sun' },
        { title: 'Free Writing', description: 'Empty your mind before the world fills it. Just write — with optional reflection and shadow-work prompts when you want to go deeper.', icon: 'PenLine' },
        { title: 'Gratitude & Manifest', description: 'Note what you\'re grateful for and what you\'re manifesting — in your own words, not a stock quote. They echo back on your Lock Screen.', icon: 'Heart' },
        { title: 'App Blocking (Premium)', description: 'Lock Instagram, TikTok and the rest on a schedule with hard Screen Time blocking — no workarounds, no snoozing. Honestly never sees which apps you picked.', icon: 'Lock' },
        { title: 'Your Sprout & Streak', description: 'A plant that grows across four stages the more you show up — plus a mood calendar and full journal history with Premium.', icon: 'CalendarDays' },
        { title: 'Lock Screen & Widgets', description: 'Today\'s affirmation waits right on your Lock Screen and Home Screen — no need to open the app.', icon: 'LayoutGrid' }
      ],
      screenshots: [
        '/honestly/screenshots/01.webp',
        '/honestly/screenshots/02.webp',
        '/honestly/screenshots/03.webp',
        '/honestly/screenshots/04.webp',
        '/honestly/screenshots/05.webp'
      ],
      faqs: [
        { question: 'Is Honestly free?', answer: 'Yes — journaling, mood tracking, and your streak are free forever. Premium unlocks app blocking, iCloud sync, and full journal history — as a one-time Lifetime purchase or monthly.' },
        { question: 'How is Honestly different from Day One or Reflectly?', answer: 'Day One and Reflectly are open-ended, general-purpose journals. Honestly is built around one specific ritual — mood check, free writing, gratitude & manifest — paired with an app-blocking gate that keeps your chosen apps locked until you\'ve written. It\'s narrower by design.', learnMoreSlug: 'vs-day-one' },
        { question: 'Is there a journaling app that also blocks distracting apps?', answer: 'Yes — Honestly Premium locks your chosen apps (Instagram, TikTok, X, whatever pulls you in) on a schedule with hard Screen Time blocking. No workarounds, no snoozing — and Honestly is only ever shown opaque tokens, never the names of the apps.', learnMoreSlug: 'break-social-media-phone-addiction' },
        { question: 'Can I use Honestly as a manifestation journal?', answer: 'Yes. The ritual ends with gratitude & manifest — writing what you\'re calling in, in your own words. Your manifestations resurface on your Lock Screen through the day.', learnMoreSlug: 'manifestation-journal-app' },
        { question: 'Does Honestly give me journal prompts?', answer: 'The core page is a free-write — empty your mind, no rules. When you want structure, optional reflection and shadow-work prompts help you go deeper.', learnMoreSlug: 'daily-journal-prompts-app' },
        { question: 'Does Honestly support other languages?', answer: 'Yes — Honestly is available in 11 languages including English, Spanish, French, German, Japanese, Korean, and Arabic.' },
        { question: 'Does Honestly back up my journal?', answer: 'Yes — with Premium\'s iCloud sync, your pages back up to your own private iCloud account (Apple\'s CloudKit). Honestly never receives a copy on its own servers.' },
      ]
    },
    legal: {
      privacyPolicy: 'The short version:\nHonestly is built to be private. Your morning pages — your moods, your writing, your affirmations — belong to you. We don\'t sell them, mine them, or read them. There are no third-party trackers or advertising SDKs in this app.\n\nWhat stays on your device:\nEverything you write is stored locally on your iPhone. If you have iCloud enabled, your pages are backed up to your own private iCloud account (Apple\'s CloudKit) so they follow you between devices. We never receive a copy on our servers — your iCloud data is encrypted and accessible only to you.\n\nScreen Time:\nWhen you choose apps to keep asleep each morning, that selection is handled entirely by Apple\'s Screen Time (Family Controls) framework. Honestly is shown opaque tokens — never the names of the apps or websites you picked, and never any record of how you use them. That information never leaves your device and is never visible to us.\n\nPurchases:\nHonestly Premium is offered as a one-time purchase or an auto-renewing monthly subscription, both processed by Apple. We use RevenueCat to verify your purchase and unlock premium features. This involves an anonymous purchase identifier only — no name, email, or contact information is required or collected.\n\nNotifications:\nIf you turn on affirmation reminders, a single local notification quoting one of your own past affirmations is scheduled on your device. It is generated on-device and is not sent through any server.\n\nWhat we don\'t do:\nWe do not collect analytics, we do not fingerprint your device, we do not build a profile of you, and we do not share anything with advertisers. There is nothing to opt out of because there is nothing being gathered.\n\nYour control:\nYou can delete every page and reset your history at any time from the You tab (“Delete all data”). Deleting the app removes all local data; disabling iCloud sync for Honestly removes the backup from your iCloud account.\n\nContact:\nQuestions about your privacy? Email ashwinnanbazhagan@gmail.com and a human will answer.',
      termsOfService: 'Welcome:\nThese terms are the agreement between you and Honestly for your use of the app. By using Honestly, you agree to them. We\'ve kept them plain.\n\nYour license:\nWe grant you a personal, non-transferable license to use Honestly on devices you own or control, for your own morning ritual. The app and its design are ours; please don\'t copy, resell, or reverse-engineer it.\n\nHonestly Premium:\nHonestly Premium is offered as a one-time Lifetime purchase (yours for the lifetime of the app on your Apple account) or as an auto-renewing monthly subscription. Purchases are handled and billed by Apple under Apple\'s terms; monthly subscriptions renew automatically unless canceled at least 24 hours before the period ends, and can be managed in your Apple ID Subscription settings. Refunds are managed by Apple through the App Store.\n\nYour content:\nYour pages are yours. You retain all rights to everything you write. We claim no ownership and take no license over your journal entries, moods, or affirmations.\n\nAcceptable use:\nUse Honestly for your own reflection. Don\'t use it to break the law, and don\'t attempt to disrupt, probe, or misuse the app or the Screen Time features it relies on.\n\nScreen Time & blocking:\nHonestly uses Apple\'s Screen Time to help keep chosen apps asleep until your page is written. This is a supportive nudge, not a guarantee — the operating system ultimately controls app availability, and you remain responsible for your own device and choices.\n\nNo warranty:\nHonestly is provided “as is.” We work hard to keep it reliable, but we can\'t promise it will be uninterrupted or error-free, and it is not a substitute for professional mental-health care.\n\nLimitation of liability:\nTo the extent permitted by law, Honestly and its makers are not liable for any indirect or incidental damages arising from your use of the app.\n\nChanges:\nWe may update these terms as the app evolves. If we make material changes, we\'ll note them here with a new effective date. Continued use means you accept the current terms.\n\nContact:\nReach us at ashwinnanbazhagan@gmail.com.',
      support: 'For any issues or questions regarding Honestly, please reach out to our support team.\n\nEmail: ashwinnanbazhagan@gmail.com\n\nWe typically respond within 24-48 hours.',
      lastUpdated: 'July 2026'
    },
    design: {
      primary: '#F5851F',
      bg: '#FAF8F5',
      fontFamily: 'font-nunito',
      templateId: 'sanctuary',
      mesh: false
    }
  },

  {
    id: 'yumeship',
    name: 'YumeShip',
    appStoreName: 'Yumeship - Anime & Kpop Canon',
    category: 'Entertainment',
    seoApplicationCategory: 'EntertainmentApplication',
    tagline: 'your quiet place for the ones you love from afar',
    platforms: ['ios'],
    description: 'A private creative space for fans to cherish their favourite characters and ships. Write love letters, build headcanons, track dates, and keep everything in a soft, personal vault — all on your device.',
    appStoreUrl: 'https://apps.apple.com/app/yumeship-anime-kpop-canon/id6773642234',
    downloadUrl: 'https://apps.apple.com/app/yumeship-anime-kpop-canon/id6773642234',
    appNumericId: '6773642234',
    aggregateRating: { ratingValue: '4.6', ratingCount: '81' }, // live cross-storefront weighted average, 2026-07
    pricingNote: 'Free · iOS',
    comparisonHighlights: [
      { them: 'Notes apps feel cold.', us: 'A vault made for the ones you love.' },
      { them: 'Social media feels exposed.', us: 'Private — nothing ever leaves your phone.' },
      { them: 'No space that gets shipping & headcanons.', us: 'Every ship its own page, beautifully.' },
    ],
    seo: {
      title: 'YumeShip | Private Journal for Yumeshippers, F/Os & Ships',
      description: 'A private on-device journal for yumeshippers. Write headcanons, love letters, and scenarios about your anime, otome, manga, or kpop F/O — with notifications and messages from your F/O, ship charts, and incorrect quotes. Free on iOS.',
      keywords: ['yumeshipping', 'yumeship', 'f/o app', 'fictive', 'fandom app', 'anime journal app', 'kpop f/o', 'ship journal', 'headcanon organizer', 'incorrect quotes generator', 'character journal', 'fan diary']
    },
    marketing: {
      headline: 'A quiet place for the ones you love from afar.',
      subheadline: 'Write love letters. Build headcanons. Keep them close — privately, beautifully, just for you.',
      problem: 'Your feelings for them are real. But there\'s nowhere soft enough to hold them.',
      agitation: 'Notes apps feel cold. Social media feels exposed. There\'s no space that understands what it means to ship, to kin, to love a character quietly.',
      solution: 'YumeShip is a private creative vault built for fans. Every ship gets its own page — templates, love letters, headcanons, dates, scenes. Nothing leaves your phone.',
      benefits: [
        { title: 'Ship Profiles', description: 'Every F/O gets their own page with a visual template, colour palette, and all their details — plus ship charts and poly dynamics.', icon: 'Heart' },
        { title: 'Letters & Messages from Your F/O', description: 'Write love letters and scenarios, get gentle notifications and message threads that only your F/O sends.', icon: 'Mail' },
        { title: 'Headcanons, Quotes & Games', description: 'Log headcanons by category, spin up incorrect quotes starring your F/O, play polycule bingo, and dream up scenarios.', icon: 'BookOpen' },
        { title: 'Fully Private', description: 'Everything stays on your device. No accounts, no cloud, no sharing. Just yours.', icon: 'Lock' },
      ],
      screenshots: [
        '/yumeship/screenshots/01.webp',
        '/yumeship/screenshots/02.webp',
        '/yumeship/screenshots/03.webp',
        '/yumeship/screenshots/04.webp',
        '/yumeship/screenshots/05.webp',
        '/yumeship/screenshots/06.webp',
      ],
      faqs: [
        { question: 'What is YumeShip?', answer: 'YumeShip is a private journal for yumeshippers — anyone who loves a fictional character. Build ship profiles, write love letters and headcanons, get notifications from your F/O, and keep it all in one soft, personal space.', learnMoreSlug: 'what-is-yumeshipping' },
        { question: 'Is YumeShip private?', answer: 'Yes. Everything you create in YumeShip stays on your device in a local database. There are no accounts, no cloud sync, and no sharing. Your vault is completely private.', learnMoreSlug: 'self-ship-app' },
        { question: 'What is a F/O in YumeShip?', answer: 'F/O stands for Fictive Other — a character you have a personal, loving connection with. YumeShip is built specifically for this kind of relationship, with templates and spaces designed around it.', learnMoreSlug: 'fictional-other-fo-app' },
        { question: 'Is YumeShip like Character.AI?', answer: 'No — and that\'s the point. YumeShip is a journal, not a chatbot. Your F/O\'s voice is yours to write, nothing leaves your phone, and no model update can ever change or delete them.', learnMoreSlug: 'vs-character-ai' },
        { question: 'Can I keep a comfort character in YumeShip?', answer: 'Yes. Comfort characters get the same treatment as romantic F/Os — their own page, headcanons, albums, and gentle notifications when you need them.', learnMoreSlug: 'comfort-character-app' },
        { question: 'Can I have multiple ships?', answer: 'Yes. Premium users can create unlimited ships. Free users get one ship to start.' },
        { question: 'Is YumeShip free?', answer: 'YumeShip is free to download. Premium unlocks unlimited ships and all visual templates — weekly, monthly, or yearly.' },
      ]
    },
    legal: {
      privacyPolicy: `Last updated: May 27, 2025\n\n1. Your data stays on your device\nEverything you create in YumeShip — ships, headcanons, letters, scenes — is stored locally on your device in an on-device database. We cannot see it, access it, or back it up. Deleting the App removes all of it permanently.\n\n2. What we don't collect\nWe do not collect your name, email, or any creative content. We do not use advertising SDKs or sell data to third parties. There is no account system.\n\n3. Subscriptions\nWhen you subscribe, our payment processor (RevenueCat) receives a pseudonymous ID and your purchase receipt to verify your subscription status. No personal details are shared with us. RevenueCat's privacy policy: revenuecat.com/privacy.\n\n4. Notifications\nIf you allow notifications, scheduled reminders are handled entirely on-device through iOS. Nothing is sent to our servers.\n\n5. Deleting your data\nGo to Settings → Delete all data to wipe everything from your device. Since we hold no data on our end, there is nothing further to request from us.\n\n6. Contact\nQuestions? Reach us at: ashwinnanbazhagan@gmail.com`,
      termsOfService: `Last updated: May 27, 2025\n\nLicensed Application EULA\nYumeShip is licensed to you under Apple's standard End User License Agreement (EULA). The EULA applies to your use of this App and is available at: https://www.apple.com/legal/internet-services/itunes/dev/stdeula/\n\nSubscriptions\nYumeShip Premium is an auto-renewable subscription sold through Apple's App Store. Payment is charged to your Apple ID at confirmation of purchase. Subscriptions renew automatically unless cancelled at least 24 hours before the end of the current period. Manage or cancel anytime in your Apple ID Account Settings.\n\nYour Content\nEverything you create in YumeShip — ships, letters, headcanons — stays on your device. We have no access to it. It belongs entirely to you.\n\nContact\nQuestions? Reach us at: ashwinnanbazhagan@gmail.com`,
      support: `We'd love to help.\n\nEmail us at ashwinnanbazhagan@gmail.com and we'll get back to you within 24–48 hours.\n\nCommon questions are also answered in our FAQ on the landing page.`,
      lastUpdated: 'May 27, 2025'
    },
    design: {
      primary: '#d77a8d',
      bg: '#fdf3ee',
      fontFamily: 'font-instrument',
      templateId: 'zen'
    }
  },
  {
    id: 'her75',
    name: 'Her 75',
    category: 'Health & Fitness',
    seoApplicationCategory: 'HealthApplication',
    tagline: '75-Day Challenge Tracker for Women',
    platforms: ['ios'],
    description: "Become her in 75 days. Choose your hard — from a gentle reset to the full 75 — and show up every day with daily missions, proof photos, and a circle of women who won't let you quit.",
    appStoreUrl: 'https://apps.apple.com/app/id6786597603',
    downloadUrl: 'https://apps.apple.com/app/id6786597603',
    appNumericId: '6786597603',
    pricingNote: 'iOS · Subscription',
    comparisonHighlights: [
      { them: 'Generic challenge apps are built for men.', us: 'Made for women, by women.' },
      { them: 'A checkbox is easy to fake.', us: 'Proof photos — you actually showed up.' },
      { them: 'One slip and streak apps wipe everything.', us: 'Streak protection & missed-day recovery.' },
    ],
    seo: {
      title: 'Her 75 | 75-Day Challenge Tracker for Women',
      description: 'Her 75 is the 75-day challenge built for women. Choose your hard, log daily missions with proof photos, and finish with friends. Free to download on iOS.',
      keywords: ['75 day challenge', 'challenge tracker', '75 hard for women', 'her 75', '75 soft challenge', 'habit tracker for women', 'glow up challenge', 'daily goals tracker', 'proof photo habit', 'challenge with friends']
    },
    marketing: {
      headline: 'Become her — in 75 days.',
      subheadline: "Choose your hard. Show up every day with daily missions, proof photos, and a circle of women who won't let you quit.",
      problem: "You start strong on Monday. By Thursday the streak's broken, the app's forgotten, and you're back where you began — again.",
      agitation: 'Most 75-day apps are built for men, reward a checkbox you can fake, and punish one missed day by wiping everything. So you quit.',
      solution: 'Her 75 is the challenge built for women. Pick the hard that fits your life, prove each mission with a photo, and let streak protection carry you through the off days. Finish with friends who keep you honest.',
      benefits: [
        { title: 'Choose your hard', description: 'From a gentle 75 Soft reset to the full hard mode — Glow Up, Sugar-Free, Mental Wellness, Better Me, or build your own. Same discipline, your rules.', icon: 'Sparkles' },
        { title: 'Daily missions', description: 'A simple daily checklist — workout, water, reading, clean eating, and a progress photo. Check them off and watch your streak grow.', icon: 'ListChecks' },
        { title: 'Proof, not promises', description: "Snap a proof photo for each task. Your camera roll becomes a record of the woman you're becoming.", icon: 'Camera' },
        { title: 'Your journey in photos', description: 'Every proof photo lands in a beautiful calendar of your challenge. One tap replays any day.', icon: 'Images' },
        { title: 'Never lose a day', description: 'Check off missions from your home-screen widget. Streak protection and missed-day recovery keep you moving forward instead of back to zero.', icon: 'ShieldCheck' },
        { title: 'Finish with friends', description: "Add friends, follow each other's progress, and keep each other honest. The women who finish don't go it alone.", icon: 'Users' },
      ],
      screenshots: [
        '/her75/screenshots/01.webp'
      ],
      faqs: [
        { question: 'What is Her 75?', answer: 'Her 75 is a 75-day challenge tracker built for women. You choose your challenge — from a gentle reset to the full hard mode — and complete daily missions with proof photos until showing up becomes who you are.', learnMoreSlug: '75-hard-for-women' },
        { question: 'Is Her 75 like a 75-day hard challenge?', answer: 'Her 75 lets you choose your hard. Run a full hard challenge, a softer 75, a Glow Up, Sugar-Free or Mental Wellness track, or build your own — all with proof photos and streak protection.', learnMoreSlug: 'vs-75-hard-official-app' },
        { question: 'What is the 75 Soft challenge?', answer: 'A gentler take on 75 Hard — same daily consistency, kinder rules. Her 75\'s 75 Soft track gives you daily missions, proof photos, and streak protection without the all-or-nothing reset.', learnMoreSlug: '75-soft-challenge-app' },
        { question: 'What happens if I miss a day?', answer: "Unlike apps that wipe your streak, Her 75 includes streak protection and missed-day recovery on most tracks, so one off day doesn't send you back to zero.", learnMoreSlug: 'what-happens-if-you-miss-a-day-75-hard' },
        { question: 'Can I do the challenge with friends?', answer: "Yes. Add friends, follow each other's progress, and keep each other accountable through the whole 75 days.", learnMoreSlug: '75-hard-with-friends' },
        { question: 'Is Her 75 free?', answer: 'Her 75 is free to download. A Premium subscription unlocks every challenge and feature, available as weekly, monthly, or yearly plans.' },
      ]
    },
    legal: {
      privacyPolicy: `Last updated: 3 July 2026

1. What we collect
Your challenge data — habits, daily completions, and proof photos — is stored on your device and in your private iCloud account via Apple's CloudKit. Proof photos never leave your device or your private iCloud.

2. Friends & social features
If you use Friends, a display name, an optional profile photo, and your current challenge progress (such as your current day and streak) are stored in a shared CloudKit database so people you connect with can see your progress. You can remove friends or erase this data at any time from Settings → Delete all data.

3. Subscriptions
When you subscribe, RevenueCat (our payment processor) and Apple receive a pseudonymous ID and your purchase receipt to verify your subscription status. We never see or store your payment details.

4. What we don't do
We do not sell your personal data. We do not use advertising SDKs. There is no third-party analytics tracking you across apps.

5. Deleting your data
Go to Settings → Delete all data in the app to erase your challenge, proof photos, and social profile. Local data is removed immediately; your public social profile is removed so others stop seeing you.

6. Contact
Questions? Email ashwinnanbazhagan@gmail.com`,
      termsOfService: `Last updated: 3 July 2026

1. License
Her 75 is licensed to you under Apple's standard Licensed Application End User License Agreement (EULA), available at: https://www.apple.com/legal/internet-services/itunes/dev/stdeula/

2. Subscriptions
Her 75 Premium is an auto-renewing subscription sold through Apple's App Store, available in weekly, monthly, and yearly plans. Payment is charged to your Apple ID at confirmation of purchase. Subscriptions renew automatically unless cancelled at least 24 hours before the end of the current period. Manage or cancel anytime in your Apple ID Account Settings → Subscriptions.

3. Not medical or fitness advice
Her 75 is a habit and challenge tool. It does not provide medical, dietary, or fitness advice. Consult a qualified professional before beginning any new diet or exercise program.

4. Your content
Proof photos and challenge data are yours. Photos stay on your device and your private iCloud; we have no access to them.

5. Community conduct
If you use Friends, you agree not to use display names, photos, or content that are abusive, harassing, or unlawful. We may remove content or accounts that violate this.

6. Changes
We may update these terms at any time. Continued use of the app constitutes acceptance of the updated terms.

7. Contact
Email: ashwinnanbazhagan@gmail.com`,
      support: `We'd love to help.

Email us at ashwinnanbazhagan@gmail.com and we'll get back to you within 24–48 hours.

Common questions:
• Friends not showing up — make sure you're signed into iCloud and that both people have added each other
• Proof photos missing — check Her 75 has photo access in iPhone Settings → Privacy → Photos
• Subscription questions — manage via Apple ID Account Settings → Subscriptions
• Reset everything — go to Settings → Delete all data in the app`,
      lastUpdated: '3 July 2026'
    },
    design: {
      primary: '#C4765A',
      bg: '#FAF6EF',
      fontFamily: 'font-hanken',
      templateId: 'zen',
      grain: 0.03
    }
  },
];



