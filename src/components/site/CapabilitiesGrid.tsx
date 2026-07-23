import { CAPABILITIES } from '@/lib/site-data'
import { Reveal } from './Reveal'

export function CapabilitiesGrid({ compact = false }: { compact?: boolean }) {
  const items = compact ? CAPABILITIES.slice(0, 6) : CAPABILITIES

  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-ink-700 bg-ink-700 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((cap, i) => (
        <Reveal key={cap.title} delay={(i % 3) * 0.08} className="bg-ink-900">
          <div className="group h-full p-8 transition-colors duration-300 hover:bg-ink-800">
            <span className="font-mono text-xs text-signal-dim">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="mt-4 text-lg font-medium text-mist-100">{cap.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-mist-400">{cap.summary}</p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
