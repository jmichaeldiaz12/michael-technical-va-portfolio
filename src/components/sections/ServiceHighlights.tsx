import Link from "next/link";
import Container from "@/components/ui/Container";
import { services } from "@/content/services";

export default function ServiceHighlights() {
  return (
    <section className="bg-surface section-y">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <h2 className="t-h2">How I can help</h2>
            <p className="mt-4 text-body">
              Six areas of remote technical support, delivered during my evening shift.
            </p>
            <Link
              href="/services"
              className="mt-4 inline-flex min-h-11 items-center font-semibold text-signal underline underline-offset-4 hover:text-signal-hover"
            >
              See all services
            </Link>
          </div>
        </div>
        <ul className="border-t border-rule lg:col-span-8">
          {services.map((s) => (
            <li key={s.slug} className="border-b border-rule">
              <Link href={`/services#${s.slug}`} className="group block py-6">
                <h3 className="text-s2 font-bold transition-colors group-hover:text-signal">
                  {s.title}
                </h3>
                <p className="mt-1 max-w-[60ch] text-body">{s.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
