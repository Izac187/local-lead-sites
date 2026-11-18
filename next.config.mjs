/** @type {import('next').NextConfig} */
// Canonical host for 301s off the *.vercel.app deployment domain. Each Vercel
// project sets SITE_DOMAIN to its own custom domain (same env next-sitemap reads).
// Unset = no redirect, so a new site project stays reachable on its .vercel.app
// URL until its domain is live.
const canonicalDomain = process.env.SITE_DOMAIN;

const nextConfig = {
  async redirects() {
    // Production only: preview deployments also live on *.vercel.app and must stay reachable.
    if (process.env.VERCEL_ENV !== "production" || !canonicalDomain) return [];
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
