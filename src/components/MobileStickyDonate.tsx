"use client";

import { useEffect, useRef, useState } from "react";
import { Heart } from "lucide-react";

export default function MobileStickyDonate({
  targetId,
  campaignTitle,
}: {
  targetId: string;
  campaignTitle: string;
}) {
  const [visible, setVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), {
      rootMargin: "0px 0px -20% 0px",
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [targetId]);

  return (
    <div
      ref={sentinelRef}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-sand bg-cream/95 px-4 py-3 shadow-[0_-8px_24px_-8px_rgba(74,13,24,0.25)] backdrop-blur-sm transition-transform duration-300 lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center gap-3">
        <p className="min-w-0 flex-1 truncate text-sm font-semibold text-maroon">
          Support {campaignTitle}
        </p>
        <a
          href={`#${targetId}`}
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-linear-to-r from-terracotta to-terracotta-dark px-5 py-2.5 text-sm font-bold text-cream shadow-[0_10px_24px_-10px_rgba(193,82,47,0.6)]"
        >
          <Heart size={14} /> Donate
        </a>
      </div>
    </div>
  );
}
