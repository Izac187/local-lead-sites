import { Bebas_Neue, DM_Sans } from "next/font/google";

// Merced Roofing Pros faces (root DESIGN.md). Exposed as --font-display / --font-body.
const display = Bebas_Neue({ subsets: ["latin"], weight: "400", variable: "--font-display" });
const body = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-body",
});

export const mercedFontClassName = `${display.variable} ${body.variable}`;
