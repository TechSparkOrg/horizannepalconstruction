import { Check } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { BannerCarousel } from "@/components/BannerCarousel";

const categories = [
  {
    title: "Material Selection",
    items: [
      { label: "Use recycled/reclaimed materials" },
      { label: "Sustainably sourced timber (FSC certified)" },
      { label: "Low-VOC paints and adhesives" },
      { label: "Locally sourced stone and brick" },
      { label: "Fly-ash or eco-friendly bricks" },
    ],
  },
  {
    title: "Energy Efficiency",
    items: [
      { label: "Solar panel installation" },
      { label: "Energy-efficient LED lighting" },
      { label: "Proper insulation (roof & walls)" },
      { label: "Double-glazed windows" },
      { label: "Passive solar design orientation" },
    ],
  },
  {
    title: "Water Conservation",
    items: [
      { label: "Rainwater harvesting system" },
      { label: "Low-flow plumbing fixtures" },
      { label: "Greywater recycling for gardening" },
      { label: "Pervious paving for driveways" },
      { label: "Drip irrigation for landscape" },
    ],
  },
  {
    title: "Waste Management",
    items: [
      { label: "Construction waste segregation plan" },
      { label: "Composting for organic waste" },
      { label: "Recycling bins in design" },
      { label: "Deconstruction vs. demolition approach" },
      { label: "Minimise packaging waste" },
    ],
  },
];

const comparison = [
  { factor: "Foundation", conventional: "Standard PCC", green: "Rammed earth / recycled aggregate" },
  { factor: "Walls", conventional: "Burnt brick + cement plaster", green: "Fly-ash brick + lime plaster" },
  { factor: "Roofing", conventional: "RCC slab", green: "Insulated RCC / green roof" },
  { factor: "Windows", conventional: "Single-glazed aluminium", green: "Double-glazed uPVC / timber" },
  { factor: "Flooring", conventional: "Ceramic / vitrified tiles", green: "Terrazzo / reclaimed wood / bamboo" },
  { factor: "Paint", conventional: "Standard emulsion", green: "Low-VOC / natural clay paint" },
  { factor: "Energy", conventional: "Grid-only", green: "Solar PV + grid hybrid" },
  { factor: "Water", conventional: "Municipal + tanker", green: "Municipal + rainwater harvesting" },
];

export default function GreenCalculatorPage() {
  return (
    <>
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-brand-dark">
        <BannerCarousel slug="green-calculator-page-hero" imgClassName="object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 to-brand-dark/70" />
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20 text-center">
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-white/60 bg-white/10 px-3 py-1 rounded-full border border-white/10 inline-block">Tools</span>
          <h1 className="font-display font-bold text-white mt-6 leading-[1.05] max-w-3xl mx-auto" style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}>Green Builder Calculator</h1>
          <p className="mt-6 text-white/70 text-lg max-w-[600px] mx-auto leading-relaxed">Build sustainably — compare eco-friendly alternatives and estimate your project's green potential.</p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <SectionLabel>Sustainability Checklist</SectionLabel>
            <h2 className="mt-3 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-5xl">Green Building Checklist</h2>
            <p className="mt-4 text-mid-gray text-lg">Use this checklist to evaluate the sustainability of your construction project.</p>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 gap-6">
            {categories.map((cat) => (
              <div key={cat.title} className="bg-off-white rounded-2xl p-6 border border-light-gray/40">
                <h3 className="font-display font-bold text-lg text-brand-secondary mb-3">{cat.title}</h3>
                <ul className="space-y-2">
                  {cat.items.map((item) => (
                    <li key={item.label} className="flex items-start gap-2 text-sm text-mid-gray">
                      <span className="size-4 rounded-full bg-green-100 text-green-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="size-2.5" strokeWidth={3} />
                      </span>
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <SectionLabel>Compare Materials</SectionLabel>
              <h2 className="mt-3 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-5xl">Green vs Conventional</h2>
              <p className="mt-4 text-mid-gray text-lg">See how eco-friendly alternatives compare to standard construction methods.</p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-light-gray/40">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand-dark text-white">
                    <th className="text-left px-5 py-3 font-semibold">Component</th>
                    <th className="text-left px-5 py-3 font-semibold">Conventional</th>
                    <th className="text-left px-5 py-3 font-semibold">Green Alternative</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr key={row.factor} className={i % 2 === 0 ? "bg-off-white" : "bg-white"}>
                      <td className="px-5 py-3 font-medium text-brand-dark">{row.factor}</td>
                      <td className="px-5 py-3 text-mid-gray">{row.conventional}</td>
                      <td className="px-5 py-3 text-green-700 font-medium">{row.green}</td>
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
