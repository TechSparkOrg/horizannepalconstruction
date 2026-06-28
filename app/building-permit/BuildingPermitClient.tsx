import { Building2, TriangleAlert, Wind, Flame, Clock } from "lucide-react";
import ParsedContent from "@/lib/Parse-Content";
import type { BuildingPermitConfig, WorkflowStep, RegulationItem, MunicipalityItem } from "@/api/types/building-permit.types";

const REG_ICONS = [Building2, TriangleAlert, Flame, Wind];

function WorkflowTimeline({ steps }: { steps: WorkflowStep[] }) {
  return (
    <section id="workflow" className="bg-white py-20 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-brand-primary bg-brand-primary/5 px-3 py-1 rounded-full">Workflow</span>
          <h2 className="mt-3 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-5xl">Nepal Permit Workflow</h2>
          <p className="mt-3 text-mid-gray text-lg">Follow this step-by-step process to obtain your building permit.</p>
        </div>

        <div className="mt-14 space-y-8">
          {steps.map((step, i) => (
            <div key={step.name} className="relative flex gap-6">
              {i < steps.length - 1 && (
                <div className="absolute left-6 top-16 bottom-0 w-px bg-gradient-to-b from-brand-primary/40 to-brand-secondary/20 hidden sm:block" />
              )}
              <div className="hidden sm:flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-primary to-brand-primary/80 text-white font-bold text-lg shadow-lg shadow-brand-primary/25">
                {i + 1}
              </div>
              <div className="flex-1 bg-off-white rounded-2xl p-6 sm:p-8 border border-light-gray/40">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="sm:hidden flex size-8 items-center justify-center rounded-full bg-brand-primary text-white font-bold text-xs">
                      {i + 1}
                    </div>
                    <h3 className="font-display font-bold text-xl text-brand-dark">{step.name}</h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-dark bg-brand-primary/10 px-3 py-1 rounded-full shrink-0">
                    <Clock className="size-3" />
                    {step.duration}
                  </span>
                </div>
                <div className="text-sm text-mid-gray leading-relaxed">
                  <ParsedContent description={step.description.en} />
                </div>
                {step.requiredDocs.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-light-gray/40">
                    <p className="text-xs font-semibold text-mid-gray uppercase tracking-wide mb-3">Required Documents:</p>
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {step.requiredDocs.map((doc) => (
                        <div key={doc.name} className="flex-none w-[110px] bg-white rounded-lg border border-light-gray/30 overflow-hidden">
                          <div className="h-[80px] overflow-hidden">
                            <img src={doc.imageUrl} alt={doc.name} className="size-full object-cover" />
                          </div>
                          <p className="text-[11px] text-brand-dark font-medium text-center px-2 py-1.5 leading-tight">{doc.name}</p>
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
    <section className="bg-off-white py-20 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-brand-primary bg-brand-primary/5 px-3 py-1 rounded-full">Regulations</span>
          <h2 className="mt-3 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-5xl">Building Regulations</h2>
          <p className="mt-3 text-mid-gray text-lg">Key regulations you need to comply with in Nepal.</p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 gap-5">
          {items.map((reg, i) => {
            const Icon = REG_ICONS[i] || Building2;
            return (
              <div key={reg.name} className="bg-white rounded-2xl p-6 border border-light-gray/40">
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-brand-dark">{reg.name}</h3>
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
  );
}

function MunicipalityTable({ items }: { items: MunicipalityItem[] }) {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-brand-primary bg-brand-primary/5 px-3 py-1 rounded-full">Directory</span>
          <h2 className="mt-3 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-5xl">Municipality Directory</h2>
          <p className="mt-3 text-mid-gray text-lg">Contact your local municipality for permit inquiries.</p>
        </div>

        <div className="mt-12 bg-off-white rounded-2xl border border-light-gray/40 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand-secondary/5 border-b border-light-gray/40">
                  <th scope="col" className="text-left font-semibold text-brand-dark px-5 py-3.5">Municipality</th>
                  <th scope="col" className="text-left font-semibold text-brand-dark px-5 py-3.5">District</th>
                  <th scope="col" className="text-left font-semibold text-brand-dark px-5 py-3.5">Phone</th>
                </tr>
              </thead>
              <tbody>
                {items.map((m, i) => (
                  <tr key={m.district + m.location} className={i < items.length - 1 ? "border-b border-light-gray/30" : ""}>
                    <td className="px-5 py-3.5 font-medium text-brand-dark">{m.location}</td>
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
  );
}

export default function BuildingPermitContent({ config }: { config: BuildingPermitConfig }) {
  return (
    <>
      <WorkflowTimeline steps={config.workflow_steps} />
      <RegulationsGrid items={config.regulation_items} />
      <MunicipalityTable items={config.municipality_items} />
    </>
  );
}
