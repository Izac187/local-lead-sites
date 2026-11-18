import localFont from "next/font/local";

// Merced Roofing Pros faces (root DESIGN.md), self-hosted so builds never depend on
// Google Fonts (next/font/google flakes on extensionless URLs, vercel/next.js#99114).
// Files: latin subsets from Google Fonts, OFL-licensed. Exposed as --font-display / --font-body.
const display = localFont({
  src: "./fonts/bebas-neue-normal.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-display",
  display: "swap",
});

const body = localFont({
  src: [
    { path: "./fonts/dm-sans-normal.woff2", weight: "100 1000", style: "normal" },
    { path: "./fonts/dm-sans-italic.woff2", weight: "100 1000", style: "italic" },
  ],
  variable: "--font-body",
  display: "swap",
});

export const mercedFontClassName = `${display.variable} ${body.variable}`;
