"use client";

import { useState, useSyncExternalStore } from "react";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

const MINUTE = 60_000;
const HOUR = 3_600_000;
const DAY = 24 * HOUR;
const TICK_HOURS = [0, 6, 12, 18, 24] as const;

type Mode = "local" | "pht";

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

/** Minutes since midnight in the given time zone. */
function minutesOfDay(ts: number, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(new Date(ts));
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0) % 24;
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return hour * 60 + minute;
}

function formatTime(ts: number, timeZone?: string): string {
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
    timeZone,
  }).format(new Date(ts));
}

function tickLabel(ts: number, hour: number, timeZone?: string): string {
  if (hour === 12) return "Noon";
  return new Intl.DateTimeFormat(undefined, { hour: "numeric", timeZone }).format(new Date(ts));
}

function zoneAbbr(ts: number): string {
  return (
    new Intl.DateTimeFormat(undefined, { timeZoneName: "short" })
      .formatToParts(new Date(ts))
      .find((p) => p.type === "timeZoneName")?.value ?? ""
  );
}

export default function ShiftBand() {
  const now = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [mode, setMode] = useState<Mode>("local");
  const { startHour, endHour, timezone } = siteConfig.shift;

  if (now === null) {
    return (
      <div className="rounded-block bg-surface p-5 shadow-[0_1px_0_var(--color-rule),0_12px_32px_-20px_rgba(21,35,63,0.25)] sm:p-8">
        <p className="text-[0.9375rem] font-semibold text-ink">
          Part-time, evenings Philippine time
        </p>
        <div aria-hidden="true" className="mt-12 h-12 rounded-button bg-paper" />
        <div aria-hidden="true" className="h-9" />
        <div aria-hidden="true" className="h-6" />
      </div>
    );
  }

  // Current shift window (today's PHT shift), as absolute timestamps.
  const phtMinutes = minutesOfDay(now, timezone);
  const phtDayStart = now - phtMinutes * MINUTE;
  const shiftStart = phtDayStart + startHour * HOUR;
  const shiftEnd = phtDayStart + endHour * HOUR;
  const phtHour = Math.floor(phtMinutes / 60);
  const onShift = phtHour >= startHour && phtHour < endHour;
  const untilStart = (startHour * 60 - phtMinutes + 1440) % 1440;

  // Axis for the chosen reference zone.
  let axisStart: number;
  let axisEnd: number;
  let tickTimes: number[];
  let tickZone: string | undefined;
  if (mode === "pht") {
    axisStart = phtDayStart;
    axisEnd = phtDayStart + DAY;
    tickTimes = TICK_HOURS.map((h) => axisStart + h * HOUR);
    tickZone = timezone;
  } else {
    const d = new Date(now);
    const y = d.getFullYear();
    const m = d.getMonth();
    const date = d.getDate();
    axisStart = new Date(y, m, date).getTime();
    axisEnd = new Date(y, m, date + 1).getTime();
    tickTimes = TICK_HOURS.map((h) => new Date(y, m, date, h).getTime());
    tickZone = undefined;
  }
  const span = axisEnd - axisStart;
  const frac = (ts: number) => (ts - axisStart) / span;

  // The shift may wrap around midnight of the axis, giving two segments.
  const segments: { left: number; width: number }[] = [];
  for (const k of [-1, 0, 1]) {
    const a = Math.max(shiftStart + k * DAY, axisStart);
    const b = Math.min(shiftEnd + k * DAY, axisEnd);
    if (b > a) segments.push({ left: frac(a), width: (b - a) / span });
  }

  const nowFrac = Math.min(Math.max(frac(now), 0), 1);
  const nowShift = nowFrac < 0.07 ? "" : nowFrac > 0.93 ? "-translate-x-full" : "-translate-x-1/2";

  const zoneTz = mode === "pht" ? timezone : undefined;
  const rangeText = `${formatTime(shiftStart, zoneTz)} to ${formatTime(shiftEnd, zoneTz)}`;
  const captionRange = `${formatTime(shiftStart, zoneTz)} – ${formatTime(shiftEnd, zoneTz)}`;
  const abbr = mode === "pht" ? "PHT" : zoneAbbr(shiftStart);
  const trackLabel =
    mode === "pht"
      ? `My shift in Philippine time runs from ${rangeText}.`
      : `My shift in your time zone runs from ${rangeText}${abbr ? ` (${abbr})` : ""}.`;

  const phtNow = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(now));

  const toggleBase =
    "inline-flex h-11 items-center rounded-full px-4 text-[0.9375rem] font-semibold transition-colors";

  return (
    <div className="rounded-block bg-surface p-5 shadow-[0_1px_0_var(--color-rule),0_12px_32px_-20px_rgba(21,35,63,0.25)] sm:p-8">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <p className="flex items-center gap-2.5 text-[1.0625rem] font-semibold text-ink">
          <span
            aria-hidden="true"
            className={cn(
              "h-3 w-3 shrink-0 rounded-full",
              onShift ? "bg-lamp ring-4 ring-lamp-soft" : "border-2 border-lamp bg-transparent",
            )}
          />
          {onShift
            ? "On shift now"
            : `Off shift, back in ${Math.floor(untilStart / 60)}h ${untilStart % 60}m`}
        </p>
        <p className="text-[0.9375rem] text-muted">It&apos;s {phtNow} in the Philippines</p>
      </div>

      <div className="relative mt-8 pt-7">
        <div
          role="img"
          aria-label={trackLabel}
          className="relative h-12 overflow-hidden rounded-button bg-paper"
        >
          {segments.map((s, i) => (
            <div
              key={i}
              className="shift-grow absolute inset-y-0 flex items-center justify-center overflow-hidden bg-lamp text-sm font-semibold text-ink"
              style={{ left: `${s.left * 100}%`, width: `${s.width * 100}%` }}
            >
              {s.width > 0.18 && <span className="hidden whitespace-nowrap sm:inline">My shift</span>}
            </div>
          ))}
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 top-0"
          style={{ left: `${nowFrac * 100}%` }}
        >
          <span
            className={cn(
              "absolute left-0 top-0 text-sm font-semibold leading-none text-ink",
              nowShift,
            )}
          >
            Now
          </span>
          <span className="absolute -bottom-0 left-0 top-5 w-0.5 -translate-x-1/2 rounded-full bg-ink" />
        </div>
      </div>

      <div aria-hidden="true" className="relative mt-2 h-6">
        {TICK_HOURS.map((h, i) => (
          <span
            key={h}
            className={cn(
              "absolute top-0 whitespace-nowrap text-sm text-muted",
              h === 0 ? "" : h === 24 ? "-translate-x-full" : "-translate-x-1/2",
            )}
            style={{ left: `${frac(tickTimes[i]) * 100}%` }}
          >
            {tickLabel(tickTimes[i], h, tickZone)}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-4 border-t border-rule pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.9375rem] text-body">
          {mode === "pht" ? "My shift in Philippine time" : "My shift in your time zone"}:{" "}
          <span className="font-semibold text-ink">
            {captionRange}
            {abbr && ` (${abbr})`}
          </span>
        </p>
        <div
          role="group"
          aria-label="Time zone for the timeline"
          className="inline-flex w-fit shrink-0 rounded-full border border-rule p-0.5"
        >
          <button
            type="button"
            aria-pressed={mode === "local"}
            onClick={() => setMode("local")}
            className={cn(
              toggleBase,
              mode === "local" ? "bg-ink text-white" : "text-ink hover:bg-paper",
            )}
          >
            Your time
          </button>
          <button
            type="button"
            aria-pressed={mode === "pht"}
            onClick={() => setMode("pht")}
            className={cn(
              toggleBase,
              mode === "pht" ? "bg-ink text-white" : "text-ink hover:bg-paper",
            )}
          >
            Philippine time
          </button>
        </div>
      </div>
    </div>
  );
}
