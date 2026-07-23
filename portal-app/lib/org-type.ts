import { auth, clerkClient } from "@clerk/nextjs/server";

export type OrgType = "client" | "vendor" | null;

/**
 * Reads the active organization's `type` from Clerk publicMetadata.
 *
 * Convention: when creating a client or vendor organization (from the
 * Clerk dashboard, or via clerkClient().organizations.createOrganization
 * in an onboarding flow you add later), set
 *   publicMetadata: { type: "client" }   or   { type: "vendor" }
 *
 * This is a live lookup (not from the session token), so it always
 * reflects the current dashboard value — at the cost of one Clerk API
 * call per page load. Fine for a portal's traffic level; if this ever
 * needs to run in middleware or at higher volume, promote `type` into a
 * customized session token claim instead (see Clerk's session token
 * customization docs) and read it from `auth()` there.
 */
export async function getActiveOrgType(): Promise<{
  orgId: string | null;
  orgType: OrgType;
  orgName: string | null;
}> {
  const { orgId } = await auth();

  if (!orgId) {
    return { orgId: null, orgType: null, orgName: null };
  }

  const client = await clerkClient();
  const organization = await client.organizations.getOrganization({
    organizationId: orgId,
  });

  const orgType = (organization.publicMetadata?.type as OrgType) ?? null;

  return { orgId, orgType, orgName: organization.name };
}
