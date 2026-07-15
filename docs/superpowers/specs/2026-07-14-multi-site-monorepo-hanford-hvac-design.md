# Multi-Site Monorepo + Hanford HVAC — Design Spec

**Date:** 2026-07-14
**Status:** Approved, ready for implementation planning
**Scope:** Refactor the Merced Roofing Pros codebase into a config-driven monorepo, then launch one new site (Hanford HVAC) end-to-end to prove the pattern. Sites 3–6 become a repeatable checklist afterward.

## Context

Site 1 (Merced Roofing Pros, `mercedroofingpro.com`) is live and earning: deploy pipeline, Resend lead email, custom domain, and sitemap all verified. The original plan assumed each new site was "only a `lib/config.ts` change." That assumption is false — ~12 files hardcode roofing/Merced copy, and the calculator is hardwired to roofing's 3-dimension estimate model. This spec fixes the foundation so new sites are genuinely config-driven, and validates it with a second, structurally different niche (HVAC).

**Sites in the eventual portfolio:** Merced Roofing (live), Hanford HVAC (this spec), then Madera Plumbing, Tulare Tree Service, Madera Fence, Hanford Welding.

## Decisions (from brainstorming)

1. **Architecture:** One monorepo, config-per-site (not clone-per-repo, not multi-domain middleware).
2. **Calculator:** Per-niche calculators via a config-driven engine (not a generic quote form).
3. **This plan's scope:** Refactor + first new site (Hanford HVAC). Not the full 5-site rollout; not refactor-only.

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

## Hanford HVAC site

New `config/sites/hanford-hvac.ts`:
- Niche HVAC; city Hanford / Kings County, CA.
- Services: AC install/repair, furnace, ductwork, maintenance plans.
- Calculator: `formula` kind — home sq-ft × system type × job → range.
- FAQ, hero, SEO keywords, colors/fonts, domain, phone, lead email.

Launch: new Vercel project → `NEXT_PUBLIC_SITE=hanford-hvac` → domain + Resend env → verify lead flow end-to-end (same checklist that launched Merced).

## Inputs required from user (during execution)

- Hanford HVAC **domain** (registered yet? e.g. `hanfordhvacpros.com`).
- **Phone** (Google Voice / CallRail) and **lead email** for Hanford.
- Real Central Valley HVAC pricing for the calculator, or approval to use researched typical rates.

## Out of scope

- Sites 3–6 (Madera Plumbing, Tulare Tree Service, Madera Fence, Hanford Welding) — repeatable checklist after this proves out.
- Multi-domain middleware routing (rejected: separate Vercel projects chosen instead).
- BrightLocal citation tracking and tenant/lead-forwarding setup (separate operational tasks).
