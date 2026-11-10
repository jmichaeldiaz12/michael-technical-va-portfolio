import { Mail } from "lucide-react";
import Container from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { siteConfig } from "@/content/site";

export default function ContactCTA() {
  return (
    <section className="bg-navy-950 py-16 sm:py-20">
      <Container className="max-w-4xl text-center">
        <h2 className="text-3xl font-bold tracking-tight !text-white sm:text-4xl">
          Need dependable technical support during your business hours?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
          My evening shift ({siteConfig.shift.label}) overlaps with daytime business hours in
          the UK and Europe and morning hours on the US East Coast. Tell me what you need and we can check whether the
          schedule works.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/contact" variant="primary">
            Contact Me
          </ButtonLink>
          <ButtonLink href={`mailto:${siteConfig.email}`} variant="ghostDark">
            <Mail size={18} className="mr-2" aria-hidden="true" />
            {siteConfig.email}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
