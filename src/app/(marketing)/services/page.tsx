import type { Metadata } from 'next'
import { CapabilitiesGrid } from '@/components/site/CapabilitiesGrid'
import { Reveal } from '@/components/site/Reveal'
import { CAPABILITIES } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Capabilities',
  description: 'Drone surveying, geospatial data, aerial inspection, and applied AI systems.',
}

export default function ServicesPage() {
  return (
    <div className="px-6 pb-28 pt-40 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-xs uppercase tracking-widest2 text-signal">Capabilities</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-medium leading-tight text-mist-100 sm:text-5xl">
            Everything a project needs, from flight to finished deliverable.
          </h1>
        </Reveal>

        <div className="mt-16">
          <CapabilitiesGrid />
        </div>

        <div className="mt-24 space-y-16">
          {CAPABILITIES.map((cap, i) => (
            <Reveal key={cap.title} className="grid grid-cols-1 gap-6 border-t border-ink-700 pt-10 lg:grid-cols-[1fr_2fr]">
              <div>
                <span className="font-mono text-xs text-signal-dim">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="mt-3 text-xl font-medium text-mist-100">{cap.title}</h2>
              </div>
              <p className="max-w-2xl text-mist-400">{cap.detail}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}
