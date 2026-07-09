"use client"

import { Building2, TriangleAlert, Wind, Flame, Clock, ArrowRight } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";
import type { BuildingPermitConfig, WorkflowStep, RegulationItem, MunicipalityItem } from "@/api/types/building-permit.types";
import type { Page } from "@/api/types/page.types";

const ParsedContent = dynamic(() => import("@/lib/Parse-Content"), { ssr: false })

const REG_ICONS = [Building2, TriangleAlert, Flame, Wind];

function WorkflowTimeline({ steps }: { steps: WorkflowStep[] }) {
  return (
    <section id="workflow" className="bg-white py-16 sm:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading — crane SVGs flank the text, same pattern as Vastu tools */}
        <div className="flex items-center justify-center gap-6 mb-12">

          <Image
            src="/video-gif/constuction-up-carain.svg"
            alt="Construction crane illustration"
            width={90} height={130}
            className="hidden sm:block w-[70px] lg:w-[90px] h-auto object-contain shrink-0"
            unoptimized
          />

          <div className="text-center shrink-0">
            <div className="inline-flex items-center gap-3 mb-2">
              <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
              <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#cd2028]">Step by Step</p>
              <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
            </div>
            <h2 className="font-display font-bold text-[#0f2557] text-2xl sm:text-3xl tracking-tight">Nepal Permit Workflow</h2>
            <p className="mt-1.5 text-[13px] text-[#64748b] max-w-[360px] leading-relaxed">Follow this step-by-step process to obtain your building permit.</p>
          </div>

          <Image
            src="/video-gif/in-progress.svg"
            alt="Construction crane illustration"
            width={90} height={130}
            className="hidden sm:block w-[70px] lg:w-[90px] h-auto object-contain shrink-0 scale-x-[-1]"
            unoptimized
          />

        </div>

        <div className="space-y-6">
          {steps.map((step, i) => (
            <div key={step.name} className="relative flex gap-5 sm:gap-6">
              {i < steps.length - 1 && (
                <div className="absolute left-[21px] sm:left-[22px] top-[52px] bottom-0 w-px bg-[#e2e8f0] hidden sm:block" aria-hidden="true" />
              )}
              {/* Step number */}
              <div className="hidden sm:flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#0f2557] text-white font-bold text-[15px] shadow-sm z-10">
                {i + 1}
              </div>
              {/* Card */}
              <div className="flex-1 bg-[#f8fafc] rounded-2xl border border-[#e2e8f0] p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="sm:hidden flex size-7 items-center justify-center rounded-lg bg-[#0f2557] text-white font-bold text-xs shrink-0">
                      {i + 1}
                    </div>
                    <h3 className="font-display font-bold text-[#0f2557] text-[18px] leading-snug">{step.name}</h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#cd2028] bg-[#cd2028]/8 px-2.5 py-1 rounded-full border border-[#cd2028]/15 shrink-0">
                    <Clock className="size-3" />
                    {step.duration}
                  </span>
                </div>
                <div className="text-[14px] text-[#334155] leading-relaxed">
                  <ParsedContent description={step.description.en} />
                </div>
                {step.requiredDocs.length > 0 && (
                  <div className="mt-5 pt-5 border-t border-[#e2e8f0]">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#64748b] mb-3">Required Documents</p>
                    <div className="flex gap-2.5 overflow-x-auto pb-1">
                      {step.requiredDocs.map((doc) => (
                        <div key={doc.name} className="flex-none w-[100px] bg-white rounded-xl border border-[#e2e8f0] overflow-hidden">
                          <div className="h-[72px] overflow-hidden">
                            <img src={doc.imageUrl} alt={doc.name} className="size-full object-cover" />
                          </div>
                          <p className="text-[11px] text-[#0f2557] font-medium text-center px-2 py-1.5 leading-tight">{doc.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RegulationsGrid({ items }: { items: RegulationItem[] }) {
  return (
    <section id="regulations" className="relative bg-[#f8fafc] py-16 sm:py-24 overflow-hidden">
      <Image
        src="/video-gif/builder-constucntion.svg"
        alt=""
        fill
        className="object-contain object-center pointer-events-none select-none"
        style={{ opacity: 0.1 }}
        unoptimized
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="block w-6 h-px bg-[#cd2028]" aria-hidden="true" />
            <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#cd2028]">Regulations</p>
            <span className="block w-6 h-px bg-[#cd2028]" aria-hidden="true" />
          </div>
          <h2 className="font-display font-bold text-[#0f2557] text-2xl sm:text-3xl tracking-tight">Building Regulations</h2>
          <p className="mt-2 text-[13.5px] text-[#64748b] max-w-[480px] mx-auto">Key regulations you need to comply with in Nepal.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {items.map((reg, i) => {
            const Icon = REG_ICONS[i] || Building2;
            return (
              <div key={reg.name} className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="size-10 rounded-xl bg-[#0f2557]/8 flex items-center justify-center text-[#0f2557] shrink-0">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="font-display font-bold text-[#0f2557] text-[17px] leading-snug">{reg.name}</h3>
                </div>
                <ul className="space-y-2.5">
                  {reg.items.map((item) => (
                    <li key={item.en} className="flex items-start gap-2.5">
                      <span className="size-1.5 rounded-full bg-[#cd2028]/50 shrink-0 mt-[7px]" aria-hidden="true" />
                      <span className="text-[13.5px] text-[#334155] leading-snug">{item.en}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MunicipalityTable({ items }: { items: MunicipalityItem[] }) {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-center gap-6 mb-12">

          <Image
            src="/video-gif/sign-document.svg"
            alt="Document signing illustration"
            width={80} height={120}
            className="hidden sm:block w-[65px] lg:w-[80px] h-auto object-contain shrink-0"
            unoptimized
          />

          <div className="text-center shrink-0">
            <div className="inline-flex items-center gap-3 mb-2">
              <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
              <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#cd2028]">Directory</p>
              <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
            </div>
            <h2 className="font-display font-bold text-[#0f2557] text-2xl sm:text-3xl tracking-tight">Municipality Directory</h2>
            <p className="mt-1.5 text-[13px] text-[#64748b] max-w-[360px] leading-relaxed">Contact your local municipality for permit inquiries.</p>
          </div>

          <Image
            src="/video-gif/saftey-warning.svg"
            alt="Document signing illustration"
            width={80} height={120}
            className="hidden sm:block w-[65px] lg:w-[80px] h-auto object-contain shrink-0 scale-x-[-1]"
            unoptimized
          />

        </div>

        <div className="rounded-2xl border border-[#e2e8f0] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#0f2557]">
                  <th scope="col" className="text-left text-[12px] font-bold uppercase tracking-[0.14em] text-white px-5 py-3.5">Municipality</th>
                  <th scope="col" className="text-left text-[12px] font-bold uppercase tracking-[0.14em] text-white px-5 py-3.5">District</th>
                  <th scope="col" className="text-left text-[12px] font-bold uppercase tracking-[0.14em] text-white px-5 py-3.5">Phone</th>
                </tr>
              </thead>
              <tbody>
                {items.map((m, i) => (
                  <tr key={m.district + m.location}
                    className={[
                      i % 2 === 0 ? "bg-white" : "bg-[#f8fafc]",
                      i < items.length - 1 ? "border-b border-[#e2e8f0]" : "",
                    ].join(" ")}
                  >
                    <td className="px-5 py-3.5 text-[13.5px] font-semibold text-[#0f2557]">{m.location}</td>
                    <td className="px-5 py-3.5 text-[13.5px] text-[#334155]">{m.district}</td>
                    <td className="px-5 py-3.5">
                      <a href={"tel:" + m.phone} className="text-[13.5px] text-[#cd2028] font-semibold hover:underline">{m.phone}</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}

export default function BuildingPermitClient({
  config,
  page,
}: {
  config: BuildingPermitConfig
  page?: Page | null
}) {
  return (
    <>
      <section className="relative min-h-[70svh] flex items-center overflow-hidden bg-[#0f2557]">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#cd2028]" aria-hidden="true" />
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,0.02) 0 2px,transparent 2px 16px)" }}
        />
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-8 w-full pt-28 pb-16">
          <div className="flex flex-col lg:flex-row items-center gap-10">

            {/* Left — text */}
            <div className="flex-1 max-w-[560px]">
              <div className="inline-flex items-center gap-2.5 mb-5">
                <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
                <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-white/60">Nepal</span>
                <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
              </div>
              <h2
                className="font-display font-black text-white leading-none tracking-[-0.02em]"
                style={{ fontSize: "clamp(2.4rem,5vw,3.8rem)" }}
              >
                {page?.title || (
                  <>Building<br /><span className="text-[#cd2028]">Permit</span></>
                )}
              </h2>
              <p className="mt-5 text-white/65 text-[15px] leading-relaxed max-w-[460px]">
                Navigate Nepal&apos;s building permit process with confidence — step-by-step guidance, regulations, and municipality contacts.
              </p>
              <div className="mt-8 flex gap-3 flex-wrap">
                <a
                  href="#workflow"
                  className="inline-flex items-center gap-2 h-11 px-7 bg-[#cd2028] hover:bg-[#b91c1c] text-white font-semibold text-sm rounded-xl transition-colors"
                >
                  View Workflow <ArrowRight className="size-4" />
                </a>
                <a
                  href="#regulations"
                  className="inline-flex items-center gap-2 h-11 px-7 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-xl border border-white/20 transition-colors"
                >
                  Regulations
                </a>
              </div>
            </div>

            {/* Right — build-document.svg */}
            <div className="shrink-0 flex items-center justify-center lg:w-[420px]">
              <Image
                src="/video-gif/build-document.svg"
                alt="Building permit documents and approval process illustration"
                width={380} height={380}
                className="w-[200px] sm:w-[300px] lg:w-[380px] h-auto object-contain"
                priority unoptimized
              />
            </div>

          </div>
        </div>
      </section>

      <WorkflowTimeline steps={config.workflow_steps} />
      <RegulationsGrid items={config.regulation_items} />
      <MunicipalityTable items={config.municipality_items} />

      {page?.content && (
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <ParsedContent description={page.content} />
        </div>
      )}
    </>
  )
}
