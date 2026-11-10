import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { strengths } from "@/content/process";

export default function WhyWorkWithMe({ title = "How I work" }: { title?: string }) {
  return (
    <section className="bg-surface section-y">
      <Container>
        <SectionHeading title={title} lead="The commitments I bring to every support request." />
        <ul className="stack-lg grid gap-x-12 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {strengths.map((s) => (
            <li key={s.title}>
              <p>
                <strong className="font-bold text-ink">{s.title}.</strong> {s.description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
