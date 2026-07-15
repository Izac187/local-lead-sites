export interface ServicePageData {
  slug: string;
  title: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  bullets: string[];
  faqs: { q: string; a: string }[];
  relatedServices: string[];
  estimateRange: string;
  urgency: "standard" | "emergency";
}

export const servicePages: ServicePageData[] = [
  {
    slug: "roof-replacement",
    title: "Roof Replacement",
    h1: "Roof Replacement in Merced, CA",
    metaTitle: "Roof Replacement Merced CA | Licensed Roofer | Merced Roofing Pros",
    metaDescription:
      "Complete roof replacement in Merced, CA. Asphalt shingles, metal, and tile. Licensed C-39 contractor. Free estimates — call (209) 259-0978.",
    summary:
      "A full tear-off and replacement is the right call when your roof is 20+ years old, has widespread shingle failure, or when repeated repairs no longer hold. We handle complete residential and commercial replacements across Merced County.",
    bullets: [
      "Architectural asphalt shingles (30-year warranty, Class A fire rating)",
      "Standing-seam metal roofing — rated for 110°F+ Central Valley summers",
      "Concrete and clay tile — authentic Spanish and flat profiles",
      "Full tear-off, OSB decking inspection, and code-compliant re-decking",
      "California Title 24 cool-roof compliant materials available",
      "Written estimate before any work begins — no surprise charges",
    ],
    faqs: [
      {
        q: "How much does roof replacement cost in Merced, CA?",
        a: "A standard asphalt shingle replacement in Merced runs $7,500–$16,000 for a 1,500–2,500 sq ft home. Metal roofing runs $12,000–$22,000. Concrete tile ranges from $15,000–$29,000. Final cost depends on roof pitch, decking condition, and material selection. We provide free written estimates.",
      },
      {
        q: "How long does a roof replacement take?",
        a: "Most residential replacements in Merced are completed in 1–2 days. Larger homes or complex roof pitches may take 2–3 days. We coordinate permit pulls with the City of Merced Building Division.",
      },
      {
        q: "Do you replace roofs on mobile homes or manufactured housing?",
        a: "Yes. We service manufactured homes throughout Merced County. Metal roofing and rubber membrane systems are common solutions for manufactured housing.",
      },
    ],
    relatedServices: ["roof-repair", "metal-roofing", "flat-roofing"],
    estimateRange: "$7,500 – $29,000",
    urgency: "standard",
  },
  {
    slug: "roof-repair",
    title: "Roof Repair",
    h1: "Roof Repair in Merced, CA",
    metaTitle: "Roof Repair Merced CA | Same-Day Response | Merced Roofing Pros",
    metaDescription:
      "Fast roof repair in Merced, CA. Leak detection, storm damage, missing shingles, flashing repair. Same-day response. Call (209) 259-0978.",
    summary:
      "Active leaks don't wait for business hours. Our repair crews cover Merced and surrounding Merced County communities, responding same day for roof leaks, missing shingles, damaged flashing, and storm-related damage.",
    bullets: [
      "Leak detection and active water intrusion containment",
      "Shingle repair and replacement (matching existing profiles)",
      "Step flashing, valley liner, and drip edge repair",
      "Fascia board and soffit dry rot remediation",
      "Emergency tarp installation — available during Merced rainy season",
      "Post-repair inspection with photos provided",
    ],
    faqs: [
      {
        q: "How quickly can you respond to a roof leak in Merced?",
        a: "For active leaks, we target same-day response Monday through Saturday, 7am–8pm. Emergency tarping is available to stop water intrusion while a permanent repair is scheduled.",
      },
      {
        q: "How much does roof repair cost in Merced?",
        a: "Minor repairs (1–2 shingles, small flashing fix) run $250–$600. More involved repairs involving underlayment, decking, or valley liners range from $800–$2,500. We provide a written estimate before any work begins.",
      },
      {
        q: "Can you match my existing shingles for a repair?",
        a: "In most cases yes. We carry common Central Valley shingle profiles in stock. If an exact match isn't available, we'll recommend the closest available option and document it in writing.",
      },
    ],
    relatedServices: ["emergency-roof-repair", "storm-damage", "roof-replacement"],
    estimateRange: "$250 – $2,500",
    urgency: "standard",
  },
  {
    slug: "emergency-roof-repair",
    title: "Emergency Roof Repair",
    h1: "Emergency Roof Repair — Merced County",
    metaTitle: "Emergency Roof Repair Merced CA | Same-Day Tarping | Merced Roofing Pros",
    metaDescription:
      "Emergency roof repair in Merced, CA. Active leaks, storm damage, fallen debris. Same-day tarping and repair. Call now: (209) 259-0978.",
    summary:
      "When a storm hits the Central Valley or a branch punches through your roof, you need a crew on-site fast. We dispatch emergency tarp teams and repair crews across Merced, Atwater, Los Banos, and Livingston — same day, Mon–Sat.",
    bullets: [
      "Emergency roof tarping to stop active water intrusion",
      "Storm damage containment — wind, hail, fallen tree limbs",
      "Debris removal and structural damage assessment",
      "Photo documentation for insurance claims",
      "Temporary repair to prevent further interior damage",
      "Permanent repair or replacement follow-up scheduled immediately",
    ],
    faqs: [
      {
        q: "Do you offer 24/7 emergency roof repair?",
        a: "We operate Mon–Sat, 7am–8pm. For after-hours emergencies, leave a message and a crew lead will call back first thing in the morning. Most emergency tarp calls are handled same day during business hours.",
      },
      {
        q: "Will emergency repairs be covered by my homeowner's insurance?",
        a: "Storm damage, hail, and wind-related repairs are typically covered under most California homeowner's policies. We provide written damage assessments and photo documentation to support your claim with your adjuster.",
      },
      {
        q: "How fast can you get to my home in Merced County?",
        a: "For active emergency calls during business hours, we target dispatch within 2 hours across Merced, Atwater, Los Banos, Livingston, and Chowchilla.",
      },
    ],
    relatedServices: ["roof-repair", "storm-damage", "roof-replacement"],
    estimateRange: "$350 – $1,800 (tarp + initial repair)",
    urgency: "emergency",
  },
  {
    slug: "metal-roofing",
    title: "Metal Roofing",
    h1: "Metal Roofing Installation — Merced, CA",
    metaTitle: "Metal Roofing Merced CA | Standing Seam & Steel | Merced Roofing Pros",
    metaDescription:
      "Metal roofing installation in Merced, CA. Standing seam, corrugated steel, and metal tiles. Built for Central Valley heat. Free estimate: (209) 259-0978.",
    summary:
      "Metal roofing is the highest-performing option for Central Valley homes. With Merced summers regularly hitting 105°F+, metal's reflectivity, 50-year lifespan, and low maintenance cost make it the top choice for long-term value.",
    bullets: [
      "Standing-seam metal panels — concealed fasteners, maximum leak protection",
      "Corrugated and R-panel steel for agricultural and commercial buildings",
      "Metal shingles and tiles — aesthetic appeal with metal durability",
      "Cool-roof rated finishes meeting California Title 24 Part 6 requirements",
      "Class A fire rating — critical in Merced County's fire-adjacent risk zones",
      "50+ year lifespan with minimal maintenance in dry Central Valley climate",
    ],
    faqs: [
      {
        q: "Is metal roofing worth it in Merced's climate?",
        a: "Yes — metal roofing outperforms asphalt in Merced's extreme summer heat. Reflective finishes can reduce attic temperatures by 20–30°F, cutting cooling costs. Metal also sheds debris and doesn't blister like asphalt in 105°F+ conditions.",
      },
      {
        q: "How much does metal roofing cost in Merced, CA?",
        a: "Standing-seam metal roofing on a typical Merced home (1,500–2,500 sq ft) runs $12,000–$20,000 installed. Corrugated steel panel systems start lower. We provide free detailed estimates.",
      },
      {
        q: "Does metal roofing work on low-slope roofs?",
        a: "Standing-seam panels can be installed on very low slopes (as low as 1:12 pitch). For flat roofs, we typically recommend TPO or modified bitumen instead. Our estimators will evaluate your specific roof geometry.",
      },
    ],
    relatedServices: ["roof-replacement", "flat-roofing", "roof-repair"],
    estimateRange: "$12,000 – $30,000",
    urgency: "standard",
  },
  {
    slug: "flat-roofing",
    title: "Flat Roofing",
    h1: "Flat Roof & TPO Roofing — Merced, CA",
    metaTitle: "Flat Roofing Merced CA | TPO & Modified Bitumen | Merced Roofing Pros",
    metaDescription:
      "Flat roof installation and repair in Merced, CA. TPO single-ply, modified bitumen, and EPDM. Commercial and residential. Call (209) 259-0978.",
    summary:
      "Flat and low-slope roofs require specialized systems. We install and repair TPO single-ply membrane, modified bitumen, and EPDM systems for Merced County commercial buildings, warehouses, and residential flat-roof structures.",
    bullets: [
      "TPO (Thermoplastic Polyolefin) single-ply membrane — heat-welded seams",
      "Modified bitumen — 2-ply SBS or APP systems for superior puncture resistance",
      "EPDM rubber membrane — cost-effective for large commercial footprints",
      "Ponding water correction and slope adjustment",
      "Elastomeric roof coatings for existing metal and built-up roofs",
      "Commercial TPO rated for foot traffic and rooftop HVAC equipment",
    ],
    faqs: [
      {
        q: "How long does a TPO flat roof last in Merced?",
        a: "A properly installed TPO membrane lasts 15–25 years in Merced's climate. UV exposure and heat cycling are the primary degradation factors. White TPO reflects heat and extends lifespan compared to dark membranes.",
      },
      {
        q: "What causes ponding water on flat roofs in Central Valley?",
        a: "Ponding (standing water 48+ hours after rain) is usually caused by insufficient slope, clogged drains, or membrane sagging. Left uncorrected, it accelerates seam failure. We diagnose and correct drainage issues during the initial inspection.",
      },
      {
        q: "Can you coat an existing flat roof instead of replacing it?",
        a: "Yes — if the existing membrane or built-up roof is structurally sound, an elastomeric coating can extend its life by 10–15 years at 30–50% of full replacement cost. We assess suitability during a free inspection.",
      },
    ],
    relatedServices: ["roof-replacement", "metal-roofing", "storm-damage"],
    estimateRange: "$8,000 – $25,000",
    urgency: "standard",
  },
  {
    slug: "storm-damage",
    title: "Storm Damage Repair",
    h1: "Storm Damage Roof Repair — Merced County",
    metaTitle: "Storm Damage Roof Repair Merced CA | Insurance Claims | Merced Roofing Pros",
    metaDescription:
      "Storm damage roof repair in Merced, CA. Hail, wind, and fallen tree limb damage. Insurance claim documentation provided. Call (209) 259-0978.",
    summary:
      "Merced County's wet season brings high winds through Pacheco Pass and occasional hail that strips granules and cracks tile. We document storm damage for insurance claims and complete repairs quickly to prevent interior water damage.",
    bullets: [
      "Hail damage assessment — granule loss, cracked tiles, dented flashing",
      "Wind damage repair — ridge cap loss, blown-back shingles, torn underlayment",
      "Fallen debris removal and structural damage inspection",
      "Complete photo documentation package for insurance adjusters",
      "Direct coordination with most major CA homeowner's insurance carriers",
      "Supplement negotiation support for insurance claim maximization",
    ],
    faqs: [
      {
        q: "Does homeowner's insurance cover storm roof damage in California?",
        a: "Yes — California HO-3 policies typically cover wind, hail, and storm damage. Flood damage requires separate flood insurance. We provide written damage assessments and photo documentation to support your insurance claim.",
      },
      {
        q: "How quickly should I act after storm damage to my roof?",
        a: "Immediately — water intrusion compounds quickly. California's prompt notice requirement means you should file with your insurer within a reasonable time after the storm. We can tarp and document damage same day to protect your claim.",
      },
      {
        q: "Do you work directly with insurance adjusters?",
        a: "Yes. We've worked with State Farm, Allstate, AAA, Mercury, and Farmers adjusters in Merced County. We can be present during the adjuster's inspection and provide a detailed repair estimate that aligns with Xactimate pricing.",
      },
    ],
    relatedServices: ["emergency-roof-repair", "roof-repair", "roof-replacement"],
    estimateRange: "Varies by damage scope",
    urgency: "emergency",
  },
];

export default servicePages;
