import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: siteConfig.pages.about.metaTitle,
  description: siteConfig.pages.about.metaDescription,
  alternates: { canonical: `https://${siteConfig.domain}/about` },
};

export default function AboutPage() {
  return (
    <div className="px-4 py-12 bg-white min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6" style={{ fontFamily: "var(--font-barlow-condensed), sans-serif" }}>
          About {siteConfig.siteName}
        </h1>

        {siteConfig.pages.about.paragraphs.map((para, i, arr) => (
          <p key={i} className={`text-gray-700 leading-relaxed ${i === arr.length - 1 ? "mb-10" : "mb-4"}`}>
            {para}
          </p>
        ))}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {siteConfig.pages.about.badges.map(({ label, detail }) => (
            <div key={label} className="rounded-xl border border-gray-100 p-5 text-center shadow-sm">
              <p className="font-bold text-gray-900 text-lg">{label}</p>
              <p className="text-gray-500 text-sm mt-1">{detail}</p>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-500">
          Serving {siteConfig.serviceArea.join(", ")} and surrounding communities.
        </p>
      </div>
    </div>
  );
}
