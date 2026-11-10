import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import Reveal from "@/components/Reveal";

const specializations = [
  "Windows support",
  "Networking",
  "Remote support",
  "Website support",
  "Workflow automation",
  "Server administration",
];

export default function Intro() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="introduction" title="Practical IT help, from a remote desk in the Philippines" />
          <div className="mt-6 max-w-3xl space-y-4 text-lg leading-relaxed text-slate-600">
            <p>
              I&apos;m John Michael Diaz, an IT professional based in the Philippines, now offering
              part-time remote technical support. I help small businesses and growing teams keep
              their computers, networks, and websites running smoothly.
            </p>
            <p>
              My approach is simple: understand the problem, fix it carefully, and explain what I
              did in plain language.
            </p>
          </div>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Specializations">
            {specializations.map((s) => (
              <li key={s}>
                <Badge variant="accent" className="px-3 py-1 text-sm">
                  {s}
                </Badge>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
