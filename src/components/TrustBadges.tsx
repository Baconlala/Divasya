import { ShieldCheck, ReceiptText, Eye } from "lucide-react";

const BADGES = [
  {
    icon: ShieldCheck,
    title: "Verified Causes",
    description: "Every temple and trust is verified for registration and KYC before listing.",
  },
  {
    icon: ReceiptText,
    title: "Tax Benefits",
    description: "80G receipts issued instantly for eligible donations, delivered to your inbox.",
  },
  {
    icon: Eye,
    title: "Full Transparency",
    description: "Track exactly how funds are used with public utilization updates per campaign.",
  },
];

export default function TrustBadges() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {BADGES.map(({ icon: Icon, title, description }) => (
        <div
          key={title}
          className="flex items-start gap-3.5 rounded-2xl bg-white/95 p-5 shadow-premium backdrop-blur-md"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-terracotta-light to-terracotta text-cream shadow-[0_6px_16px_-4px_rgba(193,82,47,0.5)]">
            <Icon size={20} />
          </span>
          <div>
            <p className="font-display font-bold text-maroon">{title}</p>
            <p className="mt-0.5 text-sm leading-snug text-charcoal/60">{description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
