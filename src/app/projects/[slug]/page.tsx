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
  const statusVariant =
    project.status === "completed" ? "solid" : project.status === "planned" ? "lamp" : "outline";

  return (
    <article className="pb-24 pt-10 md:pb-32 md:pt-14">
      <Container className="max-w-4xl">
        <Link
          href="/projects"
          className="inline-flex min-h-11 items-center gap-2 font-semibold text-signal underline underline-offset-4 hover:text-signal-hover"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to projects
        </Link>
        <h1 className="t-page mt-6">{project.title}</h1>
        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
          <Badge variant={statusVariant}>{statusLabels[project.status]}</Badge>
          <p className="text-muted">
            Personal project in {project.category.toLowerCase()}
          </p>
        </div>
        <p className="t-lead mt-8">{project.description}</p>

        <div className="mt-12">
          <ProjectGallery screenshots={project.screenshots} preview={project.preview} />
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16">
          <section aria-labelledby="objectives">
            <h2 id="objectives" className="text-s3 font-bold">
              Objectives
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-muted">
              {project.objectives.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="features">
            <h2 id="features" className="text-s3 font-bold">
              {project.status === "completed" ? "Key features" : "Planned features"}
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-muted">
              {project.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-16" aria-labelledby="technologies">
          <h2 id="technologies" className="text-s3 font-bold">
            Technologies
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <li key={t}>
                <Badge>{t}</Badge>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-16 border-t border-rule pt-8">
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
            <p className="text-muted">Repository and live demo will be linked when published.</p>
          )}
        </div>
      </Container>
    </article>
  );
}
