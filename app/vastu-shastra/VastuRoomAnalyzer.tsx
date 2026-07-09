'use client'

import { useState } from 'react'
import { ChevronDown, ArrowRight, Loader2, Check, X, Home } from 'lucide-react'
import { getVastuItem } from '@/api/services/vastu.service'
import type { VastuItemDetail } from '@/api/types/vastu.types'

interface Props {
  roomOptions: Array<{ slug: string; title: string }>
}

export function VastuRoomAnalyzer({ roomOptions }: Props) {
  const [selected, setSelected] = useState(roomOptions[0]?.slug || '')
  const [result, setResult]     = useState<VastuItemDetail | null>(null)
  const [loading, setLoading]   = useState(false)

  const handleAnalyze = async () => {
    setLoading(true)
    try { setResult(await getVastuItem(selected)) }
    catch { setResult(null) }
    finally { setLoading(false) }
  }

  return (
    <div className="rounded-lg border border-[#e8edf5] overflow-hidden flex flex-col bg-white">

      {/* Card header */}
      <div className="px-5 py-4 flex items-center gap-3 border-b border-[#e8edf5] bg-[#0f2557]">
        <span className="size-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
          <span className="size-10 rounded-xl bg-white/15 flex items-center justify-center text-xl shrink-0">🏠</span>
        </span>
        <div>
          <p className="text-white font-bold text-[14px] leading-snug">Room Vastu</p>
          <p className="text-white/60 text-[11px]">Room-specific Vastu recommendations</p>
        </div>
      </div>

      {/* Selector row */}
      <div className="px-5 py-4 border-b border-[#e8edf5]">
        <label className="block text-[10.5px] font-bold text-[#0f2557] mb-1.5 uppercase tracking-[0.14em]">
          Select Room
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <select
              value={selected}
              onChange={(e) => { setSelected(e.target.value); setResult(null) }}
              className="h-11 w-full appearance-none rounded-lg border border-[#e8edf5] bg-white pl-3.5 pr-9 text-[13.5px] font-semibold text-[#0f2557] focus:border-[#0f2557] focus:outline-none focus:ring-2 focus:ring-[#0f2557]/10 transition cursor-pointer"
            >
              {roomOptions.map((r) => (
                <option key={r.slug} value={r.slug}>{r.title}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-4 text-[#7a8699]" />
          </div>
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="inline-flex h-11 items-center gap-1.5 rounded-lg bg-[#cd2028] px-5 text-[13px] font-bold text-white hover:bg-[#b31c23] transition shrink-0 disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-[#cd2028] focus-visible:ring-offset-2"
          >
            {loading
              ? <Loader2 className="size-3.5 animate-spin" />
              : <><ArrowRight className="size-3.5" />Analyze</>}
          </button>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="px-5 py-5 space-y-5 flex-1">

          {/* Direction info */}
          {(result.ideal_direction?.en || result.facing_direction?.en) && (
            <div className="rounded-lg border border-[#e8edf5] overflow-hidden divide-y divide-[#e8edf5]">
              {result.ideal_direction?.en && (
                <div className="px-4 py-3 bg-[#f7f8fb]">
                  <p className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-[#0f2557] mb-1">Ideal Direction</p>
                  <p className="text-[13px] text-[#1e2a3f] font-medium">{result.ideal_direction.en}</p>
                  {result.ideal_direction.np && (
                    <p className="text-[11px] text-[#7a8699] mt-1 italic">{result.ideal_direction.np}</p>
                  )}
                </div>
              )}
              {result.facing_direction?.en && (
                <div className="px-4 py-3 bg-[#f7f8fb]">
                  <p className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-[#cd2028] mb-1">Facing Direction</p>
                  <p className="text-[13px] text-[#1e2a3f] font-medium">{result.facing_direction.en}</p>
                  {result.facing_direction.np && (
                    <p className="text-[11px] text-[#7a8699] mt-1 italic">{result.facing_direction.np}</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Do's */}
          {result.benefits && result.benefits.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="size-4 rounded-full bg-[#0f2557] flex items-center justify-center shrink-0">
                  <Check className="size-2.5 text-white stroke-[3]" />
                </span>
                <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#0f2557]">Do&apos;s</p>
              </div>
              <div className="space-y-2">
                {result.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="mt-[3px] size-4 shrink-0 rounded-full border border-[#e8edf5] flex items-center justify-center">
                      <Check className="size-2.5 text-[#0f2557] stroke-[3]" />
                    </span>
                    <div>
                      <p className="text-[13px] text-[#1e2a3f] leading-snug">{b.en}</p>
                      {b.np && <p className="text-[11px] text-[#7a8699] mt-0.5 italic">{b.np}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Don'ts */}
          {result.avoids && result.avoids.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="size-4 rounded-full bg-[#cd2028] flex items-center justify-center shrink-0">
                  <X className="size-2.5 text-white stroke-[3]" />
                </span>
                <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#cd2028]">Don&apos;ts</p>
              </div>
              <div className="space-y-2">
                {result.avoids.map((a, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="mt-[3px] size-4 shrink-0 rounded-full border border-[#e8edf5] flex items-center justify-center">
                      <X className="size-2.5 text-[#cd2028] stroke-[3]" />
                    </span>
                    <div>
                      <p className="text-[13px] text-[#1e2a3f] leading-snug">{a.en}</p>
                      {a.np && <p className="text-[11px] text-[#7a8699] mt-0.5 italic">{a.np}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  )
}