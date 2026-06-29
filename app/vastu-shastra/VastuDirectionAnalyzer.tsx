'use client'

import { useState } from 'react'
import { ChevronDown, ArrowRight, Loader2 } from 'lucide-react'
import { getVastuItem } from '@/api/services/vastu.service'
import type { VastuItemDetail } from '@/api/types/vastu.types'

const fieldCls = 'h-10 w-full appearance-none rounded-lg border border-[#e8edf5] bg-[#f8fafd] pl-3 pr-9 text-sm font-semibold text-[#0f2557] focus:border-[#0f2557] focus:outline-none transition cursor-pointer'
const selectWrap = (sel: React.ReactNode) => (
  <div className="relative">
    {sel}
    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-3.5 text-[#5a6e8a]" />
  </div>
)

interface Props {
  directionOptions: Array<{ slug: string; title: string }>
}

export function VastuDirectionAnalyzer({ directionOptions }: Props) {
  const [selected, setSelected] = useState(directionOptions[0]?.slug || '')
  const [result, setResult] = useState<VastuItemDetail | null>(null)
  const [loading, setLoading] = useState(false)

  const handleAnalyze = async () => {
    setLoading(true)
    try {
      const item = await getVastuItem(selected)
      setResult(item)
    } catch {
      setResult(null)
    }
    setLoading(false)
  }

  return (
    <div className="rounded-lg border border-[#e8edf5] bg-white overflow-hidden">
      <div className="border-b border-[#e8edf5] px-5 py-3">
        <p className="text-[11px] font-bold uppercase tracking-[.07em] text-[#0f2557]">Directional Analysis</p>
      </div>
      <div className="px-5 py-4">
        <div className="flex gap-2">
          <div className="flex-1">
            {selectWrap(
              <select
                value={selected}
                onChange={(e) => { setSelected(e.target.value); setResult(null) }}
                className={fieldCls}
              >
                {directionOptions.map((d) => (
                  <option key={d.slug} value={d.slug}>{d.title}</option>
                ))}
              </select>
            )}
          </div>
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="flex h-10 items-center gap-1.5 rounded-lg bg-[#0f2557] px-4 text-xs font-bold text-white hover:bg-[#0a1a3a] transition shrink-0 disabled:opacity-50"
          >
            {loading ? <Loader2 className="size-3.5 animate-spin" /> : <><ArrowRight className="size-3.5" /> Analyze</>}
          </button>
        </div>

        {result && (
          <div className="mt-5 space-y-4">
            {(result.deity || result.element || result.description?.en) && (
              <div className="rounded-lg border border-[#e8edf5] bg-[#f8fafd] px-4 py-3">
                {(result.deity || result.element) && (
                  <div className="flex gap-4 text-[10px] text-[#5a6e8a] mb-2">
                    {result.deity && <span><strong className="text-[#0f2557]">Deity:</strong> {result.deity}</span>}
                    {result.element && <span><strong className="text-[#0f2557]">Element:</strong> {result.element}</span>}
                  </div>
                )}
                {result.description?.en && (
                  <p className="text-xs text-[#3d526e]">{result.description.en}</p>
                )}
                {result.description?.np && (
                  <p className="text-[10px] text-[#5a6e8a] mt-0.5 border-l-2 border-[#0f2557]/20 pl-2">{result.description.np}</p>
                )}
              </div>
            )}
            {result.benefits && result.benefits.length > 0 && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.1em] text-green-700 mb-2">Recommended</p>
                <div className="space-y-1.5">
                  {result.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="mt-0.5 size-4 shrink-0 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-[8px] font-bold">✓</span>
                      <div>
                        <p className="text-xs text-[#3d526e]">{b.en}</p>
                        {b.np && <p className="text-[10px] text-[#5a6e8a]">{b.np}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {result.avoids && result.avoids.length > 0 && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.1em] text-red-600 mb-2">Avoid</p>
                <div className="space-y-1.5">
                  {result.avoids.map((a, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="mt-0.5 size-4 shrink-0 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-[8px] font-bold">✗</span>
                      <div>
                        <p className="text-xs text-[#3d526e]">{a.en}</p>
                        {a.np && <p className="text-[10px] text-[#5a6e8a]">{a.np}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
