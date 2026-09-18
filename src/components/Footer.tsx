import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "@/components/Logo";

const CAUSE_LINKS = [
  { href: "/campaigns?type=temple", label: "Temple Restoration" },
  { href: "/campaigns?type=seva", label: "Sadhu Seva" },
  { href: "/campaigns?type=gurukul", label: "Gurukul Education" },
  { href: "/campaigns?type=animal_welfare", label: "Animal Welfare" },
];

const SITE_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export default function Footer() {
  return (
    <footer className="relative bg-maroon-dark text-cream/90">
      <div className="h-px w-full bg-linear-to-r from-transparent via-gold/60 to-transparent" />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <Logo size={36} />
              <span className="font-display text-xl font-bold text-cream">Divasya</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-cream/70">
              A transparent home for temple restoration, sadhu seva, gurukul education,
              and animal welfare — every rupee tracked from donation to impact.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold tracking-wide text-gold-light uppercase">
              Causes
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {CAUSE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-cream/75 transition hover:text-gold-light">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold tracking-wide text-gold-light uppercase">
              Divasya
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SITE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-cream/75 transition hover:text-gold-light">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold tracking-wide text-gold-light uppercase">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-cream/75">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold-light" />
                <span>Divasya Trust, Sector 12, New Delhi, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="shrink-0 text-gold-light" />
                <span>hello@divasya.org</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="shrink-0 text-gold-light" />
                <span>+91 98765 43210</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-cream/15 pt-6 text-xs text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Divasya. All donations are eligible for tax benefits under applicable law.</p>
          <div className="flex gap-5">
            {LEGAL_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="transition hover:text-gold-light">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
