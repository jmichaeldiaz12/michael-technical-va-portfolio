import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "neutral" | "accent" | "outline" | "dark";

const variants: Record<BadgeVariant, string> = {
  neutral: "bg-slate-100 text-slate-700",
  accent: "bg-accent-50 text-accent-600",
  outline: "border border-slate-300 text-slate-700",
  dark: "bg-white/10 text-slate-200 border border-white/15",
};

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export default function Badge({ children, variant = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
