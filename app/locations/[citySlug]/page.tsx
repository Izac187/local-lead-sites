import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { cities, getCityBySlug, getAllCitySlugs } from "@/lib/cities";
import { servicePages } from "@/lib/servicePages";
import { siteConfig } from "@/lib/config";
import LeadForm from "@/components/LeadForm";

interface Props {
  params: Promise<{ citySlug: string }>;
}

export async function generateStaticParams() {
  return getAllCitySlugs().map((citySlug) => ({ citySlug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};

  return {
    title: `Roofing Contractor ${city.cityName}, CA | Free Estimates | ${siteConfig.siteName}`,
    description: `Licensed roofing contractor in ${city.cityName}, CA. Roof replacement, repair, and emergency leak response. Serving ${city.zipCodes.join(", ")}. Call (209) 259-0978.`,
    openGraph: {
      title: `Roofing Contractor in ${city.cityName}, CA`,
      description: `Expert roof repair and replacement in ${city.cityName}, CA. Same-day emergency response. Licensed & insured. Free estimates.`,
    },
  };
}

export default async function LocationPage({ params }: Props) {
  const { citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    "@id": `https://${siteConfig.domain}/locations/${city.citySlug}/#business`,
    name: siteConfig.siteName,
    telephone: siteConfig.phone,
    url: `https://${siteConfig.domain}`,
    areaServed: {
      "@type": "City",
      name: city.cityName,
      addressRegion: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: city.latitude,
      longitude: city.longitude,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: "US",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "07:00",
        closes: "20:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Roofing Services in ${city.cityName}`,
      itemListElement: servicePages.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title },
      })),
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://${siteConfig.domain}` },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: `https://${siteConfig.domain}/locations` },
      { "@type": "ListItem", position: 3, name: city.cityName, item: `https://${siteConfig.domain}/locations/${city.citySlug}` },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Do you offer roofing services in ${city.cityName}, CA?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. Merced Roofing Pros serves ${city.cityName} (ZIP ${city.zipCodes.join(", ")}) for roof replacement, repair, emergency leak response, and gutter services. Mon–Sat, 7am–8pm.`,
        },
      },
      {
        "@type": "Question",
        name: `How quickly can you respond to a roof emergency in ${city.cityName}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `For active leaks in ${city.cityName}, we target same-day response during business hours (Mon–Sat, 7am–8pm). ${city.cityName} is approximately ${city.driveFromMerced} from our Merced base.`,
        },
      },
      {
        "@type": "Question",
        name: `What roofing materials do you recommend for ${city.cityName}'s climate?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${city.uniqueNote} We recommend Class A fire-rated, cool-roof-certified materials that meet California Title 24 energy standards for Central Valley homes.`,
        },
      },
    ],
  };

  const nearbyOtherCities = cities.filter(
    (c) => c.citySlug !== city.citySlug && c.citySlug !== "merced"
  ).slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <div className="bg-white min-h-screen">
        {/* Hero */}
        <div style={{ backgroundColor: "var(--dark)" }} className="px-4 py-14">
          <div className="max-w-4xl mx-auto">
            <nav className="text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 flex-wrap">
                <li><Link href="/" className="hover:text-gray-300 text-gray-400">Home</Link></li>
                <li aria-hidden className="text-gray-600">/</li>
                <li><Link href="/locations" className="hover:text-gray-300 text-gray-400">Service Areas</Link></li>
                <li aria-hidden className="text-gray-600">/</li>
                <li className="text-gray-200">{city.cityName}</li>
              </ol>
            </nav>
            <h1
              className="text-white mb-3"
              style={{ fontFamily: "var(--font-bebas-neue), sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "0.02em" }}
            >
              Professional Roofing Contractor in{" "}
              <span style={{ color: "var(--ember)" }}>{city.cityName}, CA</span>
            </h1>
            <p className="text-gray-300 mb-6 max-w-2xl text-base leading-relaxed">
              Serving {city.cityName} (ZIP: {city.zipCodes.join(", ")}) and {city.county}. Licensed C-39
              roofing contractor. Free estimates — same-day emergency response, Mon–Sat 7am–8pm.
            </p>
            <a
              href={siteConfig.phoneHref}
              className="inline-block rounded-lg px-6 py-3 font-bold text-white text-base"
              style={{ backgroundColor: "var(--ember)" }}
            >
              Call (209) 259-0978 — Free Estimate
            </a>
          </div>
        </div>

        <div className="px-4 py-12 max-w-4xl mx-auto">
          {/* Climate + local context */}
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-6 mb-10">
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              Roofing in {city.cityName} — What You Need to Know
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">{city.uniqueNote}</p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Summer highs in {city.cityName} regularly reach {city.weatherMaxTemp}°F — accelerating
              shingle blistering, granule loss, and underlayment degradation. We specify materials that
              meet California Title 24 energy efficiency standards and carry Class A fire ratings.
            </p>
          </div>

          {/* Neighborhoods */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Areas We Serve in {city.cityName}
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Our crews regularly work in and around:
            </p>
            <ul className="flex flex-wrap gap-3">
              {city.localPoiMarkers.map((poi) => (
                <li
                  key={poi}
                  className="rounded-full border border-gray-200 px-4 py-1.5 text-sm text-gray-700"
                >
                  {poi}
                </li>
              ))}
            </ul>
          </div>

          {/* Services grid */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Roofing Services in {city.cityName}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {servicePages.map((s, i) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-orange-200 transition-all"
                >
                  <span
                    className="block text-2xl font-extrabold mb-1"
                    style={{ fontFamily: "var(--font-bebas-neue), sans-serif", color: "var(--ember)" }}
                  >
                    0{i + 1}
                  </span>
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm text-gray-500">{s.summary.substring(0, 100)}…</p>
                  <span className="inline-block mt-3 text-xs font-semibold text-orange-500">
                    Learn more →
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Frequently Asked — {city.cityName} Roofing
            </h2>
            <div className="space-y-4">
              {faqLd.mainEntity.map((item) => (
                <div key={item.name} className="rounded-xl border border-gray-100 p-5">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Nearby cities */}
          {nearbyOtherCities.length > 0 && (
            <div className="mb-12">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Also Serving Nearby Cities</h2>
              <div className="flex flex-wrap gap-3">
                {nearbyOtherCities.map((c) => (
                  <Link
                    key={c.citySlug}
                    href={`/locations/${c.citySlug}`}
                    className="rounded-full border border-gray-200 px-4 py-1.5 text-sm text-gray-700 hover:border-orange-300 hover:text-orange-600 transition-colors"
                  >
                    {c.cityName}, CA →
                  </Link>
                ))}
                <Link
                  href="/locations"
                  className="rounded-full border border-gray-200 px-4 py-1.5 text-sm text-gray-700 hover:border-orange-300 hover:text-orange-600 transition-colors"
                >
                  All service areas →
                </Link>
              </div>
            </div>
          )}

          {/* Lead form */}
          <div className="bg-gray-50 rounded-2xl p-8 max-w-lg mx-auto">
            <h2 className="text-lg font-bold text-gray-900 mb-1">
              Get a Free Estimate in {city.cityName}
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              A licensed roofing specialist will call you back within 30 minutes during business hours
              (Mon–Sat, 7am–8pm).
            </p>
            <LeadForm source={`location-${city.citySlug}`} />
          </div>
        </div>
      </div>
    </>
  );
}
