// Public API — unchanged for all consumers. Data source is the active site,
// selected by NEXT_PUBLIC_SITE (see lib/site.ts). Merced data lives in config.data.ts.
import { getActiveSite } from "@/lib/site";
export type { SiteConfig } from "@/lib/config.data";

export const siteConfig = getActiveSite().config;
