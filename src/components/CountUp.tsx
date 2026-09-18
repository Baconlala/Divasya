"use client";

import { useEffect, useRef, useState } from "react";

function parseValue(raw: string) {
  const match = raw.match(/^([^\d]*)([\d,]+\.?\d*)(.*)$/);
  if (!match) return null;

  const [, prefix, numberPart, suffix] = match;
  const decimals = numberPart.includes(".") ? numberPart.split(".")[1].length : 0;
  const target = Number(numberPart.replace(/,/g, ""));
  if (!Number.isFinite(target)) return null;

  return { prefix, suffix, target, decimals, hasCommas: numberPart.includes(",") };
}

function formatNumber(value: number, decimals: number, hasCommas: boolean) {
  const fixed = value.toFixed(decimals);
  if (!hasCommas) return fixed;
  const [whole, frac] = fixed.split(".");
  const withCommas = Number(whole).toLocaleString("en-IN");
  return frac ? `${withCommas}.${frac}` : withCommas;
}

export default function CountUp({ value, duration = 1400 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const parsed = parseValue(value);
    const el = ref.current;
    if (!parsed || !el) return;

    setDisplay(`${parsed.prefix}${formatNumber(0, parsed.decimals, parsed.hasCommas)}${parsed.suffix}`);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        function tick(now: number) {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = parsed!.target * eased;
          setDisplay(
            `${parsed!.prefix}${formatNumber(current, parsed!.decimals, parsed!.hasCommas)}${parsed!.suffix}`
          );
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={ref}>{display}</span>;
}
