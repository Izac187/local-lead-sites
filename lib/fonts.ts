import type { SiteTheme } from "@/lib/siteConfig.types";
import { mercedFontClassName } from "@/config/sites/merced/fonts";
import { hanfordFontClassName } from "@/config/sites/hanford-hvac/fonts";

/** next/font loaders must be module-level, so each site owns a fonts.ts and we pick by key. */
export function fontClassName(key: SiteTheme["fonts"]): string {
  switch (key) {
    case "hanford-hvac":
      return hanfordFontClassName;
    case "merced":
    default:
      return mercedFontClassName;
  }
}

/** Theme tokens → CSS custom properties, applied to <html> so globals.css defaults are overridden per site. */
export function themeCssVars(t: SiteTheme): Record<string, string> {
  const c = t.colors;
  return {
    "--bg": c.bg, "--surface": c.surface, "--dark": c.dark, "--dark-mid": c.darkMid,
    "--ember": c.accent, "--ember-hover": c.accentHover,
    "--accent-on-dark": c.accentOnDark, "--accent-on-dark-hover": c.accentOnDarkHover, "--on-accent-on-dark": c.onAccentOnDark,
    "--gold": c.gold, "--heat": c.heat ?? c.gold, "--figure-on-dark": c.figureOnDark ?? "#FFFFFF", "--heat-ink": c.heatInk ?? "#1A1208", "--text": c.text, "--muted": c.muted, "--muted-light": c.mutedLight, "--border": c.border,
    "--on-dark-rgb": c.onDarkRgb, "--accent-rgb": c.accentRgb,
    "--radius-sm": t.radius.sm, "--radius-md": t.radius.md, "--radius-lg": t.radius.lg, "--radius-xl": t.radius.xl,
    "--display-weight": String(t.display.weight), "--display-tracking": t.display.tracking,
    "--display-xl": t.display.xl, "--display-lg": t.display.lg,
    "--eyebrow-transform": t.eyebrow.transform, "--eyebrow-tracking": t.eyebrow.tracking,
    "--footer-heading-tracking": t.eyebrow.transform === "uppercase" ? "0.1em" : "0",
  };
}
