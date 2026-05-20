#!/usr/bin/env node
/**
 * pSEO Content Generator
 * Reads data/cities.csv, calls Claude API for unique city intro paragraphs,
 * writes content/city-content.json. Committed back to repo by the GitHub Action.
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-... node scripts/generate-content.mjs
 *   node scripts/generate-content.mjs --dry-run   (skips API calls, uses placeholders)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const DRY_RUN = process.argv.includes("--dry-run");
const FORCE = process.argv.includes("--force"); // re-generate even if content exists

// ── Parse CSV ────────────────────────────────────────────────────────────────
function parseCsv(text) {
  const [headerLine, ...rows] = text.trim().split("\n");
  const headers = headerLine.split(",").map((h) => h.trim());
  return rows.map((row) => {
    const values = [];
    let cur = "";
    let inQuote = false;
    for (const ch of row) {
      if (ch === '"') { inQuote = !inQuote; continue; }
      if (ch === "," && !inQuote) { values.push(cur.trim()); cur = ""; continue; }
      cur += ch;
    }
    values.push(cur.trim());
    return Object.fromEntries(headers.map((h, i) => [h, values[i] ?? ""]));
  });
}

// ── Call Claude API ───────────────────────────────────────────────────────────
async function generateCityIntro(city) {
  if (DRY_RUN) {
    return `[DRY RUN] Roofing services in ${city.city_name}, CA — placeholder intro for testing the pipeline without API calls.`;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY env var is not set");

  const prompt = `You are writing SEO-optimized content for a local roofing company website targeting homeowners in ${city.city_name}, California (${city.county}).

Write exactly 2 short paragraphs (150–180 words total) for the intro section of the ${city.city_name} location page. Requirements:
- Mention the local landmark: ${city.local_landmark}
- Include this roofing tip naturally: ${city.roofing_tip}
- Reference the summer heat (${city.weather_max_temp}°F maximum) and its effect on roofing materials
- Use the city name 2–3 times naturally (do not keyword-stuff)
- Sound like a knowledgeable local contractor, not a national franchise
- No fluff phrases like "look no further" or "we've got you covered"
- Do not mention competitor names
- End with a natural transition toward getting a free estimate
- Plain text only — no markdown, no bullet points, no headings`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 400,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Claude API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  return data.content[0].text.trim();
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const csvPath = path.join(ROOT, "data", "cities.csv");
  const outputPath = path.join(ROOT, "content", "city-content.json");

  if (!fs.existsSync(csvPath)) {
    console.error("ERROR: data/cities.csv not found");
    process.exit(1);
  }

  const csvText = fs.readFileSync(csvPath, "utf-8");
  const cities = parseCsv(csvText);
  console.log(`Loaded ${cities.length} cities from CSV`);

  // Load existing content to avoid re-generating unchanged cities
  let existing = { cities: {} };
  if (fs.existsSync(outputPath)) {
    try {
      existing = JSON.parse(fs.readFileSync(outputPath, "utf-8"));
    } catch {
      existing = { cities: {} };
    }
  }

  const output = { _generated: new Date().toISOString(), _last_run: new Date().toISOString(), cities: { ...existing.cities } };

  for (const city of cities) {
    const slug = city.city_slug;
    if (!FORCE && existing.cities[slug]) {
      console.log(`  SKIP  ${city.city_name} (content exists, use --force to regenerate)`);
      continue;
    }

    process.stdout.write(`  GEN   ${city.city_name}... `);
    try {
      const intro = await generateCityIntro(city);
      output.cities[slug] = {
        intro,
        localLandmark: city.local_landmark,
        roofingTip: city.roofing_tip,
        contractorEmail: city.contractor_email,
      };
      console.log("done");
    } catch (err) {
      console.error(`FAILED: ${err.message}`);
      process.exit(1);
    }

    // Rate-limit: 500ms between calls to avoid API bursts
    if (!DRY_RUN) await new Promise((r) => setTimeout(r, 500));
  }

  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`\nWrote ${Object.keys(output.cities).length} city entries to content/city-content.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
