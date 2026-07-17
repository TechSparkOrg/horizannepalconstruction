"use client";

import { getSvgUrl } from "@/lib/svg-utils";
import { Clock } from "lucide-react";
import Image from "next/image";
import type { WorkflowStep } from "@/api/types/building-permit.types";
import ParsedContent from "@/lib/Parse-Content";

export function WorkflowTimeline({ steps, svgItems }: { steps: WorkflowStep[]; svgItems?: import("@/api/types/page.types").PageSvgItem[] }) {
  return (
    <section id="workflow" className="bg-white py-16 sm:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-center gap-6 mb-12">
          <Image src={getSvgUrl(svgItems, 0, "/video-gif/constuction-up-carain.svg")} alt="Construction crane illustration"
            width={90} height={130}
            className="hidden sm:block w-[70px] lg:w-[90px] h-auto object-contain shrink-0" style={{ height: "auto" }}
            sizes="(max-width: 1024px) 70px, 90px" unoptimized />
          <div className="text-center shrink-0">
            <div className="inline-flex items-center gap-3 mb-2">
              <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
              <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#cd2028]">Step by Step</p>
              <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
            </div>
            <h2 className="font-display font-bold text-[#0f2557] text-2xl sm:text-3xl tracking-tight">Nepal Permit Workflow</h2>
            <p className="mt-1.5 text-[13px] text-[#64748b] max-w-[360px] leading-relaxed">Follow this step-by-step process to obtain your building permit.</p>
          </div>
          <Image src={getSvgUrl(svgItems, 1, "/video-gif/in-progress.svg")} alt="Construction crane illustration"
            width={90} height={130}
            className="hidden sm:block w-[70px] lg:w-[90px] h-auto object-contain shrink-0 scale-x-[-1]" style={{ height: "auto" }}
            sizes="(max-width: 1024px) 70px, 90px" unoptimized />
        </div>

        <div className="space-y-6">
          {steps.map((step, i) => (
            <div key={step.name} className="relative flex gap-5 sm:gap-6">
              {i < steps.length - 1 && (
                <div className="absolute left-[21px] sm:left-[22px] top-[52px] bottom-0 w-px bg-[#e2e8f0] hidden sm:block" aria-hidden="true" />
              )}
              <div className="hidden sm:flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#0f2557] text-white font-bold text-[15px] shadow-sm z-10">{i + 1}</div>
              <div className="flex-1 bg-[#f8fafc] rounded-2xl border border-[#e2e8f0] p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="sm:hidden flex size-7 items-center justify-center rounded-lg bg-[#0f2557] text-white font-bold text-xs shrink-0">{i + 1}</div>
                    <h3 className="font-display font-bold text-[#0f2557] text-[18px] leading-snug">{step.name}</h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#cd2028] bg-[#cd2028]/8 px-2.5 py-1 rounded-full border border-[#cd2028]/15 shrink-0">
                    <Clock className="size-3" />{step.duration}
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
                            <Image src={doc.imageUrl} alt={doc.name} width={100} height={72} className="size-full object-cover" sizes="100px" />
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
