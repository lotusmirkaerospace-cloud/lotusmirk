import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })

const SITE_URL = 'https://lotusmirk.com'
const DEFAULT_DESCRIPTION =
  'Drone surveying and mapping, geospatial data acquisition, aerial inspection, and AI-enabled systems for organizations that operate at scale.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Lotusmirk Aerospace — Aerial Intelligence, Engineered',
    template: '%s — Lotusmirk Aerospace',
  },
  description: DEFAULT_DESCRIPTION,
  // No explicit `icons` entry — app/icon.png (the real brand mark) is picked
  // up automatically via Next's file-convention icon API. An explicit
  // /favicon.ico reference here would just 404 since that file was never
  // generated.
  // Site-wide Open Graph / Twitter defaults. Individual pages that set their
  // own `metadata.description` inherit everything else here except that
  // field, so this only needs to be correct once. The actual og:image is
  // generated server-side by app/opengraph-image.tsx (Next's file-convention
  // API) — no external asset to keep in sync.
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'Lotusmirk Aerospace',
    title: 'Lotusmirk Aerospace — Aerial Intelligence, Engineered',
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lotusmirk Aerospace — Aerial Intelligence, Engineered',
    description: DEFAULT_DESCRIPTION,
  },
}

// Deliberately bare: fonts, globals, html/body only. Site chrome (header,
// footer) lives in app/(marketing)/layout.tsx instead of here, because the
// portal renders its own header via app/portal/(authenticated)/layout.tsx —
// having both in the tree meant two fixed headers stacking on every
// /portal/* page. Route groups keep the two chrome sets from colliding.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  )
}
