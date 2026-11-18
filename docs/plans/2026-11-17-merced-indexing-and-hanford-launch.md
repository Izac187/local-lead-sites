# Plan: Merced indexing recovery + Hanford HVAC launch

- Status: in-progress
- Owner: Isaac Salinas
- Created: 2026-11-17
- Updated: 2026-11-17 (evening)

## Goal

1. Get all 23 Merced pages indexed (today only the homepage is) and stop Google from
   surfacing the `merced-roofing-pros.vercel.app` duplicate.
2. Launch Hanford HVAC as a second Vercel project from this repo (Tasks 22–23 of
   `docs/superpowers/plans/2026-07-14-multi-site-monorepo-hanford-hvac.md`).
3. Reach a state where Merced lead flow is measurable, so the site can be rented to
   a roofer in December 2026.

## Constraints

- Merced production must stay unchanged in content; only infra/SEO fixes.
- One repo, one Vercel project per site (decided 2026-07-14, see spec).
- No fabricated schema (ratings, reviews). Real data only.
- Follow DESIGN.md for any UI change.

## File-level tasks

- [x] `next.config.mjs`: 301 `*.vercel.app` → `SITE_DOMAIN` (default mercedroofingpro.com), production only.
- [x] `AGENTS.md`, `CLAUDE.md`, `.codex/config.toml`, `docs/plans/0000-template.md`: commit cross-agent memory structure.
- [ ] `config/sites/hanford-hvac/site.ts`: replace `TODO(owner-input)` domain/phone/email/googleVerification once owner supplies them.
- [x] `AGENTS.md`: add Hanford Vercel project to Deploy Configuration.
- [x] `IMPLEMENTATION.md`: session log row + Phase 8 Hanford note.

## Owner (manual) steps

- [ ] Search Console → URL Inspection → "Request indexing" for the 6 service + 6 city pages + /services, /locations, /blog. (Indexing API is disabled in GCP project 760086864657; enabling it is optional, manual works.)
- [ ] Confirm Google Business Profile phone verification completed (business.google.com).
- [ ] Enter Bing Places postcard PIN if the postcard arrived.
- [ ] Fix Foursquare listing: remove street address (SAB).
- [ ] Buy Hanford domain; supply phone (Google Voice) + lead email.
- [ ] Vercel → hanford-hvac-pros → Settings → Deployment Protection → turn off Vercel Authentication (API call was denied by the agent permission classifier).
- [ ] Add RESEND_API_KEY + LEAD_EMAIL to hanford-hvac-pros (copy from Merced or new Resend domain).
- [ ] Add call tracking (CallRail or Google Voice forwarding) so phone leads are counted.

## Acceptance criteria

- [x] `curl -I https://merced-roofing-pros.vercel.app/` returns 308 → mercedroofingpro.com (verified 2026-11-17).
- [ ] GSC shows ≥ 15 indexed pages for mercedroofingpro.com within 3 weeks.
- [x] Hanford Vercel project builds with `NEXT_PUBLIC_SITE=hanford-hvac` (deployment READY 2026-11-17; URL behind Vercel Authentication until disabled).
- [ ] Hanford custom domain live, GSC verified, sitemap submitted, test lead email received.

## Out of scope

- Sites 3–6 (Madera Plumbing, Tulare Tree, Madera Fence, Hanford Welding).
- Repo/folder rename (do after Hanford launch).
- Rate limiting on /api/lead, OG images, aggregateRating schema.

## Decisions

- 2026-11-17: Keep Hanford in this repo (config-per-site, project-per-site). Rename repo later.
- 2026-11-17: Monetization order: rent to one roofer (flat monthly) → pay-per-lead once call tracking exists → sell only if exiting niche.
- 2026-11-17: vercel.app redirect lives in `next.config.mjs` (not Vercel dashboard) so every site project inherits it via `SITE_DOMAIN`.

## Handoff

### 2026-11-17 (later) — Claude Code

- Completed: pushed a650840 + e85354b to main; Merced redeployed (200 on /, /services/roof-repair, hours still 7am–8pm); `merced-roofing-pros.vercel.app/*` now 308 → mercedroofingpro.com; `SITE_DOMAIN` set on Merced project; Vercel project `hanford-hvac-pros` created, git-linked to this repo, env `NEXT_PUBLIC_SITE=hanford-hvac`, first production deployment READY.
- Validation: tsc, lint, build (both sites), vitest 8/8; live curl checks above.
- Skipped: disabling Vercel Authentication on hanford-hvac-pros (permission denied to agent); Hanford RESEND/LEAD_EMAIL/SITE_DOMAIN (need owner inputs); Indexing API (disabled in GCP).
- Surprises or risks: `create_git_project` reuses the existing project for a repo; use `create_project` with `gitRepository` for a second project on the same repo. Redirect now requires SITE_DOMAIN to be set, so every new site project must set it when its domain goes live.
- Next step: owner completes the manual list (GSC request indexing, GBP check, Hanford domain/phone/email), then fill `config/sites/hanford-hvac/site.ts` owner inputs and run Task 23 steps 3–6.

### 2026-11-17 — Claude Code

- Completed: GSC diagnosis (1/23 pages indexed; vercel.app duplicate took ~1,150 impressions Jun–Oct); sitemap resubmitted to GSC; vercel.app 301 redirect added; both site builds + tests + tsc green.
- Validation: `NEXT_PUBLIC_SITE=merced npm run build`, `NEXT_PUBLIC_SITE=hanford-hvac npm run build`, `npm test` (8 passed), `tsc --noEmit` all green locally.
- Skipped: Indexing API batch (API disabled in GCP project). Hanford owner inputs not yet supplied.
- Surprises or risks: GSC sitemap had not been re-fetched since 2026-05-30. The redirect is gated on `VERCEL_ENV=production` so previews keep working.
- Next step: push to main, verify the 301 on production, then create the Hanford Vercel project with `NEXT_PUBLIC_SITE=hanford-hvac`.
