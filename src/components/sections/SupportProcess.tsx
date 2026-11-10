import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/Reveal";
import { supportProcess } from "@/content/process";

export default function SupportProcess({
  title = "How a support request works",
  tone = "white",
}: {
  title?: string;
  tone?: "white" | "slate";
}) {
  return (
    <section className={tone === "white" ? "bg-white py-16 sm:py-20" : "bg-slate-50 py-16 sm:py-20"}>
      <Container>
        <Reveal>
          <SectionHeading eyebrow="process" title={title} lead="Four clear steps from first message to written summary." />
        </Reveal>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {supportProcess.map((step, i) => (
            <li key={step.title}>
              <Reveal delay={i * 80} className="h-full">
                <div className="h-full rounded-xl border border-slate-200 bg-white p-6">
                  <span className="font-mono text-sm text-accent-600" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold">
                    <span className="sr-only">Step {i + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
