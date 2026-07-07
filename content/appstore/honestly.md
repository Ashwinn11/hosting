# Honestly — App Store Listing Data

Pulled: 2026-07-07 · US storefront · via iTunes lookup API + listing page (`serialized-server-data`)
**A new version is in App Store review** — the LIVE listing screenshots are stale; the fresh set already lives at `public/honestly/screenshots/01-05.png` (dated 2026-07-06) and is the source of truth for site imagery.

## Identity

| Field | Value |
|---|---|
| App Store name | **Honestly - Reflect & Manifest** (renamed from "Honestly - Morning Journal") |
| Subtitle (ASO) | **Mood Tracker, Diary & Journal** |
| App ID | 6759817879 |
| Listing URL | https://apps.apple.com/us/app/honestly-reflect-manifest/id6759817879 |
| Bundle ID | com.morning-journal.app |
| Seller | Ashwin Anbazhagan |
| Category | Productivity (primary), Lifestyle |
| Version | 3.3 (released 2026-06-21; v3.3 notes: "Journal history & full calendar now premium. Lifetime purchase option added") |
| Price | Free + Premium (one-time Lifetime purchase or monthly) |
| Min iOS | 18.0 |
| Languages | AR, EN, FR, DE, IT, JA, KO, PT, RU, ZH, ES (11) |
| Content rating | 4+ |
| Icon | site copy at `public/honestly.png` |

## Ratings (live, by storefront)

US 5.0 (2) — **total 2 ratings. Too few for AggregateRating schema; removed from site config until real volume exists.**

## Description (verbatim from listing)

> Be honest with yourself first.
>
> Honestly is a free journaling ritual for people who want to start the day with a clear head instead of a feed. Check your mood, write freely, note what you're grateful for — and watch a plant grow as your streak builds.
>
> FREE, FOREVER
> • Mood check — log how you actually feel
> • Free writing — empty your mind before the world fills it
> • Gratitude & manifest — anchor yourself in what matters
> • Reflection & shadow work prompts to go deeper
> • Your Sprout collection — a plant that grows the more you show up, across four stages
>
> GO PREMIUM
> Make your mornings distraction-proof:
> • App blocking — lock Instagram, TikTok and the rest on a schedule, with hard Screen Time blocking. No workarounds, no snoozing.
> • iCloud sync & backup — your journal, safe and synced across all your devices
> • Journal history & full calendar — look back on your journey
>
> Journaling, mood tracking and your streak are free forever. Premium unlocks app blocking, iCloud sync, and full history — one-time purchase or monthly.

## Feature facts — the ONLY claimable features for site/guide copy

1. Morning ritual: **mood check → free writing → gratitude & manifest** (free forever).
2. **Reflection & shadow work prompts** available to go deeper (optional prompts EXIST now — old "no prompts, no rules" site copy is outdated).
3. **Sprout collection** — a plant that grows with your streak across four stages.
4. Streak + mood calendar with mood distribution (free: current streak/mood tracking; **full history & calendar are Premium** as of v3.3).
5. Premium app blocking: lock chosen apps **on a schedule** with hard Screen Time blocking, "no workarounds, no snoozing" (blocking is Premium and schedule-based — not the old "asleep from 4 AM until you write" framing).
6. Affirmations still real (per fresh in-review screenshots): daily affirmations echo back, **Lock Screen affirmation widget**.
7. iCloud sync & backup (Premium).
8. 11 languages.
9. Pricing: free core; Premium = one-time Lifetime OR monthly.

## Screenshots (FRESH set for the in-review version — `public/honestly/screenshots/01-05.png`, 700×1521)

1. "Reclaim your mornings" — locked social apps; journaling steps for reflection, gratitude, intention
2. "Journal first, then your apps unlock" — morning greeting, app unlock status, weekly progress, affirmations
3. "Remember your best mornings" — journal entry detail: mood, text, daily affirmations
4. "Little encouragement, every day" — Lock Screen with affirmation widget
5. "See your progress" — calendar month view with mood emoji and mood distribution chart

Site copies: same folder converted to `01-05.webp` (640w q80). Live-listing screenshots intentionally NOT downloaded (stale).

## ASO keywords (inferred from name + subtitle + description)

reflect · manifest · mood tracker · diary · journal · journaling ritual · morning journal · gratitude journal · shadow work · manifestation · streak · app blocker · mindfulness

## Mismatches vs site (action items)

1. **Name**: site `name: 'Honestly'` (keep) — add `appStoreName: 'Honestly - Reflect & Manifest'`. Tagline "Morning Journal, Affirmations & App Blocker" → refresh with reflect/manifest layer.
2. **Store URL**: `/in/app/honestly-morning-journal/...` → normalize to `https://apps.apple.com/app/honestly-reflect-manifest/id6759817879`.
3. **aggregateRating 4.7/31 not defensible** (real: 2) → removed.
4. **Copy contradictions to fix** in apps.ts marketing + FAQs:
   - "no prompts, no rules / genuinely blank page" → free writing is still core, but reflection & shadow-work prompts exist as optional depth; stop claiming "no prompts" as an absolute.
   - "apps stay asleep from 4 AM until you've written" → blocking is Premium, schedule-based hard blocking.
   - Add: gratitude & manifest step, Sprout streak plant, journal history/calendar now Premium.
   - vs-Day-One FAQ answers reference old name/framing → touch up.
5. **SEO expansion**: rename opens manifestation-journal keyword cluster (new guides: manifestation-journal-app, scripting, vs-i-am, morning-manifestation-routine, 369-method). Keep ALL existing morning-journal keywords — the rename adds a layer, doesn't replace.
