import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import ProjectRow from "@/components/projects/ProjectRow";
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
    <>
      <PageHeader title="Projects">
        <div
          role="note"
          className="mt-8 max-w-3xl rounded-xl border border-lamp bg-lamp-soft p-5 text-ink"
        >
          These are personal demonstration projects built to show practical skills, not paid
          client work.
        </div>
      </PageHeader>
      <section className="section-pb">
        <Container>
          <h2 className="sr-only">Demonstration projects</h2>
          <ul className="border-t border-rule">
            {projects.map((p) => (
              <ProjectRow key={p.slug} project={p} />
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
