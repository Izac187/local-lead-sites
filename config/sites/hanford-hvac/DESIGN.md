---
# gstack: design-md-format=spec
name: Hanford HVAC Pros
description: Pool at Dusk. Cool, calm, precise. The page reads as a cold room on a 105-degree afternoon.
colors:
  bg: "#EEF4F2"            # ice ground, page background
  surface: "#FAFCFB"       # cards, review cards, form on light pages
  dark: "#0F3338"          # pool at dusk: header, footer, hero form panel, calculator section
  dark-mid: "#15474D"      # inputs on dark, trust bar
  text: "#0B2226"
  text-muted: "#4F6B6E"
  text-muted-light: "#7F9598"
  border: "#CFDEDB"
  accent: "#0B7F8C"        # deep teal, CTA fill on light surfaces, links, eyebrow lines on light
  accent-hover: "#09646F"
  accent-on-dark: "#9EEBD8"        # glacier mint, CTA fill on dark surfaces, dark text on it
  accent-on-dark-hover: "#7FE0CA"
  on-dark: "#EEF4F2"       # text on dark surfaces (rgb 238,244,242 for opacity variants)
  heat: "#F2A33A"          # amber, emergency and heat-wave strip and the calculator outside-temp figure ONLY
  gold: "#F2A33A"          # star ratings reuse heat so the palette stays one warm value
  success: "#166534"
  error: "#DC2626"
typography:
  display:
    fontFamily: Archivo
    fontWeight: 700
    fontSize: clamp(2.6rem, 6vw, 4.4rem)
    letterSpacing: -0.02em
  body:
    fontFamily: Source Sans 3
    fontSize: 1.0625rem
    lineHeight: 1.55
  label:
    fontFamily: Source Sans 3
    fontWeight: 600
    fontSize: 0.8125rem
    letterSpacing: 0
  mono:
    fontFamily: JetBrains Mono
    fontFeature: tnum
rounded:
  sm: 6px
  md: 12px
  lg: 20px
  xl: 20px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  section: 96px
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
  button-primary-on-dark:
    backgroundColor: "{colors.accent-on-dark}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
  input:
    borderColor: "{colors.border}"
    rounded: "{rounded.sm}"
  input-on-dark:
    backgroundColor: "{colors.dark-mid}"
    borderColor: "rgba(238,244,242,0.22)"
    textColor: "{colors.on-dark}"
  card:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.border}"
    rounded: "{rounded.md}"
  hero-panel:
    backgroundColor: "{colors.dark}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.lg}"
  nav-link:
    textColor: "{colors.on-dark}"
---

# Hanford HVAC Pros

Per-site design system. The root `DESIGN.md` is Merced Roofing Pros and stays authoritative for that site only. Both sites share one component codebase; everything here is expressed as tokens in `config/sites/hanford-hvac/site.ts` under `theme`, injected as CSS custom properties by the root layout.

## Overview

**Creative North Star:** Pool at Dusk. The page itself is temperature: a light ice ground with one deep still-water panel holding the form, wide calm type, and a single fact doing the urgency work. A stressed homeowner on a 105° afternoon should feel cooler before reading a word.

**Product context:** Rank-and-rent lead-generation site for residential heating and air in Hanford and Kings County, CA. Users are homeowners 35 to 65, on a phone, mid-emergency, comparing two or three options. Success is a form submission or a call. Contractor-agnostic: no crew photos, no contractor name, no price commitments.

**Mode per surface:** Persuade on the homepage, service pages and city pages. Operate in the calculator and the lead form. Read on the blog.

**Reference research (2026-11-18):** trademarkmechanical.com, westernheatingair.com, plus ServiceTitan, SkillMammoth and Simpro roundups. The category is navy plus red, photo heroes, icon tiles, centered headings, financing banners. Hanford departs from all of that on purpose.

**Key characteristics, first five seconds:**
- Light page, one dark panel. The opposite of Merced's dark hero with a light card.
- Sentence-case wide grotesk headline. Never all-caps, never compressed.
- The mint button is the relief, not the emergency. Hot color appears once, on the heat-wave strip.
- No badges, no exclamation marks, no numbered cards. Urgency is a number: 30 minutes, Mon to Sat 7am to 8pm.

## Colors

**Strategy:** Committed. One cool hue family owns the page; neutrals derive from it. Ice ground, pool dark, glacier mint, deep teal.

**Light or dark:** Light. The use scene is a phone outdoors in Valley glare or a kitchen at 2 a.m. Dark text on a pale ground reads in both. Dark surfaces frame the page (header, footer) and hold the two action objects (hero form panel, calculator readout).

**Two accents, one per surface.** Deep teal `accent` is the CTA on light surfaces and the link color. Glacier mint `accent-on-dark` is the CTA on dark surfaces, with dark text on it (about 12:1). Never put mint on the ice ground as a fill; it fails contrast. Never put deep teal text on the pool dark; use mint.

**Amber is a quote, not a theme.** `heat` appears on the emergency or heat-wave strip and on the calculator's outside-temperature figure. Nowhere else. It is the heat outside; everything else is the cool inside.

**On-dark text** is `on-dark` at full opacity for primary, 0.72 for secondary, 0.5 for muted. Components build these from `rgba(var(--on-dark-rgb), a)`.

## Typography

**Archivo 700 (display).** A wide, open grotesk from the signage and packaging world. Set in sentence case with -0.02em tracking. Wide type reads slow and calm, the physical opposite of Bebas Neue's compressed urgency on Merced. Hero at `clamp(2.6rem, 6vw, 4.4rem)`, section headings at `clamp(1.9rem, 3.6vw, 2.6rem)`, card and panel titles 1.35 to 1.6rem at weight 600. Never uppercase, never above 4.4rem.

**Source Sans 3 (body, label, UI).** Humanist, sincere, reads well in direct sun. Body 17px at 1.55. Labels, nav and buttons at 600. No tracked uppercase labels anywhere; eyebrows are sentence case with normal tracking.

**JetBrains Mono 500 (numbers).** Calculator readouts and price ranges only, with tabular figures. It makes a dollar range look measured rather than marketed.

**Loading:** all three via `next/font/google` in `config/sites/hanford-hvac/fonts.ts`, exposed as `--font-display`, `--font-body`, `--font-mono`. Verified on Google Fonts 2026-11-18.

## Layout

Max width 1120px, 20px gutters. 8px base unit. Airier than Merced: section padding 96px desktop, 64px mobile. Hero is a two-column grid at 800px and up (copy 1.15fr, panel 0.85fr); the panel stacks above the copy on mobile so the form is the first thing a phone user sees. Everything left-aligned. Service cards are a four-up grid collapsing to two, then one. No centered sections except the final CTA band, which is inherited.

## Elevation & Depth

Flat surfaces with 1px `border` edges. The hero panel and calculator readout get depth from color (dark on light), not shadow. If a shadow is ever needed it is offset and soft (0 12px 32px rgba(11,34,38,0.12)), never a zero-offset glow.

## Shapes

6 / 12 / 20px. Buttons and inputs 12px and 6px. Panels 20px. Soft cold objects, not pills, not Merced's 4px industrial edges. A nested element's radius equals the outer radius minus the gap.

## Components

- **Header:** pool dark, wordmark in Archivo 700 with "HVAC" in mint, nav in Source Sans 3 600 at 0.72 on-dark, phone in Archivo 600, CTA mint with dark text.
- **Hero (variant `light-panel`):** ice ground, headline left in Archivo, accent word in deep teal, lead paragraph, one bold fact line with hours, trust line in muted. Right: pool dark panel, 20px radius, mint submit button, inputs on `dark-mid` with 22% on-dark borders. Panel fades up 300ms ease-out on load.
- **Heat strip:** amber band, 48px, heat-ink text, one sentence plus a phone link. The only warm element.
- **Service cards:** surface, border, 12px radius, no numerals, no icons. Title in Archivo 600, one-line description in muted, a response fact in deep teal above a hairline. Focus and hover: border darkens to `text-muted`.
- **Calculator:** dark section; readout panel in pool dark with mint mono figure; outside temperature in amber.
- **Buttons:** primary on light = deep teal, white text; primary on dark = mint, ink text; ghost = 1.5px border in `border` or 35% on-dark. Hover darkens or lightens one step; active scales to 0.98; focus-visible 2px deep-teal outline offset 2px; disabled 60% opacity.
- **Inputs:** 48px min height, 6px radius, 16px text so iOS does not zoom.
- **Reviews, FAQ, footer:** inherited components; they read the tokens and need no variant.

## Do's and Don'ts

- Do keep every headline in sentence case.
- Do put the 30-minute callback and the Mon to Sat 7am to 8pm hours together, every time.
- Do use mint only on dark and deep teal only on light.
- Do leave amber to the heat strip and the temperature figure.
- Don't use icons in tiles, badges, star-rating graphics above the fold, or clipart of any kind.
- Don't add numerals, kickers or uppercase eyebrows to service cards or sections.
- Don't use a photo hero or a gradient anywhere.
- Don't let the display face exceed 4.4rem or drop below 600 weight.

## Motion

- **Approach:** minimal-functional.
- **Easing:** enter(ease-out) exit(ease-out) move(ease-in-out)
- **Duration:** micro(50-100ms) short(150-250ms) medium(250-400ms) long(400-700ms)
- **The one authored moment:** the hero form panel settles upward 10px and fades in over 300ms on load, like cold air arriving. Respects `prefers-reduced-motion`.

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-11-18 | Per-site DESIGN.md at `config/sites/<slug>/DESIGN.md`; root stays Merced | Sites share components but must not share a face. Future sites follow this pattern. |
| 2026-11-18 | Pool at Dusk direction: light hero, dark panel, cool palette, Archivo + Source Sans 3 + JetBrains Mono | Owner's memorable thing: "Cool relief, fast." Opposite temperature and posture to Merced. Fonts verified on Google Fonts. Clash Display (subagent suggestion) rejected as a banned face. |
| 2026-11-18 | Mint CTA on dark, deep teal CTA on light | Mint everywhere fails contrast on the ice ground; teal everywhere loses the "cold air" button. One token each. If first-month form rate lags Merced, swap the panel CTA to teal by changing `accent-on-dark`. |
| 2026-11-18 | Amber restricted to heat strip and temperature figure | The palette tells one story: hot outside, cool inside. More amber and it becomes a second brand color. |
