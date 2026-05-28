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
    id: 'menucheck',
    name: 'Menu Check',
    category: 'Health & Fitness',
    tagline: 'Scan Menus & Barcodes for Safe Eating',
    platforms: ['ios'],
    description: 'The AI gut health companion for IBS, Celiac, IBD, and more. Scan restaurant menus and over 3 million grocery products to find safe dishes and ingredients tailored to your specific profile of 100+ conditions, allergies, and diets.',
    appStoreUrl: 'https://apps.apple.com/in/app/gut-buddy-food-scanner-ibs/id6755035965',
    aggregateRating: { ratingValue: '4.8', ratingCount: '47' },
    downloadUrl: 'https://apps.apple.com/in/app/gut-buddy-food-scanner-ibs/id6755035965',
    appNumericId: '6755035965',
    seo: {
      title: 'Menu Check | IBS Food Scanner, FODMAP & Celiac Barcode Scanner',
      description: 'Scan restaurant menus and 3M+ grocery barcodes for IBS, Celiac, Crohn\'s, FODMAP & 100+ conditions. Get instant Safe/Limit/Avoid verdicts. Free on iOS.',
      keywords: ['IBS Food Scanner', 'FODMAP Scanner', 'Celiac App', 'Barcode Scanner Gut Health', 'Restaurant Menu Scanner', 'Gut Health App', 'Food Sensitivity App', 'Crohn\'s Food Checker', 'Safe Food App', 'AI Recipe Generator IBS']
    },
    marketing: {
      headline: 'The Food Scanner Built for IBS, Celiac & Gut Conditions.',
      subheadline: 'Scan menus, barcodes, and dishes. Get instant Safe/Limit/Avoid verdicts tailored to your exact conditions, allergies, and diet.',
      problem: 'You\'re at a restaurant. The menu is three pages long. You ask the waiter but they\'re not sure. You guess. You pay for it the next three days.',
      agitation: 'Reading every ingredient label takes forever. Online databases don\'t know your specific conditions. Generic "healthy eating" apps have no idea what IBS, FODMAP, or Celiac actually means for your body.',
      solution: 'Menu Check builds a detailed profile of your conditions, allergies, diet preferences, and strictness level. Then it instantly analyzes any menu, dish, or barcode against your exact profile — giving you a clear Safe, Limit, or Avoid verdict every time.',
      benefits: [
        { title: 'Barcode Scanner', description: 'Scan 3M+ grocery products via OpenFoodFacts. Instant verdict against your profile.', icon: 'Camera' },
        { title: 'Menu Photo Scan', description: 'Point your camera at a restaurant menu. AI reads and scores every dish for your conditions.', icon: 'ShieldCheck' },
        { title: 'Safe Recipe Generator', description: 'AI generates gut-friendly recipes with prep time, difficulty, and gut notes — built for your exact profile.', icon: 'Utensils' }
      ],
      screenshots: [
        '/menucheck/02.png',
        '/menucheck/03.png',
        '/menucheck/04.png'
      ],
      faqs: [
        { question: 'Is there an app that scans restaurant menus for IBS?', answer: 'Menu Check scans restaurant menus using AI to give instant Safe, Limit, or Avoid verdicts for IBS, FODMAP, Celiac, and 100+ conditions. Point your camera at any menu and get results in seconds.' },
        { question: 'What barcode scanner app works for FODMAP?', answer: 'Menu Check scans over 3 million grocery product barcodes via OpenFoodFacts, cross-referencing every ingredient against your specific FODMAP, Celiac, or gut health profile.' },
        { question: 'Is Menu Check free on iPhone?', answer: 'Yes. Menu Check is free to download on iOS. Core scanning features are free; a premium subscription unlocks unlimited AI recipe generation and advanced filtering.' },
        { question: 'Can Menu Check detect hidden ingredients for Celiac disease?', answer: 'Menu Check checks every ingredient and sub-ingredient against a Celiac-specific database, flagging gluten-containing additives, starch derivatives, and cross-contamination warnings where available.' },
        { question: 'Which food scanner app supports the most dietary conditions?', answer: 'Menu Check supports over 100 conditions, allergies, and diets — including IBS, Celiac, IBD, Crohn\'s, SIBO, histamine intolerance, FODMAP, dairy-free, nut-free, and more.' },
      ]
    },
    legal: {
      privacyPolicy: '1. Information We Collect\nMenu Check collects information you provide directly: your name, age, gender, and dietary preferences when you create an account.\n\n2. Health Data\nWe collect and process data you log in the app, including meal times, food items, and mood ratings. This data is used solely to provide insights into your gut health.\n\n3. Use of Information\nWe use the information we collect to personalize your experience, provide health insights, and improve our services. We do not sell your personal data.\n\n4. Data Security\nWe take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access.\n\n5. Contact Us\nIf you have any questions about this Privacy Policy, please contact us at ashwinnanbazhagan@gmail.com.',
      termsOfService: 'By using Menu Check, you agree to the following terms:\n\n1. Medical Disclaimer\nMenu Check is designed to help you track your meals and mood. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.\n\n2. User Accounts\nYou are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.\n\n3. Acceptable Use\nYou agree not to use the app for any unlawful purpose or in any way that could damage, disable, overburden, or impair the service.\n\n4. Changes to Terms\nWe reserve the right to modify these terms at any time. We will notify you of any significant changes by posting the new terms in the app.\n\n5. Contact Information\nEmail: ashwinnanbazhagan@gmail.com',
      support: 'For any issues or questions regarding Menu Check, please reach out to our support team.\n\nEmail: ashwinnanbazhagan@gmail.com\n\nWe typically respond within 24-48 hours.',
      lastUpdated: '15 March 2026'
    },
    design: {
      primary: '#2D7A52',
      bg: '#F0F7F2',
      fontFamily: 'font-figtree',
      templateId: 'zen',
      grain: 0.05
    }
  },
  {
    id: 'masterly',
    name: 'Masterly AI',
    category: 'Education',
    tagline: 'AI Study Discipline & App Blocker',
    platforms: ['ios'],
    description: 'Learn from your own notes. Your apps stay locked until you pass today\'s quiz.',
    appStoreUrl: 'https://apps.apple.com/in/app/masterly-ai-quiz-study-app/id6753760295',
    aggregateRating: { ratingValue: '4.8', ratingCount: '89' },
    downloadUrl: 'https://apps.apple.com/in/app/masterly-ai-quiz-study-app/id6753760295',
    appNumericId: '6753760295',
    seo: {
      title: 'Masterly AI | AI Study Planner, Flashcards & App Blocker for Exams',
      description: 'Upload your syllabus. Masterly builds a day-by-day exam plan, generates flashcards and quizzes from your notes, and locks your apps until you pass. Free on iOS.',
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
    id: 'morningjournal',
    name: 'Honestly: Morning Journal',
    category: 'Lifestyle',
    tagline: 'Block Apps, Clear Your Mind',
    platforms: ['ios'],
    description: 'Start your day with intention. A 4-step ritual of Mood tracking, Journaling, 3 Big Wins, and Gratitude. Synchronized across your devices with interactive widgets.',
    appStoreUrl: 'https://apps.apple.com/in/app/honestly-morning-journal/id6759817879',
    aggregateRating: { ratingValue: '4.7', ratingCount: '31' },
    downloadUrl: 'https://apps.apple.com/in/app/honestly-morning-journal/id6759817879',
    appNumericId: '6759817879',
    seo: {
      title: 'Honestly: Morning Journal | App Blocker & Daily Reflection',
      description: 'Start your day with intention. Honestly blocks your distracting apps until you complete your morning reflection.',
      keywords: ['Honestly', 'Journaling', 'App Blocker', 'Morning Routine', 'Screen Time', 'Mindfulness']
    },
    marketing: {
      headline: 'Reclaim your morning focus.',
      subheadline: 'The 4-step ritual to clear your mind and set your daily intentions.',
      problem: 'Starting the day by doom-scrolling ruins your focus and productivity.',
      agitation: 'Notifications and feeds steal your most productive hours before you even get out of bed.',
      solution: 'Honestly combines a calming journaling experience with powerful focus tools, ensuring you start your day proactively.',
      benefits: [
        { title: '4-Step Morning Ritual', description: 'Mood, Journal, 3 Big Wins, and Gratitude to center your mind.', icon: 'Moon' },
        { title: 'Interactive Widgets', description: 'Track your Big Wins and Streaks right from your Home Screen.', icon: 'ShieldHighlight' },
        { title: 'iCloud Sync', description: 'Your journals and focus data sync seamlessly between iPhone and iPad.', icon: 'Lock' }
      ],
      screenshots: [
        '/morningjournal/journal.png'
      ],
      faqs: [
        { question: 'What is the best morning journaling app for iPhone?', answer: 'Honestly: Morning Journal guides you through a 4-step ritual — Mood check-in, freeform journal, 3 Big Wins goal-setting, and Gratitude — synced across iPhone and iPad with interactive home screen widgets.' },
        { question: 'Is there a journaling app that also blocks distracting apps?', answer: 'Honestly blocks your chosen distracting apps in the morning using iOS Screen Time. Apps unlock only after you complete your daily reflection ritual.' },
        { question: 'Does Honestly journal sync between iPhone and iPad?', answer: 'Yes. Honestly uses iCloud to sync your journal entries, mood logs, and streaks seamlessly across all your Apple devices.' },
        { question: 'Is Honestly: Morning Journal free?', answer: 'Honestly is free to download on iOS. A premium subscription unlocks unlimited journal history, advanced widgets, and additional ritual customization.' },
        { question: 'What are alternatives to Day One for morning routines?', answer: 'Honestly: Morning Journal combines structured reflection (mood, intentions, gratitude) with app blocking — ideal for users who want both a journaling habit and a distraction-free morning, unlike Day One which is unstructured long-form journaling.' },
      ]
    },
    legal: {
      privacyPolicy: 'Data collection:\n- We collect no personal information\n- We do not use third-party analytics\n- We do not track your activity across other apps\n- Journal entries are stored securely using Apple\'s protected local storage\n\nData retention and deletion:\n- Journal data remains on-device unless you delete it\n- You can delete your account and local data from Settings > Account > Delete Account\n\nContact:\n- Email: ashwinnanbazhagan@gmail.com',
      termsOfService: 'Subscription terms:\n- Premium features are offered as auto-renewing subscriptions\n- Payment is charged to your Apple ID account at confirmation\n- Subscription renews automatically unless canceled at least 24 hours before the period ends\n- You can manage or cancel subscriptions in Apple ID Subscriptions settings\n- Restore Purchases is available in the app\n\nUsage:\n- You are responsible for how you configure app blocking selections\n- The app depends on Screen Time authorization and Apple platform behavior\n\nDisclaimer:\n- Service is provided as-is without guarantees of uninterrupted availability\n\nContact:\n- Email: ashwinnanbazhagan@gmail.com',
      support: 'For any issues or questions regarding Honestly, please reach out to our support team.\n\nEmail: ashwinnanbazhagan@gmail.com',
      lastUpdated: 'February 28, 2026'
    },
    design: {
      primary: '#594CF2',
      bg: '#0D051E',
      fontFamily: 'font-playfair',
      templateId: 'sanctuary',
      mesh: true
    }
  },

  {
    id: 'pepkit',
    name: 'PepKit',
    category: 'Health & Fitness',
    tagline: 'Precision Peptide & GLP-1 Tracker',
    platforms: ['ios'],
    description: 'The definitive dosing and research tool for peptide protocols. Calculate reconstitutions with clinical accuracy, log injections, and manage your vial inventory seamlessly.',
    appStoreUrl: 'https://apps.apple.com/us/app/peptide-calculator-pepkit/id6764238552',
    aggregateRating: { ratingValue: '4.9', ratingCount: '56' },
    downloadUrl: 'https://apps.apple.com/us/app/peptide-calculator-pepkit/id6764238552',
    appNumericId: '6764238552',
    seo: {
      title: 'PepKit | Peptide Calculator, Cycle Tracker & GLP-1 Dose Logger',
      description: 'The complete peptide research toolkit. Reconstitution calculator, cycle planner, inventory tracker, lab results, and compound level charts. Free on iOS.',
      keywords: ['Peptide Calculator', 'GLP-1 Tracker', 'Peptide Reconstitution Calculator', 'Peptide Cycle Tracker', 'Peptide Dose Logger', 'BPC-157 Calculator', 'Peptide Inventory', 'Lab Results Tracker', 'Compound Levels', 'Peptide App']
    },
    marketing: {
      headline: 'The Peptide Calculator & Cycle Tracker Built for Precision.',
      subheadline: 'Reconstitution math, dose logging, cycle tracking, inventory alerts, and lab results — all in one place.',
      problem: 'Reconstitution math is unforgiving. One wrong calculation wastes an entire vial. Most people track doses in scattered notes, run out of vials mid-cycle with no warning, and have no way to visualize compound levels over time.',
      agitation: 'Spreadsheets don\'t alert you when stock is low. Notes don\'t calculate how much BAC water to use. And nothing connects your lab results to your active protocol.',
      solution: 'PepKit handles the math, the tracking, the alerts, and the visualization. Step-by-step reconstitution guides. Auto-deducting inventory. Day-by-day dose logging with a body map. Compound level curves based on half-life. Lab results alongside your cycles.',
      benefits: [
        { title: 'Reconstitution Calculator', description: 'Step-by-step guide: vial size, BAC water volume, desired dose → exact units to draw. No math errors.', icon: 'Zap' },
        { title: 'Cycle Planner', description: 'Multi-compound protocols with start/end dates. See all active cycles and what\'s due today.', icon: 'Clock' },
        { title: 'Inventory + Lab Tracking', description: 'Auto-deducting vial stock with 20% low alerts. Log bloodwork and view compound level curves.', icon: 'ShieldCheck' }
      ],
      screenshots: [
        '/pepkit/03.png',
        '/pepkit/04.png',
        '/pepkit/05.png'
      ],
      faqs: [
        { question: 'What is the best peptide calculator app for iPhone?', answer: 'PepKit is a peptide reconstitution calculator for iOS that walks you through vial size, BAC water volume, and desired dose — giving the exact units to draw. Supports BPC-157, TB-500, Semaglutide, Tirzepatide, and hundreds more.' },
        { question: 'Is there an app for tracking BPC-157 dosing?', answer: 'PepKit includes a full cycle planner and dose log for BPC-157 and other peptides. Each injection is logged with date, dose, and body map injection site. Compound level curves are calculated from half-life data.' },
        { question: 'How do I calculate how much BAC water to add to a peptide vial?', answer: "PepKit's reconstitution calculator takes your vial size (e.g., 5mg), desired dose (e.g., 250mcg), and desired concentration, then tells you exactly how many mL of BAC water to add and how many units to draw per dose." },
        { question: 'Is PepKit free on iOS?', answer: 'PepKit is free to download on the App Store. Core reconstitution calculations and cycle tracking are free; inventory management and lab results tracking are available via subscription.' },
        { question: 'What peptide tracking app works for GLP-1 like Semaglutide or Tirzepatide?', answer: 'PepKit tracks GLP-1 peptides including Semaglutide and Tirzepatide with dose escalation scheduling, compound level curves, and injection site logging. It also tracks lab results alongside your active protocol.' },
      ]
    },
    legal: {
      privacyPolicy: `1. Data We Collect\nPepKit collects only the data you enter directly into the app: peptide names, dose amounts, injection sites, and cycle details. No biometric or identifiable personal data is required.\n\n2. How We Use Your Data\nAll logs and cycle data are stored locally on your device using standard iOS storage. Your data is never transmitted to any server, sold, or shared with third parties.\n\n3. Subscription & Payments\nSubscription billing is handled entirely by Apple. PepKit never sees or stores your payment information.\n\n4. RevenueCat\nWe use RevenueCat to verify subscription status via anonymized App Store receipts. No personal health data is shared.\n\n5. Health Disclaimer\nPepKit is a personal tracking tool and is not a medical device. Always consult a qualified healthcare professional before starting any peptide protocol.\n\n6. Contact\nFor privacy questions, contact: support@PepKit.app`,
      termsOfService: `1. NO MEDICAL ADVICE\nPepKit provides personal tracking tools for informational purposes only. It does not constitute medical advice or treatment. Always seek the advice of your physician.\n\n2. USER RESPONSIBILITY\nYou are solely responsible for the accuracy of any data entered into the app (including dose calculations) and for any decisions made based on such information.\n\n3. LIMITATION OF LIABILITY\nIn no event shall the developers of PepKit be liable for any damages resulting from the use of the application or the peptides mentioned in the library.\n\n4. APPLE EULA\nBy using this software, you also agree to the Standard Apple Licensed Application End User License Agreement (EULA).`,
      support: 'For support or questions regarding PepKit research tools, contact us at support@PepKit.app',
      lastUpdated: '12 May 2026'
    },
    design: {
      primary: '#5856D6',
      bg: '#FDFBF7',
      fontFamily: 'font-inter',
      templateId: 'zen',
      grain: 0.05
    }
  },
  {
    id: 'yumeship',
    name: 'YumeShip',
    category: 'Entertainment',
    tagline: 'your quiet place for the ones you love from afar',
    platforms: ['ios'],
    description: 'A private creative space for fans to cherish their favourite characters and ships. Write love letters, build headcanons, track dates, and keep everything in a soft, personal vault — all on your device.',
    appStoreUrl: '',
    seo: {
      title: 'YumeShip | Personal Fan Creative Space for Ships & F/Os',
      description: 'A private vault for your favourite characters. Write love letters, build headcanons, track dates, choose templates — all on your device, never shared.',
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
      screenshots: [],
      faqs: [
        { question: 'What is YumeShip?', answer: 'YumeShip is a private creative app for fans — specifically for yumeshippers, fictives, and anyone who loves a character. You can build ship profiles, write love letters, log headcanons, and keep special dates all in one soft, personal space.' },
        { question: 'Is YumeShip private?', answer: 'Yes. Everything you create in YumeShip stays on your device in a local database. There are no accounts, no cloud sync, and no sharing. Your vault is completely private.' },
        { question: 'What is a F/O in YumeShip?', answer: 'F/O stands for Fictive Other — a character you have a personal, loving connection with. YumeShip is built specifically for this kind of relationship, with templates and spaces designed around it.' },
        { question: 'Can I have multiple ships?', answer: 'Yes. Premium users can create unlimited ships. Free users get one ship to start.' },
        { question: 'Is YumeShip free?', answer: 'YumeShip is free to download. Premium unlocks unlimited ships and all visual templates.' },
      ]
    },
    legal: {
      privacyPolicy: `Last updated: May 27, 2025\n\n1. Your data stays on your device\nEverything you create in YumeShip — ships, headcanons, letters, scenes — is stored locally on your device in an on-device database. We cannot see it, access it, or back it up. Deleting the App removes all of it permanently.\n\n2. What we don't collect\nWe do not collect your name, email, or any creative content. We do not use advertising SDKs or sell data to third parties. There is no account system.\n\n3. Subscriptions\nWhen you subscribe, our payment processor (RevenueCat) receives a pseudonymous ID and your purchase receipt to verify your subscription status. No personal details are shared with us. RevenueCat's privacy policy: revenuecat.com/privacy.\n\n4. Notifications\nIf you allow notifications, scheduled reminders are handled entirely on-device through iOS. Nothing is sent to our servers.\n\n5. Deleting your data\nGo to Settings → Delete all data to wipe everything from your device. Since we hold no data on our end, there is nothing further to request from us.\n\n6. Contact\nQuestions? Reach us at: support@yumeship.app`,
      termsOfService: `Last updated: May 27, 2025\n\nLicensed Application EULA\nYumeShip is licensed to you under Apple's standard End User License Agreement (EULA). The EULA applies to your use of this App and is available at: https://www.apple.com/legal/internet-services/itunes/dev/stdeula/\n\nSubscriptions\nYumeShip Premium is an auto-renewable subscription sold through Apple's App Store. Payment is charged to your Apple ID at confirmation of purchase. Subscriptions renew automatically unless cancelled at least 24 hours before the end of the current period. Manage or cancel anytime in your Apple ID Account Settings.\n\nYour Content\nEverything you create in YumeShip — ships, letters, headcanons — stays on your device. We have no access to it. It belongs entirely to you.\n\nContact\nQuestions? Reach us at: support@yumeship.app`,
      support: `We'd love to help.\n\nEmail us at support@yumeship.app and we'll get back to you within 24–48 hours.\n\nCommon questions are also answered in our FAQ on the landing page.`,
      lastUpdated: 'May 27, 2025'
    },
    design: {
      primary: '#9b4f6e',
      bg: '#faf8f5',
      fontFamily: 'font-instrument',
      templateId: 'zen'
    }
  }
];



