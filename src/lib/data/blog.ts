import { BlogPost } from "@/lib/types";
import { images } from "@/lib/images";

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    slug: "how-we-verify-every-temple-before-listing",
    title: "How We Verify Every Temple Before Listing It on Divasya",
    excerpt:
      "Transparency starts before a single rupee is raised. Here's the verification process every temple and trust goes through before their campaign goes live.",
    content: [
      "Every campaign on Divasya is tied to a registered trust or society, and we don't take that on faith. Before a campaign goes live, we request registration documents, PAN details, and — where relevant — 80G certification.",
      "We also speak directly with the trust's managing trustee or a designated representative, and where feasible, arrange a site visit or video walkthrough to confirm the cause is real and the need is current.",
      "This process takes time, which is why you won't find thousands of causes on Divasya. We'd rather list fewer campaigns we've verified thoroughly than scale quickly at the cost of donor trust.",
    ],
    coverImage: images.blog.verify,
    author: "Divasya Team",
    date: "2026-08-10",
    category: "Transparency",
  },
  {
    id: "b2",
    slug: "where-your-monthly-donation-actually-goes",
    title: "Where Your Monthly Donation Actually Goes",
    excerpt:
      "Recurring donors ask us this often. Here's a plain breakdown of how a monthly contribution is allocated, tracked, and reported back to you.",
    content: [
      "When you set up a monthly donation, it's directed to the specific campaign you chose — not pooled into a general fund. That campaign's raised amount updates with your contribution just like a one-time gift would.",
      "Each trust receiving funds submits a quarterly utilization update, which we publish on the campaign page. If a campaign closes before your subscription ends, we'll notify you and let you redirect it to an active cause.",
      "We take a small platform fee to cover payment processing and operations — this is disclosed upfront, never hidden in the fine print.",
    ],
    coverImage: images.blog.monthly,
    author: "Divasya Team",
    date: "2026-07-22",
    category: "Donor Guide",
  },
  {
    id: "b3",
    slug: "life-inside-a-himalayan-ashram-in-winter",
    title: "Life Inside a Himalayan Ashram in Winter",
    excerpt:
      "A field note from our team's visit to one of the ashrams supported by our Annadaan Seva campaign, high in the hills above Uttarkashi.",
    content: [
      "At 7,200 feet, the temperature drops below freezing well before sunset. The ashram we visited houses eleven sadhus, the youngest in his thirties and the eldest well past eighty.",
      "Alms, which sustain most of them through the pilgrim season, all but disappear once the roads close for winter. What we saw firsthand was simple: without outside support, some of these residents would go without a proper meal for days at a stretch.",
      "This is the reality our Annadaan Seva campaign exists to change, and why the trust's monthly distribution log matters as much as the fundraising itself.",
    ],
    coverImage: images.blog.himalaya,
    author: "Field Team",
    date: "2026-06-30",
    category: "Field Notes",
  },
];

export function getAllPosts() {
  return blogPosts;
}

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
