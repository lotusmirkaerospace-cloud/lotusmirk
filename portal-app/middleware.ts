import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Routes that require a signed-in user with an active organization.
const isPortalRoute = createRouteMatcher(["/portal(.*)"]);

// Routes reachable while signed in but before an org is selected.
const isOrgSelectionRoute = createRouteMatcher(["/select-org"]);

export default clerkMiddleware(async (auth, req) => {
  if (isOrgSelectionRoute(req)) {
    return;
  }

  if (isPortalRoute(req)) {
    const { userId, orgId } = await auth.protect();

    if (!orgId) {
      return NextResponse.redirect(new URL("/select-org", req.url));
    }

    // Org "type" (client vs vendor) isn't in the default session token,
    // so the client-vs-vendor branch and cross-portal access check happen
    // server-side in app/portal/layout.tsx, which can call clerkClient()
    // without edge-runtime constraints. Middleware only enforces:
    // signed in + an organization is active.
    void userId;
  }
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/(api|trpc)(.*)"],
};
