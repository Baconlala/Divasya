import { createClient } from "@/lib/supabase/server";
import { CampaignType, GalleryItem } from "@/lib/types";

interface GalleryItemRow {
  id: string;
  title: string;
  category: CampaignType;
  image: string;
  before_image: string | null;
  caption: string;
  created_at: string;
}

function mapItem(row: GalleryItemRow): GalleryItem {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    image: row.image,
    beforeImage: row.before_image,
    caption: row.caption,
    createdAt: row.created_at,
  };
}

export async function getAllGalleryItems(): Promise<GalleryItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gallery_items")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(mapItem);
}

export async function getGalleryByCategory(category: string): Promise<GalleryItem[]> {
  const items = await getAllGalleryItems();
  if (category === "all") return items;
  return items.filter((g) => g.category === category);
}

export async function getGalleryItemById(id: string): Promise<GalleryItem | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gallery_items")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data ? mapItem(data) : null;
}
