/** @type {import('next').NextConfig} */
// Canonical host for 301s off the *.vercel.app deployment domain. Mirrors the
// SITE_DOMAIN convention in next-sitemap.config.js so each Vercel project
// redirects its own preview host to its own custom domain.
const canonicalDomain = process.env.SITE_DOMAIN ?? "mercedroofingpro.com";

const nextConfig = {
  async redirects() {
    // Production only: preview deployments also live on *.vercel.app and must stay reachable.
    if (process.env.VERCEL_ENV !== "production") return [];
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "(?<host>.*)\\.vercel\\.app" }],
        destination: `https://${canonicalDomain}/:path*`,
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
