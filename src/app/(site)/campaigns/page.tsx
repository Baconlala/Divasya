import Link from "next/link";
import clsx from "clsx";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import CampaignCard from "@/components/CampaignCard";
import Reveal from "@/components/Reveal";
import { getCampaignsByType } from "@/lib/campaigns";
import { CAMPAIGN_TYPE_LABELS, CampaignType } from "@/lib/types";

const FILTERS: { value: "all" | CampaignType; label: string }[] = [
  { value: "all", label: "All Campaigns" },
  { value: "temple", label: CAMPAIGN_TYPE_LABELS.temple },
  { value: "seva", label: CAMPAIGN_TYPE_LABELS.seva },
  { value: "gurukul", label: CAMPAIGN_TYPE_LABELS.gurukul },
  { value: "animal_welfare", label: CAMPAIGN_TYPE_LABELS.animal_welfare },
];

export const metadata = {
  title: "Campaigns",
};

export default async function CampaignsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const activeType = type && FILTERS.some((f) => f.value === type) ? type : "all";
  const campaigns = await getCampaignsByType(activeType);

  return (
    <>
      <PageHero
        eyebrow="Campaigns"
        title="Every cause here is verified and actively raising funds"
        description="Filter by cause type to find the campaign closest to your heart, then choose a one-time or monthly contribution."
      />

      <section className="py-12 sm:py-16">
        <Container>
          <div className="flex flex-wrap gap-2.5">
            {FILTERS.map((f) => (
              <Link
                key={f.value}
                href={f.value === "all" ? "/campaigns" : `/campaigns?type=${f.value}`}
                className={clsx(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200",
                  activeType === f.value
                    ? "border-transparent bg-linear-to-r from-terracotta to-terracotta-dark text-cream shadow-[0_8px_20px_-8px_rgba(193,82,47,0.6)]"
                    : "border-sand text-charcoal/65 hover:border-terracotta/50"
                )}
              >
                {f.label}
              </Link>
            ))}
          </div>

          {campaigns.length > 0 ? (
            <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {campaigns.map((c, i) => (
                <Reveal key={c.id} delay={(i % 3) * 80}>
                  <CampaignCard campaign={c} />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="mt-12 text-center text-charcoal/60">
              No active campaigns in this category right now — check back soon.
            </p>
          )}
        </Container>
      </section>
    </>
  );
}
