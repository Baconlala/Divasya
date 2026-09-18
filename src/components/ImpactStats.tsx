const STATS = [
  { value: "₹3.2 Cr+", label: "Raised for verified causes" },
  { value: "58", label: "Temples & trusts supported" },
  { value: "12,400+", label: "Donors across India & abroad" },
  { value: "96%", label: "Of funds reach the ground" },
];

export default function ImpactStats() {
  return (
    <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:divide-x sm:divide-cream/15">
      {STATS.map((stat) => (
        <div key={stat.label} className="px-2 text-center">
          <p className="font-display text-3xl font-extrabold tabular-nums text-gold-light sm:text-4xl">
            {stat.value}
          </p>
          <p className="mt-1.5 text-sm text-cream/70">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
