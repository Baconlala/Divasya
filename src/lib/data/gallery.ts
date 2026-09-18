import { GalleryItem } from "@/lib/types";
import { images } from "@/lib/images";

export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    title: "Ganga-facing Ghat Temple, Roof Restored",
    category: "temple",
    image: images.temple.cover1,
    beforeImage: images.temple.gallery2,
    caption: "Completed in March 2026 after an 8-week restoration funded by 620 donors.",
  },
  {
    id: "g2",
    title: "Courtyard Repaving, Devi Mandir",
    category: "temple",
    image: images.temple.cover2,
    beforeImage: images.temple.gallery1,
    caption: "New stone flooring replaced a cracked, waterlogged courtyard.",
  },
  {
    id: "g3",
    title: "Winter Blanket Distribution, Rishikesh",
    category: "seva",
    image: images.seva.gallery1,
    caption: "412 blankets distributed across 6 ashrams in a single week.",
  },
  {
    id: "g4",
    title: "Annadaan in Progress, Uttarkashi",
    category: "seva",
    image: images.seva.gallery2,
    caption: "Volunteers preparing the monthly food distribution for hill ashrams.",
  },
  {
    id: "g5",
    title: "New Library Shelving, Haridwar Gurukul",
    category: "gurukul",
    image: images.gurukul.gallery1,
    caption: "First dedicated library space for 90 students.",
  },
  {
    id: "g6",
    title: "Scholarship Recipients, Nashik",
    category: "gurukul",
    image: images.gurukul.gallery2,
    caption: "12 of this year's 40 sponsored students at their morning Vedic recitation.",
  },
  {
    id: "g7",
    title: "New Shelter Shed, Mathura Gaushala",
    category: "animal_welfare",
    image: images.animal.cover1,
    beforeImage: images.animal.gallery1,
    caption: "Covered shelter for 60 additional cows, completed ahead of last winter.",
  },
  {
    id: "g8",
    title: "Mobile Vet Unit on Call",
    category: "animal_welfare",
    image: images.animal.gallery2,
    caption: "Emergency treatment delivered on-site in a village outside Jaipur.",
  },
];

export function getAllGalleryItems() {
  return galleryItems;
}

export function getGalleryByCategory(category: string) {
  if (category === "all") return galleryItems;
  return galleryItems.filter((g) => g.category === category);
}
