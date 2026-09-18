"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  LayoutDashboard,
  LayoutGrid,
  Newspaper,
  Image as ImageIcon,
  Quote,
  Mail,
  Settings,
  Users,
} from "lucide-react";

const NAV_GROUPS: { label: string; items: { href: string; label: string; icon: typeof LayoutDashboard; exact?: boolean }[] }[] = [
  {
    label: "Overview",
    items: [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true }],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/campaigns", label: "Campaigns", icon: LayoutGrid },
      { href: "/admin/blog", label: "Blog", icon: Newspaper },
      { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
      { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
    ],
  },
  {
    label: "Platform",
    items: [
      { href: "/admin/messages", label: "Messages", icon: Mail },
      { href: "/admin/settings", label: "Site Settings", icon: Settings },
      { href: "/admin/users", label: "Admins", icon: Users },
    ],
  },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="w-56 shrink-0 space-y-6 border-r border-sand bg-white px-3 py-6">
      {NAV_GROUPS.map((group) => (
        <div key={group.label}>
          <p className="px-3 text-xs font-semibold uppercase tracking-wide text-charcoal/40">
            {group.label}
          </p>
          <div className="mt-2 space-y-0.5">
            {group.items.map((item) => {
              const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold transition",
                    active
                      ? "bg-terracotta/10 text-terracotta"
                      : "text-charcoal/65 hover:bg-sand/60 hover:text-charcoal/85"
                  )}
                >
                  <Icon size={16} /> {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
