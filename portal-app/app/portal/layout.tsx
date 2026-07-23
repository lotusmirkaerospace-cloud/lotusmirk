import Link from "next/link";
import {
  OrganizationSwitcher,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

// Chrome for every /portal route: org switcher + user button. Auth itself
// is enforced by middleware.ts (signed-in + active org) and, per-page, by
// lib/org-type.ts (client-vs-vendor routing) — this layout is presentation
// only.
export default function PortalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <Link
          href="/"
          className="text-sm font-medium tracking-wide text-white/80"
        >
          LotusMirk Portal
        </Link>
        <div className="flex items-center gap-4">
          <SignedOut>
            <Link
              href="/sign-in"
              className="text-sm text-white/70 hover:text-white"
            >
              Sign in
            </Link>
          </SignedOut>
          <SignedIn>
            <OrganizationSwitcher
              hidePersonal
              afterSelectOrganizationUrl="/portal"
              afterCreateOrganizationUrl="/portal"
              createOrganizationMode="modal"
            />
            <UserButton />
          </SignedIn>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
}
