import {
  Handshake,
  MessageCircle,
  MapPin,
  PenTool,
  CheckCircle2,
  Construction,
  Home,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";

const STEP_ICONS = [
  Handshake,
  MessageCircle,
  MapPin,
  PenTool,
  CheckCircle2,
  Construction,
  Home,
];

const steps = [
  {
    title: "Initial Consultation",
    body: "We meet with you to understand your vision, requirements, and budget. This helps us tailor our approach to your specific needs and goals.",
    highlights: ["Free site visit & assessment", "Budget & timeline discussion", "No obligation quote"],
  },
  {
    title: "Concept Design",
    body: "Our architects develop preliminary designs, sketches, and 3D visualisations that bring your ideas to life while accounting for site conditions and regulations.",
    highlights: ["Preliminary floor plans", "3D renderings & walkthrough", "Material mood boards"],
  },
  {
    title: "Site Assessment",
    body: "We conduct a thorough evaluation of your property — analysing topography, soil conditions, infrastructure access, and environmental factors.",
    highlights: ["Topography & soil analysis", "Infrastructure audit", "Environmental impact check"],
  },
  {
    title: "Detailed Planning",
    body: "Engineering drawings, material specifications, cost estimates, and permit applications are prepared to ensure every detail is accounted for.",
    highlights: ["Structural & MEP drawings", "Detailed BOQ & cost estimate", "Permit application ready"],
  },
  {
    title: "Approvals & Permits",
    body: "We handle all municipal approvals, building permits, and regulatory clearances so you can focus on the exciting parts of your project.",
    highlights: ["Municipal approvals handled", "Building permits secured", "Compliance certified"],
  },
  {
    title: "Construction",
    body: "Our skilled teams break ground and build according to the approved plans, with regular quality checks and on-site project management.",
    highlights: ["Dedicated project manager", "Weekly progress reports", "Quality & safety audits"],
  },
  {
    title: "Handover & Support",
    body: "We walk you through the completed project, provide all necessary documentation, and remain available for post-completion support.",
    highlights: ["Final walkthrough", "Documentation & warranties", "Post-completion support"],
  },
];

export function HowWeWorkProcess() {
  return (
    <section id="process" className="bg-off-white py-16 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <SectionLabel>Our Process</SectionLabel>
          <h2 className="mt-3 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-5xl">
            How We Bring Your Vision to Life
          </h2>
          <p className="mt-4 text-mid-gray text-lg">
            A proven seven-step process that takes your project from idea to completion with clarity and confidence.
          </p>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-light-gray hidden lg:block" />

          {steps.map((s, idx) => {
            const Icon = STEP_ICONS[idx % STEP_ICONS.length];
            const isLeft = idx % 2 === 0;

            return (
              <div
                key={s.title}
                className={`relative flex items-start gap-6 lg:gap-0 pb-14 last:pb-0 ${
                  isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                <div className={`hidden lg:block w-1/2 ${isLeft ? "pr-14 text-right" : "pl-14 text-left"}`}>
                  <div className={`inline-block bg-white rounded-2xl p-6 border border-light-gray/40 shadow-[0_4px_24px_rgba(0,0,0,0.04)] max-w-[480px] ${
                    isLeft ? "text-left" : "text-left"
                  }`}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="size-7 rounded-full bg-brand-primary text-white text-xs font-bold grid place-items-center shrink-0">
                        {idx + 1}
                      </span>
                      <h3 className="font-display font-bold text-lg sm:text-xl text-brand-secondary">
                        {s.title}
                      </h3>
                    </div>
                    <p className="text-sm sm:text-base text-mid-gray leading-relaxed">
                      {s.body}
                    </p>
                    <ul className="mt-4 space-y-1.5">
                      {s.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2 text-xs text-brand-dark font-medium">
                          <span className="size-1.5 rounded-full bg-brand-primary shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="shrink-0 relative z-10 hidden lg:flex items-center justify-center">
                  <div className="size-12 rounded-full bg-white border-2 border-brand-primary/20 flex items-center justify-center shadow-md">
                    <Icon className="size-5 text-brand-primary" />
                  </div>
                </div>

                <div className="lg:hidden flex-1">
                  <div className="relative pl-10 before:absolute before:left-[19px] before:top-3 before:bottom-3 before:w-0.5 before:bg-light-gray">
                    <div className="absolute left-0 top-0 size-9 rounded-full bg-white border-2 border-brand-primary/20 flex items-center justify-center shadow-sm">
                      <Icon className="size-4 text-brand-primary" />
                    </div>
                    <div className="bg-white rounded-2xl p-5 border border-light-gray/40 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="size-6 rounded-full bg-brand-primary text-white text-[10px] font-bold grid place-items-center shrink-0">
                          {idx + 1}
                        </span>
                        <h3 className="font-display font-bold text-base text-brand-secondary">
                          {s.title}
                        </h3>
                      </div>
                      <p className="text-sm text-mid-gray leading-relaxed">
                        {s.body}
                      </p>
                      <ul className="mt-3 space-y-1">
                        {s.highlights.map((h) => (
                          <li key={h} className="flex items-center gap-1.5 text-xs text-brand-dark font-medium">
                            <span className="size-1.5 rounded-full bg-brand-primary shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="hidden lg:block w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
