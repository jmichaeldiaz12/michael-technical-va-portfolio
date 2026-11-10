import { Check, Info } from "lucide-react";
import Badge from "@/components/ui/Badge";
import type { Service } from "@/types";

export default function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <article
      id={service.slug}
      className="scroll-mt-24 flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 transition hover:border-accent-600 hover:shadow-sm"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent-50 text-accent-600">
          <Icon size={22} aria-hidden="true" />
        </span>
        <Badge variant={service.level === "advanced" ? "accent" : "neutral"}>
          {service.level === "advanced" ? "Advanced" : "Core support"}
        </Badge>
      </div>
      <h3 className="mt-4 text-xl font-semibold">{service.title}</h3>
      <p className="mt-2 leading-relaxed text-slate-600">{service.summary}</p>
      <ul className="mt-4 space-y-2">
        {service.items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
            <Check size={16} className="mt-0.5 shrink-0 text-accent-600" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-auto flex items-start gap-2 border-t border-slate-100 pt-4 text-sm text-slate-500">
        <Info size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
        <span>{service.outOfScope}</span>
      </p>
    </article>
  );
}
