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
    name: 'Gut Buddy',
    category: 'Health & Fitness',
    tagline: 'Scan menus for low FODMAP',
    platforms: ['ios'],
    description: 'Find your personal triggers, get safe recipes, and track your digestive health with AI.',
    appStoreUrl: 'https://apps.apple.com/in/app/gut-buddy-food-scanner-ibs/id6755035965',
    seo: {
      title: 'Gut Buddy | Personal Gut Health Coach & FODMAP Scanner',
      description: 'Stop guessing why your stomach hurts. Gut Buddy helps you identify personal IBS triggers and find safe foods at any restaurant.',
      keywords: ['IBS', 'FODMAP', 'Gut Health', 'Food Scanner', 'Low FODMAP Diet', 'Gut Buddy']
    },
    marketing: {
      headline: 'Stop guessing why your stomach hurts.',
      subheadline: 'The AI gut health coach that learns your specific triggers from your own data.',
      problem: 'Living with IBS or chronic bloating often feels like a guessing game. Generic advice tells you what everyone else should avoid, but your gut is unique.',
      agitation: 'Every meal is a risk. You follow Low FODMAP, but you still feel sick. You\'re tired of clinical apps that don\'t feel human or helpful.',
      solution: 'Gut Buddy acts as your personal detective. It correlates your meals with your symptoms to find YOUR specific triggers—whether it\'s garlic, dairy, or stress.',
      benefits: [
        { title: 'Personalized Insights', description: 'Log your meals and symptoms to discover exactly what triggers your discomfort.', icon: 'Zap' },
        { title: 'Smart Scanner', description: 'Instantly check if any food or menu item is safe for your digestive system.', icon: 'Camera' },
        { title: 'AI Diet Coach', description: 'Get suggestions for recipes and alternatives that keep your gut happy.', icon: 'Utensils' }
      ],
      screenshots: [
        '/gutbuddy/gutscore.png',
        '/gutbuddy/scan.png',
        '/gutbuddy/recipe.png'
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
    name: 'Morning Journal',
    category: 'Lifestyle',
    tagline: 'Morning Routine Enforcer & Journal',
    platforms: ['ios'],
    description: 'Block your distracting apps using Screen Time until you complete your morning journal reflection.',
    appStoreUrl: 'https://apps.apple.com/us/app/morning-journal/id0987654321',
    seo: {
      title: 'Morning Journal | App Blocker & Daily Reflection',
      description: 'Start your day with intention. Morning Journal blocks your distracting apps until you complete your morning reflection.',
      keywords: ['Journaling', 'App Blocker', 'Morning Routine', 'Screen Time', 'Mindfulness']
    },
    marketing: {
      headline: 'Reclaim your morning focus.',
      subheadline: 'Morning Journal locks distracting apps until you’ve completed your daily reflection.',
      problem: 'We all know the feeling: waking up and immediately doom-scrolling before even getting out of bed.',
      agitation: 'Starting the day by reacting to notifications and feeds ruins your focus and wastes your most productive hours.',
      solution: 'Morning Journal integrates with Apple Screen Time to block your chosen apps. The only way to unlock them is by completing your morning journal entry.',
      benefits: [
        { title: 'App Blocker', description: 'Locks down distracting apps using Apple Family Controls until your journal is done.', icon: 'Lock' },
        { title: 'Daily Intentions', description: 'Start your day proactively by setting goals in a calm, distraction-free sanctuary.', icon: 'Moon' },
        { title: 'Private & Secure', description: 'Your journal entries are encrypted and stay strictly on your device.', icon: 'ShieldHighlight' }
      ]
    },
    legal: {
      privacyPolicy: 'Data collection:\n- We collect no personal information\n- We do not use third-party analytics\n- We do not track your activity across other apps\n- Journal entries are stored securely using Apple\'s protected local storage\n\nData retention and deletion:\n- Journal data remains on-device unless you delete it\n- You can delete your account and local data from Settings > Account > Delete Account\n\nContact:\n- Email: ashwinnanbazhagan@gmail.com',
      termsOfService: 'Subscription terms:\n- Premium features are offered as auto-renewing subscriptions\n- Payment is charged to your Apple ID account at confirmation\n- Subscription renews automatically unless canceled at least 24 hours before the period ends\n- You can manage or cancel subscriptions in Apple ID Subscriptions settings\n- Restore Purchases is available in the app\n\nUsage:\n- You are responsible for how you configure app blocking selections\n- The app depends on Screen Time authorization and Apple platform behavior\n\nDisclaimer:\n- Service is provided as-is without guarantees of uninterrupted availability\n\nContact:\n- Email: ashwinnanbazhagan@gmail.com',
      support: 'For any issues or questions regarding Morning Journal, please reach out to our support team.\n\nEmail: ashwinnanbazhagan@gmail.com',
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
    tagline: 'AI Interior Design & Shopping',
    platforms: ['ios'],
    description: 'Scan your room and watch AI transform it instantly into a magazine-quality design. Shop the products you love directly from the render.',
    seo: {
      title: 'RoomSnap | AI Interior Design & Room Redesign',
      description: 'Transform your home in seconds with AI. Scan your room, choose a style, and shop furniture instantly.',
      keywords: ['Interior Design', 'AI', 'Room Redesign', 'Home Decor', 'Furniture Shopping', 'RoomSnap']
    },
    marketing: {
      headline: 'Redesign your room in seconds.',
      subheadline: 'Instant AI interior design and furniture shopping at your fingertips.',
      problem: 'Interior design is expensive and overwhelming.',
      agitation: 'You want a fresh look but don\'t know where to start or how to match furniture.',
      solution: 'RoomSnap uses AI to scan your space and render it in stunning new styles, complete with shoppable products.',
      benefits: [
        { title: 'AI Rendering', description: 'See your room transformed in 8+ styles instantly.', icon: 'Zap' },
        { title: 'Smart Shopping', description: 'Shop furniture and decor directly from your new design.', icon: 'ShoppingBag' },
        { title: 'Structural Integrity', description: 'AI preserves your room\'s dimensions and window positions.', icon: 'Maximize' }
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



