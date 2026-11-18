import { Archivo, Source_Sans_3, JetBrains_Mono } from "next/font/google";

// Hanford HVAC Pros faces (config/sites/hanford-hvac/DESIGN.md).
const display = Archivo({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-display" });
const body = Source_Sans_3({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["500"], variable: "--font-mono" });

export const hanfordFontClassName = `${display.variable} ${body.variable} ${mono.variable}`;
