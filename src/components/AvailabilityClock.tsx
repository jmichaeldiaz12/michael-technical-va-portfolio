"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { Clock } from "lucide-react";
import { siteConfig } from "@/content/site";

const MINUTE = 60_000;

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 30_000);
  return () => clearInterval(id);
}

function getSnapshot(): number {
  return Math.floor(Date.now() / MINUTE) * MINUTE;
}

function getServerSnapshot(): number | null {
  return null;
}

function phtParts(ts: number) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: siteConfig.shift.timezone,
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(new Date(ts));
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0) % 24;
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return { hour, minute };
}

export default function AvailabilityClock() {
  const now = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const { startHour, endHour, timezone, label } = siteConfig.shift;

  let body: ReactNode = (
    <div className="mt-5 space-y-3" aria-hidden="true">
      <div className="h-9 w-40 rounded bg-white/10" />
      <div className="h-5 w-28 rounded bg-white/10" />
      <div className="h-4 w-full rounded bg-white/10" />
    </div>
  );

  if (now !== null) {
    const { hour, minute } = phtParts(now);
    const minutesOfDay = hour * 60 + minute;
    const online = hour >= startHour && hour < endHour;
    const untilStart = (startHour * 60 - minutesOfDay + 1440) % 1440;
    const startTs = online ? now - (minutesOfDay - startHour * 60) * MINUTE : now + untilStart * MINUTE;
    const endTs = startTs + (endHour - startHour) * 60 * MINUTE;

    const timeText = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(now));
    const localFmt = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" });
    const tzAbbr =
      new Intl.DateTimeFormat(undefined, { timeZoneName: "short" })
        .formatToParts(new Date(startTs))
        .find((p) => p.type === "timeZoneName")?.value ?? "";

    body = (
      <>
        <p className="mt-5 text-xs text-slate-400">Current time in the Philippines</p>
        <time dateTime={new Date(now).toISOString()} className="font-mono text-3xl font-semibold text-white">
          {timeText} <span className="text-base font-normal text-slate-400">PHT</span>
        </time>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
              online ? "bg-emerald-500/15 text-emerald-300" : "bg-white/10 text-slate-300"
            }`}
          >
            <span
              aria-hidden="true"
              className={`h-2 w-2 rounded-full ${online ? "bg-emerald-400" : "bg-slate-400"}`}
            />
            {online ? "Online now" : "Offline"}
          </span>
          {!online && (
            <span className="text-sm text-slate-300">
              Next shift starts in {Math.floor(untilStart / 60)}h {untilStart % 60}m
            </span>
          )}
        </div>
        <dl className="mt-5 space-y-2 border-t border-white/10 pt-4 text-sm">
          <div className="flex flex-wrap justify-between gap-x-4">
            <dt className="text-slate-400">Shift</dt>
            <dd className="text-slate-200">{label}</dd>
          </div>
          <div className="flex flex-wrap justify-between gap-x-4">
            <dt className="text-slate-400">In your time zone</dt>
            <dd className="text-slate-200">
              {localFmt.format(new Date(startTs))} – {localFmt.format(new Date(endTs))}
              {tzAbbr && ` (${tzAbbr})`}
            </dd>
          </div>
        </dl>
      </>
    );
  }

  return (
    <div className="rounded-xl border border-white/10 bg-navy-900 p-6">
      <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent-400">
        <Clock size={14} aria-hidden="true" />
        Availability
      </div>
      {body}
    </div>
  );
}
