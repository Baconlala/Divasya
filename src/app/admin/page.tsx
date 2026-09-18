import Link from "next/link";
import { LayoutGrid, Newspaper, Image as ImageIcon, Mail, IndianRupee } from "lucide-react";
import { getAllCampaigns } from "@/lib/campaigns";
import { getAllPosts } from "@/lib/blog";
import { getAllGalleryItems } from "@/lib/gallery";
import { getAllMessages } from "@/lib/messages";
import { formatINR } from "@/lib/format";

export default async function AdminDashboardPage() {
  const [campaigns, posts, galleryItems, messages] = await Promise.all([
    getAllCampaigns(),
    getAllPosts(),
    getAllGalleryItems(),
    getAllMessages(),
  ]);

  const liveCampaigns = campaigns.filter((c) => c.status === "live");
  const totalRaised = liveCampaigns.reduce((sum, c) => sum + c.raisedAmount, 0);
  const unreadMessages = messages.filter((m) => m.status === "new");
  const publishedPosts = posts.filter((p) => p.status === "published");

  const stats = [
    {
      label: "Total raised (live campaigns)",
      value: formatINR(totalRaised),
      icon: IndianRupee,
      href: "/admin/campaigns",
    },
    {
      label: "Campaigns",
      value: `${liveCampaigns.length} live · ${campaigns.length} total`,
      icon: LayoutGrid,
      href: "/admin/campaigns",
    },
    {
      label: "Blog posts",
      value: `${publishedPosts.length} published · ${posts.length} total`,
      icon: Newspaper,
      href: "/admin/blog",
    },
    {
      label: "Gallery photos",
      value: String(galleryItems.length),
      icon: ImageIcon,
      href: "/admin/gallery",
    },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-maroon">Dashboard</h1>
      <p className="mt-1 text-sm text-charcoal/60">A quick look at what&apos;s happening on the site.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="rounded-2xl bg-white p-5 shadow-soft transition hover:shadow-premium"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
              <Icon size={18} />
            </span>
            <p className="mt-3 font-display text-xl font-bold text-maroon">{value}</p>
            <p className="mt-0.5 text-xs text-charcoal/55">{label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-maroon">Recent Messages</h2>
          <Link href="/admin/messages" className="text-sm font-semibold text-terracotta hover:text-terracotta-dark">
            View all
          </Link>
        </div>

        {messages.length === 0 ? (
          <p className="mt-4 rounded-2xl bg-white p-6 text-sm text-charcoal/60 shadow-soft">
            No messages yet.
          </p>
        ) : (
          <div className="mt-4 space-y-2">
            {messages.slice(0, 5).map((m) => (
              <Link
                key={m.id}
                href="/admin/messages"
                className="flex items-center justify-between gap-4 rounded-xl bg-white p-4 shadow-soft transition hover:shadow-premium"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <Mail
                    size={14}
                    className={m.status === "new" ? "shrink-0 text-terracotta" : "shrink-0 text-charcoal/30"}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-charcoal">{m.subject}</p>
                    <p className="truncate text-xs text-charcoal/50">
                      {m.name} · {m.email}
                    </p>
                  </div>
                </div>
                {m.status === "new" && (
                  <span className="shrink-0 rounded-full bg-terracotta/10 px-2.5 py-1 text-xs font-semibold text-terracotta">
                    New
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}
        {unreadMessages.length > 0 && (
          <p className="mt-3 text-xs text-charcoal/50">
            {unreadMessages.length} unread message{unreadMessages.length === 1 ? "" : "s"}.
          </p>
        )}
      </div>
    </div>
  );
}
