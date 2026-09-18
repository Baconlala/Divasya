import Image from "next/image";
import { notFound } from "next/navigation";
import { Info } from "lucide-react";
import Container from "@/components/Container";
import DonationForm from "@/components/DonationForm";
import { getCampaignBySlug } from "@/lib/campaigns";
import { formatINR } from "@/lib/format";
import { CAMPAIGN_TYPE_LABELS } from "@/lib/types";

export const metadata = { title: "Complete Your Donation" };

export default async function DonateCampaignPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ amount?: string; type?: string }>;
}) {
  const { slug } = await params;
  const { amount, type } = await searchParams;
  const campaign = await getCampaignBySlug(slug);
  if (!campaign || campaign.status !== "live") notFound();

  const parsedAmount = Math.floor(Number(amount));
  const donationAmount = Number.isFinite(parsedAmount) && parsedAmount > 0 ? parsedAmount : 500;
  const donationType = type === "monthly" ? "monthly" : "one_time";

  return (
    <Container className="py-10 sm:py-14">
      <div className="mx-auto flex max-w-3xl items-start gap-2.5 rounded-xl border border-gold/40 bg-gold/10 p-4 text-sm text-maroon-dark">
        <Info size={18} className="mt-0.5 shrink-0" />
        <p>
          This is a preview of the Divasya donation flow. Payment processing (Razorpay)
          is not yet connected, so no charge will be made — this is part of a later
          build phase.
        </p>
      </div>

      <div className="mx-auto mt-8 grid max-w-3xl gap-8 sm:grid-cols-[1fr_260px]">
        <div className="order-2 sm:order-1">
          <h1 className="font-display text-2xl font-bold text-maroon">
            Complete Your Donation
          </h1>
          <p className="mt-1 text-sm text-charcoal/60">
            Supporting {campaign.title}
          </p>
          <div className="mt-6">
            <DonationForm
              slug={campaign.slug}
              campaignTitle={campaign.title}
              amount={donationAmount}
              type={donationType}
            />
          </div>
        </div>

        <div className="order-1 h-fit rounded-2xl bg-white p-5 shadow-premium sm:order-2">
          <div className="relative h-32 w-full overflow-hidden rounded-xl">
            <Image src={campaign.coverImage} alt={campaign.title} fill className="object-cover" />
          </div>
          <span className="mt-3 inline-block rounded-full bg-sand px-2.5 py-1 text-xs font-semibold text-maroon">
            {CAMPAIGN_TYPE_LABELS[campaign.type]}
          </span>
          <h2 className="mt-2 font-display text-base font-bold text-maroon">
            {campaign.title}
          </h2>
          <div className="mt-4 space-y-1.5 border-t border-sand pt-4 text-sm">
            <div className="flex justify-between text-charcoal/60">
              <span>Donation type</span>
              <span className="font-semibold text-charcoal">
                {donationType === "monthly" ? "Monthly" : "One-time"}
              </span>
            </div>
            <div className="flex justify-between text-charcoal/60">
              <span>Amount</span>
              <span className="font-semibold text-charcoal">{formatINR(donationAmount)}</span>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
