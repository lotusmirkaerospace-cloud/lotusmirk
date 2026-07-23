import Link from "next/link";
import { redirect } from "next/navigation";
import { getActiveOrgType } from "@/lib/org-type";

export default async function ClientPortalPage() {
  const { orgId, orgType, orgName } = await getActiveOrgType();

  if (!orgId) {
    redirect("/select-org");
  }

  // A vendor organization has no business seeing the client dashboard.
  if (orgType && orgType !== "client") {
    redirect("/portal/vendor");
  }

  return (
    <div className="mx-auto max-w-4xl p-8">
      <h1 className="text-2xl font-medium">Client portal</h1>
      <p className="mt-1 text-sm text-white/60">{orgName}</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <PlaceholderCard title="Active projects" />
        <LinkCard
          title="Deliverables"
          href="/portal/client/deliverables"
          description="3D models, imagery, tours, video & photo"
        />
        <PlaceholderCard title="Invoices" />
      </div>

      <p className="mt-10 text-sm text-white/40">
        &quot;Active projects&quot; and &quot;Invoices&quot; are still
        placeholders — wire them to Supabase tables scoped to this
        organization&apos;s <code>organization_id</code> once needed.
        Deliverables is wired to real data (see{" "}
        <code>supabase/migrations/0002_deliverables.sql</code>).
      </p>
    </div>
  );
}

function PlaceholderCard({ title }: { title: string }) {
  return (
    <div className="rounded-lg border border-white/10 p-5">
      <h2 className="text-sm font-medium text-white/80">{title}</h2>
      <p className="mt-2 text-xs text-white/40">No data connected yet.</p>
    </div>
  );
}

function LinkCard({
  title,
  href,
  description,
}: {
  title: string;
  href: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-lg border border-white/10 p-5 transition hover:border-white/30"
    >
      <h2 className="text-sm font-medium text-white/80">{title}</h2>
      <p className="mt-2 text-xs text-white/40">{description}</p>
    </Link>
  );
}
