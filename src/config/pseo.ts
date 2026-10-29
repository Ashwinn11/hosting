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
    metaDescription: "Weighing Day One alternatives for iPhone? Honestly is a morning journal that keeps your apps asleep until you write. Compare features, privacy, and pricing.",
    targetKeyword: 'day one alternatives iphone',
    intro: "Day One and Honestly: Journal & Reflect are both iPhone journaling apps, but they solve different problems. Day One is a deep long-form journal — a diary, memory keeper, and photo archive you'll build for years. Honestly is a morning journal: a question waits on today's page, you write a few honest lines, and the page goes into this month's book. It's designed to give you a few minutes of your own before the feed takes over. If you're scanning Day One alternatives on iPhone because you want a habit you'll actually keep — not a bigger blank canvas — the difference matters. Day One gives you room to write everything. Honestly gives you a daily prompt, a book for every month, 1,510 affirmations, free reminders, and optional app blocking that keeps the apps you're trying to avoid asleep until you've written. Here's an honest, side-by-side look at where each one wins.",
    sections: [
      {
        heading: 'Journaling Approach',
        body: "Day One is the strongest long-form journal on iPhone, full stop. You get a near-infinite canvas: attach photos, log location and weather, tag entries, use templates and daily prompts, and search years of history instantly. If your goal is a rich, searchable life archive, Day One is hard to beat. Honestly takes a different bet. It opens on today's page with a question already waiting — swap it for another from the prompt library, or write your own with Premium. Write three lines or three pages, add a photo, a doodle or a sticker, and tap the face to note how you feel. When you're done, the page goes into this month's book. The point is a page you'll come back to every morning, not a memoir. Pick Day One for depth and permanence. Pick Honestly for a daily habit that survives busy mornings.",
      },
      {
        heading: 'App Blocking',
        body: "Day One has no app-blocking features — and it isn't trying to. Honestly Premium uses Apple's Screen Time to keep the apps you choose, like Instagram and TikTok, asleep each morning until today's page is written. This is the biggest practical gap between the two. If you reach for your phone and open a feed before you're even out of bed, no journal — however elegant — will change that on its own, because the friction is missing. Honestly supplies it: write your page and your apps wake up for the rest of the day. Blocking is a Premium feature, not part of the free core. If accountability is the whole reason you're leaving Day One, this is the deciding factor.",
      },
      {
        heading: 'Affirmations and Lock Screen',
        body: "Day One's widgets are mainly reminders and on-this-day recall — useful nudges to open the app. Honestly brings a different kind of daily nudge: 1,510 affirmations across 16 topics you choose, with one line a day on your Home screen, in free affirmation reminders, and on Home Screen and Lock Screen widgets with Premium. With Premium you can also add affirmations in your own words. For a morning practice, that small loop matters: a kind, believable line keeps showing up through the day. Day One is better if you want photo memories surfaced from years past. Honestly is better if you want a few honest words kept in front of you today.",
      },
      {
        heading: "Streaks, Books, and History",
        body: "Day One tracks streaks and shows a calendar of your entries — solid, if understated. Honestly makes your writing feel like it's adding up to something: every page goes into this month's book, and each month gets its own cover — one of 23 designs, or one of your photos. Your streak counts the mornings you show up, and a mood calendar shows each month at a glance. This month's book is free to read; earlier months, search, and editing past pages come with Premium, so if long-term look-back matters to you, factor that into the price comparison. Day One puts almost everything behind its own subscription too. The difference is motivational design: Honestly is built to make you want tomorrow's page, not just to store yesterday's.",
      },
      {
        heading: "Backup, Privacy, and Pricing",
        body: "Day One syncs your journal through its own end-to-end encrypted service, with mature apps across platforms — a real advantage if you want your archive everywhere. Honestly keeps your pages on your iPhone, with no account and no analytics or ad trackers. With Premium you can back up to your own private iCloud and restore on a new phone; backup is manual rather than continuous sync. On price, Day One is subscription-based. Honestly is free to start, with Premium as a one-time Lifetime purchase or a yearly or monthly plan — worth weighing if you'd rather pay once than subscribe forever. It's available in 13 languages. Choose Day One for a battle-tested, cross-platform archive; choose Honestly for a private, on-device morning journal with a pay-once option.",
      },
    ],
    comparisonTable: [
      { feature: "Daily prompt on the page", app: "Yes (swap anytime; write your own with Premium)", competitor: "Templates and prompts" },
      { feature: "App blocking", app: "Yes (Premium, until you write)", competitor: "No" },
      { feature: "Affirmations", app: "1,510 across 16 topics, plus widgets (Premium)", competitor: "No" },
      { feature: 'Long-form journaling & photos', app: 'Basic', competitor: 'Yes (primary strength)' },
      { feature: "A book for every month", app: "Yes (23 cover designs or a photo)", competitor: "Multiple journals" },
      { feature: "Full history & calendar", app: "This month free; full history Premium", competitor: "Included in plan" },
      { feature: "Backup", app: "Manual iCloud backup (Premium)", competitor: "End-to-end encrypted sync" },
      { feature: "Pricing", app: "Free core; Lifetime, yearly or monthly", competitor: "Subscription" },
    ],
    faqs: [
      { question: 'Is Honestly a good Day One alternative?', answer: "It depends on what you want. Honestly: Journal & Reflect is a strong Day One alternative if your goal is a short daily morning page — a question waiting, a few honest lines, a book for every month — with app blocking and affirmations to carry into the day. If you want a deep long-form archive with photos and cross-platform sync, Day One is still the better tool." },
      { question: 'What morning journal app blocks social media on iPhone?', answer: "Honestly Premium uses Apple's Screen Time to keep apps like Instagram and TikTok asleep each morning until you've written today's page. Day One has no app-blocking features. Blocking on Honestly is part of Premium rather than the free tier." },
      { question: 'Which is better for a morning routine — Day One or Honestly?', answer: "Choose Day One if you want an open, long-form journal and a searchable life archive. Choose Honestly if you want a question waiting each morning, a book that fills as you write, and app blocking to keep you off feeds until you've written. Honestly is the more habit-focused of the two." },
      { question: 'Is Honestly free, and what costs extra?', answer: "Honestly is free to start: the daily prompt, your page, month books and their covers, mood check-ins, the affirmation library, and journal and affirmation reminders. Premium adds app blocking, your own prompts and affirmations, 35 page themes, widgets, full history, and iCloud backup, as a one-time Lifetime purchase or a yearly or monthly plan." },
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
    metaDescription: "Build a morning journaling routine that sticks: one question, a few honest lines, and a small boundary with your phone, so you start the day clear, not scrolling.",
    targetKeyword: 'morning journaling routine',
    intro: "A morning journaling practice can steady your whole day, but starting one feels heavier than it should. Five pages? Bullet points? How long is enough? The truth is that a routine only sticks when it is small enough to repeat and clear enough to finish. The most reliable version is light: answer one question, write a few honest lines, and close with an intention for the day. That is the whole thing, and it can take five minutes. This guide covers why morning journaling works, how to build it into a habit you actually keep, and how Honestly sets up the same routine so a question is already waiting each morning.",
    sections: [
      {
        heading: 'Why Morning Journaling Works',
        body: 'Journaling right after you wake puts you in charge of your day before notifications, email, and everyone else\'s priorities take over. When you empty your head onto a page first, you notice what you are actually feeling instead of reacting to the first thing that pings you. You do not need an hour or a leather notebook for this. A few honest sentences about how you feel and what matters today is enough to shift your attention from scrolling to intention. The point is not to produce good writing. It is to give yourself a quiet moment of clarity that the rest of the day rarely offers, and to start from a place you chose rather than one handed to you by a feed.',
      },
      {
        heading: 'How the Habit Actually Forms',
        body: "Forget chasing a magic number of days. Habits take hold when you make them easy to start and hard to forget, not when you hit some deadline. The most dependable trick is anchoring: attach journaling to something you already do without thinking, like your first coffee or right after you silence your alarm. Keep the bar embarrassingly low so that on tired mornings you still show up, even for one line. Consistency beats intensity every time; five quiet minutes daily will outlast one heroic hour you never repeat. In Honestly, every page goes into this month's book and your streak counts the mornings you show up, giving the habit a visible reason to keep going on the mornings motivation runs thin.",
      },
      {
        heading: 'What to Write About Each Morning',
        body: "Blank-page dread ends most routines, so structure the start without over-scripting it. Begin with one question, so you are never staring at nothing, then write whatever is actually there, even if it is messy or one sentence long. Notice how you feel and name it. Finish by setting an intention for the day — one thing you want to protect, try, or let go of. That last step matters more than it looks, because you cannot move toward a day you never bothered to picture. Honestly puts a new question on your page every morning from its prompt library; swap it if it doesn't fit, or write your own with Premium. Tap the face at the top to note your mood, and the rest of the page is yours.",
      },
      {
        heading: 'Protecting the Ritual From Your Phone',
        body: "The biggest threat to a morning routine is the phone sitting next to your bed. One reflex tap and you are in someone else's feed before you have had a single thought of your own. If willpower alone were enough, you would already be journaling. Honestly's Premium app blocking uses Apple's Screen Time to keep the apps that hijack your mornings asleep until you've written today's page. Write it and they wake up for the rest of the day. That means the time you set aside for yourself is actually protected, so the routine happens before the noise instead of losing to it. It is optional, but it turns a good intention into a boundary your phone respects.",
      },
      {
        heading: 'Making It Stick',
        body: 'Start smaller than feels serious. Aim for a few honest lines, not a perfect entry, because perfection is what makes people quit by day four. Do it at the same trigger every morning so you stop deciding whether to, and let your streak carry you on low days. Track your mood over a few weeks and you will start seeing patterns you could never feel in the moment. And if you miss a morning, just resume the next one; one gap does not erase the habit, but restarting immediately keeps the momentum alive. The goal was never a flawless record. It was starting each day a little more honestly than the last.',
      },
    ],
    faqs: [
      { question: 'How long should a morning journal entry be?', answer: 'A few minutes is plenty. Journaling works best when it is brief and consistent rather than long and sporadic. A handful of sentences covering your mood, whatever is on your mind, and one intention for the day is enough to feel the benefit and keep the habit repeatable.' },
      { question: 'What should I journal about each morning?', answer: "Start with one question so you are not facing a blank page, then write whatever is actually there. Note how you feel, and finish by setting one intention for the day. Honestly puts a new question on your page every morning, and you can swap it or write your own." },
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
        body: "Apps like Day One focus on journaling as an archive — a diary, a memory keeper, a photo journal. Honestly is built around the morning habit: a question waits on today's page, every page goes into this month's book, and with Premium your chosen apps stay asleep until you've written. Some people want pure journaling; others want journaling with built-in accountability.",
      },
      {
        heading: 'Free vs Paid Journaling Apps',
        body: "Most good journaling apps charge for backup, custom prompts, or full history. Honestly is free to start, with the daily prompt, month books, mood check-ins, affirmations, and reminders included. Your choice depends on whether you value cross-device sync, depth of features, or a habit that sticks.",
      },
      {
        heading: 'Syncing, Privacy, and Data Ownership',
        body: "Your journal entries are personal data. Some apps keep entries on your device; others sync to their own cloud. Choose based on your comfort with privacy. Honestly stores your pages on your iPhone with no account, and lets you back them up to your own private iCloud with Premium.",
      },
      {
        heading: 'Building Your Journaling Habit',
        body: 'The app is just a tool — the real work is showing up. Start small (five minutes). Use prompts. Track your streak. Share your commitment. The best app is the one that removes friction and celebrates consistency.',
      },
    ],
    faqs: [
      { question: 'What is the best app for daily journaling?', answer: "The best journaling app is one you'll use daily. Honestly works because a question is already waiting each morning, a few honest lines count as a page, and with Premium your apps stay asleep until you've written — built-in accountability." },
      { question: 'Are journaling apps good for mental health?', answer: 'Yes. Daily reflection reduces anxiety and improves emotional awareness. The app just needs to get out of your way and help you establish the habit.' },
      { question: 'Should I use a journaling app or pen and paper?', answer: 'Both work. Digital journaling is convenient and syncs across devices. Paper is more tactile. Choose whatever you\'ll actually do consistently.' },
      { question: 'Which journaling app has the best privacy?', answer: "Look at where your entries live and who can read them. Day One offers end-to-end encrypted sync. Honestly keeps your pages on your iPhone with no account and no analytics, and backs up only to your own iCloud if you choose." },
      { question: 'Is there a free journaling app worth using?', answer: "Yes. Honestly is free to start, with the daily prompt, your page, month books, mood check-ins, the affirmation library, and reminders included. Premium adds app blocking, full history, iCloud backup, widgets, and more." },
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
    metaDescription: "Create a morning routine that lasts. Honestly Premium keeps your chosen apps asleep until you've written today's page, making consistency automatic.",
    targetKeyword: 'build morning routine habit',
    intro: "You know a morning routine changes your day. But you can't stick to it. You wake up, open Instagram, and it's gone. Honestly Premium keeps your apps asleep until you've written today's page. Consistency becomes automatic.",
    sections: [
      {
        heading: 'Why Most Morning Routines Fail',
        body: 'Intention fails without friction. Your phone is right there. The urge to check it is stronger than your commitment to your ritual. You need a system that makes the ritual harder to skip than the apps are to access.',
      },
      {
        heading: "The Five-Minute Page That Actually Works",
        body: "A question is already waiting → write a few honest lines → tap the face for how you feel → done. That's it. No hour-long journaling. No cold plunges. Just a few minutes of your own while your apps stay asleep. Then your page goes into this month's book and today's affirmation arrives. The simplicity is why it works.",
      },
      {
        heading: 'App Blocking Makes It Automatic',
        body: "With Premium, the apps you choose won't open until today's page is written. Not “shouldn't.” Can't. This removes the decision from the equation. After a few weeks of writing first, it becomes automatic.",
      },
    ],
    faqs: [
      { question: 'How long does it take to form a morning routine habit?', answer: "Research suggests anywhere from about 21 to 66 days, depending on the person and the habit. Honestly Premium's app blocking helps by removing the friction that usually kills a new routine." },
      { question: 'What if I\'m not a "journaling person"?', answer: "Honestly doesn't ask for an essay. A question is waiting on your page, a few honest lines count, and you tap a face to note your mood. It takes a few minutes." },
      { question: 'Can I customize the ritual?', answer: "Yes. Swap the day's question for another from the prompt library, write your own prompts and affirmations with Premium, and choose when your journal and affirmation reminders arrive. The page itself is yours — write as much or as little as you like." },
    ],
    cta: 'Lock In Your Morning Routine',
    datePublished: '2026-06-13',
  },

  {
    appId: 'honestly',
    slug: 'break-social-media-phone-addiction',
    type: 'guide',
    title: 'How to Stop Doomscrolling in the Morning (For Good)',
    h1: 'How to Stop Doomscrolling in the Morning — What Actually Works',
    metaDescription: "How to stop doomscrolling in the morning: simple steps that break the first-scroll habit, plus a short journaling routine and app blocking to make it stick.",
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
        body: "Removing a habit leaves a gap, and gaps get refilled fast — usually by the same feed. So replace the scroll instead of just resisting it. A short, low-stimulation routine works because it gives your hands and attention somewhere to land while your brain warms up. Honestly is built around exactly this: a question waiting on today's page, a few minutes of writing to empty your head before the world fills it, and a one-tap mood check. When you're done, today's affirmation gives you something kinder to carry into the day. It takes a few minutes, asks nothing of your groggy self except honesty, and leaves you calmer than any feed would. The point isn't productivity — it's starting the day on your terms.",
      },
      {
        heading: 'Make the First Scroll Impossible',
        body: "Distance and a routine help, but on a rough morning you'll still find the phone and open the app anyway. To close that gap, remove the choice. Honestly Premium uses Apple's Screen Time to keep the apps you pick — Instagram, TikTok, X, whatever pulls you — asleep each morning until you've written today's page. Tap the icon and the feed simply doesn't open. Calls, texts, and maps keep working, so you're not cut off from anything that matters. Because it's enforced at the system level rather than relying on you to behave, it holds up precisely when your willpower doesn't. Once your page is written, everything wakes up and you use your apps normally. You're not banning them — you're protecting the stretch of the day doomscrolling does the most damage.",
      },
      {
        heading: 'Let the Streak Carry You Past Week Two',
        body: "The first week of any change is the hardest, and doomscrolling has weeks of momentum behind it. What gets you past the dip is a slower reward to replace the fast one you gave up. In Honestly, each morning you show up adds a page to this month's book, your streak counts the days, and a mood calendar shows how you've been feeling. It's a quiet, low-dopamine kind of satisfaction, which is exactly the point: you're retraining your brain to feel good about patience instead of stimulation. Miss a day and you simply pick it back up; the goal is a pattern, not perfection. By the time this month's book has a few weeks of pages in it, the morning routine feels more like yours than the scroll ever did.",
      },
    ],
    faqs: [
      { question: 'Why do I doomscroll first thing in the morning?', answer: 'Because your self-control is at its lowest right after sleep while your craving for novelty is high, and the phone is usually within arm\'s reach. It\'s a design problem, not a discipline problem — which is why changing your environment works better than trying harder.' },
      { question: 'How do I stop scrolling the moment I wake up?', answer: "Start by moving your phone across the room and replacing the scroll with a short, calmer routine so there's something to do instead. If that isn't enough, use app blocking to make the feed genuinely unavailable until you've done your routine. Honestly Premium handles that last part, keeping your chosen apps asleep until today's page is written." },
      { question: 'Does app blocking actually stop doomscrolling?', answer: "It works when it can't be bypassed in the moment. Honestly Premium uses Apple's Screen Time, so your chosen apps won't open until today's page is written. Enforcement at the system level is what makes it hold when willpower doesn't." },
      { question: 'What should I do instead of scrolling in the morning?', answer: "Anything slower that gives your attention a place to land: water, daylight, a few pages, or a brief journaling routine. Honestly's free daily page — one question, a few honest lines, a mood check — takes a few minutes and leaves you calmer than a feed would." },
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
        body: "Anxiety thrives on repetition. The same worry circles because your brain keeps flagging it as unresolved. Free-writing interrupts that by moving the thought out of your head and into a fixed form. Set a timer for three to five minutes and write whatever the anxiety is saying — unfiltered, unpunctuated, no editing. Don't argue with it or solve it yet. Just transcribe. When the worry exists as words you can reread, it loses the shapeless quality that made it feel enormous. You'll often find the spiral was three real concerns wearing one big scary coat. That's the point: a page lets the mess out without demanding you organize it first. In Honestly, today's page works the same way: a question waits at the top if you want a starting point, but you can ignore it and just write.",
      },
      {
        heading: 'Name the Mood Before You Write',
        body: "Starting a blank page while anxious is hard — the cursor blinks and you freeze. Naming your mood first solves this. Before you write a sentence, pick the word that fits how you actually feel: anxious, wired, dread, flat, fine. Labeling an emotion is a small act of regulation on its own; it nudges the feeling from the reactive part of your brain toward the part that can reason about it. It also gives your free-write a starting line — you're no longer writing from nothing, you're writing from 'here's where I am.' In Honestly, the face at the top of every page lets you name your mood with one tap — Happy, Confused, Sad, Awful, or Cry — and every option is honest, including the low ones. Naming 'awful' is allowed, and it's often the most useful place to begin. The goal isn't to feel better on command — it's to feel clearly, which is where the writing gets easier.",
      },
      {
        heading: 'Close by Grounding in Gratitude',
        body: "Anxiety narrows attention to threat. Gratitude widens it back. After you've emptied the spiral, spend a minute naming two or three things that are steady or good right now — not forced positivity, just true and small. Warm coffee. A text from a friend. The fact that the thing you dreaded yesterday didn't actually happen. This isn't about canceling the worry; it's about reminding your nervous system that the worry isn't the whole picture. Ending on something steady also changes how you carry the session into your day — you close the page calmer than you opened it, rather than stewing in what you just wrote. In Honestly, finishing the page brings today's affirmation — a short, believable line from topics like Calm or Worry & fear — so the session lands somewhere steadier instead of leaving you mid-spiral. It's a small structural trick, but the order matters: spill first, then steady.",
      },
      {
        heading: 'Make It a Five-Minute Morning Ritual',
        body: "Techniques only relieve anxiety if you actually use them, and mornings are when anxiety tends to be loudest — the mind catastrophizes before the day gives it any real reason to. Anchoring the three steps to a fixed time turns them from a coping tool you forget into a ritual you reach for automatically. Keep it short: mood, a few minutes of free-writing, a line of gratitude. Five minutes is enough. Honestly keeps it to one page so you're not deciding what to do next, and every page goes into this month's book, which gives the habit a gentle reason to return. A free journal reminder only arrives on mornings your page is still blank, and affirmation reminders can bring a steadier line later in the day. If mornings aren't your window, the same three steps work any time you feel the spiral starting.",
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
    metaDescription: "Looking for the best morning routine habit app? Honestly runs on one short page — a question waiting, a few honest lines — plus a book for every month and Premium app blocking.",
    targetKeyword: 'best morning routine habit app',
    intro: "Search “best morning routine app” and you get two kinds of results: bloated habit-trackers with fifty toggles, and pretty apps you open twice and forget. The best morning routine habit app is really just the one you reopen on day thirty — which means it has to be fast, hard to skip, and built around a routine instead of an ever-growing checklist. This guide covers what separates an app that sticks from one that guilt-trips you, then shows how Honestly is built around exactly that: one short page each morning with a question already waiting, a book for every month that fills as you write, free reminders, and optional Premium app blocking to keep your morning yours before the feed takes it.",
    sections: [
      {
        heading: 'What Actually Makes a Morning Routine App Work',
        body: 'Most morning routine apps die on your home screen for the same reason: they ask too much. A wall of habits to check off, prompts to answer, streaks across a dozen categories. The best morning routine habit app does the opposite — it keeps the entry cost low enough that you reopen it on a groggy Tuesday, not just during the motivated first week. Look for three things: a ritual short enough to finish before your coffee cools, some form of accountability so willpower isn\'t the only thing between you and the feed, and visible momentum that rewards showing up. Speed, friction, feedback. An app that nails those beats a feature-packed tracker you quit by day ten.',
      },
      {
        heading: 'A Ritual, Not a Growing Checklist',
        body: "Honestly is built around one page a day. A question is already waiting at the top; swap it if it doesn't fit, or write your own with Premium. Write a few honest lines, tap the face to note your mood, and you're done. Same shape every morning. The repetition is the point — you're not deciding what to do, you're just doing it. There's no expanding checklist and no habit categories to maintain. Over weeks, that sameness is what turns the routine into something automatic, and a mood calendar lets you see the patterns you'd otherwise miss.",
      },
      {
        heading: 'Accountability for When Willpower Runs Out',
        body: "Intention rarely survives contact with your Lock Screen — the feed is one tap away and it wins the groggy moments. That's the gap most morning routine apps leave open. With Honestly Premium, your chosen apps — Instagram, TikTok and the rest — stay asleep with Apple's Screen Time until you've written today's page. It's the difference between “shouldn't check your phone” and “can't.” Instead of leaning on discipline you don't have at 7 a.m., you put the decision on rails so the routine happens before the scroll does. App blocking is a Premium feature.",
      },
      {
        heading: 'Momentum You Can Actually See',
        body: "Accountability gets you started; momentum keeps you going. Every page you write goes into this month's book, and every month gets its own cover, so the habit literally adds up on your shelf. Your streak counts the mornings you show up — a gentler nudge than a red broken-streak badge. Today's affirmation follows you past the app in a free reminder, and on your Home Screen and Lock Screen with Premium widgets. This month's book is free to read; earlier months and search are part of Premium, for when you want to look back across the whole arc.",
      },
      {
        heading: 'Free to Start, Premium to Lock In',
        body: "The daily page is free — the prompt, your writing, mood check-ins, month books and their covers, the affirmation library, and journal and affirmation reminders. You can build the whole habit without paying anything. Premium adds the parts that make it durable: app blocking, your own prompts and affirmations, 35 page themes, widgets, full history, and iCloud backup. It's a one-time Lifetime purchase or a yearly or monthly plan, so you can pay once rather than renting the habit indefinitely. The app is available in 13 languages. Start free, and only upgrade when the routine has earned its place in your morning.",
      },
    ],
    faqs: [
      { question: 'What is the best morning routine app?', answer: "The best one is the app you actually reopen after the first week — which usually means the shortest, hardest-to-skip one. Look for a quick routine, real accountability, and visible momentum. Honestly focuses on exactly that: one short page with a question waiting, a book that fills as you write, and optional Premium app blocking to protect the time." },
      { question: 'Do morning routine apps actually work?', answer: "They work when they lower the effort to start and raise the cost of skipping. A routine you finish in a couple of minutes beats an ambitious one you abandon. Honestly keeps it to one short page, and Premium app blocking removes the easiest excuse — reaching for your phone instead of writing." },
      { question: 'What\'s the difference between a morning routine app and a habit tracker?', answer: "A habit tracker is a list you maintain; the more you add, the more there is to fail at. A morning routine app runs one repeatable routine you just complete. Honestly is the second kind — the same short page every morning, so there's nothing to configure and nothing to fall behind on." },
      { question: 'Is Honestly free?', answer: "Honestly is free to start: the daily prompt, your page, month books and their covers, mood check-ins, the affirmation library, and journal and affirmation reminders. Premium adds app blocking, your own prompts and affirmations, 35 page themes, widgets, full history, and iCloud backup, as a one-time Lifetime purchase or a yearly or monthly plan." },
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
    metaDescription: "Picking the best anxiety journaling app? Look for low friction, privacy, and mood tracking. See how Honestly's daily page helps you set worry down each morning.",
    targetKeyword: 'best anxiety journaling app',
    intro: "The best anxiety journaling app isn't the one with the most features — it's the one you'll actually open on the morning your chest is tight and your mind won't slow down. When you're comparing options, three things matter more than the feature list: low friction, so anxiety doesn't talk you out of starting; real privacy, so you can be honest; and mood tracking, so you can see patterns instead of just reliving them. Honestly is built around exactly that. You open today's page, tap a face for how you actually feel, and write before the day fills your head. It's non-clinical and it won't replace a therapist, but as a daily place to set the worry down, it holds up. Here's what to look for in an anxiety journal app — and where Honestly fits.",
    sections: [
      {
        heading: 'What Actually Matters in an Anxiety Journal App',
        body: 'Skip the feature comparisons for a second. On an anxious morning, the app that helps is the one that asks almost nothing of you. Three things separate a journal you\'ll keep from one you\'ll delete. First, low friction — if opening it feels like homework, you won\'t reach for it when you need it most. Second, privacy — you can\'t be honest about a spiraling thought if part of you is performing for an audience or wondering where the words go. Third, mood tracking — anxiety feels random until you can see it plotted, and then patterns emerge you can actually work with. A gentle, non-clinical tone matters too. You want a page that meets you where you are, not one that grades your feelings.',
      },
      {
        heading: 'Low Friction Beats a Long Feature List',
        body: "The best anxiety journaling apps get out of your way. Honestly opens straight on today's page: tap the face to log how you feel, and a question is already waiting if you want somewhere to start, so you're emptying your head instead of filling in a form. That order matters when you're anxious: naming the feeling first lowers the stakes of the blank page, and by the time you're writing, the hardest part is behind you. There's no daily word count and no streak-shaming if you miss a day — your page simply waits for tomorrow. Five honest minutes beats a perfect entry you never write.",
      },
      {
        heading: 'Mood Tracking Turns Anxiety Into Patterns',
        body: "A single anxious morning tells you little. Thirty of them, plotted, tell you a lot — which days spike, what tends to precede them, whether things are trending calmer than they feel. Honestly logs your mood with every page and shows it back as a calendar, so the fog becomes something you can read. That's the quiet power of tracking: anxiety stops feeling like a random ambush and starts looking like a pattern you can plan around. This month's mood calendar and your streak are free; earlier months and search come with Premium if you want to look further back across your whole journey.",
      },
      {
        heading: 'Privacy Is Non-Negotiable',
        body: "You can't write honestly about a fear if some part of you is guarding it. That's why privacy belongs at the top of your checklist, not the bottom. Honestly lives on your iPhone — no account, no public feed, no followers, no analytics or ad trackers. If you want your pages backed up, you can save a copy to your own private iCloud with Premium, but the default is simply your journal, on your phone, for you. When the page feels genuinely private, you write the true thing instead of the acceptable version — and the true thing is usually the one that actually loosens anxiety's grip.",
      },
      {
        heading: 'Room to Go Deeper — and to Remove Triggers',
        body: "A blank page is enough on hard days, but some mornings you want more to hold onto. Honestly's prompt library has gentler questions for heavy mornings — “What would a good friend say to you about where you are right now?” — and you can swap today's question for one of them. Choose affirmation topics like Calm or Worry & fear, and a believable line arrives each day, in a free reminder or on a Premium Lock Screen widget. If your anxiety is fed by doomscrolling, Premium app blocking keeps the apps that wind you up asleep until you've written. None of this replaces professional support — if anxiety is affecting your daily life, talk to a clinician. As a daily practice, though, the pieces fit.",
      },
    ],
    faqs: [
      { question: 'What should I look for in an anxiety journaling app?', answer: "Low friction, so you'll open it on bad days; real privacy, so you can be honest; and mood tracking, so patterns become visible over time. A gentle, non-clinical tone helps too. Honestly is built around a low-effort daily page, a one-tap mood check, and entries that stay on your phone." },
      { question: 'Is a journaling app better than paper for anxiety?', answer: 'Neither is objectively better — it\'s whichever you\'ll actually use. Apps win on convenience (it\'s already in your pocket at 6 a.m.), mood tracking over time, and reminders. Paper wins on zero distraction. Honestly leans into the app advantages: a mood log on every entry and a calendar view you can\'t easily keep on paper.' },
      { question: 'Can a journaling app replace therapy for anxiety?', answer: 'No. Journaling is a supportive daily practice, not treatment. If anxiety is interfering with your life, please talk to a licensed professional. Honestly works best as a tool between sessions — a place to notice and process worry, not a substitute for care.' },
      { question: 'Is Honestly free to use?', answer: "Honestly is free to start: the daily prompt, your page, month books and their covers, mood check-ins, the affirmation library, and journal and affirmation reminders. Premium adds app blocking, your own prompts and affirmations, 35 page themes, widgets, full history, and iCloud backup, as a one-time Lifetime purchase or a yearly or monthly plan." },
    ],
    cta: 'Start Your Anxiety Journal',
    datePublished: '2026-06-13',
  },

  {
    appId: 'honestly',
    slug: 'mindfulness-meditation-journaling',
    type: 'guide',
    title: 'Best Mindfulness Journaling App 2026 — A Ritual, No Meditation Required',
    h1: 'Best App for Mindfulness Journaling — Reflection Without a Meditation Timer',
    metaDescription: "Honestly pairs a mood check-in with a daily journal prompt and affirmations — a simple mindfulness habit for your morning. Free on iPhone.",
    targetKeyword: 'mindfulness meditation journaling app',
    intro: "Meditation is hard to start. Journaling is hard to maintain. Honestly doesn't bolt a timed breathing exercise onto journaling — its mindfulness comes from the page itself: naming your mood honestly, then writing in answer to one question, or none at all.",
    sections: [
      {
        heading: 'Naming Your Mood Is the Mindfulness',
        body: "Honestly doesn't run a guided breathing exercise before you write. The present-moment awareness comes from a one-tap step on every page: naming your mood — Happy, Confused, Sad, Awful, or Cry. That single act of honest naming is a mindfulness practice on its own.",
      },
      {
        heading: "A Few Honest Lines Clarify, No Timer Needed",
        body: "You don't need a separate meditation app to get some of its benefit. Writing freely gives your thoughts somewhere to land instead of looping. A question waits at the top of the page if you want a starting point. When you're done, today's affirmation arrives, and the whole thing takes a few minutes.",
      },
      {
        heading: 'Accountability Through App Blocking',
        body: "Without accountability, the habit collapses. Honestly Premium keeps your chosen apps asleep until you've written today's page. That boundary is what keeps the practice ahead of the scroll.",
      },
    ],
    faqs: [
      { question: 'Does Honestly include a guided meditation?', answer: "No. Honestly doesn't include a timed breathing or meditation exercise. Its mindfulness comes from the page itself — naming your mood, then a few honest lines." },
      { question: 'Is journaling the same as meditation?', answer: "No. Meditation quiets the mind through stillness; journaling clarifies it through writing. Honestly leans entirely on the second — a mood check-in and a short page, no meditation timer involved." },
      { question: 'Can journaling alone help with anxiety?', answer: "Research supports expressive writing as a way to process anxious thoughts, even without a separate meditation practice. Honestly's daily page, with a one-tap mood check, is built around that." },
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
    metaDescription: "Honestly is a self-care ritual app: a short morning page, affirmations you can believe, and — with Premium — apps that stay asleep until you've written.",
    targetKeyword: 'best self-care ritual app',
    intro: 'Self-care isn\'t bubble baths. It\'s daily rituals that prime your nervous system for calm. Honestly is the best self-care ritual app because it builds your self-care routine into a morning ritual you actually do.',
    sections: [
      {
        heading: 'Self-Care Must Be Non-Negotiable',
        body: "Self-care fails when it's optional. With Premium, Honestly makes it non-negotiable: your chosen apps stay asleep until you've written today's page. You're protected from skipping yourself.",
      },
      {
        heading: 'Ritual Matters More Than Duration',
        body: "A five-minute ritual you keep works better than a 30-minute one you skip most days. Honestly's is one page — a question waiting, a few honest lines, a mood check — then today's affirmation. Short enough to do daily, structured enough to matter.",
      },
      {
        heading: 'Consistency Creates Change',
        body: 'One good morning doesn\'t change your nervous system. 30 days of good mornings does. Honestly makes your self-care ritual automatic.',
      },
    ],
    faqs: [
      { question: 'What counts as self-care?', answer: "Anything that primes your nervous system for calm: journaling, movement, rest, honest reflection. Honestly focuses on one of those — a short morning page with a mood check and an affirmation — and does it well, every morning." },
      { question: 'How long should a self-care ritual be?', answer: "Long enough to matter, short enough to do consistently. Honestly's takes a few minutes: a question, a few honest lines, a mood check, and today's affirmation." },
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
    metaDescription: "The best gratitude journal app makes the habit stick, not just possible. See what to look for — and how Honestly fits gratitude into a short morning page.",
    targetKeyword: 'gratitude journal app',
    intro: "Search for a gratitude journal app and you'll find dozens that look nearly identical. The one that changes anything isn't the prettiest — it's the one you still open three weeks from now. Gratitude journaling works by training attention: name what went right often enough and your brain gets better at spotting it in real time. But that only happens with repetition, which means the real question isn't which app has the most features — it's which one gets you to show up tomorrow. This guide covers what actually makes a gratitude habit stick, what to look for before you download anything, and where Honestly fits. Honestly isn't a standalone “three things” list; it gives you a short morning page with a question waiting — often one that turns you toward what's going right — so naming what matters becomes something you do daily, not something you mean to.",
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
        heading: "Where Gratitude Fits in Honestly",
        body: "Honestly isn't a dedicated gratitude list. It gives you one short page each morning with a question already waiting, and many of its prompts point you toward what's going right — “What's one small thing you did yesterday that deserves a quiet nod?” or “What are you quietly looking forward to?” You can swap the question until one fits, or with Premium write your own, like “Three things I'm grateful for today.” Choose the Gratitude affirmation topic and a line like “I can find reasons to be grateful even on ordinary days” arrives each day. The page is free, and short enough to finish before your first scroll — which is exactly the point of doing it in the morning.",
      },
      {
        heading: "A Book That Fills as You Go",
        body: "Consistency is the hard part of any gratitude habit, so Honestly gives it something to hold onto. Every page goes into this month's book, each month gets its own cover, and your streak counts the mornings you show up. It's a gentle, visual stake in the ground: skip a morning and you notice; string days together and you watch the book fill. Over weeks, that's what shifts your baseline from meaning to journal into actually journaling. This month's book, your streak, and mood calendar are free. If you want to look back across earlier months and search older pages, full history is part of Premium — useful once you've built enough of a record to want to reread it.",
      },
      {
        heading: 'Protect the Morning Your Habit Lives In',
        body: "The biggest threat to a morning gratitude habit usually isn't motivation — it's the phone you reach for before your feet hit the floor. Ten minutes into a feed and the moment's gone. If that's your pattern, Honestly's Premium app blocking can guard the time: Instagram, TikTok and whatever else pulls you stay asleep, using Apple's Screen Time, until you've written today's page. Then they wake up for the rest of the day, so the first thing you do is your own page instead of someone else's content. It's a Premium feature, offered as a one-time Lifetime purchase or a yearly or monthly plan, and it's entirely optional. The daily page itself stays free whether or not you ever turn blocking on.",
      },
    ],
    faqs: [
      { question: 'Does keeping a gratitude journal actually work?', answer: 'Yes, when it\'s consistent. Research links a regular gratitude habit to better mood and sleep. A one-off entry does little, but weeks of showing up gradually shift what your brain notices by default. The app\'s real job is mainly to get you to keep going — the benefit comes from the repetition, not any single day.' },
      { question: 'What should I write in a gratitude journal?', answer: "Something specific beats something generic. “I'm grateful my sister called” lands harder than “family.” Writing after a quick mood check helps too — you arrive with a clearer head, and the real thing tends to surface on its own instead of the usual reflexive answers." },
      { question: 'Is Honestly free to use as a gratitude journal?', answer: "Yes. The daily page, mood check-ins, month books, the affirmation library — including the Gratitude topic — and reminders are free. Premium adds app blocking, your own prompts and affirmations, widgets, full history, and iCloud backup, as a one-time Lifetime purchase or a yearly or monthly plan." },
      { question: 'How is this different from a plain gratitude app?', answer: "Instead of a standalone “three things” list, Honestly gives gratitude a place in a short morning page, a book that fills as you write, and affirmations that bring it back later in the day. And if mornings are where your phone hijacks you, Premium app blocking can protect the time you'd otherwise journal in." },
    ],
    cta: 'Start Your Gratitude Ritual',
    datePublished: '2026-06-13',
  },

  {
    appId: 'honestly',
    slug: 'vs-stoic',
    type: 'compare',
    title: 'Honestly vs Stoic — Morning Ritual or Mood Journal?',
    h1: 'Honestly vs Stoic: Which Journaling App Fits?',
    metaDescription: "Honestly vs Stoic compared. Stoic is a flexible mood and reflection journal; Honestly is a short morning page that keeps your apps asleep until you write. See the difference.",
    targetKeyword: 'stoic app alternative',
    intro: "Stoic is a thoughtful journaling app full of prompts, mood tracking, and stoic philosophy exercises. Honestly is narrower and more opinionated: one short morning page — a question waiting, a few honest lines, a mood check — with Premium keeping your distracting apps asleep until you've written. If you want a flexible reflection toolkit, Stoic shines; if you want a morning habit you can't skip, Honestly is built for that.",
    sections: [
      { heading: "Open Toolkit vs One Short Page", body: "Stoic gives you a deep library of exercises and lets you journal whenever and however you like — powerful, but it leans on your own discipline to show up. Honestly is narrower by design: one short page each morning, with a question already waiting and a book that fills as you write. The structure is the feature — it removes the 'what do I write?' friction that ends most journaling habits." },
      { heading: "The App Blocker", body: "Stoic reminds and encourages; it can't stop you from scrolling instead of reflecting. Honestly Premium uses Apple's Screen Time to keep your chosen apps asleep until you've written today's page. For people whose mornings get hijacked by Instagram before they've had a single thought of their own, that is the difference between intending to journal and actually doing it." },
      { heading: "Which to Choose", body: "Choose Stoic if you love a rich, flexible journaling practice and have the discipline to maintain it. Choose Honestly if you want a dependable morning habit — a short page, a book for every month, a mood calendar, and an app-blocking gate. They can even coexist: Honestly for the morning, Stoic for deeper reflection later." },
    ],
    comparisonTable: [
      { feature: "Short daily page with a prompt", app: "Yes", competitor: "Flexible" },
      { feature: 'App blocking until done', app: 'Yes (Premium)', competitor: 'No' },
      { feature: 'Mood check-in', app: 'Yes', competitor: 'Yes' },
      { feature: "Progress visual", app: "Monthly books, streak & mood calendar", competitor: "Basic streaks" },
      { feature: 'Philosophy exercise library', app: 'No', competitor: 'Yes' },
      { feature: 'Free to start', app: 'Yes', competitor: 'Yes (limited)' },
    ],
    faqs: [
      { question: 'Is Honestly a good Stoic alternative?', answer: "If you want a short, can't-skip morning page with an app-blocking gate, Honestly is a strong alternative. Stoic is better if you prefer a flexible, open-ended journaling toolkit." },
      { question: 'Does Stoic block apps?', answer: "No. Stoic is a journaling and mood app. Honestly Premium uses Apple's Screen Time to keep distracting apps asleep until you've written today's page." },
      { question: 'Is Honestly free?', answer: "Honestly is free to start: the daily prompt, your page, month books and their covers, mood check-ins, the affirmation library, and journal and affirmation reminders. Premium adds app blocking, your own prompts and affirmations, 35 page themes, widgets, full history, and iCloud backup, as a one-time Lifetime purchase or a yearly or monthly plan." },
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
    metaDescription: "Honestly vs The Five Minute Journal. Both are quick morning journals; only Honestly keeps your distracting apps asleep until you've written. Compared.",
    targetKeyword: 'five minute journal app alternative',
    intro: "The Five Minute Journal popularized the short, structured gratitude practice — and its app brings that to your phone. Honestly is quick in the same spirit, but asks one question a day instead of a fixed set: a new prompt waits on your page each morning, and you write as much or as little as you like. It also adds the one thing that makes a morning habit stick: Premium keeps your distracting apps asleep until you've written. Here's how they compare.",
    sections: [
      { heading: "Same Speed, Different Approach to Writing", body: "Both apps are built to take just a few minutes. The Five Minute Journal fills that time with the same fixed prompts every day; Honestly gives you one question that changes daily, which you can swap or skip. The bigger difference is enforcement: The Five Minute Journal trusts you to open it, while Honestly Premium keeps your chosen apps asleep until you've written. If your problem isn't the journaling itself but remembering to do it before the day swallows you, that gate solves it." },
      { heading: "One Question, Not a Fixed Format", body: "The Five Minute Journal centers on fixed gratitude and intention prompts you fill in each day. Honestly gives you one open question from its prompt library — a different one each morning — with an open page underneath and a one-tap mood check. With Premium you can write your own prompts. It's less structured, more personal." },
      { heading: "Progress You Can See", body: "Honestly turns consistency into a book for every month, a day streak, and a month-at-a-glance mood calendar. Today's affirmation follows you in a free reminder, and with Premium on Home Screen and Lock Screen widgets. That feedback, combined with the Premium app-blocking gate, is designed to keep the habit going long after novelty fades." },
    ],
    comparisonTable: [
      { feature: 'Quick structured format', app: 'Yes', competitor: 'Yes' },
      { feature: 'App blocking until done', app: 'Yes (Premium)', competitor: 'No' },
      { feature: "Writing prompt", app: "One rotating question (swap anytime)", competitor: "Fixed prompts" },
      { feature: 'Mood check-in', app: 'Yes', competitor: 'No' },
      { feature: "Progress visual", app: "Monthly books, streak & mood calendar", competitor: "Streaks" },
      { feature: 'Free to start', app: 'Yes', competitor: 'Paid' },
    ],
    faqs: [
      { question: 'Is Honestly like The Five Minute Journal?', answer: "Both are quick morning journals, but Honestly asks one rotating question instead of a fixed set of prompts. Honestly also adds a mood check-in, affirmations, and, with Premium, an app-blocking gate that keeps distracting apps asleep until you've written." },
      { question: 'Does The Five Minute Journal block apps?', answer: "No. Honestly is the one that offers app blocking (Premium), using Apple's Screen Time to keep your apps asleep until you've written today's page." },
      { question: 'How long does Honestly take?', answer: "A few minutes — answer the day's question in a few honest lines, tap a face for your mood, and today's affirmation arrives." },
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
    metaDescription: "Honestly vs Reflectly compared. Reflectly is an AI-guided mood journal; Honestly is a short morning page that keeps your apps asleep until you write. Which fits your day?",
    targetKeyword: 'reflectly alternative',
    intro: "Reflectly uses an AI-driven, conversational approach to daily journaling and mood tracking. Honestly takes a simpler, more disciplined path: one short morning page, written before your distracting apps wake up. Both aim to make journaling a daily habit — they just bet on different mechanisms to get you there.",
    sections: [
      { heading: "AI Conversation vs One Simple Page", body: "Reflectly guides you with AI prompts and a chat-like flow that adapts to your entries. Honestly keeps it deliberately simple: one question from a hand-written prompt library each morning, a page to answer it, and a one-tap mood check. Some people love the conversational depth of Reflectly; others find a predictable page easier to sustain day after day. Honestly bets on consistency." },
      { heading: "The Accountability Gate", body: "The defining difference is the app blocker. Reflectly relies on reminders and your own motivation. Honestly Premium keeps your distracting apps asleep with Apple's Screen Time until today's page is written, turning 'I should journal' into 'I write first, then scroll.' For habit-formers who keep falling off, that gate is decisive." },
      { heading: "Privacy and Progress", body: "Honestly keeps your pages on your iPhone with no account, and with Premium you can back them up to your own private iCloud. Progress shows up as a book for every month, a day streak, and a mood calendar. If you want an AI companion for reflection, Reflectly leads; if you want a fast, private, protected morning habit, Honestly is the better fit." },
    ],
    comparisonTable: [
      { feature: "Daily page", app: "One short page each morning", competitor: "AI-guided" },
      { feature: 'App blocking until done', app: 'Yes (Premium)', competitor: 'No' },
      { feature: "Writing prompt", app: "One rotating question", competitor: "AI-based" },
      { feature: "Progress visual", app: "Monthly books, streak & mood calendar", competitor: "Mood stats" },
      { feature: "Backup", app: "Manual iCloud backup (Premium)", competitor: "Account-based" },
      { feature: 'Free to start', app: 'Yes', competitor: 'Yes (limited)' },
    ],
    faqs: [
      { question: 'Is Honestly a Reflectly alternative?', answer: "Yes, with a different philosophy. Reflectly is an AI-guided mood journal; Honestly is a short morning page — a question, a few honest lines, a mood check — with an optional app-blocking gate." },
      { question: 'Does Reflectly block apps?', answer: "No. Honestly Premium is the one with an app blocker, using Apple's Screen Time to keep apps asleep until today's page is written." },
      { question: 'Does Honestly sync across devices?', answer: "Not automatically. Your pages stay on your iPhone. With Premium you can back them up to your own private iCloud and restore them on another device." },
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
    metaDescription: "Journaling can support mental wellbeing when it's consistent. Honestly makes a short daily page easy to keep, with a Premium app blocker that protects the habit.",
    targetKeyword: 'journaling for mental health',
    intro: "Research and lived experience both point the same way: a consistent journaling practice can support mental wellbeing — naming your mood, processing the day, noticing what you're grateful for. The hard part is consistency. Honestly is designed to make a gentle daily mental-health ritual something you actually keep, by building it into your morning and protecting it with an app blocker.",
    sections: [
      { heading: "Name the Mood First", body: "Each page in Honestly starts with a one-tap question: how do you actually feel — Happy, Confused, Sad, Awful, or Cry? Simply naming an emotion is a small but well-regarded self-awareness practice. Over time, your mood calendar becomes a gentle record you can look back on to notice patterns in how you've been feeling." },
      { heading: "Write, Then Affirm", body: "After the mood check, a question waits on the page — swap it if it doesn't fit — and you write as little or as much as you like. When you finish, today's affirmation arrives: a believable line from topics you choose, like Calm or Self-worth. This name-write-affirm arc is a compact, sustainable practice that supports a steadier headspace without demanding long, intimidating entries." },
      { heading: "Consistency, Protected", body: "A mental-health habit only helps if you keep it, and mornings are when intentions quietly collapse into scrolling. Honestly Premium's app-blocking gate keeps your distractions asleep until today's page is written, and every page you write fills this month's book. Honestly is a wellbeing tool, not a substitute for professional care — if you're struggling, please reach out to a qualified professional." },
    ],
    faqs: [
      { question: 'Can journaling help my mental health?', answer: "A consistent practice of naming moods, writing honestly, and kinder self-talk can support wellbeing. Honestly makes this a short daily page that's easy to keep, protected by an optional app-blocking gate." },
      { question: 'Is Honestly a therapy app?', answer: 'No. Honestly is a wellbeing and journaling tool, not a substitute for professional mental-health care. If you are struggling, please reach out to a qualified professional.' },
      { question: 'How long does the daily ritual take?', answer: "A few minutes — a mood check-in, a few honest lines, and today's affirmation." },
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
    metaDescription: "Start your dopamine detox where it matters most — the morning. Honestly Premium keeps high-dopamine apps asleep until you've written a short morning page. Free on iOS.",
    targetKeyword: 'dopamine detox app',
    intro: "A dopamine detox is about reducing the constant hit of high-stimulation apps so calmer, slower rewards feel good again. The morning is the highest-leverage place to start, because the first scroll sets your baseline for the day. Honestly is a gentle dopamine-detox tool: with Premium, it keeps high-dopamine apps asleep until you've written a slow, intentional morning page.",
    sections: [
      { heading: "Break the First-Scroll Habit", body: "The instant you open Instagram or TikTok in bed, you've spiked your dopamine before doing anything real — and everything calmer feels dull by comparison. Honestly Premium keeps those apps asleep with Apple's Screen Time until you've written today's page, so your day starts with a slow, low-stimulation activity instead of a feed. It resets your morning baseline." },
      { heading: "Replace the Hit with a Ritual", body: "A detox works better when you replace the habit rather than just removing it. Honestly fills that space with one calm page — a question, a few honest lines, a mood check — and a book that fills a page at a time. The slower reward of watching your month's book grow is exactly the kind of low-dopamine satisfaction a detox aims to restore." },
      { heading: "Sustainable, Not Extreme", body: "You don't need to quit your apps forever — just reorder your morning. Once your page is written, your apps wake up and you use them normally. Over time, starting the day calm becomes the default, and the constant pull of high-dopamine apps loosens its grip." },
    ],
    faqs: [
      { question: 'Can an app help with a dopamine detox?', answer: "Yes. Honestly Premium keeps high-dopamine apps asleep each morning until you've written today's page, helping reset your baseline and replace the first-scroll habit." },
      { question: 'Does it block apps all day?', answer: "No. Your chosen apps stay asleep each morning only until today's page is written, then they wake up for normal use." },
      { question: 'What replaces the scrolling?', answer: "A short page — a question, a few honest lines, a mood check — and a month's book that fills as you go. A slower, calmer reward." },
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
    metaDescription: "Honestly is a digital wellbeing app that puts a short page between you and your feeds each morning, using Apple's Screen Time to protect your focus. Free on iPhone.",
    targetKeyword: 'digital wellbeing app',
    intro: "Digital wellbeing isn't about deleting your apps — it's about changing your relationship with them so they serve you instead of running you. Honestly improves that relationship at the most important moment of the day: it puts a short, intentional page between you and your feeds every morning, enforced by Apple's Screen Time with Premium.",
    sections: [
      { heading: "Intention Before Consumption", body: "Most digital-wellbeing tools just count your screen time after the fact. Honestly Premium intervenes earlier: your distracting apps stay asleep until you've written a short morning page. Starting with your own thoughts rather than someone else's content is the core of a healthier digital life, and Honestly makes it the default." },
      { heading: "Gentle Structure, Real Boundaries", body: "Honestly pairs a soft, paper-feel page with a firm boundary: with Premium, the apps stay asleep until you've written. That balance — gentle in tone, firm in mechanism — is what makes the wellbeing change sustainable. It's not punitive; it just ensures the calm part of your morning happens before the noisy part." },
      { heading: "Visible Progress", body: "A book for every month, a day streak, a mood calendar, and today's affirmation in a free reminder or on Premium Lock Screen widgets keep your wellbeing practice visible and rewarding. Watching your month's book fill is a quiet reminder that you're choosing intention over autopilot, day after day. Honestly turns digital wellbeing from a vague goal into a daily, satisfying habit." },
    ],
    faqs: [
      { question: 'What is a digital wellbeing app?', answer: "It's an app that helps you build a healthier relationship with your phone. Honestly does this by keeping your distracting apps asleep each morning until you've written a short page (Premium)." },
      { question: 'How is Honestly different from Screen Time limits?', answer: "Instead of a passive timer, Honestly Premium ties your app access to writing today's page, making the boundary meaningful rather than easy to dismiss." },
      { question: 'Is it free?', answer: "Honestly is free to start: the daily prompt, your page, month books and their covers, mood check-ins, the affirmation library, and journal and affirmation reminders. Premium adds app blocking, your own prompts and affirmations, 35 page themes, widgets, full history, and iCloud backup, as a one-time Lifetime purchase or a yearly or monthly plan." },
    ],
    cta: 'Build Digital Wellbeing',
    datePublished: '2026-03-15',
  },

  {
    appId: 'honestly',
    slug: 'daily-journal-prompts-app',
    type: 'guide',
    title: "Daily Journal Prompts App — A Question Waiting Every Morning | Honestly",
    h1: "The Journal App With a Question Waiting Every Morning",
    metaDescription: "Looking for a daily journal prompts app? Honestly puts a new question on your page each morning — swap it from the library, or write your own. Free on iPhone.",
    targetKeyword: "daily journal prompts app",
    intro: "The hardest part of journaling is the first line. A good prompt fixes that: instead of staring at a blank page, you answer one honest question. Honestly puts a new one on your page every morning, from a library written to feel like a friend asking rather than a worksheet. If today's doesn't fit, swap it. If you know exactly what you want to ask yourself, write your own. This guide covers what makes a daily prompt useful, and how Honestly uses them without getting in the way.",
    sections: [
      { heading: "Why a Question Beats a Blank Page", body: "A blank page asks you to decide what matters before you've written a word. A question does that work for you — “Where's your head this morning, honestly?” gives you somewhere to start, and once you're writing, you can go anywhere. The best prompts are short, specific, and honest enough to answer in a few lines on a busy morning." },
      { heading: "A New Prompt Every Morning, Swappable", body: "Honestly's prompt library covers mornings that feel light and mornings that feel heavy — from “What's one thing that could go really right today?” to “What are you carrying from yesterday that you'd like to set down?” A different one waits on your page each day. Tap it to pick another from the list; the library is free. With Premium, you can add your own prompts and choose them whenever you like." },
      { heading: "Prompts That Turn Into a Habit", body: "A prompt only helps if you show up to answer it. Honestly keeps the habit easy to return to: a free journal reminder carries the day's question, only on mornings your page is still blank. Every page goes into this month's book, and with Premium your chosen apps stay asleep until you've written." },
    ],
    faqs: [
      { question: 'Does Honestly give you a daily journal prompt?', answer: "Yes. A new question waits on your page every morning, chosen from Honestly's prompt library. You can swap it for another from the list at any time, or ignore it and write whatever you like." },
      { question: "Can I write my own journal prompts?", answer: "Yes, with Premium. Add your own questions to the library and pick them whenever you want. Browsing and swapping the built-in prompts is free." },
      { question: 'Is journaling in Honestly quick?', answer: "As quick as you want it to be. A few honest lines count as a page, so most mornings take a few minutes." },
    ],
    cta: "Get Today's Prompt Free",
    datePublished: '2026-03-18',
  },

  {
    appId: 'honestly',
    slug: '369-method-app',
    type: 'guide',
    title: '369 Method App: How to Actually Practice It | Honestly',
    h1: 'The 369 Method App Guide: How to Practice It Properly',
    metaDescription: "Looking for a 369 method app to write your manifestation 3x, 6x, and 9x a day? Here's how the method actually works — and how affirmation reminders can mark the three sittings.",
    targetKeyword: '369 method app',
    intro: "The 369 method is a manifestation ritual built on repetition: you write what you want as if it's already true — three times when you wake up, six times in the afternoon, nine times before bed. The numbers trace back to Nikola Tesla's fascination with 3, 6, and 9, but the reason people stick with it is simpler. Writing the same intention by hand, several times a day, forces your attention onto it instead of letting it drift. This guide covers how to actually run the method, how to word a statement that lands, and where an app helps — and where it just adds a counter you don't need. Honestly isn't a purpose-built 369 tracker, but its morning page is a natural home for your first three, and its affirmation reminders — up to three a day — can mark the morning, afternoon, and evening sittings.",
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
        heading: "Using Honestly for the 369 Method",
        body: "Honestly isn't a dedicated 369 app — there's no 3-6-9 counter, and pretending otherwise would miss the point. Where it fits is the structure around the writing. Your morning page is a natural place for the first three; with Premium, add your statement as one of your own prompts and pick it each morning. Affirmation reminders are free and can arrive up to three times a day at the times you choose — set them for morning, afternoon, and night to mark each sitting. With Premium, add your statement as your own affirmation and choose it as your topic, so the line that arrives is yours, on your Lock Screen widget too. Every page goes into this month's book, quiet proof you kept showing up.",
      },
    ],
    faqs: [
      { question: 'What is the 369 manifestation method?', answer: 'You choose one desire and write it in the present tense three times each morning, six times midday, and nine times at night. The numbers come from Nikola Tesla\'s interest in 3, 6, and 9; the practice spread because it gives manifestation a concrete, repeatable structure instead of vague visualization.' },
      { question: 'Does the 369 method actually work?', answer: 'There\'s no scientific guarantee it changes outside events. What it reliably does is keep one goal at the center of your attention all day through repetition, which is often what turns a vague wish into consistent action. Treat it as a focus and intention tool, not magic.' },
      { question: 'How long should you do the 369 method?', answer: 'Most people commit to at least a full cycle of days — often 21 to 45 — since the value is in daily repetition, not a single session. Consistency matters more than the exact number; pick a window you can actually keep and write the same statement every day.' },
      { question: 'What should I write for the 369 method?', answer: 'One short, present-tense line about a single desire, worded as if it\'s already true and tied to a feeling: \'I\'m grateful for the calm I\'ve built into my mornings.\' Keep it specific and stop editing once it feels right — the repetition is the work, not the wording.' },
      { question: 'Can I use a journaling app for the 369 method?', answer: "You can. An app won't beat pen and paper for the raw writing, but it's useful for anchoring your morning reps in a routine and reminding you of the later sittings. In Honestly, affirmation reminders can arrive up to three times a day, and with Premium your own statement can be the line they carry. It isn't a dedicated 3-6-9 counter." },
    ],
    cta: "Start Your Morning Page Free",
    datePublished: '2026-07-08',
  },

  {
    appId: 'honestly',
    slug: 'manifestation-journal-app',
    type: 'guide',
    title: 'Manifestation Journal App: How to Actually Practice It',
    h1: 'How a Manifestation Journal App Fits Into a Daily Practice',
    metaDescription: "What a manifestation journal app is and how to write what you're calling in. A simple present-tense practice, plus how Honestly turns it into a daily habit.",
    targetKeyword: 'manifestation journal app',
    intro: "A manifestation journal is where you write down what you're calling into your life, in your own present-tense words, as if it's already happening. Not a vision board, not a wish list you read once and forget. It's a short daily habit: you name what you want, you write it as though it's real, and you notice what's already going right. Done honestly, it does two useful things. It gets fuzzy wants out of your head and into specific language, and it points your attention at what you're building instead of what's missing. You don't need to believe in anything supernatural for that to help. This guide covers how the practice actually works, what to write, and how a journaling app like Honestly turns it into something you'll return to every morning instead of abandoning by week two.",
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
        body: "Manifestation without gratitude curdles into a list of things you lack. That's why the more durable versions of this practice pair the two: you name what you're calling in, and you name what's already good. Gratitude does the honest bookkeeping so your intentions don't read as complaints. In Honestly, there's no separate manifestation step to remember — the morning page is open, so your intention and what you're grateful for can live in the same few lines. Tap the face to note how you actually feel, write what you're calling in and what's already good, and close the page. Choose the Gratitude or Growth affirmation topics and a line in the same spirit arrives later in the day. It's designed so the calling-in and the being-grateful happen in the same sitting, which is exactly where they reinforce each other.",
      },
      {
        heading: 'What to look for in a manifestation journal app',
        body: "A notebook works fine, so an app has to earn its place. Look for three things. First, low friction: if opening it and finishing an entry takes more than a few minutes, you'll quit. Second, a structure that gets you past the blank page. Third, something that keeps you coming back, because manifestation only compounds with repetition. Honestly is built around that last point. A question waits on your page each morning; with Premium, you can write your own, like “What am I calling in today?” Affirmation reminders bring a line back later in the day, and with Premium your own affirmations and a Lock Screen widget put your words where you'd otherwise reach for a feed. The daily page is free, which matters for a habit you're trying to sustain daily rather than sample once.",
      },
      {
        heading: 'Making it stick past the first week',
        body: "Most manifestation journals die because nothing marks the difference between a five-day streak and a five-week one. Honestly gives that progress a shape: every page goes into this month's book, each month gets its own cover, and your streak counts the mornings you show up. It's a small thing, but a book filling up turns an abstract intention into a habit you don't want to break. If your manifestations start feeling rote, swap in a deeper prompt — “What old story about yourself are you ready to stop believing?” — to interrogate what you're really after. And if mornings keep getting hijacked by your phone, Premium app blocking keeps your chosen apps asleep until you've written, so the page happens before the feed does.",
      },
    ],
    faqs: [
      { question: 'Does manifestation journaling actually work?', answer: 'It works as a focusing and habit tool, which is what most people actually need. Writing what you\'re calling in, in present tense, makes vague wants specific and keeps them in front of you so your daily choices line up with them. Pairing it with gratitude keeps it grounded. Treat it as directed attention and follow-through rather than something supernatural, and it earns its place. It\'s not a substitute for action or, where relevant, professional support.' },
      { question: 'How do you write a manifestation journal entry?', answer: 'Pick one or two specific things and write them in present tense, first person: "I am," "I have," "I\'m building." Add a short line on why each matters, then note one small piece of evidence it\'s already underway. Close with something you\'re grateful for. Keep the whole entry to a few sentences so you\'ll do it again tomorrow. Consistency matters far more than length.' },
      { question: 'What\'s the difference between a gratitude journal and a manifestation journal?', answer: "A gratitude journal records what's already good; a manifestation journal writes what you're calling in as if it's already here. They work best together: gratitude keeps manifestation from turning into a list of what you lack, and manifestation gives your gratitude a direction to grow toward. In Honestly, both can live on the same morning page." },
      { question: 'Is there a free manifestation journal app?', answer: "Honestly's daily page is free, along with mood tracking, month books, the affirmation library, and reminders, so you can build a daily manifestation practice without paying. Premium adds your own prompts and affirmations, widgets, app blocking, full history, and iCloud backup." },
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
    intro: "Manifestation gets mocked as magical thinking, but the useful version is simpler: you decide what you want, write it down as if it's already true, and prime your brain to notice the moves that get you there before the day hijacks your attention. A morning manifestation routine works because the first inputs of your day set the tone, and right now, for most people, those inputs are a feed. This is a realistic 5-10 minute version you'll actually keep: check your mood, free-write to clear the static, note what you're grateful for, then manifest. No crystals, no hour-long ritual. Honestly gives the routine a home — an open morning page with a one-tap mood check — and with Premium it keeps your feeds asleep until you've written, so your morning belongs to you first.",
    sections: [
      {
        heading: 'Why Mornings Beat Every Other Time',
        body: 'Whatever hits your brain first in the morning becomes the frame for everything after. Open a feed and you inherit its mood, comparison, outrage, other people\'s priorities, before you\'ve chosen your own. That\'s not a willpower failure; it\'s just what the first inputs of the day do. A morning manifestation routine works by claiming those first minutes deliberately. Before the notifications, you set your own emotional baseline and point your attention at what you actually want. Cortisol is naturally higher just after waking, which makes this a genuinely good window for focus and intention-setting. You don\'t need to wake at 5 a.m. or meditate for an hour. You need the slot between opening your eyes and opening an app, and a simple sequence to fill it.',
      },
      {
        heading: 'The 5-Minute Sequence, Step by Step',
        body: "Keep it to four steps so it survives busy mornings. First, a mood check: name how you actually feel, one tap or one word. Naming an emotion takes some of its charge and gives you an honest starting point. Second, free-write for a minute or two, whatever's in your head, unfiltered, no prompt required. Third, gratitude: two or three specific things you're glad exist right now. Specific beats generic; 'the coffee is still hot' works better than 'my life.' Fourth, manifest: write what you want as if it's already yours. The whole thing runs 5-10 minutes. In Honestly, the mood check is a tap on the face at the top of the page, and the rest of the page is yours for the other three steps.",
      },
      {
        heading: 'How to Actually Write a Manifestation',
        body: 'The mechanics matter more than the mysticism. Write in the present tense, as if the thing is already true: \'I\'m calm in the interview\' beats \'I hope the interview goes okay.\' Present tense trains your brain to treat the outcome as normal and to notice steps toward it. Be specific and be honest, manifest something you can half-believe, not a fantasy you\'ll roll your eyes at. Add the feeling, not just the fact: name how it feels to already have it. And where you can, pair the wish with an action (\'I reach out to one person today\'), so manifestation becomes a nudge toward behavior instead of a substitute for it. One or two lines is plenty. You\'re setting a direction, not writing a contract.',
      },
      {
        heading: 'Free-Writing First: Clear the Static',
        body: "Manifesting from a cluttered head rarely lands — you end up 'wanting' whatever you're anxious about. That's why the free-write comes before the manifest. Spend a minute dumping the static: the worry, the to-do list, the thing you're replaying. You don't have to solve it, just get it out of your head and onto the page so it stops running in the background. If you want to go deeper on a heavy morning, a prompt like “What's quietly weighing on you right now?” can help you sit with what's actually going on. Then, with the noise cleared, gratitude and manifestation have room to be genuine rather than a bypass. Honestly puts a question at the top of your page each morning, which you can swap or simply write past.",
      },
      {
        heading: 'Making It Automatic',
        body: "A routine you skip does nothing, so design for consistency over intensity. Anchor it to something you already do — the ritual happens right after your alarm, before your feet hit the kitchen. Keep the bar low: a one-line entry still counts. Track the streak so showing up becomes its own reward. In Honestly, every page goes into this month's book, so the habit is something you can see. The hardest part is the phone itself — it's easier to manifest when Instagram isn't one thumb-swipe away. Honestly's Premium app blocking keeps your chosen apps asleep with Apple's Screen Time until you've written, so the feeds stay shut until your morning is yours. Start free, add the lock when you're ready.",
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
    metaDescription: "Scripting means writing your reality in present tense — and it needs an open page, not a feed. Here's how to script, and how Honestly gives you the page.",
    targetKeyword: 'scripting manifestation app',
    intro: "Scripting is manifestation's most hands-on technique: you write your desired reality in present tense, as if it's already true, in enough detail that your nervous system half-believes it. Not “I want a new job” but “I love walking into my office, the light hits my desk, my manager trusts me.” The method asks two things of you — a page with room to sprawl, and enough privacy to write embarrassingly specific things without an audience. An affirmation feed is the opposite of scripting. Honestly gives you the page: an open morning page with no template forcing you into someone else's words. A question waits at the top if you want a nudge, and with Premium you can make that question your own scripting prompt.",
    sections: [
      {
        heading: 'What Scripting Actually Is',
        body: 'Scripting means writing a scene from your desired life in the present tense, as though it already happened. The rules are simple and worth knowing whether or not you ever open an app. Write in first person and present tense — "I am," not "I will." Anchor it in the senses: what you see, hear, and feel in the moment you\'re describing. Add emotion, because the feeling is what your brain encodes, not the wish. And write it as a settled fact rather than a plea; scripting is closer to journaling from the future than asking for anything. A page a day is plenty. The point isn\'t magic — it\'s repeatedly rehearsing a specific identity until your attention, choices, and effort start bending toward it.',
      },
      {
        heading: "Why an Open Page Beats an Affirmation Feed",
        body: "Scripting needs space, and an affirmation feed doesn't give you any. Swiping through pre-written lines is fine for a mood lift, useless for writing your own detailed scene. You can't script inside someone else's sentence. Honestly's morning page is open: your script can run three lines or three paragraphs. A question sits at the top if you want a nudge, and with Premium you can write your own, like “Describe today as if it already went the way you hoped.” It's the closest thing to a private notebook that also keeps your streak and, with Premium, backs up to your own iCloud.",
      },
      {
        heading: "Close the Script With One Line",
        body: "A script lands harder when you end on a single clear intention. After the long-form scene, distill it into one line — what you're thankful for and what you're calling in — so you have both halves most scripting practices recommend. Gratitude does real work here: naming what's already good trains your attention to notice more of it, the same muscle scripting exercises. With Premium, add that one line as your own affirmation in Honestly, and it can come back to you in a reminder or on your Lock Screen later in the day.",
      },
      {
        heading: 'Protect the Morning So You Actually Write',
        body: "The hardest part of any morning practice isn't the writing — it's opening Instagram first and losing the next hour. Honestly's Premium app blocking is built for exactly that: it uses Apple's Screen Time to keep the apps you choose asleep until you've written today's page, so the quiet you need for scripting is protected rather than hoped for. The daily page, mood check, and affirmation library are free; app blocking, your own prompts and affirmations, iCloud backup, and full history come with Premium, as a one-time Lifetime purchase or a yearly or monthly plan. If distraction keeps derailing your practice, it's the piece worth paying for.",
      },
      {
        heading: 'Consistency Is the Real Mechanism',
        body: "Scripting works through repetition, not intensity — one vivid page every morning beats a marathon session you never repeat. Honestly makes that repetition visible: every page goes into this month's book, and each month gets its own cover, so your scripts add up on a shelf. Your streak counts the mornings you show up — gentle pressure, not a guilt trip. This month's book is free; earlier months and search, where you can reread months of old scripts, are Premium. Honestly is available in 13 languages, so you can script in the one you actually think in — which matters more than it sounds when you're writing in present-tense detail.",
      },
    ],
    faqs: [
      { question: 'What is scripting in manifestation?', answer: 'Scripting is writing your desired reality in present tense, as if it\'s already true, in vivid sensory detail. Instead of listing wishes, you narrate a scene from the life you want — "I am," not "I will" — so the feeling of it becomes familiar. It\'s essentially journaling from the future.' },
      { question: 'How do you write a manifestation script?', answer: "Write in first person, present tense, and describe what you see, hear, and feel. Focus on the emotion, keep it specific, and state it as a settled fact rather than a request. A single page a day is enough. In Honestly, the morning page gives you an open canvas to do exactly this." },
      { question: 'Is there an app for scripting manifestation?', answer: "Honestly works well for it because its morning page is open — no template forcing you into someone else's words — and with Premium you can write your own scripting prompt and turn your one-line intention into an affirmation. The daily page is free; iCloud backup and full history are Premium." },
      { question: 'Do you have to script every day?', answer: "Daily is ideal, because scripting works through repetition, not intensity. One short, vivid page each morning beats an occasional long session. Honestly's streak and its book for every month are built to make showing up daily feel rewarding rather than like a chore." },
      { question: 'Does scripting manifestation actually work?', answer: 'There\'s no magic guarantee, but the mechanism is real: rehearsing a specific identity in detail shifts what you notice, choose, and act on. Treat it as focused intention-setting, and pair it with real effort. For anything clinical or overwhelming, a professional is the right support.' },
    ],
    cta: 'Start Scripting This Morning',
    datePublished: '2026-07-08',
  },

  {
    appId: 'honestly',
    slug: 'vs-i-am-affirmations',
    type: 'compare',
    title: "Honestly vs I Am — Affirmations Plus a Morning Journal",
    h1: "The I Am App Alternative With a Morning Journal Built In",
    metaDescription: "Searching for an I Am app alternative? Both offer affirmations, reminders, and widgets. Honestly adds a morning journal, a book for every month, and app blocking.",
    targetKeyword: 'i am app alternative',
    intro: "I Am is one of the easiest ways to add positivity to your day: it sends a steady stream of beautifully written affirmations to your notifications and Lock Screen. You pick a few themes, and the good words keep coming — no effort required. Honestly also has affirmations — 1,510 across 16 topics, with free reminders and Premium widgets — but it pairs them with a short morning journal: a question waits on today's page, you write a few honest lines, and with Premium your distracting apps stay asleep until you have. This page compares the two honestly: where I Am's zero-effort model wins, where writing first changes what affirmations do, and which approach fits how you want to feel each day.",
    sections: [
      {
        heading: 'Where I Am Genuinely Wins',
        body: "If you want positivity with near-zero effort, I Am is hard to beat. Its library of curated affirmations is well written and endlessly varied, the themes let you steer the tone, and the notifications mean good words find you without you opening anything. For a lot of people that passive drip is exactly right — a small counterweight to a noisy feed. Honestly asks a little more of you: a few minutes of writing each morning. If you know you won't sit down and journal, an affirmation stream you never have to think about may serve you better. Credit where it's due — I Am makes showing up optional, and that's the whole point of it.",
      },
      {
        heading: 'Passive Consumption vs Active Practice',
        body: "The real split isn't features, it's what you do. With I Am, you read. With Honestly, you write first: name how you actually feel, answer the day's question, and then today's affirmation arrives — a short, believable line like “I can make it through a day that feels difficult” rather than a promise you can't quite believe. Research on journaling and self-affirmation tends to favor words you engage with over words you passively receive, because writing forces you to mean them. With Premium you can add affirmations in your own words too. If you've scrolled past a hundred perfect affirmations and felt nothing, that's the gap Honestly is built to close.",
      },
      {
        heading: "Affirmations Where You'll See Them",
        body: "Both apps put affirmations where you'll see them. I Am surfaces its lines through widgets and notifications. Honestly does too: choose your topics, and one line a day arrives in a free affirmation reminder — up to three times a day, on the days you pick — and on Home Screen and Lock Screen widgets with Premium. With Premium you can also add your own affirmations and choose them as a topic, so what you see is something you wrote and meant.",
      },
      {
        heading: "A Morning Journal, Not Just Affirmations",
        body: "I Am is focused: affirmations, delivered well, full stop. Honestly wraps affirmations inside a morning journal. A question waits on today's page, you tap a face for your mood, and every page goes into this month's book with its own cover. Premium adds app blocking that keeps distracting apps asleep with Apple's Screen Time until you've written, plus 35 page themes, full history, and iCloud backup. So the choice isn't only whose affirmations — it's whether you want a single affirmation stream or a daily practice that affirmations are one part of.",
      },
      {
        heading: 'Which One Fits You',
        body: "Pick I Am if you want effortless, always-on positivity and you're honest that you won't journal — its curated stream and notifications are built for exactly that, and there's no shame in wanting the easy version. Pick Honestly if you want your affirmations to come with a few honest minutes of your own: a short morning page, a book that fills as you write, believable lines in reminders and widgets, and an optional app-blocking gate that makes the habit stick. One is a well-stocked shelf you browse. The other is a notebook you fill, with a shelf beside it.",
      },
    ],
    comparisonTable: [
      { feature: "Affirmation source", app: "1,510 across 16 topics, plus your own (Premium)", competitor: "Curated stock library (I Am)" },
      { feature: "Effort required", app: "A short morning page, then affirmations", competitor: "Passive — tap and read" },
      { feature: "Delivery style", app: "Free reminders; Home & Lock Screen widgets (Premium)", competitor: "Push notifications & widgets (I Am)" },
      { feature: "Morning journal", app: "Yes — daily prompt, mood check, monthly books", competitor: "No — affirmations only" },
      { feature: "Progress visual", app: "Monthly books, streak & mood calendar", competitor: "Streaks & themes (I Am)" },
      { feature: 'App blocking', app: 'Yes (Premium)', competitor: 'No' },
      { feature: "Pricing", app: "Free core; Lifetime, yearly or monthly", competitor: "Subscription (I Am)" },
    ],
    faqs: [
      { question: 'Is there a free I Am app alternative?', answer: "Yes. Honestly is free to start: 1,510 affirmations across 16 topics, affirmation reminders, and a short morning journal with a daily prompt, mood check-ins, and month books. Premium adds widgets, your own affirmations, app blocking, full history, and iCloud backup, as a one-time Lifetime purchase or a yearly or monthly plan." },
      { question: 'What makes Honestly different from the I Am app?', answer: "I Am delivers curated affirmations to your notifications and Lock Screen with no effort needed. Honestly has a curated library too, but pairs it with a short morning journal — a question, a few honest lines, a mood check — so affirmations come after a few minutes of your own thoughts." },
      { question: 'Can I write my own affirmations instead of using preset ones?', answer: "Yes, with Premium. Add your own affirmations and choose them as a topic, and they'll come back to you in reminders and on your Lock Screen widget. The built-in library of 1,510 is free." },
      { question: 'Does Honestly send affirmation notifications like I Am?', answer: "Yes. Affirmation reminders are free and can arrive up to three times a day, on the days you choose, carrying lines from the topics you picked. If you want a constant stream of affirmation pushes all day, I Am is built for that." },
    ],
    cta: 'Try Honestly Free',
    datePublished: '2026-07-08',
  }
];
