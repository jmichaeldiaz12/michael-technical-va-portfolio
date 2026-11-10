"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import type { NavItem } from "@/types";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { isActive } from "./NavLinks";

export default function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const [prevPath, setPrevPath] = useState<string | null>(null);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelId = "mobile-nav-panel";

  // Close on route change (derived state during render)
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    if (open) setOpen(false);
  }

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, close]);

  return (
    <div className="md:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => (open ? close() : setOpen(true))}
        className="flex h-11 w-11 items-center justify-center rounded-button text-ink hover:bg-paper"
      >
        {open ? <X aria-hidden="true" size={24} /> : <Menu aria-hidden="true" size={24} />}
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-rule bg-surface"
      >
        <nav aria-label="Mobile" className="gutter-x pb-6 pt-2">
          <ul className="flex flex-col">
            {items.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-h-14 items-center border-b border-rule text-s2 font-semibold",
                      active
                        ? "text-ink underline decoration-signal decoration-2 underline-offset-8"
                        : "text-muted hover:text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ButtonLink href="/contact" onClick={() => setOpen(false)} className="mt-4 w-full">
            Hire me
          </ButtonLink>
        </nav>
      </div>
    </div>
  );
}
