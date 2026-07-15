# Multi-Site Monorepo + Hanford HVAC Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the single-site Merced Roofing Pros codebase into a config-driven monorepo where each site is selected by `NEXT_PUBLIC_SITE`, then launch Hanford HVAC at full content parity (6 services, 6 cities, 6 blog posts) as a second Vercel project from the same repo.

**Architecture:** Per-site data lives in `config/sites/<slug>/`. A resolver reads `NEXT_PUBLIC_SITE` at build time and re-exports the active site's data through the existing `@/lib/*` module paths, so consuming components are unchanged. Hardcoded copy in ~12 component/page files moves into `siteConfig`. The roofing-only calculator becomes a shared, config-driven engine supporting `lookup` and `formula` estimators.

**Tech Stack:** Next.js 14 (App Router, static export via `generateStaticParams`), TypeScript, Tailwind + CSS vars, Resend (lead email), Vitest (new — engine unit tests), Vercel (per-site projects).

## Global Constraints

- **Merced parity is a hard gate.** `mercedroofingpro.com` is live and earning. After every refactor phase, `NEXT_PUBLIC_SITE=merced npm run build` must pass and Merced pages must render byte-for-byte equivalent (screenshot diff on the 6 key page types). Never ship a refactor that changes Merced's rendered output.
- **Default site = `merced`.** The resolver falls back to `merced` when `NEXT_PUBLIC_SITE` is unset/unknown, and logs a build-time warning. A misconfigured env var must never break the earning site.
- **No emoji anywhere** (DESIGN.md). Service cards use numbered style. Existing `☎` in `app/merced-roofing/page.tsx:27` is pre-existing; do not add new emoji.
- **Business hours (Mon–Sat, 7am–8pm) must appear everywhere the 30-min/callback promise is mentioned** (DESIGN.md).
- **Fonts are Bebas Neue (display) + DM Sans (body), set in `app/layout.tsx`.** `siteConfig.fonts` is currently unused/stale — do not wire it to layout without explicit approval; keep Bebas+DM Sans for all sites unless the user says otherwise.
- **All `@/lib/*` public exports keep identical names and signatures** through the refactor: `siteConfig`, `cities`, `getCityBySlug`, `getAllCitySlugs`, `servicePages`, `getServiceBySlug`, `getAllServiceSlugs`, `getNearestCities`, `blogPosts` + its helpers. Only their data *source* changes.
- **TypeScript strictness:** every site's data must satisfy the shared interfaces (`SiteConfig`, `CityData`, `ServicePageData`, blog post type). A missing field must fail `tsc`, not production.
- **Commit frequently**, one logical unit per commit, using the message shown in each task's final step.

---

## Phase overview

- **Phase 0 — Baseline & safety net** (Tasks 1–2): capture Merced's current rendered output + build baseline; add Vitest.
- **Phase 1 — Resolver & data-layer split** (Tasks 3–7): introduce `NEXT_PUBLIC_SITE` resolver; move config/cities/services/blog data into `config/sites/merced/` behind unchanged `@/lib/*` APIs. Merced parity gate.
- **Phase 2 — Calculator engine** (Tasks 8–10): extract a shared, tested `lib/calculator.ts` supporting `lookup` + `formula`; rewire both calculator components generically.
- **Phase 3 — Copy extraction** (Tasks 11–15): move hardcoded hero/FAQ/footer/location copy into `siteConfig`; convert `app/merced-roofing` to config-driven `app/[area]`. Merced parity gate.
- **Phase 4 — Hanford HVAC content** (Tasks 16–20): author `config/sites/hanford-hvac/` at full parity (site, 6 services, 6 cities, 6 blog posts, HVAC calculator).
- **Phase 5 — Launch** (Tasks 21–23): sitemap/lead-route per-site correctness; Vercel project + domain + env; end-to-end lead verification.

Each phase ends green (`build` passes for every configured site) and is independently reviewable.

---

## Phase 0 — Baseline & safety net

### Task 1: Capture Merced baseline (build log + reference screenshots)

**Files:**
- Create: `docs/superpowers/artifacts/merced-baseline/` (screenshots + build log — gitignored artifacts dir is fine, but commit a manifest)
- Create: `docs/superpowers/artifacts/merced-baseline/MANIFEST.md`

**Interfaces:**
- Produces: a reference set of Merced screenshots + a recorded route list that Tasks 7, 15, and every parity gate diff against.

- [ ] **Step 1: Record the baseline build + route list**

Run:
```bash
NEXT_PUBLIC_SITE=merced npm run build 2>&1 | tee docs/superpowers/artifacts/merced-baseline/build.log
```
Expected: build PASS; the log lists routes including `/`, `/about`, `/services`, `/services/[service]` (6 paths), `/locations`, `/locations/[citySlug]` (6 paths), `/blog/[slug]` (6 paths), `/calculator`, `/contact`, `/merced-roofing`, `/sitemap.xml`, `/robots.txt`.

- [ ] **Step 2: Capture reference screenshots of the 6 page types**

Start the built site and screenshot each representative page with the browse skill:
```bash
NEXT_PUBLIC_SITE=merced npm run start &
# then via /browse skill, screenshot each URL at 1280px and 390px widths:
#   /  /about  /services  /services/roof-replacement
#   /locations  /locations/merced  /blog  (a blog post)  /calculator  /contact  /merced-roofing
```
Save each PNG under `docs/superpowers/artifacts/merced-baseline/`.

- [ ] **Step 3: Write the manifest**

Create `docs/superpowers/artifacts/merced-baseline/MANIFEST.md` listing every captured URL and screenshot filename, plus the total route count from the build log. This is the parity checklist.

- [ ] **Step 4: Commit**

```bash
git add docs/superpowers/artifacts/merced-baseline/
git commit -m "test: capture Merced pre-refactor baseline (build log + reference screenshots)"
```

---

### Task 2: Add Vitest for engine unit tests

**Files:**
- Modify: `package.json` (add `vitest` devDep + `test` script)
- Create: `vitest.config.ts`
- Create: `lib/__tests__/smoke.test.ts` (proves the runner works, then deleted in Task 8)

**Interfaces:**
- Produces: `npm test` runs Vitest in `lib/**/*.test.ts`. Consumed by Tasks 8–10.

- [ ] **Step 1: Install Vitest**

Run:
```bash
npm install -D vitest@^2
```
Expected: `vitest` added to `devDependencies`.

- [ ] **Step 2: Add the test script**

Modify `package.json` `scripts` to add:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: { include: ["lib/**/*.test.ts"], environment: "node" },
  resolve: { alias: { "@": path.resolve(__dirname, ".") } },
});
```

- [ ] **Step 4: Write a smoke test**

Create `lib/__tests__/smoke.test.ts`:
```ts
import { describe, it, expect } from "vitest";

describe("vitest runner", () => {
  it("runs", () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 5: Run it**

Run: `npm test`
Expected: 1 passing test.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json vitest.config.ts lib/__tests__/smoke.test.ts
git commit -m "test: add vitest for engine unit tests"
```

---

## Phase 1 — Resolver & data-layer split

The goal: introduce `config/sites/merced/` holding the data currently hardcoded in `lib/`, and a resolver that selects a site by `NEXT_PUBLIC_SITE`. The `@/lib/*` modules become thin adapters that re-export the active site's data plus the unchanged interfaces/helpers. Consuming components do not change.

### Task 3: Site registry + resolver skeleton (default merced)

**Files:**
- Create: `config/sites/registry.ts`
- Create: `config/sites/merced/index.ts` (temporary re-export of current lib data; filled in Tasks 4–6)
- Create: `lib/site.ts` (the resolver)
- Test: `lib/site.test.ts`

**Interfaces:**
- Produces:
  - `type SiteSlug` = union of registered slugs (`"merced" | "hanford-hvac"`).
  - `resolveSiteSlug(): SiteSlug` — reads `process.env.NEXT_PUBLIC_SITE`, returns it if registered, else warns and returns `"merced"`.
  - `getActiveSite(): SiteBundle` — returns the active site's `{ config, cities, servicePages, blogPosts }`.
  - `type SiteBundle = { config: SiteConfig; cities: CityData[]; servicePages: ServicePageData[]; blogPosts: BlogPost[] }`.
- Consumes: nothing yet (Task 4 supplies real data).

- [ ] **Step 1: Write the failing resolver test**

Create `lib/site.test.ts`:
```ts
import { describe, it, expect, afterEach } from "vitest";
import { resolveSiteSlug } from "@/lib/site";

const orig = process.env.NEXT_PUBLIC_SITE;
afterEach(() => { process.env.NEXT_PUBLIC_SITE = orig; });

describe("resolveSiteSlug", () => {
  it("defaults to merced when unset", () => {
    delete process.env.NEXT_PUBLIC_SITE;
    expect(resolveSiteSlug()).toBe("merced");
  });
  it("defaults to merced when unknown", () => {
    process.env.NEXT_PUBLIC_SITE = "nope";
    expect(resolveSiteSlug()).toBe("merced");
  });
  it("returns a registered slug", () => {
    process.env.NEXT_PUBLIC_SITE = "hanford-hvac";
    expect(resolveSiteSlug()).toBe("hanford-hvac");
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test -- lib/site.test.ts`
Expected: FAIL — cannot resolve `@/lib/site`.

- [ ] **Step 3: Create the registry**

Create `config/sites/registry.ts`:
```ts
// Slugs registered here are the valid values for NEXT_PUBLIC_SITE.
// Each must have a matching config/sites/<slug>/index.ts default export.
export const SITE_SLUGS = ["merced", "hanford-hvac"] as const;
export type SiteSlug = (typeof SITE_SLUGS)[number];
export const DEFAULT_SITE: SiteSlug = "merced";
```

- [ ] **Step 4: Create a temporary merced bundle**

Create `config/sites/merced/index.ts` (re-exports current lib data so nothing breaks; replaced piecemeal in Tasks 4–6):
```ts
import { siteConfig } from "@/lib/config.data";       // created in Task 4
import { cities } from "@/lib/cities.data";           // created in Task 5
import { servicePages } from "@/lib/servicePages.data";// created in Task 5
import { blogPosts } from "@/lib/blogPosts.data";      // created in Task 6
import type { SiteBundle } from "@/lib/site";

const bundle: SiteBundle = { config: siteConfig, cities, servicePages, blogPosts };
export default bundle;
```
> Note: the `.data` modules are the current hardcoded arrays, physically moved in Tasks 4–6. Until then, this file will not type-check; that is expected — Task 3 ships only `registry.ts`, `lib/site.ts`, and the test. Create `config/sites/merced/index.ts` in Task 6's final step, not here. (Delete this stub note when Task 6 lands.)

- [ ] **Step 5: Write the resolver**

Create `lib/site.ts`:
```ts
import { SITE_SLUGS, DEFAULT_SITE, type SiteSlug } from "@/config/sites/registry";
import type { SiteConfig } from "@/lib/config";
import type { CityData } from "@/lib/cities";
import type { ServicePageData } from "@/lib/servicePages";
import type { BlogPost } from "@/lib/blogPosts";

export type SiteBundle = {
  config: SiteConfig;
  cities: CityData[];
  servicePages: ServicePageData[];
  blogPosts: BlogPost[];
};

export function resolveSiteSlug(): SiteSlug {
  const raw = process.env.NEXT_PUBLIC_SITE;
  if (raw && (SITE_SLUGS as readonly string[]).includes(raw)) return raw as SiteSlug;
  if (raw) console.warn(`[site] Unknown NEXT_PUBLIC_SITE="${raw}", falling back to "${DEFAULT_SITE}"`);
  return DEFAULT_SITE;
}
```
> `getActiveSite()` is added in Task 6 once all `.data` modules exist; adding it now would create an unresolvable import. Task 3 delivers only `resolveSiteSlug`.

- [ ] **Step 6: Run the test to verify it passes**

Run: `npm test -- lib/site.test.ts`
Expected: 3 passing tests.

- [ ] **Step 7: Commit**

```bash
git add config/sites/registry.ts lib/site.ts lib/site.test.ts
git commit -m "feat: add site registry + NEXT_PUBLIC_SITE resolver (defaults to merced)"
```

---

### Task 4: Move `lib/config.ts` data into a `.data` module behind an adapter

**Files:**
- Create: `lib/config.data.ts` (current `siteConfig` object verbatim + `SiteConfig` type)
- Modify: `lib/config.ts` → adapter that re-exports the active site's config
- Test: extend `lib/site.test.ts` or add `lib/config.test.ts`

**Interfaces:**
- Consumes: `resolveSiteSlug` (Task 3).
- Produces: `@/lib/config` still exports `{ siteConfig, type SiteConfig }`, now sourced from the active site. Identical shape to today.

- [ ] **Step 1: Physically move the current object**

`git mv lib/config.ts lib/config.data.ts`. In `lib/config.data.ts`, keep the `siteConfig` object and `SiteConfig` type exactly as-is (this is Merced's data).

- [ ] **Step 2: Create the adapter `lib/config.ts`**

```ts
// Public API — unchanged for all consumers. Data source is the active site.
import mercedConfig from "@/lib/config.data";
export type { SiteConfig } from "@/lib/config.data";

// During Phase 1 only merced data exists; the resolver import is wired in Task 6.
// Until then, re-export merced directly so every consuming component still builds.
export const siteConfig = mercedConfig;
```
> `mercedConfig` default export: add `export default siteConfig;` to the bottom of `lib/config.data.ts`.

- [ ] **Step 3: Verify build + type-check**

Run: `NEXT_PUBLIC_SITE=merced npm run build`
Expected: PASS, same route list as Task 1 baseline.

- [ ] **Step 4: Commit**

```bash
git add lib/config.ts lib/config.data.ts
git commit -m "refactor: split lib/config into data module + site adapter"
```

---

### Task 5: Move cities + servicePages data into `.data` modules behind adapters

**Files:**
- Create: `lib/cities.data.ts`, `lib/servicePages.data.ts` (current arrays verbatim)
- Modify: `lib/cities.ts`, `lib/servicePages.ts` → adapters (keep interfaces + helper functions; source array from active site)
- Note: `lib/geo.ts` imports `{ cities }` from `@/lib/cities` — keep that export name so geo.ts is untouched.

**Interfaces:**
- Produces: `@/lib/cities` exports `{ cities, type CityData, getCityBySlug, getAllCitySlugs }`; `@/lib/servicePages` exports `{ servicePages, type ServicePageData, getServiceBySlug, getAllServiceSlugs }` — all identical signatures, data from active site.

- [ ] **Step 1: Move the arrays**

`git mv lib/cities.ts lib/cities.data.ts` and `git mv lib/servicePages.ts lib/servicePages.data.ts`. In each `.data.ts`, keep ONLY the interface + the data array (as `export const cities: CityData[]` / `export const servicePages: ServicePageData[]`). Remove the helper functions from `.data.ts` (they move to the adapter). Add a default export of the array.

Also in `lib/cities.data.ts`: rename the interface field `driveFromMerced` → `driveFromHub` (Merced-specific name). Update the merced data values accordingly (keep the same string values). Note every consumer of `driveFromMerced` for update in Step 3.

- [ ] **Step 2: Create adapter `lib/cities.ts`**

```ts
export type { CityData } from "@/lib/cities.data";
import type { CityData } from "@/lib/cities.data";
import mercedCities from "@/lib/cities.data";

// Phase 1: source from merced directly; swapped to resolver in Task 6.
export const cities: CityData[] = mercedCities;

export function getCityBySlug(slug: string): CityData | undefined {
  return cities.find((c) => c.citySlug === slug);
}
export function getAllCitySlugs(): string[] {
  return cities.map((c) => c.citySlug);
}
```

- [ ] **Step 3: Create adapter `lib/servicePages.ts`** (same pattern, with `getServiceBySlug`/`getAllServiceSlugs`)

```ts
export type { ServicePageData } from "@/lib/servicePages.data";
import type { ServicePageData } from "@/lib/servicePages.data";
import mercedServices from "@/lib/servicePages.data";

export const servicePages: ServicePageData[] = mercedServices;

export function getServiceBySlug(slug: string): ServicePageData | undefined {
  return servicePages.find((s) => s.slug === slug);
}
export function getAllServiceSlugs(): string[] {
  return servicePages.map((s) => s.slug);
}
```

- [ ] **Step 4: Fix any `driveFromMerced` consumers**

Run: `grep -rn "driveFromMerced" app components lib`
Update each to `driveFromHub`. Expected consumers: `app/locations/[citySlug]/page.tsx`.

- [ ] **Step 5: Verify build**

Run: `NEXT_PUBLIC_SITE=merced npm run build`
Expected: PASS, identical route list.

- [ ] **Step 6: Commit**

```bash
git add lib/cities.ts lib/cities.data.ts lib/servicePages.ts lib/servicePages.data.ts app/locations
git commit -m "refactor: split cities + servicePages into data modules behind adapters"
```

---

### Task 6: Move blogPosts + wire `getActiveSite`; complete the resolver

**Files:**
- Create: `lib/blogPosts.data.ts` (current posts verbatim + `BlogPost` type export)
- Modify: `lib/blogPosts.ts` → adapter (helpers + active-site source)
- Create: `config/sites/merced/index.ts` (the real bundle)
- Modify: `lib/site.ts` (add `getActiveSite`); `lib/config.ts`, `lib/cities.ts`, `lib/servicePages.ts`, `lib/blogPosts.ts` to source from `getActiveSite()` instead of the direct merced import.

**Interfaces:**
- Consumes: all `.data` modules from Tasks 4–5 + this task.
- Produces: `getActiveSite(): SiteBundle` selecting by `resolveSiteSlug()`; every `@/lib/*` adapter now sources from it. `@/lib/blogPosts` exports `{ blogPosts, type BlogPost, <existing helpers> }` — read the current `lib/blogPosts.ts` for the exact helper names and replicate them exactly.

- [ ] **Step 1: Read the current blog module to capture its exact exports**

Run: `sed -n '1,40p' lib/blogPosts.data.ts` after moving. First `git mv lib/blogPosts.ts lib/blogPosts.data.ts`. Identify the exported type name (define/export `BlogPost` if not already named) and every helper function (e.g. `getPostBySlug`, `getAllPostSlugs`). Keep the array + type in `.data.ts`; move helpers to the adapter.

- [ ] **Step 2: Create the merced bundle**

Create `config/sites/merced/index.ts`:
```ts
import mercedConfig from "@/lib/config.data";
import mercedCities from "@/lib/cities.data";
import mercedServices from "@/lib/servicePages.data";
import mercedBlog from "@/lib/blogPosts.data";
import type { SiteBundle } from "@/lib/site";

const bundle: SiteBundle = {
  config: mercedConfig,
  cities: mercedCities,
  servicePages: mercedServices,
  blogPosts: mercedBlog,
};
export default bundle;
```

- [ ] **Step 3: Add `getActiveSite` to `lib/site.ts`**

Append:
```ts
import mercedBundle from "@/config/sites/merced";

export function getActiveSite(): SiteBundle {
  const slug = resolveSiteSlug();
  switch (slug) {
    case "merced": return mercedBundle;
    // hanford-hvac case added in Task 20
    default: return mercedBundle;
  }
}
```
> Use a static `switch` with literal imports (not dynamic `import()`), so Next.js statically bundles only the active site and tree-shakes the rest per build.

- [ ] **Step 4: Point every adapter at `getActiveSite()`**

In `lib/config.ts`: `export const siteConfig = getActiveSite().config;`
In `lib/cities.ts`: `export const cities = getActiveSite().cities;`
In `lib/servicePages.ts`: `export const servicePages = getActiveSite().servicePages;`
In `lib/blogPosts.ts`: `export const blogPosts = getActiveSite().blogPosts;`
Keep all type re-exports and helper functions unchanged.

- [ ] **Step 5: Verify build + parity build**

Run: `NEXT_PUBLIC_SITE=merced npm run build && npm test`
Expected: build PASS with identical route list; all tests pass.

- [ ] **Step 6: Commit**

```bash
git add lib/ config/sites/merced/
git commit -m "refactor: complete data-layer resolver — all @/lib/* source from active site"
```

---

### Task 7: Merced parity gate (Phase 1)

**Files:** none (verification only)

**Interfaces:**
- Consumes: Task 1 baseline screenshots + manifest.

- [ ] **Step 1: Rebuild and screenshot the same URLs**

Run `NEXT_PUBLIC_SITE=merced npm run build && NEXT_PUBLIC_SITE=merced npm run start &`, then via /browse capture the same URLs listed in `docs/superpowers/artifacts/merced-baseline/MANIFEST.md` at 1280px and 390px.

- [ ] **Step 2: Diff against baseline**

Compare each new screenshot to its baseline counterpart. Expected: pixel-identical (no copy or layout change — this phase only moved data sources).

- [ ] **Step 3: If any diff, STOP and fix**

Any visual delta means an adapter changed data shape/order. Fix before proceeding. Do not continue to Phase 2 with a parity failure.

- [ ] **Step 4: Record the gate result**

Append a "Phase 1 parity: PASS" line with date to `docs/superpowers/artifacts/merced-baseline/MANIFEST.md` and commit.
```bash
git add docs/superpowers/artifacts/merced-baseline/MANIFEST.md
git commit -m "test: Phase 1 Merced parity gate passed"
```

---

## Phase 2 — Config-driven calculator engine

Today two components (`components/Calculator.tsx`, `components/CalculatorSection.tsx`) each independently read `siteConfig.calculator.estimates` with roofing-specific assumptions (3 nested keys, hardcoded `roofSize/material/condition`, "Merced County" label). Extract one shared pure engine supporting `lookup` and `formula`, unit-test it, then rewire both components to it generically.

### Task 8: Extend the calculator config schema (both estimator kinds)

**Files:**
- Modify: `lib/config.data.ts` (Merced's `calculator` block → new `estimator` shape)
- Create: `lib/calculator.ts` (types only in this task)
- Delete: `lib/__tests__/smoke.test.ts`

**Interfaces:**
- Produces:
  ```ts
  export type CalcInput =
    | { id: string; label: string; type: "select"; options: { value: string; label: string }[] }
    | { id: string; label: string; type: "number"; unitLabel?: string; min?: number; max?: number; step?: number };

  export type Estimator =
    | { kind: "lookup"; keyOrder: string[]; table: Record<string, [number, number]> } // composite key = keyOrder values joined by "|"
    | { kind: "formula"; base: number; terms: { inputId: string; perUnit?: number; multipliers?: Record<string, number> }[] };

  export type CalculatorConfig = { inputs: CalcInput[]; estimator: Estimator; resultLabel: string; note: string };
  ```
- Consumes: nothing.

- [ ] **Step 1: Define engine types**

Create `lib/calculator.ts` with the `CalcInput`, `Estimator`, `CalculatorConfig` types above and nothing else yet.

- [ ] **Step 2: Convert Merced's calculator data to a `lookup` estimator**

In `lib/config.data.ts`, replace the `calculator.estimates` nested-record + `inputs` with the new shape. Merced keeps its 3 selects (`roofSize`, `material`, `condition`) and becomes a `lookup` with `keyOrder: ["roofSize","material","condition"]` and a flat `table` whose keys are `"small|asphalt|repair"` → `[800,1500]`, etc. Mechanically flatten the existing 3-level `estimates` object (small×{asphalt,metal,tile}×{repair,partial,full}) into the flat map — every existing combination preserved. Set `resultLabel: "Estimated Cost in Merced"`, `note:` = current `laborNote`.

- [ ] **Step 3: Delete the smoke test**

Run: `rm lib/__tests__/smoke.test.ts`

- [ ] **Step 4: Type-check**

Run: `NEXT_PUBLIC_SITE=merced npx tsc --noEmit`
Expected: FAIL only in `Calculator.tsx`/`CalculatorSection.tsx` (they still reference `.estimates`). That's expected — fixed in Task 10. Confirm no OTHER errors.

- [ ] **Step 5: Commit**

```bash
git add lib/calculator.ts lib/config.data.ts
git rm lib/__tests__/smoke.test.ts
git commit -m "feat: add calculator engine schema; convert Merced to lookup estimator"
```

---

### Task 9: Implement + test the pure estimate function

**Files:**
- Modify: `lib/calculator.ts` (add `computeEstimate`)
- Test: `lib/calculator.test.ts`

**Interfaces:**
- Produces: `computeEstimate(cfg: CalculatorConfig, values: Record<string,string>): [number, number] | null`. Returns `null` when required inputs are missing/unknown.
- Consumes: types from Task 8.

- [ ] **Step 1: Write failing tests (both kinds + edge cases)**

Create `lib/calculator.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { computeEstimate, type CalculatorConfig } from "@/lib/calculator";

const lookup: CalculatorConfig = {
  inputs: [
    { id: "size", label: "Size", type: "select", options: [{ value: "s", label: "S" }, { value: "l", label: "L" }] },
    { id: "mat", label: "Material", type: "select", options: [{ value: "a", label: "A" }] },
  ],
  estimator: { kind: "lookup", keyOrder: ["size", "mat"], table: { "s|a": [100, 200], "l|a": [300, 400] } },
  resultLabel: "Est", note: "n",
};

const formula: CalculatorConfig = {
  inputs: [
    { id: "sqft", label: "Sq ft", type: "number", step: 1 },
    { id: "system", label: "System", type: "select", options: [{ value: "central", label: "Central" }, { value: "mini", label: "Mini" }] },
  ],
  estimator: { kind: "formula", base: 3000, terms: [
    { inputId: "sqft", perUnit: 4 },
    { inputId: "system", multipliers: { central: 1, mini: 1.3 } },
  ] },
  resultLabel: "Est", note: "n",
};

describe("computeEstimate — lookup", () => {
  it("returns the mapped range", () => expect(computeEstimate(lookup, { size: "l", mat: "a" })).toEqual([300, 400]));
  it("null when incomplete", () => expect(computeEstimate(lookup, { size: "l" })).toBeNull());
  it("null on unknown combo", () => expect(computeEstimate(lookup, { size: "x", mat: "a" })).toBeNull());
});

describe("computeEstimate — formula", () => {
  it("base + perUnit*qty, ×multiplier, ±15% band", () => {
    // base 3000 + 2000*4=8000 → 11000; ×1.3 = 14300; band ±15% → [12155, 16445]
    expect(computeEstimate(formula, { sqft: "2000", system: "mini" })).toEqual([12155, 16445]);
  });
  it("null when a number input is blank", () => expect(computeEstimate(formula, { system: "central" })).toBeNull());
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm test -- lib/calculator.test.ts`
Expected: FAIL — `computeEstimate` not exported.

- [ ] **Step 3: Implement `computeEstimate`**

Add to `lib/calculator.ts`:
```ts
function allProvided(cfg: CalculatorConfig, values: Record<string, string>): boolean {
  return cfg.inputs.every((i) => values[i.id] !== undefined && values[i.id] !== "");
}

export function computeEstimate(
  cfg: CalculatorConfig,
  values: Record<string, string>
): [number, number] | null {
  if (!allProvided(cfg, values)) return null;

  if (cfg.estimator.kind === "lookup") {
    const key = cfg.estimator.keyOrder.map((id) => values[id]).join("|");
    return cfg.estimator.table[key] ?? null;
  }

  // formula: point = base + Σ term; select terms apply a multiplier to the running point.
  let point = cfg.estimator.base;
  for (const term of cfg.estimator.terms) {
    const raw = values[term.inputId];
    if (term.perUnit !== undefined) {
      const qty = Number(raw);
      if (!Number.isFinite(qty)) return null;
      point += term.perUnit * qty;
    }
    if (term.multipliers) {
      const m = term.multipliers[raw];
      if (m === undefined) return null;
      point *= m;
    }
  }
  const lo = Math.round(point * 0.85);
  const hi = Math.round(point * 1.15);
  return [lo, hi];
}
```

- [ ] **Step 4: Run to verify pass**

Run: `npm test -- lib/calculator.test.ts`
Expected: all pass. (If the formula band math differs, fix the test's expected numbers to match the documented ±15% rule — the rule is the contract.)

- [ ] **Step 5: Commit**

```bash
git add lib/calculator.ts lib/calculator.test.ts
git commit -m "feat: implement computeEstimate engine (lookup + formula) with tests"
```

---

### Task 10: Rewire both calculator components to the shared engine

**Files:**
- Modify: `components/Calculator.tsx`, `components/CalculatorSection.tsx`

**Interfaces:**
- Consumes: `computeEstimate`, `siteConfig.calculator` (now `CalculatorConfig`).
- Produces: both components render `siteConfig.calculator.inputs` generically (select OR number) and show `computeEstimate(...)`, `resultLabel`, `note`. No hardcoded input ids or "Merced County" string.

- [ ] **Step 1: Rewrite `components/Calculator.tsx`**

Replace the roofing-specific destructuring (`lib/Calculator.tsx:19-31`) with generic state + engine. Render each input by `input.type`: `select` → `<select>` with options; `number` → `<input type="number">` with `unitLabel`/`min`/`max`/`step`. Compute `const estimate = computeEstimate(siteConfig.calculator, values);`. Use `siteConfig.calculator.resultLabel` and `.note` in the result box. Keep all existing Tailwind classes/markup so Merced renders identically.

- [ ] **Step 2: Rewrite `components/CalculatorSection.tsx`**

Remove the three hardcoded `useState` vars and `inputs[0/1/2]` index access. Use a single `values` record + `.map` over `siteConfig.calculator.inputs` (same generic input rendering as Step 1, styled with the existing dark `selectStyle`/`labelStyle`). Replace the hardcoded `"Estimated range (Merced County)"` with `siteConfig.calculator.resultLabel`. Keep all existing inline styles so Merced renders identically.

- [ ] **Step 3: Type-check + build**

Run: `NEXT_PUBLIC_SITE=merced npx tsc --noEmit && NEXT_PUBLIC_SITE=merced npm run build`
Expected: PASS.

- [ ] **Step 4: Visual parity check on the two calculators**

Via /browse, screenshot `/calculator` and the home-page calculator section; diff against Task 1 baselines. Expected: identical (same inputs, same estimate for the same selections). Manually verify one selection (e.g. medium/asphalt/full) yields the same range as baseline.

- [ ] **Step 5: Commit**

```bash
git add components/Calculator.tsx components/CalculatorSection.tsx
git commit -m "refactor: drive both calculators from shared computeEstimate engine"
```

---

## Phase 3 — Copy extraction

Move the remaining hardcoded copy into `siteConfig`, so a new site needs no component edits. Extend `SiteConfig` in `lib/config.data.ts` (Merced values) as you go.

### Task 11: Extract hero copy (`SplitHero`)

**Files:**
- Modify: `lib/config.data.ts` (add `hero`), `components/SplitHero.tsx`

**Interfaces:**
- Produces: `siteConfig.hero = { eyebrow: string; headlineLines: string[]; emberLine: string; subcopy: string; bullets: string[]; formEyebrow: string; formHeading: string; formSubcopy: string }`.

- [ ] **Step 1: Add `hero` to Merced config**

In `lib/config.data.ts`, add a `hero` field with the exact current strings from `components/SplitHero.tsx`: eyebrow `"Merced County Roofing"`; headlineLines `["YOUR ROOF,", "FIXED RIGHT."]`; emberLine `"FREE ESTIMATE."`; subcopy (the licensed/insured/30-min paragraph); bullets (the 4 list items); formEyebrow `"Mon–Sat, 7am–8pm"`; formHeading `"Get a Free Estimate"`; formSubcopy `"We call back in 30 minutes or less."`.

- [ ] **Step 2: Refactor `SplitHero.tsx` to read them**

Replace each hardcoded string in `components/SplitHero.tsx` with the `siteConfig.hero.*` field. Map `headlineLines`/`emberLine` into the `<h1>` (render lines with `<br/>`, ember line in `var(--ember)`). Keep markup/styles identical.

- [ ] **Step 3: Build + visual parity**

Run: `NEXT_PUBLIC_SITE=merced npm run build`; via /browse diff `/` hero against baseline. Expected: identical.

- [ ] **Step 4: Commit**

```bash
git add lib/config.data.ts components/SplitHero.tsx
git commit -m "refactor: move hero copy into siteConfig.hero"
```

---

### Task 12: Extract homepage FAQ (`FAQSection`)

**Files:**
- Modify: `lib/config.data.ts` (add `faqs`), `components/FAQSection.tsx`

**Interfaces:**
- Produces: `siteConfig.faqs: { q: string; a: string }[]`.

- [ ] **Step 1: Move the hardcoded `faqs` array**

Copy the `faqs` array from `components/FAQSection.tsx:72-93` into `siteConfig.faqs` in `lib/config.data.ts` verbatim.

- [ ] **Step 2: Refactor `FAQSection.tsx`**

Delete the module-level `faqs` const; `import { siteConfig }` and map over `siteConfig.faqs`. Keep `FAQItem` and all styles unchanged.

- [ ] **Step 3: Build + parity**

Run build; /browse diff the homepage FAQ. Expected: identical.

- [ ] **Step 4: Commit**

```bash
git add lib/config.data.ts components/FAQSection.tsx
git commit -m "refactor: move homepage FAQ into siteConfig.faqs"
```

---

### Task 13: Extract footer + Schema geo/copy

**Files:**
- Modify: `lib/config.data.ts` (add `footer`, `geo`), `components/Footer.tsx`, `components/Schema.tsx`

**Interfaces:**
- Produces:
  - `siteConfig.footer = { brandLead: string; brandEmphasis: string; brandTail: string; blurb: string; licensingLines: string[]; bottomTagline: string }`.
  - `siteConfig.geo = { latitude: number; longitude: number }`.

- [ ] **Step 1: Add `footer` + `geo` to Merced config**

`footer.brandLead="MERCED"`, `brandEmphasis="ROOFING"`, `brandTail="PROS"`, `blurb="Licensed and insured roofing in Merced County. Free estimates, fast callbacks."`, `licensingLines=["CA CSLB C-39 Roofing License","General Liability + Workers' Comp","Cool Roof Rating Council (CRRC) compliant","California Title 24, Part 6 materials"]`, `bottomTagline="Services fulfilled by licensed C-39 partner contractors · Serving Merced County"`. `geo={latitude:37.30216,longitude:-120.48297}`.

- [ ] **Step 2: Refactor `Footer.tsx`**

Replace hardcoded brand name (`Footer.tsx:30-31`), blurb (`42-43`), licensing block (`245-251`), and bottom tagline (`287`) with `siteConfig.footer.*`. Keep the Quick Links list, `servicePages`/`cities` maps, and Hours block as-is (Hours is a Global Constraint string; keep literal `Mon–Sat, 7am–8pm`).

- [ ] **Step 3: Refactor `Schema.tsx`**

Replace hardcoded `geo.latitude/longitude` (`Schema.tsx:14-15`) with `siteConfig.geo.latitude/longitude`.

- [ ] **Step 4: Build + parity + schema check**

Run build; /browse diff footer on `/`. Also view page source and confirm the JSON-LD `geo` matches. Expected: identical.

- [ ] **Step 5: Commit**

```bash
git add lib/config.data.ts components/Footer.tsx components/Schema.tsx
git commit -m "refactor: move footer copy + schema geo into siteConfig"
```

---

### Task 14: Extract remaining page copy (home/about/services/contact/calculator/layout)

**Files:**
- Modify: `lib/config.data.ts`, `app/page.tsx`, `app/about/page.tsx`, `app/services/page.tsx`, `app/contact/page.tsx`, `app/calculator/page.tsx`, `app/layout.tsx`

**Interfaces:**
- Produces: `siteConfig.pages = { home?: {...}, about: {...}, services: {...}, contact: {...}, calculator: {...} }` and `siteConfig.metaSuffix` (e.g. `"Licensed Roofing Contractor"`), `siteConfig.googleVerification` (the GSC token).

- [ ] **Step 1: Inventory the hardcoded strings**

Run: `grep -rniE "roof|merced|shingle|asphalt" app/page.tsx app/about/page.tsx app/services/page.tsx app/contact/page.tsx app/calculator/page.tsx app/layout.tsx`
For each match, decide the config field. Known: `layout.tsx:25` title default suffix `"Licensed Roofing Contractor"` → `siteConfig.metaSuffix`; `layout.tsx:37` `google: "fecb06293829c33b"` → `siteConfig.googleVerification`.

- [ ] **Step 2: Add fields to Merced config and refactor each file**

Add the corresponding `pages.*`, `metaSuffix`, `googleVerification` fields to `lib/config.data.ts` with the exact current strings, and replace each literal in the six files with the config reference. Read each file fully before editing; preserve all markup/styles.

- [ ] **Step 3: Build + type-check**

Run: `NEXT_PUBLIC_SITE=merced npx tsc --noEmit && NEXT_PUBLIC_SITE=merced npm run build`
Expected: PASS.

- [ ] **Step 4: Parity diff all six pages**

Via /browse diff `/`, `/about`, `/services`, `/contact`, `/calculator` (layout affects `<title>`/meta — verify `<head>` too). Expected: identical rendered output and identical `<title>`.

- [ ] **Step 5: Commit**

```bash
git add lib/config.data.ts app/
git commit -m "refactor: move remaining page + layout copy into siteConfig"
```

---

### Task 15: Convert `app/merced-roofing` to config-driven `app/[area]`

**Files:**
- Create: `app/[area]/page.tsx`
- Delete: `app/merced-roofing/page.tsx`
- Modify: `lib/config.data.ts` (add `locationLanding`), `next-sitemap.config.js`

**Interfaces:**
- Produces:
  - `siteConfig.locationLanding = { slug: string; h1: string; heroSub: string; sectionHeading: string; bodyParagraphs: string[]; serviceAreaHeading: string; mapEmbedSrc: string; faqHeading: string; faqs: {q;a}[]; formHeading: string; formSub: string; canonicalPath: string }`.
  - Route `app/[area]/page.tsx` with `generateStaticParams()` returning `[{ area: siteConfig.locationLanding.slug }]`, and a 404 (`notFound()`) for any other `area`.

- [ ] **Step 1: Move merced-roofing content into config**

Copy all prose from `app/merced-roofing/page.tsx` into `siteConfig.locationLanding` (slug `"merced-roofing"`, h1 `"Roofing Contractor — Merced, CA"`, the two/three climate paragraphs, the map iframe `src`, the 3 location FAQs, form headings, canonicalPath `"/locations/merced"`).

- [ ] **Step 2: Create `app/[area]/page.tsx`**

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LeadForm from "@/components/LeadForm";
import { siteConfig } from "@/lib/config";

export function generateStaticParams() {
  return [{ area: siteConfig.locationLanding.slug }];
}

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.locationLanding.h1} | ${siteConfig.siteName}` },
  description: siteConfig.locationLanding.heroSub,
  alternates: { canonical: `https://${siteConfig.domain}${siteConfig.locationLanding.canonicalPath}` },
};

export default function AreaPage({ params }: { params: { area: string } }) {
  if (params.area !== siteConfig.locationLanding.slug) notFound();
  const L = siteConfig.locationLanding;
  // ...render using L.* and siteConfig.serviceArea / siteConfig.phone,
  // preserving the exact markup/classes from the old merced-roofing/page.tsx.
}
```
Port the JSX body verbatim from the old page, swapping literals for `L.*`.

- [ ] **Step 3: Delete the old route + update sitemap priorities**

`git rm app/merced-roofing/page.tsx`. In `next-sitemap.config.js`, the `/merced-roofing` priority key still applies (path unchanged for Merced). Confirm the built route is still `/merced-roofing`.

- [ ] **Step 4: Build + parity**

Run: `NEXT_PUBLIC_SITE=merced npm run build`
Expected: route list still contains `/merced-roofing` (now via `[area]`). Via /browse diff `/merced-roofing` against baseline. Expected: identical.

- [ ] **Step 5: Phase 3 parity gate**

Re-diff ALL baseline URLs (Task 1 manifest). Any delta → STOP and fix. Append "Phase 3 parity: PASS" to the manifest.

- [ ] **Step 6: Commit**

```bash
git add app/[area] lib/config.data.ts next-sitemap.config.js
git rm app/merced-roofing/page.tsx
git commit -m "refactor: config-driven location landing via app/[area]; Phase 3 parity passed"
```

---

## Phase 4 — Hanford HVAC content (full parity)

Author `config/sites/hanford-hvac/`. Every field is real, niche- and geo-accurate. The `SiteConfig`/`CityData`/`ServicePageData`/`BlogPost` types are the contract — TypeScript enforces completeness. Where dollar figures or local facts are needed, research Central Valley / Kings County HVAC norms; do not invent license numbers or fake certifications.

### Task 16: Hanford HVAC `site.ts` (config + HVAC calculator)

**Files:**
- Create: `config/sites/hanford-hvac/site.ts`

**Interfaces:**
- Consumes: `SiteConfig` (from `lib/config.data.ts` type export — export the `SiteConfig` type from there), `CalculatorConfig`.
- Produces: a `SiteConfig` object `hanfordHvacConfig` (default export) with all fields Merced has: `niche:"HVAC"`, `city:"Hanford"`, `county:"Kings County"`, `state:"CA"`, brand (`siteName:"Hanford HVAC Pros"` or user-provided), `phone`/`phoneHref`/`email`/`domain` (from user inputs — use placeholders flagged `TODO(owner-input)` ONLY for the 3 external values: domain, phone, lead email, and list them in the task's completion note), `serviceArea` (Kings County cities), `services` summary (4–6), `colors` (choose an HVAC-appropriate palette distinct from roofing ember — e.g. cool blue/steel), `hero`, `faqs`, `footer`, `pages`, `locationLanding`, `geo` (Hanford lat/long 36.3274, -119.6457), `schema` (`type:"HVACBusiness"`, hours), `seo`, `hours:"Mon–Sat, 7am–8pm"`, `metaSuffix:"Licensed HVAC Contractor"`, `googleVerification` (`TODO(owner-input)` — set after GSC verify), and a `formula` HVAC `calculator`.

> The only permitted placeholders in the entire plan are the THREE external owner-supplied values (domain, phone, lead email) + the GSC token, each tagged `TODO(owner-input)` and surfaced at launch. All copy/content fields must be real.

- [ ] **Step 1: Author the HVAC calculator**

Design a `formula` estimator: inputs `homeSqFt` (number, unitLabel "sq ft"), `systemType` (select: central AC, heat pump, mini-split, furnace-only), `jobType` (select: repair, replace, new install). Example: `base` per jobType via a first select multiplier, `perUnit` on sqft. Provide realistic Central Valley figures (e.g. central AC replacement ~$6k–$12k for 1,500–2,500 sq ft). `resultLabel:"Estimated Cost in Hanford"`, `note:` a Kings County labor-rate note.

- [ ] **Step 2: Author the rest of the config**

Fill every remaining `SiteConfig` field with real HVAC/Hanford content mirroring Merced's structure. Hero headline in the `["YOUR ...", "..."]` + ember-line pattern (e.g. `["COMFORT YOU","CAN COUNT ON."]` / ember `"FREE ESTIMATE."`). FAQs about HVAC (SEER, sizing, permit via City of Hanford, financing). Footer licensing lines use HVAC-appropriate CA license class (C-20 HVAC), no fabricated numbers.

- [ ] **Step 3: Type-check in isolation**

Temporarily add to `lib/site.ts` `getActiveSite` a `case "hanford-hvac"` (wired fully in Task 20) OR run: `npx tsc --noEmit` after Task 20. For now verify the file compiles by importing its type:
```bash
npx tsc --noEmit config/sites/hanford-hvac/site.ts 2>&1 | head
```
Expected: no type errors (fix until clean).

- [ ] **Step 4: Commit**

```bash
git add config/sites/hanford-hvac/site.ts
git commit -m "feat(hanford): HVAC site config + formula calculator"
```

---

### Task 17: Hanford HVAC `services.ts` (6 service pages)

**Files:**
- Create: `config/sites/hanford-hvac/services.ts`

**Interfaces:**
- Produces: `export default hvacServices: ServicePageData[]` — 6 entries. Slugs: `ac-installation`, `ac-repair`, `furnace-heating`, `ductwork`, `hvac-maintenance`, `emergency-hvac-repair`. Each with `title`, `h1` (e.g. "AC Installation in Hanford, CA"), `metaTitle`, `metaDescription`, `summary`, `bullets` (6), `faqs` (3), `relatedServices` (valid slugs from this set), `estimateRange`, `urgency` (`emergency-hvac-repair` → `"emergency"`).

- [ ] **Step 1: Author one service fully as the template**

Write `ac-installation` completely (all fields, real HVAC copy, Central Valley specifics — heat load, SEER2 minimums, Title 24). This is the worked example.

- [ ] **Step 2: Author the remaining 5 to the same spec**

Complete `ac-repair`, `furnace-heating`, `ductwork`, `hvac-maintenance`, `emergency-hvac-repair`. Keep `relatedServices` referencing only slugs in this file. No roofing terms; no fabricated licenses.

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit config/sites/hanford-hvac/services.ts 2>&1 | head`
Expected: clean (satisfies `ServicePageData[]`).

- [ ] **Step 4: Commit**

```bash
git add config/sites/hanford-hvac/services.ts
git commit -m "feat(hanford): 6 HVAC service pages"
```

---

### Task 18: Hanford HVAC `cities.ts` (6 Kings County cities)

**Files:**
- Create: `config/sites/hanford-hvac/cities.ts`

**Interfaces:**
- Produces: `export default hvacCities: CityData[]` — 6 entries with the `CityData` shape (note `driveFromHub`, not `driveFromMerced`). Cities: Hanford, Lemoore, Corcoran, Armona, Stratford, Kettleman City (or nearest real Kings County communities). Real `zipCodes`, `latitude`/`longitude`, `weatherMaxTemp`, `localPoiMarkers`, `permitOfficeUrl`, `nearbyCity`, `population`, `driveFromHub` (from Hanford), and an HVAC-specific `uniqueNote` (climate load, older housing stock, ag-dust on condensers, etc.).

- [ ] **Step 1: Author Hanford + Lemoore fully (worked examples)**

Real coordinates (Hanford 36.3274, -119.6457; Lemoore 36.3008, -119.7829), real zips, Kings County permit office URLs, HVAC `uniqueNote`.

- [ ] **Step 2: Author the remaining 4**

Complete Corcoran, Armona, Stratford, Kettleman City with accurate data. `nearbyCity` points to Hanford/Lemoore/Visalia as appropriate.

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit config/sites/hanford-hvac/cities.ts 2>&1 | head`
Expected: clean.

- [ ] **Step 4: Commit**

```bash
git add config/sites/hanford-hvac/cities.ts
git commit -m "feat(hanford): 6 Kings County city pages"
```

---

### Task 19: Hanford HVAC `blog.ts` (6 posts)

**Files:**
- Create: `config/sites/hanford-hvac/blog.ts`

**Interfaces:**
- Produces: `export default hvacBlog: BlogPost[]` — 6 posts matching the exact `BlogPost` shape from `lib/blogPosts.data.ts` (read it for the field list: slug, title, meta, date, body/sections, etc.). HVAC topics: "Cost of AC Replacement in Hanford 2026", "SEER2 explained for Central Valley homes", "Signs your furnace is failing", "How to size an AC for Kings County heat", "AC maintenance checklist", "Heat pump vs AC in the San Joaquin Valley".

- [ ] **Step 1: Read the blog post shape**

Run: `sed -n '1,60p' lib/blogPosts.data.ts` — capture the exact type/fields and one full example post as the format reference.

- [ ] **Step 2: Author one post fully, then the other five**

Match the field structure and length of Merced's posts. Real HVAC content, dates in 2026, no fabricated stats without a plausible basis.

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit config/sites/hanford-hvac/blog.ts 2>&1 | head`
Expected: clean.

- [ ] **Step 4: Commit**

```bash
git add config/sites/hanford-hvac/blog.ts
git commit -m "feat(hanford): 6 HVAC blog posts"
```

---

### Task 20: Register Hanford + build it

**Files:**
- Create: `config/sites/hanford-hvac/index.ts`
- Modify: `lib/site.ts` (`getActiveSite` — add `case "hanford-hvac"`)

**Interfaces:**
- Consumes: all four Hanford modules (Tasks 16–19).
- Produces: `NEXT_PUBLIC_SITE=hanford-hvac` builds a complete site.

- [ ] **Step 1: Create the Hanford bundle**

Create `config/sites/hanford-hvac/index.ts`:
```ts
import config from "./site";
import cities from "./cities";
import servicePages from "./services";
import blogPosts from "./blog";
import type { SiteBundle } from "@/lib/site";

const bundle: SiteBundle = { config, cities, servicePages, blogPosts };
export default bundle;
```

- [ ] **Step 2: Wire the resolver**

In `lib/site.ts` `getActiveSite`, add:
```ts
import hanfordBundle from "@/config/sites/hanford-hvac";
// inside switch:
case "hanford-hvac": return hanfordBundle;
```

- [ ] **Step 3: Build Hanford AND re-verify Merced**

Run:
```bash
NEXT_PUBLIC_SITE=hanford-hvac npm run build
NEXT_PUBLIC_SITE=merced npm run build
npm test
```
Expected: both build green. Hanford route list mirrors Merced's counts: 6 `/services/[service]`, 6 `/locations/[citySlug]`, 6 `/blog/[slug]`, plus `/[area]` = `/hanford-hvac`. All tests pass.

- [ ] **Step 4: Visual smoke of Hanford**

`NEXT_PUBLIC_SITE=hanford-hvac npm run start &`; via /browse screenshot `/`, `/services`, `/services/ac-installation`, `/locations/hanford`, `/calculator`, `/hanford-hvac`. Confirm: HVAC copy throughout, no "roof"/"Merced" leakage, calculator produces sane ranges, DESIGN.md respected (no emoji, hours present). Fix any leakage (usually a missed hardcoded string — grep the built output).

- [ ] **Step 5: Grep for niche leakage**

Run: `NEXT_PUBLIC_SITE=hanford-hvac npm run build && grep -rniE "roof|shingle|merced" .next/server/app 2>/dev/null | grep -vi "approved\|improve" | head`
Expected: no roofing/Merced strings in Hanford's built HTML (ignore false positives like "improve"). Any real hit → trace to the source component (a still-hardcoded string missed in Phase 3) and fix.

- [ ] **Step 6: Commit**

```bash
git add config/sites/hanford-hvac/index.ts lib/site.ts
git commit -m "feat(hanford): register site; NEXT_PUBLIC_SITE=hanford-hvac builds full parity"
```

---

## Phase 5 — Launch

### Task 21: Per-site sitemap + lead-route correctness

**Files:**
- Modify: `next-sitemap.config.js`, `app/api/lead/route.ts`

**Interfaces:**
- Produces: sitemap `siteUrl` derives from the active site's domain; lead email `from` uses the active domain; SMS body uses `siteConfig.siteName`; city routing map is derived from the active site's cities, not hardcoded Merced slugs.

- [ ] **Step 1: Make the sitemap domain per-site**

In `next-sitemap.config.js`, replace the hardcoded `siteUrl: "https://mercedroofingpro.com"` with a read of `process.env.NEXT_PUBLIC_SITE` mapped to the domain. Simplest robust approach: read the domain from an env var set per Vercel project, `siteUrl: `https://${process.env.SITE_DOMAIN ?? "mercedroofingpro.com"}``, and set `SITE_DOMAIN` in each project's env. Update the `priorities` map to include `/hanford-hvac` alongside `/merced-roofing` (or key off the active `locationLanding.slug`). Document the `SITE_DOMAIN` requirement in the task note.

- [ ] **Step 2: Fix `app/api/lead/route.ts` hardcoded strings**

- Line 98: `from: `${siteConfig.siteName} <noreply@${siteConfig.domain}>`` (was `noreply@mercedroofingpro.com`).
- Line 48: SMS body — replace `"Merced Roofing Pros"` with `siteConfig.siteName`.
- `routeEmail` (lines 19-34): build the `routing` map from `cities` (`import { cities } from "@/lib/cities"`) so each site's city slugs map to `process.env['LEAD_EMAIL_' + slug.toUpperCase().replace(/-/g,'_')] ?? defaultEmail`. Remove the hardcoded Merced-only object.

- [ ] **Step 3: Build both sites**

Run: `SITE_DOMAIN=mercedroofingpro.com NEXT_PUBLIC_SITE=merced npm run build` and `SITE_DOMAIN=hanfordhvacpros.com NEXT_PUBLIC_SITE=hanford-hvac npm run build`.
Expected: both green; each sitemap.xml uses the correct domain.

- [ ] **Step 4: Merced parity re-check**

Confirm Merced's lead route still sends from `noreply@mercedroofingpro.com` and routes the same. Diff sitemap output for Merced against baseline. Expected: unchanged for Merced.

- [ ] **Step 5: Commit**

```bash
git add next-sitemap.config.js app/api/lead/route.ts
git commit -m "feat: per-site sitemap domain + lead-route (from/SMS/city routing)"
```

---

### Task 22: Ship the refactor to production (Merced unchanged)

**Files:** none (deploy)

**Interfaces:**
- Consumes: green builds for both sites.

- [ ] **Step 1: Final full verification**

Run: `NEXT_PUBLIC_SITE=merced npm run build && NEXT_PUBLIC_SITE=hanford-hvac npm run build && npm test && NEXT_PUBLIC_SITE=merced npx tsc --noEmit`
Expected: all green.

- [ ] **Step 2: Merge worktree branch → main and push**

Follow the repo's ship flow (squash). The existing Merced Vercel project auto-deploys from `main`. Because that project has NO `NEXT_PUBLIC_SITE` set, the resolver defaults to `merced` — Merced deploys unchanged. Set `SITE_DOMAIN=mercedroofingpro.com` on the existing Merced Vercel project (Step needed for the new sitemap env read).

- [ ] **Step 3: Verify production Merced post-deploy**

Health-check `https://mercedroofingpro.com` (200) and spot-check the homepage + `/calculator` + `/merced-roofing` render identically to pre-refactor. Submit one test lead; confirm email arrives. If anything regressed, roll back the deploy immediately.

- [ ] **Step 4: Record**

Note the deploy in `IMPLEMENTATION.md` (session log row) and commit.

---

### Task 23: Launch Hanford HVAC (new Vercel project)

**Files:** none (infra) — plus `CLAUDE.md` deploy-config note at the end.

**Interfaces:**
- Consumes: `TODO(owner-input)` values (domain, phone, lead email) — collect from user before this task.

- [ ] **Step 1: Collect owner inputs**

Confirm with the user: Hanford domain (e.g. `hanfordhvacpros.com`), phone (Google Voice/CallRail), lead email. Fill the `TODO(owner-input)` fields in `config/sites/hanford-hvac/site.ts`, commit.

- [ ] **Step 2: Create the Vercel project**

New Vercel project from the same GitHub repo. Set env: `NEXT_PUBLIC_SITE=hanford-hvac`, `SITE_DOMAIN=<hanford-domain>`, `RESEND_API_KEY` (reuse or new), `LEAD_EMAIL=<hanford lead email>`. Framework: Next.js (auto). Deploy.

- [ ] **Step 3: Domain + DNS**

Add the Hanford domain in the new project; point DNS (per the Merced playbook in CLAUDE.md: Hostinger nameservers → Vercel). Wait for propagation.

- [ ] **Step 4: GSC verify + sitemap**

Verify the Hanford domain in Google Search Console; put the token in `siteConfig.googleVerification`, redeploy. Submit `https://<hanford-domain>/sitemap.xml`.

- [ ] **Step 5: End-to-end lead test**

On the live Hanford site, submit the lead form. Confirm email arrives at the Hanford `LEAD_EMAIL` with `from: noreply@<hanford-domain>` and correct subject. Fix Resend domain verification if the send fails (mirror the Merced `onboarding@resend.dev` fallback if the domain isn't verified yet).

- [ ] **Step 6: Update docs + checkpoint**

Add the Hanford project to `CLAUDE.md` Deploy Configuration, check off items in `IMPLEMENTATION.md`, and note Sites 3–6 now follow this task sequence as a repeatable checklist. Commit.

---

## Self-Review

**Spec coverage:**
- Repo/deploy architecture (resolver, per-site Vercel) → Tasks 3, 6, 21–23. ✓
- Config extraction of all data layers (config/cities/services/blog/geo) → Tasks 4–6. ✓
- Copy extraction (~12 files: hero, FAQ, footer, schema, pages, layout, location landing) → Tasks 11–15. ✓
- Dynamic `app/[area]` route → Task 15. ✓
- Calculator engine (lookup + formula, shared, tested) → Tasks 8–10. ✓
- Merced regression parity gate → Tasks 1, 7, 15 (step 5), 22 (step 3). ✓
- Hanford full parity (6 services, 6 cities, 6 blog posts, HVAC calculator) → Tasks 16–20. ✓
- Testing (build both sites, vitest, parity, lead E2E) → Tasks 2, 9, 20, 22, 23. ✓
- Launch (domain, env, lead E2E) → Task 23. ✓
- Owner inputs surfaced → Tasks 16, 23. ✓

**Placeholder scan:** The only intentional placeholders are the 4 `TODO(owner-input)` external values (domain, phone, lead email, GSC token), explicitly scoped and surfaced. All copy/content tasks specify real content + a worked example; no "TBD"/"add error handling"/"similar to Task N".

**Type consistency:** `SiteBundle`, `SiteConfig`, `CityData` (with `driveFromHub` rename applied consistently in Tasks 5 + 18), `ServicePageData`, `BlogPost`, `CalculatorConfig`, `Estimator`, `computeEstimate`, `resolveSiteSlug`/`getActiveSite` — names used identically across all referencing tasks. Adapter modules keep every original `@/lib/*` export name.

**Known execution note:** Task 3's `config/sites/merced/index.ts` is deferred to Task 6 (it depends on `.data` modules created in Tasks 4–6); Task 3 ships only `registry.ts`, `resolveSiteSlug`, and its test. This ordering is called out inline so the implementer doesn't create an unresolvable import early.
