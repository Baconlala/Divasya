"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import Logo from "@/components/Logo";

const NAV_LINKS = [
  { href: "/campaigns", label: "Campaigns" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 bg-cream/90 backdrop-blur-md transition-shadow duration-300",
        scrolled ? "shadow-[0_4px_20px_-6px_rgba(74,13,24,0.15)]" : "shadow-none"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Logo size={38} />
          <span className="font-display text-xl font-bold tracking-tight text-maroon">
            Divasya
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-sm font-medium text-charcoal/75 transition hover:text-terracotta"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-terracotta transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/campaigns"
            className="rounded-full bg-linear-to-r from-terracotta to-terracotta-dark px-5 py-2.5 text-sm font-semibold text-cream shadow-[0_8px_20px_-6px_rgba(193,82,47,0.55)] transition hover:shadow-[0_10px_26px_-6px_rgba(193,82,47,0.7)] hover:-translate-y-0.5"
          >
            Donate Now
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center rounded-full text-maroon md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-sand bg-cream md:hidden">
          <nav className="flex flex-col px-4 py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border-b border-sand/70 py-3 text-base font-medium text-charcoal/85 last:border-none"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/campaigns"
              className="mt-4 rounded-full bg-linear-to-r from-terracotta to-terracotta-dark px-5 py-3 text-center text-base font-semibold text-cream shadow-[0_8px_20px_-6px_rgba(193,82,47,0.55)]"
              onClick={() => setOpen(false)}
            >
              Donate Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
