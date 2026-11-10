import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";

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
    <section className="section-y">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <h2 className="t-h2 lg:col-span-5">Practical IT help from the Philippines</h2>
        <div className="lg:col-span-7">
          <div className="max-w-[68ch] space-y-4">
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
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Specializations">
            {specializations.map((s) => (
              <li key={s}>
                <Badge>{s}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
