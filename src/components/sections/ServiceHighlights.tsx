import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/Reveal";
import { services } from "@/content/services";

export default function ServiceHighlights() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="services"
            title="How I can help"
            lead="Six areas of remote technical support, delivered during my evening shift."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.slug} delay={(i % 3) * 80}>
                <Link
                  href={`/services#${s.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 transition hover:border-accent-600 hover:shadow-sm"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-50 text-accent-600">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.summary}</p>
                  <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-accent-600">
                    Learn more
                    <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
