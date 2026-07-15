"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/config";

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid var(--border)" }}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "18px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: 12,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "1rem",
            color: "var(--text)",
          }}
        >
          {q}
        </span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--ember)"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{
            flexShrink: 0,
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 200ms ease",
          }}
          aria-hidden="true"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
      {open && (
        <p
          style={{
            fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
            fontSize: "0.9375rem",
            color: "var(--muted)",
            lineHeight: 1.7,
            paddingBottom: 18,
          }}
        >
          {a}
        </p>
      )}
    </div>
  );
}

export default function FAQSection() {
  return (
    <>
      {siteConfig.faqs.map(({ q, a }) => (
        <FAQItem key={q} q={q} a={a} />
      ))}
    </>
  );
}
