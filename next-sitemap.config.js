// UNUSED: the authoritative sitemap/robots are Next-native (app/sitemap.ts,
// app/robots.ts), which already derive the domain from siteConfig per site.
// There is no `postbuild` script, so next-sitemap never runs. Kept for reference;
// SITE_DOMAIN fallback below mirrors the intended per-site behavior if re-enabled.
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: `https://${process.env.SITE_DOMAIN ?? "mercedroofingpro.com"}`,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
  changefreq: "weekly",
  priority: 0.7,
  transform: async (config, path) => {
    // Location-landing slugs across sites; only the active site's slug is emitted.
    const priorities = {
      "/": 1.0,
      "/merced-roofing": 0.9,
      "/hanford-hvac": 0.9,
      "/calculator": 0.85,
      "/services": 0.8,
      "/contact": 0.75,
      "/about": 0.6,
    };
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priorities[path] ?? config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
