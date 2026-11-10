import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectRow from "@/components/projects/ProjectRow";
import { getAllProjects } from "@/content/projects";

export default function FeaturedProjects() {
  const projects = getAllProjects();
  return (
    <section className="section-y">
      <Container>
        <SectionHeading
          title="Featured projects"
          lead="These are planned personal demo projects, not paid client work, and none are published yet."
        />
        <ul className="stack-lg border-t border-rule">
          {projects.map((p) => (
            <ProjectRow key={p.slug} project={p} />
          ))}
        </ul>
        <Link
          href="/projects"
          className="mt-6 inline-flex min-h-11 items-center font-semibold text-signal underline underline-offset-4 hover:text-signal-hover"
        >
          View all projects
        </Link>
      </Container>
    </section>
  );
}
