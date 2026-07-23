"use client";

import { useOrganizationList, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SelectOrgPage() {
  const { isLoaded: userLoaded, user } = useUser();
  const { isLoaded, userMemberships, setActive } = useOrganizationList({
    userMemberships: { infinite: true },
  });
  const router = useRouter();

  if (!isLoaded || !userLoaded) {
    return <p className="p-8 text-white/60">Loading…</p>;
  }

  const switchOrg = async (organizationId: string) => {
    await setActive?.({ organization: organizationId });
    router.push("/portal");
  };

  return (
    <div className="mx-auto max-w-md p-8">
      <h1 className="mb-2 text-xl font-medium">Choose an organization</h1>
      <p className="mb-6 text-sm text-white/60">
        {user?.firstName ?? "You"} need an active client or vendor
        organization to open the portal.
      </p>

      {userMemberships?.data?.length ? (
        <ul className="space-y-2">
          {userMemberships.data.map((membership) => (
            <li key={membership.id}>
              <button
                onClick={() => switchOrg(membership.organization.id)}
                className="w-full rounded-md border border-white/10 px-4 py-3 text-left text-sm hover:border-white/30"
              >
                {membership.organization.name}
                <span className="ml-2 text-white/40">
                  ({membership.role})
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-white/60">
          You don&apos;t belong to a client or vendor organization yet. Ask an
          admin to invite you, or an admin can create one from the header
          switcher.
        </p>
      )}
    </div>
  );
}
