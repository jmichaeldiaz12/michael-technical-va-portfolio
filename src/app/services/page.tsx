import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import Reveal from "@/components/Reveal";
import ServiceCard from "@/components/services/ServiceCard";
import SupportProcess from "@/components/sections/SupportProcess";
import ContactCTA from "@/components/sections/ContactCTA";
import { services } from "@/content/services";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Remote IT support services: Windows support, remote technical support, network troubleshooting, website support, workflow automation, and server administration assistance.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <p className="font-mono text-xs uppercase tracking-wider text-accent-600">{"// services"}</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">Services</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            Remote technical support for small businesses and growing teams. Each service below
            lists what I can help with, and what falls outside it.
          </p>
          <div className="mt-10 max-w-3xl rounded-xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-lg font-semibold">Service scope</h2>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
              <li>
                <Badge variant="neutral">Core support</Badge> covers everyday tasks I handle
                routinely.
              </li>
              <li>
                <Badge variant="accent">Advanced</Badge> marks more involved work.
              </li>
              <li>All support is remote; I don&apos;t offer on-site visits.</li>
              <li>Support is provided during my evening shift, {siteConfig.shift.label}.</li>
            </ul>
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 pb-16 pt-4 sm:pb-20">
        <Container>
          <SectionHeading as="h2" eyebrow="what i offer" title="Support services" className="pt-12" />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 80}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <SupportProcess />
      <ContactCTA />
    </>
  );
}
