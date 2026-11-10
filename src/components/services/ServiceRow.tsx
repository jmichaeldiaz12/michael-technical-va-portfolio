import { Check } from "lucide-react";
import Badge from "@/components/ui/Badge";
import type { Service } from "@/types";

export default function ServiceRow({ service }: { service: Service }) {
  return (
    <article
      id={service.slug}
      className="scroll-mt-24 grid gap-6 border-t border-rule py-12 lg:grid-cols-12 lg:gap-16"
    >
      <div className="lg:col-span-4">
        <h3 className="text-s3 font-bold leading-tight">{service.title}</h3>
        {service.level === "advanced" && <Badge className="mt-3">Advanced</Badge>}
      </div>
      <div className="lg:col-span-8">
        <p className="max-w-[60ch] text-s1 text-ink">{service.summary}</p>
        <p className="mt-6 font-bold text-ink">Includes</p>
        <ul className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
          {service.items.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <Check size={18} className="mt-1 shrink-0 text-muted" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-[60ch] text-[0.9375rem] text-muted">
          Not included: {service.outOfScope}
        </p>
      </div>
    </article>
  );
}
