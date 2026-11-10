import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  dark?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  as: Tag = "h2",
  dark = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p
          className={cn(
            "font-mono text-xs uppercase tracking-wider",
            dark ? "text-accent-400" : "text-accent-600",
          )}
        >
          {`// ${eyebrow}`}
        </p>
      )}
      <Tag
        className={cn(
          "mt-2 text-3xl font-bold tracking-tight sm:text-4xl",
          dark && "!text-white",
        )}
      >
        {title}
      </Tag>
      {lead && (
        <p className={cn("mt-4 text-lg leading-relaxed", dark ? "text-slate-300" : "text-slate-600")}>
          {lead}
        </p>
      )}
    </div>
  );
}
