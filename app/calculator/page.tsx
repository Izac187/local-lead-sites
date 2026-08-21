import type { Metadata } from "next";
import Calculator from "@/components/Calculator";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: siteConfig.pages.calculator.metaTitle,
  description: siteConfig.pages.calculator.metaDescription,
  alternates: { canonical: `https://${siteConfig.domain}/calculator` },
};

export default function CalculatorPage() {
  return (
    <div className="px-4 py-12 min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2" style={{ fontFamily: "var(--font-barlow-condensed), sans-serif" }}>
            {siteConfig.pages.calculator.heading}
          </h1>
          <p className="text-gray-600 text-sm">
            {siteConfig.pages.calculator.subcopy}
          </p>
        </div>
        <Calculator />
      </div>
    </div>
  );
}
