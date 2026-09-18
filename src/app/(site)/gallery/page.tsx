import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { getGalleryByCategory } from "@/lib/gallery";
import { CAMPAIGN_TYPE_LABELS, CampaignType } from "@/lib/types";

const FILTERS: { value: "all" | CampaignType; label: string }[] = [
  { value: "all", label: "All" },
  { value: "temple", label: CAMPAIGN_TYPE_LABELS.temple },
  { value: "seva", label: CAMPAIGN_TYPE_LABELS.seva },
  { value: "gurukul", label: CAMPAIGN_TYPE_LABELS.gurukul },
  { value: "animal_welfare", label: CAMPAIGN_TYPE_LABELS.animal_welfare },
];

export const metadata = { title: "Gallery" };

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const activeCategory =
    category && FILTERS.some((f) => f.value === category) ? category : "all";
  const items = await getGalleryByCategory(activeCategory);

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Completed projects, in pictures"
        description="A look at what your donations have already made possible — before-and-after restorations, seva distributions, and more."
      />

      <section className="py-12 sm:py-16">
        <Container>
          <div className="flex flex-wrap gap-2.5">
            {FILTERS.map((f) => (
              <Link
                key={f.value}
                href={f.value === "all" ? "/gallery" : `/gallery?category=${f.value}`}
                className={clsx(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200",
                  activeCategory === f.value
                    ? "border-transparent bg-linear-to-r from-terracotta to-terracotta-dark text-cream shadow-[0_8px_20px_-8px_rgba(193,82,47,0.6)]"
                    : "border-sand text-charcoal/65 hover:border-terracotta/50"
                )}
              >
                {f.label}
              </Link>
            ))}
          </div>

          <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => (
              <Reveal key={item.id} delay={(i % 3) * 80}>
                <div className="overflow-hidden rounded-2xl bg-white shadow-soft transition-shadow duration-300 hover:shadow-premium">
                  {item.beforeImage ? (
                    <div className="grid grid-cols-2 gap-0.5">
                      <div className="relative aspect-square">
                        <Image src={item.beforeImage} alt={`${item.title} before`} fill className="object-cover" />
                        <span className="absolute left-2 top-2 rounded bg-maroon-dark/85 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-cream">
                          Before
                        </span>
                      </div>
                      <div className="relative aspect-square">
                        <Image src={item.image} alt={`${item.title} after`} fill className="object-cover" />
                        <span className="absolute left-2 top-2 rounded bg-terracotta/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-cream">
                          After
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative aspect-video">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-display text-base font-bold text-maroon">{item.title}</h3>
                    <p className="mt-1 text-sm text-charcoal/60">{item.caption}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
