import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/projects/ProjectCard";
import { getAllProjects } from "@/content/projects";

export default function FeaturedProjects() {
  const projects = getAllProjects();
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="projects"
            title="Demonstration projects"
            lead="Personal projects planned to show practical skills. They are not paid client work, and none are published yet."
          />
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 80}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
        <Link
          href="/projects"
          className="mt-6 inline-flex min-h-11 items-center gap-1 text-sm font-medium text-accent-600 hover:text-accent-500"
        >
          View all projects
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </Container>
    </section>
  );
}
