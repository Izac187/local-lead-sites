// Slugs registered here are the valid values for NEXT_PUBLIC_SITE.
// Each must have a matching config/sites/<slug>/index.ts default export bundle.
export const SITE_SLUGS = ["merced", "hanford-hvac"] as const;
export type SiteSlug = (typeof SITE_SLUGS)[number];
export const DEFAULT_SITE: SiteSlug = "merced";
