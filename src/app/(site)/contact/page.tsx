import { Mail, MapPin, Phone } from "lucide-react";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";

export const metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We'd love to hear from you"
        description="Questions about a campaign, a partnership enquiry, or feedback — reach out and our team will respond within 2 business days."
      />

      <section className="py-12 sm:py-16">
        <Container className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={100}>
            <div className="space-y-5">
              <div className="flex items-start gap-3 rounded-2xl bg-white p-5 shadow-soft">
                <MapPin className="mt-0.5 shrink-0 text-terracotta" size={20} />
                <div>
                  <p className="font-semibold text-maroon">Office</p>
                  <p className="mt-1 text-sm text-charcoal/60">
                    Divasya Trust, Sector 12, New Delhi, India
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-white p-5 shadow-soft">
                <Mail className="mt-0.5 shrink-0 text-terracotta" size={20} />
                <div>
                  <p className="font-semibold text-maroon">Email</p>
                  <p className="mt-1 text-sm text-charcoal/60">hello@divasya.org</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-white p-5 shadow-soft">
                <Phone className="mt-0.5 shrink-0 text-terracotta" size={20} />
                <div>
                  <p className="font-semibold text-maroon">Phone</p>
                  <p className="mt-1 text-sm text-charcoal/60">+91 98765 43210</p>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
