"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { formatINR } from "@/lib/format";

export default function DonationForm({
  slug,
  campaignTitle,
  amount,
  type,
}: {
  slug: string;
  campaignTitle: string;
  amount: number;
  type: "one_time" | "monthly";
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [wantsReceipt, setWantsReceipt] = useState(true);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({
      campaign: campaignTitle,
      slug,
      amount: String(amount),
      type,
      name,
    });
    router.push(`/donate/thank-you?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="text-sm font-semibold text-maroon">
          Full Name
        </label>
        <input
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="As it should appear on your receipt"
          className="mt-1.5 w-full rounded-xl border border-sand px-4 py-2.5 text-sm outline-none transition focus:border-terracotta focus:ring-4 focus:ring-terracotta/10"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="text-sm font-semibold text-maroon">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-1.5 w-full rounded-xl border border-sand px-4 py-2.5 text-sm outline-none transition focus:border-terracotta focus:ring-4 focus:ring-terracotta/10"
          />
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-semibold text-maroon">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 98765 43210"
            className="mt-1.5 w-full rounded-xl border border-sand px-4 py-2.5 text-sm outline-none transition focus:border-terracotta focus:ring-4 focus:ring-terracotta/10"
          />
        </div>
      </div>

      <label className="flex items-start gap-2.5 text-sm text-charcoal/70">
        <input
          type="checkbox"
          checked={wantsReceipt}
          onChange={(e) => setWantsReceipt(e.target.checked)}
          className="mt-0.5"
        />
        Email me an 80G tax receipt for this donation
      </label>

      <button
        type="submit"
        className="w-full rounded-full bg-linear-to-r from-terracotta to-terracotta-dark py-3.5 text-center text-base font-bold text-cream shadow-[0_14px_28px_-10px_rgba(193,82,47,0.65)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-8px_rgba(193,82,47,0.8)]"
      >
        Continue to Payment — {formatINR(amount)}
        {type === "monthly" ? " / month" : ""}
      </button>

      <p className="flex items-center justify-center gap-1.5 text-xs text-charcoal/65">
        <ShieldCheck size={14} /> Payments are processed securely via Razorpay
      </p>
    </form>
  );
}
