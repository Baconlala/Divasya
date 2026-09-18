import Link from "next/link";
import { Compass } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import Logo from "@/components/Logo";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
          <Logo size={56} />
          <p className="mt-6 font-display text-6xl font-extrabold text-maroon">404</p>
          <h1 className="mt-3 font-display text-2xl font-bold text-maroon sm:text-3xl">
            This page wandered off the path
          </h1>
          <p className="mt-3 max-w-md text-charcoal/65">
            The page you&apos;re looking for doesn&apos;t exist, or may have moved. Let&apos;s get
            you back to somewhere real.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/campaigns"
              className="flex items-center gap-2 rounded-full bg-linear-to-r from-terracotta to-terracotta-dark px-7 py-3.5 text-base font-semibold text-cream shadow-[0_16px_34px_-10px_rgba(193,82,47,0.75)] transition hover:-translate-y-0.5"
            >
              <Compass size={18} /> Browse Campaigns
            </Link>
            <Link
              href="/"
              className="rounded-full border border-sand px-7 py-3.5 text-base font-semibold text-charcoal/70 transition hover:border-terracotta/50 hover:text-terracotta"
            >
              Back to Home
            </Link>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
