"use client";

import { useId, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { formatINR } from "@/lib/format";

const PRESET_AMOUNTS = [500, 1100, 2100, 5100];

export default function DonateWidget({ slug }: { slug: string }) {
  const customAmountId = useId();
  const [type, setType] = useState<"one_time" | "monthly">("one_time");
  const [amount, setAmount] = useState<number>(1100);
  const [custom, setCustom] = useState("");

  const parsedCustom = Math.floor(Number(custom));
  const effectiveAmount = custom
    ? Number.isFinite(parsedCustom) && parsedCustom > 0
      ? parsedCustom
      : 0
    : amount;
  const isValid = effectiveAmount > 0;
  const href = `/donate/${slug}?amount=${effectiveAmount}&type=${type}`;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-premium">
      <div className="flex rounded-full bg-sand p-1 text-sm font-semibold">
        <button
          type="button"
          onClick={() => setType("one_time")}
          className={clsx(
            "flex-1 rounded-full py-2 transition-all duration-200",
            type === "one_time"
              ? "bg-linear-to-r from-terracotta to-terracotta-dark text-cream shadow-[0_4px_12px_-4px_rgba(193,82,47,0.6)]"
              : "text-charcoal/70"
          )}
        >
          One-Time
        </button>
        <button
          type="button"
          onClick={() => setType("monthly")}
          className={clsx(
            "flex-1 rounded-full py-2 transition-all duration-200",
            type === "monthly"
              ? "bg-linear-to-r from-terracotta to-terracotta-dark text-cream shadow-[0_4px_12px_-4px_rgba(193,82,47,0.6)]"
              : "text-charcoal/70"
          )}
        >
          Monthly
        </button>
      </div>

      <p className="mt-5 text-sm font-semibold text-maroon">Choose an amount</p>
      <div className="mt-3 grid grid-cols-2 gap-2.5">
        {PRESET_AMOUNTS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => {
              setAmount(preset);
              setCustom("");
            }}
            className={clsx(
              "rounded-xl border py-2.5 text-sm font-semibold transition-all duration-200",
              !custom && amount === preset
                ? "border-terracotta bg-terracotta/10 text-terracotta shadow-[0_0_0_1px_rgba(193,82,47,0.3)]"
                : "border-sand text-charcoal/65 hover:border-terracotta/50"
            )}
          >
            {formatINR(preset)}
          </button>
        ))}
      </div>

      <div className="mt-3">
        <label className="sr-only" htmlFor={customAmountId}>
          Custom amount
        </label>
        <div
          className={clsx(
            "flex items-center rounded-xl border px-3 transition focus-within:border-terracotta",
            custom && !isValid ? "border-red-300" : "border-sand"
          )}
        >
          <span className="text-sm font-semibold text-charcoal/65">₹</span>
          <input
            id={customAmountId}
            type="number"
            min={1}
            step={1}
            inputMode="numeric"
            placeholder="Enter custom amount"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            className="w-full bg-transparent px-2 py-2.5 text-sm outline-none"
          />
        </div>
        {custom && !isValid && (
          <p className="mt-1.5 text-xs text-red-500">Enter an amount greater than ₹0</p>
        )}
      </div>

      {isValid ? (
        <Link
          href={href}
          className="mt-5 block w-full rounded-full bg-linear-to-r from-terracotta to-terracotta-dark py-3.5 text-center text-sm font-bold text-cream shadow-[0_14px_28px_-10px_rgba(193,82,47,0.65)] transition hover:shadow-[0_16px_32px_-8px_rgba(193,82,47,0.8)] hover:-translate-y-0.5"
        >
          Donate {formatINR(effectiveAmount)} {type === "monthly" ? "/ month" : ""}
        </Link>
      ) : (
        <button
          type="button"
          disabled
          className="mt-5 block w-full cursor-not-allowed rounded-full bg-charcoal/15 py-3.5 text-center text-sm font-bold text-charcoal/40"
        >
          Enter an amount to continue
        </button>
      )}
      <p className="mt-3 text-center text-xs text-charcoal/65">
        Secure checkout · 80G tax receipt issued instantly
      </p>
    </div>
  );
}
