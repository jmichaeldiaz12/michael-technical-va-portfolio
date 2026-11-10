import type { Metadata } from "next";
import { Info } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/projects/ProjectCard";
import { getAllProjects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Personal demonstration projects covering Windows troubleshooting documentation, small office networking, web development, and no-code workflow automation.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <p className="font-mono text-xs uppercase tracking-wider text-accent-600">{"// projects"}</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">Projects</h1>
        <div
          role="note"
          className="mt-8 flex max-w-3xl items-start gap-3 rounded-xl border border-accent-600/30 bg-accent-50 p-4 text-slate-700"
        >
          <Info size={20} className="mt-0.5 shrink-0 text-accent-600" aria-hidden="true" />
          <p>
            These are personal demonstration projects built to show practical skills — not paid
            client work.
          </p>
        </div>
        <h2 className="sr-only">Demonstration projects</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 80}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
