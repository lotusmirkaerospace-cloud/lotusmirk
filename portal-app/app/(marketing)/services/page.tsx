import { ScrollReveal } from "@/components/motion/ScrollReveal";

// PLACEHOLDER COPY — replace with real service specs, equipment, and
// deliverable formats once provided. See README.md.
const SERVICES = [
  {
    title: "Aerial Survey & Mapping",
    body: "Orthomosaic and topographic mapping across large sites, delivered in GIS-standard formats for direct use in planning and analysis workflows.",
    deliverables: ["Orthomosaic imagery", "Elevation/contour data", "GIS-ready exports"],
  },
  {
    title: "3D Modeling & Photogrammetry",
    body: "Photogrammetric reconstruction of structures, terrain, and assets from overlapping aerial imagery, viewable directly inside your client portal.",
    deliverables: [".obj / textured mesh", "Point cloud exports", "In-portal 3D viewer"],
  },
  {
    title: "Site Documentation & Virtual Tours",
    body: "Recurring capture for progress tracking, plus 360° virtual tours for stakeholders who can't walk the site in person.",
    deliverables: ["360° tour links", "Dated progress imagery", "Comparison-ready archives"],
  },
  {
    title: "Aerial Video & Photography",
    body: "Cinematic aerial footage and stills for marketing, inspection reporting, and stakeholder presentations.",
    deliverables: ["Edited video", "High-resolution stills", "Raw footage on request"],
  },
];

export default function ServicesPage() {
  return (
    <div className="px-6 pb-28 pt-40 sm:px-10">
      <ScrollReveal>
        <h1 className="max-w-2xl text-4xl font-semibold sm:text-5xl">
          Services
        </h1>
      </ScrollReveal>

      <div className="mt-16 space-y-16">
        {SERVICES.map((service, i) => (
          <ScrollReveal key={service.title} delay={i * 0.05}>
            <div className="grid grid-cols-1 gap-6 border-t border-white/10 pt-10 sm:grid-cols-3">
              <h2 className="text-2xl font-medium">{service.title}</h2>
              <p className="text-white/60 sm:col-span-2">{service.body}</p>
              <div className="sm:col-start-2 sm:col-span-2">
                <ul className="flex flex-wrap gap-2">
                  {service.deliverables.map((d) => (
                    <li
                      key={d}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60"
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
