import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "outline" | "lamp" | "solid";

const variants: Record<BadgeVariant, string> = {
  outline: "border border-rule bg-transparent text-ink",
  lamp: "border border-lamp-soft bg-lamp-soft text-ink",
  solid: "border border-ink bg-ink text-white",
};

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export default function Badge({ children, variant = "outline", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium leading-snug",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
