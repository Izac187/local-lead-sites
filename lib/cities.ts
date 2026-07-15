// Public API — unchanged for all consumers. Cities come from the active site.
import { getActiveSite } from "@/lib/site";
import type { CityData } from "@/lib/cities.data";
export type { CityData } from "@/lib/cities.data";

export const cities: CityData[] = getActiveSite().cities;

export function getCityBySlug(slug: string): CityData | undefined {
  return cities.find((c) => c.citySlug === slug);
}

export function getAllCitySlugs(): string[] {
  return cities.map((c) => c.citySlug);
}
