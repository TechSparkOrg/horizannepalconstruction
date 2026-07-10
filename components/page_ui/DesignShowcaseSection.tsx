import { Layers, Cpu, ShieldCheck } from "lucide-react";

const pillars = [
  {
    icon: Layers,
    stat: "2D → 3D",
    title: "Full-Spectrum Design",
    desc: "Concept sketches, CAD floor plans, and photorealistic 3D renders — every deliverable under one roof.",
  },
  {
    icon: Cpu,
    stat: "BIM Ready",
    title: "Technology-Driven",
    desc: "We use Building Information Modelling to catch clashes early, saving time and cost before ground breaks.",
  },
  {
    icon: ShieldCheck,
    stat: "NBC Compliant",
    title: "Code Certified",
    desc: "All designs conform to Nepal National Building Code standards for structural safety and permits.",
  },
];

export function DesignShowcaseSection() {
  return (
    <section className="bg-brand-dark py-16 sm:py-20" aria-label="Design pillars">
      {/* Top rule */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-10">
          <span className="block w-8 h-px bg-[#cd2028]" aria-hidden="true" />
          <p className="text-[#cd2028] text-[11px] font-bold tracking-[0.26em] uppercase">
            Why Design With Us
          </p>
        </div>

        {/* Three-column strip */}
        <div className="grid sm:grid-cols-3 gap-px bg-white/8 border border-white/8 rounded-2xl overflow-hidden">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="group relative bg-brand-dark hover:bg-white/[0.04] transition-colors duration-200 px-7 py-8 sm:py-10"
            >
              {/* Icon */}
              <div className="size-10 rounded-xl bg-white/8 flex items-center justify-center text-[#3b82f6] mb-5 group-hover:bg-[#1d4ed8] group-hover:text-white transition-colors duration-200">
                <p.icon className="size-5" />
              </div>

              {/* Stat */}
              <p className="text-[#cd2028] font-black text-[22px] leading-none mb-2">
                {p.stat}
              </p>

              {/* Title */}
              <h3 className="font-display font-bold text-white text-[15px] leading-snug mb-2">
                {p.title}
              </h3>

              {/* Desc */}
              <p className="text-white/50 text-[13px] leading-relaxed">
                {p.desc}
              </p>

              {/* Left accent on hover */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#cd2028] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
