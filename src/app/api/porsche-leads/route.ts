import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type LeadPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  country?: string;
  interest?: string;
  message?: string;
  website?: string;
};

const TO_EMAIL = "Mc13Design@gmail.com";
const FROM_EMAIL = "Porsche 911 T <onboarding@resend.dev>";
const SUBJECT_PREFIX = "[Porsche 911 T] New inquiry";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;width:160px;vertical-align:top;">${label}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#111;font-size:14px;">${value || "—"}</td>
    </tr>
  `;
}

function buildEmailHtml(lead: LeadPayload): string {
  const fullName = escapeHtml(`${lead.firstName} ${lead.lastName}`.trim());
  const message = escapeHtml(lead.message ?? "").replace(/\n/g, "<br>");
  const rows = [
    renderRow("Name", fullName),
    renderRow("Email", escapeHtml(lead.email)),
    renderRow("Phone", escapeHtml(lead.phone ?? "")),
    renderRow("Country", escapeHtml(lead.country ?? "")),
    renderRow("Interest", escapeHtml(lead.interest ?? "")),
    renderRow("Message", message),
  ].join("");

  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:640px;margin:0 auto;padding:24px;">
      <h2 style="color:#C8201A;font-size:20px;margin:0 0 4px;">New inquiry — 1969 Porsche 911 T</h2>
      <p style="color:#666;font-size:13px;margin:0 0 20px;">Received ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} (Miami)</p>
      <table style="width:100%;border-collapse:collapse;border:1px solid #eee;">${rows}</table>
      <p style="color:#999;font-size:11px;margin-top:20px;">Source: mcd13-portfolio/porsche (Resend)</p>
    </div>
  `;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Server is not configured (missing RESEND_API_KEY)" },
      { status: 500 }
    );
  }

  let body: Partial<LeadPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const firstName = body.firstName?.trim() ?? "";
  const lastName = body.lastName?.trim() ?? "";
  const email = body.email?.trim() ?? "";

  if (!firstName || !lastName || !email) {
    return NextResponse.json(
      { error: "firstName, lastName and email are required" },
      { status: 400 }
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const lead: LeadPayload = {
    firstName,
    lastName,
    email,
    phone: body.phone?.trim(),
    country: body.country?.trim(),
    interest: body.interest?.trim(),
    message: body.message?.trim(),
  };

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    replyTo: email,
    subject: `${SUBJECT_PREFIX} — ${firstName} ${lastName}`,
    html: buildEmailHtml(lead),
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
