"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ChevronDown, MessageCircle, Calculator, ArrowRight } from "lucide-react";

const RATES = {
  normal: { rate: 2800, mult: 0.8 },
  standard: { rate: 4200, mult: 1 },
  premium: { rate: 6500, mult: 1.3 },
} as const;

type Material = keyof typeof RATES;

interface DetailResult {
  totalArea: number;
  totalCost: number;
  ppcCement: number;
  opcCement: number;
  steel8mm: number;
  steel10mm: number;
  steel12mm: number;
  steel16mm: number;
  steel20mm: number;
  pvcPipe: number;
  cpvcPipe: number;
  giPipe: number;
  bricks: number;
  sand: number;
  aggregate: number;
}

const faqs = [
  {
    q: "What affects construction cost in Nepal?",
    a: "Location, material quality, labour rates, design complexity, and project timeline are the main factors. Kathmandu Valley and major cities typically have higher costs than rural areas.",
  },
  {
    q: "How accurate is this estimate?",
    a: "This is a preliminary estimate based on current market rates. Actual costs vary based on site conditions, material availability, and labour rates. Contact us for a detailed BOQ.",
  },
  {
    q: "What's included in the per sq.ft cost?",
    a: "It includes structural work (foundation, columns, slabs), basic finishing (plaster, flooring, painting), electrical and plumbing rough-in, and labour. Finishes like modular kitchen, wardrobe, and landscaping are extra.",
  },
  {
    q: "How can I reduce construction costs?",
    a: "Optimise the design (simple layout), use locally available materials, plan construction during dry season, and avoid frequent design changes during execution.",
  },
  {
    q: "What payment schedule do contractors follow?",
    a: "Typically 20-30% advance, then progress-based payments tied to milestones — foundation, slab casting, brickwork, finishing, and handover.",
  },
];

const MAT_PREFIX: Record<string, string> = {
  ppcCement: "PPC Cement",
  opcCement: "OPC Cement",
  steel8mm: "8mm Rod",
  steel10mm: "10mm Rod",
  steel12mm: "12mm Rod",
  steel16mm: "16mm Rod",
  steel20mm: "20mm Rod",
  pvcPipe: "PVC Pipes",
  cpvcPipe: "CPVC Pipes",
  giPipe: "GI Pipes",
  bricks: "Bricks",
  sand: "Sand",
  aggregate: "Aggregate",
};

const MAT_UNIT: Record<string, string> = {
  ppcCement: "bags",
  opcCement: "bags",
  steel8mm: "kg",
  steel10mm: "kg",
  steel12mm: "kg",
  steel16mm: "kg",
  steel20mm: "kg",
  pvcPipe: "ft",
  cpvcPipe: "ft",
  giPipe: "ft",
  bricks: "pcs",
  sand: "cft",
  aggregate: "cft",
};

const MAT_DESC: Record<string, string> = {
  ppcCement: "For plastering, brickwork & general use",
  opcCement: "For slabs, beams & structural work",
  steel8mm: "Stirrups & ties",
  steel10mm: "Slab distribution",
  steel12mm: "Slab main bars",
  steel16mm: "Beam & column",
  steel20mm: "Heavy columns",
  pvcPipe: "Drainage & sewage lines",
  cpvcPipe: "Hot & cold water supply",
  giPipe: "Main water line",
  bricks: "Standard size clay bricks",
  sand: "River sand for construction",
  aggregate: "20mm & 10mm chips",
};

const BASE_2400 = {
  ppcCement: 600,
  opcCement: 432,
  steel8mm: 4320,
  steel10mm: 3120,
  steel12mm: 2400,
  steel16mm: 1440,
  steel20mm: 720,
  pvcPipe: 1680,
  cpvcPipe: 1200,
  giPipe: 600,
  bricks: 19200,
  sand: 96,
  aggregate: 192,
};

export function CostEstimator() {
  const [area, setArea] = useState("");
  const [floors, setFloors] = useState("1");
  const [material, setMaterial] = useState<Material>("standard");
  const [result, setResult] = useState<DetailResult | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const areaNum = Number(area);
  const floorsNum = Number(floors);

  const scale = (base: number, mult: number, totalArea: number) =>
    Math.ceil(base * (totalArea / 2400) * mult);

  const handleCalculate = () => {
    if (!areaNum || areaNum <= 0) return;
    const totalArea = areaNum * floorsNum;
    const cfg = RATES[material];
    const totalCost = totalArea * cfg.rate;
    const m = cfg.mult;
    setResult({
      totalArea,
      totalCost,
      ppcCement: scale(BASE_2400.ppcCement, m, totalArea),
      opcCement: scale(BASE_2400.opcCement, m, totalArea),
      steel8mm: scale(BASE_2400.steel8mm, m, totalArea),
      steel10mm: scale(BASE_2400.steel10mm, m, totalArea),
      steel12mm: scale(BASE_2400.steel12mm, m, totalArea),
      steel16mm: scale(BASE_2400.steel16mm, m, totalArea),
      steel20mm: scale(BASE_2400.steel20mm, m, totalArea),
      pvcPipe: scale(BASE_2400.pvcPipe, m, totalArea),
      cpvcPipe: scale(BASE_2400.cpvcPipe, m, totalArea),
      giPipe: scale(BASE_2400.giPipe, m, totalArea),
      bricks: scale(BASE_2400.bricks, m, totalArea),
      sand: scale(BASE_2400.sand, m, totalArea),
      aggregate: scale(BASE_2400.aggregate, m, totalArea),
    });
  };

  const waMessage = result
    ? `Hi Horizon Nepal! I estimated my project:\n- Area: ${area} sq.ft/floor\n- Floors: ${floors}\n- Material: ${material}\n- Total: ~Rs. ${result.totalCost.toLocaleString("en-IN")}\n\nPlease share a detailed quote.`
    : "Hello! I'd like to know more about Horizon Nepal's cost estimation.";

  return (
    <>
      {/* Calculator */}
      <section className="bg-white py-16 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <SectionLabel>Construction Calculator</SectionLabel>
            <h2 className="mt-3 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-5xl">
              Estimate Your Build Cost
            </h2>
          </div>

          {/* Form + 3D Preview */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Form */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-brand-dark mb-1.5">Area Per Floor (Square Feet)</label>
                <input
                  type="number"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="Built-up area for each floor (e.g., 600 sq ft per floor)"
                  className="w-full h-12 px-4 rounded-xl border border-light-gray/60 bg-off-white text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-dark mb-1.5">Number of Floors</label>
                <select
                  value={floors}
                  onChange={(e) => setFloors(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-light-gray/60 bg-off-white text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? "Floor" : "Floors"}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-dark mb-1.5">Material Type</label>
                <select
                  value={material}
                  onChange={(e) => setMaterial(e.target.value as Material)}
                  className="w-full h-12 px-4 rounded-xl border border-light-gray/60 bg-off-white text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
                >
                  <option value="normal">Normal</option>
                  <option value="standard">Standard</option>
                  <option value="premium">Premium</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCalculate}
                  className="flex-1 h-12 rounded-xl bg-brand-primary text-white text-sm font-bold tracking-wide shadow-md hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <Calculator className="size-4" />
                  Calculate Estimate
                </button>
                <a
                  href={`https://wa.me/97714411222?text=${encodeURIComponent(waMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 px-5 rounded-xl bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/30 text-sm font-bold hover:bg-[#25D366] hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="size-4" />
                  Chat on WhatsApp
                </a>
              </div>

              <p className="text-xs text-mid-gray italic mt-3">
                <strong>Note:</strong> This is an approximate estimate. Actual costs may vary based on specific project requirements, location, and market rates. Contact us for a detailed quotation.
              </p>
            </div>

            {/* Right: 3D Visual Model */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=800&q=80"
                alt="3D Model Preview"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-xs font-semibold uppercase tracking-wider opacity-70">3D Preview</p>
                <p className="text-base font-bold">Your Dream Home</p>
              </div>
            </div>
          </div>

          {/* Results — full width below */}
          {result && (
            <div className="mt-12 pt-12 border-t border-light-gray/40">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <SectionLabel>Material Estimate</SectionLabel>
                  <h3 className="mt-2 font-display font-bold text-brand-secondary text-2xl sm:text-3xl">
                    Requirements for Your Project
                  </h3>
                </div>
                <div className="text-right">
                  <p className="text-xs text-mid-gray">Total Area</p>
                  <p className="text-lg font-bold text-brand-dark">{result.totalArea.toLocaleString("en-IN")} sq.ft</p>
                </div>
              </div>

              {/* Cost Summary Card */}
              <div className="bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 rounded-2xl p-6 border border-brand-primary/20 mb-8">
                <p className="text-sm text-mid-gray">Estimated Construction Cost</p>
                <p className="text-3xl font-bold text-brand-primary">Rs. {result.totalCost.toLocaleString("en-IN")}</p>
                <p className="text-xs text-mid-gray mt-1">Rate: Rs. {RATES[material].rate.toLocaleString("en-IN")}/sq.ft ({material})</p>
              </div>

              {/* Material Groups */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Cement */}
                <div className="bg-off-white rounded-2xl p-5 border border-light-gray/40">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="size-2 rounded-full bg-blue-500" />
                    <h4 className="font-display font-bold text-brand-dark">Cement Requirements</h4>
                  </div>
                  <MatItem field="ppcCement" result={result} />
                  <MatItem field="opcCement" result={result} />
                </div>

                {/* Steel */}
                <div className="bg-off-white rounded-2xl p-5 border border-light-gray/40">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="size-2 rounded-full bg-amber-500" />
                    <h4 className="font-display font-bold text-brand-dark">Steel Reinforcement (TMT Bars)</h4>
                  </div>
                  <MatItem field="steel8mm" result={result} />
                  <MatItem field="steel10mm" result={result} />
                  <MatItem field="steel12mm" result={result} />
                  <MatItem field="steel16mm" result={result} />
                  <MatItem field="steel20mm" result={result} />
                </div>

                {/* Pipes */}
                <div className="bg-off-white rounded-2xl p-5 border border-light-gray/40">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="size-2 rounded-full bg-emerald-500" />
                    <h4 className="font-display font-bold text-brand-dark">Pipes &amp; Fittings</h4>
                  </div>
                  <MatItem field="pvcPipe" result={result} />
                  <MatItem field="cpvcPipe" result={result} />
                  <MatItem field="giPipe" result={result} />
                </div>

                {/* Other */}
                <div className="bg-off-white rounded-2xl p-5 border border-light-gray/40">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="size-2 rounded-full bg-purple-500" />
                    <h4 className="font-display font-bold text-brand-dark">Other Materials</h4>
                  </div>
                  <MatItem field="bricks" result={result} />
                  <MatItem field="sand" result={result} />
                  <MatItem field="aggregate" result={result} />
                </div>
              </div>
            </div>
          )}

          {!result && (
            <div className="mt-12 text-center">
              <p className="text-mid-gray text-sm">Fill in the form and click <strong>Calculate Estimate</strong> to see detailed material requirements below.</p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-off-white py-16 sm:py-28">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="mt-3 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-5xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-light-gray/40 overflow-hidden shadow-sm">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex items-center justify-between w-full px-5 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-brand-dark">{faq.q}</span>
                  <ChevronDown className={`size-4 text-mid-gray shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-200 ${openFaq === i ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"}`}>
                  <p className="px-5 pb-4 text-sm text-mid-gray leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Make Plan Then Act */}
      <section className="bg-brand-dark py-16 sm:py-20">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.1]">
            Make a Plan, Then Act
          </h2>
          <p className="mt-4 text-white/60 text-lg max-w-[500px] mx-auto">
            Get a detailed site-specific quote from our team. Let&apos;s turn your estimate into a real project.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              prefetch={false}
              className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-brand-primary text-white text-sm font-bold tracking-wide hover:brightness-110 transition"
            >
              Get Detailed Quote <ArrowRight className="size-4" />
            </Link>
            <a
              href="https://wa.me/97714411222?text=Hello!%20I'd%20like%20a%20detailed%20construction%20quote."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-white/20 text-white/80 text-sm font-bold tracking-wide hover:bg-white/10 transition"
            >
              <MessageCircle className="size-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function MatItem({ field, result }: { field: string; result: DetailResult }) {
  const val = (result as any)[field];
  return (
    <div className="flex items-center justify-between py-2 border-b border-light-gray/40 last:border-0">
      <div>
        <span className="text-sm font-medium text-brand-dark">{MAT_PREFIX[field] || field}</span>
        {MAT_DESC[field] && <p className="text-xs text-mid-gray">{MAT_DESC[field]}</p>}
      </div>
      <span className="text-sm font-bold text-brand-primary whitespace-nowrap ml-3">
        {val.toLocaleString("en-IN")} {MAT_UNIT[field] || ""}
      </span>
    </div>
  );
}
