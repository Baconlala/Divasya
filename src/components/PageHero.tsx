import { ReactNode } from "react";
import Container from "@/components/Container";

export default function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-maroon to-maroon-dark py-16 sm:py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #E6C874 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="pointer-events-none absolute -top-24 right-[-10%] h-80 w-80 rounded-full bg-gold/25 blur-3xl" />

      <Container className="relative">
        <span className="text-sm font-semibold uppercase tracking-[0.15em] text-gold-light">
          {eyebrow}
        </span>
        <h1 className="mt-3 max-w-2xl font-display text-3xl font-bold leading-tight text-cream sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-cream/80">
            {description}
          </p>
        )}
        {children}
      </Container>
    </section>
  );
}
