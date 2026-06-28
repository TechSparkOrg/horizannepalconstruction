"use client";

import { useState, useMemo, useCallback } from "react";
import { ArrowLeftRight, Copy, Check } from "lucide-react";
import type { ConversionRule } from "@/api/types/unit-converter.types";

interface Props {
  title: string;
  baseUnit: string;
  conversions: ConversionRule[];
}

function formatNum(n: number): string {
  if (Math.abs(n) >= 1_000_000) return n.toExponential(4);
  if (Number.isInteger(n)) return n.toLocaleString();
  return n.toLocaleString(undefined, { maximumFractionDigits: 6, useGrouping: false });
}

export default function UnitConverterWidget({ title, baseUnit, conversions }: Props) {
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
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl border border-[#e8edf5] shadow-sm overflow-hidden">
            <div className="bg-brand-dark px-6 py-4">
              <h2 className="text-white font-semibold text-lg">
                {swapped ? `Convert to ${baseUnit}` : `Convert ${baseUnit}`}
              </h2>
            </div>

            <div className="p-6 space-y-5">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="block text-[11px] font-semibold uppercase tracking-wide text-mid-gray mb-1.5">
                    {swapped ? "From" : "Value"}
                  </label>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full h-11 px-3 rounded-lg border border-[#e8edf5] text-brand-dark font-medium text-base focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
                    placeholder="Enter value"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setSwapped((s) => !s)}
                  className="mt-6 shrink-0 w-10 h-10 flex items-center justify-center rounded-lg border border-[#e8edf5] hover:border-brand-primary hover:text-brand-primary transition-colors"
                  title="Swap conversion direction"
                >
                  <ArrowLeftRight className="size-4" />
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wide text-mid-gray mb-1.5">
                  {swapped ? "To" : "Result"}
                </label>
                <div className="space-y-2">
                  {conversion.length === 0 ? (
                    <p className="text-sm text-mid-gray italic">No conversions defined</p>
                  ) : (
                    conversion.map((c, i) => {
                      const result = numValue * c.factor;
                      const label = `${formatNum(numValue)} ${c.from} = ${formatNum(result)} ${c.to}`;
                      const id = `${c.from}-${c.to}`;
                      return (
                        <div
                          key={i}
                          className="group flex items-center justify-between h-11 px-3 rounded-lg border border-[#e8edf5] bg-[#f8fafc] hover:border-brand-primary/30 transition-colors"
                        >
                          <span className="text-sm font-medium text-brand-dark">
                            {formatNum(numValue)}{" "}
                            <span className="text-mid-gray font-normal">{c.from}</span>{" "}
                            <span className="text-mid-gray mx-1">=</span>{" "}
                            <span className="text-brand-primary font-semibold">{formatNum(result)}</span>{" "}
                            <span className="text-mid-gray font-normal">{c.to}</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopy(label, id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 w-7 h-7 flex items-center justify-center rounded hover:bg-[#e8edf5]"
                            title="Copy result"
                          >
                            {copiedId === id ? (
                              <Check className="size-3.5 text-green-600" />
                            ) : (
                              <Copy className="size-3.5 text-mid-gray" />
                            )}
                          </button>
                        </div>
                      );
                    })
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
