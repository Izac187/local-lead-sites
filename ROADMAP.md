# 90-Day Fast-Ranking Execution Roadmap
**Merced Roofing Pros — mercedroofingpro.com**
*Updated: May 2026*

---

## Phase Overview

| Phase | Weeks | Focus | Expected Outcome |
|-------|-------|-------|-----------------|
| Foundation | 1–4 | Technical SEO, GBP, citations | Crawl clean, indexed, map pack eligible |
| Content Engine | 5–8 | Blog, service silos, city pages | 20–40 long-tail rankings |
| Authority | 9–12 | Backlinks, reviews, local PR | 10–20 lead-gen keyword rankings |

---

## Week 1–2: Technical Foundation

### Done ✅
- [x] Next.js App Router with ISR (`generateStaticParams`)
- [x] Native sitemap.ts (30 URLs: home, services, locations, blog)
- [x] Dynamic robots.ts (correct domain)
- [x] JSON-LD schema per page type (RoofingContractor, Service, FAQPage, Article)
- [x] Geo-distance nearest-city linking
- [x] Lead form → Resend email + Twilio SMS auto-responder
- [x] City-based lead routing (LEAD_EMAIL_{CITY} env vars)
- [x] pSEO GitHub Actions workflow (weekly Claude Haiku content refresh)
- [x] Custom domain live: mercedroofingpro.com

### Action Items (Owner: You)
- [ ] **Submit sitemap to GSC**: `https://mercedroofingpro.com/sitemap.xml`
- [ ] **Push GitHub Actions workflow**: Run `gh auth refresh -s workflow` then `git push origin main`
- [ ] **Set Vercel env vars**:
  - `ANTHROPIC_API_KEY` — for weekly pSEO content generation
  - `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER` — SMS auto-responder
  - `LEAD_EMAIL_MERCED`, `LEAD_EMAIL_ATWATER`, `LEAD_EMAIL_LOS_BANOS`, etc. — city routing
- [ ] **GBP verification**: Ensure Google Business Profile is verified for Merced service area
- [ ] **Install Google Analytics 4** (or Vercel Analytics) — need baseline data

---

## Week 3–4: On-Page Optimization & GBP

### Technical
- [ ] Add canonical tags to all pages (Next.js `alternates.canonical` in `generateMetadata`)
- [ ] Verify Core Web Vitals pass in GSC — target LCP < 2.5s, CLS < 0.1
- [ ] Ensure all 6 location pages indexed (GSC URL Inspection tool)
- [ ] Ensure all 6 service pages indexed

### Google Business Profile (Manual)
- [ ] **Primary category**: Roofing Contractor
- [ ] **Secondary categories**: Add up to 9:
  - Roof Inspection Service
  - Gutter Cleaning Service
  - Waterproofing Service
  - Storm Damage Restoration Service
  - Home Improvement Contractor
- [ ] **Service area**: Add all 6 city service areas (Merced, Atwater, Los Banos, Livingston, Chowchilla, Winton)
- [ ] **Services list**: Add all 6 services with prices/ranges
- [ ] **Photo upload**: 10+ photos (crew at work, completed roofs, materials, vehicles with signage)
  - Tag photos with location when possible (Merced, CA)
  - Geotagged photos index faster in Maps
- [ ] **GBP posts**: Weekly post — use blog content excerpts with CTA

### Local Citations (Priority Order)
Submit NAP (Name: Merced Roofing Pros, Address: Merced CA 95340, Phone: (209) 259-0978) to:
1. **Yelp for Business** — yelp.com/biz/add
2. **Angi (formerly Angie's List)** — pro.angi.com
3. **HomeAdvisor** — pro.homeadvisor.com
4. **BBB** — bbb.org/bbb-accreditation
5. **Houzz** — houzz.com/pro
6. **Thumbtack** — thumbtack.com/pro
7. **Nextdoor for Business** — nextdoor.com/business
8. **Manta** — manta.com
9. **Factual/Foursquare** — (auto-syndicated via Yext or manually)
10. **CSLB Contractor Search** — ensure license # 1102547 (or actual) is current at cslb.ca.gov

---

## Week 5–6: Content Engine Launch

### Blog (Built ✅)
Four launch posts ready:
1. `/blog/how-long-does-roof-replacement-take-merced-ca` — How-to, 5 min
2. `/blog/cost-of-roof-replacement-merced-ca-2026` — Cost guide, 6 min
3. `/blog/best-roofing-materials-central-valley-heat` — Materials, 7 min
4. `/blog/signs-you-need-a-new-roof-merced` — Maintenance, 5 min

**Target keywords for each:**
| Post | Primary KW | Monthly Volume (est.) | Difficulty |
|------|-----------|----------------------|-----------|
| Replacement timeline | "how long does a roof replacement take" | 1,900 | Low |
| Cost guide | "roof replacement cost Merced CA" | 260 | Low |
| Materials guide | "best roofing material Central Valley" | 140 | Low |
| Signs you need new roof | "signs you need a new roof" | 3,600 | Medium |

### Additional Blog Posts (Weeks 5–8)
Write 1 post per week. Target topics:
- `merced-roofing-permit-requirements` — process, cost, who pulls it
- `emergency-roof-repair-merced` — what to do, who to call at 2am
- `atwater-ca-roofing-contractor` — hyper-local long-tail
- `los-banos-roofing-contractor` — hyper-local long-tail
- `metal-roof-vs-asphalt-merced` — comparison, FAQPage schema
- `california-title-24-roofing-requirements` — regulatory, trust signal
- `how-to-file-roof-insurance-claim-merced` — high-intent, pre-sale content

### Internal Linking Plan
Every blog post must link to:
- Relevant service page (cost post → `/services/roof-replacement`)
- Relevant location page (Merced content → `/locations/merced`)
- One other blog post (related posts already wired)

Every service page links to:
- 3 blog posts (add "Learn More" section to service page template)
- 3 nearby location pages

Every location page links to:
- 3 service pages (already done via services grid)
- 3 nearest city pages (already done via geo-distance)

---

## Week 7–8: Programmatic SEO Scale

### City Content Enhancement
Run `node scripts/generate-content.mjs` to populate `content/city-content.json` with AI-generated city intros (requires `ANTHROPIC_API_KEY`).

Update `lib/cities.ts` to read from `content/city-content.json` for the `uniqueNote` field — makes weekly content updates automatic.

### New Cities to Add (Phase 2)
Current: 6 cities. Add 6 more for 12 total:
| City | Slug | County | Est. Pop |
|------|------|--------|----------|
| Delhi | `delhi` | Merced | 10,100 |
| Hilmar | `hilmar` | Merced | 5,600 |
| Gustine | `gustine` | Merced | 5,800 |
| Newman | `newman` | Stanislaus | 12,000 |
| Patterson | `patterson` | Stanislaus | 24,000 |
| Turlock | `turlock` | Stanislaus | 75,000 |

Add to `lib/cities.ts` and `data/cities.csv`. Each new city = 1 new indexed page with geo-linked content.

### Service × City Matrix (Advanced pSEO)
For high-value combos, create `/services/[service]/[city]` pages:
- `/services/roof-replacement/merced`
- `/services/emergency-roof-repair/atwater`
- `/services/metal-roofing/los-banos`

These target: "roof replacement Merced CA", "emergency roof repair Atwater" — exact-match long-tail with low competition.

**Implementation**: Add `app/services/[service]/[city]/page.tsx` with `generateStaticParams()` combining all service × city combos. Priority after Weeks 1–6 are showing traction.

---

## Week 9–10: Backlink Acquisition

### Free Backlinks (Do These First)
1. **CSLB.ca.gov** — verify contractor profile is public and crawlable
2. **Merced Chamber of Commerce** — join for directory listing (mercedchamber.com)
3. **Merced County EDC** — economic development directory
4. **Nextdoor** — verified business gets indexable profile
5. **Google Local Services Ads profile** — structured backlink from Google properties
6. **Manufacturer partnerships**: Register as Owens Corning Preferred Contractor → get listed on owenscorning.com/roofing/find-a-contractor

### Outreach Backlinks
7. **Local Merced media** — reach out to Merced Sun-Star, YourCentralValley.com
   - Pitch: "California Title 24 heat compliance for homeowners" — expert quote
   - Aim for 1–2 editorial mentions = high-authority local links
8. **Real estate agents** — partner with Merced/Atwater agents for referral page exchange
9. **Insurance agents** — storm damage referral network, mutual linking
10. **HVAC/plumbing contractors** — complementary trades, non-competing referrals

### Link-Worthy Content Assets
Create one high-value linkable asset:
- **Merced County Roofing Cost Calculator** (already built at `/calculator`)
  - Pitch to local home improvement blogs and real estate sites
- **"Central Valley Roofing Heat Guide" PDF** — create via `/make-pdf` skill
  - Offer free download on site, pitch to contractor associations

---

## Week 11–12: Reviews, LSA & CRO

### Review Strategy
**Target: 25 Google reviews by Day 90** (current unknown — audit GBP now)

Tactics:
- [ ] Send SMS follow-up after every completed job (add to Twilio workflow)
- [ ] Create laminated QR code card for crew to leave at job completion
- [ ] Email follow-up at Day 3 and Day 7 post-install using Resend
- [ ] Respond to every review within 24 hours (Google indexes review responses)

**Review velocity matters more than total count** — 5 new reviews in 30 days outperforms 50 old ones.

### Google Local Services Ads (LSA)
- Apply at ads.google.com/local-services-ads
- C-39 license, insurance certificate, and background check required
- LSA "Google Guaranteed" badge increases CTR 30–50% in map pack
- Pay-per-lead model ($25–$80/lead for roofing in CA)
- Budget: $500–$1,000/month to test; scale to $2,000 if cost-per-acquired-lead < $300

### Conversion Rate Optimization
- [ ] Add click-to-call phone number above fold on all mobile pages (DONE — header)
- [ ] A/B test "Get My Free Estimate" vs "Call Now — Free Estimate" on hero CTA
- [ ] Add trust badges near form: "C-39 Licensed", "Insured", "Merced County Since ____"
- [ ] Add a photo of actual crew/owner near lead form (face = trust signal)
- [ ] Track form conversion rate in GA4 (set up form submit event)

---

## Paid Ads (Optional — Weeks 6+)

If organic rankings are slow, run targeted Google Ads alongside:

### Campaign Structure
**Campaign 1: Emergency / High Intent**
- Keywords: "emergency roof repair Merced", "roof leak repair Merced CA", "same day roof repair"
- Match type: Exact and phrase
- Budget: $300–$500/month
- Bid strategy: Maximize conversions

**Campaign 2: Replacement Intent**
- Keywords: "roof replacement Merced CA", "new roof cost Merced", "roofing contractor Merced"
- Budget: $400–$600/month

**Campaign 3: Location Expansion**
- Keywords: "roofing contractor Atwater CA", "roof repair Los Banos CA"
- Budget: $200–$400/month (test which cities convert)

**Total monthly paid budget**: $900–$1,500 to start

### Expected Paid Lead Cost
- Merced roofing CPC: $8–$22
- Click-to-lead conversion (well-optimized page): 8–15%
- Cost per lead: $55–$275

---

## Ranking Expectations

| Timeframe | Expected Outcome |
|-----------|-----------------|
| Day 30 | Site indexed, all 12 programmatic pages crawled, GBP profile complete |
| Day 60 | 5–15 long-tail rankings (blog posts, city pages), appearing in map pack for Merced searches |
| Day 90 | 20–40 rankings across location + blog content, consistent map pack presence in 3–4 cities |
| Month 6 | Top 3 map pack for "roofing contractor Merced", 50–100 rankings, 15–30 organic leads/month |
| Month 12 | Dominant in Merced County map pack, 200+ rankings, 30–60 organic leads/month |

### Lead Generation Estimates (Organic Only)
| Month | Organic Sessions | Lead Rate | Leads |
|-------|-----------------|-----------|-------|
| 1–2 | 50–200 | 3–5% | 2–10 |
| 3 | 300–600 | 4–6% | 12–36 |
| 6 | 800–1,500 | 5–7% | 40–105 |
| 12 | 2,000–4,000 | 5–8% | 100–320 |

At average job value of $12,000 and 25% close rate from inbound leads:
- **Month 3**: 3–9 closed jobs from SEO = $36k–$108k revenue
- **Month 12**: 25–80 closed jobs from SEO = $300k–$960k revenue

---

## Highest ROI Actions (Priority Order)

1. **Submit sitemap to GSC** — 15 minutes, enables indexing tracking
2. **GBP completeness** — secondary categories, photos, services list — drives map pack
3. **Get 25 reviews** — single highest-leverage local ranking factor
4. **Apply for Google LSA** — "Google Guaranteed" badge + pay-per-lead
5. **Merced Chamber of Commerce listing** — free local backlink from DA 40+ domain
6. **Blog: 1 post/week** — compounds over 12 months
7. **Owens Corning Preferred Contractor** — manufacturer backlink + credibility
8. **City page expansion** — 6 → 12 cities doubles programmatic surface area

---

## Weekly Checklist (Ongoing)

**Every Monday:**
- [ ] GBP post (excerpt from recent blog post + CTA + phone)
- [ ] Check GSC for new impressions/clicks, new errors
- [ ] Respond to any new Google reviews

**Every Wednesday:**
- [ ] One new blog post drafted and published
- [ ] Check lead inbox — any new form submissions from organic?

**Every Friday:**
- [ ] Photo upload to GBP (crew, completed job, before/after)
- [ ] Check Vercel analytics for traffic anomalies

**Monthly:**
- [ ] GSC: review top queries, find new keyword opportunities
- [ ] BrightLocal rank tracking report — which keywords moved
- [ ] Add 1–2 new cities to lib/cities.ts if expanding service area
- [ ] Citation audit — new directories to submit

---

## Budget Summary

| Item | Monthly Cost | Notes |
|------|-------------|-------|
| Vercel hosting | $20 | Pro plan for custom domain |
| Resend (email) | $0–20 | Free to 3k emails/month |
| Twilio SMS | $10–30 | ~$0.0075/SMS |
| Anthropic API | $5–15 | pSEO content generation |
| BrightLocal | $29 | Rank + citation tracking |
| Google LSA | $500–2,000 | Optional — pay per lead |
| **Total (no LSA)** | **~$65–95/month** | |
| **Total (with LSA)** | **~$600–2,100/month** | |

---

*Last updated by Claude Code — Phase 1–4 complete, blog infrastructure live, Section 11 roadmap finalized.*
