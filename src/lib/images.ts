// Curated Unsplash placeholder photography, grouped by theme. Swap any of
// these for real photos later — just replace the URL, nothing else changes.
const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const images = {
  heroHome: u("photo-1761383396518-e2e30968a25f", 2000),
  heroAbout: u("photo-1650341259809-9314b0de9268", 1800),

  temple: {
    cover1: u("photo-1554554497-0095c34db3ec"),
    cover2: u("photo-1538460120076-604b93a2ce88"),
    gallery1: u("photo-1601821139314-66a4d14cfc00", 1000),
    gallery2: u("photo-1529733772151-bab41484710a", 1000),
    category: u("photo-1642516861335-97971622499e", 1000),
  },
  seva: {
    cover1: u("photo-1650341278999-d1b5142cfe30"),
    cover2: u("photo-1783866707432-a9046402c46a"),
    gallery1: u("photo-1599059813005-11265ba4b4ce", 1000),
    gallery2: u("photo-1593113616828-6f22bca04804", 1000),
    category: u("photo-1753276489352-65513edc4d03", 1000),
  },
  gurukul: {
    cover1: u("photo-1692269725836-fbd72e98883f"),
    cover2: u("photo-1692269725911-87697c558be1"),
    gallery1: u("photo-1692269726060-9c604e06f63b", 1000),
    gallery2: u("photo-1692269725976-2bebd4622fd4", 1000),
    category: u("photo-1692269725827-699e04a11cdf", 1000),
  },
  animal: {
    cover1: u("photo-1598122738791-e6efd4b8e9a9"),
    cover2: u("photo-1636319134802-2df8a01e6e33"),
    gallery1: u("photo-1671886494502-f2e73eba2948", 1000),
    gallery2: u("photo-1737931333795-16311e8a4224", 1000),
    category: u("photo-1697393357489-44a23c6da250", 1000),
  },

  blog: {
    verify: u("photo-1529733772151-bab41484710a", 1200),
    monthly: u("photo-1753276489352-65513edc4d03", 1200),
    himalaya: u("photo-1650341278999-d1b5142cfe30", 1200),
  },
} as const;
