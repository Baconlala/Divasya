import { AlertTriangle } from "lucide-react";
import Container from "@/components/Container";

export const metadata = { title: "Privacy Policy" };

const SECTIONS = [
  {
    title: "Information We Collect",
    body: "When you donate, browse campaigns, or contact us, we may collect your name, email address, phone number, donation amount and history, and payment confirmation details (we do not store your card, UPI, or bank details — these are handled directly by our payment processor).",
  },
  {
    title: "How We Use Your Information",
    body: "We use your information to process donations, issue tax receipts, send donation confirmations and campaign updates you've opted into, respond to enquiries, and comply with applicable financial and tax regulations.",
  },
  {
    title: "Sharing of Information",
    body: "We share donor information with the specific temple or trust you donate to only as required to issue receipts and comply with reporting obligations (such as Form 10BD/10BE for 80G donations). We do not sell donor data to third parties.",
  },
  {
    title: "Data Retention",
    body: "Donation records, including donor name and amount, are retained for the period required under applicable tax and audit regulations.",
  },
  {
    title: "Your Rights",
    body: "You may request access to, correction of, or deletion of your personal data, subject to our statutory retention obligations for donation and tax records, by contacting us at hello@divasya.org.",
  },
  {
    title: "Cookies",
    body: "We use essential cookies to operate the site and, where enabled, analytics cookies to understand how visitors use Divasya so we can improve it.",
  },
];

export default function PrivacyPage() {
  return (
    <Container className="max-w-3xl py-10 sm:py-14">
      <h1 className="font-display text-3xl font-bold text-maroon">Privacy Policy</h1>
      <p className="mt-2 text-sm text-charcoal/65">Last updated: September 2026</p>

      <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-gold/40 bg-gold/10 p-4 text-sm text-maroon-dark">
        <AlertTriangle size={18} className="mt-0.5 shrink-0" />
        <p>
          Placeholder text for development. This policy must be reviewed by legal
          counsel familiar with India&apos;s Digital Personal Data Protection Act before
          the site accepts real donor data.
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
