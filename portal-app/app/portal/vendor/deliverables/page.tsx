import { redirect } from "next/navigation";
import { getActiveOrgType } from "@/lib/org-type";
import { getOrgDeliverables } from "@/lib/deliverables";
import { DeliverablesBoard } from "@/components/portal/DeliverablesBoard";

export default async function VendorDeliverablesPage() {
  const { orgId, orgType } = await getActiveOrgType();

  if (!orgId) redirect("/select-org");
  if (orgType && orgType !== "vendor") redirect("/portal/client/deliverables");

  // Same query as the client view — RLS in
  // supabase/migrations/0002_deliverables.sql restricts a vendor org to
  // only the deliverables of projects it's assigned to.
  const deliverables = await getOrgDeliverables();

  return (
    <div className="mx-auto max-w-5xl p-8">
      <h1 className="text-2xl font-medium">Deliverables</h1>
      <p className="mt-1 text-sm text-white/60">
        3D models, imagery, 360° tours, and video/photo for your assigned
        projects.
      </p>

      <div className="mt-10">
        <DeliverablesBoard items={deliverables} />
      </div>
    </div>
  );
}
