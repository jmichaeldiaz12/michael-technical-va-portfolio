import { timingSafeEqual } from "node:crypto";
import { getSupabaseAdmin } from "@/lib/supabase/server";

/**
 * Daily keep-alive for the Supabase free plan, which pauses projects after
 * a week of low database activity. Called by the Vercel Cron in vercel.json.
 *
 * Vercel sends `Authorization: Bearer <CRON_SECRET>` automatically when the
 * CRON_SECRET env var is set. Without a valid secret this route does nothing,
 * so it can't be used by outsiders to poke the database.
 */
function isAuthorized(header: string | null): boolean {
  // Trim so a stray space or newline pasted into Vercel doesn't break auth silently.
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret || secret.length < 16 || !header) return false;
  const expected = Buffer.from(`Bearer ${secret}`);
  const received = Buffer.from(header);
  return expected.length === received.length && timingSafeEqual(expected, received);
}

export async function GET(request: Request): Promise<Response> {
  if (!isAuthorized(request.headers.get("authorization"))) {
    return Response.json({ ok: false }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    console.error("Keep-alive skipped: SUPABASE_URL and/or SUPABASE_SECRET_KEY are not set.");
    return Response.json({ ok: false }, { status: 503 });
  }

  // A cheap read that counts as database activity. Returns no row data.
  const { error } = await supabase
    .from("contact_inquiries")
    .select("id", { count: "exact", head: true });

  if (error) {
    console.error("Keep-alive query failed:", error.code, error.message);
    return Response.json({ ok: false }, { status: 502 });
  }

  return Response.json({ ok: true });
}
