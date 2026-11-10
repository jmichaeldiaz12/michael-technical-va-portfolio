import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import PageHeader from "@/components/ui/PageHeader";
import Badge from "@/components/ui/Badge";
import WhyWorkWithMe from "@/components/sections/WhyWorkWithMe";
import ContactCTA from "@/components/sections/ContactCTA";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "About John Michael Diaz, a Philippines-based IT professional offering part-time remote technical support: Windows, hardware, networking, server administration, web development, and workflow automation.",
  alternates: { canonical: "/about" },
};

const capabilities = [
  "Windows installation and troubleshooting",
  "Computer hardware troubleshooting",
  "LAN networking",
  "IP addressing",
  "DNS and DHCP",
  "Remote desktop support",
  "Server administration",
  "HTML",
  "CSS",
  "JavaScript",
  "Workflow automation",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About me"
        lead={
          <>
            <p>
              I&apos;m John Michael Diaz, an IT professional based in the Philippines who is moving
              into part-time remote technical support. I want to put my hands-on technical
              knowledge to work for businesses that need dependable help.
            </p>
            <p>
              I have working knowledge across Windows, computer hardware, networking, server
              administration, web development, and workflow automation. I like solving problems
              step by step and explaining the result clearly.
            </p>
            <p>
              I&apos;m best suited to help small businesses, entrepreneurs, digital agencies, and
              international clients who need an extra pair of technical hands on a part-time basis.
            </p>
          </>
        }
      />
      {/* TODO: optional professional photo */}

      <section className="section-y">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <SectionHeading title="Technical capabilities" className="lg:col-span-5" />
          <ul className="flex flex-wrap content-start gap-2 lg:col-span-7">
            {capabilities.map((c) => (
              <li key={c}>
                <Badge>{c}</Badge>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <WhyWorkWithMe />

      <section className="section-y">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <SectionHeading title="Availability" className="lg:col-span-5" />
          <dl className="border-t border-rule lg:col-span-7">
            <div className="grid gap-1 border-b border-rule py-5 sm:grid-cols-3 sm:gap-6">
              <dt className="font-bold text-ink">Location</dt>
              <dd className="sm:col-span-2">{siteConfig.location}</dd>
            </div>
            <div className="grid gap-1 border-b border-rule py-5 sm:grid-cols-3 sm:gap-6">
              <dt className="font-bold text-ink">Shift</dt>
              <dd className="sm:col-span-2">{siteConfig.shift.label}</dd>
            </div>
            <div className="grid gap-1 border-b border-rule py-5 sm:grid-cols-3 sm:gap-6">
              <dt className="font-bold text-ink">Commitment</dt>
              <dd className="sm:col-span-2">Part-time, remote</dd>
            </div>
          </dl>
        </Container>
      </section>

      <ContactCTA />
    </>
  );
}
