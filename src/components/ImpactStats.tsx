import { getSiteSettings } from "@/lib/settings";
import CountUp from "@/components/CountUp";

export default async function ImpactStats() {
  const settings = await getSiteSettings();

  const stats = [
    { value: settings.statRaised, label: "Raised for verified causes" },
    { value: settings.statTemples, label: "Temples & trusts supported" },
    { value: settings.statDonors, label: "Donors across India & abroad" },
    { value: settings.statFundsPercent, label: "Of funds reach the ground" },
  ];

  return (
    <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:divide-x sm:divide-cream/15">
      {stats.map((stat) => (
        <div key={stat.label} className="px-2 text-center">
          <p className="font-display text-3xl font-extrabold tabular-nums text-gold-light sm:text-4xl">
            <CountUp value={stat.value} />
          </p>
          <p className="mt-1.5 text-sm text-cream/70">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
