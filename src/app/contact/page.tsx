import type { Metadata } from "next";
import { ExternalLink, Mail } from "lucide-react";
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
  "inline-flex min-h-11 items-center gap-3 break-all font-semibold text-signal underline underline-offset-4 hover:text-signal-hover";

export default function ContactPage() {
  return (
    <section className="pb-24 pt-16 md:pb-32 md:pt-24">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h1 className="t-page">Contact</h1>
          <p className="t-lead mt-6">
            Tell me what you need help with and I&apos;ll let you know whether it&apos;s a good
            fit.
          </p>
          <h2 className="sr-only">Direct contact</h2>
          <ul className="mt-8 border-t border-rule">
            <li className="border-b border-rule py-1">
              <a href={`mailto:${siteConfig.email}`} className={linkClass}>
                <Mail size={18} className="shrink-0 text-muted" aria-hidden="true" />
                {siteConfig.email}
              </a>
            </li>
            <li className="border-b border-rule py-1">
              <a href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <ExternalLink size={18} className="shrink-0 text-muted" aria-hidden="true" />
                GitHub
              </a>
            </li>
            {siteConfig.linkedinUrl && (
              <li className="border-b border-rule py-1">
                <a href={siteConfig.linkedinUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <ExternalLink size={18} className="shrink-0 text-muted" aria-hidden="true" />
                  LinkedIn
                </a>
              </li>
            )}
          </ul>
          <p className="mt-6 text-ink">Usually on shift 6 PM–12 AM Philippine time.</p>
          <p className="mt-1 text-muted">I aim to reply within one business day.</p>
        </div>
        <div
          id="contact-form"
          className="scroll-mt-24 rounded-block border border-rule bg-surface p-6 sm:p-8 lg:col-span-7"
        >
          <h2 className="text-s3 font-bold">Send a message</h2>
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
