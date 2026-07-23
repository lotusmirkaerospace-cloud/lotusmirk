import { ScrollReveal } from "@/components/motion/ScrollReveal";

// PLACEHOLDER COPY — replace with LotusMirk's real founding story,
// certifications, and equipment list once provided. See README.md.
export default function AboutPage() {
  return (
    <div className="px-6 pb-28 pt-40 sm:px-10">
      <ScrollReveal>
        <h1 className="max-w-2xl text-4xl font-semibold sm:text-5xl">
          About LotusMirk Aerospace
        </h1>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <p className="mt-8 max-w-2xl text-lg text-white/60">
          Lotusmirk Ventures (OPC) Private Limited operates as LotusMirk
          Aerospace, a drone-as-a-service company based in Maharashtra,
          India. [Replace with real founding story, mission, and what sets
          the team apart.]
        </p>
      </ScrollReveal>

      <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3">
        {[
          { label: "Certifications", value: "[Add real credentials]" },
          { label: "Equipment", value: "[Add real fleet/sensor list]" },
          { label: "Coverage area", value: "[Add real service region]" },
        ].map((item, i) => (
          <ScrollReveal key={item.label} delay={i * 0.08}>
            <div className="rounded-2xl border border-white/10 p-6">
              <h2 className="text-sm font-medium uppercase tracking-wide text-white/40">
                {item.label}
              </h2>
              <p className="mt-3 text-white/70">{item.value}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
