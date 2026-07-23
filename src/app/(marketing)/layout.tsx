import { SiteHeader } from '@/components/site/SiteHeader'
import { SiteFooter } from '@/components/site/SiteFooter'

// Site chrome for the public marketing pages only — home, capabilities,
// about, contact. The portal route tree (app/portal/**) sits outside this
// group and never picks up this header/footer, so it can render its own
// portal chrome without the two stacking on top of each other.
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  )
}
