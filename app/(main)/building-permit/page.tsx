"use client";

import { useEffect } from "react";
import { FileText, Building2, TriangleAlert, Wind, Flame, Clock } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import { useClientStore } from "@/stores/client-store";
import { BannerCarousel } from "@/components/BannerCarousel";

const REG_ICONS = [Building2, TriangleAlert, Flame, Wind];

export default function BuildingPermitPage() {
  const { buildingPermitConfig, fetchBuildingPermitConfig } = useClientStore(useShallow((s) => ({
    buildingPermitConfig: s.buildingPermitConfig,
    fetchBuildingPermitConfig: s.fetchBuildingPermitConfig,
  })));

  useEffect(() => {
    fetchBuildingPermitConfig();
  }, [fetchBuildingPermitConfig]);

  const workflowSteps = buildingPermitConfig?.workflow_steps ?? [];
  const docCategories = buildingPermitConfig?.doc_categories ?? [];
  const regulations = buildingPermitConfig?.regulations ?? [];
  const municipalities = buildingPermitConfig?.municipalities ?? [];

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-brand-dark">
        <BannerCarousel slug="building-permit-page-hero" imgClassName="object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 to-brand-dark/70" />
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-16">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-white/60 bg-white/10 px-3 py-1 rounded-full border border-white/10 inline-block">Tools</span>
            <h1 className="font-display font-bold text-white mt-6 leading-[1.08]" style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}>
              Building Permit<br />Assistant
            </h1>
            <p className="mt-4 text-white/80 text-lg max-w-[540px] leading-relaxed font-semibold">Navigate Nepal&apos;s building permit process with confidence.</p>
            <div className="mt-8">
              <a href="#workflow" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary text-white text-sm font-semibold rounded-xl hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/30">
                <FileText className="size-4" />
                Get Permit Assistance
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Nepal Permit Workflow */}
      <section id="workflow" className="bg-white py-20 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-brand-primary bg-brand-primary/5 px-3 py-1 rounded-full">Workflow</span>
            <h2 className="mt-3 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-5xl">Nepal Permit Workflow</h2>
            <p className="mt-3 text-mid-gray text-lg">Follow this step-by-step process to obtain your building permit.</p>
          </div>

          <div className="mt-14 space-y-8">
            {workflowSteps.map((step, i) => (
              <div key={step.num} className="relative flex gap-6">
                {i < workflowSteps.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-px bg-gradient-to-b from-brand-primary/40 to-brand-secondary/20 hidden sm:block" />
                )}
                <div className="hidden sm:flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-primary to-brand-primary/80 text-white font-bold text-lg shadow-lg shadow-brand-primary/25">
                  {step.num}
                </div>
                <div className="flex-1 bg-off-white rounded-2xl p-6 sm:p-8 border border-light-gray/40">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="sm:hidden flex size-8 items-center justify-center rounded-full bg-brand-primary text-white font-bold text-xs">
                        {step.num}
                      </div>
                      <h3 className="font-display font-bold text-xl text-brand-dark">{step.title.en}</h3>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-full shrink-0">
                      <Clock className="size-3" />
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-mid-gray text-sm leading-relaxed">{step.desc.en}</p>
                  <div className="mt-4 pt-4 border-t border-light-gray/40">
                    <p className="text-xs font-semibold text-mid-gray/70 uppercase tracking-wide mb-2">Required:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {step.docs.map((doc) => (
                        <span key={doc} className="text-xs text-brand-dark bg-white px-2.5 py-1 rounded-lg border border-light-gray/30">
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Document Checklist */}
      <section className="bg-off-white py-20 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-brand-primary bg-brand-primary/5 px-3 py-1 rounded-full">Checklist</span>
            <h2 className="mt-3 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-5xl">Document Checklist</h2>
            <p className="mt-3 text-mid-gray text-lg">Ensure you have all the required documents before applying.</p>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {docCategories.map((cat) => (
              <div key={cat.label.en} className="bg-white rounded-2xl p-6 border border-light-gray/40">
                <h3 className="font-display font-bold text-base text-brand-primary mb-4 pb-3 border-b border-light-gray/30">{cat.label.en}</h3>
                <ul className="space-y-2.5">
                  {cat.items.map((item) => (
                    <li key={item.en} className="flex items-start gap-2 text-sm text-mid-gray">
                      <span className="size-1.5 rounded-full bg-brand-secondary/40 shrink-0 mt-1.5" />
                      {item.en}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulations */}
      <section className="bg-white py-20 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-brand-primary bg-brand-primary/5 px-3 py-1 rounded-full">Regulations</span>
            <h2 className="mt-3 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-5xl">Building Regulations</h2>
            <p className="mt-3 text-mid-gray text-lg">Key regulations you need to comply with in Nepal.</p>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 gap-5">
            {regulations.map((reg, i) => {
              const Icon = REG_ICONS[i] || Building2;
              return (
                <div key={reg.title.en} className="bg-off-white rounded-2xl p-6 border border-light-gray/40">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="size-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-brand-dark">{reg.title.en}</h3>
                  </div>
                  <ul className="space-y-2">
                    {reg.items.map((item) => (
                      <li key={item.en} className="flex items-start gap-2 text-sm text-mid-gray">
                        <span className="size-1 rounded-full bg-brand-primary/40 shrink-0 mt-2" />
                        {item.en}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Municipality Directory */}
      <section className="bg-off-white py-20 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-brand-primary bg-brand-primary/5 px-3 py-1 rounded-full">Directory</span>
            <h2 className="mt-3 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-5xl">Municipality Directory</h2>
            <p className="mt-3 text-mid-gray text-lg">Contact your local municipality for permit inquiries.</p>
          </div>

          <div className="mt-12 bg-white rounded-2xl border border-light-gray/40 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand-secondary/5 border-b border-light-gray/40">
                    <th className="text-left font-semibold text-brand-dark px-5 py-3.5">Municipality</th>
                    <th className="text-left font-semibold text-brand-dark px-5 py-3.5">District</th>
                    <th className="text-left font-semibold text-brand-dark px-5 py-3.5">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {municipalities.map((m, i) => (
                    <tr key={m.name} className={i < municipalities.length - 1 ? "border-b border-light-gray/30" : ""}>
                      <td className="px-5 py-3.5 font-medium text-brand-dark">{m.name}</td>
                      <td className="px-5 py-3.5 text-mid-gray">{m.district}</td>
                      <td className="px-5 py-3.5">
                        <a href={"tel:" + m.phone} className="text-brand-primary font-medium hover:underline">{m.phone}</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
