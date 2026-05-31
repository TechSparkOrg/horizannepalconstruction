import { SectionLabel } from "@/components/ui/SectionLabel";
import { Percent, Calculator, FileText, Clock } from "lucide-react";

const factors = [
  {
    icon: Calculator,
    title: "Project Scope",
    desc: "Size, complexity, and type of project significantly influence the overall cost. A standard home differs from a commercial complex.",
  },
  {
    icon: Percent,
    title: "Material Selection",
    desc: "We source materials that balance quality and budget — from local stone and brick to imported finishes, with full transparency on costs.",
  },
  {
    icon: FileText,
    title: "Labour & Expertise",
    desc: "Skilled labour, engineers, and supervisors are factored into every estimate. We use experienced teams at fair market rates.",
  },
  {
    icon: Clock,
    title: "Timeline & Phasing",
    desc: "Rushed timelines or phased construction can affect costs. We help you plan a schedule that fits your budget and needs.",
  },
];

export function CostEstimationContent() {
  return (
    <section className="bg-white py-16 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <SectionLabel>How We Price</SectionLabel>
          <h2 className="mt-3 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-5xl">
            Factors That Affect Your Estimate
          </h2>
          <p className="mt-4 text-mid-gray text-lg">
            Every project is unique. Here&apos;s what goes into our cost calculations.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {factors.map((f) => (
            <div key={f.title} className="bg-off-white rounded-2xl p-6 border border-light-gray/40">
              <div className="size-12 rounded-xl bg-brand-secondary/10 flex items-center justify-center text-brand-secondary mb-4">
                <f.icon className="size-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-brand-dark">{f.title}</h3>
              <p className="mt-2 text-sm text-mid-gray leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
