import type { Metadata } from "next";
import Link from "next/link";
import { cities } from "@/lib/cities";
import { siteConfig } from "@/lib/config";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: { absolute: siteConfig.templates.locationsHub.metaTitle },
  description: siteConfig.templates.locationsHub.metaDescription,
  alternates: { canonical: `https://${siteConfig.domain}/locations` },
};

export default function LocationsPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="px-4 py-12 max-w-5xl mx-auto">
        <nav className="text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="hover:text-gray-600">Home</Link></li>
            <li aria-hidden>/</li>
            <li className="text-gray-600">Service Areas</li>
          </ol>
        </nav>

        <h1
          className="text-3xl font-extrabold text-gray-900 mb-3"
          style={{ fontFamily: "var(--font-display), sans-serif", fontSize: "2.5rem", letterSpacing: "0.02em" }}
        >
          {siteConfig.templates.locationsHub.heading}
        </h1>
        <p className="text-gray-600 mb-10 max-w-2xl">
          {siteConfig.templates.locationsHub.blurb}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {cities.map((city) => (
            <Link
              key={city.citySlug}
              href={`/locations/${city.citySlug}`}
              className="group rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md hover:border-accent-soft transition-all"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-accent mb-1">
                {city.county}
              </p>
              <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-accent-hover transition-colors">
                {city.cityName}, CA
              </h2>
              <p className="text-sm text-gray-500 mb-3">
                ZIP: {city.zipCodes.join(", ")} · ~{city.driveFromHub} from {siteConfig.city}
              </p>
              <p className="text-sm text-gray-600 line-clamp-2">{city.uniqueNote}</p>
              <span className="inline-block mt-4 text-sm font-semibold text-accent">
                View service details →
              </span>
            </Link>
          ))}
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 max-w-lg mx-auto">
          <h2 className="text-lg font-bold text-gray-900 mb-1">{siteConfig.templates.locationsHub.ctaHeading}</h2>
          <p className="text-sm text-gray-500 mb-5">
            Free estimates. A licensed contractor calls you back within 30 minutes during business hours.
          </p>
          <LeadForm source="locations-hub" />
        </div>
      </div>
    </div>
  );
}
