import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CampaignForm from "@/components/admin/CampaignForm";
import { createCampaign } from "@/app/admin/actions";

export default function NewCampaignPage() {
  return (
    <div>
      <Link
        href="/admin/campaigns"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta hover:text-terracotta-dark"
      >
        <ArrowLeft size={16} /> Back to Campaigns
      </Link>
      <h1 className="mt-4 font-display text-2xl font-bold text-maroon">New Campaign</h1>

      <div className="mt-6 max-w-2xl rounded-2xl bg-white p-6 shadow-soft">
        <CampaignForm action={createCampaign} />
      </div>
    </div>
  );
}
