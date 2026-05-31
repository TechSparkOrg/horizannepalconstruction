import { SectionLabel } from "@/components/ui/SectionLabel";
import { Ruler, PenTool, Home, Building2 } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Residential Design",
    desc: "Custom homes, villas, and apartments designed around your lifestyle and site conditions.",
  },
  {
    icon: Building2,
    title: "Commercial Design",
    desc: "Office spaces, retail outlets, and mixed-use buildings that balance aesthetics with functionality.",
  },
  {
    icon: PenTool,
    title: "Interior Design",
    desc: "Tailored interior solutions that optimise space, lighting, material harmony, and brand identity.",
  },
  {
    icon: Ruler,
    title: "Heritage & Restoration",
    desc: "Sensitive restoration and adaptive reuse of historic structures, preserving character while meeting modern standards.",
  },
];

export function DesignServices() {
  return (
    <section className="bg-white py-16 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <SectionLabel>What We Design</SectionLabel>
          <h2 className="mt-3 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-5xl">
            Our Design Capabilities
          </h2>
          <p className="mt-4 text-mid-gray text-lg">
            From the first sketch to the final detail — our architects and designers bring your vision to life.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <div key={s.title} className="bg-off-white rounded-2xl p-6 border border-light-gray/40 hover:shadow-md transition-shadow">
              <div className="size-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-4">
                <s.icon className="size-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-brand-dark">{s.title}</h3>
              <p className="mt-2 text-sm text-mid-gray leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
