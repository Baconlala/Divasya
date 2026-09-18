import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import Container from "@/components/Container";
import { formatINR } from "@/lib/format";

export const metadata = { title: "Thank You" };

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{
    campaign?: string;
    amount?: string;
    type?: string;
    name?: string;
  }>;
}) {
  const { campaign, amount, type, name } = await searchParams;
  const donationAmount = Number(amount) || 0;

  return (
    <Container className="flex min-h-[60vh] items-center justify-center py-16">
      <div className="mx-auto max-w-lg text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-terracotta-light to-terracotta text-cream shadow-[0_10px_28px_-8px_rgba(193,82,47,0.6)]">
          <CheckCircle2 size={32} />
        </span>
        <h1 className="mt-6 font-display text-3xl font-bold text-maroon">
          {name ? `Thank you, ${name}!` : "Thank you for your generosity!"}
        </h1>
        <p className="mt-3 text-charcoal/70">
          {campaign ? (
            <>
              Your {type === "monthly" ? "monthly" : "one-time"} contribution of{" "}
              <span className="font-semibold text-maroon">{formatINR(donationAmount)}</span>{" "}
              toward <span className="font-semibold text-maroon">{campaign}</span> means a
              great deal.
            </>
          ) : (
            "Your contribution means a great deal to the cause you supported."
          )}
        </p>
        <p className="mt-4 rounded-xl bg-sand/50 p-4 text-sm text-charcoal/60">
          Once payments go live, your 80G tax receipt will be emailed to you
          automatically, and this donation will appear in your donor history.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/campaigns"
            className="rounded-full bg-linear-to-r from-terracotta to-terracotta-dark px-6 py-3 text-sm font-semibold text-cream shadow-[0_10px_24px_-10px_rgba(193,82,47,0.6)] transition hover:-translate-y-0.5"
          >
            Explore More Campaigns
          </Link>
          <Link
            href="/"
            className="rounded-full border border-sand px-6 py-3 text-sm font-semibold text-charcoal/70 transition hover:border-terracotta/50"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </Container>
  );
}
