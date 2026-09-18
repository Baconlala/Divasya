import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Users } from "lucide-react";
import Container from "@/components/Container";
import ProgressBar from "@/components/ProgressBar";
import DonateWidget from "@/components/DonateWidget";
import MobileStickyDonate from "@/components/MobileStickyDonate";
import Reveal from "@/components/Reveal";
import { getCampaignBySlug } from "@/lib/campaigns";
import { formatINR, progressPercent } from "@/lib/format";
import { CAMPAIGN_TYPE_LABELS } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const campaign = await getCampaignBySlug(slug);
  return { title: campaign ? campaign.title : "Campaign" };
}

export default async function CampaignDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const campaign = await getCampaignBySlug(slug);
  if (!campaign || campaign.status !== "live") notFound();

  const percent = progressPercent(campaign.raisedAmount, campaign.goalAmount);

  return (
    <>
      <section className="relative h-80 w-full overflow-hidden sm:h-[28rem]">
        <Image
          src={campaign.coverImage}
          alt={campaign.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-maroon-dark/95 via-maroon-dark/50 to-black/10" />
        <Container className="absolute inset-x-0 bottom-0 pb-7">
          <span className="rounded-full bg-linear-to-r from-gold to-gold-light px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-maroon-dark shadow-[0_6px_16px_-4px_rgba(0,0,0,0.35)]">
            {CAMPAIGN_TYPE_LABELS[campaign.type]}
          </span>
          <h1 className="mt-4 max-w-2xl font-display text-2xl font-bold leading-tight text-cream sm:text-4xl">
            {campaign.title}
          </h1>
          <div className="mt-2.5 flex items-center gap-1.5 text-sm text-cream/85">
            <MapPin size={14} /> {campaign.location}
          </div>
        </Container>
      </section>

      <Container className="grid gap-10 py-12 pb-24 lg:grid-cols-[1fr_360px] lg:pb-16 sm:py-16">
        <div>
          {/* Mobile: donate widget appears right after hero for quick access */}
          <div id="mobile-donate-widget" className="mb-8 scroll-mt-24 lg:hidden">
            <DonateWidget slug={campaign.slug} />
          </div>

          <div className="space-y-4 text-[15px] leading-relaxed text-charcoal/75">
            {campaign.story.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {campaign.gallery.length > 0 && (
            <div className="mt-12">
              <h2 className="font-display text-xl font-bold text-maroon">Photos</h2>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {campaign.gallery.map((src, i) => (
                  <div
                    key={i}
                    className="relative aspect-4/3 overflow-hidden rounded-xl shadow-soft transition-shadow hover:shadow-premium"
                  >
                    <Image
                      src={src}
                      alt={`${campaign.title} photo ${i + 1}`}
                      fill
                      sizes="(min-width: 640px) 220px, 45vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 rounded-xl bg-sand/50 p-5 text-sm text-charcoal/65">
            <p>
              Have questions about this campaign or the trust behind it?{" "}
              <Link href="/contact" className="font-semibold text-terracotta hover:underline">
                Contact us
              </Link>
              .
            </p>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl bg-white p-5 shadow-premium">
            {percent !== null ? (
              <>
                <ProgressBar percent={percent} />
                <div className="mt-2.5 flex items-baseline justify-between">
                  <span className="font-display text-lg font-bold text-maroon">
                    {formatINR(campaign.raisedAmount)}
                  </span>
                  <span className="text-sm text-charcoal/70">
                    of {formatINR(campaign.goalAmount!)}
                  </span>
                </div>
              </>
            ) : (
              <div className="font-display text-lg font-bold text-maroon">
                {formatINR(campaign.raisedAmount)} raised
              </div>
            )}
            <div className="mt-2 flex items-center gap-1.5 text-sm text-charcoal/70">
              <Users size={14} /> {campaign.donorCount} donors
            </div>
          </div>

          <div className="mt-5 hidden lg:block">
            <Reveal>
              <DonateWidget slug={campaign.slug} />
            </Reveal>
          </div>
        </aside>
      </Container>

      <MobileStickyDonate targetId="mobile-donate-widget" campaignTitle={campaign.title} />
    </>
  );
}
