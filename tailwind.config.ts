import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Site accent (per-site CSS vars from app/layout.tsx). Replaces hardcoded orange-* utilities.
        accent: "var(--ember)",
        "accent-hover": "var(--ember-hover)",
        "accent-soft": "rgb(var(--accent-rgb) / 0.3)",
      },
    },
  },
  plugins: [],
};
export default config;
