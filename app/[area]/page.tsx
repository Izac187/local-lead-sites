import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LeadForm from "@/components/LeadForm";
import { siteConfig } from "@/lib/config";

const L = siteConfig.locationLanding;

export function generateStaticParams() {
  return [{ area: L.slug }];
}

export const metadata: Metadata = {
  title: { absolute: L.metaTitle },
  description: L.metaDescription,
  alternates: {
    canonical: `https://${siteConfig.domain}${L.canonicalPath}`,
  },
};

export default function AreaPage({ params }: { params: { area: string } }) {
  if (params.area !== L.slug) notFound();

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="px-4 py-12" style={{ backgroundColor: "oklch(32% 0.09 38)" }}>
        <div className="max-w-3xl mx-auto text-white">
          <h1 className="text-4xl font-extrabold mb-4 leading-tight" style={{ fontFamily: "var(--font-barlow-condensed), sans-serif" }}>
            {L.h1}
          </h1>
          <p className="text-lg mb-6" style={{ color: "oklch(85% 0.04 38)" }}>
            {L.heroSub}
          </p>
          <div className="flex flex-wrap gap-4">
            <a href={siteConfig.phoneHref} className="rounded-lg py-3 px-6 font-bold text-white" style={{ backgroundColor: "oklch(72% 0.18 65)" }}>
              ☎ {siteConfig.phone}
            </a>
            <a href="/calculator" className="rounded-lg py-3 px-6 font-bold text-white border border-white/30 hover:bg-white/10 transition-colors">
              {L.ctaEstimateLabel}
            </a>
          </div>
        </div>
      </section>

      {/* Local content */}
      <section className="px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{L.sectionHeading}</h2>
          {L.bodyParagraphs.map((para, i, arr) => (
            <p key={i} className={`text-gray-700 leading-relaxed ${i === arr.length - 1 ? "mb-8" : "mb-4"}`}>
              {para}
            </p>
          ))}

          {/* Service area grid */}
          <h2 className="text-xl font-bold text-gray-900 mb-4">{L.serviceAreaHeading}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
            {siteConfig.serviceArea.map((area) => (
              <div key={area} className="rounded-lg border border-gray-100 px-4 py-3 text-sm font-medium text-gray-700 text-center shadow-sm">
                {area}
              </div>
            ))}
          </div>

          {/* Map embed */}
          <div className="rounded-xl overflow-hidden border border-gray-200 mb-10" style={{ height: 300 }}>
            <iframe
              title={L.mapTitle}
              src={L.mapEmbedSrc}
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* FAQ */}
          <h2 className="text-xl font-bold text-gray-900 mb-6">{L.faqHeading}</h2>
          {L.faqs.map(({ q, a }) => (
            <div key={q} className="border-b border-gray-100 py-5">
              <h3 className="font-semibold text-gray-900 mb-2">{q}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
            </div>
          ))}

          {/* Lead form */}
          <div className="mt-10 bg-gray-50 rounded-2xl p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-1">{L.formHeading}</h2>
            <p className="text-sm text-gray-500 mb-5">{L.formSub}</p>
            <LeadForm source={L.leadSource} />
          </div>
        </div>
      </section>
    </div>
  );
}
