import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Reveal from "@/components/Reveal";
import { skillCategories } from "@/content/skills";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Technical skills across Windows, networking, IT support, system administration, web development (HTML, CSS, JavaScript, Next.js), and workflow automation.",
  alternates: { canonical: "/skills" },
};

export default function SkillsPage() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <p className="font-mono text-xs uppercase tracking-wider text-accent-600">{"// skills"}</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">Skills</h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
          The tools and areas I work in, grouped by category.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <Reveal key={cat.name} delay={(i % 3) * 80}>
                <div className="h-full rounded-xl border border-slate-200 bg-white p-6 transition hover:border-accent-600 hover:shadow-sm">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent-50 text-accent-600">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <h2 className="mt-4 text-xl font-semibold">{cat.name}</h2>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {cat.skills.map((s) => (
                      <li key={s}>
                        <Badge variant="neutral">{s}</Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
        <p className="mt-10 max-w-3xl text-sm text-slate-500">
          Skills are listed without proficiency ratings; project pages show how they&apos;re applied.
        </p>
        <Link
          href="/projects"
          className="mt-2 inline-flex min-h-11 items-center gap-1 text-sm font-medium text-accent-600 hover:text-accent-500"
        >
          See the projects
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </Container>
    </section>
  );
}
