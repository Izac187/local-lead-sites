import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getServiceBySlug, getAllServiceSlugs, servicePages } from "@/lib/servicePages";
import { siteConfig } from "@/lib/config";
import { cities } from "@/lib/cities";
import LeadForm from "@/components/LeadForm";

interface Props {
  params: Promise<{ service: string }>;
}

export async function generateStaticParams() {
  return getAllServiceSlugs().map((service) => ({ service }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service } = await params;
  const page = getServiceBySlug(service);
  if (!page) return {};

  return {
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    alternates: { canonical: `https://${siteConfig.domain}/services/${page.slug}` },
    openGraph: {
      title: page.h1,
      description: page.metaDescription,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { service } = await params;
  const page = getServiceBySlug(service);
  if (!page) notFound();

  const relatedPages = page.relatedServices
    .map((slug) => servicePages.find((s) => s.slug === slug))
    .filter(Boolean) as typeof servicePages;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.title,
    description: page.summary,
    provider: {
      "@type": siteConfig.schema.type,
      name: siteConfig.siteName,
      telephone: siteConfig.phone,
      url: `https://${siteConfig.domain}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.address.city,
        addressRegion: siteConfig.address.state,
        postalCode: siteConfig.address.zip,
        addressCountry: "US",
      },
    },
    areaServed: siteConfig.serviceArea.map((name) => ({
      "@type": "City",
      name,
      addressRegion: "CA",
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://${siteConfig.domain}` },
      { "@type": "ListItem", position: 2, name: "Services", item: `https://${siteConfig.domain}/services` },
      { "@type": "ListItem", position: 3, name: page.title, item: `https://${siteConfig.domain}/services/${page.slug}` },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <div className="bg-white min-h-screen">
        {/* Emergency banner */}
        {page.urgency === "emergency" && (
          <div className="text-center py-2 text-sm font-semibold text-white" style={{ backgroundColor: "var(--ember)" }}>
            Emergency Response Available — Call{" "}
            <a href={siteConfig.phoneHref} className="underline">
              {siteConfig.phone}
            </a>{" "}
            · Mon–Sat, 7am–8pm
          </div>
        )}

        {/* Hero */}
        <div style={{ backgroundColor: "var(--dark)" }} className="px-4 py-14">
          <div className="max-w-4xl mx-auto">
            <nav className="text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 flex-wrap">
                <li><Link href="/" className="hover:text-gray-300 text-gray-400">Home</Link></li>
                <li aria-hidden className="text-gray-600">/</li>
                <li><Link href="/services" className="hover:text-gray-300 text-gray-400">Services</Link></li>
                <li aria-hidden className="text-gray-600">/</li>
                <li className="text-gray-200">{page.title}</li>
              </ol>
            </nav>
            <h1
              className="text-white mb-3"
              style={{ fontFamily: "var(--font-display), sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "0.02em" }}
            >
              {page.h1}
            </h1>
            <p className="text-gray-300 mb-6 max-w-2xl text-base leading-relaxed">{page.summary}</p>
            <div className="flex flex-wrap gap-4">
              <a
                href={siteConfig.phoneHref}
                className="inline-block rounded-lg px-6 py-3 font-bold text-base"
                style={{ backgroundColor: "var(--accent-on-dark)", color: "var(--on-accent-on-dark)" }}
              >
                Call {siteConfig.phone}
              </a>
              <a
                href="#estimate"
                className="inline-block rounded-lg px-6 py-3 font-bold text-gray-900 text-base bg-white"
              >
                Free Estimate →
              </a>
            </div>
          </div>
        </div>

        <div className="px-4 py-12 max-w-4xl mx-auto">
          {/* Estimate range badge */}
          <div className="inline-flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-5 py-3 mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Typical Cost Range</span>
            <span className="font-bold text-gray-900">{page.estimateRange}</span>
            <span className="text-xs text-gray-400">· Free written estimate</span>
          </div>

          {/* Included in service */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-5">What&apos;s Included</h2>
            <ul className="space-y-3">
              {page.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-gray-700 text-sm">
                  <span
                    className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: "var(--ember)" }}
                    aria-hidden
                  >
                    ✓
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>

          {/* Service area */}
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-6 mb-10">
            <h2 className="text-base font-bold text-gray-900 mb-3">
              {page.title} — Service Coverage
            </h2>
            <p className="text-sm text-gray-600 mb-3">
              We provide {page.title.toLowerCase()} across {siteConfig.serviceArea.join(", ")} and{" "}
              {siteConfig.templates.servicePage.coverageNoteSuffix}
            </p>
            <div className="flex flex-wrap gap-2">
              {cities.map((city) => (
                <Link
                  key={city.citySlug}
                  href={`/locations/${city.citySlug}`}
                  className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600 hover:border-accent hover:text-accent-hover transition-colors"
                >
                  {city.cityName}, CA
                </Link>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {page.title} — Common Questions
            </h2>
            <div className="space-y-5">
              {page.faqs.map((faq) => (
                <div key={faq.q} className="rounded-xl border border-gray-100 p-5">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related services */}
          {relatedPages.length > 0 && (
            <div className="mb-12">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Related Services</h2>
              <div className="flex flex-wrap gap-3">
                {relatedPages.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="rounded-full border border-gray-200 px-4 py-1.5 text-sm text-gray-700 hover:border-accent hover:text-accent-hover transition-colors"
                  >
                    {s.title} →
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Lead form */}
          <div id="estimate" className="bg-gray-50 rounded-2xl p-8 max-w-lg mx-auto">
            <h2 className="text-lg font-bold text-gray-900 mb-1">
              Free {page.title} Estimate
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              A licensed contractor calls you back within 30 minutes, Mon–Sat 7am–8pm.
            </p>
            <LeadForm source={`service-${page.slug}`} />
          </div>
        </div>
      </div>
    </>
  );
}
