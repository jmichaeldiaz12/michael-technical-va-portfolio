import Container from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import ShiftBand from "@/components/ShiftBand";

export default function Hero() {
  return (
    <section className="hero-y">
      <Container>
        <p className="text-s1 text-muted">Technical virtual assistant in the Philippines</p>
        <h1 className="t-display mt-4">Technical support you can rely on.</h1>
        <p className="t-lead mt-6 max-w-xl text-body">
          Providing remote IT support, troubleshooting, networking assistance, website
          maintenance, and technical solutions for growing businesses.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/projects" variant="primary">
            View my projects
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact me
          </ButtonLink>
        </div>
        <div className="stack-lg">
          <ShiftBand />
        </div>
      </Container>
    </section>
  );
}
