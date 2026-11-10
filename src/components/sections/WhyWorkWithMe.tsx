import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/Reveal";
import { strengths } from "@/content/process";

export default function WhyWorkWithMe({
  eyebrow = "why work with me",
  title = "How I work",
  tone = "white",
}: {
  eyebrow?: string;
  title?: string;
  tone?: "white" | "slate";
}) {
  return (
    <section className={tone === "white" ? "bg-white py-16 sm:py-20" : "bg-slate-50 py-16 sm:py-20"}>
      <Container>
        <Reveal>
          <SectionHeading eyebrow={eyebrow} title={title} lead="The commitments I bring to every support request." />
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {strengths.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={(i % 3) * 80}>
                <div className="h-full rounded-xl border border-slate-200 bg-white p-6 transition hover:border-accent-600 hover:shadow-sm">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-50 text-accent-600">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
