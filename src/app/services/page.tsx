import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import ServiceRow from "@/components/services/ServiceRow";
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
      <PageHeader
        title="Services"
        lead={
          <p>
            Remote technical support for small businesses and growing teams. Each service below
            lists what I can help with, and what falls outside it.
          </p>
        }
      >
        <div className="mt-8 max-w-3xl border-l-2 border-ink pl-5">
          <h2 className="font-bold text-ink">Service scope</h2>
          <p className="mt-2">All services are core support unless marked Advanced.</p>
          <p className="mt-1">
            All support is remote; I don&apos;t offer on-site visits. Support is provided during my
            evening shift, {siteConfig.shift.label}.
          </p>
        </div>
      </PageHeader>

      <section className="section-pb">
        <Container>
          <h2 className="sr-only">Support services</h2>
          <div className="border-b border-rule">
            {services.map((s) => (
              <ServiceRow key={s.slug} service={s} />
            ))}
          </div>
        </Container>
      </section>

      <SupportProcess />
      <ContactCTA />
    </>
  );
}
