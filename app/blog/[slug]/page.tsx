import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPostBySlug, getAllBlogSlugs, blogPosts } from "@/lib/blogPosts";
import { siteConfig } from "@/lib/config";
import LeadForm from "@/components/LeadForm";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: { absolute: post.metaTitle },
    description: post.metaDescription,
    alternates: { canonical: `https://${siteConfig.domain}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishDate,
      modifiedTime: post.updatedDate ?? post.publishDate,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = post.relatedPosts
    ?.map((s) => blogPosts.find((p) => p.slug === s))
    .filter(Boolean) ?? [];

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishDate,
    dateModified: post.updatedDate ?? post.publishDate,
    author: {
      "@type": "Organization",
      name: siteConfig.siteName,
      url: `https://${siteConfig.domain}`,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.siteName,
      url: `https://${siteConfig.domain}`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://${siteConfig.domain}/blog/${post.slug}`,
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://${siteConfig.domain}` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `https://${siteConfig.domain}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://${siteConfig.domain}/blog/${post.slug}` },
    ],
  };

  const faqLd = post.faqs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      }
    : null;

  const publishFormatted = new Date(post.publishDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const updatedFormatted = post.updatedDate
    ? new Date(post.updatedDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      )}

      <div className="bg-white min-h-screen">
        {/* Hero */}
        <div style={{ backgroundColor: "var(--dark)" }} className="px-4 py-14">
          <div className="max-w-3xl mx-auto">
            <nav className="text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 flex-wrap">
                <li><Link href="/" className="hover:text-gray-300 text-gray-400">Home</Link></li>
                <li aria-hidden className="text-gray-600">/</li>
                <li><Link href="/blog" className="hover:text-gray-300 text-gray-400">Blog</Link></li>
                <li aria-hidden className="text-gray-600">/</li>
                <li className="text-gray-200 truncate max-w-[200px]">{post.title}</li>
              </ol>
            </nav>
            <h1
              className="text-white mb-4 leading-tight"
              style={{ fontFamily: "var(--font-display), sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", letterSpacing: "0.02em" }}
            >
              {post.title}
            </h1>
            <div className="flex items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-gray-400 flex-wrap">
              <span className="font-semibold text-gray-200">{siteConfig.siteName}</span>
              <span style={{ color: "var(--accent-on-dark)" }} aria-hidden>•</span>
              <span>Licensed {siteConfig.licenseClass} Contractor</span>
              <span style={{ color: "var(--accent-on-dark)" }} aria-hidden>•</span>
              {updatedFormatted ? (
                <time dateTime={post.updatedDate}>Updated {updatedFormatted}</time>
              ) : (
                <time dateTime={post.publishDate}>{publishFormatted}</time>
              )}
              <span style={{ color: "var(--accent-on-dark)" }} aria-hidden>•</span>
              <span>{post.readingMinutes} min read</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-12 max-w-3xl mx-auto">
          {/* Excerpt */}
          <p className="text-lg text-gray-700 leading-relaxed mb-8 font-medium border-l-4 pl-4" style={{ borderColor: "var(--ember)" }}>
            {post.excerpt}
          </p>

          {/* Key Takeaways */}
          {post.keyTakeaways.length > 0 && (
            <aside className="blog-takeaways" aria-label="Key takeaways">
              <div className="blog-takeaways-label">Key Takeaways</div>
              <ul>
                {post.keyTakeaways.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </aside>
          )}

          {/* Body */}
          <div
            className="blog-body mb-12"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />

          {/* FAQ */}
          {post.faqs.length > 0 && (
            <div className="mb-12">
              <h2
                className="text-xl font-bold text-gray-900 mb-5"
                style={{ fontFamily: "var(--font-display), sans-serif", letterSpacing: "0.02em", fontSize: "1.5rem" }}
              >
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {post.faqs.map((faq) => (
                  <details key={faq.q} className="faq-item">
                    <summary>
                      <span>{faq.q}</span>
                    </summary>
                    <div className="faq-answer">{faq.a}</div>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <div className="mb-12">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Related Articles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedPosts.map((related) => related && (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="rounded-xl border border-gray-100 p-4 hover:border-accent-soft hover:shadow-sm transition-all group"
                  >
                    <p className="font-semibold text-sm text-gray-900 group-hover:text-accent-hover transition-colors leading-snug">
                      {related.title}
                    </p>
                    <span className="inline-block mt-2 text-xs font-semibold text-accent">Read →</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Lead form */}
          <div className="bg-gray-50 rounded-2xl p-8 max-w-lg mx-auto">
            <h2 className="text-lg font-bold text-gray-900 mb-1">
              {siteConfig.templates.blogPost.formHeading}
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              {siteConfig.templates.callbackSub}
            </p>
            <LeadForm source={`blog-${post.slug}`} />
          </div>

          {/* Back to blog */}
          <div className="mt-8 text-center">
            <Link href="/blog" className="text-sm text-gray-500 hover:text-accent-hover transition-colors">
              ← Back to all articles
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
