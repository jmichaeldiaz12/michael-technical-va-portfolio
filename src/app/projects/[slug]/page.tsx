import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import ProjectGallery from "@/components/projects/ProjectGallery";
import { getAllProjects, getProjectBySlug } from "@/content/projects";
import { statusLabels } from "@/lib/project-status";

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: `${project.summary} Personal demonstration project (${statusLabels[project.status].toLowerCase()}).`,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const hasLinks = Boolean(project.githubUrl || project.liveUrl);

  return (
    <article className="bg-white py-16 sm:py-20">
      <Container className="max-w-4xl">
        <Link
          href="/projects"
          className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-accent-600 hover:text-accent-500"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to projects
        </Link>
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge variant="outline">Personal Project</Badge>
          <Badge variant={project.status === "completed" ? "accent" : "neutral"}>
            {statusLabels[project.status]}
          </Badge>
        </div>
        <p className="mt-4 font-mono text-xs uppercase tracking-wider text-accent-600">
          {project.category}
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">{project.title}</h1>
        <p className="mt-6 text-lg leading-relaxed text-slate-600">{project.description}</p>

        <div className="mt-10">
          <ProjectGallery screenshots={project.screenshots} />
        </div>

        <section className="mt-12" aria-labelledby="objectives">
          <h2 id="objectives" className="text-2xl font-bold">
            Objectives
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600 marker:text-accent-600">
            {project.objectives.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </section>

        <section className="mt-12" aria-labelledby="features">
          <h2 id="features" className="text-2xl font-bold">
            {project.status === "completed" ? "Key features" : "Planned features"}
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600 marker:text-accent-600">
            {project.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </section>

        <section className="mt-12" aria-labelledby="technologies">
          <h2 id="technologies" className="text-2xl font-bold">
            Technologies
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <li key={t}>
                <Badge variant="neutral" className="px-3 py-1 text-sm">
                  {t}
                </Badge>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-12 border-t border-slate-200 pt-8">
          {hasLinks ? (
            <div className="flex flex-col gap-3 sm:flex-row">
              {project.githubUrl && (
                <ButtonLink href={project.githubUrl} target="_blank" rel="noopener noreferrer" variant="primary">
                  GitHub
                  <ExternalLink size={16} className="ml-2" aria-hidden="true" />
                </ButtonLink>
              )}
              {project.liveUrl && (
                <ButtonLink href={project.liveUrl} target="_blank" rel="noopener noreferrer" variant="secondary">
                  Live demo
                  <ExternalLink size={16} className="ml-2" aria-hidden="true" />
                </ButtonLink>
              )}
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              Repository and live demo will be linked when published.
            </p>
          )}
        </div>
      </Container>
    </article>
  );
}
