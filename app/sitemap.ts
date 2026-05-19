import type { MetadataRoute } from "next";
import { getAllCitySlugs } from "@/lib/cities";
import { getAllServiceSlugs } from "@/lib/servicePages";
import { siteConfig } from "@/lib/config";

const BASE = `https://${siteConfig.domain}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const citySlugs = getAllCitySlugs();
  const serviceSlugs = getAllServiceSlugs();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE}/locations`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE}/calculator`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const locationRoutes: MetadataRoute.Sitemap = citySlugs.map((slug) => ({
    url: `${BASE}/locations/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${BASE}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...locationRoutes, ...serviceRoutes];
}
