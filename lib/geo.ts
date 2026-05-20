import { cities, type CityData } from "./cities";

/** Haversine distance in miles between two lat/lng points */
function distanceMiles(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3958.8;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.asin(Math.sqrt(a));
}

/** Returns the N nearest cities (excluding source) sorted by distance */
export function getNearestCities(sourceSlug: string, count = 3): CityData[] {
  const source = cities.find((c) => c.citySlug === sourceSlug);
  if (!source) return cities.filter((c) => c.citySlug !== sourceSlug).slice(0, count);

  return cities
    .filter((c) => c.citySlug !== sourceSlug)
    .map((c) => ({
      city: c,
      distance: distanceMiles(source.latitude, source.longitude, c.latitude, c.longitude),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, count)
    .map((x) => x.city);
}
