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
  datePublished?: string;
}

// Resolve a landing-FAQ `learnMoreSlug` to its page (supplies guide-vs-compare
// for the URL). Returns undefined for slugs that don't exist yet, so links can
// be authored ahead of their pages and render only once the page ships.
export const findPseoPage = (appId: string, slug: string) =>
  pseoPages.find(p => p.appId === appId && p.slug === slug);

export const pseoPages: PSEOPage[] = [
  
  
  {
    appId: 'honestly',
    slug: 'vs-day-one',
    type: 'compare',
    title: 'Honestly vs Day One — Best Morning Journal App for iPhone 2026',
    h1: 'Honestly vs Day One: Which Morning Journal App Is Right for You?',
    metaDescription: 'Weighing Day One alternatives for iPhone? Honestly pairs a mood-to-manifest morning ritual with scheduled app blocking. Compare features, privacy, and pricing.',
    targetKeyword: 'day one alternatives iphone',
    intro: 'Day One and Honestly - Reflect & Manifest are both iPhone journaling apps, but they solve different problems. Day One is a deep long-form journal — a diary, memory keeper, and photo archive you\'ll build for years. Honestly is a short morning ritual: check your mood, write freely, then note what you\'re grateful for and what you want to manifest. It\'s designed to clear your head before the feed does. If you\'re scanning Day One alternatives on iPhone because you want a routine you\'ll actually keep — not a bigger blank canvas — the difference matters. Day One gives you room to write everything. Honestly gives you a repeatable sequence, a streak plant that grows as you show up, and optional app blocking that keeps you off the apps you\'re trying to avoid until your morning is done. Here\'s an honest, side-by-side look at where each one wins.',
    sections: [
      {
        heading: 'Journaling Approach',
        body: 'Day One is the strongest long-form journal on iPhone, full stop. You get a near-infinite canvas: attach photos, log location and weather, tag entries, use templates and daily prompts, and search years of history instantly. If your goal is a rich, searchable life archive, Day One is hard to beat. Honestly takes the opposite bet. Instead of an open canvas, it runs a fixed sequence — mood check, a free-write, then gratitude and a line of what you want to manifest. There\'s still a genuinely blank page for the writing step, plus optional reflection and shadow-work prompts when you want to go deeper. The structure is the point: you\'re building a consistent under-three-minute ritual, not composing a memoir. Pick Day One for depth and permanence. Pick Honestly for a routine that survives busy mornings.',
      },
      {
        heading: 'App Blocking',
        body: 'Day One has no app-blocking features — and it isn\'t trying to. Honestly Premium adds hard Screen Time blocking that locks apps like Instagram and TikTok on a schedule, with no snoozing and no easy workarounds. This is the biggest practical gap between the two. If you reach for your phone and open a feed before you\'re even out of bed, no journal — however elegant — will change that on its own, because the friction is missing. Honestly can supply it: set the schedule, and your chosen apps stay locked so your ritual comes first. Note that blocking is a Premium feature, not part of the free core, and it runs on your schedule rather than switching on automatically. If accountability is the whole reason you\'re leaving Day One, this is the deciding factor.',
      },
      {
        heading: 'Affirmations and Lock Screen',
        body: 'Day One\'s widgets are mainly static reminders and on-this-day recall — useful nudges to open the app. Honestly leans into affirmations you write in your own words, then echoes them back where you\'ll actually see them, including a Lock Screen affirmation widget. Instead of a stock quote from a database, it\'s your own intention resurfacing throughout the day. For a morning practice, that small loop matters: the thing you set at 7 a.m. keeps showing up, quietly reinforcing the habit every time you glance at your phone. Day One is better if you want photo memories surfaced from years past. Honestly is better if you want today\'s intention kept in front of you.',
      },
      {
        heading: 'Streaks and the Sprout',
        body: 'Day One tracks streaks and shows a calendar of your entries — solid, if understated. Honestly makes consistency the visible reward. Your streak grows a Sprout: a plant that advances through four stages the more mornings you show up, so progress feels tangible rather than numeric. Current streak and mood tracking are free forever. Journal history and the full mood calendar — including the mood-distribution view — are Premium as of the latest version, so if long-term look-back matters to you, factor that into the price comparison. Day One puts almost everything behind its own subscription too, so neither is fully free once you want depth. The difference is motivational design: Honestly is built to make you want tomorrow\'s entry, not just to store yesterday\'s.',
      },
      {
        heading: 'Sync, Privacy, and Pricing',
        body: 'Both apps sync through iCloud. Day One goes further with its own end-to-end encrypted sync across its servers, plus mature cross-platform apps if you journal on multiple devices — a real advantage if you want your archive everywhere. Honestly keeps journal data on-device by default, with iCloud sync and backup available on Premium, so your entries stay within Apple\'s ecosystem rather than a third party\'s. On price, Day One is subscription-based. Honestly offers a free core (mood, free-write, gratitude, streak) plus Premium as either a monthly plan or a one-time Lifetime purchase — worth weighing if you\'d rather pay once than subscribe forever. It\'s also available in 11 languages. Choose Day One for a battle-tested, cross-platform archive; choose Honestly for a local-first ritual with a one-and-done payment option.',
      },
    ],
    comparisonTable: [
      { feature: 'Structured morning ritual', app: 'Yes (mood → write → manifest)', competitor: 'No (free-form canvas)' },
      { feature: 'App blocking', app: 'Yes (Premium, scheduled)', competitor: 'No' },
      { feature: 'Lock Screen affirmation widget', app: 'Yes (your own words)', competitor: 'Reminder widgets only' },
      { feature: 'Long-form journaling & photos', app: 'Basic', competitor: 'Yes (primary strength)' },
      { feature: 'Streak growth (Sprout plant)', app: 'Yes (four stages)', competitor: 'Streak count only' },
      { feature: 'Full history & calendar', app: 'Premium', competitor: 'Included in plan' },
      { feature: 'iCloud sync', app: 'Yes (Premium)', competitor: 'Yes (plus E2E cross-platform)' },
      { feature: 'Pricing', app: 'Free core; monthly or one-time Lifetime', competitor: 'Subscription' },
    ],
    faqs: [
      { question: 'Is Honestly a good Day One alternative?', answer: 'It depends on what you want. Honestly - Reflect & Manifest is a strong Day One alternative if your goal is a short, repeatable morning ritual — mood check, free-write, then gratitude and manifest — with scheduled app blocking and a Lock Screen affirmation widget. If you want a deep long-form archive with photos and cross-platform sync, Day One is still the better tool.' },
      { question: 'What morning journal app blocks social media on iPhone?', answer: 'Honestly Premium uses iOS Screen Time to lock apps like Instagram and TikTok on a schedule, with no snoozing, so your morning ritual comes first. Day One has no app-blocking features. Note that blocking on Honestly is a Premium feature rather than part of the free tier.' },
      { question: 'Which is better for a morning routine — Day One or Honestly?', answer: 'Choose Day One if you want an open, long-form journal and a searchable life archive. Choose Honestly if you want a structured under-three-minute ritual, a streak that grows a Sprout plant, and app blocking to keep you off feeds until you\'ve written. Honestly is the more habit-focused of the two.' },
      { question: 'Is Honestly free, and what costs extra?', answer: 'Honestly\'s core is free forever: mood tracking, free-writing, gratitude and manifest, and your current streak. Premium adds scheduled app blocking, iCloud sync and backup, and full journal history and calendar. You can pay monthly or make a one-time Lifetime purchase instead of subscribing.' },
    ],
    cta: 'Start Your Morning Ritual',
    datePublished: '2025-10-24',
  },
  
  {
    appId: 'honestly',
    slug: 'morning-journaling-routine-habits',
    type: 'guide',
    title: 'Best Morning Journaling Routine for Your Mental Health | Honestly',
    h1: 'How to Build a Morning Journaling Routine That Sticks',
    metaDescription: 'Build a morning journaling routine that sticks: a simple mood check, free write, and gratitude-and-manifest ritual to start the day clear, not scrolling.',
    targetKeyword: 'morning journaling routine',
    intro: 'A morning journaling practice can steady your whole day, but starting one feels heavier than it should. Five pages? Bullet points? How long is enough? The truth is that a routine only sticks when it is small enough to repeat and clear enough to finish. The most reliable morning ritual has three light steps: check your mood, write freely for a few minutes, then name a little gratitude and set an intention. That is the whole thing, and it can take under five minutes. This guide covers why morning journaling works, how to build it into a habit you actually keep, and how Honestly structures the same ritual so you never have to design it yourself.',
    sections: [
      {
        heading: 'Why Morning Journaling Works',
        body: 'Journaling right after you wake puts you in charge of your day before notifications, email, and everyone else\'s priorities take over. When you empty your head onto a page first, you notice what you are actually feeling instead of reacting to the first thing that pings you. You do not need an hour or a leather notebook for this. A few honest sentences about how you feel and what matters today is enough to shift your attention from scrolling to intention. The point is not to produce good writing. It is to give yourself a quiet moment of clarity that the rest of the day rarely offers, and to start from a place you chose rather than one handed to you by a feed.',
      },
      {
        heading: 'How the Habit Actually Forms',
        body: 'Forget chasing a magic number of days. Habits take hold when you make them easy to start and hard to forget, not when you hit some deadline. The most dependable trick is anchoring: attach journaling to something you already do without thinking, like your first coffee or right after you silence your alarm. Keep the bar embarrassingly low so that on tired mornings you still show up, even for one line. Consistency beats intensity every time; five quiet minutes daily will outlast one heroic hour you never repeat. In Honestly, a small Sprout plant grows through four stages as your streak builds, giving the habit a visible reason to keep going on the mornings motivation runs thin.',
      },
      {
        heading: 'What to Write About Each Morning',
        body: 'Blank-page dread ends most routines, so structure the start without over-scripting it. Begin with your mood, so you are never staring at nothing, then free-write whatever is actually there, even if it is messy or one sentence long. Finish by naming something you are grateful for and setting an intention for the day. That last step matters more than it looks: naming what you want in plain words is how reflection turns into manifestation, because you cannot move toward a day you never bothered to picture. If a blank page still feels like too much, Honestly offers optional reflection and shadow-work prompts to go deeper on the mornings you want them, and stays out of the way on the mornings you do not.',
      },
      {
        heading: 'Protecting the Ritual From Your Phone',
        body: 'The biggest threat to a morning routine is the phone sitting next to your bed. One reflex tap and you are in someone else\'s feed before you have had a single thought of your own. If willpower alone were enough, you would already be journaling. Honestly\'s Premium app blocking lets you lock the apps that hijack your mornings on a schedule, with hard Screen Time blocking and no easy snoozing or workarounds. That means the window you set aside for yourself is actually protected, so the ritual happens before the noise instead of losing to it. It is optional, but it turns a good intention into a boundary your phone respects.',
      },
      {
        heading: 'Making It Stick',
        body: 'Start smaller than feels serious. Aim for a few honest lines, not a perfect entry, because perfection is what makes people quit by day four. Do it at the same trigger every morning so you stop deciding whether to, and let your streak carry you on low days. Track your mood over a few weeks and you will start seeing patterns you could never feel in the moment. And if you miss a morning, just resume the next one; one gap does not erase the habit, but restarting immediately keeps the momentum alive. The goal was never a flawless record. It was starting each day a little more honestly than the last.',
      },
    ],
    faqs: [
      { question: 'How long should a morning journal entry be?', answer: 'A few minutes is plenty. Journaling works best when it is brief and consistent rather than long and sporadic. A handful of sentences covering your mood, whatever is on your mind, and one intention for the day is enough to feel the benefit and keep the habit repeatable.' },
      { question: 'What should I journal about each morning?', answer: 'Start with your mood so you are not facing a blank page, then free-write whatever is actually there. Finish by naming one thing you are grateful for and setting an intention for the day. Mood, free write, gratitude and manifest — that is the whole ritual, and Honestly walks you through it in that order.' },
      { question: 'Can journaling really change your day?', answer: 'Yes. Starting with reflection and a clear intention primes you to notice opportunities and handle stress better, instead of running on autopilot from the first notification. Consistency matters far more than depth — a short honest entry every morning beats a long one now and then.' },
      { question: 'When is the best time to journal?', answer: 'Right after waking, before you check your phone or email. A clear mind gives you the most honest writing, and doing it first means the ritual happens before the day\'s demands pile up and crowd it out.' },
      { question: 'What if I miss a day?', answer: 'Just resume the next morning. The goal is consistency, not a perfect record. One missed day will not undo the habit, but restarting immediately keeps your momentum — and your streak — alive.' },
    ],
    cta: 'Start Your Morning Routine Free',
    datePublished: '2025-11-08',
  },
  {
    appId: 'honestly',
    slug: 'best-journaling-apps-2026',
    type: 'guide',
    title: 'Best Journaling Apps for iPhone 2026 — Honest, Private, Effective',
    h1: 'Best Journaling Apps for iPhone in 2026',
    metaDescription: 'Compare top journaling apps for iPhone. Find the best app for daily reflections, mood tracking, and building a sustainable journaling habit.',
    targetKeyword: 'best journaling apps for iphone',
    intro: 'Journaling has never been easier — or more confusing. The App Store is full of beautiful, feature-rich journaling apps. But most add friction instead of flow: prompts feel generic, syncing is clunky, and after two weeks you stop opening the app. The best journaling app is the one you actually use. This guide breaks down what makes a journaling app stick and which apps deliver.',
    sections: [
      {
        heading: 'What Makes a Journaling App Effective',
        body: 'The best journaling apps have three things: low friction (quick to open and use), smart prompts (questions that feel personal, not generic), and accountability (something that reminds you to journal or celebrates your streak). Encryption and privacy matter too — your journal is deeply personal.',
      },
      {
        heading: 'Habit-Focused vs Archival Apps',
        body: 'Apps like Day One focus purely on journaling as archival — a diary, a memory keeper, a photo journal. Honestly integrates journaling with app blocking — with Premium, the journal unlocks your apps. This dual purpose makes Honestly different. Some users want pure journaling; others want journaling with built-in accountability.',
      },
      {
        heading: 'Free vs Paid Journaling Apps',
        body: 'Most good journaling apps require a subscription for offline sync, custom prompts, or cloud backup. Honestly is free with core journaling included. Your choice depends on whether you value encryption, community features, or cross-device sync.',
      },
      {
        heading: 'Syncing, Privacy, and Data Ownership',
        body: 'Your journal entries are personal data. Some apps encrypt locally; others sync to the cloud. Choose based on your comfort with privacy. Honestly stores entries locally by default, with optional iCloud sync.',
      },
      {
        heading: 'Building Your Journaling Habit',
        body: 'The app is just a tool — the real work is showing up. Start small (five minutes). Use prompts. Track your streak. Share your commitment. The best app is the one that removes friction and celebrates consistency.',
      },
    ],
    faqs: [
      { question: 'What is the best app for daily journaling?', answer: 'The best journaling app is one you\'ll use daily. Honestly works because the ritual is quick (under 3 minutes), the page is genuinely blank with no prompts to overthink, and Premium locks your apps until you finish — built-in accountability.' },
      { question: 'Are journaling apps good for mental health?', answer: 'Yes. Daily reflection reduces anxiety and improves emotional awareness. The app just needs to get out of your way and help you establish the habit.' },
      { question: 'Should I use a journaling app or pen and paper?', answer: 'Both work. Digital journaling is convenient and syncs across devices. Paper is more tactile. Choose whatever you\'ll actually do consistently.' },
      { question: 'Which journaling app has the best privacy?', answer: 'Most good journaling apps (Day One, Honestly, Penzu) use encryption. Check whether they encrypt locally or in the cloud. Honestly encrypts locally by default.' },
      { question: 'Is there a free journaling app worth using?', answer: 'Yes. Honestly is free with the core ritual — mood check-in, a free-write page, and your first affirmation — included. Premium adds the app-blocking gate, full history, and iCloud sync.' },
    ],
    cta: 'Journal Free on iPhone',
    datePublished: '2025-11-10',
  },
  
  {
    appId: 'honestly',
    slug: 'morning-routine-build-habit',
    type: 'guide',
    title: 'Build a Morning Routine That Sticks: Morning Ritual + Accountability',
    h1: 'Build an Unbreakable Morning Routine — 5 Minutes That Change Everything',
    metaDescription: 'Create a morning routine that lasts. Honestly blocks apps until you complete your ritual, making consistency automatic.',
    targetKeyword: 'build morning routine habit',
    intro: 'You know a morning routine changes your day. But you can\'t stick to it. You wake up, open Instagram, and it\'s gone. Honestly Premium locks your apps until you finish your ritual. Consistency becomes automatic.',
    sections: [
      {
        heading: 'Why Most Morning Routines Fail',
        body: 'Intention fails without friction. Your phone is right there. The urge to check it is stronger than your commitment to your ritual. You need a system that makes the ritual harder to skip than the apps are to access.',
      },
      {
        heading: 'The Under-3-Minute Ritual That Actually Works',
        body: 'Mood check → a genuinely blank page, no prompt → a few affirmations to yourself → done. That\'s it. No hour-long journaling. No cold plunges. Just a few minutes of intention-setting while your apps stay asleep. The simplicity is why it works.',
      },
      {
        heading: 'App Blocking Makes It Automatic',
        body: 'With Premium, you can\'t check your phone until the ritual is done. Not "shouldn\'t." Can\'t. This removes the decision from the equation. After weeks of blocked apps forcing the ritual, it becomes automatic.',
      },
    ],
    faqs: [
      { question: 'How long does it take to form a morning routine habit?', answer: 'Research shows 21-66 days depending on the person. Honestly Premium\'s app blocking cuts this down by removing the friction that kills habits.' },
      { question: 'What if I\'m not a "journaling person"?', answer: 'Honestly isn\'t a journal in the traditional sense — it\'s a mood check-in, a genuinely blank page with no prompt to overthink, and a couple of affirmations to yourself. You\'re not writing an essay; you\'re reflecting. It takes a few minutes.' },
      { question: 'Can I customize the ritual?', answer: 'The structure stays the same every morning — mood, a free-write, affirmations — deliberately. Consistency matters more than customization; the page itself is always genuinely blank, so what you write is entirely up to you.' },
    ],
    cta: 'Lock In Your Morning Routine',
    datePublished: '2026-06-13',
  },
  {
    appId: 'yumeship',
    slug: 'private-fan-space-shipping',
    type: 'guide',
    title: 'A Private Fan Space for Shipping — No Feed, No Judgment',
    h1: 'A Private Fan Space for Shipping — Yours and No One Else\'s',
    metaDescription: 'Shippers need a private fan space — judgment-free, algorithm-free, permanent. Here\'s what belongs in yours, and how YumeShip keeps it all on your device.',
    targetKeyword: 'private fan space for shipping',
    intro: 'Shipping in public comes with a cost. Post about a ship on the timeline and you invite discourse; keep it in a notes app and it reads like a grocery list. What most shippers actually want is a third option: a private fan space — somewhere judgment-free, algorithm-free, and permanent, where your ships exist the way you see them, not the way a feed reacts to them. Building one is simpler than it sounds. At its core it\'s a dedicated home for ship profiles, love letters, headcanons, important dates, and albums — everything that makes a ship feel real to you, gathered where only you can see it. This guide covers why that space matters, what belongs in it, and how YumeShip turns it into a soft, fully on-device home that no platform can touch.',
    sections: [
      {
        heading: 'Judgment-Free: Ship Without an Audience',
        body: 'Every public fan space has an audience, and audiences have opinions. Rarepairs get mocked, sincere posts get screenshotted as "cringe," and ship wars turn something you love into something you defend. Even friendly spaces impose a quiet pressure: you write for readers, not for yourself. A private space removes the audience entirely. With no one watching, you can be as soft, sincere, or self-indulgent as you actually feel — write the love letter you\'d never post, keep the headcanon that contradicts fanon, ship the pairing nobody else gets. The point of shipping was never the discourse. It was the feeling. A judgment-free space gives you the feeling back, undiluted, without a single thought about how it would land on a timeline.',
      },
      {
        heading: 'Algorithm-Free and Permanent',
        body: 'Public platforms own your fan content in every way that matters. An algorithm decides whether anyone — including future you — ever sees it again. Rules change, content gets purged, sites pivot or shut down, and years of posts vanish with them. Fandom history is full of archives that lived on someone else\'s servers until, one day, they didn\'t. A private fan space breaks that dependency. Nothing is ranked, recommended, or buried; your first entry sits next to your latest, in order, always findable. And because it doesn\'t live on a platform, no policy update or shutdown can take it from you. Your ships deserve an archive with the shelf life of your devotion — not the shelf life of a website.',
      },
      {
        heading: 'What Belongs in a Private Ship Space',
        body: 'A good private space holds more than stray thoughts. Start with a ship profile: who\'s involved, the dynamic, the details that define them for you. Add love letters — written to a character or between them — and headcanons as they occur to you, before they evaporate. Keep what-if scenarios, the alternate timelines and unwritten scenes you replay in your head. Track dates that matter: anniversaries, first meetings, the day the ship clicked for you. And build albums — the images and moments that capture the ship\'s whole vibe in one place. Scattered across a camera roll and three notes apps, these fragments stay fragments. Collected in one dedicated space, they become something closer to a world.',
      },
      {
        heading: 'How YumeShip Becomes That Space',
        body: 'YumeShip is built as exactly this kind of private fan space. Each ship gets its own home, with templates shaped around how you actually ship: getting to know your F/O, exploring what-ifs, writing love letters, tracking dates and memories, and keeping albums and self-inserts. Whether your ship comes from anime, otome, manga, or k-pop — waifu, husbando, or a whole polycule — there\'s a template that fits. And the privacy is structural, not a setting you have to trust: everything stays on your device. No account, no cloud, no social feed, no share button. Nothing leaves your phone, which means no audience, no algorithm, and no platform that can one day decide your ships violate a policy.',
      },
      {
        heading: 'More Than a Journal: Play With Your Ships',
        body: 'A private space shouldn\'t feel like homework, and YumeShip doesn\'t stop at writing tools. Scenario prompts give you somewhere to start when the blank page stalls you. The incorrect quotes generator stars your F/O in scene-by-scene nonsense that\'s yours alone to laugh at. Ship charts map relationship dynamics — including poly dynamics — and polycule bingo turns your ships into a checkable game. There\'s even a private message thread where your F/O sends you messages, and optional F/O notifications that surface small check-ins from them during your day. Because it\'s all on-device, the playful stuff stays as private as the heartfelt stuff — you get the fun of fandom tools without the exposure of fandom platforms.',
      },
    ],
    faqs: [
      { question: 'Why keep shipping private instead of posting it?', answer: 'Posting invites judgment and hands your archive to an algorithm that can bury or delete it. A private space lets you be fully sincere and keeps everything permanently findable — you can always share individual pieces later if you choose.' },
      { question: 'What should I put in a private ship space?', answer: 'Ship profiles, love letters, headcanons, what-if scenarios, important dates, and albums. YumeShip has templates for each, so every ship gets a structured home instead of scattered notes.' },
      { question: 'Is YumeShip actually private?', answer: 'Yes, by design. Everything stays on your device — no account, no cloud, no social feed, no sharing. There is no server where your ships could be seen, leaked, or moderated.' },
      { question: 'Does it work for any kind of ship?', answer: 'Yes. Anime, otome, manga, and k-pop ships are all supported — waifu, husbando, self-inserts, and poly dynamics included, with ship charts and templates that fit the dynamic.' },
      { question: 'How many ships can I keep in YumeShip?', answer: 'Free users start with one ship. Premium unlocks unlimited ships and all templates, so every pairing and polycule gets its own space.' },
    ],
    cta: 'Build Your Private Ship Space',
    datePublished: '2026-06-13',
  },
  
  {
    appId: 'honestly',
    slug: 'break-social-media-phone-addiction',
    type: 'guide',
    title: 'How to Stop Doomscrolling in the Morning (For Good)',
    h1: 'How to Stop Doomscrolling in the Morning — What Actually Works',
    metaDescription: 'How to stop doomscrolling in the morning: simple steps that break the first-scroll habit, plus a calm ritual and scheduled app blocking to make it stick.',
    targetKeyword: 'how to stop doomscrolling in the morning',
    intro: 'You reach for your phone before you\'re even fully awake, and forty minutes vanish into a feed you won\'t remember by lunch. Morning doomscrolling feels automatic because it mostly is — your brain is groggy, your willpower is at its lowest, and the apps are engineered to fill exactly that gap. The good news: you don\'t need more discipline. You need to change the conditions so the first scroll never happens. That means putting friction between waking and your feeds, giving your hands something slower to do, and, ideally, removing the choice entirely for the first few minutes of the day. Below are the steps that actually work — from free tweaks you can make tonight to the one change that makes relapse nearly impossible. Honestly, the journaling app, is built around that last step, but start with the fundamentals first.',
    sections: [
      {
        heading: 'Why Mornings Are Doomscrolling\'s Perfect Storm',
        body: 'Right after sleep, your prefrontal cortex — the part that says "not now" — is still booting up, while the dopamine system that craves novelty is wide awake. That\'s why a habit you\'d resist at 3 PM wins effortlessly at 7 AM. On top of that, the first thing you look at frames your baseline: open a feed of outrage and comparison, and everything calmer feels flat for hours. Doomscrolling in bed isn\'t a character flaw; it\'s the predictable result of putting an infinite feed within arm\'s reach of a half-asleep brain. Understanding this matters, because it tells you the fix isn\'t "try harder." It\'s to change what\'s reachable and what\'s easy in those first vulnerable minutes — before your judgment is online to defend you.',
      },
      {
        heading: 'Move the Phone Out of Arm\'s Reach',
        body: 'The single most effective free change is distance. Charge your phone across the room, or in another room entirely, and buy a cheap alarm clock so "but it\'s my alarm" stops being an excuse. When the phone isn\'t on your nightstand, waking up no longer means unlocking it — you have to stand up, cross the floor, and by then a sliver of conscious choice has returned. Stack a second cue on top: leave a glass of water or a book where the phone used to be, so your hand lands on something else. None of this requires willpower in the moment; it just moves the default. You can set it up in five minutes tonight and feel the difference tomorrow.',
      },
      {
        heading: 'Give the First Ten Minutes to Something Slower',
        body: 'Removing a habit leaves a gap, and gaps get refilled fast — usually by the same feed. So replace the scroll instead of just resisting it. A short, low-stimulation routine works because it gives your hands and attention somewhere to land while your brain warms up. Honestly is built around exactly this: a quick mood check, a few minutes of free writing to empty your head before the world fills it, and a gratitude-and-manifest step to point the day somewhere you chose. Optional reflection and shadow-work prompts are there on mornings you want to go deeper. It takes a few minutes, asks nothing of your groggy self except honesty, and leaves you calmer than any feed would. The point isn\'t productivity — it\'s starting the day on your terms.',
      },
      {
        heading: 'Make the First Scroll Impossible',
        body: 'Distance and a ritual help, but on a rough morning you\'ll still find the phone and open the app anyway. To close that gap, remove the choice. Honestly Premium locks the apps you pick — Instagram, TikTok, X, whatever pulls you — on a schedule you set, using hard iOS Screen Time blocking. During your morning window, tapping the icon simply doesn\'t open the feed: no workarounds, no snoozing, no "just five minutes." Calls, texts, and maps keep working, so you\'re not cut off from anything that matters. Because it\'s scheduled and enforced at the system level rather than relying on you to behave, it holds up precisely when your willpower doesn\'t. Once your window ends, everything unlocks and you use your apps normally. You\'re not banning them — you\'re protecting the stretch of the day doomscrolling does the most damage.',
      },
      {
        heading: 'Let the Streak Carry You Past Week Two',
        body: 'The first week of any change is the hardest, and doomscrolling has weeks of momentum behind it. What gets you past the dip is a slower reward to replace the fast one you gave up. In Honestly, each morning you show up grows a Sprout — a small plant that advances through four stages as your streak builds — alongside a running streak and a mood calendar. It\'s a quiet, low-dopamine kind of satisfaction, which is exactly the point: you\'re retraining your brain to feel good about patience instead of stimulation. Miss a day and you simply pick it back up; the goal is a pattern, not perfection. By the time the plant is a few stages in, the morning ritual feels more like yours than the scroll ever did.',
      },
    ],
    faqs: [
      { question: 'Why do I doomscroll first thing in the morning?', answer: 'Because your self-control is at its lowest right after sleep while your craving for novelty is high, and the phone is usually within arm\'s reach. It\'s a design problem, not a discipline problem — which is why changing your environment works better than trying harder.' },
      { question: 'How do I stop scrolling the moment I wake up?', answer: 'Start by moving your phone across the room and replacing the scroll with a short, calmer routine so there\'s something to do instead. If that isn\'t enough, use scheduled app blocking to make the feed genuinely unavailable during your first waking window. Honestly Premium handles that last part with hard Screen Time blocking.' },
      { question: 'Does app blocking actually stop doomscrolling?', answer: 'It works when it can\'t be bypassed in the moment. Honestly Premium uses hard iOS Screen Time blocking on a schedule you set — no snoozing, no quick workarounds — so the app won\'t open during your morning window. Enforcement at the system level is what makes it hold when willpower doesn\'t.' },
      { question: 'What should I do instead of scrolling in the morning?', answer: 'Anything slower that gives your attention a place to land: water, daylight, a few pages, or a brief journaling ritual. Honestly\'s free routine — mood check, free write, gratitude and manifest — takes a few minutes and leaves you calmer than a feed would.' },
    ],
    cta: 'Reclaim Your Mornings',
    datePublished: '2026-06-13',
  },
  
  {
    appId: 'honestly',
    slug: 'journal-for-anxiety-management',
    type: 'guide',
    title: 'Journaling for Anxiety Relief: Techniques That Actually Work',
    h1: 'How to Use Journaling for Anxiety Relief: 3 Simple Techniques',
    metaDescription: 'Journaling for anxiety relief works when you externalize the spiral, name the mood, and ground in gratitude. Here\'s how to do it in five calm minutes.',
    targetKeyword: 'journaling for anxiety relief',
    intro: 'When anxiety hits, your thoughts loop — the same worry, louder each pass, with no exit. Journaling for anxiety relief works because it gives that loop somewhere to go. The moment a spiraling thought lands on the page, it stops being a vague dread and becomes a specific sentence you can actually look at. That small shift — from felt to named — is where relief starts. You don\'t need a therapist\'s worksheet or a perfect routine. You need five quiet minutes and a willingness to write the true thing, not the tidy version. This guide walks through three techniques that do the heavy lifting: emptying the spiral through free-writing, naming your mood before you start, and grounding yourself in gratitude to close. Each one works on paper, in any notes app, or in a journaling app built around the sequence. Do them in order and most mornings will start calmer than they otherwise would.',
    sections: [
      {
        heading: 'Empty the Spiral Onto the Page',
        body: 'Anxiety thrives on repetition. The same worry circles because your brain keeps flagging it as unresolved. Free-writing interrupts that by moving the thought out of your head and into a fixed form. Set a timer for three to five minutes and write whatever the anxiety is saying — unfiltered, unpunctuated, no editing. Don\'t argue with it or solve it yet. Just transcribe. When the worry exists as words you can reread, it loses the shapeless quality that made it feel enormous. You\'ll often find the spiral was three real concerns wearing one big scary coat. That\'s the point: a blank page lets the mess out without demanding you organize it first. Honestly\'s free-writing step is exactly this — an open page you reach after your mood check, no prompt required to start, though optional reflection and shadow-work prompts are there on the days you want to go deeper.',
      },
      {
        heading: 'Name the Mood Before You Write',
        body: 'Starting a blank page while anxious is hard — the cursor blinks and you freeze. Naming your mood first solves this. Before you write a sentence, pick the word that fits how you actually feel: anxious, wired, dread, flat, fine. Labeling an emotion is a small act of regulation on its own; it nudges the feeling from the reactive part of your brain toward the part that can reason about it. It also gives your free-write a starting line — you\'re no longer writing from nothing, you\'re writing from \'here\'s where I am.\' Honestly opens every session with a mood check for this reason, and every option is honest, including the low ones. Naming \'awful\' is allowed, and it\'s often the most useful place to begin. The goal isn\'t to feel better on command — it\'s to feel clearly, which is where the writing gets easier.',
      },
      {
        heading: 'Close by Grounding in Gratitude',
        body: 'Anxiety narrows attention to threat. Gratitude widens it back. After you\'ve emptied the spiral, spend a minute naming two or three things that are steady or good right now — not forced positivity, just true and small. Warm coffee. A text from a friend. The fact that the thing you dreaded yesterday didn\'t actually happen. This isn\'t about canceling the worry; it\'s about reminding your nervous system that the worry isn\'t the whole picture. Ending on gratitude also changes how you carry the session into your day — you close the page steadier than you opened it, rather than stewing in what you just wrote. Honestly\'s ritual finishes here, with a gratitude and manifest step, so the sequence always lands somewhere grounded instead of leaving you mid-spiral. It\'s a small structural trick, but the order matters: spill first, then steady.',
      },
      {
        heading: 'Make It a Five-Minute Morning Ritual',
        body: 'Techniques only relieve anxiety if you actually use them, and mornings are when anxiety tends to be loudest — the mind catastrophizes before the day gives it any real reason to. Anchoring the three steps to a fixed time turns them from a coping tool you forget into a ritual you reach for automatically. Keep it short: mood, a few minutes of free-writing, a line of gratitude. Five minutes is enough. Honestly stitches the sequence into one flow so you\'re not deciding what to do next, and a small plant — your Sprout — grows through four stages as your streak builds, which gives the habit a gentle reason to return. Daily affirmations can echo back on your Lock Screen as a nudge between sessions. If mornings aren\'t your window, the same three steps work any time you feel the spiral starting.',
      },
      {
        heading: 'When a Journal Isn\'t Enough',
        body: 'Journaling is a genuinely useful tool for everyday worry, but it isn\'t treatment. If your anxiety is constant, keeps you from working or sleeping, brings panic attacks, or comes with thoughts of harming yourself, that\'s a signal to talk to a doctor or a licensed therapist — not a failure of your journaling. A journal works best alongside professional support, not instead of it: it\'s the place you notice patterns between sessions and bring real material to the ones that matter. Think of the morning ritual as maintenance for a manageable day, and reach for more help the moment your anxiety stops feeling manageable. There\'s no threshold you have to hit to deserve support, and asking for it early is the calmer choice, not the dramatic one.',
      },
    ],
    faqs: [
      { question: 'Does journaling actually help with anxiety?', answer: 'It helps many people. Writing a worry down moves it from a vague loop into specific words you can examine, which tends to shrink how overwhelming it feels. It\'s not a cure and results vary, but as a low-cost daily habit it\'s one of the more accessible tools for managing everyday anxiety.' },
      { question: 'What should I write in an anxiety journal?', answer: 'Whatever\'s actually true, not the tidy version. Start by naming your mood, then free-write the worry exactly as it sounds in your head — no structure required. If you want a frame, try noting what\'s in your control versus what isn\'t, then close with a couple of things you\'re grateful for.' },
      { question: 'How long do I need to journal to feel calmer?', answer: 'Less than you\'d think. Three to five minutes of honest free-writing is usually enough to break a morning spiral. Consistency matters more than length — a short entry every day does more than a long one once a week.' },
      { question: 'Can journaling replace therapy for anxiety?', answer: 'No. Journaling is a helpful daily tool, but it isn\'t a substitute for professional care. If anxiety is disrupting your life, see a licensed therapist or doctor — and use journaling alongside therapy to track patterns between sessions.' },
    ],
    cta: 'Start Your Calm Ritual',
    datePublished: '2026-06-13',
  },
  
  {
    appId: 'honestly',
    slug: 'best-morning-routine-habit-app',
    type: 'guide',
    title: 'Best Morning Routine Habit App 2026 — Make It Stick',
    h1: 'The Best Morning Routine Habit App Is the One You Actually Reopen',
    metaDescription: 'Looking for the best morning routine habit app? Honestly runs on a short, fixed ritual — mood, free writing, gratitude — plus a streak plant and Premium app locks.',
    targetKeyword: 'best morning routine habit app',
    intro: 'Search "best morning routine app" and you get two kinds of results: bloated habit-trackers with fifty toggles, and pretty apps you open twice and forget. The best morning routine habit app is really just the one you reopen on day thirty — which means it has to be fast, hard to skip, and built around a ritual instead of an ever-growing checklist. This guide covers what separates an app that sticks from one that guilt-trips you, then shows how Honestly is built around exactly that: a short, fixed ritual — mood check, free writing, then gratitude and manifest — with a Sprout plant that grows as your streak builds and optional Premium app blocking to keep your morning yours before the feed takes it.',
    sections: [
      {
        heading: 'What Actually Makes a Morning Routine App Work',
        body: 'Most morning routine apps die on your home screen for the same reason: they ask too much. A wall of habits to check off, prompts to answer, streaks across a dozen categories. The best morning routine habit app does the opposite — it keeps the entry cost low enough that you reopen it on a groggy Tuesday, not just during the motivated first week. Look for three things: a ritual short enough to finish before your coffee cools, some form of accountability so willpower isn\'t the only thing between you and the feed, and visible momentum that rewards showing up. Speed, friction, feedback. An app that nails those beats a feature-packed tracker you quit by day ten.',
      },
      {
        heading: 'A Ritual, Not a Growing Checklist',
        body: 'Honestly is built around one fixed sequence: check your mood, free-write whatever\'s actually on your mind, then note what you\'re grateful for and what you want to call in. Same three steps every morning. The repetition is the point — you\'re not deciding what to do, you\'re just doing it. If you want to go deeper on a given day, optional reflection and shadow-work prompts are there, but the core stays short. There\'s no expanding checklist and no habit categories to maintain. Over weeks, that sameness is what turns the routine into something automatic, and a mood calendar lets you see the patterns you\'d otherwise miss.',
      },
      {
        heading: 'Accountability for When Willpower Runs Out',
        body: 'Intention rarely survives contact with your Lock Screen — the feed is one tap away and it wins the groggy moments. That\'s the gap most morning routine apps leave open. With Honestly Premium, you can schedule hard app blocking over your morning window: Instagram, TikTok and the rest stay locked with Screen Time, no snoozing and no easy workaround. It\'s the difference between "shouldn\'t check your phone" and "can\'t." Instead of leaning on discipline you don\'t have at 7 a.m., you put the decision on rails so the ritual happens before the scroll does. App blocking is a Premium feature — and it\'s the part people say finally made mornings stick.',
      },
      {
        heading: 'Momentum You Can Actually See',
        body: 'Accountability gets you started; momentum keeps you going. Every morning you show up, a Sprout plant grows — a small, living streak that moves through four stages as your consistency builds. It\'s a gentler nudge than a red broken-streak badge, and it makes progress feel like something you\'re tending rather than a number you\'re guarding. Your daily affirmations also echo back on a Lock Screen widget, so the intention you set follows you past the app. Current streak and mood tracking are free; the full journal history and month-by-month calendar are part of Premium, for when you want to look back across the whole arc.',
      },
      {
        heading: 'Free to Start, Premium to Lock In',
        body: 'The core ritual is free forever — mood check, free writing, gratitude and manifest, your streak, and your Sprout plant. You can build the whole habit without paying anything. Premium adds the parts that make it durable: scheduled app blocking, iCloud sync and backup across your devices, and full journal history with the complete calendar. It\'s a one-time Lifetime purchase or a monthly plan, so you can lock in once rather than renting the habit indefinitely. The app is available in 11 languages. Start free, and only upgrade when the ritual has earned its place in your morning.',
      },
    ],
    faqs: [
      { question: 'What is the best morning routine app?', answer: 'The best one is the app you actually reopen after the first week — which usually means the shortest, hardest-to-skip one. Look for a quick fixed ritual, real accountability, and visible momentum. Honestly focuses on exactly that: a short mood-write-gratitude ritual, a growing Sprout streak, and optional Premium app blocking to protect the time.' },
      { question: 'Do morning routine apps actually work?', answer: 'They work when they lower the effort to start and raise the cost of skipping. A routine you finish in a couple of minutes beats an ambitious one you abandon. Honestly keeps the ritual fixed and short, and Premium app blocking removes the easiest excuse — reaching for your phone instead of doing it.' },
      { question: 'What\'s the difference between a morning routine app and a habit tracker?', answer: 'A habit tracker is a list you maintain; the more you add, the more there is to fail at. A morning routine app runs one repeatable sequence you just complete. Honestly is the second kind — the same three steps every morning, so there\'s nothing to configure and nothing to fall behind on.' },
      { question: 'Is Honestly free?', answer: 'Yes. The full morning ritual — mood check, free writing, gratitude and manifest — plus your streak and Sprout plant are free forever. Premium adds scheduled app blocking, iCloud sync, and full journal history and calendar, as a one-time Lifetime purchase or monthly.' },
    ],
    cta: 'Start Your Morning Ritual',
    datePublished: '2026-06-13',
  },
  
  {
    appId: 'honestly',
    slug: 'anxiety-journaling-app',
    type: 'guide',
    title: 'Best Anxiety Journaling App 2026 — What to Look For',
    h1: 'How to Choose the Best Anxiety Journaling App',
    metaDescription: 'Picking the best anxiety journaling app? Look for low friction, privacy, and mood tracking. See how Honestly\'s mood-first ritual helps you put worry down daily.',
    targetKeyword: 'best anxiety journaling app',
    intro: 'The best anxiety journaling app isn\'t the one with the most features — it\'s the one you\'ll actually open on the morning your chest is tight and your mind won\'t slow down. When you\'re comparing options, three things matter more than the feature list: low friction, so anxiety doesn\'t talk you out of starting; real privacy, so you can be honest; and mood tracking, so you can see patterns instead of just reliving them. Honestly is built around exactly that. You open it, tag how you actually feel, then write freely before the day fills your head. It\'s non-clinical and it won\'t replace a therapist, but as a daily place to set the worry down, it holds up. Here\'s what to look for in an anxiety journal app — and where Honestly fits.',
    sections: [
      {
        heading: 'What Actually Matters in an Anxiety Journal App',
        body: 'Skip the feature comparisons for a second. On an anxious morning, the app that helps is the one that asks almost nothing of you. Three things separate a journal you\'ll keep from one you\'ll delete. First, low friction — if opening it feels like homework, you won\'t reach for it when you need it most. Second, privacy — you can\'t be honest about a spiraling thought if part of you is performing for an audience or wondering where the words go. Third, mood tracking — anxiety feels random until you can see it plotted, and then patterns emerge you can actually work with. A gentle, non-clinical tone matters too. You want a page that meets you where you are, not one that grades your feelings.',
      },
      {
        heading: 'Low Friction Beats a Long Feature List',
        body: 'The best anxiety journaling apps get out of your way. Honestly opens on a mood check — one tap to log how you actually feel — and moves straight into free writing, so you\'re emptying your head instead of staring at a form. That order matters when you\'re anxious: naming the feeling first lowers the stakes of the blank page, and by the time you\'re writing, the hardest part is behind you. There\'s no daily word count and no streak-shaming if you miss a day, though a small Sprout plant does grow across four stages as you keep showing up — a quiet nudge, not a guilt trip. Five honest minutes beats a perfect entry you never write.',
      },
      {
        heading: 'Mood Tracking Turns Anxiety Into Patterns',
        body: 'A single anxious morning tells you little. Thirty of them, plotted, tell you a lot — which days spike, what tends to precede them, whether things are trending calmer than they feel. Honestly logs your mood with every entry and shows it back as a calendar with a mood-distribution view, so the fog becomes something you can read. That\'s the quiet power of tracking: anxiety stops feeling like a random ambush and starts looking like a pattern you can plan around. Your current streak and mood tracking are free; the full journal history and complete calendar come with Premium if you want to look further back across your whole journey.',
      },
      {
        heading: 'Privacy Is Non-Negotiable',
        body: 'You can\'t write honestly about a fear if some part of you is guarding it. That\'s why privacy belongs at the top of your checklist, not the bottom. Honestly lives on your iPhone — there\'s no public feed, no followers, no social layer to perform for. If you want your entries backed up and synced across your devices, iCloud sync is available with Premium, but the default is simply your journal, on your phone, for you. When the page feels genuinely private, you write the true thing instead of the acceptable version — and the true thing is usually the one that actually loosens anxiety\'s grip.',
      },
      {
        heading: 'Room to Go Deeper — and to Remove Triggers',
        body: 'A blank page is enough on hard days, but some mornings you want more structure. Honestly keeps optional reflection and shadow-work prompts on hand for when free writing isn\'t enough, plus a gratitude-and-manifest step to close on something steadier than the worry you opened with. Daily affirmations echo back, and a Lock Screen widget puts one where you\'ll actually see it. If your anxiety is fed by doomscrolling, Premium app blocking can lock the apps that wind you up on a schedule, using hard Screen Time blocking with no easy snooze. None of this replaces professional support — if anxiety is affecting your daily life, talk to a clinician. As a daily practice, though, the pieces fit.',
      },
    ],
    faqs: [
      { question: 'What should I look for in an anxiety journaling app?', answer: 'Low friction, so you\'ll open it on bad days; real privacy, so you can be honest; and mood tracking, so patterns become visible over time. A gentle, non-clinical tone helps too. Honestly is built around a mood-first, low-effort ritual with private-by-default entries.' },
      { question: 'Is a journaling app better than paper for anxiety?', answer: 'Neither is objectively better — it\'s whichever you\'ll actually use. Apps win on convenience (it\'s already in your pocket at 6 a.m.), mood tracking over time, and reminders. Paper wins on zero distraction. Honestly leans into the app advantages: a mood log on every entry and a calendar view you can\'t easily keep on paper.' },
      { question: 'Can a journaling app replace therapy for anxiety?', answer: 'No. Journaling is a supportive daily practice, not treatment. If anxiety is interfering with your life, please talk to a licensed professional. Honestly works best as a tool between sessions — a place to notice and process worry, not a substitute for care.' },
      { question: 'Is Honestly free to use?', answer: 'Yes, the core is free forever: the mood check, free writing, the gratitude-and-manifest step, and your current streak and mood tracking. Premium adds app blocking, iCloud sync, and full journal history and calendar, as a one-time Lifetime purchase or monthly.' },
    ],
    cta: 'Start Your Anxiety Journal',
    datePublished: '2026-06-13',
  },
  {
    appId: 'yumeship',
    slug: 'fandom-character-journal-app',
    type: 'guide',
    title: 'Best Character Journal App 2026 — Track Favorite Characters & Ships',
    h1: 'Best App for Character Journaling — Private Fan Space for Ships',
    metaDescription: 'Yumeship is a character journal app for fans. Track favorite characters, write headcanons, build character relationships, all private on your iPhone.',
    targetKeyword: 'character journal app',
    intro: 'Fandom is lonely when you keep it secret. Yumeship is the best character journal app because it\'s a private vault for your favorite characters and ships—no judgment, no exposure.',
    sections: [
      {
        heading: 'Your Characters Are Your People',
        body: 'Your favorite characters matter. Their stories, their growth, your headcanons about them. Yumeship is a space where that matters and is never exposed.',
      },
      {
        heading: 'Private Templates for Every Character',
        body: 'Write a love letter to a character. Build their personality profile. Track their story arc. Yumeship templates match character journal needs exactly.',
      },
      {
        heading: 'No Cloud, No Sharing, No Exposure',
        body: 'Everything stays on your device. No accounts, no cloud, no one else ever sees. Your character journal is as private as your diary.',
      },
    ],
    faqs: [
      { question: 'Is Yumeship just for romantic interests?', answer: 'No. Write about favorite characters, idols, OCs, fictional crushes, all of it. Every character gets a private page with customizable templates.' },
      { question: 'Can I track multiple characters?', answer: 'Yes. Unlimited characters, unlimited ships, unlimited pages. Each character is its own vault.' },
      { question: 'Is my character journal really private?', answer: 'Completely. No accounts, no cloud, no syncing. Everything is stored locally on your iPhone. No one sees it but you.' },
    ],
    cta: 'Create Your Character Journal',
    datePublished: '2026-06-13',
  },
  
  {
    appId: 'honestly',
    slug: 'mindfulness-meditation-journaling',
    type: 'guide',
    title: 'Best Mindfulness Journaling App 2026 — A Ritual, No Meditation Required',
    h1: 'Best App for Mindfulness Journaling — Reflection Without a Meditation Timer',
    metaDescription: 'Honestly pairs a mood check-in with free-write journaling and affirmations — a simple mindfulness ritual for your morning. Free on iPhone.',
    targetKeyword: 'mindfulness meditation journaling app',
    intro: 'Meditation is hard to start. Journaling is hard to maintain. Honestly doesn\'t bolt a timed breathing exercise onto journaling — its mindfulness comes from the ritual itself: naming your mood honestly, then a genuinely blank page with no prompt to perform for.',
    sections: [
      {
        heading: 'Naming Your Mood Is the Mindfulness',
        body: 'Honestly doesn\'t run a guided breathing exercise before you write. The present-moment awareness comes from the first step itself: naming your mood — Happy, Confused, Sad, Awful, or Cry — before you\'ve written a word. That single act of honest naming is a mindfulness practice on its own.',
      },
      {
        heading: 'A Blank Page Clarifies, Even Without a Meditation Timer',
        body: 'You don\'t need a separate meditation app to get some of its benefit. Writing freely, with no prompt and no rules, gives your thoughts somewhere to land instead of looping. Close with a couple of affirmations, and the whole thing takes under three minutes.',
      },
      {
        heading: 'Accountability Through App Blocking',
        body: 'Without accountability, the ritual collapses. Honestly Premium blocks apps until you journal. This single feature is why people stick to it.',
      },
    ],
    faqs: [
      { question: 'Does Honestly include a guided meditation?', answer: 'No. Honestly doesn\'t include a timed breathing or meditation exercise. Its mindfulness comes from the ritual itself — naming your mood, then a genuinely blank page, in under three minutes.' },
      { question: 'Is journaling the same as meditation?', answer: 'No. Meditation quiets the mind through stillness; journaling clarifies it through writing. Honestly leans entirely on the second — a mood check-in and a free-write, no meditation timer involved.' },
      { question: 'Can journaling alone help with anxiety?', answer: 'Research supports expressive writing as a way to process anxious thoughts, even without a separate meditation practice. Honestly\'s mood-first, prompt-free page is built around that.' },
    ],
    cta: 'Start Mindfulness Journaling',
    datePublished: '2026-06-13',
  },
  
  {
    appId: 'honestly',
    slug: 'self-care-ritual-app',
    type: 'guide',
    title: 'Best Self-Care Ritual App 2026 — Morning Wellness Routine',
    h1: 'Best App for Self-Care Rituals — Build Sustainable Wellness Habits',
    metaDescription: 'Honestly is a self-care ritual app. Morning journaling, affirmations, and — with Premium — app blocking until you complete your wellness routine.',
    targetKeyword: 'best self-care ritual app',
    intro: 'Self-care isn\'t bubble baths. It\'s daily rituals that prime your nervous system for calm. Honestly is the best self-care ritual app because it builds your self-care routine into a morning ritual you actually do.',
    sections: [
      {
        heading: 'Self-Care Must Be Non-Negotiable',
        body: 'Self-care fails when it\'s optional. With Premium, Honestly makes it non-negotiable: apps lock until you complete your ritual. You\'re protected from skipping yourself.',
      },
      {
        heading: 'Ritual Matters More Than Duration',
        body: 'An under-3-minute consistent ritual works better than a 30-minute ritual you skip most days. Honestly\'s ritual — mood, a free-write, affirmations — is short enough to do daily, structured enough to matter.',
      },
      {
        heading: 'Consistency Creates Change',
        body: 'One good morning doesn\'t change your nervous system. 30 days of good mornings does. Honestly makes your self-care ritual automatic.',
      },
    ],
    faqs: [
      { question: 'What counts as self-care?', answer: 'Anything that primes your nervous system for calm: journaling, movement, rest, honest reflection. Honestly focuses on one of those — a mood check-in, a free-write, and affirmations — and does it well, every morning.' },
      { question: 'How long should a self-care ritual be?', answer: 'Long enough to matter, short enough to do consistently. Honestly\'s ritual takes under three minutes: a mood check-in, a genuinely blank page, and a few affirmations.' },
      { question: 'Can self-care replace therapy?', answer: 'No. Self-care is maintenance. Therapy is treatment. But a solid daily ritual makes therapy more effective.' },
    ],
    cta: 'Start Your Self-Care Ritual',
    datePublished: '2026-06-13',
  },
  
  
  {
    appId: 'honestly',
    slug: 'gratitude-app-journal',
    type: 'guide',
    title: 'Best Gratitude Journal App for a Daily Habit — Honestly',
    h1: 'How to Find a Gratitude Journal App You\'ll Actually Keep Using',
    metaDescription: 'The best gratitude journal app makes the habit stick, not just possible. See what to look for — and how Honestly folds gratitude into a 3-step morning ritual.',
    targetKeyword: 'gratitude journal app',
    intro: 'Search for a gratitude journal app and you\'ll find dozens that look nearly identical. The one that changes anything isn\'t the prettiest — it\'s the one you still open three weeks from now. Gratitude journaling works by training attention: name what went right often enough and your brain gets better at spotting it in real time. But that only happens with repetition, which means the real question isn\'t which app has the most features — it\'s which one gets you to show up tomorrow. This guide covers what actually makes a gratitude habit stick, what to look for before you download anything, and where Honestly fits. Honestly isn\'t a standalone "three things" list; it builds gratitude into a short morning ritual — mood check, free-write, then gratitude and manifest — so naming what matters becomes something you do daily, not something you mean to.',
    sections: [
      {
        heading: 'Why the Habit Matters More Than the App',
        body: 'Gratitude journaling works because it trains attention. When you regularly name what went right, your brain gets better at noticing it in the moment — the practice, repeated, shifts your default from scanning for problems to registering good. Research consistently links a steady gratitude habit to better mood and sleep, but the operative word is steady. A single grateful entry does little; a few months of them changes your baseline. That\'s why the app you pick matters less than whether it gets you to return. The best gratitude journal app is simply the one you open tomorrow, and the day after that. Everything else — the design, the prompts, the streak — only matters insofar as it serves that one thing: consistency. Judge any app by how likely it makes you to come back, not by its feature list.',
      },
      {
        heading: 'What to Look for in a Gratitude Journal App',
        body: 'Three things separate an app you\'ll keep from one you\'ll abandon. First, low friction: if logging gratitude takes more than a minute or asks you to perform, you\'ll skip it on busy days. Second, a reason to return — a streak, a visible sign of progress, something that makes yesterday\'s entry feel worth continuing. Third, honesty over positivity theater; a good app lets you mark a hard day without forcing a fake smile, because manufactured gratitude reads as hollow and quietly kills the habit. Be wary of apps that bury the basic writing behind a paywall or drown it in social features. What you want is the shortest possible path from opening the app to naming one real thing you\'re grateful for — repeatable every single morning without thinking about it.',
      },
      {
        heading: 'Where Gratitude Fits in Honestly\'s Morning Ritual',
        body: 'Honestly builds gratitude into a three-step morning ritual rather than treating it as a standalone list. You start with a mood check — logging how you actually feel, no performance required. Then a free-write to empty your head before the day fills it. The ritual closes with gratitude and manifest: you anchor yourself in what matters and set an intention for the day ahead. Putting gratitude last is deliberate. By the time you reach it you\'ve already been honest about your mood and cleared some mental noise, so what you\'re grateful for tends to come out specific and real instead of the reflexive "family, health, coffee." The whole sequence is free forever, and it\'s short enough to finish before your first scroll — which is exactly the point of doing it in the morning.',
      },
      {
        heading: 'A Streak You Can Watch Grow',
        body: 'Consistency is the hard part of any gratitude habit, so Honestly gives it something to hold onto. Your streak counts the mornings you show up, and a Sprout — a small plant — grows alongside it through four stages as you keep the ritual going. It\'s a gentle, visual stake in the ground: skip a morning and you notice; string days together and you watch something small become established. Over weeks, that\'s what shifts your baseline from meaning to journal into actually journaling. Your current streak and mood tracking are free. If you want to look back across a full calendar and revisit older entries, journal history and the complete month view are part of Premium — useful once you\'ve built enough of a record to want to reread it.',
      },
      {
        heading: 'Protect the Morning Your Habit Lives In',
        body: 'The biggest threat to a morning gratitude habit usually isn\'t motivation — it\'s the phone you reach for before your feet hit the floor. Ten minutes into a feed and the moment\'s gone. If that\'s your pattern, Honestly\'s Premium app blocking can guard the window: lock Instagram, TikTok and whatever else pulls you, on a schedule, with hard Screen Time blocking — no workarounds, no snoozing. You set the hours; the apps stay shut until then, so the first thing you do is your own ritual instead of someone else\'s content. It\'s a Premium feature, offered as a one-time Lifetime purchase or monthly, and it\'s entirely optional. The gratitude ritual itself stays free whether or not you ever turn blocking on.',
      },
    ],
    faqs: [
      { question: 'Does keeping a gratitude journal actually work?', answer: 'Yes, when it\'s consistent. Research links a regular gratitude habit to better mood and sleep. A one-off entry does little, but weeks of showing up gradually shift what your brain notices by default. The app\'s real job is mainly to get you to keep going — the benefit comes from the repetition, not any single day.' },
      { question: 'What should I write in a gratitude journal?', answer: 'Something specific beats something generic. "I\'m grateful my sister called" lands harder than "family." In Honestly, the gratitude and manifest step comes after a mood check and a free-write, so you arrive with a clearer head and the real thing tends to surface on its own instead of the usual reflexive answers.' },
      { question: 'Is Honestly free to use as a gratitude journal?', answer: 'Yes. The full morning ritual — mood check, free writing, and gratitude and manifest — is free forever, along with your current streak and mood tracking. Premium adds app blocking, iCloud sync and backup, and full journal history with a complete calendar, available as a one-time Lifetime purchase or monthly.' },
      { question: 'How is this different from a plain gratitude app?', answer: 'Instead of a standalone "three things" list, Honestly wraps gratitude inside a short morning ritual and gives it a streak plus a growing Sprout plant to keep you coming back. And if mornings are where your phone hijacks you, Premium app blocking can protect the time you\'d otherwise journal in.' },
    ],
    cta: 'Start Your Gratitude Ritual',
    datePublished: '2026-06-13',
  },
  {
    appId: 'yumeship',
    slug: 'anime-fan-community-app',
    type: 'guide',
    title: 'Best Anime Fan App 2026 — A Private Home for Your Fandom',
    h1: 'The Best Anime Fan App Is a Private One',
    metaDescription: 'The best anime fan app isn\'t another social feed — it\'s a private, on-device journal for headcanons, ships, and what-ifs. What to look for, and where Yumeship fits.',
    targetKeyword: 'best anime fan app',
    intro: 'Search "best anime fan app" and you\'ll mostly find two things: trackers that log what you\'ve watched, and social platforms where fandom happens in public. Both are useful — and neither is built for the part of fandom that\'s just yours. If your fandom life is headcanons at 2am, ship pages nobody is allowed to read, incorrect quotes written for an audience of one, and what-if scenarios you\'d never post, then the best anime fan app for you isn\'t a community at all. It\'s a private journal that actually understands characters, ships, and F/Os — and keeps every word on your device. This guide covers the real difference between public fan apps and private ones, what to look for if the personal side of fandom is the side you care about, and where Yumeship, a fully on-device fandom journal, fits in.',
    sections: [
      {
        heading: 'Most "Anime Fan Apps" Are Built for an Audience',
        body: 'The apps that dominate anime fandom are social by design. Watch trackers turn your taste into a public profile — scores, rankings, activity feeds. Fan servers and microblogs reward posting, reacting, and keeping up. That\'s genuinely great for discovery: finding your next series, arguing about a finale, meeting people who love what you love. But it quietly shapes what you make. When everything you write can be seen, you write for readers. You soften the headcanon that might get side-eyed, skip the ship that isn\'t popular this season, and never start the self-insert scenario at all. An audience — even a friendly one — changes the work. The personal side of fandom deserves a tool with no audience in it.',
      },
      {
        heading: 'The Personal Side of Fandom Needs a Different Home',
        body: 'Think about what you actually produce as a fan when nobody\'s watching: headcanons that contradict canon on purpose, love letters to a character who will never read them, what-if scenarios, incorrect quotes, little scenes that only make sense to you. This material has two natural failure modes. Posted publicly, it gets flattened into content — measured in likes, exposed to strangers, permanently searchable. Dumped into a generic notes app, it becomes an unstructured wall of text with no sense of who anything belongs to. What it needs is structure without exposure: a dedicated page per character or ship, prompts that keep you writing, and a hard guarantee that none of it leaves your phone.',
      },
      {
        heading: 'What to Look For in a Private Anime Fan App',
        body: 'Three things separate a genuinely private fandom app from a social app with a privacy toggle. First, on-device storage: if there\'s no account, no cloud, and no feed, there\'s nothing to leak, scrape, or accidentally share — privacy is architectural, not a setting. Second, fandom-native structure: your F/O or ship should get its own page with spaces for headcanons, letters, dates, and memories, not a blank document you have to organize yourself. Third, tools that keep the blank page from winning — scenario prompts, generators, playful formats that turn "I should write something" into actually writing. If an app markets followers, sharing, or a community tab, it\'s built for the public side of fandom, whatever its privacy policy says.',
      },
      {
        heading: 'How Yumeship Handles the Private Side',
        body: 'Yumeship is a private journal built for exactly this. Each ship or F/O gets its own space with templates shaped around how fans actually think: get to know your F/O, what-ifs, love letters, dates and memories. When you want play instead of prose, there\'s an incorrect quotes generator starring your F/O, a list of scenario prompts, polycule bingo, and ship charts for mapping relationship dynamics — plus albums, self-inserts, and a private message thread where notifications arrive from your F/O. And the privacy is structural: everything stays on your device, with no social feed, no sharing, and no accounts. It works for anime, otome, manga, and kpop fans alike — waifu, husbando, or whole polycule.',
      },
      {
        heading: 'Keep the Public Apps — Just Not for This',
        body: 'This isn\'t an either/or choice. Your watch tracker is still the best way to manage a seasonal lineup, and your servers are still where the group chat lives. A private fandom journal doesn\'t replace them; it takes over the one job they do badly. The practical split: public apps for discovery and discussion, private journal for anything you create — headcanons, ships, letters, scenarios. The test is simple: if you\'d hesitate before posting it, it belongs in the private space. Once that material has a home of its own, you\'ll notice you write more of it, because the question "how will this look?" never comes up. That\'s what an audience of one buys you.',
      },
    ],
    faqs: [
      { question: 'Is there an anime fan app without social features?', answer: 'Yes. Yumeship is a private fandom journal with no social feed, no sharing, and no accounts — everything you write stays on your device. It\'s built for the personal side of fandom: headcanons, ships, love letters, and what-ifs.' },
      { question: 'What\'s the best app to organize headcanons and ships?', answer: 'A journal structured around characters rather than dated entries. In Yumeship, each ship or F/O gets its own page with templates for headcanons, what-ifs, love letters, and dates and memories, so nothing dissolves into one long note.' },
      { question: 'Is Yumeship only for anime fans?', answer: 'No. It\'s built for every kind of shipper — anime, otome, manga, and kpop, whether your F/O is a waifu, husbando, or a whole polycule.' },
      { question: 'Is Yumeship free?', answer: 'Yumeship is free to download and includes one ship. Premium unlocks unlimited ships and all templates, with weekly, monthly, and yearly options.' },
      { question: 'Does a private fandom journal replace MyAnimeList or Discord?', answer: 'No — trackers and servers still handle the public side: logging series, discussion, community. A private journal like Yumeship covers what they can\'t: a space for the fandom writing you\'d never post.' },
    ],
    cta: 'Make Your Private Fandom Space',
    datePublished: '2026-06-13',
  },
  // ─── YumeShip ────────────────────────────────────────────────────────────
  {
    appId: 'yumeship',
    slug: 'vs-notion-fandom',
    type: 'compare',
    title: 'YumeShip vs Notion — Best Way to Organize Your Fandom',
    h1: 'YumeShip vs Notion: Where Should Your Fandom Live?',
    metaDescription: 'YumeShip vs Notion for fandom. Notion is a blank database you must build; YumeShip is a private, ready-made vault for ships, F/Os, headcanons and letters. Compared.',
    targetKeyword: 'notion fandom template alternative',
    intro: "A lot of fans try to run their fandom life out of Notion — a ships database here, a headcanon table there, a gallery somewhere else. It works, but you spend more time building the system than living in it. YumeShip is the opposite: a private, purpose-built vault for the characters and ships you love, ready the moment you open it. Here's how the two compare.",
    sections: [
      { heading: 'Blank Canvas vs Built for This', body: "Notion gives you infinite flexibility and zero structure — every database, template, and relation is yours to design and maintain. YumeShip arrives already shaped around fandom: each ship or F/O gets its own page with templates, a color palette, love letters, headcanons, and date tracking. You skip the setup and go straight to the part that matters." },
      { heading: 'Privacy by Default', body: "Notion lives in the cloud on an account, synced to servers and tied to your email. YumeShip keeps everything on your device — no account, no cloud, no sharing. For something as personal as the characters you love quietly, that on-device privacy is the whole point. Nothing leaves your phone." },
      { heading: 'Which Fits You?', body: "If you adore building systems and want one tool for your whole life, Notion is powerful. If you want a soft, private space made specifically for ships, F/Os, and headcanons — without assembling it yourself — YumeShip is built for exactly that, and it feels personal in a way a database never will." },
    ],
    comparisonTable: [
      { feature: 'Ready-made for ships & F/Os', app: 'Yes', competitor: 'No — build it yourself' },
      { feature: 'Per-character templates & palettes', app: 'Yes', competitor: 'Manual' },
      { feature: 'Fully on-device / private', app: 'Yes', competitor: 'No (cloud account)' },
      { feature: 'Love letters & scenes', app: 'Built in', competitor: 'DIY pages' },
      { feature: 'Learning curve', app: 'None', competitor: 'High' },
      { feature: 'Platform', app: 'iOS', competitor: 'Cross-platform' },
    ],
    faqs: [
      { question: 'Is YumeShip better than a Notion fandom template?', answer: 'For fandom specifically, YumeShip is ready-made and private by default, while a Notion template requires building and maintaining your own system in the cloud.' },
      { question: 'Can I keep my fandom private in YumeShip?', answer: 'Yes. Everything stays on your device — no account, no cloud sync, no sharing. Notion stores your data on its servers.' },
      { question: 'Do I have to set anything up in YumeShip?', answer: 'No. Each ship or F/O comes with templates, a palette, and spaces for letters and headcanons, so you can start immediately.' },
    ],
    cta: 'Make Your Private Vault',
    datePublished: '2026-05-16',
  },
  {
    appId: 'yumeship',
    slug: 'best-fandom-journal-app-2026',
    type: 'compare',
    title: 'Best Fandom Journal App 2026 — Ships, F/Os & Headcanons',
    h1: 'The Best Fandom Journal App for 2026',
    metaDescription: 'Looking for the best fandom journal app in 2026? Why YumeShip — a private, on-device vault for ships, F/Os, headcanons and love letters — leads for fans who want privacy.',
    targetKeyword: 'best fandom journal app 2026',
    intro: "Generic journals and notes apps aren't made for fandom — they don't understand ships, F/Os, headcanons, or the soft, private way fans hold their favorite characters. The best fandom journal app in 2026 is one built specifically for that, and one that keeps it completely private. This guide explains what to look for and why YumeShip stands out.",
    sections: [
      { heading: 'Made for Fandom, Not Retrofitted', body: "A great fandom journal gives every character or ship its own dedicated space — not a flat note. YumeShip does this: each F/O gets a page with a visual template, palette, love letters, headcanons by category, and special dates. The structure mirrors how fans actually think about the ones they love, instead of forcing you into a blank text box." },
      { heading: 'Private and Yours Alone', body: "Fandom journaling is intimate, and the best app respects that. YumeShip keeps everything on-device with no accounts and no cloud, so your vault is genuinely private. Nothing is posted, scraped, or synced — it's a space just for you." },
      { heading: 'Beautiful Enough to Return To', body: "The best journal is one you actually want to open. YumeShip leans into soft, personal design — templates and palettes that make each ship's page feel like a little world. That care is what turns a journal from a chore into a comfort." },
    ],
    comparisonTable: [
      { feature: 'Per-character / per-ship pages', app: 'Yes', competitor: 'No (generic notes)' },
      { feature: 'Headcanon categories', app: 'Yes', competitor: 'No' },
      { feature: 'Love letters & scenes', app: 'Yes', competitor: 'No' },
      { feature: 'On-device privacy', app: 'Yes', competitor: 'Varies' },
      { feature: 'Visual templates & palettes', app: 'Yes', competitor: 'No' },
      { feature: 'Free to start', app: 'Yes', competitor: 'Varies' },
    ],
    faqs: [
      { question: 'What is the best fandom journal app in 2026?', answer: 'YumeShip is built specifically for fandom — private, on-device, with dedicated pages for ships and F/Os, headcanon categories, and love letters. It is ideal for fans who want a beautiful, private space.' },
      { question: 'Is a fandom journal different from a normal journal?', answer: 'Yes. A fandom journal is structured around characters, ships, and headcanons rather than dated entries. YumeShip is designed around exactly this.' },
      { question: 'Is YumeShip free?', answer: 'YumeShip is free to download. Premium unlocks unlimited ships and all visual templates.' },
    ],
    cta: 'Start Your Fandom Vault',
    datePublished: '2026-05-19',
  },
  {
    appId: 'yumeship',
    slug: 'self-ship-app',
    type: 'guide',
    title: 'Self-Ship App — A Private Space for You and Your F/O',
    h1: 'A Private Self-Ship App Made Just for You',
    metaDescription: 'Self-shipping deserves a space of its own. YumeShip is a private, on-device app for your F/O — love letters, headcanons, scenes and dates, all kept just for you.',
    targetKeyword: 'self ship app',
    intro: "Self-shipping — imagining yourself with a character you love — is a real, meaningful kind of comfort, and it deserves somewhere soft to live. Most apps weren't made for it, leaving self-shippers with cold notes apps or exposed social feeds. YumeShip is a private self-ship app where your F/O gets a whole space of their own, kept entirely on your device.",
    sections: [
      { heading: 'A Page for the Two of You', body: "In YumeShip, your F/O gets a dedicated page with a visual template and palette that feels like them. You can write love letters, capture scenes and little moments, log headcanons, and mark special dates. It's a space designed to hold the relationship the way you imagine it — warm, detailed, and entirely yours." },
      { heading: 'Completely Private', body: "Self-shipping is personal, and YumeShip treats it that way. Everything stays on your device — no accounts, no cloud, no sharing. Nobody sees your vault but you. That privacy lets you be as soft and honest as you want without worrying about anyone scrolling past it." },
      { heading: 'No Judgment, Just Space', body: "YumeShip doesn't gamify or expose your F/O — it simply gives you a quiet, beautiful place to keep them. Whether you have one F/O or many, the app is built to honor the comfort self-shipping brings, with templates and tools that make the space feel cared for." },
    ],
    faqs: [
      { question: 'What is a self-ship app?', answer: 'A self-ship app is a private space for imagining and recording your relationship with a character you love. YumeShip gives your F/O a dedicated page with letters, headcanons, scenes, and dates.' },
      { question: 'Is YumeShip private for self-shipping?', answer: 'Yes. Everything stays on your device with no account or cloud, so your self-ship space is completely private.' },
      { question: 'Can I have more than one F/O?', answer: 'Yes. Premium users can create unlimited ships and F/Os; free users start with one.' },
    ],
    cta: 'Make a Space for Your F/O',
    datePublished: '2026-05-22',
  },
  {
    appId: 'yumeship',
    slug: 'comfort-character-app',
    type: 'guide',
    title: 'Comfort Character App — Keep Your Comfort Character Close',
    h1: 'An App to Keep Your Comfort Character Close',
    metaDescription: 'Your comfort character helps you feel safe. YumeShip is a private app to keep them close — a dedicated page, letters, headcanons and moments, all on your device.',
    targetKeyword: 'comfort character app',
    intro: "A comfort character is the one who makes you feel safe on hard days. Keeping them close shouldn't mean scattering screenshots across your camera roll or posting in feeds that feel exposed. YumeShip is a private comfort character app where the character who steadies you gets a dedicated, beautiful space of their own.",
    sections: [
      { heading: 'A Home for Your Comfort Character', body: "Give your comfort character a page in YumeShip with a template and palette that feels like them. Collect headcanons, write letters when you need to talk to them, and save the scenes and moments that bring you calm. It becomes a small, reliable place to go when you need comfort." },
      { heading: 'Private and Safe', body: "Comfort characters are deeply personal. YumeShip keeps everything on-device — no account, no cloud, no eyes but yours. That safety is part of the comfort: a space you can open on a bad night that's entirely, quietly yours." },
      { heading: 'More Than One Is Welcome', body: "Many people have several comfort characters for different moods. YumeShip lets you keep as many as you like (unlimited with Premium), each with their own space, so whoever you need is always close at hand." },
    ],
    faqs: [
      { question: 'What is a comfort character app?', answer: 'It is an app for keeping the characters who bring you comfort close. YumeShip gives each comfort character a private page with letters, headcanons, and saved moments.' },
      { question: 'Is it private?', answer: 'Yes. Everything in YumeShip stays on your device — no account, no cloud, no sharing.' },
      { question: 'Can I add several comfort characters?', answer: 'Yes. Premium unlocks unlimited characters, each with their own dedicated space.' },
    ],
    cta: 'Keep Them Close',
    datePublished: '2026-05-25',
  },
  {
    appId: 'yumeship',
    slug: 'kpop-bias-journal-app',
    type: 'guide',
    title: 'K-pop Bias Journal App — A Private Space for Your Bias',
    h1: 'A Private K-pop Bias Journal App',
    metaDescription: 'Keep everything about your bias in one private space. YumeShip is an on-device journal for K-pop fans — dedicated pages, notes, dates and moments, just for you.',
    targetKeyword: 'kpop bias journal app',
    intro: "If you have a bias, you know the feeling — comebacks, photocards, lyrics, little moments you want to hold onto. YumeShip gives your bias a private space of their own: a dedicated page where you can keep everything that matters, kept entirely on your device away from the noise of stan twitter.",
    sections: [
      { heading: 'A Dedicated Page for Your Bias', body: "Create a page for your bias with a palette and template that fits their vibe. Write notes and letters, log headcanons and favorite moments, and mark dates like debut anniversaries or comebacks. It keeps everything about them in one soft, organized place instead of scattered across screenshots." },
      { heading: 'Away from the Timeline', body: "Fandom online can be loud and exposed. YumeShip is the quiet opposite — fully private and on-device, with no account or sharing. It's a personal space for your feelings about your bias, not a feed to perform them in." },
      { heading: 'Bias Wreckers Welcome Too', body: "One bias is rarely the whole story. With Premium you can keep unlimited members and groups, each with their own page, so your whole rotation — bias, bias wreckers, and all — has a home." },
    ],
    faqs: [
      { question: 'What is a K-pop bias journal app?', answer: 'It is a private space to keep everything about your bias — notes, moments, and dates. YumeShip gives your bias a dedicated, on-device page.' },
      { question: 'Is YumeShip private?', answer: 'Yes. Everything stays on your device with no account or cloud, away from public timelines.' },
      { question: 'Can I track more than one member?', answer: 'Yes. Premium unlocks unlimited pages, so you can keep your whole bias list.' },
    ],
    cta: 'Make a Page for Your Bias',
    datePublished: '2026-05-28',
  },
  {
    appId: 'yumeship',
    slug: 'headcanon-organizer-app',
    type: 'guide',
    title: 'Headcanon Organizer App — Keep Your Headcanons in One Place',
    h1: 'Finally, a Place to Organize Your Headcanons',
    metaDescription: 'Stop losing headcanons in scattered notes. YumeShip organizes headcanons by category for each character or ship, privately on your device. Free to start.',
    targetKeyword: 'headcanon organizer app',
    intro: "Headcanons pile up everywhere — notes apps, screenshots, half-finished docs — and the good ones get lost. YumeShip is a headcanon organizer that gives every character and ship a structured space, so your favorite details and ideas stay in one private, beautiful place instead of scattered across your phone.",
    sections: [
      { heading: 'Headcanons by Category', body: "For each character or ship, YumeShip lets you log headcanons by category — personality, daily life, relationships, AU ideas, whatever you like. That structure means you can actually find the headcanon you wrote three months ago, and see the whole picture of how you imagine them in one place." },
      { heading: 'Tied to the Character They Belong To', body: "Headcanons don't live in a vacuum — they belong to a character or ship. In YumeShip each one sits on that character's page alongside letters, scenes, and dates, so your headcanons have context and your vault feels coherent rather than fragmented." },
      { heading: 'Private and Permanent', body: "Your headcanons stay on your device — no account, no cloud, no risk of a deleted post taking them with it. It's a permanent, private archive of the ideas you've built, ready whenever inspiration strikes." },
    ],
    faqs: [
      { question: 'What is a headcanon organizer?', answer: 'It is a tool for storing and categorizing your headcanons. YumeShip organizes them by category under each character or ship, privately on your device.' },
      { question: 'Can I sort headcanons by type?', answer: 'Yes. You can log headcanons by category for each character, making them easy to browse and find later.' },
      { question: 'Are my headcanons private?', answer: 'Yes. Everything stays on your device with no account or cloud sync.' },
    ],
    cta: 'Organize Your Headcanons',
    datePublished: '2026-05-31',
  },
  {
    appId: 'yumeship',
    slug: 'husbando-waifu-app',
    type: 'guide',
    title: 'Husbando & Waifu App — A Private Space for Anime Faves',
    h1: 'A Private App for Your Husbando or Waifu',
    metaDescription: 'Keep your husbando or waifu close in a private, on-device app. YumeShip gives each anime fave a dedicated page with letters, headcanons, scenes and dates.',
    targetKeyword: 'husbando waifu app',
    intro: "Loving a husbando or waifu is a joy, and it deserves more than a folder of saved images. YumeShip gives your anime faves a private space of their own — a dedicated page where you can keep letters, headcanons, scenes, and special dates, all stored quietly on your device.",
    sections: [
      { heading: 'A Page Worthy of Your Fave', body: "Each husbando or waifu gets a page in YumeShip with a template and palette that matches them. Write love letters, save scenes and moments, log headcanons, and mark dates that matter. It turns a scattered collection of feelings into one beautiful, organized space." },
      { heading: 'Private by Design', body: "These feelings are personal, and YumeShip keeps them that way — everything on-device, no account, no cloud, no sharing. Your vault is yours alone, a quiet place you can open anytime without it being part of a public feed." },
      { heading: 'Keep Your Whole Roster', body: "Few fans stop at one. With Premium you can keep unlimited husbandos and waifus, each with their own dedicated page, so your entire roster has a home in one app." },
    ],
    faqs: [
      { question: 'What is a husbando/waifu app?', answer: 'It is a private app for keeping the anime characters you love close. YumeShip gives each one a dedicated page with letters, headcanons, scenes, and dates.' },
      { question: 'Is it private?', answer: 'Yes. Everything stays on your device with no account, cloud, or sharing.' },
      { question: 'Can I add more than one?', answer: 'Yes. Premium unlocks unlimited characters, each with their own space.' },
    ],
    cta: 'Make a Space for Your Fave',
    datePublished: '2026-06-03',
  },
  {
    appId: 'yumeship',
    slug: 'roleplay-journal-app',
    type: 'guide',
    title: 'Roleplay Journal App — A Home for OCs, Ships & Scenes',
    h1: 'A Roleplay Journal App for Your OCs and Ships',
    metaDescription: 'Keep your OCs, ships, and roleplay scenes in one private space. YumeShip stores character pages, scenes, and headcanons on your device — no account needed.',
    targetKeyword: 'roleplay journal app',
    intro: "If you write OCs, build ships, or keep ongoing roleplay scenes, you know how fast it all sprawls across docs and notes. YumeShip is a private roleplay journal where every character and ship gets a dedicated page, and your scenes, letters, and headcanons stay organized in one place on your device.",
    sections: [
      { heading: 'Character Pages for OCs and Ships', body: "Give each OC or ship a page in YumeShip with its own template and palette. Keep their details, headcanons, and the dynamic between them organized and easy to revisit. Instead of hunting through documents, everything about a character or pairing lives in one coherent space." },
      { heading: 'Scenes and Letters in One Place', body: "Write scenes, message threads, and letters and keep them attached to the characters they belong to. Your roleplay history stays organized by who's involved, so picking a thread back up months later is effortless." },
      { heading: 'Private and Offline', body: "YumeShip keeps everything on your device — no account, no cloud. Your OCs, ships, and scenes are private and always available, even offline, with nothing synced anywhere you didn't choose." },
    ],
    faqs: [
      { question: 'Can I use YumeShip for roleplay and OCs?', answer: 'Yes. Each OC or ship gets a dedicated page for details, headcanons, scenes, and letters, kept privately on your device.' },
      { question: 'Where are my scenes stored?', answer: 'On your device only. YumeShip has no account or cloud, so your roleplay content stays private and offline.' },
      { question: 'How many characters can I make?', answer: 'Free users start with one; Premium unlocks unlimited characters and ships.' },
    ],
    cta: 'Organize Your OCs',
    datePublished: '2026-06-06',
  },
  {
    appId: 'yumeship',
    slug: 'fictional-other-fo-app',
    type: 'guide',
    title: 'F/O App — A Private Journal for Your Fictional Other',
    h1: 'An F/O App for Your Fictional Other',
    metaDescription: 'F/O stands for Fictional Other — and they deserve a space of their own. YumeShip is a private, on-device app for your F/O: letters, headcanons, scenes and dates.',
    targetKeyword: 'f/o app fictional other',
    intro: "F/O — Fictional Other — describes a character you share a personal, loving connection with. That bond is real to the people who feel it, and it deserves somewhere thoughtful to live. YumeShip is an F/O app built around exactly this: a private, on-device space where your fictional other gets a page entirely their own.",
    sections: [
      { heading: 'Built Specifically for F/Os', body: "Unlike a generic notes app, YumeShip understands what an F/O is. Each one gets a dedicated page with a template and palette, plus spaces for love letters, headcanons by category, scenes, and meaningful dates. It's designed around the relationship rather than forcing it into a blank document." },
      { heading: 'A Private, Gentle Space', body: "Connections with an F/O are intimate, and YumeShip keeps them private — everything on your device, no account, no cloud, no sharing. It's a soft, judgment-free place to keep your fictional other close, open only to you." },
      { heading: 'One F/O or Many', body: "Whether you have a single F/O or several, YumeShip has room for all of them. Free users start with one; Premium unlocks unlimited F/Os, each with their own dedicated, beautifully designed space." },
    ],
    faqs: [
      { question: 'What does F/O mean?', answer: 'F/O stands for Fictional Other — a character you have a personal, loving connection with. YumeShip is built specifically for this kind of relationship.' },
      { question: 'Is my F/O space private?', answer: 'Yes. Everything stays on your device with no account, cloud, or sharing — your F/O space is yours alone.' },
      { question: 'Can I have multiple F/Os?', answer: 'Yes. Premium unlocks unlimited F/Os, each with their own page, templates, and palette.' },
    ],
    cta: 'Make a Space for Your F/O',
    datePublished: '2026-06-09',
  },
  
  // ─── Honestly (morning ritual expansion) ─────────────────────────────────
  {
    appId: 'honestly',
    slug: 'vs-stoic',
    type: 'compare',
    title: 'Honestly vs Stoic — Morning Ritual or Mood Journal?',
    h1: 'Honestly vs Stoic: Which Journaling App Fits?',
    metaDescription: 'Honestly vs Stoic compared. Stoic is a flexible mood and reflection journal; Honestly is a structured morning ritual that blocks apps until you finish. See the difference.',
    targetKeyword: 'stoic app alternative',
    intro: "Stoic is a thoughtful journaling app full of prompts, mood tracking, and stoic philosophy exercises. Honestly is narrower and more opinionated: a structured morning ritual — mood, a free-write, affirmations — that locks your distracting apps until you complete it. If you want a flexible reflection toolkit, Stoic shines; if you want a morning habit you can't skip, Honestly is built for that.",
    sections: [
      { heading: 'Open Toolkit vs Structured Ritual', body: "Stoic gives you a deep library of exercises and lets you journal whenever and however you like — powerful, but it leans on your own discipline to show up. Honestly is the opposite by design: a short, fixed three-step morning ritual that takes under three minutes. The structure is the feature — mood first, then a genuinely blank page, then affirmations — removing the 'what do I write?' friction that ends most journaling habits." },
      { heading: 'The App Blocker', body: "Stoic reminds and encourages; it can't stop you from scrolling instead of reflecting. Honestly Premium locks your chosen apps via iOS Screen Time until you finish your ritual. For people whose mornings get hijacked by Instagram before they've had a single thought of their own, that gate is the difference between intending to journal and actually doing it." },
      { heading: 'Which to Choose', body: "Choose Stoic if you love a rich, flexible journaling practice and have the discipline to maintain it. Choose Honestly if you want a guaranteed morning habit — a quick ritual with a visible day streak and mood calendar, enforced by an app-blocking gate. They can even coexist: Honestly for the morning gate, Stoic for deeper reflection later." },
    ],
    comparisonTable: [
      { feature: 'Structured morning ritual', app: 'Yes', competitor: 'Flexible' },
      { feature: 'App blocking until done', app: 'Yes (Premium)', competitor: 'No' },
      { feature: 'Mood check-in', app: 'Yes', competitor: 'Yes' },
      { feature: 'Streak / progress visual', app: 'Day streak & mood calendar', competitor: 'Basic streaks' },
      { feature: 'Philosophy exercise library', app: 'No', competitor: 'Yes' },
      { feature: 'Free to start', app: 'Yes', competitor: 'Yes (limited)' },
    ],
    faqs: [
      { question: 'Is Honestly a good Stoic alternative?', answer: 'If you want a structured, can’t-skip morning ritual with an app-blocking gate, Honestly is a strong alternative. Stoic is better if you prefer a flexible, open-ended journaling toolkit.' },
      { question: 'Does Stoic block apps?', answer: 'No. Stoic is a journaling and mood app. Honestly Premium uses iOS Screen Time to lock distracting apps until you complete your morning ritual.' },
      { question: 'Is Honestly free?', answer: 'Honestly is free to download and use for the core ritual — mood, a free-write, and your first affirmation. Premium (one-time Lifetime purchase or monthly) unlocks the app-blocking gate, full journal history, iCloud sync, and all five affirmations.' },
    ],
    cta: 'Try Honestly Free',
    datePublished: '2026-02-08',
  },
  {
    appId: 'honestly',
    slug: 'vs-five-minute-journal',
    type: 'compare',
    title: 'Honestly vs The Five Minute Journal — App with a Blocker',
    h1: 'Honestly vs The Five Minute Journal',
    metaDescription: 'Honestly vs The Five Minute Journal. Both are quick structured journals; only Honestly locks your distracting apps until you finish your morning ritual. Compared.',
    targetKeyword: 'five minute journal app alternative',
    intro: "The Five Minute Journal popularized the short, structured gratitude practice — and its app brings that to your phone. Honestly is quick in the same spirit, but flips the writing step: instead of fixed prompts, you get a genuinely blank page. It also adds the one thing that makes a morning habit actually stick: Premium locks your distracting apps until you complete the ritual. Here's how they compare.",
    sections: [
      { heading: 'Same Speed, Different Approach to Writing', body: "Both apps are built to take just a few minutes. The Five Minute Journal fills that time with fixed prompts; Honestly fills it with a genuinely blank page — mood first, then write whatever's there, no prompt at all. The difference is also enforcement: The Five Minute Journal trusts you to open it, while Honestly Premium makes your morning apps unlock only after you finish. If your problem isn't the journaling itself but remembering to do it before the day swallows you, Honestly's gate solves it." },
      { heading: 'A Blank Page, Not a Fixed Format', body: "The Five Minute Journal centers on fixed gratitude and intention prompts you fill in each day. Honestly takes the opposite approach for its writing step — no prompt, no rotating questions — bookended by a mood check-in and a few affirmations in your own words. It's less structured, more personal." },
      { heading: 'A Streak You Can See', body: "Honestly turns consistency into a visible day streak and a month-at-a-glance mood calendar, plus a Lock Screen and Home Screen widget so today's affirmation stays visible. That feedback, combined with the Premium app-blocking gate, is designed to keep the habit going long after novelty fades." },
    ],
    comparisonTable: [
      { feature: 'Quick structured format', app: 'Yes', competitor: 'Yes' },
      { feature: 'App blocking until done', app: 'Yes (Premium)', competitor: 'No' },
      { feature: 'Writing prompt', app: 'None — genuinely blank page', competitor: 'Fixed prompts' },
      { feature: 'Mood check-in', app: 'Yes', competitor: 'No' },
      { feature: 'Progress visual', app: 'Day streak & mood calendar', competitor: 'Streaks' },
      { feature: 'Free to start', app: 'Yes', competitor: 'Paid' },
    ],
    faqs: [
      { question: 'Is Honestly like The Five Minute Journal?', answer: 'Both are quick, structured morning journals, but Honestly\'s writing step is a genuinely blank page rather than a fixed prompt. Honestly also adds a mood check-in and, with Premium, an app-blocking gate that locks distracting apps until you finish.' },
      { question: 'Does The Five Minute Journal block apps?', answer: 'No. Honestly is the one that offers app blocking (Premium), using iOS Screen Time to lock your apps until you complete your morning ritual.' },
      { question: 'How long does Honestly take?', answer: 'Under three minutes — a mood check-in, a free-write with no prompt, and a couple of affirmations.' },
    ],
    cta: 'Start Your Morning Ritual',
    datePublished: '2026-02-15',
  },
  {
    appId: 'honestly',
    slug: 'vs-reflectly',
    type: 'compare',
    title: 'Honestly vs Reflectly — Morning Ritual vs AI Journal',
    h1: 'Honestly vs Reflectly: Which Daily Journal Wins?',
    metaDescription: 'Honestly vs Reflectly compared. Reflectly is an AI-guided mood journal; Honestly is a structured morning ritual that blocks apps until you finish. Which fits your day?',
    targetKeyword: 'reflectly alternative',
    intro: "Reflectly uses an AI-driven, conversational approach to daily journaling and mood tracking. Honestly takes a simpler, more disciplined path: a fixed morning ritual that you complete before your distracting apps unlock. Both aim to make journaling a daily habit — they just bet on different mechanisms to get you there.",
    sections: [
      { heading: 'AI Conversation vs Fixed Ritual', body: "Reflectly guides you with AI prompts and a chat-like flow that adapts to your entries. Honestly keeps it deliberately simple and consistent: the same three steps every morning — mood, a genuinely blank page with no prompt, affirmations. Some people love the conversational depth of Reflectly; others find a predictable ritual easier to sustain day after day. Honestly bets on consistency." },
      { heading: 'The Accountability Gate', body: "The defining difference is the app blocker. Reflectly relies on reminders and your own motivation. Honestly Premium locks your distracting apps with iOS Screen Time until the ritual is done, turning 'I should journal' into 'I have to, to get my apps back.' For habit-formers who keep falling off, that gate is decisive." },
      { heading: 'Privacy and Progress', body: "With Premium, Honestly syncs your entries via iCloud across your Apple devices and frames progress as a day streak and a month-at-a-glance mood calendar. If you want an AI companion for reflection, Reflectly leads; if you want a fast, private, enforced morning habit, Honestly is the better fit." },
    ],
    comparisonTable: [
      { feature: 'Structured morning ritual', app: 'Yes', competitor: 'AI-guided' },
      { feature: 'App blocking until done', app: 'Yes (Premium)', competitor: 'No' },
      { feature: 'Writing prompt', app: 'None — free-write', competitor: 'AI-based' },
      { feature: 'Progress visual', app: 'Day streak & mood calendar', competitor: 'Mood stats' },
      { feature: 'iCloud sync', app: 'Yes (Premium)', competitor: 'Account-based' },
      { feature: 'Free to start', app: 'Yes', competitor: 'Yes (limited)' },
    ],
    faqs: [
      { question: 'Is Honestly a Reflectly alternative?', answer: 'Yes, with a different philosophy. Reflectly is an AI-guided mood journal; Honestly is a fixed morning ritual — mood, a free-write, affirmations — with an optional app-blocking gate.' },
      { question: 'Does Reflectly block apps?', answer: 'No. Honestly Premium is the one with an app blocker, using iOS Screen Time to lock apps until your ritual is complete.' },
      { question: 'Does Honestly sync across devices?', answer: 'With Premium, yes — Honestly uses iCloud to sync your entries, mood logs, and streaks across your Apple devices.' },
    ],
    cta: 'Try Honestly Free',
    datePublished: '2026-02-22',
  },
  {
    appId: 'honestly',
    slug: 'journaling-for-mental-health',
    type: 'guide',
    title: 'Journaling for Mental Health — A Gentle Daily Practice',
    h1: 'How Daily Journaling Supports Mental Health',
    metaDescription: 'Journaling can support mental wellbeing when it’s consistent. Honestly makes a daily mood-and-affirmation ritual easy to keep, with a Premium app blocker that protects the habit.',
    targetKeyword: 'journaling for mental health',
    intro: "Research and lived experience both point the same way: a consistent journaling practice can support mental wellbeing — naming your mood, processing the day, noticing what you're grateful for. The hard part is consistency. Honestly is designed to make a gentle daily mental-health ritual something you actually keep, by building it into your morning and protecting it with an app blocker.",
    sections: [
      { heading: 'Name the Mood First', body: "Honestly starts each day by asking how you actually feel — Happy, Confused, Sad, Awful, or Cry. Simply naming an emotion is a small but well-regarded self-awareness practice. Over time, your mood history becomes a gentle record you can look back on to notice patterns in how you've been feeling." },
      { heading: 'Write, Then Affirm', body: "After the mood check-in, Honestly gives you a genuinely blank page — no prompt, no rules — for a short free-write, then a couple of affirmations to close. This mood-write-affirm arc is a compact, sustainable practice that supports a steadier headspace without demanding long, intimidating entries." },
      { heading: 'Consistency, Protected', body: "A mental-health habit only helps if you keep it, and mornings are when intentions quietly collapse into scrolling. Honestly Premium's app-blocking gate holds your distractions until the ritual is done, and a visible day streak rewards your consistency. Honestly is a wellbeing tool, not a substitute for professional care — if you're struggling, please reach out to a qualified professional." },
    ],
    faqs: [
      { question: 'Can journaling help my mental health?', answer: 'A consistent practice of naming moods, writing freely, and affirming yourself can support wellbeing. Honestly makes this a daily ritual that’s easy to keep, protected by an optional app-blocking gate.' },
      { question: 'Is Honestly a therapy app?', answer: 'No. Honestly is a wellbeing and journaling tool, not a substitute for professional mental-health care. If you are struggling, please reach out to a qualified professional.' },
      { question: 'How long does the daily ritual take?', answer: 'Under three minutes — a mood check-in, a free-write with no prompt, and a couple of affirmations.' },
    ],
    cta: 'Start a Gentle Practice',
    datePublished: '2026-03-01',
  },
  {
    appId: 'honestly',
    slug: 'dopamine-detox-app',
    type: 'guide',
    title: 'Dopamine Detox App — Reclaim Your Mornings',
    h1: 'A Dopamine Detox App That Starts With Your Morning',
    metaDescription: 'Start your dopamine detox where it matters most — the morning. Honestly Premium locks high-dopamine apps until you complete a calm mood-and-free-write ritual. Free on iOS.',
    targetKeyword: 'dopamine detox app',
    intro: "A dopamine detox is about reducing the constant hit of high-stimulation apps so calmer, slower rewards feel good again. The morning is the highest-leverage place to start, because the first scroll sets your baseline for the day. Honestly is a gentle dopamine-detox tool: with Premium, it locks high-dopamine apps until you complete a slow, intentional morning ritual.",
    sections: [
      { heading: 'Break the First-Scroll Habit', body: "The instant you open Instagram or TikTok in bed, you've spiked your dopamine before doing anything real — and everything calmer feels dull by comparison. Honestly Premium blocks those apps via iOS Screen Time until you finish your ritual, so your day starts with a slow, low-stimulation activity instead of a feed. It resets your morning baseline." },
      { heading: 'Replace the Hit with a Ritual', body: "A detox works better when you replace the habit rather than just removing it. Honestly fills that space with a calm three-step ritual — mood, a free-write, affirmations — and a visible day streak that builds over time. The slower reward of watching your streak (and your mood calendar) grow is exactly the kind of low-dopamine satisfaction a detox aims to restore." },
      { heading: 'Sustainable, Not Extreme', body: "You don't need to quit your apps forever — just reorder your morning. Once the ritual is done, your apps unlock and you use them normally. Over time, starting the day calm becomes the default, and the constant pull of high-dopamine apps loosens its grip." },
    ],
    faqs: [
      { question: 'Can an app help with a dopamine detox?', answer: 'Yes. Honestly Premium locks high-dopamine apps each morning until you complete a calm ritual, helping reset your baseline and replace the first-scroll habit.' },
      { question: 'Does it block apps all day?', answer: 'No. Honestly blocks apps only until you finish your morning ritual (starting at 4 AM), then they unlock for normal use.' },
      { question: 'What replaces the scrolling?', answer: 'A short mood, free-write, and affirmation ritual, plus a visible day streak — a slower, calmer reward.' },
    ],
    cta: 'Reset Your Mornings',
    datePublished: '2026-03-08',
  },
  {
    appId: 'honestly',
    slug: 'digital-wellbeing-app',
    type: 'guide',
    title: 'Digital Wellbeing App — A Calmer Relationship with Your Phone',
    h1: 'A Digital Wellbeing App for a Calmer Morning',
    metaDescription: 'Honestly is a digital wellbeing app that puts a calm ritual between you and your feeds each morning, using iOS Screen Time to protect your focus. Free on iPhone.',
    targetKeyword: 'digital wellbeing app',
    intro: "Digital wellbeing isn't about deleting your apps — it's about changing your relationship with them so they serve you instead of running you. Honestly improves that relationship at the most important moment of the day: it puts a calm, intentional ritual between you and your feeds every morning, enforced by iOS Screen Time.",
    sections: [
      { heading: 'Intention Before Consumption', body: "Most digital-wellbeing tools just count your screen time after the fact. Honestly Premium intervenes earlier, requiring a short morning ritual — mood, a free-write, affirmations — before your distracting apps unlock. Starting with your own intention rather than someone else's content is the core of a healthier digital life, and Honestly makes it the default." },
      { heading: 'Gentle Structure, Real Boundaries', body: "Honestly pairs a soft, paper-feel ritual with a firm boundary: with Premium, the apps stay locked until you finish. That balance — gentle in tone, firm in mechanism — is what makes the wellbeing change sustainable. It's not punitive; it just ensures the calm part of your morning happens before the noisy part." },
      { heading: 'Visible Progress', body: "A visible day streak, a month-at-a-glance mood calendar, and today's affirmation on your Lock Screen keep your wellbeing practice visible and rewarding. Watching your streak build is a quiet reminder that you're choosing intention over autopilot, day after day. Honestly turns digital wellbeing from a vague goal into a daily, satisfying habit." },
    ],
    faqs: [
      { question: 'What is a digital wellbeing app?', answer: 'It’s an app that helps you build a healthier relationship with your phone. Honestly does this by requiring a calm morning ritual before your distracting apps unlock (Premium).' },
      { question: 'How is Honestly different from Screen Time limits?', answer: 'Instead of a passive timer, Honestly Premium ties your app access to completing an intentional ritual, making the boundary meaningful rather than easy to dismiss.' },
      { question: 'Is it free?', answer: 'Honestly is free to download and use for the core ritual — mood, a free-write, and your first affirmation. Premium (one-time or monthly) adds the app-blocking gate, full history, and iCloud sync.' },
    ],
    cta: 'Build Digital Wellbeing',
    datePublished: '2026-03-15',
  },
  {
    appId: 'honestly',
    slug: 'daily-journal-prompts-app',
    type: 'guide',
    title: 'A Journal App With No Daily Prompts, On Purpose — Honestly',
    h1: 'The Journal App That Skips Daily Prompts on Purpose',
    metaDescription: 'Tired of generic daily journal prompts? Honestly deliberately has none — a mood check-in, a genuinely blank page, and a few affirmations to yourself. Free on iOS.',
    targetKeyword: 'journal app with no prompts',
    intro: "The usual advice for blank-page fear is: use a prompt. So most journal apps hand you a fresh question every day, hoping it removes the friction. Honestly tried the opposite bet: give people a genuinely blank page, but anchor it with a mood check-in first so it's never truly a cold start. For a lot of people, a question to answer is its own kind of friction — this guide is for anyone who's tired of prompts and just wants to write.",
    sections: [
      { heading: 'Why Honestly Has No Prompts', body: "A daily prompt can feel personal on a good day and like homework on a bad one — another question standing between you and just getting something out. Honestly removes it entirely for the writing step: no rotating questions, no 'what made you smile today?' You open the page and it's simply blank." },
      { heading: 'The Mood Check-In Does the Anchoring Instead', body: "Instead of a prompt, Honestly's ritual starts by asking how you actually feel — Happy, Confused, Sad, Awful, or Cry. That single tap gives the blank page context without dictating what you write. Then a few affirmations to close, in your own words, not a stock line the app supplies." },
      { heading: 'A Habit That Sticks Without a Prompt to Lean On', body: "A blank page alone can still be intimidating, so Honestly protects the habit two other ways: a visible day streak and mood calendar keep momentum in view, and Premium adds an app-blocking gate that holds your distractions until you've written. The structure comes from the ritual and the gate, not from being told what to say." },
    ],
    faqs: [
      { question: 'Does Honestly give you a daily journal prompt?', answer: 'No — on purpose. Honestly\'s writing step is a genuinely blank page every morning, with no rotating prompt or question. The mood check-in that comes first is the only anchor.' },
      { question: 'Why would a journaling app not use prompts?', answer: 'Prompts help some people and add friction for others — one more thing to answer instead of a feeling to get out. Honestly bets that naming your mood first, then writing freely, feels more honest than answering a question written by someone else.' },
      { question: 'Is journaling in Honestly quick?', answer: 'Yes. The blank page sits inside an under-3-minute ritual: a mood check-in, the free-write, and a couple of affirmations.' },
    ],
    cta: 'Try the Blank Page Free',
    datePublished: '2026-03-18',
  },

  // ─── Honestly (Reflect & Manifest cluster, 2026-07) ───────────────────────
  {
    appId: 'honestly',
    slug: '369-method-app',
    type: 'guide',
    title: '369 Method App: How to Actually Practice It | Honestly',
    h1: 'The 369 Method App Guide: How to Practice It Properly',
    metaDescription: 'Looking for a 369 method app to write your manifestation 3x, 6x, and 9x a day? Here\'s how the method actually works — and how to anchor your morning three.',
    targetKeyword: '369 method app',
    intro: 'The 369 method is a manifestation ritual built on repetition: you write what you want as if it\'s already true — three times when you wake up, six times in the afternoon, nine times before bed. The numbers trace back to Nikola Tesla\'s fascination with 3, 6, and 9, but the reason people stick with it is simpler. Writing the same intention by hand, several times a day, forces your attention onto it instead of letting it drift. This guide covers how to actually run the method, how to word a statement that lands, and where an app helps — and where it just adds a counter you don\'t need. Honestly isn\'t a purpose-built 369 tracker, but its morning ritual is a natural home for your first three, and its Lock Screen affirmation widget keeps the statement in front of you the rest of the day.',
    sections: [
      {
        heading: 'What the 369 Method Actually Is',
        body: 'The rules are easy to remember. Pick one clear desire and write it out three times first thing in the morning, six times around midday, and nine times at night — the same statement, by hand, in the present tense. Some people phrase it as a goal ("I have..."), others as gratitude ("I\'m grateful for..."), and both are fine. The 3-6-9 count and the times of day are the whole structure; there\'s nothing else to it. The method borrows its numbers from Tesla, who called 3, 6, and 9 the keys to the universe, and it spread through manifestation communities because it\'s concrete. You always know exactly what to do: same words, three sittings, eighteen lines a day. That repeatability is why it outlasts vaguer \'just visualize it\' advice.',
      },
      {
        heading: 'Why Writing It Three Times a Day Works',
        body: 'You don\'t need to believe in cosmic energy for the 369 method to do something useful. Repetition is a plain attention technique. When you write the same sentence eighteen times across a day, you keep steering your focus back to a single priority — and what you pay attention to shapes what you notice, plan for, and act on. Writing by hand slows you down enough to actually mean the words, unlike a thought that flickers past. Spacing the reps across morning, midday, and night spreads the reminder over your waking hours, so the intention doesn\'t get set once and forgotten by 9 a.m. None of this guarantees an outcome. What it reliably does is keep a goal top of mind, which is often the missing piece between wanting something and moving toward it.',
      },
      {
        heading: 'How to Write a 369 Statement That Lands',
        body: 'Word choice matters more than the count. Write in the present tense, as if it\'s already real — \'I am,\' \'I have,\' \'I\'m grateful for\' — rather than \'I want,\' which quietly reinforces the lack. Keep it specific enough to picture: \'I\'m grateful for the steady work I love\' beats \'I want to be successful.\' Attach a feeling where you can, because the emotion is what makes the sentence stick rather than blur into rote copying. Keep it short — one line you can write eighteen times without dreading it. And pick one desire at a time; the method works through focus, and splitting it across five goals dilutes exactly the attention you\'re trying to concentrate. Once your statement feels right, stop editing it. The point is repetition, not wordsmithing.',
      },
      {
        heading: 'Where an App Helps — and Where It Doesn\'t',
        body: 'Plenty of apps sell themselves as 369 counters — tap a button eighteen times, get a reminder buzz at midday and night. Truthfully, the tally is the least important part. A phone counter can even work against you: it turns a focusing exercise into a metric to clear, and it drops you straight into the same device that\'s full of distractions. Pen and paper is still the purest way to run 369. Where a tool genuinely helps is the morning anchor and the all-day visibility — getting the first reps done as part of a routine you already keep, and keeping the statement in view so your later reps have somewhere to return to. That\'s a different job than counting, and it\'s the one worth looking for in an app.',
      },
      {
        heading: 'Using Honestly for Your Morning Three',
        body: 'Honestly isn\'t a dedicated 369 app — there\'s no 3-6-9 counter and no midday or evening reminder, and pretending otherwise would miss the point. Where it fits is the morning three. The ritual runs mood check, a free-write, then a gratitude and manifest step — and that manifest step is where your statement goes, written out as you start each day with the same intention. From there, your affirmation echoes back on the Lock Screen, so the words stay in front of you for the midday six and evening nine you do on your own. A Sprout plant grows across four stages as your streak builds, quiet proof you kept showing up. The core ritual is free forever; Premium adds schedule-based app blocking, iCloud sync, and full journal history if you want them.',
      },
    ],
    faqs: [
      { question: 'What is the 369 manifestation method?', answer: 'You choose one desire and write it in the present tense three times each morning, six times midday, and nine times at night. The numbers come from Nikola Tesla\'s interest in 3, 6, and 9; the practice spread because it gives manifestation a concrete, repeatable structure instead of vague visualization.' },
      { question: 'Does the 369 method actually work?', answer: 'There\'s no scientific guarantee it changes outside events. What it reliably does is keep one goal at the center of your attention all day through repetition, which is often what turns a vague wish into consistent action. Treat it as a focus and intention tool, not magic.' },
      { question: 'How long should you do the 369 method?', answer: 'Most people commit to at least a full cycle of days — often 21 to 45 — since the value is in daily repetition, not a single session. Consistency matters more than the exact number; pick a window you can actually keep and write the same statement every day.' },
      { question: 'What should I write for the 369 method?', answer: 'One short, present-tense line about a single desire, worded as if it\'s already true and tied to a feeling: \'I\'m grateful for the calm I\'ve built into my mornings.\' Keep it specific and stop editing once it feels right — the repetition is the work, not the wording.' },
      { question: 'Can I use a journaling app for the 369 method?', answer: 'You can. An app won\'t beat pen and paper for the raw writing, but it\'s useful for anchoring your morning reps in a routine and keeping the statement visible. Honestly puts your intention in its morning manifest step and echoes it back on your Lock Screen, though it isn\'t a dedicated 3-6-9 counter.' },
    ],
    cta: 'Start Your Morning Manifest Free',
    datePublished: '2026-07-08',
  },
  {
    appId: 'honestly',
    slug: 'manifestation-journal-app',
    type: 'guide',
    title: 'Manifestation Journal App: How to Actually Practice It',
    h1: 'How a Manifestation Journal App Fits Into a Daily Practice',
    metaDescription: 'What a manifestation journal app is and how to write what you\'re calling in. A simple present-tense practice, plus how Honestly turns it into a daily ritual.',
    targetKeyword: 'manifestation journal app',
    intro: 'A manifestation journal is where you write down what you\'re calling into your life, in your own present-tense words, as if it\'s already happening. Not a vision board, not a wish list you read once and forget. It\'s a short daily habit: you name what you want, you write it as though it\'s real, and you notice what\'s already going right. Done honestly, it does two useful things. It gets fuzzy wants out of your head and into specific language, and it points your attention at what you\'re building instead of what\'s missing. You don\'t need to believe in anything supernatural for that to help. This guide covers how the practice actually works, what to write, and how a manifestation journal app like Honestly turns it into something you\'ll return to every morning instead of abandoning by week two.',
    sections: [
      {
        heading: 'What manifestation journaling actually is',
        body: 'Strip away the woo and manifestation journaling is a focusing practice. You decide what you want, then you write it in present tense and first person: "I am," "I have," "I\'m building," rather than "I want" or "I hope." The present tense isn\'t magic. It forces specificity. "I want to be less anxious" stays vague forever, but "I move through my mornings calm and unhurried" tells your brain what you\'re aiming at. Writing it by hand each day keeps the intention in front of you, so your choices during the day quietly line up with it. Think of it as the opposite of doomscrolling: instead of loading your head with everyone else\'s priorities before you\'re awake, you load it with your own. That\'s the whole mechanism. No overpromising required.',
      },
      {
        heading: 'How to write what you\'re calling in',
        body: 'Start with one or two things, not a list of twenty. Pick something specific enough to picture. Write it as if it\'s true now: "I\'m the kind of person who follows through," "My work feels meaningful and I\'m respected for it." Add a line about why it matters to you, because a reason makes it stick. Then, and this is the part people skip, pair each intention with a small piece of evidence it\'s already underway. If you\'re calling in steadier finances, note the one bill you paid early. This keeps the practice grounded instead of delusional. You\'re not pretending; you\'re aiming and tracking. Keep it to a few sentences. A manifestation entry you can finish in three minutes is one you\'ll still be writing in three months.',
      },
      {
        heading: 'Why gratitude belongs in the same entry',
        body: 'Manifestation without gratitude curdles into a list of things you lack. That\'s why the more durable versions of this practice pair the two: you name what you\'re calling in, and you name what\'s already good. Gratitude does the honest bookkeeping so your intentions don\'t read as complaints. In Honestly, this isn\'t a separate app or a second habit to remember. The morning ritual runs mood check, then free writing, then a combined gratitude and manifest step, so both live in one short flow. You log how you actually feel, empty your head onto a blank page, then close by anchoring in what matters and what you\'re building. It\'s designed so the calling-in and the being-grateful happen in the same sitting, which is exactly where they reinforce each other.',
      },
      {
        heading: 'What to look for in a manifestation journal app',
        body: 'A notebook works fine, so an app has to earn its place. Look for three things. First, low friction: if opening it and finishing an entry takes more than a few minutes, you\'ll quit. Second, a structure that includes the manifest step rather than leaving you staring at a blank box. Third, something that keeps you coming back, because manifestation only compounds with repetition. Honestly is built around that last point. Your affirmations echo back to you through the day, and there\'s a Lock Screen affirmation widget, so what you wrote in the morning meets your eye when you\'d otherwise be reaching for a feed. The core ritual, mood, writing, gratitude and manifest, is free forever, which matters for a habit you\'re trying to sustain daily rather than sample once.',
      },
      {
        heading: 'Making it stick past the first week',
        body: 'Most manifestation journals die because nothing marks the difference between a five-day streak and a five-week one. Honestly gives that progress a shape: a Sprout, a plant that grows across four stages the more mornings you show up. It\'s a small thing, but a visible streak turns an abstract intention into a habit you don\'t want to break. If you want to go deeper on any given day, optional reflection and shadow-work prompts are there to push past the surface, useful when your manifestations start feeling rote and you want to interrogate what you\'re really after. And if mornings keep getting hijacked by your phone, premium app blocking can lock chosen apps on a schedule with hard Screen Time blocking, so the ritual happens before the feed does.',
      },
    ],
    faqs: [
      { question: 'Does manifestation journaling actually work?', answer: 'It works as a focusing and habit tool, which is what most people actually need. Writing what you\'re calling in, in present tense, makes vague wants specific and keeps them in front of you so your daily choices line up with them. Pairing it with gratitude keeps it grounded. Treat it as directed attention and follow-through rather than something supernatural, and it earns its place. It\'s not a substitute for action or, where relevant, professional support.' },
      { question: 'How do you write a manifestation journal entry?', answer: 'Pick one or two specific things and write them in present tense, first person: "I am," "I have," "I\'m building." Add a short line on why each matters, then note one small piece of evidence it\'s already underway. Close with something you\'re grateful for. Keep the whole entry to a few sentences so you\'ll do it again tomorrow. Consistency matters far more than length.' },
      { question: 'What\'s the difference between a gratitude journal and a manifestation journal?', answer: 'A gratitude journal records what\'s already good; a manifestation journal writes what you\'re calling in as if it\'s already here. They work best together, which is why Honestly\'s ritual combines them into one gratitude and manifest step. Gratitude keeps manifestation from turning into a list of what you lack, and manifestation gives your gratitude a direction to grow toward.' },
      { question: 'Is there a free manifestation journal app?', answer: 'Yes. Honestly\'s core ritual, mood check, free writing, and the gratitude and manifest step, is free forever, along with mood tracking and your streak. Premium adds app blocking, iCloud sync and backup, and full journal history and calendar. You can build a daily manifestation practice on the free tier without hitting a paywall for the writing itself.' },
    ],
    cta: 'Start your manifestation ritual',
    datePublished: '2026-07-08',
  },
  {
    appId: 'honestly',
    slug: 'morning-manifestation-routine',
    type: 'guide',
    title: 'Morning Manifestation Routine: A 5-Minute Ritual | Honestly',
    h1: 'The 5-Minute Morning Manifestation Routine That Sticks',
    metaDescription: 'A morning manifestation routine you\'ll actually keep: mood check, free-write, gratitude, then manifest in 5-10 minutes, before the feed sets your inputs.',
    targetKeyword: 'morning manifestation routine',
    intro: 'Manifestation gets mocked as magical thinking, but the useful version is simpler: you decide what you want, write it down as if it\'s already true, and prime your brain to notice the moves that get you there before the day hijacks your attention. A morning manifestation routine works because the first inputs of your day set the tone, and right now, for most people, those inputs are a feed. This is a realistic 5-10 minute version you\'ll actually keep: check your mood, free-write to clear the static, note what you\'re grateful for, then manifest. No crystals, no hour-long ritual. Honestly runs exactly this sequence, mood check, free writing, gratitude and manifest, and if you go Premium it keeps your feeds locked on a schedule until the ritual\'s done, so your morning belongs to you first.',
    sections: [
      {
        heading: 'Why Mornings Beat Every Other Time',
        body: 'Whatever hits your brain first in the morning becomes the frame for everything after. Open a feed and you inherit its mood, comparison, outrage, other people\'s priorities, before you\'ve chosen your own. That\'s not a willpower failure; it\'s just what the first inputs of the day do. A morning manifestation routine works by claiming those first minutes deliberately. Before the notifications, you set your own emotional baseline and point your attention at what you actually want. Cortisol is naturally higher just after waking, which makes this a genuinely good window for focus and intention-setting. You don\'t need to wake at 5 a.m. or meditate for an hour. You need the slot between opening your eyes and opening an app, and a simple sequence to fill it.',
      },
      {
        heading: 'The 5-Minute Sequence, Step by Step',
        body: 'Keep it to four steps so it survives busy mornings. First, a mood check: name how you actually feel, one tap or one word. Naming an emotion takes some of its charge and gives you an honest starting point. Second, free-write for a minute or two, whatever\'s in your head, unfiltered, no prompt required. Third, gratitude: two or three specific things you\'re glad exist right now. Specific beats generic; \'the coffee is still hot\' works better than \'my life.\' Fourth, manifest: write what you want as if it\'s already yours. The whole thing runs 5-10 minutes. Honestly builds the app around this exact order, mood check, free writing, then gratitude and manifest, so you\'re not deciding the steps each morning, just doing them.',
      },
      {
        heading: 'How to Actually Write a Manifestation',
        body: 'The mechanics matter more than the mysticism. Write in the present tense, as if the thing is already true: \'I\'m calm in the interview\' beats \'I hope the interview goes okay.\' Present tense trains your brain to treat the outcome as normal and to notice steps toward it. Be specific and be honest, manifest something you can half-believe, not a fantasy you\'ll roll your eyes at. Add the feeling, not just the fact: name how it feels to already have it. And where you can, pair the wish with an action (\'I reach out to one person today\'), so manifestation becomes a nudge toward behavior instead of a substitute for it. One or two lines is plenty. You\'re setting a direction, not writing a contract.',
      },
      {
        heading: 'Free-Writing First: Clear the Static',
        body: 'Manifesting from a cluttered head rarely lands, you end up \'wanting\' whatever you\'re anxious about. That\'s why the free-write comes before the manifest. Spend a minute dumping the static: the worry, the to-do list, the thing you\'re replaying. You don\'t have to solve it, just get it out of your head and onto the page so it stops running in the background. If you want to go deeper on a heavy morning, optional reflection and shadow-work prompts can help you sit with what\'s actually going on. Then, with the noise cleared, gratitude and manifestation have room to be genuine rather than a bypass. Honestly keeps free writing as a blank page by default, with those deeper prompts there when you want them.',
      },
      {
        heading: 'Making It Automatic',
        body: 'A routine you skip does nothing, so design for consistency over intensity. Anchor it to something you already do, the ritual happens right after your alarm, before your feet hit the kitchen. Keep the bar low: a one-line entry still counts. Track the streak so showing up becomes its own reward. In Honestly, a small plant called your Sprout grows across four stages the more mornings you show up, which turns an abstract habit into something you can see. The hardest part is the phone itself, it\'s easier to manifest when Instagram isn\'t one thumb-swipe away. Honestly\'s Premium app blocking locks your chosen apps on a schedule with hard Screen Time blocking, so the feeds stay shut until your morning is yours. Start free, add the lock when you\'re ready.',
      },
    ],
    faqs: [
      { question: 'What is a morning manifestation routine?', answer: 'It\'s a short sequence you run right after waking: check your mood, free-write to clear your head, note a few things you\'re grateful for, then write what you want as if it\'s already yours. The point is to set your own inputs before a feed sets them for you. Five to ten minutes is enough.' },
      { question: 'How long should a manifestation routine take?', answer: 'Five to ten minutes. Manifestation works through repetition, not length, a short ritual you do every morning beats a long one you do twice. Keep each step to a line or two so the routine survives your busiest days.' },
      { question: 'Should you manifest in the morning or at night?', answer: 'Morning has an edge for most people: you set your emotional baseline and your intentions before the day\'s noise arrives. Night journaling is great for processing what happened, but mornings let you point your attention forward before the first notification does it for you. If you can only do one, do mornings.' },
      { question: 'How do you write manifestations that work?', answer: 'Write in the present tense, as if it\'s already true, \'I\'m calm and prepared,\' not \'I hope I\'ll be okay.\' Be specific, pick something you can half-believe, and name how it feels to have it. Where you can, pair it with one small action you\'ll take today so the intention turns into movement.' },
      { question: 'Do you have to journal to manifest?', answer: 'No, but writing helps. Saying it in your head is easy to skip and easy to forget; putting it on the page makes it concrete and gives you something to return to. A quick mood check and free-write first also clears the mental static, so what you manifest is what you actually want.' },
    ],
    cta: 'Start Your Morning Ritual Free',
    datePublished: '2026-07-08',
  },
  {
    appId: 'honestly',
    slug: 'scripting-manifestation-app',
    type: 'guide',
    title: 'Best Scripting Manifestation App 2026 — Honestly',
    h1: 'Scripting Manifestation App — A Blank Page for Writing Your Reality',
    metaDescription: 'Scripting means writing your reality in present tense — and it needs a blank page, not a feed. Honestly is the scripting manifestation app built around one.',
    targetKeyword: 'scripting manifestation app',
    intro: 'Scripting is manifestation\'s most hands-on technique: you write your desired reality in present tense, as if it\'s already true, in enough detail that your nervous system half-believes it. Not "I want a new job" but "I love walking into my office, the light hits my desk, my manager trusts me." The method asks two things of you — a blank page with room to sprawl, and enough privacy to write embarrassingly specific things without an audience. Most manifestation apps hand you a scrolling feed of stock affirmations instead, which is the opposite of scripting. Honestly gives you the blank page. Its free-write step is an open canvas with no template, and the ritual closes on a gratitude & manifest step where you name what you\'re calling in — so your script has a natural home every morning.',
    sections: [
      {
        heading: 'What Scripting Actually Is',
        body: 'Scripting means writing a scene from your desired life in the present tense, as though it already happened. The rules are simple and worth knowing whether or not you ever open an app. Write in first person and present tense — "I am," not "I will." Anchor it in the senses: what you see, hear, and feel in the moment you\'re describing. Add emotion, because the feeling is what your brain encodes, not the wish. And write it as a settled fact rather than a plea; scripting is closer to journaling from the future than asking for anything. A page a day is plenty. The point isn\'t magic — it\'s repeatedly rehearsing a specific identity until your attention, choices, and effort start bending toward it.',
      },
      {
        heading: 'Why a Blank Page Beats an Affirmation Feed',
        body: 'Scripting needs space, and most manifestation apps don\'t give you any. They open on a feed of pre-written affirmations you swipe through — fine for a mood lift, useless for writing your own detailed scene. You can\'t script inside someone else\'s sentence. Honestly\'s free-write step is the opposite: an open page with no template, so your script can run three lines or three paragraphs. Optional reflection and shadow-work prompts are there if you want a nudge on a blank morning, but they stay out of the way when you just want to write. It\'s the closest thing to a private notebook that also keeps your streak and, with Premium, syncs across devices through iCloud backup.',
      },
      {
        heading: 'Close the Script with Gratitude and Manifest',
        body: 'A script lands harder when you end on gratitude and a clear intention, and Honestly builds that into the ritual. After your free-write, the gratitude & manifest step asks you to name what you\'re thankful for and what you\'re calling in — a natural place to distill your longer script into one or two things you actually want. Gratitude does real work here: naming what\'s already good trains your attention to notice more of it, the same muscle scripting exercises. The manifest half turns an abstract wish into a stated intention you see every morning. Between the free-write and the manifest step, you get both the long-form scene and the one-line anchor — the two halves most scripting practices recommend.',
      },
      {
        heading: 'Protect the Morning So You Actually Write',
        body: 'The hardest part of any morning practice isn\'t the writing — it\'s opening Instagram first and losing the next hour. Honestly\'s Premium app blocking is built for exactly that: it locks the apps you choose on a schedule, with hard Screen Time blocking and, in the app\'s words, "no workarounds, no snoozing." Set it for your morning window and the feed simply isn\'t available until you\'ve done your ritual, so the quiet you need for scripting is protected rather than hoped for. This is a Premium feature — the journaling, mood check, and manifest steps are free forever, while app blocking, iCloud sync, and full history come with Premium, as a one-time Lifetime purchase or monthly. If distraction keeps derailing your practice, it\'s the piece worth paying for.',
      },
      {
        heading: 'Consistency Is the Real Mechanism',
        body: 'Scripting works through repetition, not intensity — one vivid page every morning beats a marathon session you never repeat. Honestly makes the streak visible so showing up compounds. A small plant called your Sprout grows as you keep the practice, moving through four stages the longer your streak runs, which turns an invisible habit into something you can watch mature. It\'s gentle pressure, not a guilt trip. Your current streak and mood tracking stay free; the full journal history and calendar, where you can reread months of old scripts, are Premium. Honestly is available in 11 languages, so you can script in the one you actually think in — which matters more than it sounds when you\'re writing in present-tense detail.',
      },
    ],
    faqs: [
      { question: 'What is scripting in manifestation?', answer: 'Scripting is writing your desired reality in present tense, as if it\'s already true, in vivid sensory detail. Instead of listing wishes, you narrate a scene from the life you want — "I am," not "I will" — so the feeling of it becomes familiar. It\'s essentially journaling from the future.' },
      { question: 'How do you write a manifestation script?', answer: 'Write in first person, present tense, and describe what you see, hear, and feel. Focus on the emotion, keep it specific, and state it as a settled fact rather than a request. A single page a day is enough. In Honestly, the free-write step gives you an open canvas to do exactly this.' },
      { question: 'Is there an app for scripting manifestation?', answer: 'Honestly works well for it because its free-write step is a genuine blank page — no template forcing you into someone else\'s words — followed by a gratitude & manifest step to anchor your intention. Journaling and manifesting are free forever; iCloud sync and full history are Premium.' },
      { question: 'Do you have to script every day?', answer: 'Daily is ideal, because scripting works through repetition, not intensity. One short, vivid page each morning beats an occasional long session. Honestly\'s streak and its four-stage Sprout plant are built to make showing up daily feel rewarding rather than like a chore.' },
      { question: 'Does scripting manifestation actually work?', answer: 'There\'s no magic guarantee, but the mechanism is real: rehearsing a specific identity in detail shifts what you notice, choose, and act on. Treat it as focused intention-setting, and pair it with real effort. For anything clinical or overwhelming, a professional is the right support.' },
    ],
    cta: 'Start Scripting This Morning',
    datePublished: '2026-07-08',
  },
  {
    appId: 'honestly',
    slug: 'vs-i-am-affirmations',
    type: 'compare',
    title: 'Honestly vs I Am — Write Your Own Affirmations',
    h1: 'The I Am App Alternative That Uses Your Own Words',
    metaDescription: 'Searching for an I Am app alternative? I Am pushes polished stock affirmations; Honestly makes you write your own words and echoes them on your Lock Screen.',
    targetKeyword: 'i am app alternative',
    intro: 'I Am is one of the easiest ways to add positivity to your day: it sends a steady stream of beautifully written affirmations straight to your notifications and Lock Screen. You pick a few themes, and the good words keep coming — no effort required. That is genuinely useful if what you want is a gentle nudge in the background of a busy life. Honestly takes the opposite bet. Instead of feeding you someone else\'s affirmations, it asks you to write your own — a short morning ritual where you check your mood, free-write, and set an intention. Then those words come back to you on your Lock Screen. This page compares the two honestly: where I Am\'s zero-effort model wins, where writing your own affirmations changes what they actually do, and which approach fits how you want to feel each day.',
    sections: [
      {
        heading: 'Where I Am Genuinely Wins',
        body: 'If you want positivity with near-zero effort, I Am is hard to beat. Its library of curated affirmations is well written and endlessly varied, the themes let you steer the tone, and the notifications mean good words find you without you opening anything. For a lot of people that passive drip is exactly right — a small counterweight to a noisy feed. Honestly asks more of you: a few minutes of writing before you get anything back. If you know you won\'t sit down and journal, an affirmation firehose you never have to think about may serve you better. Credit where it\'s due — I Am makes showing up optional, and that\'s the whole point of it.',
      },
      {
        heading: 'Passive Consumption vs Active Practice',
        body: 'The real split isn\'t features, it\'s what you do. With I Am, you read. The affirmations are polished and universal — which is their strength and their ceiling, because a line written for everyone was written for no one in particular. Honestly makes you the author. In the ritual you name how you actually feel, empty your head onto a blank page, then write what you\'re grateful for and what you\'re calling in. Research on journaling and self-affirmation tends to favor words you generate yourself over words you passively receive, because writing forces you to mean them. If you\'ve scrolled past a hundred perfect affirmations and felt nothing, that\'s the gap Honestly is built to close.',
      },
      {
        heading: 'Your Own Words, Back on Your Lock Screen',
        body: 'Both apps use your Lock Screen — the difference is whose voice is on it. I Am surfaces its stock lines through widgets and notifications. Honestly echoes your daily affirmations back through a Lock Screen affirmation widget, so what you see is something you wrote and meant, not a quote you swiped past. Seeing your own intention resurface hours later lands differently than a generic reminder; it\'s a callback to a moment you actually had. You get the same ambient, glance-and-absorb benefit I Am is loved for, but anchored to your own words instead of a shared library everyone else is also reading.',
      },
      {
        heading: 'A Full Ritual, Not Just Affirmations',
        body: 'I Am is focused: affirmations, delivered well, full stop. Honestly wraps affirmations inside a complete morning ritual. You log your mood, free-write, and do a gratitude-and-manifest step, with optional reflection and shadow-work prompts when you want to go deeper. A Sprout plant grows across four stages as your streak builds, so consistency has something to show for it. Premium adds hard app blocking that locks distracting apps on a schedule with iOS Screen Time, plus iCloud sync and full journal history and calendar. So the choice isn\'t only \'whose affirmations\' — it\'s whether you want a single affirmation stream or a daily practice that affirmations are one part of.',
      },
      {
        heading: 'Which One Fits You',
        body: 'Pick I Am if you want effortless, always-on positivity and you\'re honest that you won\'t journal — its curated stream and notifications are built for exactly that, and there\'s no shame in wanting the easy version. Pick Honestly if reading other people\'s affirmations has stopped moving you and you want the ones on your Lock Screen to be yours: written in your voice, tied to your real mood, backed by a streak and an optional app-blocking gate that makes the habit stick. One is a well-stocked shelf you browse. The other is a notebook you fill — and both are valid depending on how much you want to put in.',
      },
    ],
    comparisonTable: [
      { feature: 'Affirmation source', app: 'Yours — you write them', competitor: 'Curated stock library (I Am)' },
      { feature: 'Effort required', app: 'Active — a short daily ritual', competitor: 'Passive — tap and read' },
      { feature: 'Delivery style', app: 'Lock Screen affirmation widget', competitor: 'Push notifications & widgets (I Am)' },
      { feature: 'Full journaling ritual', app: 'Yes — mood, free-write, gratitude & manifest', competitor: 'No — affirmations only' },
      { feature: 'Progress visual', app: 'Sprout plant & mood calendar', competitor: 'Streaks & themes (I Am)' },
      { feature: 'App blocking', app: 'Yes (Premium)', competitor: 'No' },
      { feature: 'Pricing', app: 'Free core; Premium lifetime or monthly', competitor: 'Subscription (I Am)' },
    ],
    faqs: [
      { question: 'Is there a free I Am app alternative?', answer: 'Yes. Honestly\'s core is free forever — mood check, free-writing, gratitude and manifest, and daily affirmations you write yourself. Premium adds app blocking, iCloud sync, and full journal history and calendar via a one-time lifetime purchase or a monthly plan.' },
      { question: 'What makes Honestly different from the I Am app?', answer: 'I Am delivers curated stock affirmations to your notifications and Lock Screen with no effort needed. Honestly makes you write your own affirmations inside a short morning ritual, then echoes your words back on a Lock Screen widget. It\'s active practice instead of passive consumption.' },
      { question: 'Can I write my own affirmations instead of using preset ones?', answer: 'That\'s the whole point of Honestly. Rather than reading pre-written lines, you set your own intention as part of the gratitude and manifest step each morning, and that affirmation comes back to you on your Lock Screen.' },
      { question: 'Does Honestly send affirmation notifications like I Am?', answer: 'Honestly\'s approach is a Lock Screen affirmation widget that surfaces the words you wrote, rather than a constant stream of push notifications. If you specifically want frequent affirmation pushes with no effort, I Am is built for that.' },
    ],
    cta: 'Try Honestly Free',
    datePublished: '2026-07-08',
  },

  // ─── YumeShip (fandom-journal additions, 2026-07) ─────────────────────────
  {
    appId: 'yumeship',
    slug: 'fictional-crush-app',
    type: 'guide',
    title: 'Fictional Crush App — A Private World for Your Crush',
    h1: 'The Fictional Crush App That Keeps It Just for You',
    metaDescription: 'Crushing on a fictional character is normal — it just needs a home. YumeShip is a private fictional crush app: their profile, your letters, messages from them.',
    targetKeyword: 'fictional crush app',
    intro: 'Having real feelings about a fictional character is one of the most common experiences in fandom — and one of the least talked about out loud. A character from an anime, a game, a drama, or a book gets under your skin, and suddenly you\'re thinking about them on the bus. That\'s fine. The awkward part isn\'t the crush; it\'s that the feelings have nowhere to go. Your notes app feels cold and clinical. Posting about it feels exposed, like leaving your diary open on a train. Telling friends risks the wrong kind of laugh. YumeShip is a fictional crush app built for exactly this gap: a private world on your phone where your crush gets a profile, your letters have a home, and nothing you write ever leaves your device.',
    sections: [
      {
        heading: 'Yes, a Fictional Crush Is Normal',
        body: 'Let\'s clear this up first, because it\'s usually the real question behind the search: developing genuine feelings for a fictional character is common and completely fine. Stories are designed to make you feel things, and sometimes a character lands harder than the plot did. Fandom even has vocabulary for it — F/O (fictional other), comfort character, husbando, waifu — precisely because so many people share the experience. A fictional crush doesn\'t mean you\'ve confused fiction with reality; it means a writer did their job and your imagination did the rest. The feelings are real even if the character isn\'t, and treating them as something to hide usually feels worse than simply giving them a place to exist.',
      },
      {
        heading: 'The Problem: Where Do You Put the Feelings?',
        body: 'A crush generates output — thoughts, scenarios, things you\'d say to them, little what-ifs at 1am. Most people scatter all of it: half-written notes, screenshots buried in the camera roll, drafts they never post. The notes app technically works, but writing a love letter between a grocery list and a Wi-Fi password feels wrong. Posting publicly solves the coldness but creates a new problem: your softest, most honest feelings are now content, visible to coworkers, classmates, and strangers with opinions. What you actually want is a third option — somewhere warm enough to feel like it was made for this, and private enough that nobody else ever sees it. That\'s the gap a dedicated fictional crush app fills.',
      },
      {
        heading: 'Give Your Crush a Place of Their Own',
        body: 'In YumeShip, your crush gets a dedicated profile — a page that\'s theirs, not a note titled "misc." From there you build the world around them: write love letters when you have something to say, log headcanons (the details you\'ve decided are true about them), capture scenarios and what-ifs, and keep track of dates and memories that matter to you. Templates guide you through it, whether you want to get to know them on paper or just write the scene that\'s been living in your head. Everything about them stays in one soft, organized place instead of scattered across your phone — and opening their page feels less like note-taking and more like visiting.',
      },
      {
        heading: 'They Can Show Up for You, Too',
        body: 'A crush that only ever goes one direction eventually feels like shouting into a void. YumeShip closes the loop: you can get notifications from your character — a small "drink some water for me, okay?" appearing on your lock screen — and keep a private message thread with them, so the conversation you imagine has an actual place to happen. When you\'d rather play than write, there are scenario prompts to spark ideas and an incorrect-quotes generator that stars your crush in ridiculous exchanges. None of it pretends the character is real. It just makes the daydream interactive instead of leaving it entirely in your head.',
      },
      {
        heading: 'Nothing Leaves Your Phone',
        body: 'This is the part that makes the whole thing feel safe: YumeShip is fully on-device. No account to create, no cloud your letters sync to, no social feed, no sharing features at all. Your crush\'s profile, your letters, your message thread — all of it lives only on your phone, visible to exactly one person: you. That privacy isn\'t a footnote; it\'s what lets you be honest. You can write the embarrassingly sincere letter, log the headcanon you\'d never say out loud, and keep the whole world as soft as you want it, knowing nobody is ever scrolling past it.',
      },
      {
        heading: 'Start with One Crush, Free',
        body: 'YumeShip is free to start with one ship — one character, one full private world, no payment required to see if it fits. If your heart is less monogamous (most fandom hearts are), Premium unlocks unlimited ships and all templates, billed weekly, monthly, or yearly. Whether it\'s one all-consuming crush or a rotating cast from three different fandoms — anime, otome, manga, or K-pop — each one gets their own page, and all of it stays quietly on your device.',
      },
    ],
    faqs: [
      { question: 'Is it normal to have a crush on a fictional character?', answer: 'Yes — it\'s extremely common. Stories are built to make you feel things, and sometimes a character resonates deeply. Fandom has whole vocabularies (F/O, comfort character, husbando, waifu) because so many people share the experience.' },
      { question: 'Is there an app for fictional crushes?', answer: 'Yes. YumeShip is a private journal built for exactly this: your crush gets a profile, and you can write letters, headcanons, and scenarios, keep dates and memories, and get messages and notifications from them — all on your phone.' },
      { question: 'Can anyone see what I write about my crush?', answer: 'No. YumeShip is fully on-device with no account, no cloud, and no social feed. Everything you write stays on your phone and is visible only to you.' },
      { question: 'Can my fictional crush send me messages?', answer: 'YumeShip includes notifications from your character — like a gentle reminder on your lock screen — and a private message-thread interface, so the connection feels two-way instead of one-directional.' },
      { question: 'Is YumeShip free?', answer: 'Yes, free to start with one ship. Premium unlocks unlimited ships and all templates, with weekly, monthly, or yearly options.' },
    ],
    cta: 'Give Your Crush a Home',
    datePublished: '2026-07-07',
  },
  {
    appId: 'yumeship',
    slug: 'vs-character-ai',
    type: 'compare',
    title: 'YumeShip vs Character.AI — A Private Home for Your F/O',
    h1: 'YumeShip vs Character.AI: A Private Alternative for Your F/O',
    metaDescription: 'Looking for a private Character.AI alternative? YumeShip is an on-device F/O journal — no servers, no filters, no update can rewrite your F/O. Honest comparison.',
    targetKeyword: 'character ai alternative private',
    intro: 'Plenty of yumeshippers live in Character.AI, and for good reason — it talks back. But if you\'ve spent real time there, you know the quiet anxiety underneath: your chat logs sit on someone else\'s servers, a filter or model change can flatten your F/O\'s voice overnight, and a character you\'ve talked to for months can suddenly feel like a stranger wearing their face. YumeShip is not a chatbot, and it doesn\'t pretend to be one. It\'s a private journal for your F/O where you write their voice — headcanons, scenarios, love letters, messages — and every word stays on your device. No account, no servers, no update that can ever rewrite or delete them. This comparison is honest about the trade: Character.AI gives you conversation. YumeShip gives you privacy and permanence.',
    sections: [
      {
        heading: 'Where Character.AI Wins: It Talks Back',
        body: 'Let\'s start with the honest part. Character.AI is an interactive chatbot — you type, and your F/O responds in real time. It improvises, it surprises you, it carries a conversation you didn\'t script. YumeShip does not do that, and nothing in it pretends to. The messages and notifications your F/O sends in YumeShip are ones you wrote yourself, in their voice, ahead of time. If live, unpredictable back-and-forth is the core of your yumeship, Character.AI wins that category outright and YumeShip won\'t replace it. The rest of this comparison is about everything that surrounds the conversation: where your words live, who controls the voice, and what happens to the relationship when a platform changes underneath you.',
      },
      {
        heading: 'The Server Problem: Where Your Words Actually Live',
        body: 'Character.AI is a cloud service. Your conversations happen through an account, and your messages are sent to and processed on the company\'s servers — that\'s simply how any cloud chatbot works. For casual roleplay that\'s fine. For the most intimate writing a yumeshipper does — love letters, self-inserts, what-ifs you\'d never say out loud — it can feel exposed in a way that never fully goes away. YumeShip takes the opposite position: everything is fully on-device. No account, no cloud, no social feed, no sharing. Nothing you write about your F/O ever leaves your phone. There is no server for your words to sit on, because there is no server at all.',
      },
      {
        heading: 'Who Owns Your F/O\'s Voice',
        body: 'On any AI platform, your F/O\'s voice is generated by a model — and models get updated, filtered, and retuned on the company\'s schedule, not yours. Anyone who\'s used an AI companion long-term knows the specific grief of an update changing how a character talks, or a content policy walling off conversations you used to have. You don\'t control it, and you can\'t opt out. In YumeShip, you hold the pen. Your F/O sounds exactly how you write them — every headcanon, letter, and message is yours — so no model update, policy change, or shutdown can alter their voice or take them away. It\'s the difference between renting a character and keeping one.',
      },
      {
        heading: 'What YumeShip Gives You Instead of Chat',
        body: 'YumeShip trades conversation for a world you build. Templates walk you through getting to know your F/O, exploring what-ifs, writing love letters, and tracking dates and memories. Beyond journaling, there\'s an incorrect quotes generator starring your F/O, scenario prompts when you want somewhere to start, polycule bingo, and ship charts with poly dynamics for mapping how it all fits together. A private message-thread interface holds the texts only your F/O would send — written by you — and F/O notifications deliver little lines like "drink some water for me, okay?" right to your lock screen. Albums and self-inserts round out each ship\'s space. It\'s free to start with one ship; Premium unlocks unlimited ships and all templates.',
      },
      {
        heading: 'Honestly? Many Yumeshippers Use Both',
        body: 'This doesn\'t have to be either/or. Plenty of people chat on Character.AI for the improvisation and the company, then keep the canon — the headcanons, the letters, the moments that actually define the relationship — somewhere no filter or model change can touch. That\'s the role YumeShip fills: the permanent, private archive of your yumeship, where your F/O\'s voice is fixed by you rather than generated for you. If you only want live conversation, stay with Character.AI. But if you\'ve ever felt your stomach drop at a model update, the answer isn\'t a better chatbot — it\'s a place that isn\'t one.',
      },
    ],
    comparisonTable: [
      { feature: 'Who writes your F/O\'s voice', app: 'You — every word self-authored', competitor: 'Character.AI\'s model generates it' },
      { feature: 'Live interactive conversation', app: 'No — it\'s a journal', competitor: 'Yes, real-time chat' },
      { feature: 'Where your words are stored', app: 'On your device only', competitor: 'Character.AI servers, via account' },
      { feature: 'Content filters on your writing', app: 'None — it\'s your private journal', competitor: 'Yes, platform content policies' },
      { feature: 'F/O can change after an update', app: 'Never — you control the voice', competitor: 'Possible with model/policy changes' },
      { feature: 'Account required', app: 'No', competitor: 'Yes' },
      { feature: 'Headcanons, love letters, ship charts', app: 'Built in, with templates', competitor: 'Not the focus' },
      { feature: 'Messages & notifications from your F/O', app: 'Yes — pre-written by you', competitor: 'AI-generated replies in chat' },
    ],
    faqs: [
      { question: 'Is YumeShip like Character.AI?', answer: 'No — and that\'s deliberate. Character.AI is a chatbot that generates your F/O\'s replies. YumeShip is a private journal: you write their voice yourself in headcanons, love letters, scenarios, and message threads, all stored on your device.' },
      { question: 'Is there a Character.AI alternative that doesn\'t store chats on servers?', answer: 'YumeShip keeps everything on-device with no account and no cloud — nothing you write ever leaves your phone. The trade-off is that it\'s a journal, not a chatbot, so there\'s no AI conversation.' },
      { question: 'Does YumeShip use AI to write my F/O\'s messages?', answer: 'No. The messages and notifications from your F/O are ones you wrote in their voice. That\'s the point — no model update or filter can ever change how they sound.' },
      { question: 'Can an app update change my F/O the way AI model updates do?', answer: 'No. Your F/O in YumeShip is your own writing stored on your device, so updates can add features but can\'t rewrite a word of their voice or delete them.' },
    ],
    cta: 'Give Your F/O Permanence',
    datePublished: '2026-07-07',
  },
  {
    appId: 'yumeship',
    slug: 'what-is-yumeshipping',
    type: 'guide',
    title: 'What Is Yumeshipping? Meaning, F/O Terms & Why People Ship',
    h1: 'What Is Yumeshipping? The Meaning, the Terms, and Why It Matters',
    metaDescription: 'What is yumeshipping? Yume means dream in Japanese — a loving bond between you and a fictional character. Learn F/O terms and why people self-ship.',
    targetKeyword: 'what is yumeshipping',
    intro: 'If you\'ve found your way to the word "yumeshipping," chances are you already do it — you just didn\'t know it had a name. Yume (夢) is Japanese for dream, and yumeshipping means shipping yourself, or a self-insert version of yourself, with a fictional character you love. That character is your F/O — your fictional other — and the bond can be romantic, platonic, familial, or something entirely your own. If you\'ve ever imagined conversations with an anime character, written a scene where your bias finally notices you, or felt genuinely steadier on a bad day because a character exists, that\'s yumeshipping. It\'s practiced by a large, warm, creative community, and there is nothing embarrassing about it. This guide covers what the word actually means, the vocabulary around it, why people do it, and how shippers keep it all — with zero judgment anywhere.',
    sections: [
      {
        heading: 'Yume Means Dream — the Full Definition',
        body: 'Yumeshipping comes from Japanese fandom culture, where yume joshi (dream girl) and yume danshi (dream boy) described fans who imagined themselves alongside their favorite characters. In English-speaking fandom the idea merged with "shipping" — rooting for a relationship — to give us yumeship: a ship where one half is you. Sometimes that\'s literally you; sometimes it\'s a self-insert, a version of you designed to live inside the story. Either way, the defining feature is the same: the relationship isn\'t between two canon characters, it\'s between a character and the person imagining them. Yumeshipping overlaps heavily with self-shipping — many people use the terms interchangeably — though "yume" tends to signal anime, manga, otome, and k-pop fandom spaces specifically.',
      },
      {
        heading: 'The Vocabulary: F/O, Self-Insert, Canon & More',
        body: 'The community has its own shorthand, and knowing it makes everything click. Your F/O (fictional other) is the character you ship yourself with — the yume equivalent of a partner, best friend, or found family, depending on the bond. A self-insert is the version of you that exists in their world, anywhere from "exactly me" to a styled-up original character. Headcanons are the details you decide are true — how your F/O takes their coffee, what they\'d text you at 2 a.m. Scenarios and what-ifs are the scenes you imagine or write. And when yumeshippers say "make it canon," they mean treating the relationship as real within their own imagined continuity — because in your story, it is.',
      },
      {
        heading: 'Why People Yumeship: Comfort, Creativity, Identity',
        body: 'People yumeship for reasons that are genuinely good for them. Comfort is the big one: an F/O is a steady presence you can return to when the real world is loud — a character who is always patient, always themselves, always there. Creativity is just as central: yumeshipping is quietly one of the most generative fandom practices, producing letters, scenarios, playlists, art, and fully built alternate storylines. And for many shippers it\'s identity work — imagining yourself loved, understood, or brave in a story is a way of rehearsing who you want to be. None of this replaces real relationships; for most people it sits alongside them, the way a favorite book or a long-running daydream does.',
      },
      {
        heading: 'How Yumeshippers Actually Practice It',
        body: 'Yumeshipping looks different for everyone, but a few forms come up constantly. Some shippers write — love letters to their F/O, what-if scenarios, full scenes. Some collect — screenshots, official art, songs that feel like the relationship. Some build — timelines of how you met, headcanon lists, first-date lore, anniversaries worth remembering. Some play — imagined text conversations, incorrect quotes, games with their polycule of F/Os. And plenty keep it entirely internal, a running story in their head that no one else ever sees. All of it counts. The one thing most yumeshippers share is a wish for somewhere private to keep it — because notes apps feel cold, and public feeds feel exposed.',
      },
      {
        heading: 'YumeShip: The Journal Built for Exactly This',
        body: 'YumeShip exists because yumeshipping deserved better than a scattered camera roll. It\'s a private journal made for yumeshippers: write headcanons, scenarios, love letters, and what-ifs about your anime, otome, manga, or k-pop F/O, using templates shaped around how you actually ship — getting to know your F/O, tracking dates and memories, exploring what-ifs. It plays, too: an incorrect-quotes generator starring your F/O, ship charts and poly dynamics, polycule bingo, and messages and notifications that come from your F/O. Everything stays on your device — no account, no feed, no sharing, nobody\'s eyes but yours. Free gets you one ship; Premium unlocks unlimited ships and every template. If this page just put a name to something you\'ve done for years, YumeShip is the home for it.',
      },
    ],
    faqs: [
      { question: 'What does yumeship mean?', answer: 'Yume is Japanese for dream. A yumeship is a relationship — romantic, platonic, or otherwise — between you (or your self-insert) and a fictional character, called your F/O. Yumeshipping is the practice of imagining, writing, and cherishing that bond.' },
      { question: 'What is an F/O?', answer: 'F/O stands for fictional other: the character you ship yourself with. The bond can be romantic, platonic, or familial, and many yumeshippers have more than one F/O for different moods and stories.' },
      { question: 'Is yumeshipping the same as self-shipping?', answer: 'Mostly, yes. Both mean shipping yourself with a fictional character, and many people use the words interchangeably. "Yume" tends to be used in anime, manga, otome, and k-pop fandom spaces, while "self-ship" is the broader fandom-wide term.' },
      { question: 'Is it normal to yumeship?', answer: 'Yes. Imagining yourself alongside characters you love is a common, long-standing fandom practice, and a large community shares it openly. For most people it\'s a source of comfort and creativity that sits happily alongside real-life relationships.' },
      { question: 'Where can I keep my yumeship private?', answer: 'YumeShip is a private, on-device journal built for yumeshippers — headcanons, love letters, scenarios, dates, and playful tools like incorrect quotes and F/O messages, with no account, no feed, and no sharing.' },
    ],
    cta: 'Give Your Yumeship a Home',
    datePublished: '2026-07-07',
  },
];
