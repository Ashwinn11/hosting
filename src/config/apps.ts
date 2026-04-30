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
    id: 'gutbuddy',
    name: 'GutBuddy',
    category: 'Health & Fitness',
    tagline: 'Scan Menus & Barcodes for Safe Eating',
    platforms: ['ios'],
    description: 'The AI gut health companion for IBS, Celiac, IBD, and more. Scan restaurant menus and over 3 million grocery products to find safe dishes and ingredients tailored to your specific profile of 100+ conditions, allergies, and diets.',
    appStoreUrl: 'https://apps.apple.com/in/app/gut-buddy-food-scanner-ibs/id6755035965',
    seo: {
      title: 'GutBuddy | AI Menu & Barcode Scanner for IBS',
      description: 'Find safe food anywhere. GutBuddy scans menus and 3M+ products to match your unique profile of 100+ conditions, allergies, and diets.',
      keywords: ['IBS', 'FODMAP', 'Barcode Scanner', 'Menu Scanner', 'Gut Health', 'Food Sensitivity']
    },
    marketing: {
      headline: 'Eat safe. Everywhere.',
      subheadline: 'Scan menus and barcodes to find gut-friendly food tailored to your unique health profile.',
      problem: 'Navigating restaurant menus and grocery aisles with multiple food sensitivities is a constant, stressful challenge.',
      agitation: 'One wrong ingredient can cause days of discomfort. Generic advice isn\'t enough when you have a complex profile of allergies and conditions.',
      solution: 'GutBuddy uses your detailed health profile—covering 100+ conditions and diets—to instantly analyze menus and 3M+ products, ensuring you always find food that\'s safe for you.',
      benefits: [
        { title: 'Menu & Barcode Scanner', description: 'Instantly check restaurant dishes and over 3 million grocery items against your specific needs.', icon: 'Camera' },
        { title: '100+ Health Conditions', description: 'Personalized scanning based on your unique profile of conditions, allergies, and dietary requirements.', icon: 'ShieldCheck' },
        { title: 'AI Recipe Generator', description: 'Create safe, delicious recipes tailored specifically to your gut health needs.', icon: 'Utensils' }
      ],
      screenshots: [
        '/gutbuddy/02.png',
        '/gutbuddy/03.png',
        '/gutbuddy/04.png'
      ]
    },
    legal: {
      privacyPolicy: '1. Information We Collect\nGutBuddy collects information you provide directly: your name, age, gender, and dietary preferences when you create an account.\n\n2. Health Data\nWe collect and process data you log in the app, including meal times, food items, and mood ratings. This data is used solely to provide insights into your gut health.\n\n3. Use of Information\nWe use the information we collect to personalize your experience, provide health insights, and improve our services. We do not sell your personal data.\n\n4. Data Security\nWe take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access.\n\n5. Contact Us\nIf you have any questions about this Privacy Policy, please contact us at ashwinnanbazhagan@gmail.com.',
      termsOfService: 'By using GutBuddy, you agree to the following terms:\n\n1. Medical Disclaimer\nGutBuddy is designed to help you track your meals and mood. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.\n\n2. User Accounts\nYou are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.\n\n3. Acceptable Use\nYou agree not to use the app for any unlawful purpose or in any way that could damage, disable, overburden, or impair the service.\n\n4. Changes to Terms\nWe reserve the right to modify these terms at any time. We will notify you of any significant changes by posting the new terms in the app.\n\n5. Contact Information\nEmail: ashwinnanbazhagan@gmail.com',
      support: 'For any issues or questions regarding GutBuddy, please reach out to our support team.\n\nEmail: ashwinnanbazhagan@gmail.com\n\nWe typically respond within 24-48 hours.',
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
    appStoreUrl: 'https://apps.apple.com/in/app/masterly-ai-quiz-study-app/id67533760295',
    seo: {
      title: 'Masterly AI | Study Discipline & AI App Blocker',
      description: 'The ultimate study discipline app. Lock your distractions and only unlock them once you\'ve mastered your own study material with AI lessons.',
      keywords: ['Study App', 'App Blocker', 'AI Flashcards', 'Discipline', 'Exam Prep', 'Masterly']
    },
    marketing: {
      headline: 'Your distractions cost you more than this.',
      subheadline: 'Masterly locks your social apps until you pass a daily quiz generated from your own study notes.',
      problem: 'Social media is engineered to steal your focus. Even when you try to study, one "quick check" of Instagram turns into an hour of doom-scrolling.',
      agitation: 'Exams are approaching, and your notes remain unread. You lack the discipline to stay off your phone, and existing blockers are too easy to bypass.',
      solution: 'Masterly turns your study material into the only key. Upload your PDF, and Masterly generates a daily lesson. You don\'t get your apps back until you demonstrate mastery.',
      benefits: [
        { title: 'App Blocker', description: 'Integrated with iOS Screen Time to keep you focused until your work is done.', icon: 'Lock' },
        { title: 'AI Tutor', description: 'Generates micro-lessons and quizzes directly from your uploaded syllabus.', icon: 'BookOpen' },
        { title: 'Streak System', description: 'Build a learning habit that\'s harder to break than your focus.', icon: 'Flame' }
      ],
      videoHero: '/masterly_demo.mp4'
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
    id: 'playpulse',
    name: 'PlayPulse',
    category: 'Games',
    tagline: 'Arcade Mini-Games Hub',
    platforms: ['ios', 'android'],
    description: 'Vibrant, high-energy mini-games hub for quick gaming sessions.',
    appStoreUrl: 'https://apps.apple.com/us/app/playpulse/id1234567890',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.playpulse.games',
    seo: {
      title: 'PlayPulse | Vibrant Arcade Mini-Games',
      description: 'A collection of addictive, high-energy mini-games with a Cyber Arcade aesthetic. Perfect for quick sessions and high-score chasing.',
      keywords: ['Arcade Games', 'Mini Games', 'Cyberpunk', 'Gaming Hub', 'PlayPulse']
    },
    marketing: {
      headline: 'Pure energy. Zero friction.',
      subheadline: 'A curated hub of addictive mini-games designed for the modern arcade enthusiast.',
      problem: 'Most mobile games are bloated with ads, long tutorials, and pay-to-win mechanics that kill the fun.',
      agitation: 'You just want a quick game while waiting or commuting, but you spend half the time watching ads or navigating menus.',
      solution: 'PlayPulse is the "Arcade Night" in your pocket. Quick, high-intensity games that start instantly and look stunning.',
      benefits: [
        { title: 'Instant Play', description: 'No tutorials, no fluff. Just pure gameplay from the first tap.', icon: 'Zap' },
        { title: 'Cyber Aesthetic', description: 'High-contrast neon visuals that make every win feel electric.', icon: 'Activity' },
        { title: 'Global Leaderboards', description: 'Compete against the world and pulse your way to the top.', icon: 'Trophy' }
      ],
      screenshots: [
        '/playpulse/flapy.jpeg',
        '/playpulse/score.jpeg'
      ]
    },
    legal: {
      privacyPolicy: '1. Information We Collect\nOur app does not require user accounts or sign-in. We do not collect personal information such as your name, email address, or contact information.\n\n2. Automatically Collected Information\nGame Statistics: We store your game scores, progress, and achievements locally on your device using AsyncStorage. This data never leaves your device.\nAdvertising ID: We collect your device\'s advertising identifier to serve personalized advertisements through Google AdMob.\n\n3. How We Use Your Information\nTo provide and maintain the game functionality. To track your game progress and statistics locally. To display relevant advertisements through Google AdMob.\n\n4. Data Storage and Security\nAll game data is stored locally on your device and is not transmitted to our servers.\n\n5. Contact Us\nIf you have any questions about this Privacy Policy, please contact us at:\nEmail: ashwinnanbazhagan@gmail.com',
      termsOfService: '1. Acceptance of Terms\nBy downloading, installing, or using PlayPulse, you agree to be bound by these Terms of Service. If you do not agree to these Terms, please do not use the App.\n\n2. Description of Service\nPlayPulse is a mobile gaming application that provides access to multiple mini-games. The App is provided free of charge and is supported by advertisements.\n\n3. User Accounts\nThe App does not require user registration or accounts. All game progress and statistics are stored locally on your device.\n\n4. Advertising\nThe App displays advertisements provided by Google AdMob. By using the App, you acknowledge and agree that advertisements are an integral part of the App.\n\n5. Disclaimer of Warranties\nTHE APP IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND.\n\n6. Contact Information\nEmail: ashwinnanbazhagan@gmail.com',
      support: 'For any issues or questions regarding PlayPulse, please reach out to our support team.\n\nEmail: ashwinnanbazhagan@gmail.com',
      lastUpdated: 'January 4, 2026'
    },
    design: {
      primary: '#4ECDC4',
      bg: '#000000',
      fontFamily: 'font-inter',
      templateId: 'arcade',
      mesh: true
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
    id: 'mascotmaker',
    name: 'Mascot Maker',
    category: 'Design',
    tagline: 'Create stunning mascots with AI',
    platforms: ['web'],
    description: 'Transform your idea into mascots, stickers, logos, 8-frame stories, and 3D product meshes.',
    externalUrl: 'https://mascotmaker.io',
    seo: {
      title: 'Mascot Maker | AI Mascot & Character Generator',
      description: 'Create professional mascots, logos, stickers, and product meshes. Custom AI generation with perfect character consistency.',
      keywords: ['Design', 'AI', 'Mascots', 'Logos', 'Stickers', 'Storyboards']
    },
    marketing: {
      headline: 'Create Worlds. Any Style. Zero Limits.',
      subheadline: 'Transform any idea into a professional mascot. From Pixar-grade 3D renders to retro pixel art.',
      problem: 'Creating professional brand mascots or unique character assets usually requires hiring expensive 3D artists or dedicating weeks to illustration studios.',
      agitation: 'Generic AI generators spit out inconsistent blobs that rarely look like true, coherent characters—forcing you to constantly redraw or abandon your vision.',
      solution: 'Mascot Maker gives you a complete Studio Workflow. Generate consistent core mascots, design vector logos, create sticker packs, direct 8-frame stories, or render 3D product meshes—all with the same character DNA.',
      benefits: [
        { title: 'Any Asset Type', description: 'From 2D stickers and logos to 8-frame storyboards and 3D product meshes.', icon: 'ShieldHighlight' },
        { title: 'Identity Preservation', description: 'Maintain complete character consistency across different angles, emotions, and assets.', icon: 'Camera' },
        { title: 'The Studio Workflow', description: 'Specialized engines designed to handle every stage of your creative production.', icon: 'Zap' }
      ]
    },
    legal: {
      privacyPolicy: 'See mascotmaker.io/privacy',
      termsOfService: 'See mascotmaker.io/terms',
      support: 'For any issues or questions regarding Mascot Maker, please reach out to our support team.\n\nEmail: ashwinnanbazhagan@gmail.com',
      lastUpdated: '2026'
    },
    design: {
      primary: '#8B5CF6',
      bg: '#0F172A',
      fontFamily: 'font-inter',
      templateId: 'arcade'
    }
  },
  {
    id: 'roomsnap',
    name: 'RoomSnap',
    category: 'Lifestyle',
    tagline: 'Scan, Design & Shop Furniture',
    platforms: ['ios'],
    description: 'Transform your room instantly with photorealistic 2K redesigns. Upload a photo, pick a style, and watch AI create magazine-quality designs while preserving your room\'s architecture.',
    appStoreUrl: 'https://apps.apple.com/ie/app/roomsnap-ai-interior-design/id6760695323',
    seo: {
      title: 'RoomSnap | AI Interior Design & Room Redesign',
      description: 'Transform your home in seconds with AI. Scan your room, choose a style, and shop furniture instantly.',
      keywords: ['Interior Design', 'AI', 'Room Redesign', 'Home Decor', 'Furniture Shopping', 'RoomSnap']
    },
    marketing: {
      headline: 'Redesign your room in seconds.',
      subheadline: 'Photorealistic AI interior design that preserves your home\'s unique character.',
      problem: 'Interior design is expensive, slow, and hard to visualize.',
      agitation: 'You want a fresh look but can\'t see how new styles will work with your specific layout and furniture.',
      solution: 'RoomSnap uses advanced AI to render your room in stunning new styles in seconds, giving you high-resolution 2K results that respect your room\'s structure.',
      benefits: [
        { title: '2K High-Res AI Rendering', description: 'See your room transformed in seconds with photorealistic quality.', icon: 'Zap' },
        { title: 'Architectural Preservation', description: 'The AI respects your room\'s windows, doors, and structural layout.', icon: 'Maximize' },
        { title: 'Multiple Design Styles', description: 'From Scandinavian to Industrial, explore dozens of professional looks.', icon: 'ShoppingBag' }
      ],
      screenshots: [
        '/roomsnap/01.png',
        '/roomsnap/04.png',
        '/roomsnap/05.png'
      ]
    },
    legal: {
      privacyPolicy: '1. Information We Collect\nRoomSnap collects photos of your rooms to facilitate AI redesigns. We also collect basic account information (name, email) and subscription status.\n\n2. Use of AI\nWe use Google Gemini AI to process your room photos and generate design suggestions. Your photos are used solely for generation and are not used to train global AI models.\n\n3. Subscription Management\nRoomSnap offers Weekly, Monthly, and Yearly subscription plans. The Yearly plan includes a 3-day free trial. Subscriptions are managed through Apple iTunes.\n\n4. Data Security\nWe prioritize your privacy. Your room photos are stored securely and are only accessible via your account.\n\n5. Contact Us\nEmail: ashwinnanbazhagan@gmail.com',
      termsOfService: '1. Standard EULA\nBy using RoomSnap, you agree to the Apple Standard Licensed Application End User License Agreement (EULA): https://www.apple.com/legal/internet-services/itunes/dev/stdeula/\n\n2. Usage Terms\nRoomSnap is intended for interior design inspiration. AI-generated results may vary and are for visualization purposes only.\n\n3. Subscriptions\nPayments will be charged to your iTunes Account. Subscriptions automatically renew unless auto-renew is turned off at least 24 hours before the end of the current period.',
      support: 'For any issues or questions regarding RoomSnap, please reach out to our support team.\n\nEmail: ashwinnanbazhagan@gmail.com\n\nWe typically respond within 24-48 hours.',
      lastUpdated: '30 April 2026'
    },
    design: {
      primary: '#C46F84',
      bg: '#FDFBF7',
      fontFamily: 'font-playfair',
      templateId: 'zen',
      grain: 0.05
    }
  }
];



