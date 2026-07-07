# YumeShip — App Store Listing Data

Pulled: 2026-07-07 · US storefront · via iTunes lookup API + listing page (`serialized-server-data`)
**A new version is in App Store review** — the LIVE listing screenshots are stale; the fresh 6-screenshot set was provided from `~/Downloads` (App Store Connect 6.9" exports, 1320×2868) and is the source of truth for site imagery.

## Identity

| Field | Value |
|---|---|
| App Store name | **Yumeship - Anime & Kpop Canon** |
| Subtitle (ASO) | **Journal for every Yumeshipper** |
| App ID | 6773642234 |
| Listing URL | https://apps.apple.com/us/app/yumeship-anime-kpop-canon/id6773642234 |
| Seller | Ashwin Anbazhagan |
| Category | Entertainment (primary), Photo & Video |
| Version | 1.1.0 (released 2026-06-26) |
| Price | Free + Premium subscription (weekly / monthly / yearly) |
| Min iOS | 16.4 |
| Languages | EN, JA, KO, ZH |
| Content rating | (see listing) |
| Icon | site copy at `public/yumeship.png` |

## Ratings (live, by storefront)

US 4.48 (62) · GB 5.0 (3) · CA 5.0 (8) · AU 3.0 (1) · FR 5.0 (1) · JP 4.0 (1) · MX 5.0 (5) — **total 81 ratings, weighted average ≈ 4.6. Defensible → site config set to 4.6 / 81.**

## Description (verbatim from listing)

> YumeShip is a private journal built for yumeshippers.
>
> Write headcanons, scenarios, love letters, and what-ifs about your favorite anime, otome, manga, or kpop F/O — all in one soft, beautiful space that belongs only to you.
>
> YOUR YUMESHIP, YOUR WAY
> Choose from templates designed around how you ship — get to know your F/O, explore what-ifs, write love letters, track dates and memories.
>
> KEEP IT PRIVATE
> Nothing leaves your device. No social feed, no sharing — just you and your yumeship.
>
> MADE FOR EVERY SHIPPER
> Anime, otome, manga, kpop, waifu, husbando — whoever your F/O is, there's a space for them here.
>
> YUMESHIP PREMIUM
> Unlock unlimited ships, templates & more with a Premium subscription: • Weekly • Monthly • Yearly

## Feature facts — the ONLY claimable features for site/guide copy

1. Private journal for yumeshippers: headcanons, scenarios, love letters, what-ifs about anime/otome/manga/kpop F/Os.
2. Ship templates: get to know your F/O, what-ifs, love letters, dates & memories tracking.
3. **Fully on-device**: nothing leaves your device, no social feed, no sharing, no accounts.
4. For every shipper: anime, otome, manga, kpop, waifu, husbando.
5. New-version features (from fresh in-review screenshots — shipping with the update):
   - **F/O notifications** — "notifications from your F/O" (e.g. "drink some water for me. okay?")
   - **Ship charts & poly dynamics** — "make it canon": relationship analysis, profiles
   - **Polycule bingo** — checkable bingo game; **scenario prompts** list ("dream up, play games")
   - **Incorrect quotes generator** — starring your F/O, with scene options
   - **Messages from your F/O** — private message-thread interface
   - **Albums & self-inserts** — feature grid: headcanons, scenarios, messages, albums
6. Free: 1 ship. Premium: unlimited ships, all templates (weekly/monthly/yearly).

**NOT claimable (couples-era fabrications in old pSEO pages):** partner/couple shared feeds, color mood tracking between partners, countdown timers to visits, shared timelines, invite-only communities, E2E-encrypted servers, fanfic publishing/discovery, beta readers, collaborative spaces, cloud sync.

## Screenshots (FRESH set for in-review version, staged from ~/Downloads)

1. "A private world for your yumeship" — journal with character photos, info, and F/O notification popup
2. "Ship charts and poly dynamics — make it canon" — relationship analysis tools, bingo, profiles
3. "Dream up, play games" — scenario prompts list and polycule bingo with checkable squares
4. "Incorrect quotes starring your F/O" — incorrect-quote generator with character conversation
5. "Love letters, dates, albums, self-inserts" — new-ship feature grid: headcanons, scenarios, messages, albums
6. "Messages only your F/O sends" — private messaging interface with playful conversation

Site copies: `public/yumeship/screenshots/01-06.webp` (640w q80); stale `public/yumeship/1-4.webp` deleted.

## ASO keywords (inferred from name + subtitle + description)

yumeship · yumeshipping · anime · kpop · canon · f/o · fictive other · headcanon · self ship · otome · waifu · husbando · ship journal · fandom journal · love letters · scenarios

## Mismatches vs site (action items)

1. **Name**: site `name: 'YumeShip'` (keep) — add `appStoreName: 'Yumeship - Anime & Kpop Canon'`.
2. **aggregateRating**: site 4.7/80 → real **4.6/81** (defensible, updated).
3. Store URL already country-less with current slug ✓.
4. **6 stale/fabricated pSEO pages**: 2 couples-era + 2 fake-community/fanfic-platform pages retired (301), `anime-fan-community-app` rewritten to solo private-journal angle, near-duplicate shipping trio consolidated.
5. New-version features (F/O notifications, incorrect quotes, polycule bingo, ship charts) are fresh marketing angles for landing benefits + new guides.
