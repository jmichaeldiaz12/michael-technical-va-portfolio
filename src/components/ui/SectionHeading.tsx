import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  lead?: string;
  as?: "h1" | "h2" | "h3";
  dark?: boolean;
  className?: string;
}

export default function SectionHeading({
  title,
  lead,
  as: Tag = "h2",
  dark = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <Tag className={cn("t-h2", dark && "text-white")}>{title}</Tag>
      {lead && (
        <p className={cn("mt-4 text-s1 leading-relaxed", dark ? "text-white/80" : "text-body")}>
          {lead}
        </p>
      )}
    </div>
  );
}
