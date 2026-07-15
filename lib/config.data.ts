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
} as const;

export type SiteConfig = typeof siteConfig;

export default siteConfig;
