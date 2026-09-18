import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Campaign, CAMPAIGN_TYPE_LABELS } from "@/lib/types";
import { formatINR, progressPercent } from "@/lib/format";
import ProgressBar from "@/components/ProgressBar";

export default function CampaignCard({ campaign }: { campaign: Campaign }) {
  const percent = progressPercent(campaign.raisedAmount, campaign.goalAmount);

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-premium-lg">
      <Link href={`/campaigns/${campaign.slug}`} className="relative block h-52 w-full shrink-0 overflow-hidden">
        <Image
          src={campaign.coverImage}
          alt={campaign.title}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition duration-500 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/0 to-black/0" />
        <span className="absolute left-3 top-3 rounded-full bg-cream/95 px-3 py-1 text-xs font-semibold tracking-wide text-maroon shadow-soft backdrop-blur-sm">
          {CAMPAIGN_TYPE_LABELS[campaign.type]}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-1.5 text-xs font-medium text-charcoal/70">
          <MapPin size={13} />
          {campaign.location}
        </div>

        <Link href={`/campaigns/${campaign.slug}`}>
          <h3 className="mt-2 font-display text-lg font-bold leading-snug text-maroon transition hover:text-terracotta">
            {campaign.title}
          </h3>
        </Link>

        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-charcoal/65">
          {campaign.shortDescription}
        </p>

        <div className="mt-5">
          {percent !== null ? (
            <>
              <ProgressBar percent={percent} />
              <div className="mt-2.5 flex items-baseline justify-between text-sm">
                <span className="font-semibold text-maroon">{formatINR(campaign.raisedAmount)}</span>
                <span className="text-charcoal/70">of {formatINR(campaign.goalAmount!)}</span>
              </div>
            </>
          ) : (
            <div className="text-sm">
              <span className="font-semibold text-maroon">{formatINR(campaign.raisedAmount)}</span>{" "}
              <span className="text-charcoal/70">raised so far</span>
            </div>
          )}
          <div className="mt-1 text-xs text-charcoal/60">{campaign.donorCount} donors</div>
        </div>

        <Link
          href={`/campaigns/${campaign.slug}`}
          className="mt-4 block rounded-full bg-linear-to-r from-terracotta to-terracotta-dark py-2.5 text-center text-sm font-semibold text-cream shadow-[0_10px_24px_-10px_rgba(193,82,47,0.6)] transition hover:shadow-[0_12px_28px_-8px_rgba(193,82,47,0.75)]"
        >
          Donate Now
        </Link>
      </div>
    </div>
  );
}
