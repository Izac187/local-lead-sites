import localFont from "next/font/local";

// Hanford HVAC Pros faces (config/sites/hanford-hvac/DESIGN.md), self-hosted latin
// subsets from Google Fonts (OFL). Variable fonts; weights used: display 600/700,
// body 400/600, mono 500.
const display = localFont({
  src: "./fonts/archivo-normal.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-display",
  display: "swap",
});

const body = localFont({
  src: "./fonts/source-sans-3-normal.woff2",
  weight: "200 900",
  style: "normal",
  variable: "--font-body",
  display: "swap",
});

const mono = localFont({
  src: "./fonts/jetbrains-mono-normal.woff2",
  weight: "100 800",
  style: "normal",
  variable: "--font-mono",
  display: "swap",
});

export const hanfordFontClassName = `${display.variable} ${body.variable} ${mono.variable}`;
