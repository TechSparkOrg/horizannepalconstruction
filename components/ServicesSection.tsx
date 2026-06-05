import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  Building2,
  Ruler,
  ClipboardList,
  Armchair,
  Package,
  ShieldCheck,
} from "lucide-react";

const services = [
  {
    title: "Architectural Design",
    description:
      "Innovative, context-sensitive designs that blend aesthetics with functionality — from residential homes to commercial landmarks.",
    icon: Building2,
    accent: "#4B5DDB",
  },
  {
    title: "Engineering & Structure",
    description:
      "Structural, civil, and MEP engineering that ensures safety, durability, and efficiency in every project we undertake.",
    icon: Ruler,
    accent: "#0F766E",
  },
  {
    title: "Construction Management",
    description:
      "End-to-end project oversight — procurement, scheduling, quality control, and site supervision to keep your build on track.",
    icon: ClipboardList,
    accent: "#B45309",
  },
  {
    title: "Interior Design",
    description:
      "Tailored interior solutions that reflect your style and optimise space, lighting, and material harmony.",
    icon: Armchair,
    accent: "#7C3AED",
  },
  {
    title: "Material Consultation",
    description:
      "Expert guidance on sourcing and selecting the right materials — balancing cost, durability, aesthetics, and sustainability.",
    icon: Package,
    accent: "#D97706",
  },
  {
    title: "Site Supervision",
    description:
      "Dedicated on-site engineers and supervisors ensuring every phase of construction meets design specifications and safety standards.",
    icon: ShieldCheck,
    accent: "#059669",
  },
];

export function ServicesSection() {
  return (
    <section className="py-16  bg-off-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <SectionLabel>What We Offer</SectionLabel>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl text-brand-dark">
            Our Services
          </h2>
          <p className="mt-4 text-base leading-relaxed text-mid-gray">
            Comprehensive architectural and construction services — from first sketch to final handover.
          </p>
        </div>

        {/* Connected grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 rounded-2xl overflow-hidden border border-light-gray/50">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="group relative bg-white hover:-translate-y-0.5 transition-all duration-300 p-7"
              style={{ borderBottom: "1px solid color-mix(in oklch, var(--color-light-gray) 50%, transparent)", borderRight: i % 3 !== 2 ? "1px solid color-mix(in oklch, var(--color-light-gray) 50%, transparent)" : "none" }}
            >
              {/* Step number — fades in on hover */}
              <span className="absolute top-5 right-5 text-xs font-medium tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: s.accent }}>
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Icon */}
              <div
                className="size-11 rounded-xl flex items-center justify-center mb-5 transition-colors duration-200 group-hover:text-white"
                style={{ background: `${s.accent}12`, color: s.accent }}
              >
                <s.icon className="size-5" />
              </div>

              {/* Text */}
              <h3 className="font-display text-lg leading-snug mb-2 text-brand-dark">
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed text-mid-gray">
                {s.description}
              </p>

              {/* Animated bottom line */}
              <div
                className="absolute bottom-0 left-7 right-7 h-0.5 rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
                style={{ background: s.accent }}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}