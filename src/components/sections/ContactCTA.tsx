import Container from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { siteConfig } from "@/content/site";

export default function ContactCTA() {
  return (
    <section className="section-y">
      <Container>
        <div className="grid gap-10 rounded-block bg-ink block-pad lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="t-h2 text-white">
              Need dependable technical support during your business hours?
            </h2>
            <p className="mt-5 max-w-[60ch] text-s1 leading-relaxed text-white/85">
              My evening shift ({siteConfig.shift.label}) overlaps with daytime business hours in
              the UK and Europe and morning hours on the US East Coast. Tell me what you need and
              we can check whether the schedule works.
            </p>
          </div>
          <div className="flex flex-col items-start gap-4 lg:col-span-5 lg:items-end">
            <ButtonLink href="/contact" variant="onDark">
              Contact me
            </ButtonLink>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex min-h-11 items-center break-all text-white underline underline-offset-4 hover:text-white/80 focus-visible:outline-white"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
