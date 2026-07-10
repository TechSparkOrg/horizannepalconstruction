import { Ruler, PenTool, Home, Building2 } from "lucide-react";

const services = [
  {
    num: "01",
    icon: Home,
    title: "Residential Design",
    desc: "Custom homes, villas, and apartments designed around your lifestyle and site conditions.",
  },
  {
    num: "02",
    icon: Building2,
    title: "Commercial Design",
    desc: "Office spaces, retail outlets, and mixed-use buildings that balance aesthetics with functionality.",
  },
  {
    num: "03",
    icon: PenTool,
    title: "Interior Design",
    desc: "Tailored interior solutions that optimise space, lighting, material harmony, and brand identity.",
  },
  {
    num: "04",
    icon: Ruler,
    title: "Heritage & Restoration",
    desc: "Sensitive restoration and adaptive reuse of historic structures, preserving character while meeting modern standards.",
  },
];

export function DesignServices() {
  return (
    <section className="bg-[#f8fafc] py-20 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header — left-aligned editorial */}
        <div className="max-w-xl mb-14">
          <p className="text-[#cd2028] text-[11px] font-bold tracking-[0.24em] uppercase mb-3 flex items-center gap-2.5">
            <span className="block w-4 h-px bg-[#cd2028]" aria-hidden="true" />
            What We Design
          </p>
          <h2 className="font-display font-black text-brand-dark text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.08] tracking-[-0.02em]">
            Our Design Capabilities
          </h2>
          <p className="mt-4 text-[#64748b] text-[15px] leading-relaxed">
            From the first sketch to the final detail — our architects and designers bring your vision to life.
          </p>
        </div>

        {/* 2×2 editorial grid with ruled borders */}
        <div className="grid sm:grid-cols-2 gap-px bg-[#e2e8f0] border border-[#e2e8f0] rounded-2xl overflow-hidden shadow-sm">
          {services.map((s) => (
            <div
              key={s.title}
              className="group relative bg-white p-8 sm:p-10 hover:bg-[#f8fafc] transition-colors duration-200 overflow-hidden"
            >
              {/* Watermark number */}
              <span
                className="absolute top-4 right-5 font-black leading-none select-none text-[#f1f5f9] group-hover:text-[#e8edf8] transition-colors"
                style={{ fontSize: "clamp(3rem,6vw,4rem)" }}
                aria-hidden="true"
              >
                {s.num}
              </span>

              {/* Icon */}
              <div className="relative size-11 rounded-xl bg-brand-primary/8 flex items-center justify-center text-brand-primary mb-6 group-hover:bg-brand-primary group-hover:text-white transition-all duration-200">
                <s.icon className="size-5" />
              </div>

              {/* Copy */}
              <h3 className="font-display font-bold text-[17px] text-brand-dark leading-snug">
                {s.title}
              </h3>
              <p className="mt-2.5 text-[13.5px] text-[#64748b] leading-relaxed max-w-[290px]">
                {s.desc}
              </p>

              {/* Bottom hover accent */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#cd2028] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
