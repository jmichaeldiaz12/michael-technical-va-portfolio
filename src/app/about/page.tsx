import type { Metadata } from "next";
import { Check, MapPin, Clock, CalendarClock } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
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
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <p className="font-mono text-xs uppercase tracking-wider text-accent-600">{"// about"}</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">About Me</h1>
          {/* TODO: optional professional photo */}
          <div className="mt-8 max-w-3xl space-y-4 text-lg leading-relaxed text-slate-600">
            <p>
              I&apos;m John Michael Diaz, an IT professional based in the Philippines who is moving
              into part-time remote technical support. I want to put my hands-on technical
              knowledge to work for businesses that need dependable help.
            </p>
            <p>
              I have working knowledge across Windows, computer hardware, networking, server
              administration, web development, and workflow automation. I like solving problems step by step and
              explaining the result clearly.
            </p>
            <p>
              I&apos;m best suited to help small businesses, entrepreneurs, digital agencies, and
              international clients who need an extra pair of technical hands on a part-time basis.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="capabilities" title="Technical capabilities" />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c) => (
              <li
                key={c}
                className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 text-slate-700"
              >
                <Check size={18} className="mt-0.5 shrink-0 text-accent-600" aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <WhyWorkWithMe eyebrow="how i work" title="How I work" />

      <section className="bg-slate-50 py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="availability" title="Availability" />
          <div className="mt-10 max-w-xl rounded-xl border border-slate-200 bg-white p-6">
            <ul className="space-y-4 text-slate-700">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 shrink-0 text-accent-600" aria-hidden="true" />
                <span>
                  <span className="font-medium text-slate-900">Location:</span> {siteConfig.location}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} className="mt-1 shrink-0 text-accent-600" aria-hidden="true" />
                <span>
                  <span className="font-medium text-slate-900">Shift:</span> {siteConfig.shift.label}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CalendarClock size={18} className="mt-1 shrink-0 text-accent-600" aria-hidden="true" />
                <span>
                  <span className="font-medium text-slate-900">Commitment:</span> Part-time, remote
                </span>
              </li>
            </ul>
          </div>
        </Container>
      </section>

      <ContactCTA />
    </>
  );
}
