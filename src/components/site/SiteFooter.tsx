import Link from 'next/link'
import { SITE_NAME } from '@/lib/site-data'

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-ink-700 bg-ink-950">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-widest2 text-mist-100">{SITE_NAME}</p>
            <p className="mt-3 max-w-sm text-sm text-mist-400">
              Aerial intelligence and applied AI systems, operated out of Mumbai, India.
            </p>
            <a
              href="mailto:lotusmirkaerospace@gmail.com"
              className="mt-4 inline-block text-sm text-mist-300 hover:text-signal"
            >
              lotusmirkaerospace@gmail.com
            </a>
          </div>
          <div className="flex gap-16 text-sm">
            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-widest2 text-mist-400">Company</span>
              <Link href="/about" className="text-mist-200 hover:text-signal">About</Link>
              <Link href="/services" className="text-mist-200 hover:text-signal">Capabilities</Link>
              <Link href="/contact" className="text-mist-200 hover:text-signal">Contact</Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-widest2 text-mist-400">Clients</span>
              <Link href="/portal/login" className="text-mist-200 hover:text-signal">Client Portal</Link>
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-2 border-t border-ink-700 pt-6 text-xs text-mist-400 md:flex-row md:justify-between">
          <p>&copy; {year} Lotusmirk Ventures (OPC) Private Limited. All rights reserved.</p>
          <p>Mumbai, India</p>
        </div>
      </div>
    </footer>
  )
}
