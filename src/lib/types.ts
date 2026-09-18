export type CampaignType = "temple" | "seva" | "gurukul" | "animal_welfare";

export const CAMPAIGN_TYPE_LABELS: Record<CampaignType, string> = {
  temple: "Temple Restoration",
  seva: "Sadhu Seva",
  gurukul: "Gurukul Education",
  animal_welfare: "Animal Welfare",
};

export const CAMPAIGN_TYPE_SHORT: Record<CampaignType, string> = {
  temple: "Temple",
  seva: "Seva",
  gurukul: "Gurukul",
  animal_welfare: "Animal Welfare",
};

export interface Campaign {
  id: string;
  slug: string;
  title: string;
  type: CampaignType;
  location: string;
  shortDescription: string;
  story: string[];
  coverImage: string;
  gallery: string[];
  goalAmount: number | null;
  raisedAmount: number;
  donorCount: number;
  status: CampaignStatus;
  createdAt: string;
}

export type CampaignStatus = "draft" | "live" | "paused";

export const CAMPAIGN_STATUS_LABELS: Record<CampaignStatus, string> = {
  draft: "Draft",
  live: "Live",
  paused: "Paused",
};

export type PostStatus = "draft" | "published";

export const POST_STATUS_LABELS: Record<PostStatus, string> = {
  draft: "Draft",
  published: "Published",
};

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  coverImage: string;
  author: string;
  category: string;
  status: PostStatus;
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: CampaignType;
  image: string;
  beforeImage: string | null;
  caption: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  createdAt: string;
}

export interface SiteSettings {
  statRaised: string;
  statTemples: string;
  statDonors: string;
  statFundsPercent: string;
}

export type MessageStatus = "new" | "read";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: MessageStatus;
  createdAt: string;
}
