import type { Metadata } from 'next'
import { Reveal } from '@/components/site/Reveal'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Lotusmirk Aerospace is the aerial and applied-AI operating arm of Lotusmirk Ventures (OPC) Private Limited, delivering drone surveying, geospatial data, and inspection systems from Mumbai, India.',
}

export default function AboutPage() {
  return (
    <div className="px-6 pb-28 pt-40 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="text-xs uppercase tracking-widest2 text-signal">About</p>
          <h1 className="mt-4 text-4xl font-medium leading-tight text-mist-100 sm:text-5xl">
            Lotusmirk Aerospace
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-mist-300">
            Lotusmirk Aerospace is the aerial and applied-AI operating arm of Lotusmirk
            Ventures (OPC) Private Limited, based in Mumbai, India. We deliver drone
            surveying and mapping, geospatial data acquisition, GIS and technical
            drawing, surveillance and monitoring, aerial inspection, cinematography and
            FPV capture, 360° virtual experiences, and the software systems that turn
            aerial capture into a usable operational product.
          </p>
          <p className="mt-6 leading-relaxed text-mist-400">
            Every engagement is scoped and delivered as an integrated capability —
            capture, processing, and the client-facing systems to review the result —
            rather than a single disconnected service.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-20 border-t border-ink-700 pt-14">
          <p className="text-xs uppercase tracking-widest2 text-signal">Leadership</p>
          <h2 className="mt-4 text-2xl font-medium text-mist-100">Gaurav Kotian</h2>
          <p className="mt-2 text-sm uppercase tracking-widest2 text-mist-400">
            Founder &amp; CEO
          </p>
          <p className="mt-6 max-w-2xl leading-relaxed text-mist-400">
            Leads engagement scoping, delivery, and the client-facing platform end to
            end — from the initial site survey through to the systems clients use to
            review their own data.
          </p>
        </Reveal>
      </div>
    </div>
  )
}
