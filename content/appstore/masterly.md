# Masterly — App Store Listing Data

Pulled: 2026-07-07 · US storefront · via iTunes lookup API + listing page (`serialized-server-data`)

## Identity

| Field | Value |
|---|---|
| App Store name (US) | **App Blocker & Study - Masterly** |
| App Store name (IN) | Masterly: Study Blocker & Quiz — storefronts diverge; site uses the US name (US is the SEO target market: MCAT/bar/NCLEX content) |
| Subtitle (ASO) | **AI Flashcards, Quiz & Focus** |
| App ID | 6753760295 |
| Listing URL | https://apps.apple.com/us/app/app-blocker-study-masterly/id6753760295 |
| Seller | Ashwin Anbazhagan |
| Category | Education (primary), Productivity |
| Version | 4.4 (released 2026-06-18) |
| Price | Free + Masterly Pro: **$9.99/month, $79.99/year** |
| Min iOS | 16.0 |
| Languages | EN, FR, DE, RU, ES |
| Content rating | 4+ |
| Icon | site copy at `public/masterly.png` |

## Ratings (live, by storefront)

US 5.0 (2) · GB 5.0 (1) · CA 4.0 (1) · DE 3.0 (1) — **total 5 ratings. Too few for AggregateRating schema; removed from site config until real volume exists.**

## Description (verbatim from listing)

> Stop scrolling. Start mastering.
>
> Masterly is a study system that turns your phone into a focused workspace. Distracting apps lock up until you earn access back through quizzes on your own study material.
>
> HOW IT WORKS
> Apps lock up to 3 times a day. To unlock, complete short quizzes from your own notes or PDFs. Finish your daily quizzes to track progress and get your apps back.
>
> WHAT YOU GET WITH MASTERLY PRO
> * AI quiz generation from PDFs and notes
> * Smart flashcards with spaced repetition
> * AI-generated study notes
> * Focus heatmaps and analytics
> * Study timetables and exam planning
> * App blocking and focus tools
>
> WHY MASTERLY?
> Most study apps make it easy to quit. Masterly is built to keep students accountable, build focus habits, and study consistently.
>
> Used by students at 500+ universities.

## Feature facts — the ONLY claimable features for site/guide copy

1. App blocking gate: distracting apps lock **up to 3 times a day**; unlock by completing short quizzes generated from your own notes or PDFs (iOS Screen Time / Family Controls).
2. AI quiz generation from PDFs and notes (Pro).
3. Smart flashcards with **spaced repetition** (Pro).
4. AI-generated study notes (Pro).
5. Focus heatmaps and analytics (Pro).
6. Study timetables and **exam planning** — PDF → day-by-day study plan (Pro; confirmed by screenshot 01 "Turn any PDF into a daily study plan").
7. Daily quiz completion tracked for progress; streak framing.
8. "Used by students at 500+ universities" (store copy — quotable as the listing's claim).
9. Pricing: free download; Pro $9.99/mo or $79.99/yr.

**Positioning shift to honor:** live listing is app-blocker-FIRST ("Stop scrolling. Start mastering."), study-planner second. Old site copy was exam-planner-first.

## Screenshots (current listing, 4 × 1320×2868, staged in `content/appstore/raw/masterly/`)

1. "Turn any PDF into a daily study plan" — numbered study days with topics (matter and measurements)
2. "Study first, scroll later" — quiz completion screen with shield icon and social-app reminder
3. "Flashcards that actually prepare you" — flashcard 3 of 9, science question about solids
4. "Pass the quiz, unlock your phone" — quiz question 1 of 6 about states of matter

Site copies: `public/masterly/screenshots/01-04.webp` (640w q80). Landing also keeps `public/masterly_demo.mp4` video hero.

## ASO keywords (inferred from name + subtitle + description)

app blocker · study app · ai flashcards · quiz · focus · study blocker · spaced repetition · study planner · exam planning · study timetable · pdf to flashcards · stop scrolling · screen time

## Mismatches vs site (action items)

1. **Name**: site `name: 'Masterly AI'` (keep for prose) — add `appStoreName: 'App Blocker & Study - Masterly'`.
2. **Store URL**: site uses `/in/app/masterly-ai-quiz-study-app/...` (stale slug + storefront) → normalize to `https://apps.apple.com/app/app-blocker-study-masterly/id6753760295`.
3. **aggregateRating 4.8/89 is not defensible** (real: 5 ratings) → removed.
4. **Positioning**: lead with app-blocker + quiz-unlock ("Stop scrolling. Start mastering." energy); keep exam-plan as feature #2. Subtitle keywords ("AI Flashcards, Quiz & Focus") into seo.title/description.
5. **Detail correction**: live says apps lock "up to 3 times a day" — site copy implies a single study window; align.
6. **Landing gaps**: no visible FAQ section (schema-without-content violation) and no screenshots section — both being added.
