-- Migration 0001: contact form inquiries.
-- Stores messages submitted through the portfolio contact form.

-- Table. CHECK constraints mirror the Zod schema (src/lib/validation/contact.ts)
-- so the database stays safe even if the application layer is bypassed.
create table public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) between 3 and 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  subject text not null check (char_length(subject) between 3 and 150),
  message text not null check (char_length(message) between 10 and 5000),
  -- HMAC-SHA256(ip rate-limit key, secret salt); the raw IP is never stored. Used only for rate limiting.
  ip_hash text,
  created_at timestamptz not null default now()
);

-- Supports the rate-limit query: count rows per ip_hash within a recent window.
create index contact_inquiries_ip_hash_created_at_idx
  on public.contact_inquiries (ip_hash, created_at desc);

-- Row Level Security on, with NO policies: anon/authenticated roles can neither
-- read nor write. Only the server (secret / service_role key, which bypasses
-- RLS) can insert and read.
alter table public.contact_inquiries enable row level security;

-- Defense in depth: also remove table privileges from the public API roles.
revoke all on table public.contact_inquiries from anon, authenticated;

comment on table public.contact_inquiries is
  'Portfolio contact form submissions. RLS enabled with no policies; accessed only server-side via the Supabase secret key. ip_hash is a keyed HMAC-SHA256 used for rate limiting, never a raw IP.';

-- Atomic rate-limited insert. The server action calls this instead of a separate
-- count + insert, which concurrent requests could race past.
-- pg_advisory_xact_lock serializes submissions per ip_hash for the transaction, so
-- the count and insert below cannot interleave with another request from that visitor.
--
-- SECURITY INVOKER: runs with the caller's privileges and gains nothing extra.
-- Execute is revoked from public/anon/authenticated so it cannot be called
-- anonymously via /rest/v1/rpc. Only service_role (the server's secret key) may
-- execute it, and service_role bypasses RLS, so the table needs no policies.
-- search_path is pinned to '' and every object is schema-qualified.
create or replace function public.submit_contact_inquiry(p_name text, p_email text, p_subject text, p_message text, p_ip_hash text)
returns text language plpgsql security invoker set search_path = '' as $$
declare recent int; daily int;
begin
  perform pg_advisory_xact_lock(hashtext(coalesce(p_ip_hash, '')));
  select count(*) into recent from public.contact_inquiries where ip_hash = p_ip_hash and created_at > now() - interval '1 hour';
  if recent >= 3 then return 'rate_limited'; end if;
  select count(*) into daily from public.contact_inquiries where created_at > now() - interval '24 hours';
  if daily >= 100 then return 'daily_limit'; end if;
  insert into public.contact_inquiries (name, email, subject, message, ip_hash) values (p_name, p_email, p_subject, p_message, p_ip_hash);
  return 'ok';
end; $$;

revoke execute on function public.submit_contact_inquiry(text,text,text,text,text) from public, anon, authenticated;
grant execute on function public.submit_contact_inquiry(text,text,text,text,text) to service_role;
