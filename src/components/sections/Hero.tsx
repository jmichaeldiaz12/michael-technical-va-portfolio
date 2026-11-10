import Container from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import AvailabilityClock from "@/components/AvailabilityClock";
import { siteConfig } from "@/content/site";

export default function Hero() {
  return (
    <section className="bg-navy-950 py-16 sm:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-accent-400">
            Technical Virtual Assistant · Philippines
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight !text-white sm:text-5xl lg:text-6xl">
            Technical Support You Can Rely On.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            Providing remote IT support, troubleshooting, networking assistance, website
            maintenance, and technical solutions for growing businesses.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/projects" variant="primary">
              View My Projects
            </ButtonLink>
            <ButtonLink href="/contact" variant="ghostDark">
              Contact Me
            </ButtonLink>
          </div>
          <p className="mt-6 font-mono text-xs text-slate-400">{siteConfig.availability}</p>
        </div>
        <div className="lg:justify-self-end lg:w-full lg:max-w-sm">
          <AvailabilityClock />
        </div>
      </Container>
    </section>
  );
}
