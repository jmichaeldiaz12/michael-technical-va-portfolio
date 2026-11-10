import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { statusLabels } from "@/lib/project-status";
import type { Project } from "@/types";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 transition hover:border-accent-600 hover:shadow-sm">
      <p className="font-mono text-xs uppercase tracking-wider text-accent-600">
        {project.category}
      </p>
      <h3 className="mt-2 text-xl font-semibold">{project.title}</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        <Badge variant="outline">Personal Project</Badge>
        <Badge variant={project.status === "completed" ? "accent" : "neutral"}>
          {statusLabels[project.status]}
        </Badge>
      </div>
      <p className="mt-4 leading-relaxed text-slate-600">{project.summary}</p>
      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
        {project.technologies.map((t) => (
          <li key={t}>
            <Badge variant="neutral">{t}</Badge>
          </li>
        ))}
      </ul>
      <Link
        href={`/projects/${project.slug}`}
        className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-medium text-accent-600 hover:text-accent-500"
      >
        View details
        <span className="sr-only"> of {project.title}</span>
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </article>
  );
}
