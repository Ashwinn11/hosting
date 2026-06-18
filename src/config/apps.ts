export interface Benefit {
  title: string;
  description: string;
  icon: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface AppConfig {
  id: string;
  name: string;
  category: string;
  seoApplicationCategory: string;
  tagline: string;
  platforms: ('ios' | 'android' | 'web')[];
  description: string;
  externalUrl?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  aggregateRating?: { ratingValue: string; ratingCount: string };
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
    category: 'Health & Fitness',
    seoApplicationCategory: 'HealthApplication',
    tagline: 'AI Gut-Health Meal Planner for IBS & FODMAP',
    platforms: ['ios'],
    description: 'The AI meal planner for IBS, IBD, and low-FODMAP diets. Tell GutPal what\'s in your kitchen — it builds a week of gut-safe meals around your conditions, triggers, and diet. No logging. No guessing.',
    appStoreUrl: 'https://apps.apple.com/in/app/gut-buddy-food-scanner-ibs/id6755035965',
    aggregateRating: { ratingValue: '4.8', ratingCount: '47' },
    downloadUrl: 'https://apps.apple.com/in/app/gut-buddy-food-scanner-ibs/id6755035965',
    appNumericId: '6755035965',
    seo: {
      title: 'GutPal | IBS Meal Planner, Low FODMAP & IBD Diet App for iPhone',
      description: 'GutPal builds gut-safe weekly meal plans for IBS, IBD, SIBO, and low-FODMAP diets. Tell us what\'s in your kitchen — we hand you meals that won\'t hurt. Monash-aligned. Free on iOS.',
      keywords: ['IBS Meal Planner', 'Low FODMAP App', 'IBD Diet App', 'Gut Health Meal Planner', 'FODMAP Meal Plan', 'IBS Diet App', 'Crohn\'s Meal Planner', 'SIBO Diet', 'Monash FODMAP App', 'Gut Health App iPhone']
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
        { title: 'Eat out without anxiety', description: 'Heading to a restaurant? GutPal tells you what to order and what to skip based on your conditions. Share your safe picks with friends.', icon: 'ShieldCheck' }
      ],
      faqs: [
        { question: 'Is there an app that plans meals for IBS?', answer: 'GutPal is an AI meal planner built specifically for IBS, IBD, and low-FODMAP diets. Set up your gut profile, tell us what\'s in your kitchen, and GutPal generates a week of gut-safe meals. Free on iOS.' },
        { question: 'What is the best low FODMAP meal planning app?', answer: 'GutPal builds FODMAP-safe meal plans aligned with Monash University research. You tell it your pantry, it gives you meals — no food logging, no calorie counting.' },
        { question: 'Can GutPal help with Crohn\'s or Colitis?', answer: 'Yes. GutPal supports IBD including Crohn\'s Disease and Ulcerative Colitis. Set your conditions and trigger foods in your gut profile — every meal plan respects them.' },
        { question: 'Is GutPal free on iPhone?', answer: 'GutPal is free to download on iOS. GutPal Pro unlocks unlimited meal plans, restaurant guides, and advanced personalization. A 3-day free trial is included.' },
        { question: 'Does GutPal follow Monash University FODMAP guidelines?', answer: 'Yes. All FODMAP content in GutPal is aligned with Monash University research — the gold standard for IBS and low-FODMAP diets.' },
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
    category: 'Education',
    seoApplicationCategory: 'EducationApplication',
    tagline: 'AI Study Discipline & App Blocker',
    platforms: ['ios'],
    description: 'Learn from your own notes. Your apps stay locked until you pass today\'s quiz.',
    appStoreUrl: 'https://apps.apple.com/in/app/masterly-ai-quiz-study-app/id6753760295',
    aggregateRating: { ratingValue: '4.8', ratingCount: '89' },
    downloadUrl: 'https://apps.apple.com/in/app/masterly-ai-quiz-study-app/id6753760295',
    appNumericId: '6753760295',
    seo: {
      title: 'Masterly AI | AI Flashcard Generator, Study Planner & App Blocker for iPhone',
      description: 'Upload your syllabus. Masterly builds a day-by-day exam plan, auto-generates flashcards and quizzes from your notes, and locks apps until you pass. Free on iOS.',
      keywords: ['Study App', 'AI Study Planner', 'App Blocker for Students', 'Flashcard App', 'Exam Prep', 'AI Flashcards', 'Study Discipline', 'Masterly', 'Quiz App', 'Syllabus Planner']
    },
    marketing: {
      headline: 'The AI Study App That Locks Your Phone Until You Learn.',
      subheadline: 'Upload your syllabus. Get a day-by-day plan to your exam. Flashcards, quizzes, and app blocking — all generated from your own notes.',
      problem: 'You open Instagram to "quickly check" something and lose an hour. You don\'t know what to study or in what order. The night before the exam, your notes feel pointless.',
      agitation: 'Existing app blockers are too easy to bypass. Generic study tools give you flashcards for someone else\'s material. And no app actually connects your studying to your phone unlocking.',
      solution: 'Masterly uploads your syllabus, sets your exam date, and builds a day-by-day AI study plan. Each day: a lesson, flip flashcards, and a quiz — all from your own notes. Pass the quiz. Unlock your apps.',
      benefits: [
        { title: 'AI Study Plan', description: 'Set your exam date. AI breaks your syllabus into a day-by-day plan so you always know what to study next.', icon: 'BookOpen' },
        { title: 'Flashcards + Quiz', description: 'Each day generates flip flashcards and a multiple-choice quiz from your own uploaded notes.', icon: 'Zap' },
        { title: 'App Blocker Gate', description: 'iOS Screen Time locks your chosen apps during your study window. Pass today\'s quiz to unlock them.', icon: 'Lock' },
        { title: 'Streak System', description: 'Build a daily streak. Consecutive days of quiz completion tracked automatically.', icon: 'Flame' }
      ],
      videoHero: '/masterly_demo.mp4',
      faqs: [
        { question: 'Is there an app that blocks social media until I finish studying?', answer: 'Masterly AI uses iOS Screen Time to lock chosen apps during your study window. Apps only unlock after you pass the day\'s AI-generated quiz — built from your own uploaded notes and syllabus.' },
        { question: 'Can an app generate flashcards from my own notes?', answer: 'Masterly AI generates flip flashcards and multiple-choice quizzes directly from PDFs or text you upload. Every flashcard is unique to your material, not generic content.' },
        { question: 'What is the best AI study planner app for exams?', answer: 'Masterly AI takes your exam date and syllabus, then builds a day-by-day study plan automatically. Each day includes a lesson, flashcards, and a quiz — so you always know exactly what to study next.' },
        { question: 'Is Masterly AI free for iPhone?', answer: 'Masterly AI is free to download on iOS. Full AI lesson generation and app blocking features require a subscription, available via Apple App Store.' },
        { question: 'How does Masterly AI\'s app blocker work?', answer: 'Masterly AI uses Apple\'s Family Controls and Screen Time API to lock selected apps during your study window. Once you complete and pass the daily quiz, the apps automatically unlock.' },
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
    category: 'Lifestyle',
    seoApplicationCategory: 'LifestyleApplication',
    tagline: 'Morning Ritual & App Blocker',
    platforms: ['ios'],
    description: 'Honestly is a morning ritual app with a warm, paper-feel design. Pick your mood, write to a daily prompt tailored to your goal, add a gratitude note — and your distracting apps unlock. A plant grows as your streak builds.',
    appStoreUrl: 'https://apps.apple.com/in/app/honestly-morning-journal/id6759817879',
    aggregateRating: { ratingValue: '4.7', ratingCount: '31' },
    downloadUrl: 'https://apps.apple.com/in/app/honestly-morning-journal/id6759817879',
    appNumericId: '6759817879',
    seo: {
      title: 'Honestly | Morning Journal, App Blocker & Daily Ritual for iPhone',
      description: 'Honestly locks apps until you complete your morning ritual: mood check, guided prompt, gratitude. Watch your plant grow as your streak builds. Free on iOS.',
      keywords: ['Honestly', 'Morning Ritual App', 'App Blocker', 'Morning Journal', 'Guided Journaling', 'Daily Gratitude App', 'Screen Time App', 'Mindfulness', 'Morning Routine iPhone', 'Journaling App']
    },
    marketing: {
      headline: 'Your morning doesn\'t have to start with someone else\'s content.',
      subheadline: 'A 3-step ritual — mood, journal, gratitude — and your apps unlock. Takes 5 minutes. Changes how your whole day feels.',
      problem: 'You wake up and immediately open Instagram, X, or your inbox. Before you\'ve had a single thought of your own, you\'re already reacting to everyone else\'s world.',
      agitation: 'Willpower doesn\'t work. Timers don\'t work. There\'s no friction between you and the scroll — so you scroll.',
      solution: 'Honestly locks your distracting apps via iOS Screen Time until you complete your morning ritual. Pick your mood. Write to a daily journal prompt tailored to what you want — clarity, peace, focus, or energy. Add a gratitude note. Then your apps unlock. And a little plant grows.',
      benefits: [
        { title: 'Mood-Led Ritual', description: 'Pick how you\'re actually feeling — Happy, Okay, Sad, Awful, or Cry. It sets the tone for your journal.', icon: 'Sun' },
        { title: 'Personalized Daily Prompts', description: 'Journal prompts rotate daily and adapt to your chosen goal: Clarity, Peace, Focus, or Energy.', icon: 'PenLine' },
        { title: 'Gratitude Step', description: 'A rotating gratitude question with suggestion chips to make it feel fresh every morning.', icon: 'Heart' },
        { title: 'App Blocker Gate', description: 'Distracting apps stay locked via iOS Screen Time until you finish. Not willpower — a gate.', icon: 'Lock' },
        { title: 'Plant Growth System', description: 'Earn a sprout every morning. Your plant grows through 4 stages over 180+ days — a living record of your streak.', icon: 'Leaf' },
        { title: 'Home Screen Widgets', description: 'See your mood, journal streak, and plant right on your home screen without opening the app.', icon: 'LayoutGrid' }
      ],
      screenshots: [
        '/honestly/journal.png'
      ],
      faqs: [
        { question: 'What is the best morning journaling app for iPhone?', answer: 'Honestly guides you through a 3-step morning ritual — mood check-in, a personalized daily journal prompt, and a gratitude question — with a plant that grows as your streak builds. Available free on iOS.' },
        { question: 'Is there a journaling app that also blocks distracting apps?', answer: 'Honestly blocks your chosen distracting apps via iOS Screen Time until you complete your morning ritual. Once you finish, your apps unlock automatically.' },
        { question: 'What journal prompts does Honestly use?', answer: 'Honestly rotates through 20+ journal prompts per day that adapt to your chosen morning goal — Clarity, Peace, Focus, or Energy — so it never feels repetitive.' },
        { question: 'Is Honestly free?', answer: 'Honestly is free to download on iOS. A premium subscription unlocks full journal history, advanced widgets, and multilingual support.' },
        { question: 'What are alternatives to Day One for morning routines?', answer: 'Honestly is built specifically for a structured morning ritual with app blocking and a growing plant streak system — whereas Day One is an open-ended long-form diary. Honestly is for people who want a morning habit, not just a journal.' },
      ]
    },
    legal: {
      privacyPolicy: 'Data collection:\n- We collect no personal information\n- We do not use third-party analytics\n- We do not track your activity across other apps\n- Journal entries are stored securely on-device using Apple\'s protected local storage\n\nData retention and deletion:\n- Journal data remains on-device unless you delete it\n- You can delete all local data from Settings inside the app\n\nContact:\n- Email: ashwinnanbazhagan@gmail.com',
      termsOfService: 'Subscription terms:\n- Premium features are offered as auto-renewing subscriptions\n- Payment is charged to your Apple ID account at confirmation\n- Subscription renews automatically unless canceled at least 24 hours before the period ends\n- You can manage or cancel subscriptions in Apple ID Subscriptions settings\n- Restore Purchases is available in the app\n\nUsage:\n- You are responsible for how you configure app blocking selections\n- The app depends on Screen Time authorization and Apple platform behavior\n\nDisclaimer:\n- Service is provided as-is without guarantees of uninterrupted availability\n\nContact:\n- Email: ashwinnanbazhagan@gmail.com',
      support: 'For any issues or questions regarding Honestly, please reach out to our support team.\n\nEmail: ashwinnanbazhagan@gmail.com\n\nWe typically respond within 24-48 hours.',
      lastUpdated: 'May 30, 2026'
    },
    design: {
      primary: '#FF6B00',
      bg: '#F7F5F0',
      fontFamily: 'font-outfit',
      templateId: 'sanctuary',
      mesh: false
    }
  },

  {
    id: 'shotly',
    name: 'Shotly',
    category: 'Health & Fitness',
    seoApplicationCategory: 'HealthApplication',
    tagline: 'GLP-1 Injection & Weight Loss Tracker',
    platforms: ['ios'],
    description: 'The complete GLP-1 companion app. Track Ozempic, Wegovy, Mounjaro, and Zepbound injections, log your weight loss journey, and monitor meals — all in one beautiful, private app.',
    appStoreUrl: 'https://apps.apple.com/us/app/glp-1-tracker-shotly/id6776381502',
    aggregateRating: { ratingValue: '4.9', ratingCount: '12' },
    downloadUrl: 'https://apps.apple.com/us/app/glp-1-tracker-shotly/id6776381502',
    appNumericId: '6776381502',
    seo: {
      title: 'Shotly | Ozempic, Wegovy & GLP-1 Injection Tracker for iPhone',
      description: 'Track Ozempic, Wegovy, Mounjaro & Zepbound injections. Log weight loss, monitor nutrition. Built for GLP-1 users. Free on iOS.',
      keywords: ['GLP-1 Tracker', 'Ozempic Tracker', 'Wegovy Tracker', 'Mounjaro Tracker', 'Zepbound App', 'Injection Log', 'Weight Loss App', 'Semaglutide Tracker', 'Tirzepatide App', 'Peptide Tracker']
    },
    marketing: {
      headline: 'Your GLP-1 Journey, Beautifully Tracked.',
      subheadline: 'Log injections, watch the pounds drop, and stay on top of your nutrition — all in one private app built for Ozempic, Wegovy, Mounjaro & Zepbound.',
      problem: 'You\'re on a weekly injection and tracking it in your phone\'s Notes app. Or a spreadsheet. Or not at all. You miss shots, lose streak momentum, and have no clear picture of how far you\'ve come.',
      agitation: 'Generic habit trackers don\'t understand dose escalation schedules. Fitness apps weren\'t built for GLP-1 users whose appetite is suppressed to 1,200 calories. Nothing connects your injection day to your weight trend.',
      solution: 'Shotly is purpose-built for GLP-1 users. Log every shot with dose, site, and notes. See your weight chart slope downward week by week. Track protein, fiber, and calories at the right targets for your medication. Know exactly how many days until your next dose.',
      benefits: [
        { title: 'Injection Log', description: 'Log every dose with medication, amount, injection site, and notes. Built-in dose escalation schedule for Ozempic, Wegovy, Mounjaro & Zepbound.', icon: 'Zap' },
        { title: 'Weight Loss Chart', description: 'A weekly weight chart that shows your actual trajectory. See total pounds lost and your average loss per week at a glance.', icon: 'TrendingDown' },
        { title: 'Nutrition Tracking', description: 'Log meals with calories, protein, fiber, and fat. Goals calibrated for GLP-1 users — high protein, appropriate fiber.', icon: 'Utensils' },
        { title: 'Next Dose Countdown', description: 'Always know how many days until your next injection. Never miss a dose or second-guess your schedule again.', icon: 'Clock' }
      ],
      screenshots: [
        '/shotly/01.png',
        '/shotly/02.png',
        '/shotly/03.png',
        '/shotly/04.png',
      ],
      faqs: [
        { question: 'What is the best app to track Ozempic injections?', answer: 'Shotly is a dedicated injection tracker for Ozempic, Wegovy, Mounjaro, and Zepbound. Log every weekly dose with site, amount, and notes. See your full injection history and know exactly when your next dose is due.' },
        { question: 'Is there an app for tracking weight loss on Mounjaro?', answer: 'Shotly tracks your weight weekly alongside your injection log, showing a chart of your full journey. See total pounds lost, average loss per week, and your progress toward your goal weight.' },
        { question: 'How do I track Wegovy dose escalation on my phone?', answer: 'Shotly supports the full dose escalation schedule for Wegovy (0.25 → 0.5 → 1.0 → 1.7 → 2.4 mg). Your current dose is tracked and displayed on every injection log entry.' },
        { question: 'Is Shotly free on iPhone?', answer: 'Shotly is free to download on iOS. Core injection and weight tracking are free. Premium unlocks unlimited meal logging, body measurements, side effect tracking, and progress photos.' },
        { question: 'Can I track nutrition on a GLP-1 medication?', answer: 'Shotly includes a meal logger with calories, protein, fiber, and fat — with daily goals calibrated for GLP-1 users (typically higher protein, moderate fiber, lower overall calories due to appetite suppression).' },
      ]
    },
    legal: {
      privacyPolicy: `1. Data We Collect\nShotly collects only the data you enter directly into the app: injection logs, weight entries, meal logs, and profile details (age, weight, goal). No biometric identifiers or personal data beyond what you voluntarily enter is collected.\n\n2. How We Use Your Data\nAll health data is stored locally on your device. Shotly does not transmit your health logs to any external server, and does not sell or share your personal data with third parties.\n\n3. Subscription & Payments\nSubscription billing is handled entirely by Apple via the App Store. Shotly uses RevenueCat to verify subscription status via anonymized receipts only. No payment information is ever seen or stored by Shotly.\n\n4. RevenueCat\nWe use RevenueCat for anonymous subscription verification. No personal health data is shared with RevenueCat.\n\n5. Health Disclaimer\nShotly is a personal tracking tool and is not a medical device. It does not provide medical advice. Always follow your prescribing physician's instructions regarding your GLP-1 medication.\n\n6. Contact\nFor privacy questions, contact: ashwinnanbazhagan@gmail.com`,
      termsOfService: `1. NOT MEDICAL ADVICE\nShotly is a personal logging and tracking tool provided for informational purposes only. It does not constitute medical advice, diagnosis, or treatment. Always seek the advice of your physician or qualified health provider regarding your GLP-1 medication.\n\n2. USER RESPONSIBILITY\nYou are solely responsible for the accuracy of data you enter into the app and for all decisions made regarding your medication, dosage, and health.\n\n3. SUBSCRIPTION\nShotly Premium is available via auto-renewing subscription through the Apple App Store. Subscriptions automatically renew unless cancelled at least 24 hours before the end of the current period. Manage or cancel subscriptions in your Apple ID Account Settings.\n\n4. LIMITATION OF LIABILITY\nIn no event shall the developers of Shotly be liable for any damages arising from the use or misuse of the application or reliance on its tracking data.\n\n5. APPLE EULA\nBy using this software, you also agree to the Standard Apple Licensed Application End User License Agreement: https://www.apple.com/legal/internet-services/itunes/dev/stdeula/\n\n6. Contact\nEmail: ashwinnanbazhagan@gmail.com`,
      support: 'For support or questions regarding Shotly, contact us at ashwinnanbazhagan@gmail.com\n\nWe typically respond within 24–48 hours.',
      lastUpdated: '8 June 2026'
    },
    design: {
      primary: '#FF6B00',
      bg: '#F7F5F0',
      fontFamily: 'font-inter',
      templateId: 'zen',
      grain: 0.04
    }
  },
  {
    id: 'yumeship',
    name: 'YumeShip',
    category: 'Entertainment',
    seoApplicationCategory: 'EntertainmentApplication',
    tagline: 'your quiet place for the ones you love from afar',
    platforms: ['ios'],
    description: 'A private creative space for fans to cherish their favourite characters and ships. Write love letters, build headcanons, track dates, and keep everything in a soft, personal vault — all on your device.',
    appStoreUrl: 'https://apps.apple.com/app/yumeship-anime-kpop-canon/id6773642234',
    downloadUrl: 'https://apps.apple.com/app/yumeship-anime-kpop-canon/id6773642234',
    appNumericId: '6773642234',
    aggregateRating: { ratingValue: '4.9', ratingCount: '24' },
    seo: {
      title: 'YumeShip | Fandom Journal for Ships, F/Os & Characters for iPhone',
      description: 'A private vault for your favourite characters. Write love letters, build headcanons, track dates. All on your device, never shared. Free on iOS.',
      keywords: ['yumeshipping', 'fictive', 'fandom app', 'f/o app', 'ship journal', 'fan creative space', 'yumeship', 'character journal', 'kin app', 'fan diary']
    },
    marketing: {
      headline: 'A quiet place for the ones you love from afar.',
      subheadline: 'Write love letters. Build headcanons. Keep them close — privately, beautifully, just for you.',
      problem: 'Your feelings for them are real. But there\'s nowhere soft enough to hold them.',
      agitation: 'Notes apps feel cold. Social media feels exposed. There\'s no space that understands what it means to ship, to kin, to love a character quietly.',
      solution: 'YumeShip is a private creative vault built for fans. Every ship gets its own page — templates, love letters, headcanons, dates, scenes. Nothing leaves your phone.',
      benefits: [
        { title: 'Ship Profiles', description: 'Every F/O gets their own page with a visual template, colour palette, and all their details.', icon: 'Heart' },
        { title: 'Love Letters & Scenes', description: 'Write letters, scenes, and message threads. Keep the soft, personal moments in one place.', icon: 'Mail' },
        { title: 'Headcanons & Vault', description: 'Log headcanons by category. Build your private vault of everything you hold about them.', icon: 'BookOpen' },
        { title: 'Fully Private', description: 'Everything stays on your device. No accounts, no cloud, no sharing. Just yours.', icon: 'Lock' },
      ],
      screenshots: [
        '/yumeship/1.webp',
        '/yumeship/2.webp',
        '/yumeship/3.webp',
        '/yumeship/4.webp',
      ],
      faqs: [
        { question: 'What is YumeShip?', answer: 'YumeShip is a private creative app for fans — specifically for yumeshippers, fictives, and anyone who loves a character. You can build ship profiles, write love letters, log headcanons, and keep special dates all in one soft, personal space.' },
        { question: 'Is YumeShip private?', answer: 'Yes. Everything you create in YumeShip stays on your device in a local database. There are no accounts, no cloud sync, and no sharing. Your vault is completely private.' },
        { question: 'What is a F/O in YumeShip?', answer: 'F/O stands for Fictive Other — a character you have a personal, loving connection with. YumeShip is built specifically for this kind of relationship, with templates and spaces designed around it.' },
        { question: 'Can I have multiple ships?', answer: 'Yes. Premium users can create unlimited ships. Free users get one ship to start.' },
        { question: 'Is YumeShip free?', answer: 'YumeShip is free to download. Premium unlocks unlimited ships and all visual templates.' },
      ]
    },
    legal: {
      privacyPolicy: `Last updated: May 27, 2025\n\n1. Your data stays on your device\nEverything you create in YumeShip — ships, headcanons, letters, scenes — is stored locally on your device in an on-device database. We cannot see it, access it, or back it up. Deleting the App removes all of it permanently.\n\n2. What we don't collect\nWe do not collect your name, email, or any creative content. We do not use advertising SDKs or sell data to third parties. There is no account system.\n\n3. Subscriptions\nWhen you subscribe, our payment processor (RevenueCat) receives a pseudonymous ID and your purchase receipt to verify your subscription status. No personal details are shared with us. RevenueCat's privacy policy: revenuecat.com/privacy.\n\n4. Notifications\nIf you allow notifications, scheduled reminders are handled entirely on-device through iOS. Nothing is sent to our servers.\n\n5. Deleting your data\nGo to Settings → Delete all data to wipe everything from your device. Since we hold no data on our end, there is nothing further to request from us.\n\n6. Contact\nQuestions? Reach us at: ashwinnanbazhagan@gmail.com`,
      termsOfService: `Last updated: May 27, 2025\n\nLicensed Application EULA\nYumeShip is licensed to you under Apple's standard End User License Agreement (EULA). The EULA applies to your use of this App and is available at: https://www.apple.com/legal/internet-services/itunes/dev/stdeula/\n\nSubscriptions\nYumeShip Premium is an auto-renewable subscription sold through Apple's App Store. Payment is charged to your Apple ID at confirmation of purchase. Subscriptions renew automatically unless cancelled at least 24 hours before the end of the current period. Manage or cancel anytime in your Apple ID Account Settings.\n\nYour Content\nEverything you create in YumeShip — ships, letters, headcanons — stays on your device. We have no access to it. It belongs entirely to you.\n\nContact\nQuestions? Reach us at: ashwinnanbazhagan@gmail.com`,
      support: `We'd love to help.\n\nEmail us at ashwinnanbazhagan@gmail.com and we'll get back to you within 24–48 hours.\n\nCommon questions are also answered in our FAQ on the landing page.`,
      lastUpdated: 'May 27, 2025'
    },
    design: {
      primary: '#9b4f6e',
      bg: '#faf8f5',
      fontFamily: 'font-instrument',
      templateId: 'zen'
    }
  },
];



