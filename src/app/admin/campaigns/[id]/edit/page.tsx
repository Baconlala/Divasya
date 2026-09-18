import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import CampaignForm from "@/components/admin/CampaignForm";
import { updateCampaign } from "@/app/admin/actions";
import { getCampaignById } from "@/lib/campaigns";

export default async function EditCampaignPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const campaign = await getCampaignById(id);
  if (!campaign) notFound();

  return (
    <div>
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta hover:text-terracotta-dark"
      >
        <ArrowLeft size={16} /> Back to Campaigns
      </Link>
      <h1 className="mt-4 font-display text-2xl font-bold text-maroon">Edit Campaign</h1>

      <div className="mt-6 max-w-2xl rounded-2xl bg-white p-6 shadow-soft">
        <CampaignForm campaign={campaign} action={updateCampaign.bind(null, campaign.id)} />
      </div>
    </div>
  );
}
