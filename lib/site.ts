import { SITE_SLUGS, DEFAULT_SITE, type SiteSlug } from "@/config/sites/registry";
import type { SiteConfig } from "@/lib/config.data";
import type { CityData } from "@/lib/cities.data";
import type { ServicePageData } from "@/lib/servicePages.data";
import type { BlogPost } from "@/lib/blogPosts.data";
import mercedBundle from "@/config/sites/merced";

export type SiteBundle = {
  config: SiteConfig;
  cities: CityData[];
  servicePages: ServicePageData[];
  blogPosts: BlogPost[];
};

/** Reads NEXT_PUBLIC_SITE; returns it when registered, else warns and falls back to merced. */
export function resolveSiteSlug(): SiteSlug {
  const raw = process.env.NEXT_PUBLIC_SITE;
  if (raw && (SITE_SLUGS as readonly string[]).includes(raw)) return raw as SiteSlug;
  if (raw) console.warn(`[site] Unknown NEXT_PUBLIC_SITE="${raw}", falling back to "${DEFAULT_SITE}"`);
  return DEFAULT_SITE;
}

/**
 * Returns the active site's data bundle. Uses a static switch with literal imports
 * so Next.js bundles only the referenced sites and tree-shakes per build.
 */
export function getActiveSite(): SiteBundle {
  const slug = resolveSiteSlug();
  switch (slug) {
    case "merced":
      return mercedBundle;
    // case "hanford-hvac": added in Task 20
    default:
      return mercedBundle;
  }
}
