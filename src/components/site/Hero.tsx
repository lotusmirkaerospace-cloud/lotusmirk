'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useRef } from 'react'

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const gridOpacity = useTransform(scrollYProgress, [0, 1], [0.5, 0])

  return (
    <section ref={ref} className="relative flex h-[100svh] min-h-[720px] items-end overflow-hidden bg-ink-950">
      <motion.div style={{ opacity: gridOpacity }} className="bg-grid absolute inset-0" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(79,209,255,0.12), transparent 70%)',
        }}
      />
      <motion.div style={{ y, opacity }} className="relative z-10 w-full px-6 pb-20 lg:px-10 lg:pb-28">
        <div className="mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 text-xs uppercase tracking-widest2 text-signal"
          >
            Lotusmirk Aerospace — Mumbai, India
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl text-5xl font-medium leading-[1.05] tracking-tightest text-mist-100 sm:text-6xl lg:text-7xl"
          >
            Aerial intelligence, engineered to survey standard.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-xl text-lg text-mist-300"
          >
            Drone surveying, geospatial data, aerial inspection, and the applied AI systems
            that turn capture into decisions — delivered as one integrated capability.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <Link
              href="/contact"
              className="rounded-full bg-mist-100 px-7 py-3 text-sm font-medium text-ink-950 transition-transform duration-300 hover:scale-[1.03]"
            >
              Start a project
            </Link>
            <Link
              href="/services"
              className="text-sm font-medium text-mist-200 underline decoration-ink-600 decoration-1 underline-offset-8 transition-colors hover:text-signal hover:decoration-signal"
            >
              View capabilities
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
