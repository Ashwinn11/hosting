# Her 75 — App Data (IN REVIEW — no public App Store listing yet)

Compiled: 2026-07-07 · Source: local site config (`src/config/apps.ts`) + `public/her75/preview.png`.
The iTunes lookup API returns no result for id6786597603 in any storefront — the app is in App Store review. **Re-pull listing data (name, subtitle, description, screenshots, ratings) once it goes live and update this file + apps.ts.**

## Identity (from config)

| Field | Value |
|---|---|
| Name | **Her 75** |
| App ID | 6786597603 (reserved; `apple-itunes-app` meta + store links already wired) |
| Store URL | https://apps.apple.com/app/id6786597603 (country-less; will resolve when live) |
| Category | Health & Fitness (`HealthApplication`) |
| Tagline | 75-Day Challenge Tracker for Women |
| Price | Free to download · Premium subscription (weekly / monthly / yearly) |

## Positioning (from config — treat as listing-equivalent copy)

> Become her in 75 days. Choose your hard — from a gentle reset to the full 75 — and show up every day with daily missions, proof photos, and a circle of women who won't let you quit.

## Feature facts — the ONLY claimable features for site/guide copy

1. **Choose your hard**: 75 Soft (gentle reset), full hard mode, Glow Up, Sugar-Free, Mental Wellness, Better Me, or build your own custom challenge.
2. **Daily missions**: simple daily checklist — workout, water, reading, clean eating, progress photo.
3. **Proof photos**: snap a proof photo per task; camera roll becomes a record of the journey.
4. **Photo calendar**: every proof photo lands in a calendar of the challenge; one tap replays any day.
5. **Streak protection & missed-day recovery** on most tracks — one off day doesn't reset to zero (unlike hard-reset apps).
6. **Home-screen widget**: check off missions from the widget.
7. **Friends / accountability circle**: add friends, follow each other's progress (display name, optional photo, current day + streak via shared CloudKit).
8. Privacy: challenge data + proof photos stay on device / private iCloud (CloudKit); proof photos never leave the user's own iCloud.
9. Pricing: free download; Premium unlocks every challenge and feature (weekly/monthly/yearly).
10. NOT medical/fitness advice (terms state this explicitly — guides must not make health claims).

**No ratings exist — NEVER add AggregateRating schema pre-launch.**

## Screenshots

Only `public/her75/preview.png` (647×1400): Day-1 tracker view with completed tasks — workout, water intake, reading, clean eating. Site copy: `public/her75/screenshots/01.webp`. **Swap in the real App Store screenshot set at launch.**

## Competitive context (for guide/compare content)

- **her75app.com** — name-colliding competitor: a "Her 75" wellness challenge tracked in the "Reset 75" app. Differentiate on proof photos + friends circle + streak protection.
- "75 Her: Challenge for Girlies" (id6767649443), "75 Soft Challenge Tracker: Fem" (id6740633846) — subtitle keywords confirm "girlies"/"fem" demand.
- Official 75 HARD app (Andy Frisella): strict, male-coded, hard-reset on missed day — the anti-thesis to position against.

## Target keyword set (launch content, 14 pages)

75 soft challenge app · 75 hard for women · what happens if you miss a day of 75 hard · 75 hard official app alternative · 75 soft vs 75 hard · glow up challenge app · 75 hard with friends · habit tracker with photo proof · sugar free challenge app · 75 hard rules · 75 day challenge ideas · 75 day mental health challenge · finch alternative structured challenge · best 75 day challenge app
