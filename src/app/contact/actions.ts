"use server";

import { createHmac } from "node:crypto";
import { headers } from "next/headers";
import { after } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/content/site";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import {
  contactSchema,
  type ContactFormState,
  type ContactInput,
} from "@/lib/validation/contact";

const SUCCESS_MESSAGE =
  "Thanks — your message has been sent. I'll reply by email, usually within one business day.";
const MIN_FILL_MS = 3000;
const MIN_SALT_LENGTH = 32;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function field(formData: FormData, key: string): string {
  const v = formData.get(key);
  return typeof v === "string" ? v : "";
}

async function sendNotification(input: ContactInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_NOTIFICATION_EMAIL;
  if (!apiKey || !to) return;

  try {
    const resend = new Resend(apiKey);
    const safeSubject = input.subject.replace(/[\r\n]+/g, " ");
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>",
      to,
      replyTo: input.email,
      subject: `New inquiry: ${safeSubject}`,
      text: `Name: ${input.name}\nEmail: ${input.email}\nSubject: ${safeSubject}\n\n${input.message}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(input.name)}<br><strong>Email:</strong> ${escapeHtml(input.email)}<br><strong>Subject:</strong> ${escapeHtml(safeSubject)}</p><p style="white-space:pre-wrap">${escapeHtml(input.message)}</p>`,
    });
    if (error) console.error("Contact notification email failed:", error.name, error.message);
  } catch (err) {
    console.error(
      "Contact notification email threw:",
      err instanceof Error ? err.message : "unknown error",
    );
  }
}

function firstEntry(value: string | null): string {
  return value?.split(",")[0]?.trim() ?? "";
}

/**
 * Returns the string used as the rate-limit identity for an IP address.
 * IPv4 is used as-is; IPv6 is reduced to its /64 prefix (first 4 groups, `::` expanded)
 * so one visitor can't dodge the limit by rotating addresses inside their /64.
 */
function ipRateLimitKey(ip: string): string {
  const addr = ip.split("%")[0].replace(/^\[|\]$/g, "");
  if (!addr.includes(":")) return addr;

  // IPv4-mapped (::ffff:1.2.3.4): rate-limit on the embedded IPv4 address.
  const mapped = /^::ffff:(\d{1,3}(?:\.\d{1,3}){3})$/i.exec(addr);
  if (mapped) return mapped[1];

  // Convert an embedded dotted IPv4 tail into two hex groups.
  let text = addr;
  const v4 = /(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(text);
  if (v4) {
    const [a, b, c, d] = v4.slice(1).map(Number);
    text =
      text.slice(0, v4.index) +
      ((a << 8) | b).toString(16) +
      ":" +
      ((c << 8) | d).toString(16);
  }

  const halves = text.split("::");
  if (halves.length > 2) return addr; // malformed; use as-is
  const head = halves[0] ? halves[0].split(":") : [];
  const tail = halves.length === 2 && halves[1] ? halves[1].split(":") : [];
  const missing = halves.length === 2 ? 8 - head.length - tail.length : 0;
  if (missing < 0) return addr;
  const groups = [...head, ...Array<string>(missing).fill("0"), ...tail];
  if (groups.length !== 8) return addr;
  return groups
    .slice(0, 4)
    .map((g) => g.toLowerCase().replace(/^0+(?=.)/, ""))
    .join(":");
}

function getClientIp(h: Headers): string {
  return (
    firstEntry(h.get("x-vercel-forwarded-for")) ||
    firstEntry(h.get("x-forwarded-for")) ||
    h.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

export async function submitContact(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const success: ContactFormState = { status: "success", message: SUCCESS_MESSAGE };

  // 1. Honeypot: silently drop bots.
  if (field(formData, "company_website").trim() !== "") return success;

  // 2. Fill timer. A missing/invalid value can mean a real visitor with JavaScript off,
  //    so tell them instead of pretending it worked. A valid but too-fast fill is a bot: drop silently.
  const elapsedRaw = field(formData, "form_elapsed_ms").trim();
  const elapsed = Number(elapsedRaw);
  if (elapsedRaw === "" || !Number.isFinite(elapsed) || elapsed < 0) {
    return {
      status: "error",
      message: `Your message could not be sent. Please make sure JavaScript is enabled and try again, or email me directly at ${siteConfig.email}.`,
      values: {
        name: field(formData, "name"),
        email: field(formData, "email"),
        subject: field(formData, "subject"),
        message: field(formData, "message"),
      },
    };
  }
  if (elapsed < MIN_FILL_MS) return success;

  // 3. Validation (authoritative).
  const raw = {
    name: field(formData, "name"),
    email: field(formData, "email"),
    subject: field(formData, "subject"),
    message: field(formData, "message"),
  };
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: NonNullable<ContactFormState["fieldErrors"]> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof ContactInput | undefined;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors,
      values: raw,
    };
  }
  const input = parsed.data;

  // 4. Config check.
  const supabase = getSupabaseAdmin();
  const salt = process.env.RATE_LIMIT_SALT;
  if (!supabase || !salt || salt.length < MIN_SALT_LENGTH) {
    console.error(
      !supabase
        ? "Contact form unavailable: SUPABASE_URL and/or SUPABASE_SECRET_KEY are not set."
        : `Contact form unavailable: RATE_LIMIT_SALT must be set to at least ${MIN_SALT_LENGTH} characters.`,
    );
    return {
      status: "error",
      message: `The contact form is temporarily unavailable. Please email me directly at ${siteConfig.email}.`,
      values: input,
    };
  }

  // 5. Atomic rate limit + insert via RPC, keyed on an HMAC of the client IP.
  const ipKey = ipRateLimitKey(getClientIp(await headers()));
  const ipHash = createHmac("sha256", salt).update(ipKey).digest("hex");
  const { data: result, error: rpcError } = await supabase.rpc("submit_contact_inquiry", {
    p_name: input.name,
    p_email: input.email,
    p_subject: input.subject,
    p_message: input.message,
    p_ip_hash: ipHash,
  });
  if (rpcError) {
    console.error("Contact submit RPC failed:", rpcError.code, rpcError.message);
    return {
      status: "error",
      message: `Something went wrong sending your message. Please try again or email me directly at ${siteConfig.email}.`,
      values: input,
    };
  }
  if (result === "rate_limited") {
    return {
      status: "error",
      message:
        "You've sent several messages recently. Please try again in an hour or email me directly.",
      values: input,
    };
  }
  if (result === "daily_limit") {
    return {
      status: "error",
      message: `The contact form is receiving unusually high traffic. Please email me directly at ${siteConfig.email}.`,
      values: input,
    };
  }
  if (result !== "ok") {
    console.error("Contact submit RPC returned an unexpected result:", String(result));
    return {
      status: "error",
      message: `Something went wrong sending your message. Please try again or email me directly at ${siteConfig.email}.`,
      values: input,
    };
  }

  // 6. Optional email notification after the response is sent; never fails the submission.
  after(() => sendNotification(input));

  return success;
}
