import type { SiteConfig } from "@/lib/siteConfig.types";

export const siteConfig = {
  niche: "Roofing",
  city: "Merced",
  state: "CA",
  county: "Merced County",
  stateAbbr: "CA",

  siteName: "Merced Roofing Pros",
  tagline: "Merced Roofing — Free Estimates · Licensed & Insured",
  description:
    "Licensed and insured roofing contractors serving Merced, CA. Free estimates, same-day response. Roof repair, replacement, and inspection.",
  phone: "(209) 259-0978",
  phoneHref: "tel:+12092590978",
  email: "info@mercedroofingpro.com",
  domain: "mercedroofingpro.com",

  address: {
    city: "Merced",
    state: "CA",
    zip: "95340",
  },

  serviceArea: ["Merced", "Atwater", "Livingston", "Los Banos", "Winton", "Delhi"],

  services: [
    {
      title: "Roof Replacement",
      description:
        "Full tear-off and replacement using asphalt shingles, metal, or tile. Merced's summer heat demands materials rated for 110°F+.",
    },
    {
      title: "Roof Repair",
      description:
        "Leak repair, storm damage, missing shingles, and flashing. Most repairs completed same or next day.",
    },
    {
      title: "Roof Inspection",
      description:
        "Pre-purchase, post-storm, and annual maintenance inspections with written report.",
    },
    {
      title: "Gutters & Drainage",
      description:
        "Gutter installation, cleaning, and downspout repair. Critical in Merced's rainy season.",
    },
  ],

  hero: {
    eyebrow: "Merced County Roofing",
    headlineLines: ["YOUR ROOF,", "FIXED RIGHT."],
    emberLine: "FREE ESTIMATE.",
    subcopy:
      "Licensed and insured roofing in Merced County. Call back in 30 minutes or less — Mon–Sat, 7am–8pm. Know what your roof costs before you commit to anyone.",
    bullets: [
      "Licensed & Insured in California",
      "Free written estimate — no obligation",
      "Storm damage, leaks, full replacements",
      "Serving Merced, Atwater, Livingston & more",
    ],
    formEyebrow: "Mon–Sat, 7am–8pm",
    formHeading: "Get a Free Estimate",
    formSubcopy: "We call back in 30 minutes or less.",
  },

  faqs: [
    {
      q: "How much does a roof replacement cost in Merced?",
      a: "A typical asphalt shingle replacement in Merced runs $7,500–$15,000 for a 2,000 sq ft home. Metal and tile cost more. Merced labor rates run about 10% below Bay Area averages. Use our estimator above for a personalized range.",
    },
    {
      q: "How long does a roof replacement take?",
      a: "Most residential replacements take 1–2 days. Larger homes or tile roofs may take 3–4 days. We schedule around Merced's forecast — no unfinished roofs left overnight during rain season.",
    },
    {
      q: "Do you offer free inspections?",
      a: "Yes. Free visual inspections with a written report for any Merced area homeowner. Post-storm inspections are typically same or next day.",
    },
    {
      q: "Are you licensed and insured in California?",
      a: "Yes. California Contractors State License Board (CSLB) licensed, with general liability and workers' compensation. Certificate of insurance available on request.",
    },
    {
      q: "What happens if I call after business hours?",
      a: "Leave a message or submit the form — we call back first thing the next business day. Our callback promise is Mon–Sat, 7am–8pm. After-hours submissions get priority in the morning queue.",
    },
  ],

  geo: {
    latitude: 37.30216,
    longitude: -120.48297,
  },

  footer: {
    brandLead: "MERCED",
    brandEmphasis: "ROOFING",
    brandTail: "PROS",
    blurb: "Licensed and insured roofing in Merced County. Free estimates, fast callbacks.",
    licensingLines: [
      "CA CSLB C-39 Roofing License",
      "General Liability + Workers' Comp",
      "Cool Roof Rating Council (CRRC) compliant",
      "California Title 24, Part 6 materials",
    ],
    bottomTagline: "Services fulfilled by licensed C-39 partner contractors · Serving Merced County",
  },

  colors: {
    base: "oklch(32% 0.09 38)",
    primary: "oklch(58% 0.15 38)",
    cta: "oklch(72% 0.18 65)",
    ctaHover: "oklch(65% 0.18 65)",
    text: "oklch(96% 0.02 38)",
    muted: "oklch(75% 0.04 38)",
  },

  fonts: {
    heading: "Barlow Condensed",
    body: "Inter",
  },

  pricing: {
    flatFeePerMonth: 500,
    perLeadAboveThreshold: 100,
    threshold: 5,
    setupFee: 500,
    freeLeadDays: 30,
  },

  calculator: {
    inputs: [
      {
        id: "roofSize",
        label: "Roof Size",
        type: "select" as const,
        options: [
          { value: "small", label: "Under 1,500 sq ft" },
          { value: "medium", label: "1,500–2,500 sq ft" },
          { value: "large", label: "2,500–3,500 sq ft" },
          { value: "xlarge", label: "Over 3,500 sq ft" },
        ],
      },
      {
        id: "material",
        label: "Material",
        type: "select" as const,
        options: [
          { value: "asphalt", label: "Asphalt Shingles" },
          { value: "metal", label: "Metal Roofing" },
          { value: "tile", label: "Concrete/Clay Tile" },
        ],
      },
      {
        id: "condition",
        label: "Roof Condition",
        type: "select" as const,
        options: [
          { value: "repair", label: "Needs repair (1–3 areas)" },
          { value: "partial", label: "Partial replacement" },
          { value: "full", label: "Full replacement" },
        ],
      },
    ],
    estimator: {
      kind: "lookup" as const,
      keyOrder: ["roofSize", "material", "condition"],
      table: {
        "small|asphalt|repair": [800, 1500], "small|asphalt|partial": [2500, 4000], "small|asphalt|full": [5000, 7500],
        "small|metal|repair": [1200, 2000], "small|metal|partial": [4000, 6000], "small|metal|full": [8000, 12000],
        "small|tile|repair": [1500, 2500], "small|tile|partial": [5000, 8000], "small|tile|full": [10000, 15000],
        "medium|asphalt|repair": [1200, 2200], "medium|asphalt|partial": [4000, 6500], "medium|asphalt|full": [7500, 11000],
        "medium|metal|repair": [1800, 3000], "medium|metal|partial": [6500, 9500], "medium|metal|full": [12000, 17000],
        "medium|tile|repair": [2000, 3500], "medium|tile|partial": [7500, 12000], "medium|tile|full": [15000, 22000],
        "large|asphalt|repair": [1800, 3000], "large|asphalt|partial": [6000, 9000], "large|asphalt|full": [10000, 15000],
        "large|metal|repair": [2500, 4000], "large|metal|partial": [9000, 13000], "large|metal|full": [16000, 22000],
        "large|tile|repair": [3000, 5000], "large|tile|partial": [10000, 16000], "large|tile|full": [20000, 29000],
        "xlarge|asphalt|repair": [2500, 4000], "xlarge|asphalt|partial": [8000, 12000], "xlarge|asphalt|full": [14000, 20000],
        "xlarge|metal|repair": [3500, 5500], "xlarge|metal|partial": [12000, 18000], "xlarge|metal|full": [22000, 30000],
        "xlarge|tile|repair": [4000, 7000], "xlarge|tile|partial": [14000, 22000], "xlarge|tile|full": [28000, 40000],
      } as Record<string, [number, number]>,
    },
    laborNote: "Estimates reflect Merced County labor rates, which run ~10% below Bay Area averages.",
  },

  hours: "Mon–Sat, 7am–8pm",

  schema: {
    type: "RoofingContractor",
    priceRange: "$$",
    hours: "Mo-Sa 07:00-20:00",
  },

  seo: {
    primaryKeyword: "roofing contractor Merced CA",
    secondaryKeywords: [
      "roof repair Merced CA",
      "roof replacement Merced",
      "roofer near me Merced",
      "roofing company Merced California",
    ],
  },

  // Title suffix for the layout default title + Google Search Console token.
  metaSuffix: "Licensed Roofing Contractor",
  googleVerification: "fecb06293829c33b",

  nicheLower: "roofing",
  licenseClass: "C-39",

  templates: {
    callbackSub:
      "A licensed roofing specialist will call you back within 30 minutes during business hours (Mon–Sat, 7am–8pm).",
    locationsHub: {
      metaTitle: "Roofing Service Areas — Merced County & Central Valley | Merced Roofing Pros",
      metaDescription:
        "Merced Roofing Pros serves Merced, Atwater, Los Banos, Livingston, Chowchilla, and surrounding Central Valley communities. Licensed C-39 contractor. Free estimates.",
      heading: "Roofing Service Areas — Merced County",
      blurb:
        "Licensed and insured roofing crews serving Merced and surrounding Central Valley communities. Same-day response for leak emergencies. Free estimates — Mon–Sat, 7am–8pm.",
      ctaHeading: "Need roofing in your area?",
    },
    blogIndex: {
      metaTitle: "Roofing Tips & Guides for Merced, CA | Merced Roofing Pros",
      metaDescription:
        "Roofing cost guides, material recommendations, and maintenance tips for Central Valley homeowners. Written by licensed C-39 contractors serving Merced County.",
      ogTitle: "Merced Roofing Blog — Tips, Costs & Guides",
      ogDescription:
        "Expert roofing advice for Merced County homeowners. Cost breakdowns, material guides, and maintenance tips from licensed local contractors.",
      jsonLdName: "Merced Roofing Pros — Roofing Tips & Guides",
      jsonLdDescription: "Expert roofing advice for Merced County homeowners.",
      breadcrumbLabel: "Roofing Blog",
      headingPrefix: "Roofing Tips & Guides for",
      headingHighlight: "Merced County",
      blurb:
        "Cost breakdowns, material guides, and maintenance advice from the licensed C-39 contractors who work these roofs every week.",
      ctaHeading: "Ready to talk to a real roofer?",
      ctaSub: "Free estimates, same-day emergency response. Licensed C-39, insured.",
    },
    blogPost: {
      formHeading: "Get a Free Estimate — No Pressure",
    },
    servicePage: {
      coverageNoteSuffix: "surrounding Merced County communities. Mon–Sat, 7am–8pm.",
    },
    locationPage: {
      metaTitle: "Roofing Contractor {city}, CA | Free Estimates | Merced Roofing Pros",
      metaDescription:
        "Licensed roofing contractor in {city}, CA. Roof replacement, repair, and emergency leak response. Serving {zips}. Call (209) 259-0978.",
      ogTitle: "Roofing Contractor in {city}, CA",
      ogDescription:
        "Expert roof repair and replacement in {city}, CA. Same-day emergency response. Licensed & insured. Free estimates.",
      offerCatalogName: "Roofing Services in {city}",
      heroTitlePrefix: "Professional Roofing Contractor in",
      heroBlurb:
        "Serving {city} (ZIP: {zips}) and {county}. Licensed C-39 roofing contractor. Free estimates — same-day emergency response, Mon–Sat 7am–8pm.",
      climateHeading: "Roofing in {city} — What You Need to Know",
      climateSentence:
        "Summer highs in {city} regularly reach {temp}°F — accelerating shingle blistering, granule loss, and underlayment degradation. We specify materials that meet California Title 24 energy efficiency standards and carry Class A fire ratings.",
      servicesHeading: "Roofing Services in {city}",
      faqHeading: "Frequently Asked — {city} Roofing",
      faqs: [
        {
          q: "Do you offer roofing services in {city}, CA?",
          a: "Yes. Merced Roofing Pros serves {city} (ZIP {zips}) for roof replacement, repair, emergency leak response, and gutter services. Mon–Sat, 7am–8pm.",
        },
        {
          q: "How quickly can you respond to a roof emergency in {city}?",
          a: "For active leaks in {city}, we target same-day response during business hours (Mon–Sat, 7am–8pm). {city} is approximately {drive} from our {hub} base.",
        },
        {
          q: "What roofing materials do you recommend for {city}'s climate?",
          a: "{note} We recommend Class A fire-rated, cool-roof-certified materials that meet California Title 24 energy standards for Central Valley homes.",
        },
      ],
    },
  },

  // Per-page niche/geo copy. Generic UI labels stay hardcoded in components.
  pages: {
    home: {
      metaTitle: "Merced Roofing Pros | Roofing Contractor Merced CA",
      trustBar: [
        { label: "Licensed & Insured", sub: "CA CSLB certified" },
        { label: "30-Min Callback", sub: "Mon–Sat, 7am–8pm" },
        { label: "Free Estimates", sub: "No obligation" },
        { label: "4.9 Stars", sub: "87 Google reviews" },
        { label: "Local & Family-Owned", sub: "Merced County" },
      ],
      servicesHeading: "Roofing Services in Merced County",
      estimatorHeading: "What Will Your Roof Cost in Merced?",
      estimatorSubcopy:
        "Merced County labor rates run about 10% below Bay Area averages. Get a realistic range in 30 seconds — before you talk to anyone.",
      estimatorSteps: ["Pick your roof size", "Choose your material", "See your estimate"],
      reviewsRating: "4.9",
      reviewsCount: "87",
      reviewsHeading: "Trusted by Merced Homeowners",
      testimonials: [
        { stars: 5, text: "Called at 8am after last night's storm. They were on my roof by noon. No drama, no upsell. Leak fixed, showed me photos of the repair. Will use again.", name: "Maria R.", city: "Merced", date: "March 2026" },
        { stars: 5, text: "Got three quotes. These guys were mid-range on price but the most professional. Showed up on time, cleaned up completely. My neighbor hired them the next week.", name: "James T.", city: "Atwater", date: "January 2026" },
        { stars: 5, text: "I was nervous about being ripped off — I know nothing about roofs. They gave me a written estimate and walked me through every line. No surprises at the end.", name: "Sandra K.", city: "Los Banos", date: "February 2026" },
      ],
    },
    about: {
      metaTitle: "About Merced Roofing Pros | Licensed C-39 Contractor Merced CA",
      metaDescription:
        "Merced Roofing Pros is a licensed, insured C-39 roofing contractor serving Merced County, CA. Roof repair, replacement & gutters. Free estimates — (209) 259-0978.",
      paragraphs: [
        "We're a roofing contractor based in Merced, California. We serve homeowners and property managers across Merced County with roof repair, replacement, and inspection.",
        "The Central Valley has specific roofing demands: 110°F+ summers, dense tule fog in winter, and concentrated rain from November through March. We work exclusively in this region — no national franchise, no crews flown in from elsewhere.",
        "Every job comes with a written estimate, clear timeline, and direct line to the contractor. No bait-and-switch pricing, no subcontracted crew surprises.",
      ],
      badges: [
        { label: "Licensed", detail: "CSLB Licensed, California" },
        { label: "Insured", detail: "General Liability + Workers' Comp" },
        { label: "Free Estimates", detail: "Written quote, no obligation" },
      ],
    },
    services: {
      metaTitle: "Roofing Services Merced CA | Repair, Replacement & More | Merced Roofing Pros",
      metaDescription:
        "Complete roofing services in Merced, CA: emergency repair, roof replacement, metal roofing, flat TPO, storm damage, and more. Licensed C-39 contractor. Free estimates.",
      heading: "Roofing Services in Merced, CA",
      subheadPrefix: "Licensed C-39 contractor.",
      coverageNote: "All services available across Merced County and surrounding communities.",
    },
    contact: {
      metaTitle: "Contact Merced Roofing Pros | Free Roofing Estimate Merced CA",
      metaDescription:
        "Get a free roofing estimate in Merced, CA. Call (209) 259-0978 or submit our quick form — a licensed contractor calls back within 30 minutes, Mon–Sat 7am–8pm.",
    },
    calculator: {
      metaTitle: "Roofing Cost Calculator — Merced, CA",
      metaDescription:
        "Get a localized roofing cost estimate for Merced, CA. Prices reflect Merced County labor rates.",
      heading: "Roofing Cost Estimator — Merced, CA",
      subcopy: "Estimates based on local Merced County labor and material prices. Results update instantly.",
      leadNote: "Estimates vary by roof pitch and access. A local roofer will give you an exact number.",
    },
  },

  // Config-driven location landing page, served at /<slug> via app/[area].
  locationLanding: {
    slug: "merced-roofing",
    leadSource: "merced-location",
    metaTitle: "Roofing Contractor Merced CA | Merced Roofing Pros",
    metaDescription:
      "Local roofing contractor serving Merced, CA. Roof repair, replacement, and inspection. Free estimates, same-day response. Licensed & insured.",
    canonicalPath: "/locations/merced",
    h1: "Roofing Contractor — Merced, CA",
    heroSub:
      "Local roofing repair and replacement in Merced, Atwater, Livingston, and surrounding Central Valley communities. Free estimates. Licensed & insured.",
    ctaEstimateLabel: "Get a Cost Estimate",
    sectionHeading: "Why Merced Roofs Need Local Expertise",
    bodyParagraphs: [
      "Merced sits in California's San Joaquin Valley, where summer temperatures regularly exceed 100°F. That thermal stress cycles roofing materials far harder than coastal climates — asphalt shingles crack, flashing expands and contracts, and UV degradation is accelerated. A roof designed for San Jose may fail 5 years early in Merced.",
      "Winter brings the opposite challenge. Merced County averages 12–14 inches of rain annually, concentrated in November through March. Low-slope areas around Atwater and Livingston see pooling water if gutters and drainage aren't maintained. Tule fog in the valley floor adds persistent moisture exposure.",
      "We work exclusively in the Central Valley. We know which materials hold up, which suppliers stock for the local market, and which neighborhoods (near Yosemite Lake, the UC Merced campus corridor, and older homes near downtown) have recurring issues specific to their construction era.",
    ],
    serviceAreaHeading: "Service Area",
    mapTitle: "Merced CA map",
    mapEmbedSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50870.72!2d-120.512!3d37.302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8090922cd038e6a7%3A0x16f89e45e697d17f!2sMerced%2C%20CA!5e0!3m2!1sen!2sus!4v1",
    faqHeading: "Frequently Asked Questions — Merced Roofing",
    faqs: [
      {
        q: "How much does roof replacement cost in Merced CA?",
        a: "Most Merced homeowners pay $7,000–$15,000 for a full asphalt shingle replacement on a 1,500–2,500 sq ft home. Metal roofs run $14,000–$24,000. Prices are about 10% lower than Bay Area rates. Use our calculator for a personalized range.",
      },
      {
        q: "What roofing materials work best in Merced's climate?",
        a: "30-year architectural asphalt shingles rated for Class 3 hail and 110°F heat are the most cost-effective choice. Metal standing seam is the long-term winner — 50+ year lifespan, reflects UV, handles thermal cycling better than any shingle.",
      },
      {
        q: "How long does roof repair take in Merced?",
        a: "Minor repairs (1–3 areas, flashing, shingles) are usually same or next day. Full replacements take 1–2 days for most Merced homes. We schedule around valley weather — no open roofs overnight in the rainy season.",
      },
    ],
    formHeading: "Get a Free Estimate in Merced",
    formSub: "We call back within 2 hours.",
  },
} satisfies SiteConfig;

export type { SiteConfig } from "@/lib/siteConfig.types";

export default siteConfig;
