"use client";

import Image from "next/image";
import { useState, useMemo, useCallback } from "react";
import { ArrowLeftRight, Copy, Check } from "lucide-react";
import type { ConversionRule } from "@/api/types/unit-converter.types";

interface Props {
  title: string;
  baseUnit: string;
  conversions: ConversionRule[];
  svgUrl?: string;
}

function formatNum(n: number): string {
  if (Math.abs(n) >= 1_000_000) return n.toExponential(4);
  if (Number.isInteger(n)) return n.toLocaleString();
  return n.toLocaleString(undefined, { maximumFractionDigits: 6, useGrouping: false });
}

export default function UnitConverterWidget({ title, baseUnit, conversions, svgUrl }: Props) {
  const [value, setValue] = useState<string>("1");
  const [swapped, setSwapped] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const numValue = parseFloat(value) || 0;

  const conversion = useMemo(() => {
    if (swapped) {
      return conversions.map((c) => ({
        to: baseUnit,
        from: c.to,
        factor: 1 / c.factor,
      }));
    }
    return conversions.map((c) => ({
      to: c.to,
      from: baseUnit,
      factor: c.factor,
    }));
  }, [conversions, baseUnit, swapped]);

  const fromUnit = swapped ? (conversions[0]?.to ?? baseUnit) : baseUnit;

  const handleCopy = useCallback(async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      // silently fail
    }
  }, []);

  return (
    <section id="converter" className="bg-[#f8fafc] py-12 sm:py-16 border-t border-[#e2e8f0]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-2">
            <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
            <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#cd2028]">Calculator</p>
            <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
          </div>
          <h2 className="font-display font-bold text-[#0f2557] text-2xl sm:text-3xl tracking-tight">
            {title}
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* Precision.svg — decorative left */}
          <div className="hidden sm:flex lg:w-[42%] w-full items-center justify-center shrink-0">
            <Image
              src={svgUrl || "/video-gif/Precision.svg"}
              alt=""
              aria-hidden="true"
              width={380}
              height={420}
              className="w-[200px] sm:w-[260px] lg:w-full lg:max-w-[360px] h-auto object-contain opacity-90 select-none pointer-events-none"
              unoptimized
            />
          </div>

          {/* Calculator card */}
          <div className="w-full lg:w-[58%]">
            <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">

              {/* Navy header */}
              <div className="bg-[#0f2557] px-6 py-5">
                <p className="text-white/50 text-[10px] font-bold tracking-[0.24em] uppercase mb-1">
                  Unit Converter
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold text-[15px]">
                    {swapped ? `→ ${baseUnit}` : `${baseUnit} →`}
                  </span>
                  <span className="text-white/30 text-sm mx-1">·</span>
                  <span className="text-white/50 text-[13px]">{title}</span>
                </div>
              </div>

              {/* Card body */}
              <div className="p-6">

                {/* From input */}
                <div className="mb-1">
                  <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#64748b] mb-2 block">
                    Enter value
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      className="w-full h-14 pl-4 pr-24 rounded-xl border border-[#e2e8f0] text-[#0f2557] font-bold text-xl focus:outline-none focus:ring-2 focus:ring-[#cd2028]/20 focus:border-[#cd2028] transition-colors bg-[#f8fafc]"
                      placeholder="0"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] font-semibold text-[#64748b] bg-[#e2e8f0] px-2.5 py-1 rounded-md select-none">
                      {fromUnit}
                    </span>
                  </div>
                </div>

                {/* Swap divider */}
                <div className="flex items-center gap-3 my-5">
                  <div className="flex-1 h-px bg-[#e2e8f0]" />
                  <button
                    type="button"
                    onClick={() => setSwapped((s) => !s)}
                    className="flex items-center gap-1.5 h-8 px-3 rounded-full border border-[#e2e8f0] bg-white hover:border-[#cd2028] hover:text-[#cd2028] text-[#64748b] text-[11px] font-semibold transition-colors shadow-sm"
                    title="Swap conversion direction"
                  >
                    <ArrowLeftRight className="size-3.5" />
                    <span>Swap</span>
                  </button>
                  <div className="flex-1 h-px bg-[#e2e8f0]" />
                </div>

                {/* Results */}
                <div>
                  <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#64748b] mb-3 block">
                    Results
                  </label>

                  {conversion.length === 0 ? (
                    <p className="text-sm text-[#64748b] italic py-4 text-center">No conversions defined</p>
                  ) : (
                    <div className="space-y-2">
                      {conversion.map((c, i) => {
                        const result = numValue * c.factor;
                        const label = `${formatNum(numValue)} ${c.from} = ${formatNum(result)} ${c.to}`;
                        const id = `${c.from}-${c.to}`;
                        return (
                          <div
                            key={i}
                            className="group flex items-center justify-between px-4 py-3 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] hover:border-[#cd2028]/40 hover:bg-white transition-all"
                          >
                            <div className="min-w-0">
                              <p className="text-[22px] font-bold text-[#cd2028] leading-none tabular-nums">
                                {formatNum(result)}
                              </p>
                              <p className="text-[11px] text-[#64748b] mt-1 font-medium">{c.to}</p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0 ml-3">
                              <span className="text-[11px] text-[#94a3b8] hidden sm:block">
                                {formatNum(numValue)} {c.from}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleCopy(label, id)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#e2e8f0]"
                                title="Copy result"
                              >
                                {copiedId === id ? (
                                  <Check className="size-3.5 text-green-600" />
                                ) : (
                                  <Copy className="size-3.5 text-[#64748b]" />
                                )}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
