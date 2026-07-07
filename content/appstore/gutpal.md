# GutPal — App Store Listing Data

Pulled: 2026-07-07 · US storefront · via iTunes lookup API + listing page (`serialized-server-data`)

## Identity

| Field | Value |
|---|---|
| App Store name | **IBS Meal Planner - GutPal** |
| Subtitle (ASO) | **FODMAP Diet, IBD & Gut Recipes** |
| App ID | 6755035965 |
| Listing URL | https://apps.apple.com/us/app/ibs-meal-planner-gutpal/id6755035965 |
| Seller | Ashwin Anbazhagan |
| Category | Health & Fitness (primary), Lifestyle |
| Version | 4.3 (released 2026-06-23) |
| First released | (App Store) — originally shipped as "Gut Buddy Food Scanner" (old slug survives in /in/ URL) |
| Price | Free + GutPal Pro subscription (weekly / monthly / yearly, 3-day free trial) |
| Min iOS | 15.1 |
| Languages | EN |
| Content rating | 4+ |
| Icon (512) | https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/ .../AppIcon (see `artworkUrl512` in lookup; site copy at `public/gutpal.png`) |

## Ratings (live, by storefront)

US 5.0 (1) · CA 1.0 (1) — **total 2 ratings. Too few for AggregateRating schema; removed from site config until real volume exists.**

## Description (verbatim from listing)

> You know which foods hurt. You've read the FODMAP lists, avoided the triggers, and still ended up doubled over after dinner. The problem isn't effort — it's that no one ever just told you what to eat.
>
> GutPal does.
>
> Tell us what's in your kitchen and how your gut behaves. We'll hand you a week of gut-safe meals — built around your conditions, your triggers, and what you already have in the fridge. No logging. No tracking. Just food that doesn't hurt.
>
> For IBS, IBD, SIBO, Crohn's, Colitis, Celiac disease, GERD, lactose intolerance, histamine intolerance — and anyone following a low-FODMAP or Mediterranean diet. All FODMAP data is aligned with Monash University research.
>
> Not sure what to order tonight? GutPal reads the menu and tells you what's safe for your gut and what to skip.
>
> Download free. Your first gut-safe plan is ready in minutes.
>
> SUBSCRIPTION INFORMATION
> GutPal Pro unlocks unlimited meal plans, restaurant guides, and personalized gut-health features. A 3-day free trial is included — no charge until your trial ends.
> • Weekly • Monthly • Yearly

## Feature facts — the ONLY claimable features for site/guide copy

1. Kitchen-first weekly meal plans: user enters pantry/fridge contents + gut profile → a week of gut-safe meals. No food logging, no tracking.
2. Gut profile conditions supported: IBS, IBD, SIBO, Crohn's, Colitis, Celiac, GERD, lactose intolerance, histamine intolerance; low-FODMAP and Mediterranean diets.
3. FODMAP data aligned with Monash University research.
4. Restaurant help: **scan/read restaurant menus in seconds** → gut-safe order recommendations (what to order, what to skip); restaurant directory. (Confirmed by live screenshots 05-06 + description.)
5. Recipe details with ingredients, health benefits, step-by-step instructions; cookbook of saved recipes; pantry organized by category; streak + plant count on home screen.
6. Free download; Pro = unlimited meal plans, restaurant guides, personalization; 3-day trial; weekly/monthly/yearly.

**NOT claimable (scanner-era fabrications still present in old pSEO pages):** grocery **barcode** scanning, "3M+ product database", OpenFoodFacts, Safe/Limit/Avoid verdict labels, allergen/anaphylaxis safety claims, carb counting/diabetes features, "100+ conditions".

## Screenshots (current listing, 7 × 1320×2868, staged in `content/appstore/raw/gutpal/`)

1. "Plan meals in minutes" — home screen: personalized greeting, plant count, streak, today's recipe
2. "Cook with confidence" — recipe detail: ingredients, health benefits, numbered cooking instructions
3. "Build meals with pantry" — pantry management by produce/fruit/protein categories
4. "Save favourite recipes" — cookbook with six saved meals (breakfast/lunch/dinner)
5. "Enjoy dining" — restaurant directory with cuisine and specialty descriptions
6. "Scan restaurant menus in seconds" — gut-safe order recommendations: items to order and skip
7. "Personalized to your gut" — profile: conditions, symptoms, diet, allergies, statistics

Site copies: `public/gutpal/screenshots/01-07.webp` (640w q80).

## ASO keywords (inferred from name + subtitle + description)

ibs meal planner · fodmap diet · ibd · gut recipes · low fodmap · gut-safe meals · monash fodmap · sibo · crohn's · colitis · celiac · gerd · histamine intolerance · mediterranean diet · what to eat with ibs

## Mismatches vs site (action items)

1. **Name**: site `name: 'GutPal'` (keep for prose) — add `appStoreName: 'IBS Meal Planner - GutPal'` for JSON-LD/app meta.
2. **Store URL**: site uses stale `/in/app/gut-buddy-food-scanner-ibs/...` → normalize to `https://apps.apple.com/app/ibs-meal-planner-gutpal/id6755035965` (country-less; redirects to visitor storefront).
3. **aggregateRating 4.8/47 is not defensible** (real: 2 ratings) → removed.
4. Site tagline/copy is meal-planner-first ✓ aligned; ensure subtitle keywords ("FODMAP Diet, IBD & Gut Recipes") appear in seo.title/description.
5. Restaurant feature: site benefit "Eat out without anxiety... tells you what to order" ✓ matches live "reads the menu"; do NOT reintroduce barcode-scanner claims.
6. 14/20 existing pSEO pages describe the retired scanner product → 3 retired (allergy ×2, diabetes), rest rewritten to meal-planner + menu-reading reality.
