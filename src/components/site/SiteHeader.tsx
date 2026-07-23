'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { NAV_LINKS, SITE_NAME } from '@/lib/site-data'

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? 'bg-ink-950/80 backdrop-blur-md border-b border-ink-700' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/brand/logo-header.png" alt="" width={28} height={28} priority className="shrink-0" />
          <span className="text-sm font-medium tracking-widest2 uppercase text-mist-100">
            {SITE_NAME}
          </span>
        </Link>
        <nav className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs uppercase tracking-widest2 text-mist-300 transition-colors hover:text-signal"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
