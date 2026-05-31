import Image from "next/image";
import { FileText, Building2, TriangleAlert, Wind, Flame, Clock } from "lucide-react";

const workflowSteps = [
  {
    num: 1,
    title: "Site Verification",
    desc: "The municipality verifies your land ownership and conducts an on-site inspection to confirm the location and boundaries of the property.",
    duration: "2–3 days",
    docs: ["Land ownership certificate", "Site photos", "Survey map"],
  },
  {
    num: 2,
    title: "Design Approval",
    desc: "Submit architectural and structural designs, along with cadastral extracts and required certifications, to the municipality for approval.",
    duration: "7–15 days",
    docs: ["Architectural drawings", "Structural drawings", "Plumbing & electrical plans"],
  },
  {
    num: 3,
    title: "15-Day Public Notice",
    desc: "The Ward Office sends a public notice to the site's neighbors to inform them about the proposed house construction. This notice period lasts 15 days, allowing neighbors to give feedback or objections before approval proceeds. The local inquiry starts after the notice period to finalize consent.",
    duration: "15 days",
    docs: ["Public Notice Form", "Proof of Land Ownership / Title Certificate", "Neighbor Acknowledgment / Consent Form / Commitment letter"],
  },
  {
    num: 4,
    title: "Permit Issuance",
    desc: "After the notice period and local inquiry, the municipality issues the temporary or permanent building permit, allowing construction to proceed up to the plinth level. At least one neighbor must consent, or a commitment letter can be submitted by the builder to handle potential disputes.",
    duration: "3–5 days",
    docs: ["Payment receipts", "All approved drawings", "Commitment Letter / Neighbor Consent"],
  },
];

const docCategories = [
  {
    label: "Land Documents",
    items: ["Land ownership certificate (Lalpurja)", "Tax clearance certificate", "Survey map (Naksha Pass)"],
  },
  {
    label: "Design Documents",
    items: ["Site plan", "Floor plans for all levels", "Elevation drawings (all sides)", "Structural design with calculations", "Plumbing layout", "Electrical layout"],
  },
  {
    label: "Legal Documents",
    items: ["Citizenship certificate of owner", "Tax clearance certificate", "Building permit application form"],
  },
  {
    label: "Technical Documents",
    items: ["Structural engineer certificate", "Architect registration certificate", "Construction schedule", "Building Code Compliance"],
  },
];

const regulations = [
  { icon: Building2, title: "Building Height Restrictions", items: ["Maximum 4 floors in residential areas", "Maximum 7 floors in commercial areas", "Minimum setback: 1.5m from property line", "Floor-to-floor height: 2.75m to 3.35m"] },
  { icon: TriangleAlert, title: "Earthquake Safety (NBC)", items: ["Seismic zone compliant design", "Reinforced concrete frame required", "Shear walls in multi-story buildings", "Foundation depth based on soil type"] },
  { icon: Flame, title: "Fire Safety Requirements", items: ["Fire exits in buildings over 3 stories", "Fire extinguisher on each floor", "Smoke detectors in corridors", "Fire-resistant materials for staircases"] },
  { icon: Wind, title: "Ventilation & Lighting", items: ["Minimum 10% of floor area as windows", "Cross-ventilation in all rooms", "Bathrooms must have exhaust fans", "Natural light in habitable rooms required"] },
];

const municipalities = [
  { name: "Butwal Sub-Metropolitan", district: "Butwal", phone: "071-540294" },
  { name: "Bhairahawa Municipality", district: "Rupandehi", phone: "071-520145" },
  { name: "Tilottama Municipality", district: "Rupandehi", phone: "071-590123" },
  { name: "Siddharthanagar Municipality", district: "Rupandehi", phone: "071-520145" },
];

export default function BuildingPermitPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-center overflow-hidden bg-brand-dark">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80" alt="" fill priority sizes="100vw" className="object-cover opacity-35" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 to-brand-dark" />
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-16">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-white/60 bg-white/10 px-3 py-1 rounded-full border border-white/10 inline-block">Tools</span>
            <h1 className="font-display font-bold text-white mt-6 leading-[1.08]" style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}>
              Building Permit<br />Assistant
            </h1>
            <p className="mt-4 text-white/60 text-lg max-w-[540px] leading-relaxed">Navigate Nepal's building permit process with confidence.</p>
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
                {/* Timeline connector */}
                {i < workflowSteps.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-px bg-gradient-to-b from-brand-primary/40 to-brand-secondary/20 hidden sm:block" />
                )}

                {/* Step number */}
                <div className="hidden sm:flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-primary to-brand-primary/80 text-white font-bold text-lg shadow-lg shadow-brand-primary/25">
                  {step.num}
                </div>

                {/* Card */}
                <div className="flex-1 bg-off-white rounded-2xl p-6 sm:p-8 border border-light-gray/40">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="sm:hidden flex size-8 items-center justify-center rounded-full bg-brand-primary text-white font-bold text-xs">
                        {step.num}
                      </div>
                      <h3 className="font-display font-bold text-xl text-brand-dark">{step.title}</h3>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-full shrink-0">
                      <Clock className="size-3" />
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-mid-gray text-sm leading-relaxed">{step.desc}</p>
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
              <div key={cat.label} className="bg-white rounded-2xl p-6 border border-light-gray/40">
                <h3 className="font-display font-bold text-base text-brand-primary mb-4 pb-3 border-b border-light-gray/30">{cat.label}</h3>
                <ul className="space-y-2.5">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-mid-gray">
                      <span className="size-1.5 rounded-full bg-brand-secondary/40 shrink-0 mt-1.5" />
                      {item}
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
            {regulations.map((reg) => (
              <div key={reg.title} className="bg-off-white rounded-2xl p-6 border border-light-gray/40">
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                    <reg.icon className="size-5" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-brand-dark">{reg.title}</h3>
                </div>
                <ul className="space-y-2">
                  {reg.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-mid-gray">
                      <span className="size-1 rounded-full bg-brand-primary/40 shrink-0 mt-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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

