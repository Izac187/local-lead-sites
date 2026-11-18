"use client";

import { Fragment } from "react";
import LeadForm from "@/components/LeadForm";
import { siteConfig } from "@/lib/config";

export default function SplitHero() {
  // "dark-split" (Merced): dark section, light form card. "light-panel" (Hanford): light section, dark form panel.
  const light = siteConfig.theme.hero === "light-panel";
  const copyText = light ? "var(--text)" : "#FFFFFF";
  const copyMuted = light ? "var(--muted)" : "rgba(var(--on-dark-rgb),0.8)";
  const copyFaint = light ? "var(--muted-light)" : "rgba(var(--on-dark-rgb),0.6)";
  const bullet = light ? "var(--ember)" : "var(--accent-on-dark)";
  return (
    <section
      id="form"
      className={light ? undefined : "on-dark"}
      style={{ backgroundColor: light ? "var(--bg)" : "var(--dark)", paddingTop: light ? 72 : 80, paddingBottom: light ? 72 : 96 }}
    >
      <div
        className="container-site"
        style={{
          display: "grid",
          gap: 40,
          alignItems: "center",
        }}
      >
        {/* Responsive two-column via CSS */}
        <style>{`
          @media (min-width: 800px) {
            .hero-grid { grid-template-columns: 1fr 420px !important; }
            .hero-copy { order: 1 !important; }
            .hero-form { order: 2 !important; }
          }
        `}</style>

        <div
          className="hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 40,
            alignItems: "center",
          }}
        >
          {/* Left on desktop, below form on mobile */}
          <div className="hero-copy" style={{ order: 2, color: copyText }}>
            {/* Eyebrow */}
            <div className="eyebrow" style={{ marginBottom: 20 }}>
              <span className="eyebrow-line" />
              <span className="eyebrow-text">{siteConfig.hero.eyebrow}</span>
            </div>

            <h1
              className="font-display text-balance"
              style={{
                fontSize: "var(--display-xl)",
                color: copyText,
                lineHeight: 1,
                marginBottom: 24,
              }}
            >
              {siteConfig.hero.headlineLines.map((line) => (
                <Fragment key={line}>
                  {line}
                  <br />
                </Fragment>
              ))}
              <span style={{ color: "var(--ember)" }}>{siteConfig.hero.emberLine}</span>
            </h1>

            <p
              style={{
                fontSize: "1.125rem",
                color: copyMuted,
                lineHeight: 1.7,
                fontFamily: "var(--font-body), system-ui, sans-serif",
                marginBottom: 32,
                maxWidth: "52ch",
              }}
            >
              {siteConfig.hero.subcopy}
            </p>

            {/* Bullet points — CSS circles, no emoji */}
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
              {siteConfig.hero.bullets.map((item) => (
                <li
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    color: copyMuted,
                    fontFamily: "var(--font-body), system-ui, sans-serif",
                    fontSize: "0.9375rem",
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: bullet,
                      flexShrink: 0,
                    }}
                  />
                  {item}
                </li>
              ))}
            </ul>

            {/* Phone */}
            <a
              href={siteConfig.phoneHref}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                fontFamily: "var(--font-body), system-ui, sans-serif",
                color: copyFaint,
                fontSize: "0.875rem",
                textDecoration: "none",
              }}
            >
              Or call directly:&nbsp;
              <span
                className="font-display"
                style={{ color: copyText, fontSize: "1.5rem", letterSpacing: "0.01em" }}
              >
                {siteConfig.phone}
              </span>
            </a>
          </div>

          {/* Top on mobile, right on desktop */}
          <div
            className={light ? "hero-form on-dark hero-panel-enter" : "hero-form"}
            style={{
              backgroundColor: light ? "var(--dark)" : "var(--surface)",
              borderRadius: "var(--radius-xl)",
              boxShadow: light ? "none" : "0 24px 64px rgba(0,0,0,0.35), 0 4px 16px rgba(0,0,0,0.15)",
              padding: 32,
              order: 1,
            }}
          >
            <div className="eyebrow" style={{ marginBottom: 8 }}>
              <span className="eyebrow-line" />
              <span className="eyebrow-text">{siteConfig.hero.formEyebrow}</span>
            </div>

            <h2
              className="font-display"
              style={{ fontSize: "1.75rem", color: light ? "rgb(var(--on-dark-rgb))" : "var(--text)", marginBottom: 4 }}
            >
              {siteConfig.hero.formHeading}
            </h2>
            <p
              style={{
                color: light ? "rgba(var(--on-dark-rgb),0.72)" : "var(--muted)",
                fontSize: "0.875rem",
                fontFamily: "var(--font-body), system-ui, sans-serif",
                marginBottom: 20,
              }}
            >
              {siteConfig.hero.formSubcopy}
            </p>

            <LeadForm source="hero" onDark={light} />
          </div>
        </div>
      </div>
    </section>
  );
}
