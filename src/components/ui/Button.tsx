import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "onDark";
type Size = "sm" | "md";

const variants: Record<Variant, string> = {
  primary: "bg-signal text-white hover:bg-signal-hover",
  secondary: "border-[1.5px] border-ink/20 bg-transparent text-ink hover:border-ink/50",
  onDark: "bg-white text-ink hover:bg-paper focus-visible:outline-white",
};

const sizes: Record<Size, string> = {
  sm: "h-11 px-4 text-[0.9375rem]",
  md: "h-12 px-5 text-base",
};

interface ButtonLinkProps extends ComponentProps<typeof Link> {
  variant?: Variant;
  size?: Size;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center rounded-button font-semibold transition-colors",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
