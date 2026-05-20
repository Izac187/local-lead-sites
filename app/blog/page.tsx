import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blogPosts";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: `Roofing Tips & Guides for Merced, CA | ${siteConfig.siteName}`,
  description:
    "Roofing cost guides, material recommendations, and maintenance tips for Central Valley homeowners. Written by licensed C-39 contractors serving Merced County.",
  openGraph: {
    title: "Merced Roofing Blog — Tips, Costs & Guides",
    description:
      "Expert roofing advice for Merced County homeowners. Cost breakdowns, material guides, and maintenance tips from licensed local contractors.",
  },
};

const categoryLabels: Record<string, string> = {
  "how-to": "How-To",
  local: "Local",
  cost: "Cost Guide",
  materials: "Materials",
  maintenance: "Maintenance",
};

const categoryColors: Record<string, string> = {
  "how-to": "#E8521A",
  local: "#2563eb",
  cost: "#16a34a",
  materials: "#7c3aed",
  maintenance: "#b45309",
};

export default function BlogPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${siteConfig.siteName} — Roofing Tips & Guides`,
    description: "Expert roofing advice for Merced County homeowners.",
    url: `https://${siteConfig.domain}/blog`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.siteName,
      url: `https://${siteConfig.domain}`,
    },
    blogPost: blogPosts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `https://${siteConfig.domain}/blog/${p.slug}`,
      datePublished: p.publishDate,
      description: p.excerpt,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="bg-white min-h-screen">
        {/* Hero */}
        <div style={{ backgroundColor: "var(--dark)" }} className="px-4 py-14">
          <div className="max-w-4xl mx-auto">
            <nav className="text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 flex-wrap">
                <li><Link href="/" className="hover:text-gray-300 text-gray-400">Home</Link></li>
                <li aria-hidden className="text-gray-600">/</li>
                <li className="text-gray-200">Roofing Blog</li>
              </ol>
            </nav>
            <h1
              className="text-white mb-3"
              style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "0.02em" }}
            >
              Roofing Tips &amp; Guides for{" "}
              <span style={{ color: "var(--ember)" }}>Merced County</span>
            </h1>
            <p className="text-gray-300 max-w-2xl text-base leading-relaxed">
              Cost breakdowns, material guides, and maintenance advice from the licensed C-39
              contractors who work these roofs every week.
            </p>
          </div>
        </div>

        {/* Post grid */}
        <div className="px-4 py-12 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md hover:border-orange-200 transition-all flex flex-col"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: categoryColors[post.category] ?? "#666" }}
                  >
                    {categoryLabels[post.category] ?? post.category}
                  </span>
                  <span className="text-xs text-gray-400">{post.readingMinutes} min read</span>
                </div>
                <h2 className="font-bold text-gray-900 mb-2 leading-snug group-hover:text-orange-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{post.excerpt}</p>
                <span className="inline-block mt-4 text-xs font-semibold text-orange-500">
                  Read article →
                </span>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl p-8 text-center" style={{ backgroundColor: "var(--dark)" }}>
            <p
              className="text-white mb-2"
              style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontSize: "1.5rem", letterSpacing: "0.02em" }}
            >
              Ready to talk to a real roofer?
            </p>
            <p className="text-gray-400 text-sm mb-5">
              Free estimates, same-day emergency response. Licensed C-39, insured.
            </p>
            <a
              href={siteConfig.phoneHref}
              className="inline-block rounded-lg px-6 py-3 font-bold text-white text-base"
              style={{ backgroundColor: "var(--ember)" }}
            >
              Call {siteConfig.phone}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
