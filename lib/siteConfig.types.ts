import type { CalculatorConfig } from "@/lib/calculator";

export interface QA {
  q: string;
  a: string;
}

export interface Testimonial {
  stars: number;
  text: string;
  name: string;
  city: string;
  date: string;
}

/**
 * The contract every site's config must satisfy. Widened (mutable arrays, plain
 * string/number) so any site — Merced roofing, Hanford HVAC, etc. — can implement it.
 * A missing or mistyped field fails `tsc`, not production.
 */
export type HeroVariant = "dark-split" | "light-panel";

export interface SiteTheme {
  /** Key into lib/fonts.ts; each site loads its own next/font families. */
  fonts: "merced" | "hanford-hvac";
  colors: {
    bg: string; surface: string; dark: string; darkMid: string;
    accent: string; accentHover: string;
    accentOnDark: string; accentOnDarkHover: string; onAccentOnDark: string;
    gold: string; text: string; muted: string; mutedLight: string; border: string;
    /** Warm "outside" color for the alert strip; optional, falls back to gold. */
    heat?: string; heatInk?: string;
    /** Calculator readout figure on the dark panel. Defaults to white. */
    figureOnDark?: string;
    /** "r,g,b" for text on dark surfaces, used as rgba(var(--on-dark-rgb), a). */
    onDarkRgb: string;
    /** "r,g,b" of accent, used for tinted boxes. */
    accentRgb: string;
  };
  radius: { sm: string; md: string; lg: string; xl: string };
  display: { weight: number; tracking: string; xl: string; lg: string };
  eyebrow: { transform: "uppercase" | "none"; tracking: string };
  hero: HeroVariant;
  serviceNumerals: boolean;
}

export interface SiteConfig {
  niche: string;
  city: string;
  state: string;
  county: string;
  stateAbbr: string;

  siteName: string;
  tagline: string;
  description: string;
  phone: string;
  phoneHref: string;
  email: string;
  domain: string;

  address: { city: string; state: string; zip: string };
  serviceArea: string[];
  services: { title: string; description: string; /** One-line response promise shown on the card (Hanford). */ responseFact?: string }[];

  hero: {
    eyebrow: string;
    headlineLines: string[];
    emberLine: string;
    subcopy: string;
    bullets: string[];
    formEyebrow: string;
    formHeading: string;
    formSubcopy: string;
  };

  faqs: QA[];

  geo: { latitude: number; longitude: number };

  footer: {
    brandLead: string;
    brandEmphasis: string;
    brandTail: string;
    blurb: string;
    licensingLines: string[];
    bottomTagline: string;
  };

  /** Per-site visual tokens. Injected as CSS custom properties by app/layout.tsx. */
  theme: SiteTheme;

  pricing: {
    flatFeePerMonth: number;
    perLeadAboveThreshold: number;
    threshold: number;
    setupFee: number;
    freeLeadDays: number;
  };

  calculator: CalculatorConfig;

  hours: string;

  schema: { type: string; priceRange: string; hours: string };

  seo: { primaryKeyword: string; secondaryKeywords: string[] };

  metaSuffix: string;
  googleVerification: string;

  // General niche words for template interpolation across dynamic route pages.
  nicheLower: string; // e.g. "roofing" / "HVAC" (mid-sentence)
  licenseClass: string; // e.g. "C-39" / "C-20"

  // Per-site copy for the dynamic route templates (locations, blog, service detail).
  // Strings may contain {city},{zips},{county},{temp},{drive},{hub},{note},{phone},{siteName} tokens.
  templates: {
    callbackSub: string;
    locationsHub: {
      metaTitle: string;
      metaDescription: string;
      heading: string;
      blurb: string;
      ctaHeading: string;
    };
    blogIndex: {
      metaTitle: string;
      metaDescription: string;
      ogTitle: string;
      ogDescription: string;
      jsonLdName: string;
      jsonLdDescription: string;
      breadcrumbLabel: string;
      headingPrefix: string;
      headingHighlight: string;
      blurb: string;
      ctaHeading: string;
      ctaSub: string;
    };
    blogPost: {
      formHeading: string;
    };
    servicePage: {
      coverageNoteSuffix: string; // "surrounding {county} communities. Mon–Sat, 7am–8pm."
    };
    locationPage: {
      metaTitle: string;
      metaDescription: string;
      ogTitle: string;
      ogDescription: string;
      offerCatalogName: string;
      heroTitlePrefix: string;
      heroBlurb: string;
      climateHeading: string;
      climateSentence: string;
      servicesHeading: string;
      faqHeading: string;
      faqs: QA[];
    };
  };

  pages: {
    home: {
      metaTitle: string;
      /** Optional single-line band under the hero (e.g. heat-wave notice). Uses theme.colors.heat. */
      alertStrip?: { label?: string; text: string; linkLabel: string };
      trustBar: { label: string; sub: string }[];
      servicesHeading: string;
      estimatorHeading: string;
      estimatorSubcopy: string;
      estimatorSteps: string[];
      reviewsRating: string;
      reviewsCount: string;
      reviewsHeading: string;
      testimonials: Testimonial[];
    };
    about: {
      metaTitle: string;
      metaDescription: string;
      paragraphs: string[];
      badges: { label: string; detail: string }[];
    };
    services: {
      metaTitle: string;
      metaDescription: string;
      heading: string;
      subheadPrefix: string;
      coverageNote: string;
    };
    contact: { metaTitle: string; metaDescription: string };
    calculator: {
      metaTitle: string;
      metaDescription: string;
      heading: string;
      subcopy: string;
      leadNote: string;
    };
  };

  locationLanding: {
    slug: string;
    leadSource: string;
    metaTitle: string;
    metaDescription: string;
    canonicalPath: string;
    h1: string;
    heroSub: string;
    ctaEstimateLabel: string;
    sectionHeading: string;
    bodyParagraphs: string[];
    serviceAreaHeading: string;
    mapTitle: string;
    mapEmbedSrc: string;
    faqHeading: string;
    faqs: QA[];
    formHeading: string;
    formSub: string;
  };
}
