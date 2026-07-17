export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  publishDate: string; // ISO date string
  updatedDate?: string;
  category: "how-to" | "local" | "cost" | "materials" | "maintenance";
  excerpt: string;
  readingMinutes: number;
  keyTakeaways: string[];
  body: string; // HTML string for inline rendering
  faqs: { q: string; a: string }[];
  relatedPosts?: string[]; // slugs
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-long-does-roof-replacement-take-merced-ca",
    title: "How Long Does a Roof Replacement Take in Merced, CA?",
    metaTitle: "How Long Does a Roof Replacement Take? | Merced Roofing Pros",
    metaDescription:
      "Most Merced roof replacements take 1–3 days. Learn what affects the timeline — size, pitch, materials, and Central Valley weather windows.",
    publishDate: "2026-05-12",
    category: "how-to",
    excerpt:
      "Most Merced homeowners are back under a finished roof in one to three days. Here's exactly what determines that timeline and how to plan around it.",
    readingMinutes: 5,
    keyTakeaways: [
      "Standard 2,000 sq ft Merced re-roof: 2 days for asphalt shingles.",
      "Steep pitch, two existing layers, or rotted decking can add half a day each.",
      "Merced City permits issue in 24–48 hours; we pull them for you.",
      "Summer 105°F+ days add 2–3 hours per job for heat-safe nailing.",
    ],
    body: `
<p>Most Merced roof replacements finish in <strong>one to three days</strong>. A standard 2,000 sq ft single-story home with asphalt shingles: two days. Larger two-story homes or complex rooflines may push to three.</p>

<h2>What Drives the Timeline</h2>
<ul>
  <li><strong>Roof size:</strong> A 25-square (2,500 sq ft) roof takes roughly 8–10 crew-hours for tear-off and another 8 to install. Two-man crew = two days; four-man crew = one day.</li>
  <li><strong>Pitch:</strong> Low-slope (2/12 to 4/12) roofs common on Central Valley ranch homes move faster than steep 8/12 or 10/12 pitches found on older Victorians in downtown Merced.</li>
  <li><strong>Layers:</strong> California allows two layers of asphalt shingles. If your home already has two, tear-off adds a half day.</li>
  <li><strong>Decking condition:</strong> Rotted OSB or plywood sheeting gets replaced on the fly — budget an extra half day for older Merced homes built pre-1990.</li>
  <li><strong>Material lead time:</strong> Asphalt shingles ship from our supplier in Fresno overnight. Metal panels (standing seam) need 2–3 weeks fabrication time — plan accordingly.</li>
</ul>

<h2>Merced's Summer Heat Window</h2>
<p>We schedule most replacements before 10 AM and after 4 PM June through September. Shingles seal best between 70°F and 90°F; in Merced's 105°F July heat the adhesive strips can over-soften, so we adjust nailing patterns and seal tabs manually. This adds about 2–3 hours to a summer job — factor that in if you're scheduling during peak heat.</p>

<h2>Permit Timeline</h2>
<p>Merced City and Merced County both require a roofing permit for full replacements. <a href="https://www.cityofmerced.org/depts/cd/building_and_safety/default.asp" target="_blank" rel="noopener noreferrer">Merced City Building and Safety</a> typically issues permits within 24–48 hours for residential re-roofs. We pull and pay for permits on your behalf — it's included in our estimate.</p>

<h2>What the Schedule Looks Like</h2>
<ol>
  <li><strong>Day 1 morning:</strong> Dumpster delivery, materials staged, tear-off begins</li>
  <li><strong>Day 1 afternoon:</strong> Underlayment and ice-and-water shield installed</li>
  <li><strong>Day 2:</strong> Shingles, flashing, ridge cap, gutters re-hung</li>
  <li><strong>Day 2 afternoon:</strong> Cleanup, magnetic sweep, final walkthrough</li>
</ol>
<p>You're usually sleeping under the finished roof on Night 2.</p>
`,
    faqs: [
      {
        q: "Do I need to leave my house during a roof replacement in Merced?",
        a: "No. You can stay home — the crew works outside. Expect noise from 7 AM to 6 PM. Some homeowners prefer to be away during tear-off (loudest phase), but it's not required.",
      },
      {
        q: "What happens if it rains mid-job?",
        a: "We monitor weather forecasts and reschedule around rain. If an unexpected shower hits mid-job, we cover exposed decking with tarps. Merced averages only 13 inches of rain per year, so delays are rare May–October.",
      },
      {
        q: "How long does a metal roof replacement take vs. asphalt?",
        a: "Metal panel installation takes 1–2 days longer than asphalt due to the precision cutting and seaming required. Total project time is typically 3–4 days for a standard ranch home.",
      },
    ],
    relatedPosts: [
      "cost-of-roof-replacement-merced-ca-2026",
      "best-roofing-materials-central-valley-heat",
    ],
  },
  {
    slug: "cost-of-roof-replacement-merced-ca-2026",
    title: "Cost of Roof Replacement in Merced, CA (2026 Pricing Guide)",
    metaTitle: "Roof Replacement Cost Merced CA 2026 | Merced Roofing Pros",
    metaDescription:
      "Merced roof replacement costs $8,500–$22,000 for most homes. Breakdown by material, size, and what drives price in Central Valley in 2026.",
    publishDate: "2026-05-13",
    category: "cost",
    excerpt:
      "A Merced roof replacement runs $8,500–$22,000 for most homes depending on material and size. Here's the 2026 price breakdown and what actually drives cost.",
    readingMinutes: 6,
    keyTakeaways: [
      "Most Merced homes: $8,500–$22,000 fully installed in 2026.",
      "Architectural shingles ($6–$9/sq ft) are the sweet spot for cost vs. lifespan.",
      "Title 24 cool-roof products add 10–15% but qualify for utility rebates.",
      "Merced City permits run $185–$350 — included in our quotes.",
    ],
    body: `
<p>Based on jobs we've completed across Merced County, expect to pay <strong>$8,500–$22,000</strong> for a full residential roof replacement in 2026. Here's how that breaks down.</p>

<h2>Price by Material (Merced, CA 2026)</h2>
<table>
  <thead>
    <tr>
      <th>Material</th>
      <th>Cost per sq ft (installed)</th>
      <th>Lifespan</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Asphalt 3-tab</td>
      <td>$4.50–$6.00</td>
      <td>15–20 years</td>
    </tr>
    <tr>
      <td>Architectural shingles</td>
      <td>$6.00–$9.00</td>
      <td>25–30 years</td>
    </tr>
    <tr>
      <td>Metal (standing seam)</td>
      <td>$10.00–$18.00</td>
      <td>40–70 years</td>
    </tr>
    <tr>
      <td>Tile (concrete)</td>
      <td>$12.00–$20.00</td>
      <td>40–50 years</td>
    </tr>
    <tr>
      <td>TPO flat roof</td>
      <td>$6.00–$10.00</td>
      <td>20–30 years</td>
    </tr>
  </tbody>
</table>

<h2>Cost Factors Specific to Merced</h2>
<ul>
  <li><strong>Heat-rated materials:</strong> California Title 24 and CRRC require cool-roof-certified products on most residential replacements. These cost 10–15% more than standard shingles but qualify for utility rebates.</li>
  <li><strong>Permit fees:</strong> Merced City charges a flat $185–$350 for residential re-roof permits depending on valuation. County unincorporated areas run similar. We include this in our quote.</li>
  <li><strong>Decking replacement:</strong> Homes built 1960–1990 often have 3/8" OSB that has delaminated. Budget $2–$4 per sq ft for decking replacement if needed.</li>
  <li><strong>Attic ventilation:</strong> California requires balanced intake/exhaust. Adding ridge vents or soffit vents runs $500–$1,200 depending on existing conditions.</li>
</ul>

<h2>What a Free Estimate Covers</h2>
<p>Our estimates include: material cost, labor, permit fees, dumpster, decking inspection (with cost-per-sheet if replacement needed), and a 10-year workmanship warranty. We don't surprise you with line items on the day of install.</p>
`,
    faqs: [
      {
        q: "Why are Merced roof quotes higher than national averages?",
        a: "California labor rates, strict Title 24 energy compliance, and CRRC-certified material requirements push installed costs 20–30% above national medians. Merced is less expensive than the Bay Area or LA but tracks with Central Valley averages.",
      },
      {
        q: "Does homeowner's insurance cover roof replacement in Merced?",
        a: "Storm damage (hail, wind) is typically covered after your deductible. Wear-and-tear replacement is not. We provide detailed damage documentation to support your insurance claim.",
      },
      {
        q: "Can I get financing for a roof replacement?",
        a: "Yes. We offer 12-month same-as-cash and 60-month installment options through GreenSky. Approval in minutes with no hard credit pull for pre-qualification.",
      },
    ],
    relatedPosts: [
      "how-long-does-roof-replacement-take-merced-ca",
      "best-roofing-materials-central-valley-heat",
    ],
  },
  {
    slug: "best-roofing-materials-central-valley-heat",
    title: "Best Roofing Materials for Central Valley Heat (2026 Guide)",
    metaTitle: "Best Roofing Materials for Central Valley Heat | Merced Roofing Pros",
    metaDescription:
      "Central Valley summers hit 110°F+. We rank the best roofing materials for Merced, Atwater, and Los Banos homes by heat performance, cost, and California compliance.",
    publishDate: "2026-05-14",
    category: "materials",
    excerpt:
      "When your roof sees 110°F summers, material choice determines whether you replace it in 15 years or 50. Here's what we recommend for Central Valley homes and why.",
    readingMinutes: 7,
    keyTakeaways: [
      "Architectural asphalt in light colors: best value for most Merced homes.",
      "Standing seam metal lasts 40–70 years and pairs cleanly with solar.",
      "Concrete tile still dominates 1990s–2000s tract homes — repair beats reroof.",
      "Avoid 3-tab dark asphalt and cedar shake in Merced fire zones.",
    ],
    body: `
<p>Merced County's climate is punishing: 105–112°F summers, UV index that exceeds the national average by 35%, and delta moisture swings that stress flashings and sealants. We've replaced thousands of roofs in this valley and the materials that hold up long-term share three characteristics: Class A fire rating, cool-roof certification (CRRC), and thermal flexibility to handle 90°F daily temperature swings.</p>

<h2>1. Architectural Asphalt Shingles — Best Value</h2>
<p>Owens Corning Duration or GAF Timberline HDZ in <strong>lighter colors (Desert Tan, Weathered Wood)</strong> reflect more solar radiation than charcoal options. Expect 25–30 years in Merced conditions if installed with proper attic ventilation. Cost: $6–$9/sq ft installed.</p>
<p><strong>Best for:</strong> Budget-conscious homeowners, standard-pitch gable roofs, rental properties.</p>

<h2>2. Standing Seam Metal — Best for Longevity</h2>
<p>Galvalume or aluminum panels with PVDF coating last 40–70 years in Central Valley conditions. The continuous panel design eliminates the #1 failure point in asphalt: exposed nail heads. Metal reflects significantly more heat than asphalt and qualifies for California PUC utility rebates.</p>
<p><strong>Best for:</strong> Long-term owners, high-pitch roofs, homes with solar panel systems (panels mount to metal clamps, no roof penetrations).</p>

<h2>3. Concrete Tile — Best for Mediterranean Homes</h2>
<p>Boral or Eagle concrete tile is the dominant material in Merced's 1990s–2000s tract developments. The mass absorbs heat during the day and releases it at night — air space under tiles adds passive cooling. Lifespan: 40–50 years. Weight requires structural verification (most homes in this era are already engineered for tile).</p>
<p><strong>Best for:</strong> Homes already tiled (replace broken tiles vs. full reroof when possible), low-slope Mediterranean profiles.</p>

<h2>4. TPO Membrane — Best for Flat Roofs</h2>
<p>White TPO is mandatory thinking for flat and low-slope roofs in the Central Valley. Its white reflective surface dramatically reduces attic temperatures. Merced commercial properties see 15–20% reduction in cooling costs after switching from aged BUR or modified bitumen to TPO. Residential flat sections (common on mid-century ranch additions) respond the same way.</p>

<h2>Materials to Avoid</h2>
<ul>
  <li><strong>3-tab asphalt in dark colors:</strong> Fails in 12–15 years in Merced heat. The savings on material cost evaporate in accelerated replacement cycles.</li>
  <li><strong>Cedar shake:</strong> California fire code effectively prohibits new cedar shake in most Merced County fire hazard zones. Replacement must be with non-combustible or Class A material.</li>
</ul>
`,
    faqs: [
      {
        q: "Do I need a cool roof in Merced to meet California Title 24?",
        a: "Yes for most replacements. California's Title 24 Part 6 requires CRRC-certified cool-roof products on low-slope residential roofs and in climate zones 2, 9, and 10 (which includes Merced County). We specify compliant products on every job.",
      },
      {
        q: "Is metal roofing loud in rain?",
        a: "Not with modern installation. Standing seam metal over solid decking with underlayment is no louder than asphalt during rain. The 'tin roof' sound comes from old corrugated metal over open purlins — not applicable to modern residential standing seam.",
      },
      {
        q: "What color shingles are best for Merced's heat?",
        a: "Light and medium tones — tan, beige, weathered wood, medium gray — reflect more solar radiation than charcoal or black. CRRC cool-roof ratings factor in the actual reflectivity; we can show you the ratings for any shingle we quote.",
      },
    ],
    relatedPosts: [
      "cost-of-roof-replacement-merced-ca-2026",
      "how-long-does-roof-replacement-take-merced-ca",
    ],
  },
  {
    slug: "signs-you-need-a-new-roof-merced",
    title: "7 Signs You Need a New Roof in Merced (And What to Do Next)",
    metaTitle: "7 Signs You Need a New Roof in Merced CA | Merced Roofing Pros",
    metaDescription:
      "Curling shingles, granule loss, daylight through the attic — learn the 7 warning signs that mean a Merced home needs roof replacement, not repair.",
    publishDate: "2026-05-15",
    category: "maintenance",
    excerpt:
      "Most Merced homeowners wait too long — and a $500 repair becomes a $15,000 replacement. Here are the 7 signs that mean your roof needs attention now.",
    readingMinutes: 5,
    keyTakeaways: [
      "Shingles over 20 years old in Merced are past expected lifespan.",
      "Granule loss in gutters means the UV shield is failing.",
      "Daylight through the attic is a same-week repair, not a wait-and-see.",
      "2+ warning signs at once usually means replace, not repair.",
    ],
    body: `
<p>Central Valley heat accelerates every roofing failure mode. A shingle that might limp along 5 more years in Seattle fails in 2 in Merced. These are the signals we see most often on homes that waited too long.</p>

<h2>1. Shingles Older Than 20 Years</h2>
<p>Merced's UV exposure and 100°F+ summers age asphalt shingles 30–40% faster than the national average. A shingle rated for 30 years in a mild climate delivers about 18–22 years in the Central Valley. If you're approaching or past 20 years, schedule an inspection — the question is when to replace, not if.</p>

<h2>2. Granule Loss in Gutters</h2>
<p>Those gray-black pebbles in your gutters or on the ground below downspouts are ceramic granules from asphalt shingles. They're the UV shield. When they shed, the asphalt mat underneath starts cracking within 2–5 years. A handful of granules is normal; a full cup per gutter section after rain means the shingles are in late-stage degradation.</p>

<h2>3. Curling or Cupping Shingles</h2>
<p>Shingles curl upward (cupping) or downward (clawing) when they lose moisture asymmetrically — accelerated by Merced's heat-cold cycles. Curled shingles catch wind and lift easily, creating entry points for water during our December–March rain season.</p>

<h2>4. Daylight Through the Attic</h2>
<p>Go into your attic on a sunny day. If you see pinpoints of light through the decking, you have cracks or gaps that are already allowing moisture infiltration. This is a same-week repair situation — don't leave for the rainy season.</p>

<h2>5. Sagging Roof Sections</h2>
<p>A sagging section means the decking or structural framing below has been compromised by long-term moisture. This is beyond roofing — it requires structural evaluation. Call immediately.</p>

<h2>6. Persistent Interior Leaks After Repair</h2>
<p>If a roofer has patched the same area twice and you still get water intrusion, the system has failed broadly — not at one isolated point. Targeted repairs stop working when the substrate is compromised.</p>

<h2>7. Moss, Algae, or Dark Streaks</h2>
<p>Black streaking on north-facing Merced roofs is algae (Gloeocapsa magma). Left unchecked it retains moisture and accelerates granule loss. Moss is more aggressive — its root system pries up shingles. Both are treatable with zinc strips if caught early; full replacement if the damage has penetrated the mat.</p>

<h2>What to Do Next</h2>
<p>If you're seeing 2+ of these signs, call us for a free inspection. We'll give you a written assessment: repair if that buys you meaningful time, replace if the system is past tipping point. We don't upsell replacements when repairs are the right call — our reputation in Merced County depends on giving you the honest answer.</p>
`,
    faqs: [
      {
        q: "Can I do a visual inspection myself in Merced?",
        a: "From the ground with binoculars, yes. Look for missing shingles, visible granule loss, and obvious curling. Don't walk your own roof — Merced's hot, dry conditions make shingles brittle and footing unpredictable. Call us for the close inspection.",
      },
      {
        q: "How often should I get a roof inspection in Merced?",
        a: "Annually after age 15, and after any significant wind event (Merced gets periodic Diablo wind events in fall). Also inspect after the first major rain of the season — leaks reveal themselves when the roof actually gets wet.",
      },
    ],
    relatedPosts: [
      "cost-of-roof-replacement-merced-ca-2026",
      "how-long-does-roof-replacement-take-merced-ca",
    ],
  },
];

export default blogPosts;
