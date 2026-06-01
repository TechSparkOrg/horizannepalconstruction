"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  MessageCircle, Calculator, ArrowRight, Info, ChevronDown,
  Package, Minus, AlignJustify, Circle, LayoutGrid, Waves, Grip,
  Building2, Ruler, Trophy, type LucideIcon,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import clsx from "clsx";


// ─── Types ────────────────────────────────────────────────────────────────────

type Material = "normal" | "standard" | "premium";

type MatKey =
  | "ppcCement" | "opcCement"
  | "steel8mm" | "steel10mm" | "steel12mm" | "steel16mm" | "steel20mm"
  | "pvcPipe" | "cpvcPipe" | "giPipe"
  | "bricks" | "sand" | "aggregate";

interface CalcResult {
  totalArea: number;
  totalCost: number;
  vals: Record<MatKey, number>;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const RATES: Record<Material, { rate: number; mult: number }> = {
  normal:   { rate: 2800, mult: 0.8 },
  standard: { rate: 4200, mult: 1.0 },
  premium:  { rate: 6500, mult: 1.3 },
};

const BASE_2400: Record<MatKey, number> = {
  ppcCement: 600,
  opcCement: 432,
  steel8mm:  4320,
  steel10mm: 3120,
  steel12mm: 2400,
  steel16mm: 1440,
  steel20mm: 720,
  pvcPipe:   1680,
  cpvcPipe:  1200,
  giPipe:    600,
  bricks:    19200,
  sand:      96,
  aggregate: 192,
};

interface MatMeta {
  name: string;
  desc: string;
  unit: string;
  icon: LucideIcon;
  color: string;
  bg: string;
}

const MAT_META: Record<MatKey, MatMeta> = {
  ppcCement: { name: "PPC cement",    desc: "Plastering & brickwork",      unit: "bags", icon: Package,       color: "#4B5DDB", bg: "#EEEDFE" },
  opcCement: { name: "OPC cement",    desc: "Slabs & structural work",     unit: "bags", icon: Package,       color: "#4B5DDB", bg: "#EEEDFE" },
  steel8mm:  { name: "8mm TMT rod",   desc: "Stirrups & ties",             unit: "kg",   icon: Minus,         color: "#B45309", bg: "#FEF3C7" },
  steel10mm: { name: "10mm TMT rod",  desc: "Slab distribution",           unit: "kg",   icon: Minus,         color: "#B45309", bg: "#FEF3C7" },
  steel12mm: { name: "12mm TMT rod",  desc: "Slab main bars",              unit: "kg",   icon: Minus,         color: "#B45309", bg: "#FEF3C7" },
  steel16mm: { name: "16mm TMT rod",  desc: "Beam & column",               unit: "kg",   icon: AlignJustify,  color: "#B45309", bg: "#FEF3C7" },
  steel20mm: { name: "20mm TMT rod",  desc: "Heavy columns",               unit: "kg",   icon: AlignJustify,  color: "#B45309", bg: "#FEF3C7" },
  pvcPipe:   { name: "PVC pipes",     desc: "Drainage & sewage",           unit: "ft",   icon: Circle,        color: "#0F766E", bg: "#CCFBF1" },
  cpvcPipe:  { name: "CPVC pipes",    desc: "Hot & cold supply",           unit: "ft",   icon: Circle,        color: "#0F766E", bg: "#CCFBF1" },
  giPipe:    { name: "GI pipes",      desc: "Main water line",             unit: "ft",   icon: Circle,        color: "#0F766E", bg: "#CCFBF1" },
  bricks:    { name: "Bricks",        desc: "Standard clay bricks",        unit: "pcs",  icon: LayoutGrid,    color: "#57534E", bg: "#F5F5F4" },
  sand:      { name: "Sand",          desc: "River sand for construction",  unit: "cft",  icon: Waves,         color: "#57534E", bg: "#F5F5F4" },
  aggregate: { name: "Aggregate",     desc: "20mm & 10mm chips",           unit: "cft",  icon: Grip,          color: "#57534E", bg: "#F5F5F4" },
};

interface MatGroup {
  label: string;
  dot: string;
  keys: MatKey[];
}

const GROUPS: MatGroup[] = [
  { label: "Cement",               dot: "#4B5DDB", keys: ["ppcCement", "opcCement"] },
  { label: "Steel reinforcement",  dot: "#B45309", keys: ["steel8mm", "steel10mm", "steel12mm", "steel16mm", "steel20mm"] },
  { label: "Pipes & fittings",     dot: "#0F766E", keys: ["pvcPipe", "cpvcPipe", "giPipe"] },
  { label: "Other materials",      dot: "#57534E", keys: ["bricks", "sand", "aggregate"] },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "What affects construction cost in Nepal?",
    a: "Location, material quality, labour rates, design complexity, and project timeline. Kathmandu Valley typically has higher costs than rural areas.",
  },
  {
    q: "How accurate is this estimate?",
    a: "This is a preliminary estimate based on current market rates. Actual costs vary based on site conditions, material availability, and labour rates. Contact us for a detailed BOQ.",
  },
  {
    q: "What's included in the per sq.ft cost?",
    a: "Structural work (foundation, columns, slabs), basic finishing (plaster, flooring, painting), electrical and plumbing rough-in, and labour. Finishes like modular kitchen, wardrobe, and landscaping are extra.",
  },
  {
    q: "How can I reduce construction costs?",
    a: "Optimise the design (simple layout), use locally available materials, plan construction during dry season, and avoid frequent design changes during execution.",
  },
  {
    q: "What payment schedule do contractors follow?",
    a: "Typically 20–30% advance, then progress-based payments tied to milestones — foundation, slab casting, brickwork, finishing, and handover.",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number): string {
  return Math.ceil(n).toLocaleString("en-IN");
}

function shadeHex(hex: string, amt: number): string {
  const r = Math.min(255, Math.max(0, parseInt(hex.slice(1, 3), 16) + amt));
  const g = Math.min(255, Math.max(0, parseInt(hex.slice(3, 5), 16) + amt));
  const b = Math.min(255, Math.max(0, parseInt(hex.slice(5, 7), 16) + amt));
  return `rgb(${r},${g},${b})`;
}

// ─── 3D Canvas Hook ───────────────────────────────────────────────────────────

const MAT_COLORS: Record<Material, {
  wall: string; side: string; roof: string; win: string; door: string;
}> = {
  normal:   { wall: "#8BA0B8", side: "#6E88A3", roof: "#5C7A9A", win: "#7EC8E3", door: "#4A7A5A" },
  standard: { wall: "#A89878", side: "#8A7A5A", roof: "#7A6A4A", win: "#7EC8E3", door: "#6A5A3A" },
  premium:  { wall: "#D4C4A8", side: "#B8A88C", roof: "#8A7A68", win: "#B8E0F0", door: "#8A7058" },
};

function useHouseCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  floors: number,
  material: Material,
) {
  const angleRef = useRef(0);
  const rafRef   = useRef<number>(0);

  const draw = useCallback(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const wrap = cvs.parentElement;
    if (!wrap) return;

    cvs.width  = wrap.clientWidth  || 320;
    cvs.height = wrap.clientHeight || 260;

    const ctx = cvs.getContext("2d");
    if (!ctx) return;

    const W = cvs.width, H = cvs.height;
    ctx.clearRect(0, 0, W, H);

    const C     = MAT_COLORS[material];
    const cx    = W / 2;
    const baseY = H - 44;
    const bw    = Math.min(W * 0.55, 190);
    const flH   = Math.min(34, (H - 130) / Math.max(floors, 1));
    const angle = angleRef.current;
    const sa = Math.sin(angle), ca = Math.cos(angle);
    const W2 = 0.5, D2 = 0.35, ISO = 0.38;

    function useCtx() { return ctx as CanvasRenderingContext2D; }

    function p(x: number, y: number, z: number) {
      return {
        x: cx + (x * ca - z * sa) * bw * 0.5,
        y: baseY - y - (x * sa + z * ca) * ISO * bw * 0.3,
      };
    }

    function face(
      pts: { x: number; y: number }[],
      fill: string,
      stroke?: string,
    ) {
      const g = useCtx();
      g.beginPath();
      g.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) g.lineTo(pts[i].x, pts[i].y);
      g.closePath();
      g.fillStyle = fill;
      g.fill();
      if (stroke) { g.strokeStyle = stroke; g.lineWidth = 0.7; g.stroke(); }
    }

    // Ground
    face(
      [p(-0.65, 0, -0.42), p(0.65, 0, -0.42), p(0.65, 0, 0.42), p(-0.65, 0, 0.42)],
      "rgba(0,0,0,0.1)",
    );

    // Floors
    for (let fl = 0; fl < floors; fl++) {
      const yB = fl * flH, yT = yB + flH;
      const sh = -fl * 8;
      const wallC = shadeHex(C.wall, sh);
      const sideC = shadeHex(C.side, sh - 10);

      face(
        [p(-W2, yB, -D2), p(W2, yB, -D2), p(W2, yT, -D2), p(-W2, yT, -D2)],
        wallC, "rgba(0,0,0,0.12)",
      );
      face(
        [p(W2, yB, -D2), p(W2, yB, D2), p(W2, yT, D2), p(W2, yT, -D2)],
        sideC, "rgba(0,0,0,0.12)",
      );

      // Door (ground floor)
      if (fl === 0) {
        face(
          [p(-0.09, 0, -D2 - 0.001), p(0.09, 0, -D2 - 0.001),
           p(0.09, flH * 0.72, -D2 - 0.001), p(-0.09, flH * 0.72, -D2 - 0.001)],
          C.door,
        );
      }

      // Front windows
      const winXs = fl === 0 ? [-0.28, 0.22] : [-0.28, 0.22];
      const wyRatio = fl === 0 ? 0.45 : 0.22;
      for (const wx of winXs) {
        const wyB = fl * flH + flH * wyRatio;
        const wyT = wyB + flH * 0.36;
        face(
          [p(wx, wyB, -D2 - 0.001), p(wx + 0.1, wyB, -D2 - 0.001),
           p(wx + 0.1, wyT, -D2 - 0.001), p(wx, wyT, -D2 - 0.001)],
          C.win,
        );
      }

      // Side window
      const swYB = fl * flH + flH * 0.28;
      const swYT = swYB + flH * 0.32;
      face(
        [p(W2 + 0.001, swYB, -0.1), p(W2 + 0.001, swYB, 0.1),
         p(W2 + 0.001, swYT, 0.1),  p(W2 + 0.001, swYT, -0.1)],
        C.win,
      );
    }

    // Roof
    const topY = floors * flH;
    const rx = 0.07, rz = 0.07, rh = flH * 0.55;
    face(
      [p(-W2 - rx, topY, -D2 - rz), p(W2 + rx, topY, -D2 - rz), p(0, topY + rh, 0)],
      shadeHex(C.roof, -10), "rgba(0,0,0,0.18)",
    );
    face(
      [p(W2 + rx, topY, -D2 - rz), p(W2 + rx, topY, D2 + rz), p(0, topY + rh, 0)],
      C.roof, "rgba(0,0,0,0.14)",
    );
    face(
      [p(-W2 - rx, topY, -D2 - rz), p(W2 + rx, topY, -D2 - rz),
       p(W2 + rx, topY, D2 + rz),   p(-W2 - rx, topY, D2 + rz)],
      shadeHex(C.roof, 12), "rgba(0,0,0,0.08)",
    );

    angleRef.current += 0.004;
    rafRef.current = requestAnimationFrame(draw);
  }, [floors, material, canvasRef]);

  useEffect(() => {
    const t = setTimeout(() => { rafRef.current = requestAnimationFrame(draw); }, 60);
    return () => { clearTimeout(t); cancelAnimationFrame(rafRef.current); };
  }, [draw]);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function HousePreview({
  floors,
  area,
  material,
}: {
  floors: number;
  area: number;
  material: Material;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useHouseCanvas(canvasRef, floors, material);

  const gradeLabel = material.charAt(0).toUpperCase() + material.slice(1);
  const subtitle   = area > 0 ? `${floors}-storey · ${gradeLabel} grade` : "Your dream home";

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0D1117] flex flex-col h-full min-h-[340px]">
      <div className="relative flex-1 overflow-hidden min-h-[260px]">
        <canvas ref={canvasRef} className="w-full h-full block" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3 pointer-events-none">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">3D Preview</p>
          <p className="text-sm font-semibold text-white mt-0.5">{subtitle}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 border-t border-white/10">
        {(
          [
            { val: String(floors),              lbl: "Floors"       },
            { val: area > 0 ? fmt(area) : "—",  lbl: "sq.ft / floor"},
            { val: gradeLabel,                  lbl: "Grade"        },
          ] as const
        ).map(({ val, lbl }, i) => (
          <div
            key={lbl}
            className={clsx("px-3 py-2.5", i < 2 && "border-r border-white/10")}
          >
            <p className="text-sm font-semibold text-white">{val}</p>
            <p className="text-[10px] text-white/40 mt-0.5">{lbl}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function GradeTabs({
  value,
  onChange,
}: {
  value: Material;
  onChange: (m: Material) => void;
}) {
  const opts: { key: Material; label: string; price: string }[] = [
    { key: "normal",   label: "Normal",   price: "Rs. 2,800/sq.ft" },
    { key: "standard", label: "Standard", price: "Rs. 4,200/sq.ft" },
    { key: "premium",  label: "Premium",  price: "Rs. 6,500/sq.ft" },
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {opts.map(({ key, label, price }) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          className={clsx(
            "rounded-xl py-2.5 px-2 text-center border transition-all duration-150",
            value === key
              ? "border-[#4B5DDB] bg-[#EEEDFE] border-[1.5px]"
              : "border-light-gray/40 bg-off-white hover:border-light-gray",
          )}
        >
          <p className={clsx("text-xs font-semibold", value === key ? "text-[#3C3489]" : "text-brand-dark")}>
            {label}
          </p>
          <p className={clsx("text-[10px] mt-0.5", value === key ? "text-[#534AB7]" : "text-mid-gray")}>
            {price}
          </p>
        </button>
      ))}
    </div>
  );
}

function MatCard({ matKey, value }: { matKey: MatKey; value: number }) {
  const { name, desc, unit, icon: Icon, color, bg } = MAT_META[matKey];
  return (
    <div className="flex items-start gap-3 bg-white rounded-xl border border-light-gray/40 p-3">
      <div className="size-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: bg }}>
        <Icon className="size-4" style={{ color }} strokeWidth={1.5} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-brand-dark leading-tight">{name}</p>
        <p className="text-[11px] text-mid-gray mt-0.5">{desc}</p>
        <p className="text-sm font-bold mt-1.5" style={{ color }}>
          {fmt(value)}{" "}
          <span className="text-[11px] font-normal text-mid-gray">{unit}</span>
        </p>
      </div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-light-gray/40 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full py-3.5 gap-3 text-left"
      >
        <span className="text-sm font-semibold text-brand-dark">{q}</span>
        <ChevronDown
        className={clsx("size-4 text-mid-gray shrink-0 transition-transform duration-200", open && "rotate-180")}
        />
      </button>
      <div
        className={clsx("overflow-hidden transition-all duration-200", open ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0")}
      >
        <p className="text-[13px] text-mid-gray leading-relaxed pb-3.5">{a}</p>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function CostEstimator() {
  const [area,     setArea]     = useState<string>("");
  const [floors,   setFloors]   = useState<number>(1);
  const [material, setMaterial] = useState<Material>("normal");
  const [result,   setResult]   = useState<CalcResult | null>(null);

  const areaNum = parseFloat(area) || 0;

  function handleCalculate() {
    if (areaNum <= 0) return;
    const totalArea = areaNum * floors;
    const { rate, mult } = RATES[material];

    const vals = (Object.keys(BASE_2400) as MatKey[]).reduce<Record<MatKey, number>>(
      (acc, k) => {
        acc[k] = Math.ceil(BASE_2400[k] * (totalArea / 2400) * mult);
        return acc;
      },
      {} as Record<MatKey, number>,
    );

    setResult({ totalArea, totalCost: totalArea * rate, vals });
  }

  const waText = result
    ? `Hi Horizon Nepal!\nArea: ${area} sq.ft/floor\nFloors: ${floors}\nMaterial: ${material}\nTotal: ~Rs. ${fmt(result.totalCost)}\n\nPlease share a detailed quote.`
    : "Hello! I'd like to know more about Horizon Nepal's construction services.";

  return (
    <>
      {/* ── Calculator ── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-2xl mb-10">
            <SectionLabel>Construction Calculator</SectionLabel>
            <h2 className="mt-2 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-5xl leading-tight">
              Estimate your build cost
            </h2>
            <p className="mt-3 text-mid-gray text-base leading-relaxed">
              Preliminary material breakdown based on current Nepal market rates.
            </p>
          </div>

          {/* Form + 3D preview */}
          <div className="grid md:grid-cols-2 gap-8 items-start">

            {/* Form */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="est-area"
                    className="text-[11px] font-semibold text-mid-gray uppercase tracking-wide"
                  >
                    Area per floor (sq.ft)
                  </label>
                  <input
                    id="est-area"
                    type="number"
                    min={1}
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="e.g. 600"
                    className="h-11 px-3 rounded-xl border border-light-gray/50 bg-off-white text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-[#4B5DDB]/20 focus:border-[#4B5DDB] transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="est-floors"
                    className="text-[11px] font-semibold text-mid-gray uppercase tracking-wide"
                  >
                    Number of floors
                  </label>
                  <select
                    id="est-floors"
                    value={floors}
                    onChange={(e) => setFloors(Number(e.target.value))}
                    className="h-11 px-3 rounded-xl border border-light-gray/50 bg-off-white text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-[#4B5DDB]/20 focus:border-[#4B5DDB] transition-all"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? "Floor" : "Floors"}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-semibold text-mid-gray uppercase tracking-wide">
                  Material grade
                </span>
                <GradeTabs value={material} onChange={setMaterial} />
              </div>

              <button
                type="button"
                onClick={handleCalculate}
                className="w-full h-11 rounded-xl bg-[#4B5DDB] text-white text-sm font-bold tracking-wide flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.99] transition-all"
              >
                <Calculator className="size-4" />
                Calculate estimate
              </button>

              <a
                href={`https://wa.me/97714411222?text=${encodeURIComponent(waText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-10 rounded-xl border border-light-gray/50 bg-off-white text-mid-gray text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#e8fef2] hover:text-[#1a7a4a] hover:border-[#25D366] transition-all"
              >
                <MessageCircle className="size-4 text-[#25D366]" />
                Request quote on WhatsApp
              </a>

              <div className="flex gap-2.5 items-start bg-off-white border-l-2 border-[#4B5DDB] rounded-r-xl px-3 py-2.5">
                <Info className="size-3.5 text-[#4B5DDB] mt-0.5 shrink-0" />
                <p className="text-[11px] text-mid-gray leading-relaxed">
                  Preliminary estimate only. Actual costs vary by site, location, and labour rates.
                </p>
              </div>
            </div>

            {/* 3D preview */}
            <HousePreview floors={floors} area={areaNum} material={material} />
          </div>

          {/* Results */}
          {result !== null ? (
            <div className="mt-14 pt-10 border-t border-light-gray/40">

              {/* Cost hero */}
              <div className="flex items-end justify-between mb-6">
                <div>
                  <p className="text-[11px] font-semibold text-mid-gray uppercase tracking-widest mb-1">
                    Estimated total cost
                  </p>
                  <p className="text-4xl font-bold text-brand-dark leading-none">
                    Rs. {fmt(result.totalCost)}
                  </p>
                  <p className="text-xs text-mid-gray mt-2">
                    Rs. {RATES[material].rate.toLocaleString("en-IN")}/sq.ft · {material} grade
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-brand-dark">{fmt(result.totalArea)}</p>
                  <p className="text-xs text-mid-gray mt-0.5">total sq.ft</p>
                </div>
              </div>

              {/* Metric chips */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {(
                  [
                    { Icon: Building2, color: "#4B5DDB", val: String(floors),    lbl: "Floors"        },
                    { Icon: Ruler,     color: "#0F766E", val: fmt(areaNum),       lbl: "sq.ft / floor" },
                    { Icon: Trophy,    color: "#B45309", val: material.charAt(0).toUpperCase() + material.slice(1), lbl: "Grade" },
                  ] as const
                ).map(({ Icon, color, val, lbl }) => (
                  <div key={lbl} className="bg-off-white rounded-xl p-3.5">
                    <Icon className="size-5 mb-2" style={{ color }} strokeWidth={1.5} />
                    <p className="text-base font-bold text-brand-dark">{val}</p>
                    <p className="text-[11px] text-mid-gray mt-0.5">{lbl}</p>
                  </div>
                ))}
              </div>

              {/* Material groups */}
              <div className="space-y-6">
                {GROUPS.map(({ label, dot, keys }) => (
                  <div key={label}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="size-1.5 rounded-full shrink-0" style={{ background: dot }} />
                      <span className="text-[11px] font-semibold text-mid-gray uppercase tracking-widest">
                        {label}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                      {keys.map((k) => (
                        <MatCard key={k} matKey={k} value={result.vals[k]} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="mt-10 text-center text-sm text-mid-gray">
              Fill in the form above and click{" "}
              <strong className="text-brand-dark">Calculate estimate</strong> to
              see a detailed material breakdown.
            </p>
          )}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-off-white py-16 sm:py-24">
        <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="mt-2 font-display font-bold text-brand-secondary text-3xl sm:text-4xl">
              Common questions
            </h2>
          </div>
          <div>
            {FAQS.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-brand-dark py-16 sm:py-20">
        <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-white text-3xl sm:text-4xl leading-tight">
            Make a plan, then act
          </h2>
          <p className="mt-3 text-white/55 text-lg max-w-[480px] mx-auto">
            Get a site-specific quote from our team and turn your estimate into a real project.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              prefetch={false}
              className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-brand-primary text-white text-sm font-bold hover:brightness-110 transition"
            >
              Get detailed quote <ArrowRight className="size-4" />
            </Link>
            <a
              href={`https://wa.me/97714411222?text=${encodeURIComponent(waText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-full border border-white/20 text-white/75 text-sm font-bold hover:bg-white/10 transition"
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