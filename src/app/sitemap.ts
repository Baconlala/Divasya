import type { MetadataRoute } from "next";
import { getCampaignsByType } from "@/lib/campaigns";
import { getPublishedPosts } from "@/lib/blog";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://divasya-lime.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [campaigns, posts] = await Promise.all([getCampaignsByType("all"), getPublishedPosts()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/campaigns`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/gallery`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${siteUrl}/blog`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/contact`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${siteUrl}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const campaignRoutes: MetadataRoute.Sitemap = campaigns.map((c) => ({
    url: `${siteUrl}/campaigns/${c.slug}`,
    lastModified: c.createdAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${siteUrl}/blog/${p.slug}`,
    lastModified: p.createdAt,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...campaignRoutes, ...blogRoutes];
}
