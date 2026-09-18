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

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  coverImage: string;
  author: string;
  date: string;
  category: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: CampaignType;
  image: string;
  beforeImage?: string;
  caption: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
}
