import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import Badge from "@/components/ui/Badge";
import { skillCategories } from "@/content/skills";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Technical skills across Windows, networking, IT support, system administration, web development (HTML, CSS, JavaScript, Next.js), and workflow automation.",
  alternates: { canonical: "/skills" },
};

export default function SkillsPage() {
  return (
    <>
      <PageHeader
        title="Skills"
        lead={<p>The tools and areas I work in, grouped by category.</p>}
      />
      <section className="section-pb">
        <Container>
          <h2 className="sr-only">Skills by category</h2>
          <dl className="border-t border-rule">
            {skillCategories.map((cat) => (
              <div
                key={cat.name}
                className="grid gap-4 border-b border-rule py-8 lg:grid-cols-12 lg:gap-16"
              >
                <dt className="text-s2 font-bold text-ink lg:col-span-4">{cat.name}</dt>
                <dd className="lg:col-span-8">
                  <ul className="flex flex-wrap gap-2">
                    {cat.skills.map((s) => (
                      <li key={s}>
                        <Badge>{s}</Badge>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 max-w-3xl text-muted">
            Skills are listed without proficiency ratings; project pages show how they&apos;re
            applied.
          </p>
          <Link
            href="/projects"
            className="mt-2 inline-flex min-h-11 items-center font-semibold text-signal underline underline-offset-4 hover:text-signal-hover"
          >
            See the projects
          </Link>
        </Container>
      </section>
    </>
  );
}
