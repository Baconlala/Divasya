import Link from "next/link";
import { LucideIcon } from "lucide-react";

export default function AdminEmptyState({
  icon: Icon,
  title,
  actionHref,
  actionLabel,
}: {
  icon: LucideIcon;
  title: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="mt-8 flex flex-col items-center rounded-2xl bg-white p-10 text-center shadow-soft">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
        <Icon size={22} />
      </span>
      <p className="mt-4 text-sm text-charcoal/60">{title}</p>
      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="mt-4 rounded-full bg-linear-to-r from-terracotta to-terracotta-dark px-5 py-2 text-sm font-semibold text-cream shadow-[0_8px_20px_-8px_rgba(193,82,47,0.6)]"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
