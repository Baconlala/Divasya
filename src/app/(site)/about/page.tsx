import Image from "next/image";
import { ShieldCheck, HeartHandshake, Eye, Users } from "lucide-react";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { images } from "@/lib/images";

const VALUES = [
  {
    icon: Eye,
    title: "Radical Transparency",
    description:
      "Every campaign publishes how funds were used, not just how much was raised.",
  },
  {
    icon: ShieldCheck,
    title: "Verified, Not Assumed",
    description:
      "We check registration, KYC, and 80G status before any temple or trust goes live on Divasya.",
  },
  {
    icon: HeartHandshake,
    title: "Fair to Everyone",
    description:
      "Transparent platform fees, disclosed upfront — never hidden in the fine print.",
  },
  {
    icon: Users,
    title: "Built for Small Trusts",
    description:
      "We prioritize long-tail temples and trusts that larger platforms often overlook.",
  },
];

export const metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <>
      <section className="relative flex h-80 items-end overflow-hidden sm:h-[26rem]">
        <Image
          src={images.heroAbout}
          alt="Temple by the riverside"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-maroon-dark/95 via-maroon-dark/50 to-black/10" />
        <Container className="relative pb-8">
          <span className="text-sm font-semibold uppercase tracking-[0.15em] text-gold-light">
            About Divasya
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold text-cream sm:text-4xl">
            Trust, rebuilt one transparent donation at a time
          </h1>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <Reveal>
            <p className="text-lg leading-relaxed text-charcoal/75">
              Divasya exists because giving to temples, sadhus, gurukuls, and animal
              welfare causes has traditionally meant trusting word of mouth — with little
              way to know if your contribution reached its destination, or what it
              actually funded.
            </p>
            <p className="mt-5 leading-relaxed text-charcoal/70">
              We built Divasya to close that gap. Every cause on our platform is tied to a
              verified trust or society, every donation is tracked from payment to
              utilization, and every campaign publishes updates on what your money made
              possible — whether that&apos;s a restored temple roof, a winter&apos;s worth of
              blankets, a year of gurukul tuition, or fodder for a gaushala.
            </p>
            <p className="mt-5 leading-relaxed text-charcoal/70">
              We work with both prominent institutions and small, long-tail temples and
              trusts that larger platforms often overlook — because we believe
              transparency and fair access shouldn&apos;t be reserved for the causes with the
              biggest marketing budgets.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-sand/50 py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="What We Stand For" title="Our values" />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ icon: Icon, title, description }, i) => (
              <Reveal key={title} delay={i * 90}>
                <div className="h-full rounded-2xl bg-white p-6 shadow-soft transition-shadow hover:shadow-premium">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br from-terracotta-light to-terracotta text-cream shadow-[0_6px_16px_-4px_rgba(193,82,47,0.5)]">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-maroon">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/60">{description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-maroon">
              A note on compliance
            </h2>
            <p className="mt-4 leading-relaxed text-charcoal/70">
              Donations made through Divasya are directed to registered trusts and
              societies. Where a trust holds valid 80G registration, an appropriate tax
              receipt is issued for eligible contributions. Donations from outside India
              are handled in line with FCRA requirements, and are only routed to
              FCRA-registered trusts.
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
