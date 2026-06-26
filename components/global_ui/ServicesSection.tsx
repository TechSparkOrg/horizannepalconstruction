"use client";

import {
  PencilRuler, LayoutGrid, Compass,
  FileBadge, Boxes, Wrench,
} from "lucide-react";

const services = [
  {
    icon: PencilRuler,
    title: "Architectural Design",
    description: "Custom blueprints and concept plans tailored to your vision and site requirements.",
  },
  {
    icon: LayoutGrid,
    title: "Floor Planning",
    description: "Detailed 2D and 3D floor plans optimized for flow, function, and space efficiency.",
  },
  {
    icon: Compass,
    title: "Vastu Shastra",
    description: "Directional alignment and spatial harmony guided by traditional Vastu principles.",
  },
  {
    icon: FileBadge,
    title: "Building Permits",
    description: "End-to-end documentation and municipal approval handling for your project.",
  },
  {
    icon: Boxes,
    title: "Materials Supply",
    description: "Sourcing quality construction materials at competitive rates with reliable delivery.",
  },
  {
    icon: Wrench,
    title: "Construction",
    description: "Full-build execution with skilled teams, timeline adherence, and quality assurance.",
  },
];

export function ServicesSection() {
  return (
    <section className="py-16 bg-off-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-[520px] mx-auto mb-12">
          <span className="inline-flex items-center h-[26px] px-3 bg-white border border-light-gray rounded-full text-[11px] font-semibold tracking-[0.12em] uppercase text-brand-primary">
            What We Offer
          </span>
          <h2 className="mt-4 text-[32px] sm:text-[38px] font-bold text-brand-dark tracking-tight leading-[1.15]">
            Our Services
          </h2>
          <p className="mt-3 text-[14.5px] leading-relaxed text-mid-gray">
            Comprehensive architectural and construction services — from first sketch to final handover.
          </p>
        </div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 rounded-2xl overflow-hidden border border-light-gray"
          style={{ background: "var(--color-light-gray)", gap: "1px" }}
        >
          {services.map((s, i) => (
            <div
              key={s.title}
              className="group relative bg-white hover:bg-accent transition-colors duration-150 p-7"
            >
              {/* Step number */}
              <span className="absolute top-5 right-[22px] text-[11px] font-bold tracking-wide text-light-gray group-hover:text-brand-primary transition-colors duration-150">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Icon */}
              <div className="size-[42px] rounded-[10px] flex items-center justify-center mb-[18px] bg-accent text-brand-primary group-hover:bg-brand-dark group-hover:text-white transition-colors duration-150">
                <s.icon className="size-5" />
              </div>

              {/* Text */}
              <h3 className="text-[15px] font-semibold text-brand-dark leading-snug mb-2">
                {s.title}
              </h3>
              <p className="text-[13px] leading-relaxed text-mid-gray">
                {s.description}
              </p>

              {/* Bottom line */}
              <div className="absolute bottom-0 left-7 right-7 h-0.5 rounded-full bg-brand-dark origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}