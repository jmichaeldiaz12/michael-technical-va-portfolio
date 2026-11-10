import Link from "next/link";
import Container from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import NavLinks from "./NavLinks";
import MobileNav from "./MobileNav";
import { navItems } from "@/content/navigation";
import { siteConfig } from "@/content/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <Container className="relative flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-md bg-navy-950 font-mono text-xs font-medium text-white"
          >
            JMD
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-semibold text-slate-900">{siteConfig.name}</span>
            <span className="hidden font-mono text-[11px] text-slate-500 min-[400px]:block">
              technical_va
            </span>
          </span>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          <NavLinks items={navItems} />
          <ButtonLink href="/contact" size="sm">
            Hire Me
          </ButtonLink>
        </div>
        <MobileNav items={navItems} />
      </Container>
    </header>
  );
}
