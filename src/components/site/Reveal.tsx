'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * Scroll-triggered reveal used throughout the marketing site. Deliberately
 * restrained: a short upward drift + fade, once, on entry — motion that
 * supports reading order instead of performing for its own sake.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
