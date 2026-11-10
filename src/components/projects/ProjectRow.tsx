import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { statusLabels } from "@/lib/project-status";
import type { Project } from "@/types";

export default function ProjectRow({ project }: { project: Project }) {
  const variant =
    project.status === "completed" ? "solid" : project.status === "planned" ? "lamp" : "outline";
  return (
    <li className="border-b border-rule">
      <Link
        href={`/projects/${project.slug}`}
        className="group grid gap-4 py-8 md:grid-cols-12 md:gap-8"
      >
        {project.preview && (
          <div className="md:col-span-3">
            {/* Decorative: the row text already describes the project. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.preview.src}
              alt=""
              aria-hidden="true"
              loading="lazy"
              width={1200}
              height={750}
              className="aspect-[16/10] w-full rounded-[10px] border border-rule object-cover"
            />
          </div>
        )}
        <div className={project.preview ? "md:col-span-3" : "md:col-span-4"}>
          <h3 className="text-s3 font-bold leading-tight transition-colors group-hover:text-signal">
            {project.title}
          </h3>
          <p className="mt-1 text-muted">{project.category}</p>
        </div>
        <div className={project.preview ? "md:col-span-4" : "md:col-span-5"}>
          <p className="text-body">{project.summary}</p>
          <p className="mt-3 text-[0.9375rem] text-muted">
            <span className="sr-only">Technologies: </span>
            {project.technologies.join(", ")}
          </p>
        </div>
        <div
          className={`flex flex-wrap items-center gap-x-3 gap-y-2 md:flex-col md:items-end md:gap-2 ${project.preview ? "md:col-span-2" : "md:col-span-3"}`}
        >
          <Badge variant={variant}>{statusLabels[project.status]}</Badge>
          <span className="text-[0.9375rem] text-muted">Personal project</span>
        </div>
      </Link>
    </li>
  );
}
