import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blogPosts";
import { siteConfig } from "@/lib/config";

const B = siteConfig.templates.blogIndex;

export const metadata: Metadata = {
  title: { absolute: B.metaTitle },
  description: B.metaDescription,
  openGraph: {
    title: B.ogTitle,
    description: B.ogDescription,
  },
};

const categoryLabels: Record<string, string> = {
  "how-to": "How-To",
  local: "Local",
  cost: "Cost Guide",
  materials: "Materials",
  maintenance: "Maintenance",
};

// All categories use ember on tar black per DESIGN.md — no rainbow.

export default function BlogPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: B.jsonLdName,
    description: B.jsonLdDescription,
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
                <li className="text-gray-200">{B.breadcrumbLabel}</li>
              </ol>
            </nav>
            <h1
              className="text-white mb-3"
              style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "0.02em" }}
            >
              {B.headingPrefix}{" "}
              <span style={{ color: "var(--ember)" }}>{B.headingHighlight}</span>
            </h1>
            <p className="text-gray-300 max-w-2xl text-base leading-relaxed">
              {B.blurb}
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
                    className="text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-md"
                    style={{
                      backgroundColor: "var(--dark)",
                      color: "var(--ember)",
                    }}
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
              {B.ctaHeading}
            </p>
            <p className="text-gray-400 text-sm mb-5">
              {B.ctaSub}
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
