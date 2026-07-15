// Public API — unchanged for all consumers. Service pages come from the active site.
import { getActiveSite } from "@/lib/site";
import type { ServicePageData } from "@/lib/servicePages.data";
export type { ServicePageData } from "@/lib/servicePages.data";

export const servicePages: ServicePageData[] = getActiveSite().servicePages;

export function getServiceBySlug(slug: string): ServicePageData | undefined {
  return servicePages.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return servicePages.map((s) => s.slug);
}
