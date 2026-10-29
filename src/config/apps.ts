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
  icon: string; // current app icon used by page metadata and app listing schema
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
    webFont?: string; // CSS font stack for the app's guide pages; system UI when absent
    templateId: 'zen' | 'academic' | 'arcade' | 'sanctuary';
    grain?: number;
    mesh?: boolean;
  };
}

export const apps: AppConfig[] = [

  {
    id: 'honestly',
    name: 'Honestly',
    icon: '/honestly.png?v=2', // ?v= makes browsers and search engines fetch the new icon
    appStoreName: 'Honestly: Journal & Reflect',
    category: 'Lifestyle',
    seoApplicationCategory: 'LifestyleApplication',
    tagline: 'Journal & Reflect — Affirmations & Manifest',
    platforms: ['ios'],
    description: 'Honestly is a morning journal that keeps the apps you choose asleep until you have written. A new question waits every morning, each month fills its own book, and 1,510 affirmations bring a kind word into your day. Premium adds app blocking, widgets, 35 page themes and more.',
    appStoreUrl: 'https://apps.apple.com/app/honestly-reflect-manifest/id6759817879',
    // aggregateRating intentionally omitted: only 2 real store ratings as of 2026-07 — re-add once volume is defensible
    pricingNote: 'Free · iOS',
    testimonials: [
      { quote: "It's a really good app—it's attractive and minimalist, with no distractions, which makes it perfect for mornings.", author: 'Ianm34223', detail: 'App Store review' },
      { quote: 'Great way to start my morning', author: 'Jamie1430', detail: 'App Store review' },
    ],
    comparisonHighlights: [
      { them: 'Blank-page apps can leave you wondering where to start.', us: 'A question waiting every morning, and a book that fills as you write.' },
      { them: 'Willpower and timers don\'t hold.', us: 'Yours stay asleep until you\'ve written.' },
      { them: 'Affirmations are easy to forget in the scroll.', us: 'Your chosen topics return on your widgets and reminders.' },
    ],
    downloadUrl: 'https://apps.apple.com/app/honestly-reflect-manifest/id6759817879',
    appNumericId: '6759817879',
    seo: {
      title: 'Honestly: Journal & Reflect — Affirmations & Manifest',
      description: 'Your journal opens before your apps do. Honestly keeps chosen apps asleep until you write, with a daily prompt, a book for every month, mood tracking, 1,510 affirmations and free reminders.',
      keywords: ['Honestly', 'journal', 'reflect', 'affirmations', 'manifest', 'mood tracker', 'app blocker', 'journal prompts', 'morning routine', 'gratitude', 'widgets', 'mental wellness']
    },
    marketing: {
      headline: 'Your journal opens before your apps do.',
      subheadline: 'Honestly keeps the apps you choose asleep until you have written a few honest lines, then sends you into your day with a kind word you can believe.',
      problem: 'You wake up and reach for Instagram, TikTok, or X before you\'ve had a single thought of your own. Before you\'re even out of bed, you\'re already reacting to everyone else\'s morning.',
      agitation: 'Willpower doesn\'t work. Timers don\'t work. There\'s no friction between you and the scroll — so you scroll, and the morning is gone before it started.',
      solution: 'Honestly gives your morning a gentler first step: write before the feeds take over, reflect on what is really going on, then find an affirmation that fits the way you want to feel. Explore 1,510 affirmations, choose the topics that matter to you, and see them on your widgets or in reminders. Premium app blocking helps keep chosen apps closed until you have written.',
      benefits: [
        { title: 'Mood Check-In', description: 'Happy, Confused, Sad, Awful, or Cry — tap what\'s actually true. It colors the rest of your page.', icon: 'Sun' },
        { title: 'Journal Your Way', description: 'Start with a guided prompt or write freely. Make the page yours with photos, doodles, tags and text formatting.', icon: 'PenLine' },
        { title: '1,510 Affirmations', description: 'Find words for what you need today. Choose affirmation topics once, then see those themes across reading, reminders and widgets.', icon: 'Heart' },
        { title: 'App Blocking (Premium)', description: 'Lock Instagram, TikTok and the rest on a schedule with hard Screen Time blocking — no workarounds, no snoozing. Honestly never sees which apps you picked.', icon: 'Lock' },
        { title: 'See Your Patterns', description: 'Notice how your moods shift and look back on the days you have written, all in one private journal.', icon: 'CalendarDays' },
        { title: 'Widgets & Reminders', description: 'Free affirmation reminders at the times you choose, plus Home Screen and Lock Screen widgets with Premium.', icon: 'LayoutGrid' }
      ],
      screenshots: [
        '/honestly/screenshots/01.webp',
        '/honestly/screenshots/02.webp',
        '/honestly/screenshots/03.webp',
        '/honestly/screenshots/04.webp',
        '/honestly/screenshots/05.webp',
        '/honestly/screenshots/06.webp'
      ],
      faqs: [
        { question: 'Is Honestly free?', answer: 'Yes. Journaling with a daily prompt, month books and their covers, mood check-ins, the affirmation library and reminders are all free. Premium adds app blocking, your own prompts and affirmations, 35 page themes, widgets, full history and iCloud backup, as a one-time Lifetime purchase or a yearly or monthly plan.' },
        { question: 'Who can read my journal?', answer: 'Only you. Your pages are stored on your iPhone, there is no account to create, and Honestly has no analytics or advertising trackers. If you choose to back up, the copy goes to your own private iCloud.' },
        { question: 'How does app blocking work?', answer: "With Premium, you pick apps using Apple's Screen Time. Each morning they stay asleep until today's page is written. Apple handles the selection privately, so Honestly never sees which apps you chose.", learnMoreSlug: 'break-social-media-phone-addiction' },
        { question: 'Do reminders cost anything?', answer: 'No. The journal reminder arrives at the time you pick, only on mornings your page is still blank. Affirmation reminders can come up to three times a day, on the days you choose.' },
        { question: 'Does Honestly give me journal prompts?', answer: 'Yes. A new question waits on your page each morning, and you can swap it for another from the prompt library. Writing your own prompts is part of Premium.', learnMoreSlug: 'daily-journal-prompts-app' },
        { question: 'Does Honestly back up my journal?', answer: 'Your pages live on your iPhone. With Premium you can back them up to your own iCloud and restore them on a new phone. Backup is manual, so nothing leaves your phone unless you choose.' },
        { question: 'What languages is Honestly in?', answer: 'English, Arabic, Chinese (Simplified and Traditional), Dutch, French, German, Italian, Japanese, Korean, Portuguese, Russian and Spanish.' },
        { question: 'Does it work on iPad?', answer: 'Yes. Honestly runs on iPhone and iPad with iOS 18 or later.' },
      ]
    },
    legal: {
      privacyPolicy: 'The short version:\nHonestly is built to be private. Your morning pages — your moods, your writing, your affirmations — belong to you. We don\'t sell them, mine them, or read them. There are no third-party trackers or advertising SDKs in this app.\n\nWhat stays on your device:\nEverything you write is stored locally on your iPhone. If you have iCloud enabled, your pages are backed up to your own private iCloud account (Apple\'s CloudKit) so they follow you between devices. We never receive a copy on our servers — your iCloud data is encrypted and accessible only to you.\n\nScreen Time:\nWhen you choose apps to keep asleep each morning, that selection is handled entirely by Apple\'s Screen Time (Family Controls) framework. Honestly is shown opaque tokens — never the names of the apps or websites you picked, and never any record of how you use them. That information never leaves your device and is never visible to us.\n\nPurchases:\nHonestly Premium is offered as a one-time purchase or an auto-renewing monthly subscription, both processed by Apple. We use RevenueCat to verify your purchase and unlock premium features. This involves an anonymous purchase identifier only — no name, email, or contact information is required or collected.\n\nNotifications:\nIf you turn on affirmation reminders, local notifications show affirmations from the topics you selected. They are scheduled on your device and are not sent through a server.\n\nWhat we don\'t do:\nWe do not collect analytics, we do not fingerprint your device, we do not build a profile of you, and we do not share anything with advertisers. There is nothing to opt out of because there is nothing being gathered.\n\nYour control:\nYou can delete every page and reset your history at any time from the You tab (“Delete all data”). Deleting the app removes all local data; disabling iCloud sync for Honestly removes the backup from your iCloud account.\n\nContact:\nQuestions about your privacy? Email ashwinnanbazhagan@gmail.com and a human will answer.',
      termsOfService: 'Welcome:\nThese terms are the agreement between you and Honestly for your use of the app. By using Honestly, you agree to them. We\'ve kept them plain.\n\nYour license:\nWe grant you a personal, non-transferable license to use Honestly on devices you own or control, for your own morning ritual. The app and its design are ours; please don\'t copy, resell, or reverse-engineer it.\n\nHonestly Premium:\nHonestly Premium is offered as a one-time Lifetime purchase (yours for the lifetime of the app on your Apple account) or as an auto-renewing monthly subscription. Purchases are handled and billed by Apple under Apple\'s terms; monthly subscriptions renew automatically unless canceled at least 24 hours before the period ends, and can be managed in your Apple ID Subscription settings. Refunds are managed by Apple through the App Store.\n\nYour content:\nYour pages are yours. You retain all rights to everything you write. We claim no ownership and take no license over your journal entries, moods, or affirmations.\n\nAcceptable use:\nUse Honestly for your own reflection. Don\'t use it to break the law, and don\'t attempt to disrupt, probe, or misuse the app or the Screen Time features it relies on.\n\nScreen Time & blocking:\nHonestly uses Apple\'s Screen Time to help keep chosen apps asleep until your page is written. This is a supportive nudge, not a guarantee — the operating system ultimately controls app availability, and you remain responsible for your own device and choices.\n\nNo warranty:\nHonestly is provided “as is.” We work hard to keep it reliable, but we can\'t promise it will be uninterrupted or error-free, and it is not a substitute for professional mental-health care.\n\nLimitation of liability:\nTo the extent permitted by law, Honestly and its makers are not liable for any indirect or incidental damages arising from your use of the app.\n\nChanges:\nWe may update these terms as the app evolves. If we make material changes, we\'ll note them here with a new effective date. Continued use means you accept the current terms.\n\nContact:\nReach us at ashwinnanbazhagan@gmail.com.',
      support: 'For any issues or questions regarding Honestly, please reach out to our support team.\n\nEmail: ashwinnanbazhagan@gmail.com\n\nWe typically respond within 24-48 hours.',
      lastUpdated: 'July 2026'
    },
    design: {
      primary: '#F5851F',
      bg: '#FAF8F5',
      fontFamily: 'font-manrope',
      webFont: 'Manrope, system-ui, -apple-system, sans-serif',
      templateId: 'sanctuary',
      mesh: false
    }
  },

  {
    id: 'snipsy',
    name: 'Snipsy',
    icon: '/snipsy.png',
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

  {
    id: 'tether',
    name: 'tether',
    icon: '/tether.png',
    appStoreName: 'Long Distance Couples - tether',
    category: 'Social Networking',
    seoApplicationCategory: 'SocialNetworkingApplication',
    tagline: 'Long-distance letters that fly the real miles between you',
    platforms: ['ios'],
    description: 'Write to someone far away in a pen that looks like handwriting, fold it into a paper plane, and throw it. It flies across the real map and lands on their city, where it unfolds in front of them. Private by design: your letters live in your own iCloud, shared only with the person you wrote to.',
    appStoreUrl: 'https://apps.apple.com/app/id6818273186',
    downloadUrl: 'https://apps.apple.com/app/id6818273186',
    appNumericId: '6818273186',
    pricingNote: 'tether+ · iOS',
    comparisonHighlights: [
      { them: 'A text arrives in a second and is gone in a scroll.', us: 'A letter crosses the real miles, and they watch it land.' },
      { them: 'Couple apps want an email, a password, an account.', us: 'No sign-up. Your iCloud is all it needs.' },
      { them: 'Every chat looks like every other chat.', us: 'Your handwriting pen, your ink, your face on every letter.' },
    ],
    seo: {
      title: 'tether | Long Distance Letters — Paper Planes Across the Real Map',
      description: 'tether turns a handwritten note into a paper plane that flies across the real map to the person you miss. Letters, kisses and hugs for long-distance couples, friends and family. Private in your own iCloud.',
      keywords: ['long distance relationship app', 'long distance letters', 'ldr app', 'couples app', 'love letters app', 'paper plane', 'handwritten notes', 'couples widget', 'distance widget', 'miss you app', 'pen pal app', 'friends map']
    },
    marketing: {
      headline: 'Letters that fly the real miles between you.',
      subheadline: 'Write by hand, fold it into a paper plane, and throw it. It crosses the real map and lands in their city.',
      problem: 'When the person you love lives in another city, everything you send arrives the same way: a bubble in a chat, read in a second, buried by the next one. The distance is the biggest thing between you, and nothing you send feels like it crossed it.',
      agitation: 'Texts are instant, so they feel weightless. Calls need you both awake at the same time. And the little moments that would have been a look across the room just never get sent.',
      solution: 'tether makes the distance part of the message. Your note is written in a handwriting pen, folded into a paper plane, and thrown across the real map, every mile of it, until it lands on their city and unfolds in front of them. Between letters, throw a kiss, a hug or a bomb that goes off on their face.',
      benefits: [
        { title: 'Written by hand', description: 'A pen that looks like handwriting, in blue or black ink, with your name and face on every letter.', icon: 'PenLine' },
        { title: 'Folded and thrown', description: 'Pull the letter down and it folds into a paper plane. Flick it, and it\'s on its way.', icon: 'Send' },
        { title: 'Across the real map', description: 'Watch it fly every mile between your city and theirs, then land on their pin and unfold.', icon: 'Map' },
        { title: 'A kiss, a hug, a bomb', description: 'For the moments between letters. It lands on their face, wherever they are.', icon: 'Heart' },
        { title: 'On your Home Screen', description: 'A widget with the two of you on the map and the last thing they sent, with a throw one tap away.', icon: 'LayoutGrid' },
        { title: 'Private by design', description: 'Letters live in your own iCloud, end-to-end encrypted and shared only with the person you wrote to.', icon: 'Lock' },
      ],
      screenshots: [
        '/tether/screenshots/01.webp',
        '/tether/screenshots/02.webp',
        '/tether/screenshots/03.webp',
        '/tether/screenshots/04.webp',
        '/tether/screenshots/05.webp'
      ],
      faqs: [
        { question: 'What is tether?', answer: 'tether is an iPhone app for writing to the people you miss. You write a note in a handwriting pen, fold it into a paper plane, and throw it. It flies across the real map from your city to theirs and unfolds when it lands.' },
        { question: 'Is tether a long-distance relationship app?', answer: 'It was made for exactly that: a partner in another time zone. It works just as well for a best friend who moved away or family on the other side of the world. You can be connected to as many people as you like, and each friendship is private to the two of you.' },
        { question: 'Do we both need tether?', answer: 'Yes. You both need an iPhone signed in to iCloud. Invite them from the app with a link or a QR code, and once they\'ve opened it you\'re on each other\'s map.' },
        { question: 'How much does tether cost?', answer: 'tether+ is available as a monthly or yearly subscription, or a one-time lifetime purchase. Prices are shown in the app in your local currency.' },
        { question: 'Can anyone else read my letters?', answer: 'No. Letters live in your iCloud and theirs, end-to-end encrypted and shared only between the two of you. Your letters never pass through a server of ours, there are no accounts, and the developer can\'t read them.' },
        { question: 'Does tether share my exact location?', answer: 'No. tether only ever places you in a city. Your location is rounded to about 10 km before it\'s stored or shared, and you can type your city instead of sharing location at all.' },
        { question: 'Is there a widget?', answer: 'Yes. The Home Screen widget shows the two of you on the map with the last thing they sent, and you can throw a kiss or a hug straight from it.' },
        { question: 'Is tether on Android?', answer: 'No. tether is made for iPhone, and both of you need one.' },
      ]
    },
    legal: {
      privacyPolicy: `The short version
tether has no accounts and no analytics, and your letters never pass through a server of ours. They travel through your own iCloud account and the iCloud account of the person you send them to. The developer can't read them, and neither can anyone else except the two of you.
Two other things are involved, and neither sees your letters, your name, your photo or where you are: RevenueCat, which checks tether+ purchases, and tether's widget relay, which only wakes widgets (see Your widget).

What tether keeps, and where
Your profile: your name, the photo you choose (if any), your city, and your approximate location.
Your letters: what you wrote, the ink and handwriting you chose, when each one was sent, and when it was opened.
Both live in iCloud, inside the friendship you share with each person, so that person can see them. A copy is kept on your iPhone so the app opens instantly and works offline.
Letters, your name, photo, city and location are end-to-end encrypted with keys held in iCloud Keychain and shared only with the other person in each friendship. The rest (identifiers, dates, which ink and handwriting you used, and whether a letter has been opened) is stored with iCloud's standard protection, which is how iCloud knows where to deliver things.

Who can see what
Only the people you're connected to, and only what's in your friendship with them: your profile and the letters between you. Nobody can join a friendship without an invitation, and each invitation works once, for the first person who opens it, and never again.

Your location
tether asks where you are only while it's open, at most once an hour, and takes a single approximate reading. Before it's stored or shared, it's rounded to a tenth of a degree, about 10 km, so it can place you in a city, never on a street.
To name your city, tether looks the rounded point up with Apple Maps. Location is optional: you can type your city instead, and you can turn location off for tether at any time in Settings.

Speaking a letter
If you speak a letter instead of typing it, your iPhone's speech recognition turns your words into text. Where your iPhone supports it, that happens entirely on the device. Where it doesn't, Apple processes the audio to transcribe it, under Apple's privacy policy. tether never records or keeps audio.

Notifications
If you allow them, tether tells you when a letter has landed. The notification is made on your iPhone and says only who it's from.

Your widget
If you add tether's widget, iOS gives it a push address. tether keeps that address in your profile, encrypted like the rest of it, so the people you're connected to can wake your widget when they throw something at you.
To wake it, their tether sends your widget's push address to tether's relay, a small service the developer runs on Netlify, which asks Apple to refresh your widget. The relay receives that address and whether it belongs to a test build, nothing else: no letter, no name, nothing about either of you. It keeps none of it, though like any web service Netlify may log basic request details, such as an IP address, for a short time. Your widget then fetches what was thrown from iCloud itself.

Buying tether+
tether+ is bought with your Apple Account, and Apple handles the payment; tether never sees your card.
To know whether you have tether+, tether uses RevenueCat. It receives a random identifier made just for this app, what you've bought and when, and basic details such as your country, currency, device model and app version. It doesn't receive your letters, your profile or your location, and it isn't used to advertise to you. RevenueCat's own privacy policy covers what it keeps.

What tether doesn't do
No analytics. No advertising. No tracking across apps or websites. Nothing is sold. The developer has no access to your letters, your profile or anything else you keep in tether; the only thing that ever reaches a service of the developer's is a widget's push address, on its way to Apple.

Apple
iCloud, Apple Maps, notifications and speech recognition are provided by Apple and covered by Apple's own privacy policy.

Deleting your data
Removing someone ends your friendship with them: it disappears for both of you, with every letter in it.
Settings → Delete my data removes everything: friendships you started are deleted for both of you, you leave the ones you joined, and everything on this iPhone is erased. It can't be undone.
Deleting the app removes only the copy on your iPhone; what's in iCloud stays until you use Delete my data, or remove tether's data in your iPhone's iCloud storage settings.

Children
tether isn't meant for children under 13, and doesn't knowingly hold their information.

Changes and contact
If this policy changes, the new version will be here and in the app, with its date at the top. Questions go to the developer at ashwinnanbazhagan@gmail.com.`,
      termsOfService: `Using tether
tether is for sending letters to people who've accepted your invitation. It's for personal use. By using it you agree to these terms; if you don't, please don't use it.

What you write
Your letters are yours, and you're responsible for what you send. tether has no tolerance for objectionable content or abusive users: you agree not to send anything hateful, harassing, threatening, sexually explicit or unlawful, and not to use tether to deceive anyone. The person you write to receives what you send and can keep it for as long as the friendship lasts.
If someone sends you something that breaks these terms, report them, from your conversation with them or from People. Reporting blocks them at once: they're removed with every letter between you, and can't reach you again unless you accept a new invitation from them. Your report goes to the developer, who responds within 24 hours. You can also block someone without reporting them.

tether+
Using tether needs tether+: a yearly subscription, or a one-time purchase where that's offered.
Monthly and yearly subscriptions renew automatically unless you cancel at least 24 hours before the end of the current period. You can manage or cancel them in tether's Settings or your Apple Account subscriptions. The one-time lifetime purchase never renews. Refunds are handled by Apple.
Without tether+, tether opens on the way to get it. Your letters and friendships stay in your iCloud account meanwhile, until you delete them.

iCloud
tether needs an iCloud account and stores everything there, where it counts toward your iCloud storage. Apple's iCloud terms apply to that storage.

Invitations
An invitation is for the one person you send it to. It works once. Please don't pass on invitations meant for someone else.

How it's provided
tether is provided as it is. Delivery depends on iCloud and your connection, so a letter can arrive late, though it won't be lost. Features may change, and tether may one day stop being offered.
To the extent the law allows, the developer isn't liable for indirect or consequential losses arising from using tether. Nothing in these terms limits rights you have that can't be limited by law.

Stopping
You can stop at any time. Settings → Delete my data removes everything tether has kept, as the Privacy Policy describes.

Apple
These terms are in addition to Apple's Licensed Application End User License Agreement (https://www.apple.com/legal/internet-services/itunes/dev/stdeula/), which applies to tether as it does to any app from the App Store. Apple isn't responsible for tether or its content.

Changes and contact
If these terms change, the new version will be here and in the app, with its date at the top. Questions go to the developer at ashwinnanbazhagan@gmail.com.`,
      support: `Write to us
tether is made by one person, who reads every message.
Email: ashwinnanbazhagan@gmail.com
Replies usually come within 24 to 48 hours. Reports of abuse are answered within 24 hours.

Letters aren't arriving
tether delivers through iCloud, so both of you need to be signed in to iCloud on your iPhone (Settings → your name → iCloud). A letter sent while you're offline goes as soon as you're back online. It can arrive late, but it isn't lost.

Notifications don't show up
Check Settings → Notifications → tether, and that a Focus isn't holding them back. tether can only tell you something has landed if notifications are allowed.

Adding the widget
Touch and hold your Home Screen, tap Edit → Add Widget, and choose tether. The widget shows the two of you on the map once you're connected to someone.

Inviting someone
Tap Invite someone, then show them the QR code or send them the link. Each invitation is for one person and works once, so make a new one for each person you invite.

My city is wrong
tether reads your location only while it's open, at most once an hour. You can type your city instead in Settings → Edit profile.

Subscriptions and refunds
Manage or cancel tether+ in tether's Settings under tether+, or in Settings → your name → Subscriptions. On a new iPhone, tap Restore on the tether+ screen and sign in with the same Apple Account. Refunds are handled by Apple at reportaproblem.apple.com.

Reporting or blocking someone
In People, or in your conversation with them, choose Report or Block. Reporting blocks them at once and sends the report to the developer.

Deleting everything
Settings → Delete my data removes everything tether has kept, for you and from the friendships you started. It can't be undone.`,
      lastUpdated: '14 October 2026'
    },
    design: {
      primary: '#1B1F40',
      bg: '#F5F5F9',
      fontFamily: 'font-sans',
      templateId: 'zen'
    }
  },
];



