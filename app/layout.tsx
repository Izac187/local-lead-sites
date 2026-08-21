import type { Metadata, Viewport } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Schema from "@/components/Schema";
import { siteConfig } from "@/lib/config";
import { Analytics } from "@vercel/analytics/next";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
});

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
    <html lang="en" className={`${bebasNeue.variable} ${dmSans.variable}`}>
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
