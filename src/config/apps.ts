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
    id: 'snipsy',
    name: 'Snipsy',
    category: 'Photo & Video',
    seoApplicationCategory: 'PhotographyApplication',
    tagline: 'Turn your photos into collectible stamps & stickers',
    platforms: ['ios'],
    description: 'Point your camera at anything — Snipsy lifts the subject, die-cuts it, and turns it into a collectible postage stamp or sticker. Choose from 10 hand-crafted paper dressings. Fully offline, no accounts.',
    appStoreUrl: 'https://apps.apple.com/app/keepsake-stickers-snipsy/id6789720772',
    downloadUrl: 'https://apps.apple.com/app/keepsake-stickers-snipsy/id6789720772',
    pricingNote: 'Free · iOS',
    comparisonHighlights: [
      { them: 'Sticker apps give you clip art.', us: 'Your own photos, die-cut by Vision.' },
      { them: 'Photo editors bury the fun in sliders.', us: 'One tap: camera → stamp → collection.' },
      { them: 'Cloud-based apps need accounts.', us: 'Fully offline. Nothing ever leaves your phone.' },
    ],
    seo: {
      title: 'Snipsy | Photo Stamps & Stickers — Die-Cut Camera App',
      description: 'Snipsy turns any photo into a collectible postage stamp or die-cut sticker. 10 hand-crafted paper variants, iMessage stickers, fully offline. Free on iOS.',
      keywords: ['photo stamp app', 'sticker maker', 'die cut sticker', 'photo sticker app', 'collectible stamp', 'postage stamp art', 'camera sticker app', 'imessage sticker maker', 'photo art app', 'stamp collection app']
    },
    marketing: {
      headline: 'Every photo deserves to be kept.',
      subheadline: 'Point your camera. Snipsy lifts the subject, die-cuts it, and dresses it as a collectible stamp or sticker — in one gesture.',
      problem: 'You take a hundred photos a week. They vanish into the camera roll, unsorted and unseen. The coffee, the concert, the little thing that made you smile — all gone in the scroll.',
      agitation: 'Photo editors want you to adjust fifteen sliders. Sticker apps hand you someone else\'s clip art. Nothing turns your actual moment into something you\'d want to keep, hold, and share.',
      solution: 'Snipsy lifts the subject from your photo with on-device Vision, die-cuts it, and dresses it as a collectible postage stamp or bare sticker. Pick from 10 paper variants — tinted, ivory, airmail, foil, night, and more — then drop it in your album or send it in iMessage. One tap, your moment, kept.',
      benefits: [
        { title: 'Die-Cut in a Tap', description: 'Apple Vision lifts the subject from your photo and cuts it out — clean edges, no manual selection, right on your device.', icon: 'Scissors' },
        { title: '10 Stamp Variants', description: 'Tinted, ivory, ink, airmail, commemorative, foil, revenue, botanical, night, sweetheart — each a different paper world for your subject.', icon: 'Stamp' },
        { title: 'Stickers in iMessage', description: 'Every sticker rides in the Messages drawer. Peel and place them in conversations, exactly like Apple\'s built-in stickers.', icon: 'MessageCircle' },
        { title: 'Stamp from Anywhere', description: 'The share extension lets you turn any photo from any app into a stamp — no need to open Snipsy first.', icon: 'Share2' },
        { title: 'Your Album', description: 'Every stamp is numbered and dated. Your album is a growing collection of the moments you chose to keep.', icon: 'BookOpen' },
        { title: 'Fully Offline', description: 'No accounts, no server, no analytics, no network requests. Everything lives on your device and nowhere else.', icon: 'WifiOff' },
      ],
      faqs: [
        { question: 'What is Snipsy?', answer: 'Snipsy is a camera app that turns your photos into collectible postage stamps and die-cut stickers. Point at anything, tap the shutter — Vision lifts the subject, and you choose from 10 hand-crafted paper variants to dress it.' },
        { question: 'How does the die-cut work?', answer: 'Snipsy uses Apple\'s on-device Vision framework to find and lift the subject from your photo. The cut happens entirely on your device — no upload, no cloud processing.' },
        { question: 'What are stamp variants?', answer: 'Each variant is a different paper world for your subject: tinted uses your photo\'s own palette, ivory is an heirloom cameo, airmail is the classic chevron border, foil adds a holographic sheen, night wraps it in neon — 10 in total.' },
        { question: 'Can I use my stamps as iMessage stickers?', answer: 'Yes. Every sticker you make appears in the Snipsy drawer inside Messages. Peel and place them in any conversation.' },
        { question: 'Does Snipsy need an internet connection?', answer: 'No. Snipsy is fully offline — no accounts, no server, no analytics, no network requests. Your stamps live on your device only.' },
        { question: 'Is Snipsy free?', answer: 'Snipsy is free to download. A one-time lifetime purchase unlocks all 10 stamp variants — no subscription, yours forever.' },
        { question: 'Can I stamp photos from other apps?', answer: 'Yes. The share extension lets you select any photo from Photos, Safari, or any app and stamp it directly — Snipsy opens, cuts, and dresses it.' },
      ]
    },
    legal: {
      privacyPolicy: `Effective July 10, 2026\n\nThe short version\nEverything stays on your iPhone. Snipsy has no accounts, no analytics, no ads, no tracking, and no server. We never see your photos — or anything else.\n\n1. Information We Collect\nNone. The app does not collect, transmit, sell, or share any personal information. It makes no network requests.\n\n2. Camera\nSnipsy asks for camera access so you can take photos inside the app. Frames from the camera are processed and displayed on your device only.\n\n3. Photos and Processing\nWhen you capture a photo, Apple's on-device Vision framework finds the subject and the app renders your stamp. The photo, the cut-out subject, and the finished stamp are stored only in the app's private storage on your device. Nothing is uploaded anywhere.\n\n4. Sharing and Stickers\nSharing a stamp or sticker uses the standard iOS share sheet; what happens after you share is controlled by you and the app you share to. Stickers you keep are also made available to Snipsy's Messages sticker extension, stored in the app's private shared container on this device only.\n\n5. Deleting Your Data\nDelete individual stamps from their detail view, or use Settings → Delete All Data to permanently erase every stamp and photo the app has stored. Deleting the app from your device removes everything as well. Deletion is immediate and irreversible.\n\n6. Children\nSnipsy does not collect data from anyone, including children.\n\n7. Changes\nIf this policy ever changes — for example, if a future version adds an online feature — the updated policy will appear here with a new effective date before any such feature is enabled.\n\n8. Contact\nPrivacy questions: ashwinnanbazhagan@gmail.com`,
      termsOfService: `Effective July 10, 2026\n\n1. Agreement\nBy downloading or using Snipsy ("the app"), you agree to these Terms of Service. If you do not agree, please do not use the app.\n\n2. What Snipsy Is\nSnipsy turns photos you take into collectible stamp artworks that live in an album on your device. The app works entirely offline; it has no accounts, no server, and no social features.\n\n3. License\nYou are granted a personal, non-transferable, non-exclusive license to use the app on Apple devices you own or control, subject to Apple's standard App Store terms (the Licensed Application End User License Agreement).\n\n4. Your Content\nPhotos you capture and the stamps made from them are yours. They are stored only on your device. You are solely responsible for the content you capture and for anything you choose to share out of the app using the system share sheet. Do not use the app to capture or share content that is unlawful or that infringes the rights of others.\n\n5. Our Content\nThe app's design, artwork, typography treatments, animations, and code are the property of the developer and are protected by applicable intellectual-property laws. The stamps you create from your own photos are yours.\n\n6. Acceptable Use\nYou agree not to reverse engineer, resell, or redistribute the app, and not to use it in violation of any applicable law.\n\n7. No Warranty\nThe app is provided "as is" and "as available," without warranties of any kind, express or implied, including fitness for a particular purpose and non-infringement. Subject-detection quality depends on your device and the photo; results may vary.\n\n8. Limitation of Liability\nTo the maximum extent permitted by law, the developer shall not be liable for any indirect, incidental, special, or consequential damages, or for loss of data — including deleted stamps — arising from your use of the app. Deleting the app or using Delete All Data permanently removes your collection; the developer cannot recover it.\n\n9. Changes\nThese terms may be updated from time to time. Material changes will be reflected in the app with an updated effective date. Continued use after a change means you accept the updated terms.\n\n10. Contact\nQuestions about these terms: ashwinnanbazhagan@gmail.com`,
      support: `For any issues or questions regarding Snipsy, please reach out.\n\nEmail: ashwinnanbazhagan@gmail.com\n\nWe typically respond within 24–48 hours.\n\nCommon questions:\n• Stamps not saving — make sure Snipsy has camera access in iPhone Settings → Privacy → Camera\n• Stickers not in Messages — check that the Snipsy sticker extension is enabled in Messages → Apps\n• Delete everything — go to Settings → Delete All Data in the app`,
      lastUpdated: 'July 10, 2026'
    },
    design: {
      primary: '#D6503A',
      bg: '#F8F2E3',
      fontFamily: 'font-rounded',
      templateId: 'zen',
      grain: 0.04
    }
  },
];



