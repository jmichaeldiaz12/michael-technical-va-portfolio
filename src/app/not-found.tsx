import Container from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="section-y">
      <h1 className="t-page">Page not found</h1>
      <p className="t-lead mt-6">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <ButtonLink href="/" className="mt-8">
        Back to home
      </ButtonLink>
    </Container>
  );
}
