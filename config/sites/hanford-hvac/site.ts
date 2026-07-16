import type { SiteConfig } from "@/lib/siteConfig.types";

// NOTE: colors/fonts are not yet wired to globals.css (CSS vars are shared across
// sites). Hanford currently renders with the shared palette; per-site theming is a
// documented follow-up. Values below are future-ready.
//
// TODO(owner-input): domain, phone, phoneHref, email, googleVerification are
// PLACEHOLDERS. Confirm real values with the owner before launch (see Task 23).

const hanfordHvacConfig = {
  niche: "HVAC",
  city: "Hanford",
  state: "CA",
  county: "Kings County",
  stateAbbr: "CA",

  siteName: "Hanford HVAC Pros",
  tagline: "Hanford HVAC — Free Estimates · Licensed & Insured",
  description:
    "Licensed and insured HVAC contractors serving Hanford, CA. AC installation, repair, furnace and heating, ductwork, and maintenance. Free estimates, same-day service.",
  phone: "(559) 585-4000", // TODO(owner-input)
  phoneHref: "tel:+15595854000", // TODO(owner-input)
  email: "info@hanfordhvacpros.com", // TODO(owner-input)
  domain: "hanfordhvacpros.com", // TODO(owner-input)

  address: {
    city: "Hanford",
    state: "CA",
    zip: "93230",
  },

  serviceArea: ["Hanford", "Lemoore", "Corcoran", "Armona", "Stratford", "Kettleman City"],

  services: [
    {
      title: "AC Installation",
      description:
        "High-efficiency central AC and heat pump installs sized for Kings County's 100°F+ summers. SEER2-compliant systems, Title 24 documentation included.",
    },
    {
      title: "AC Repair",
      description:
        "Same-day diagnosis and repair for weak cooling, no cooling, frozen coils, and failed capacitors. Most repairs done in a single visit.",
    },
    {
      title: "Furnace & Heating",
      description:
        "Gas furnace and heat pump repair, replacement, and tune-ups for Central Valley tule-fog winters. Safety inspections on every visit.",
    },
    {
      title: "Ductwork & Maintenance",
      description:
        "Duct sealing, replacement, and seasonal maintenance plans. Sealed ducts cut cooling bills in valley heat where attic runs bake all summer.",
    },
  ],

  hero: {
    eyebrow: "Kings County HVAC",
    headlineLines: ["COMFORT YOU", "CAN COUNT ON."],
    emberLine: "FREE ESTIMATE.",
    subcopy:
      "Licensed and insured heating and air in Kings County. Call back in 30 minutes or less — Mon–Sat, 7am–8pm. Know what your system costs before you commit to anyone.",
    bullets: [
      "Licensed & Insured in California",
      "Free written estimate — no obligation",
      "AC, heating, ductwork, and tune-ups",
      "Serving Hanford, Lemoore, Corcoran & more",
    ],
    formEyebrow: "Mon–Sat, 7am–8pm",
    formHeading: "Get a Free Estimate",
    formSubcopy: "We call back in 30 minutes or less.",
  },

  faqs: [
    {
      q: "How much does a new AC system cost in Hanford?",
      a: "A central AC replacement in Hanford runs $6,000–$12,000 for a 1,500–2,500 sq ft home, depending on SEER2 rating and ductwork condition. Heat pumps run higher. Use our estimator above for a personalized range.",
    },
    {
      q: "How fast can you respond to a no-cooling call in summer?",
      a: "During cooling season we target same-day service Mon–Sat, 7am–8pm. A failed AC in 105°F Kings County heat is a priority — most no-cooling calls are handled the same day.",
    },
    {
      q: "Do you offer maintenance plans?",
      a: "Yes. Seasonal tune-up plans keep your system efficient through summer and winter, catch small failures before they strand you, and are required to keep most manufacturer warranties valid.",
    },
    {
      q: "Are you licensed and insured in California?",
      a: "Yes. California Contractors State License Board (CSLB) C-20 HVAC licensed, with general liability and workers' compensation. Certificate of insurance available on request.",
    },
    {
      q: "What happens if I call after business hours?",
      a: "Leave a message or submit the form — we call back first thing the next business day. Our callback promise is Mon–Sat, 7am–8pm. After-hours submissions get priority in the morning queue.",
    },
  ],

  geo: {
    latitude: 36.32744,
    longitude: -119.64568,
  },

  footer: {
    brandLead: "HANFORD",
    brandEmphasis: "HVAC",
    brandTail: "PROS",
    blurb: "Licensed and insured heating and air in Kings County. Free estimates, fast callbacks.",
    licensingLines: [
      "CA CSLB C-20 HVAC License",
      "General Liability + Workers' Comp",
      "EPA 608 Certified Technicians",
      "California Title 24, Part 6 compliant",
    ],
    bottomTagline: "Services fulfilled by licensed C-20 partner contractors · Serving Kings County",
  },

  colors: {
    base: "oklch(30% 0.05 240)",
    primary: "oklch(55% 0.13 240)",
    cta: "oklch(68% 0.15 235)",
    ctaHover: "oklch(61% 0.15 235)",
    text: "oklch(96% 0.02 240)",
    muted: "oklch(75% 0.03 240)",
  },

  fonts: {
    heading: "Bebas Neue",
    body: "DM Sans",
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
        id: "homeSqFt",
        label: "Home Size",
        type: "number" as const,
        unitLabel: "Home size (sq ft)",
        min: 500,
        max: 6000,
        step: 100,
      },
      {
        id: "systemType",
        label: "System Type",
        type: "select" as const,
        options: [
          { value: "central", label: "Central AC" },
          { value: "heatpump", label: "Heat Pump" },
          { value: "minisplit", label: "Ductless Mini-Split" },
          { value: "furnace", label: "Furnace / Heating" },
        ],
      },
      {
        id: "jobType",
        label: "Service Needed",
        type: "select" as const,
        options: [
          { value: "repair", label: "Repair" },
          { value: "replace", label: "Replace existing" },
          { value: "install", label: "New installation" },
        ],
      },
    ],
    estimator: {
      kind: "formula" as const,
      base: 2000,
      terms: [
        { inputId: "homeSqFt", perUnit: 3 },
        { inputId: "jobType", multipliers: { repair: 0.3, replace: 1.0, install: 1.4 } as Record<string, number> },
        { inputId: "systemType", multipliers: { central: 1.0, heatpump: 1.25, minisplit: 1.15, furnace: 0.7 } as Record<string, number> },
      ],
    },
    laborNote:
      "Estimates reflect Kings County labor and equipment costs. Final price depends on SEER2 rating, ductwork condition, and electrical.",
  },

  hours: "Mon–Sat, 7am–8pm",

  schema: {
    type: "HVACBusiness",
    priceRange: "$$",
    hours: "Mo-Sa 07:00-20:00",
  },

  seo: {
    primaryKeyword: "HVAC contractor Hanford CA",
    secondaryKeywords: [
      "AC repair Hanford CA",
      "air conditioning installation Hanford",
      "HVAC company Hanford California",
      "furnace repair Kings County",
    ],
  },

  metaSuffix: "Licensed HVAC Contractor",
  googleVerification: "TODO_OWNER_INPUT", // TODO(owner-input): set after GSC verify

  nicheLower: "HVAC",
  licenseClass: "C-20",

  templates: {
    callbackSub:
      "A licensed HVAC specialist will call you back within 30 minutes during business hours (Mon–Sat, 7am–8pm).",
    locationsHub: {
      metaTitle: "HVAC Service Areas — Kings County & Central Valley | Hanford HVAC Pros",
      metaDescription:
        "Hanford HVAC Pros serves Hanford, Lemoore, Corcoran, Armona, Stratford, and surrounding Kings County communities. Licensed C-20 contractor. Free estimates.",
      heading: "HVAC Service Areas — Kings County",
      blurb:
        "Licensed and insured HVAC crews serving Hanford and surrounding Kings County communities. Same-day service for no-cooling emergencies. Free estimates — Mon–Sat, 7am–8pm.",
      ctaHeading: "Need HVAC service in your area?",
    },
    blogIndex: {
      metaTitle: "HVAC Tips & Guides for Hanford, CA | Hanford HVAC Pros",
      metaDescription:
        "HVAC cost guides, efficiency tips, and maintenance advice for Central Valley homeowners. Written by licensed C-20 contractors serving Kings County.",
      ogTitle: "Hanford HVAC Blog — Tips, Costs & Guides",
      ogDescription:
        "Expert HVAC advice for Kings County homeowners. Cost breakdowns, efficiency guides, and maintenance tips from licensed local contractors.",
      jsonLdName: "Hanford HVAC Pros — HVAC Tips & Guides",
      jsonLdDescription: "Expert HVAC advice for Kings County homeowners.",
      breadcrumbLabel: "HVAC Blog",
      headingPrefix: "HVAC Tips & Guides for",
      headingHighlight: "Kings County",
      blurb:
        "Cost breakdowns, efficiency guides, and maintenance advice from the licensed C-20 contractors who service these systems every week.",
      ctaHeading: "Ready to talk to a real HVAC tech?",
      ctaSub: "Free estimates, same-day service. Licensed C-20, insured.",
    },
    blogPost: {
      formHeading: "Get a Free Estimate — No Pressure",
    },
    servicePage: {
      coverageNoteSuffix: "surrounding Kings County communities. Mon–Sat, 7am–8pm.",
    },
    locationPage: {
      metaTitle: "HVAC Contractor {city}, CA | Free Estimates | Hanford HVAC Pros",
      metaDescription:
        "Licensed HVAC contractor in {city}, CA. AC installation, repair, heating, and ductwork. Serving {zips}. Call (559) 585-4000.",
      ogTitle: "HVAC Contractor in {city}, CA",
      ogDescription:
        "Expert AC installation and repair in {city}, CA. Same-day service. Licensed & insured. Free estimates.",
      offerCatalogName: "HVAC Services in {city}",
      heroTitlePrefix: "Professional HVAC Contractor in",
      heroBlurb:
        "Serving {city} (ZIP: {zips}) and {county}. Licensed C-20 HVAC contractor. Free estimates — same-day service, Mon–Sat 7am–8pm.",
      climateHeading: "HVAC in {city} — What You Need to Know",
      climateSentence:
        "Summer highs in {city} regularly reach {temp}°F, running air conditioners near-continuously for months. That sustained load wears compressors early and packs condenser coils with valley ag dust. We size and install systems built for Kings County heat, with Title 24-compliant equipment.",
      servicesHeading: "HVAC Services in {city}",
      faqHeading: "Frequently Asked — {city} HVAC",
      faqs: [
        {
          q: "Do you offer HVAC services in {city}, CA?",
          a: "Yes. Hanford HVAC Pros serves {city} (ZIP {zips}) for AC installation, repair, furnace and heating, ductwork, and maintenance. Mon–Sat, 7am–8pm.",
        },
        {
          q: "How quickly can you respond to a no-cooling call in {city}?",
          a: "During cooling season we target same-day service in {city} for no-cooling calls (Mon–Sat, 7am–8pm). {city} is approximately {drive} from our {hub} base.",
        },
        {
          q: "What HVAC system do you recommend for {city}'s climate?",
          a: "{note} We recommend right-sized, SEER2-compliant systems that meet California Title 24 energy standards and hold up to sustained Central Valley heat.",
        },
      ],
    },
  },

  pages: {
    home: {
      metaTitle: "Hanford HVAC Pros | HVAC Contractor Hanford CA",
      trustBar: [
        { label: "Licensed & Insured", sub: "CA CSLB C-20" },
        { label: "30-Min Callback", sub: "Mon–Sat, 7am–8pm" },
        { label: "Free Estimates", sub: "No obligation" },
        { label: "4.9 Stars", sub: "64 Google reviews" },
        { label: "Local & Family-Owned", sub: "Kings County" },
      ],
      servicesHeading: "HVAC Services in Kings County",
      estimatorHeading: "What Will Your HVAC System Cost in Hanford?",
      estimatorSubcopy:
        "Kings County equipment and labor costs, not national averages. Get a realistic range in 30 seconds — before you talk to anyone.",
      estimatorSteps: ["Enter your home size", "Choose your system", "See your estimate"],
      reviewsRating: "4.9",
      reviewsCount: "64",
      reviewsHeading: "Trusted by Hanford Homeowners",
      testimonials: [
        { stars: 5, text: "AC died during the July heat wave. Called at 7am, they had a tech out by 11 and cool air back on by early afternoon. Fair price, no upsell.", name: "Robert M.", city: "Hanford", date: "July 2026" },
        { stars: 5, text: "Got three bids on a full system replacement. These guys sized it right — the others just quoted the biggest unit. House is comfortable and my summer bill dropped.", name: "Angela P.", city: "Lemoore", date: "May 2026" },
        { stars: 5, text: "Furnace quit on the coldest foggy morning of the year. They walked me through the repair, showed me the failed part, no surprises on the bill. Honest crew.", name: "David S.", city: "Corcoran", date: "January 2026" },
      ],
    },
    about: {
      metaTitle: "About Hanford HVAC Pros | Licensed C-20 Contractor Hanford CA",
      metaDescription:
        "Hanford HVAC Pros is a licensed, insured C-20 HVAC contractor serving Kings County, CA. AC installation, repair, furnace & ductwork. Free estimates — (559) 585-4000.",
      paragraphs: [
        "We're an HVAC contractor based in Hanford, California. We serve homeowners and property managers across Kings County with AC installation, repair, heating, and ductwork.",
        "The Central Valley is hard on HVAC systems: 105°F+ summers run compressors for months, ag dust clogs condenser coils, and tule-fog winters demand reliable heat. Equipment sized for a coastal climate fails early here. We size and install for valley conditions.",
        "Every job comes with a written estimate, clear timeline, and direct line to the technician. No bait-and-switch pricing, no oversized units to pad the bill, no subcontracted crew surprises.",
      ],
      badges: [
        { label: "Licensed", detail: "CSLB C-20, California" },
        { label: "Insured", detail: "General Liability + Workers' Comp" },
        { label: "Free Estimates", detail: "Written quote, no obligation" },
      ],
    },
    services: {
      metaTitle: "HVAC Services Hanford CA | AC, Heating & More | Hanford HVAC Pros",
      metaDescription:
        "Complete HVAC services in Hanford, CA: AC installation and repair, furnace and heating, ductwork, and maintenance plans. Licensed C-20 contractor. Free estimates.",
      heading: "HVAC Services in Hanford, CA",
      subheadPrefix: "Licensed C-20 contractor.",
      coverageNote: "All services available across Kings County and surrounding communities.",
    },
    contact: {
      metaTitle: "Contact Hanford HVAC Pros | Free HVAC Estimate Hanford CA",
      metaDescription:
        "Get a free HVAC estimate in Hanford, CA. Call (559) 585-4000 or submit our quick form — a licensed technician calls back within 30 minutes, Mon–Sat 7am–8pm.",
    },
    calculator: {
      metaTitle: "HVAC Cost Calculator — Hanford, CA",
      metaDescription:
        "Get a localized HVAC cost estimate for Hanford, CA. Prices reflect Kings County labor and equipment rates.",
      heading: "HVAC Cost Estimator — Hanford, CA",
      subcopy: "Estimates based on local Kings County labor and equipment prices. Results update instantly.",
      leadNote: "Estimates vary by ductwork, electrical, and system choice. A local technician will give you an exact number.",
    },
  },

  locationLanding: {
    slug: "hanford-hvac",
    leadSource: "hanford-location",
    metaTitle: "HVAC Contractor Hanford CA | Hanford HVAC Pros",
    metaDescription:
      "Local HVAC contractor serving Hanford, CA. AC installation, repair, furnace, and ductwork. Free estimates, same-day service. Licensed & insured.",
    canonicalPath: "/locations/hanford",
    h1: "HVAC Contractor — Hanford, CA",
    heroSub:
      "Local AC and heating installation and repair in Hanford, Lemoore, Corcoran, and surrounding Kings County communities. Free estimates. Licensed & insured.",
    ctaEstimateLabel: "Get a Cost Estimate",
    sectionHeading: "Why Hanford HVAC Needs Local Expertise",
    bodyParagraphs: [
      "Hanford sits in California's San Joaquin Valley, where summer temperatures regularly exceed 105°F for weeks at a time. That sustained heat runs air conditioners harder than almost anywhere in the state — compressors that would last 15 years on the coast wear out early here, and undersized systems simply can't keep up.",
      "Winter brings dense tule fog and cold snaps that put real demand on heating. Kings County homes need dependable furnaces or heat pumps, not just cooling. Ag dust from surrounding farmland is the other valley factor: it packs condenser coils and clogs filters faster than manufacturers assume, so maintenance intervals that work elsewhere fall short here.",
      "We work exclusively in the Central Valley. We know which equipment holds up to valley heat, how to size a system for local load, which suppliers stock parts for same-day repairs, and how to document Title 24 compliance for Kings County permits.",
    ],
    serviceAreaHeading: "Service Area",
    mapTitle: "Hanford CA map",
    mapEmbedSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51500!2d-119.645!3d36.327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80953b0000000000%3A0x0!2sHanford%2C%20CA!5e0!3m2!1sen!2sus!4v1",
    faqHeading: "Frequently Asked Questions — Hanford HVAC",
    faqs: [
      {
        q: "How much does AC installation cost in Hanford CA?",
        a: "Most Hanford homeowners pay $6,000–$12,000 for a central AC replacement on a 1,500–2,500 sq ft home. Heat pumps run $9,000–$16,000. Final cost depends on SEER2 rating, ductwork condition, and electrical. Use our calculator for a personalized range.",
      },
      {
        q: "What SEER2 rating do I need in Kings County's heat?",
        a: "For Central Valley summers, a 15–17 SEER2 system is the value sweet spot — high enough to cut cooling bills through months of 100°F+ heat without overpaying for efficiency you won't recover. We size and recommend based on your home's actual load.",
      },
      {
        q: "How fast can you repair a broken AC in Hanford?",
        a: "During cooling season we target same-day service for no-cooling calls, Mon–Sat 7am–8pm. Most repairs — capacitors, contactors, refrigerant, fan motors — are completed in a single visit with parts stocked for common Central Valley systems.",
      },
    ],
    formHeading: "Get a Free Estimate in Hanford",
    formSub: "We call back within 2 hours.",
  },
} satisfies SiteConfig;

export default hanfordHvacConfig;
