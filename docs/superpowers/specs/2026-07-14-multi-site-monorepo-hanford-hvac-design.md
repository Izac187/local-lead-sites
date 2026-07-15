# Multi-Site Monorepo + Hanford HVAC — Design Spec

**Date:** 2026-07-14
**Status:** Approved, ready for implementation planning
**Scope:** Refactor the Merced Roofing Pros codebase into a config-driven monorepo, then launch one new site (Hanford HVAC) end-to-end to prove the pattern. Sites 3–6 become a repeatable checklist afterward.

## Context

Site 1 (Merced Roofing Pros, `mercedroofingpro.com`) is live and earning: deploy pipeline, Resend lead email, custom domain, and sitemap all verified. The original plan assumed each new site was "only a `lib/config.ts` change." That assumption is false. Verified against origin/main, the template is a full local-SEO site:

- `lib/config.ts` (132 lines) — brand, contact, services summary, calculator, SEO.
- `lib/servicePages.ts` (234 lines) — **6 full service pages** (`ServicePageData[]`) + `getServiceBySlug`/`getAllServiceSlugs`, driving `/services/[service]`.
- `lib/cities.ts` (122 lines) — **6 city location pages** (`CityData[]`) + `getCityBySlug`/`getAllCitySlugs`, driving `/locations/[citySlug]`.
- `lib/blogPosts.ts` (275 lines) — **6 blog posts**, driving `/blog/[slug]`.
- `lib/geo.ts` (30 lines) — Haversine `getNearestCities`, reads `cities`.
- ~12 component/page files with hardcoded hero, FAQ, footer, and location-landing copy.

**351 hardcoded** roof/Merced/shingle/CSLB references across `app/`, `components/`, `lib/`. Build currently passes (baseline captured). This spec fixes the foundation so new sites are genuinely config-driven, and validates it with a second, structurally different niche (HVAC) at **full content parity**.

### Low-risk refactor strategy (keep public module APIs stable)

The data modules (`@/lib/config`, `@/lib/cities`, `@/lib/servicePages`, `@/lib/geo`, `@/lib/blogPosts`) are imported across many components. To protect Merced parity, the refactor keeps each module's **public exports identical** (same names, types, helper functions) and changes only their **data source**: from a hardcoded const to a per-site data module selected by `NEXT_PUBLIC_SITE`. Component files that only consume data do not change during the data-layer move. Only the ~12 files with hardcoded *copy strings* change, and only to read new `siteConfig` fields.

**Sites in the eventual portfolio:** Merced Roofing (live), Hanford HVAC (this spec), then Madera Plumbing, Tulare Tree Service, Madera Fence, Hanford Welding.

## Decisions (from brainstorming)

1. **Architecture:** One monorepo, config-per-site (not clone-per-repo, not multi-domain middleware).
2. **Calculator:** Per-niche calculators via a config-driven engine (not a generic quote form).
3. **This plan's scope:** Full monorepo refactor + Hanford HVAC at **full content parity** (6 services, 6 cities, 6 blog posts). Not the remaining 4 sites. (Revised from "lean launch" after discovering the template's full content layer.)

## Architecture

### Repo & deploy
- This repo becomes the monorepo. Add `config/sites/` with one file per site (`merced.ts`, `hanford-hvac.ts`, …), each exporting a `SiteConfig`.
- `lib/config.ts` becomes a **resolver**: reads `process.env.NEXT_PUBLIC_SITE` at build time, imports the matching site file, re-exports `siteConfig`. Defaults to `merced` when the env var is missing, so a misconfiguration never breaks the live earning site.
- **Each site = its own Vercel project, same GitHub repo**, distinguished by `NEXT_PUBLIC_SITE` plus its own domain, `RESEND_API_KEY`, and `LEAD_EMAIL`. Push to `main` → every project rebuilds with its own config. This delivers config-per-site without multi-domain middleware.

### Config extraction (the core refactor)
Today ~12 files hardcode roofing/Merced copy:
`app/layout.tsx`, `app/page.tsx`, `app/about/page.tsx`, `app/services/page.tsx`, `app/contact/page.tsx`, `app/calculator/page.tsx`, `app/merced-roofing/page.tsx`, `app/api/lead/route.ts`, `components/Footer.tsx`, `components/Header.tsx`, `components/SplitHero.tsx`, `components/FAQSection.tsx`, `components/Calculator.tsx`, `components/CalculatorSection.tsx`.

Extend the `SiteConfig` schema to own all of it, then refactor each file to read config instead of literals:
- Add `hero` (headline, subcopy), `faqs: [{ q, a }]`, `about` copy, `services` page copy, footer text, and location-landing page content.
- The hardcoded `app/merced-roofing/` route becomes **config-driven via a dynamic route**: rename to `app/[area]/page.tsx` with `generateStaticParams()` fed by `config.locationSlug`. Merced generates `/merced-roofing`, Hanford generates `/hanford-hvac`, from data — no per-site route directories.
  - Rejected alternative: a single static `app/service-area` route. Simpler but a weaker SEO slug.

### Config-driven calculator engine
Generalize the calculator so each niche defines its own, via two estimator kinds in config:
- **`lookup`:** composite key built from N select inputs → `[min, max]`. Covers roofing (today) and tree removal (height × count). `Calculator.tsx` builds the key generically instead of assuming exactly three nested levels.
- **`formula`:** `base + Σ(unit × quantity)` for number inputs. Covers HVAC (home sq-ft × system type), fence (linear feet), etc.

`Calculator.tsx` branches on `config.calculator.estimator.kind`. This covers all six niches with zero per-site component code.

## Components / units

| Unit | Purpose | Depends on |
|------|---------|-----------|
| `config/sites/*.ts` | Per-site data (copy, services, calculator, SEO, brand, contact) | `SiteConfig` type |
| `lib/config.ts` (resolver) | Select active site config by `NEXT_PUBLIC_SITE` | `config/sites/*` |
| `SiteConfig` type | Contract every site must satisfy; compile-time completeness check | — |
| `Calculator.tsx` (engine) | Render inputs + compute estimate from `config.calculator` | config |
| `app/[area]/page.tsx` | Config-driven location-landing page | config, `generateStaticParams` |
| Refactored copy files | Read hero/FAQ/about/services/footer from config | config |

## Data flow

Build time: Vercel sets `NEXT_PUBLIC_SITE` → `lib/config.ts` resolves the site file → all pages/components import `siteConfig` → static site generated for that site's domain. Runtime lead flow is unchanged from Merced: form submit → `app/api/lead/route.ts` → Resend → `LEAD_EMAIL`.

## Error handling / safety

- **Merced regression gate (hard):** after the refactor, the live Merced site must render identically. `npm run build` green for `NEXT_PUBLIC_SITE=merced`, plus a before/after screenshot diff on home, services, about, contact, calculator, and the location page. No refactor ships to the earning site without proven parity.
- **Missing-env default:** resolver falls back to `merced` if `NEXT_PUBLIC_SITE` is unset or unknown, with a build-time warning.
- **Type completeness:** `SiteConfig` makes every required field mandatory; a site file missing content fails `tsc`, not production.

## Testing

- `npm run build` green for both `NEXT_PUBLIC_SITE=merced` and `NEXT_PUBLIC_SITE=hanford-hvac`.
- Visual regression on Merced (before/after refactor) across the six key pages.
- Lead-form end-to-end on Hanford (submit → email received at `LEAD_EMAIL`).
- Both site configs type-check against `SiteConfig`.

## Hanford HVAC site (full parity)

New `config/sites/hanford-hvac/` mirroring Merced's content depth:
- Niche HVAC; city Hanford / Kings County, CA.
- `site.ts` — brand, contact, hero, FAQ, SEO, colors, schema, HVAC calculator (`formula` kind: home sq-ft × system type × job → range).
- `services.ts` — **6 HVAC service pages** (`ServicePageData[]`): AC installation, AC repair, furnace/heating, ductwork, HVAC maintenance, emergency HVAC repair. Full metaTitle/metaDescription/summary/bullets/faqs/estimateRange per service.
- `cities.ts` — **6 Kings County-area cities** (`CityData[]`): Hanford, Lemoore, Corcoran, Armona, Hardwick/Kings-area, Visalia-adjacent — each with HVAC-specific `uniqueNote`, zips, coords, POIs.
- `blog.ts` — **6 HVAC blog posts** matching the blogPosts shape.

Content is niche- and geo-accurate (Central Valley HVAC facts, Kings County permit offices, real climate load figures). DESIGN.md rules apply (no emoji, business hours everywhere the callback is mentioned).

Launch: new Vercel project → `NEXT_PUBLIC_SITE=hanford-hvac` → domain + Resend env → verify lead flow end-to-end (same checklist that launched Merced).

## Inputs required from user (during execution)

- Hanford HVAC **domain** (registered yet? e.g. `hanfordhvacpros.com`).
- **Phone** (Google Voice / CallRail) and **lead email** for Hanford.
- Real Central Valley HVAC pricing for the calculator, or approval to use researched typical rates.

## Out of scope

- Sites 3–6 (Madera Plumbing, Tulare Tree Service, Madera Fence, Hanford Welding) — repeatable checklist after this proves out.
- Multi-domain middleware routing (rejected: separate Vercel projects chosen instead).
- BrightLocal citation tracking and tenant/lead-forwarding setup (separate operational tasks).
