import Link from "next/link";
import Container from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import NavLinks from "./NavLinks";
import MobileNav from "./MobileNav";
import { navItems } from "@/content/navigation";
import { siteConfig } from "@/content/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-surface">
      <Container className="relative flex h-16 items-center justify-between">
        <Link href="/" className="flex min-h-11 items-baseline gap-3 self-center py-2">
          <span className="text-s1 font-bold tracking-tight text-ink">{siteConfig.name}</span>
          <span className="hidden text-sm text-muted md:inline">Technical VA</span>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          <NavLinks items={navItems} />
          <ButtonLink href="/contact" size="sm">
            Hire me
          </ButtonLink>
        </div>
        <MobileNav items={navItems} />
      </Container>
    </header>
  );
}
