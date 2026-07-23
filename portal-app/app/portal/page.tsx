import { redirect } from "next/navigation";
import { getActiveOrgType } from "@/lib/org-type";

// Bare /portal routes each user to the dashboard that matches their
// active organization's type.
export default async function PortalIndex() {
  const { orgId, orgType } = await getActiveOrgType();

  if (!orgId) {
    redirect("/select-org");
  }

  if (orgType === "vendor") {
    redirect("/portal/vendor");
  }

  if (orgType === "client") {
    redirect("/portal/client");
  }

  // Org exists but has no `type` set in publicMetadata yet.
  return (
    <div className="mx-auto max-w-md p-8 text-sm text-white/70">
      <h1 className="mb-2 text-lg font-medium text-white">
        Organization not configured
      </h1>
      <p>
        This organization doesn&apos;t have a portal type set yet. In the
        Clerk dashboard, set this organization&apos;s public metadata to{" "}
        <code className="text-white/90">{`{ "type": "client" }`}</code> or{" "}
        <code className="text-white/90">{`{ "type": "vendor" }`}</code>.
      </p>
    </div>
  );
}
