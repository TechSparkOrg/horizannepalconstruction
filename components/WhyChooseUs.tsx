import { Building2, BadgeCheck, Users, ShieldCheck } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";

const reasons = [
  {
    title: "Modern Construction",
    description:
      "Cutting-edge techniques and premium materials delivering structures that meet international standards.",
    icon: Building2,
    accent: "oklch(0.55 0.15 35)",
    iconBg: "oklch(0.97 0.03 35)",
    line: "oklch(0.55 0.15 35)",
  },
  {
    title: "Quality Assured",
    description:
      "Rigorous quality checks at every stage — excellence from foundation to finish, without exception.",
    icon: BadgeCheck,
    accent: "oklch(0.45 0.13 145)",
    iconBg: "oklch(0.96 0.04 145)",
    line: "oklch(0.45 0.13 145)",
  },
  {
    title: "Expert Team",
    description:
      "Architects, engineers, and designers with decades of combined experience on every project.",
    icon: Users,
    accent: "oklch(0.45 0.15 240)",
    iconBg: "oklch(0.96 0.03 240)",
    line: "oklch(0.45 0.15 240)",
  },
  {
    title: "Trust & Reliability",
    description:
      "50+ successful projects and countless satisfied clients. Our reputation across Nepal speaks for itself.",
    icon: ShieldCheck,
    accent: "oklch(0.45 0.18 275)",
    iconBg: "oklch(0.96 0.04 275)",
    line: "oklch(0.45 0.18 275)",
  },
];

const stats = [
  { value: "50+", label: "Projects delivered" },
  { value: "12+", label: "Years in Nepal" },
  { value: "98%", label: "Client satisfaction" },
  { value: "200+", label: "Happy clients" },
];

export function WhyChooseUs() {
  return (
    <section className="bg-off-white py-16 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <SectionLabel>Why Horizon Nepal</SectionLabel>
          <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight text-brand-dark">
            Built different.<br />Built to last.
          </h2>
          <p className="mt-4 text-lg text-mid-gray">
            We bring expertise, integrity, and innovation to every project — big or small.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border rounded-2xl overflow-hidden border-light-gray/50"
        >
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className={`group relative bg-white p-8 transition-colors duration-300 hover:bg-stone-50 ${i < reasons.length - 1 ? "border-r border-light-gray/50" : ""}`}
            >
              {/* Step number — fades in on hover */}
              <span
                className="absolute top-5 right-5 text-xs font-medium tracking-wide text-mid-gray opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                0{i + 1}
              </span>

              {/* Icon */}
              <div
                className="size-11 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: r.iconBg, color: r.accent }}
              >
                <r.icon className="size-6" />
              </div>

              {/* Text */}
              <h3 className="mt-5 font-display font-bold text-xl text-brand-dark">
                {r.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-mid-gray">
                {r.description}
              </p>

              {/* Animated bottom line */}
              <div
                className="absolute bottom-0 left-7 right-7 h-0.5 rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
                style={{ backgroundColor: r.line }}
              />
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-10 pt-8 flex flex-wrap justify-center items-center gap-x-10 gap-y-6 border-t border-light-gray/50">
          {stats.map((s, i) => (
            <div key={s.label} className="flex items-center gap-10">
              <div className="text-center">
                <div className="font-display font-bold text-3xl text-brand-dark">
                  {s.value}
                </div>
                <div className="mt-1 text-xs uppercase tracking-widest text-mid-gray">
                  {s.label}
                </div>
              </div>
              {i < stats.length - 1 && (
                <div className="hidden sm:block w-px h-10 bg-light-gray/50" />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}