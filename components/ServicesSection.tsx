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
  },
  {
    title: "Engineering & Structure",
    description:
      "Structural, civil, and MEP engineering that ensures safety, durability, and efficiency in every project we undertake.",
    icon: Ruler,
  },
  {
    title: "Construction Management",
    description:
      "End-to-end project oversight — procurement, scheduling, quality control, and site supervision to keep your build on track.",
    icon: ClipboardList,
  },
  {
    title: "Interior Design",
    description:
      "Tailored interior solutions that reflect your style and optimise space, lighting, and material harmony.",
    icon: Armchair,
  },
  {
    title: "Material Consultation",
    description:
      "Expert guidance on sourcing and selecting the right materials — balancing cost, durability, aesthetics, and sustainability.",
    icon: Package,
  },
  {
    title: "Site Supervision",
    description:
      "Dedicated on-site engineers and supervisors ensuring every phase of construction meets design specifications and safety standards.",
    icon: ShieldCheck,
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
        <div
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 rounded-2xl overflow-hidden border border-light-gray/50"
          style={{ gap: "1px", backgroundColor: "color-mix(in oklch, var(--color-light-gray) 50%, transparent)" }}
        >
          {services.map((s, i) => (
            <div
              key={s.title}
              className="group relative bg-white hover:bg-stone-50 transition-colors duration-200 p-7"
            >
              {/* Step number — fades in on hover */}
              <span className="absolute top-5 right-5 text-xs font-medium tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-brand-secondary/50">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Icon */}
              <div className="size-11 rounded-xl bg-brand-secondary/10 text-brand-secondary flex items-center justify-center mb-5">
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
              <div className="absolute bottom-0 left-7 right-7 h-0.5 rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out bg-brand-secondary" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}