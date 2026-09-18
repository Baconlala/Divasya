import { Quote } from "lucide-react";
import { getAllTestimonials } from "@/lib/data/testimonials";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Testimonials() {
  const testimonials = getAllTestimonials();

  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {testimonials.map((t) => (
        <figure
          key={t.id}
          className="relative flex flex-col overflow-hidden rounded-2xl bg-white p-6 shadow-soft transition hover:shadow-premium"
        >
          <Quote className="text-gold/70" size={30} strokeWidth={1.5} />
          <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-charcoal/70">
            {t.quote}
          </blockquote>
          <figcaption className="mt-5 flex items-center gap-3 border-t border-sand pt-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-maroon to-maroon-dark text-sm font-bold text-gold-light">
              {initials(t.name)}
            </span>
            <div>
              <p className="text-sm font-semibold text-maroon">{t.name}</p>
              <p className="text-xs text-charcoal/65">{t.location}</p>
            </div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
