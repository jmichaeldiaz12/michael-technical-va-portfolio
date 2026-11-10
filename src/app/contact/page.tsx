import type { Metadata } from "next";
import { ExternalLink, Clock, Mail } from "lucide-react";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/contact/ContactForm";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact John Michael Diaz about part-time remote IT support, Windows and network troubleshooting, website support, and workflow automation. Evening shift, Philippine time.",
  alternates: { canonical: "/contact" },
};

const linkClass =
  "inline-flex items-center gap-2 font-medium text-accent-600 hover:text-accent-500 break-all";

export default function ContactPage() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <p className="font-mono text-xs uppercase tracking-wider text-accent-600">{"// contact"}</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">Contact</h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
          Tell me what you need help with and I&apos;ll let you know whether it&apos;s a good fit.
        </p>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-semibold">Direct contact</h2>
            <ul className="mt-5 space-y-4 text-slate-700">
              <li className="flex items-start gap-3">
                <Mail size={18} className="mt-1 shrink-0 text-accent-600" aria-hidden="true" />
                <a href={`mailto:${siteConfig.email}`} className={linkClass}>
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <ExternalLink size={18} className="mt-1 shrink-0 text-accent-600" aria-hidden="true" />
                <a href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  GitHub
                </a>
              </li>
              {siteConfig.linkedinUrl && (
                <li className="flex items-start gap-3">
                  <ExternalLink size={18} className="mt-1 shrink-0 text-accent-600" aria-hidden="true" />
                  <a href={siteConfig.linkedinUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    LinkedIn
                  </a>
                </li>
              )}
              <li className="flex items-start gap-3">
                <Clock size={18} className="mt-1 shrink-0 text-accent-600" aria-hidden="true" />
                <span>
                  <span className="font-medium text-slate-900">Availability:</span>{" "}
                  {siteConfig.shift.label}, part-time.
                  <span className="mt-1 block text-sm text-slate-500">
                    I aim to reply within one business day.
                  </span>
                </span>
              </li>
            </ul>
          </div>
          <div id="contact-form" className="scroll-mt-24 rounded-xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-semibold">Send a message</h2>
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
