import type { Metadata } from "next";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import { siteConfig } from "@/lib/config";
import { servicePages } from "@/lib/servicePages";

export const metadata: Metadata = {
  title: { absolute: siteConfig.pages.services.metaTitle },
  description: siteConfig.pages.services.metaDescription,
  alternates: { canonical: `https://${siteConfig.domain}/services` },
};

export default function ServicesPage() {
  return (
    <div className="px-4 py-12 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <nav className="text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="hover:text-gray-600">Home</Link></li>
            <li aria-hidden>/</li>
            <li className="text-gray-600">Services</li>
          </ol>
        </nav>

        <h1
          className="text-gray-900 mb-2"
          style={{ fontFamily: "var(--font-display), sans-serif", fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "0.02em" }}
        >
          {siteConfig.pages.services.heading}
        </h1>
        <p className="text-gray-600 mb-10">
          {siteConfig.pages.services.subheadPrefix} Serving {siteConfig.city} and {siteConfig.serviceArea.slice(1).join(", ")}.
          Mon–Sat, 7am–8pm.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {servicePages.map((s, i) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md hover:border-accent-soft transition-all"
            >
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-2">
                <span style={{ color: "var(--ember)", fontFamily: "var(--font-display), sans-serif", fontSize: "1.5rem" }}>
                  0{i + 1}
                </span>{" "}
                {s.title}
                {s.urgency === "emergency" && (
                  <span className="ml-auto text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: "var(--ember)" }}>
                    Emergency
                  </span>
                )}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-2">{s.summary.substring(0, 120)}…</p>
              <p className="text-xs text-gray-400 mb-3">Est. cost: {s.estimateRange}</p>
              <span className="text-sm font-semibold text-accent group-hover:underline">
                Learn more →
              </span>
            </Link>
          ))}
        </div>

        {/* Location cross-links */}
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-6 mb-10">
          <h2 className="text-base font-bold text-gray-900 mb-3">Service Coverage</h2>
          <p className="text-sm text-gray-600 mb-4">
            {siteConfig.pages.services.coverageNote}
          </p>
          <div className="flex flex-wrap gap-2">
            {siteConfig.serviceArea.map((city) => (
              <Link
                key={city}
                href={`/locations/${city.toLowerCase().replace(/\s+/g, "-")}`}
                className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600 hover:border-accent hover:text-accent-hover transition-colors"
              >
                {city}, CA
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 max-w-lg mx-auto">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Ready to get started?</h2>
          <p className="text-sm text-gray-500 mb-5">Free written estimates. Callbacks within 30 minutes, Mon–Sat 7am–8pm.</p>
          <LeadForm source="services" />
        </div>
      </div>
    </div>
  );
}
