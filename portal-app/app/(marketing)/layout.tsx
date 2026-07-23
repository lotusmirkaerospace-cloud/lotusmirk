import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";

// Public marketing site: Home, Services, About, Contact. Deliberately
// separate from app/portal/layout.tsx — no Clerk org switcher here, and
// this is the only part of the app that mounts smooth-scroll + GSAP.
export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-[#0b0d10] text-white">
        <MarketingNav />
        {children}
        <MarketingFooter />
      </div>
    </SmoothScrollProvider>
  );
}
