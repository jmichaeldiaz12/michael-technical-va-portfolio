import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { supportProcess } from "@/content/process";

export default function SupportProcess({
  title = "How a support request works",
}: {
  title?: string;
}) {
  return (
    <section className="section-y">
      <Container>
        <SectionHeading title={title} lead="Four clear steps from first message to written summary." />
        <ol className="stack-lg grid gap-12 lg:grid-cols-4 lg:gap-8">
          {supportProcess.map((step, i) => (
            <li key={step.title}>
              <span aria-hidden="true" className="block text-s5 font-extrabold leading-none text-ink/35">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="mt-4 border-t-2 border-ink pt-5">
                <h3 className="text-s2 font-bold">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-2 text-body">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
