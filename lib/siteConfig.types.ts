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
  services: { title: string; description: string }[];

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

  colors: {
    base: string;
    primary: string;
    cta: string;
    ctaHover: string;
    text: string;
    muted: string;
  };

  fonts: { heading: string; body: string };

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

  pages: {
    home: {
      metaTitle: string;
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
    };
  };

  locationLanding: {
    slug: string;
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
