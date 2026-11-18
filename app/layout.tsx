import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Schema from "@/components/Schema";
import { siteConfig } from "@/lib/config";
import { fontClassName, themeCssVars } from "@/lib/fonts";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.siteName} | ${siteConfig.metaSuffix}`,
    template: `%s | ${siteConfig.siteName}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(`https://${siteConfig.domain}`),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.siteName,
  },
  robots: { index: true, follow: true },
  verification: {
    google: siteConfig.googleVerification,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={fontClassName(siteConfig.theme.fonts)}
      style={themeCssVars(siteConfig.theme) as React.CSSProperties}
    >
      <head>
        <Schema />
      </head>
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
