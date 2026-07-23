import type { Metadata } from 'next'
import { ContactForm } from '@/components/site/ContactForm'
import { Reveal } from '@/components/site/Reveal'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Lotusmirk Aerospace to scope a drone survey, geospatial mapping, or aerial inspection project in Mumbai, India and beyond.',
}

export default function ContactPage() {
  return (
    <div className="px-6 pb-28 pt-40 lg:px-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 lg:grid-cols-2">
        <Reveal>
          <p className="text-xs uppercase tracking-widest2 text-signal">Contact</p>
          <h1 className="mt-4 text-4xl font-medium leading-tight text-mist-100 sm:text-5xl">
            Start a project.
          </h1>
          <p className="mt-6 max-w-md text-mist-400">
            Tell us what you need surveyed, inspected, monitored, or built — we&rsquo;ll
            follow up with scope and timeline.
          </p>
          <a
            href="mailto:lotusmirkaerospace@gmail.com"
            className="mt-8 inline-block text-sm font-medium text-mist-200 underline decoration-ink-600 decoration-1 underline-offset-8 transition-colors hover:text-signal hover:decoration-signal"
          >
            lotusmirkaerospace@gmail.com
          </a>
          <p className="mt-2 text-sm text-mist-400">Mumbai, India</p>
        </Reveal>
        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </div>
  )
}
