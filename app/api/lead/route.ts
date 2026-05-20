import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { siteConfig } from "@/lib/config";

const schema = z.object({
  name: z.string().min(2).max(100),
  phone: z
    .string()
    .min(10)
    .max(20)
    .regex(/^[+]?1?[-.\s]?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/, "Invalid phone"),
  service: z.string().max(100).optional(),
  source: z.string().max(100).optional(),
  city: z.string().max(50).optional(),
});

/** Route lead email by city slug — add contractor emails to data/cities.csv */
function routeEmail(citySlug?: string): string {
  const defaultEmail = process.env.LEAD_EMAIL ?? siteConfig.email;
  if (!citySlug) return defaultEmail;

  // City-specific overrides — can be extended as you add contractor partners
  const routing: Record<string, string> = {
    merced: process.env.LEAD_EMAIL_MERCED ?? defaultEmail,
    atwater: process.env.LEAD_EMAIL_ATWATER ?? defaultEmail,
    "los-banos": process.env.LEAD_EMAIL_LOS_BANOS ?? defaultEmail,
    livingston: process.env.LEAD_EMAIL_LIVINGSTON ?? defaultEmail,
    chowchilla: process.env.LEAD_EMAIL_CHOWCHILLA ?? defaultEmail,
    winton: process.env.LEAD_EMAIL_WINTON ?? defaultEmail,
  };

  return routing[citySlug] ?? defaultEmail;
}

/** Send Twilio SMS auto-responder to the lead's phone number */
async function sendSmsAutoresponder(phone: string, name: string): Promise<void> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;

  if (!sid || !token || !from) return; // SMS not configured — skip silently

  // Normalize: strip non-digits, add +1 country code for US numbers
  const digits = phone.replace(/\D/g, "");
  const e164 = digits.length === 10 ? `+1${digits}` : `+${digits}`;

  const body = `Hi ${name.split(" ")[0]}, thanks for contacting Merced Roofing Pros! A licensed contractor will reach out within 15 minutes (Mon–Sat, 7am–8pm). Questions? Call us at ${siteConfig.phone}.`;

  const params = new URLSearchParams({ To: e164, From: from, Body: body });

  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: "Basic " + Buffer.from(`${sid}:${token}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    }
  );

  if (!res.ok) {
    // Log but don't fail the lead submission over an SMS error
    console.error("Twilio SMS error:", await res.text());
  }
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 422 });
  }

  const { name, phone, service, source, city } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email not configured" }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const toEmail = routeEmail(city);

  const cityLabel = city
    ? city.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : null;

  const { error } = await resend.emails.send({
    from: `${siteConfig.siteName} <noreply@mercedroofingpro.com>`,
    to: [toEmail],
    subject: `New Lead: ${name}${cityLabel ? ` — ${cityLabel}` : ""} | ${siteConfig.siteName}`,
    text: [
      `Name: ${name}`,
      `Phone: ${phone}`,
      service ? `Service: ${service}` : null,
      cityLabel ? `City: ${cityLabel}` : null,
      source ? `Source: ${source}` : null,
      ``,
      `Site: ${siteConfig.domain}`,
      `Routed to: ${toEmail}`,
    ]
      .filter((v) => v !== null)
      .join("\n"),
  });

  if (error) {
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }

  // Fire-and-forget SMS — doesn't block the response
  sendSmsAutoresponder(phone, name).catch(console.error);

  return NextResponse.json({ ok: true });
}
