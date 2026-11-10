import Link from "next/link";
import { cacheLife } from "next/cache";
import { Clock, Mail } from "lucide-react";
import Container from "@/components/ui/Container";
import { navItems } from "@/content/navigation";
import { siteConfig } from "@/content/site";

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

const linkClass =
  "inline-flex min-h-8 items-center gap-2 text-sm text-slate-300 transition-colors hover:text-white";

export default async function Footer() {
  "use cache";
  cacheLife("days");
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-950 text-slate-300">
      <Container className="grid gap-10 py-12 md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold text-white">{siteConfig.name}</p>
          <p className="mt-1 text-sm text-slate-300">{siteConfig.title}</p>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">{siteConfig.tagline}</p>
        </div>
        <nav aria-label="Footer">
          <h2 className="font-mono text-xs uppercase tracking-wider text-slate-400">Navigation</h2>
          <ul className="mt-4 space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="font-mono text-xs uppercase tracking-wider text-slate-400">Get in touch</h2>
          <ul className="mt-4 space-y-1">
            <li>
              <a href={`mailto:${siteConfig.email}`} className={linkClass}>
                <Mail aria-hidden="true" size={16} />
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <GithubIcon />
                GitHub
              </a>
            </li>
            {siteConfig.linkedinUrl !== null && (
              <li>
                <a href={siteConfig.linkedinUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <LinkedinIcon />
                  LinkedIn
                </a>
              </li>
            )}
          </ul>
          <p className="mt-4 inline-flex items-center gap-2 text-sm text-slate-300">
            <Clock aria-hidden="true" size={16} />
            Available {siteConfig.shift.label}
          </p>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>Based in the Philippines · Working remotely worldwide</p>
        </Container>
      </div>
    </footer>
  );
}
