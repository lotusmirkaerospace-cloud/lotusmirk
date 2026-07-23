import Link from "next/link";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

// PLACEHOLDER COPY — every headline, stat, and service description on this
// page is a stand-in. Swap in real LotusMirk Aerospace content (services,
// completed-project case study, certifications, footage) before shipping;
// see README.md "What's still a placeholder."
const SERVICES = [
  {
    title: "Aerial Survey & Mapping",
    description:
      "Large-area orthomosaic and topographic capture, delivered as GIS-ready imagery.",
  },
  {
    title: "3D Modeling & Photogrammetry",
    description:
      "Photogrammetric 3D reconstructions of sites, structures, and terrain.",
  },
  {
    title: "Site Documentation & Virtual Tours",
    description:
      "360° walkthroughs and progress-tracking capture for ongoing projects.",
  },
  {
    title: "Aerial Video & Photography",
    description:
      "Cinematic aerial footage and stills for marketing, inspection, and reporting.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative flex min-h-screen items-center overflow-hidden px-6 sm:px-10">
        {/* Placeholder hero background — replace with real aerial/drone footage
            (a <video> with poster, or a full-bleed image) once assets are in. */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_#1a2230_0%,_#0b0d10_65%)]" />

        <div className="max-w-3xl pt-24">
          <ScrollReveal>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-white/50">
              Drone-as-a-Service · Maharashtra, India
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
              See your site from
              <br />
              every angle.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-6 max-w-xl text-lg text-white/60">
              LotusMirk Aerospace captures, models, and delivers aerial data —
              survey-grade mapping, 3D reconstructions, and site documentation
              your team can act on.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90"
              >
                Start a project
              </Link>
              <Link
                href="/services"
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:border-white/50"
              >
                View services
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="px-6 py-28 sm:px-10">
        <ScrollReveal>
          <h2 className="mb-12 text-sm font-medium uppercase tracking-[0.2em] text-white/50">
            What we do
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-white/10 p-6 transition hover:border-white/30">
                <h3 className="text-lg font-medium">{service.title}</h3>
                <p className="mt-3 text-sm text-white/60">
                  {service.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="px-6 py-28 sm:px-10">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/[0.02] p-10 text-center sm:p-16">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Already a client or vendor?
            </h2>
            <p className="mt-4 text-white/60">
              Deliverables, 3D models, imagery, and project tours are all in
              your portal.
            </p>
            <Link
              href="/portal"
              className="mt-8 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90"
            >
              Open portal
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
