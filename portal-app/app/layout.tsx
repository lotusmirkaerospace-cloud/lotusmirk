import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "LotusMirk Aerospace",
  description:
    "LotusMirk Aerospace — drone-as-a-service: aerial survey, 3D mapping, and site documentation.",
};

// Root layout is intentionally bare: ClerkProvider must wrap the whole app
// (marketing pages read SignedIn/SignedOut for the nav's "Portal" link), but
// the marketing site and the authenticated portal have very different
// chrome, so each gets its own layout:
//   app/(marketing)/layout.tsx  — public nav/footer, motion providers
//   app/portal/layout.tsx       — org switcher, user button, portal nav
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
