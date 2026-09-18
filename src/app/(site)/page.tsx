import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import TrustBadges from "@/components/TrustBadges";
import ImpactStats from "@/components/ImpactStats";
import CampaignCard from "@/components/CampaignCard";
import Testimonials from "@/components/Testimonials";
import Reveal from "@/components/Reveal";
import { getFeaturedCampaigns } from "@/lib/campaigns";
import { images } from "@/lib/images";
import { CAMPAIGN_TYPE_LABELS, CampaignType } from "@/lib/types";

const CATEGORY_CARDS: { type: CampaignType; image: string; description: string }[] = [
  {
    type: "temple",
    image: images.temple.category,
    description: "Restore heritage temples across India, stone by stone.",
  },
  {
    type: "seva",
    image: images.seva.category,
    description: "Support sadhus and ashram residents with food, warmth, and care.",
  },
  {
    type: "gurukul",
    image: images.gurukul.category,
    description: "Fund traditional Vedic education for children who need it most.",
  },
  {
    type: "animal_welfare",
    image: images.animal.category,
    description: "Feed, shelter, and treat cattle and animals in need.",
  },
];

export default async function HomePage() {
  const featured = await getFeaturedCampaigns(3);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden sm:min-h-[85vh]">
        <Image
          src={images.heroHome}
          alt="Devotee offering prayers at a temple by the water"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-maroon-dark via-maroon-dark/75 to-maroon-dark/40" />
        <div className="absolute inset-0 bg-linear-to-r from-maroon-dark/60 via-transparent to-transparent" />

        <Container className="relative z-10 py-24">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-sm font-semibold tracking-wide text-gold-light backdrop-blur-sm">
              Verified · Transparent · Tax-Deductible
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-6 max-w-2xl font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-cream sm:text-5xl lg:text-6xl">
              Give with confidence.
              <br />
              See exactly where it goes.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/85">
              Divasya connects you directly with verified temple restoration, sadhu seva,
              gurukul education, and animal welfare causes across India — one-time or
              monthly, with full transparency on every rupee.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/campaigns"
                className="rounded-full bg-linear-to-r from-terracotta to-terracotta-dark px-7 py-3.5 text-base font-semibold text-cream shadow-[0_16px_34px_-10px_rgba(193,82,47,0.75)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-8px_rgba(193,82,47,0.85)]"
              >
                Donate Now
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-cream/35 px-7 py-3.5 text-base font-semibold text-cream backdrop-blur-sm transition hover:bg-cream/10"
              >
                How We Work
              </Link>
            </div>
          </Reveal>
        </Container>

        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-cream to-transparent sm:h-16" />
      </section>

      {/* Trust badges */}
      <section className="relative z-10 -mt-12 sm:-mt-16">
        <Container>
          <Reveal>
            <TrustBadges />
          </Reveal>
        </Container>
      </section>

      {/* Impact stats */}
      <section className="mt-20 bg-linear-to-br from-maroon to-maroon-dark py-16 sm:mt-24">
        <Container>
          <Reveal>
            <ImpactStats />
          </Reveal>
        </Container>
      </section>

      {/* Featured campaigns */}
      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Active Campaigns"
              title="Causes that need you right now"
              description="Every campaign below is actively raising funds for a verified, ongoing need."
            />
          </Reveal>
          {featured.length > 0 ? (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((c, i) => (
                <Reveal key={c.id} delay={i * 100}>
                  <CampaignCard campaign={c} />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="mt-12 text-center text-charcoal/60">
              No live campaigns yet — check back soon.
            </p>
          )}
          <div className="mt-12 text-center">
            <Link
              href="/campaigns"
              className="inline-flex items-center gap-1.5 font-semibold text-terracotta transition hover:gap-2.5 hover:text-terracotta-dark"
            >
              View all campaigns <ArrowRight size={16} />
            </Link>
          </div>
        </Container>
      </section>

      {/* Category strip */}
      <section className="relative overflow-hidden bg-sand/50 py-20 sm:py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: "radial-gradient(circle, #c9962c22 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <Container className="relative">
          <Reveal>
            <SectionHeading eyebrow="Where You Can Help" title="Four causes, one mission" />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORY_CARDS.map((cat, i) => (
              <Reveal key={cat.type} delay={i * 80}>
                <Link
                  href={`/campaigns?type=${cat.type}`}
                  className="group relative block h-64 overflow-hidden rounded-2xl shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-lg"
                >
                  <Image
                    src={cat.image}
                    alt={CAMPAIGN_TYPE_LABELS[cat.type]}
                    fill
                    sizes="(min-width: 1024px) 280px, 45vw"
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-maroon-dark/95 via-maroon-dark/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <h3 className="font-display text-lg font-bold text-cream">
                      {CAMPAIGN_TYPE_LABELS[cat.type]}
                    </h3>
                    <p className="mt-1 text-xs leading-snug text-cream/80">{cat.description}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Donor Voices"
              title="Trusted by thousands of donors"
              description="Real words from people who've made Divasya part of their monthly giving."
            />
          </Reveal>
          <div className="mt-12">
            <Reveal>
              <Testimonials />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* CTA banner */}
      <section className="relative overflow-hidden bg-linear-to-br from-maroon-dark to-maroon py-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-gold/20 blur-3xl" />
        <Container className="relative text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-bold text-cream sm:text-4xl">
              Your monthly seva can change a life
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-cream/80">
              Set up a recurring donation to a cause you care about and see its impact grow
              every month.
            </p>
            <Link
              href="/campaigns"
              className="mt-8 inline-block rounded-full bg-linear-to-r from-gold to-gold-light px-8 py-3.5 text-base font-bold text-maroon-dark shadow-[0_16px_36px_-10px_rgba(201,150,44,0.6)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_42px_-8px_rgba(201,150,44,0.75)]"
            >
              Explore Campaigns
            </Link>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
