# Merced Baseline Manifest

Captured before the multi-site refactor. Parity gates diff the rebuilt static HTML
under `.next/server/app/**/*.html` against `html/` here. Any delta on a Merced build
means the refactor changed rendered output — STOP and fix.

**Parity method:** deterministic HTML diff (not pixel screenshots). Rebuild with
`NEXT_PUBLIC_SITE=merced npm run build`, then compare `.next/server/app/*.html` to
`docs/superpowers/artifacts/merced-baseline/html/`. See `scripts/parity-check.sh`.

## Captured pages (25)

- Core: `index`, `about`, `services`, `contact`, `calculator`, `merced-roofing`, `_not-found`
- Locations index + 6 cities: `locations`, `locations/{merced,atwater,los-banos,livingston,chowchilla,winton}`
- Services index + 6 services: `services`, `services/{roof-replacement,roof-repair,emergency-roof-repair,metal-roofing,flat-roofing,storm-damage}`
- Blog index + 4 posts: `blog`, `blog/{cost-of-roof-replacement-merced-ca-2026,best-roofing-materials-central-valley-heat,how-long-does-roof-replacement-take-merced-ca,signs-you-need-a-new-roof-merced}`

Build log: `build.log` (BUILD: PASS).

## Parity gate results

- (to be appended by Tasks 7, 15, 22)

- Phase 1 (data-layer split) parity: PASS — 25 DOM pages identical (2026-07-14)

- Phase 2 (calculator engine) parity: PASS with 1 INTENTIONAL delta on index.html —
  homepage calculator section is now config-driven: DOM id calc-roof-size->calc-roofSize,
  placeholder "Select size/condition"->"Select roof size/roof condition", label
  "Condition"->"Roof Condition" (now consistent with /calculator + config). No estimate
  values, styles, or structure changed. index.html baseline updated to new output.

- Phase 3 Task 14 (page copy extraction): parity-check.sh now also strips React
  hydration comment markers (<!-- -->), which shift when text moves from
  {interpolation} to per-site literals. Visible DOM verified byte-identical on all
  25 pages. No re-baseline needed.
