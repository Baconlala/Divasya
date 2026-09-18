import { AlertTriangle } from "lucide-react";
import Container from "@/components/Container";

export const metadata = { title: "Terms of Service" };

const SECTIONS = [
  {
    title: "About Divasya",
    body: "Divasya is a platform that connects donors with verified temple restoration, sadhu seva, gurukul education, and animal welfare campaigns run by registered trusts and societies. Divasya facilitates donations but does not itself operate temples, ashrams, gurukuls, or gaushalas.",
  },
  {
    title: "Donations",
    body: "All donations made through Divasya are voluntary contributions to the trust or society named on the relevant campaign page. Donations are generally non-refundable once processed, except where required by law or at Divasya's discretion in cases of processing error.",
  },
  {
    title: "Recurring Donations",
    body: "Monthly donations continue until cancelled by the donor. You may cancel a recurring donation at any time from your account or by contacting hello@divasya.org; the cancellation takes effect from the next billing cycle.",
  },
  {
    title: "Tax Receipts",
    body: "80G tax receipts are issued only where the receiving trust holds valid, current 80G registration. Divasya is not responsible for a donor's ability to claim a tax deduction where registration lapses or does not apply.",
  },
  {
    title: "Platform Fees",
    body: "Divasya may retain a transparently disclosed transaction fee from donations to cover payment processing and platform operating costs. This fee is shown before you complete a donation.",
  },
  {
    title: "Limitation of Liability",
    body: "Divasya verifies participating trusts at onboarding and on an ongoing basis but cannot guarantee the outcome of any specific project. Divasya is not liable for delays or shortfalls in a campaign's stated goals once fully verified.",
  },
  {
    title: "Governing Law",
    body: "These terms are governed by the laws of India, and any disputes are subject to the exclusive jurisdiction of the courts of New Delhi.",
  },
];

export default function TermsPage() {
  return (
    <Container className="max-w-3xl py-10 sm:py-14">
      <h1 className="font-display text-3xl font-bold text-maroon">Terms of Service</h1>
      <p className="mt-2 text-sm text-charcoal/65">Last updated: September 2026</p>

      <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-gold/40 bg-gold/10 p-4 text-sm text-maroon-dark">
        <AlertTriangle size={18} className="mt-0.5 shrink-0" />
        <p>
          Placeholder text for development. Have a lawyer review these terms — along
          with the compliance checklist in PRODUCT_SPEC-style docs — before accepting
          real donations.
        </p>
      </div>

      <div className="mt-8 space-y-8">
        {SECTIONS.map((s) => (
          <div key={s.title}>
            <h2 className="font-display text-lg font-bold text-maroon">{s.title}</h2>
            <p className="mt-2 leading-relaxed text-charcoal/75">{s.body}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}
