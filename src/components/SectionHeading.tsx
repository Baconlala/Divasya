import clsx from "clsx";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={clsx(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left"
      )}
    >
      {eyebrow && (
        <div className={clsx("flex items-center gap-3", align === "center" && "justify-center")}>
          <span className="h-px w-8 bg-gold" />
          <span className="text-sm font-semibold uppercase tracking-[0.15em] text-terracotta">
            {eyebrow}
          </span>
          <span className="h-px w-8 bg-gold" />
        </div>
      )}
      <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-maroon sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-charcoal/70">{description}</p>
      )}
    </div>
  );
}
