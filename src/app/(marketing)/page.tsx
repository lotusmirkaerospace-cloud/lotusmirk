import Link from 'next/link'
import { Hero } from '@/components/site/Hero'
import { CapabilitiesGrid } from '@/components/site/CapabilitiesGrid'
import { Reveal } from '@/components/site/Reveal'

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="border-t border-ink-700 bg-ink-950 px-6 py-28 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs uppercase tracking-widest2 text-signal">Capabilities</p>
            <h2 className="mt-4 max-w-2xl text-3xl font-medium leading-tight text-mist-100 sm:text-4xl">
              One integrated capability, from flight to deliverable.
            </h2>
          </Reveal>
          <div className="mt-14">
            <CapabilitiesGrid compact />
          </div>
          <Reveal delay={0.1} className="mt-10">
            <Link
              href="/services"
              className="text-sm font-medium text-mist-200 underline decoration-ink-600 decoration-1 underline-offset-8 transition-colors hover:text-signal hover:decoration-signal"
            >
              View all capabilities
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-ink-700 bg-ink-900 px-6 py-28 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-3xl">
            <p className="text-xs uppercase tracking-widest2 text-signal">Client Portal</p>
            <h2 className="mt-4 text-3xl font-medium leading-tight text-mist-100 sm:text-4xl">
              Every deliverable, in one place — 3D models, geospatial imagery, 360°
              tours, and footage, scoped to your organization.
            </h2>
            <p className="mt-6 text-mist-400">
              Clients sign in to a private portal to review project deliverables directly,
              without chasing files across email threads.
            </p>
            <Link
              href="/portal/login"
              className="mt-8 inline-block rounded-full border border-ink-600 px-7 py-3 text-sm font-medium text-mist-100 transition-colors hover:border-signal hover:text-signal"
            >
              Client sign in
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-ink-700 bg-ink-950 px-6 py-28 lg:px-10">
        <div className="mx-auto max-w-7xl text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-3xl font-medium leading-tight text-mist-100 sm:text-4xl">
              Have a site that needs mapping, inspecting, or documenting?
            </h2>
            <Link
              href="/contact"
              className="mt-10 inline-block rounded-full bg-mist-100 px-8 py-3.5 text-sm font-medium text-ink-950 transition-transform duration-300 hover:scale-[1.03]"
            >
              Start a project
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
