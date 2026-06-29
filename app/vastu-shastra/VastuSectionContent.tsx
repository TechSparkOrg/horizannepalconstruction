import type { VastuItemDetail } from '@/api/types/vastu.types'

interface Props {
  item: VastuItemDetail | null
  loading?: boolean
}

export function VastuSectionContent({ item, loading }: Props) {
  if (loading) {
    return (
      <div className="rounded-lg border border-[#e8edf5] bg-white p-6 space-y-4 animate-pulse">
        <div className="h-5 w-48 rounded bg-[#f0f4fb]" />
        <div className="h-3 w-32 rounded bg-[#f0f4fb]" />
        <div className="h-16 w-full rounded bg-[#f0f4fb]" />
        <div className="h-16 w-full rounded bg-[#f0f4fb]" />
      </div>
    )
  }

  if (!item) {
    return (
      <div className="rounded-lg border border-[#e8edf5] bg-white px-6 py-10 text-center">
        <p className="text-sm text-[#5a6e8a]">Select a section to view content.</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-[#e8edf5] bg-white overflow-hidden">
      <div className="px-6 py-4 border-b border-[#e8edf5]">
        <h2 className="text-lg font-bold text-[#0f2557]">{item.title}</h2>
      </div>

      <div className="px-6 py-5 space-y-5">
        {item.content_list?.map((para, i) => (
          <div key={i}>
            <p className="text-sm text-[#3d526e] leading-relaxed">{para.en}</p>
            {para.np && (
              <p className="text-xs text-[#5a6e8a] mt-2 leading-relaxed border-l-2 border-[#cd2028]/20 pl-3">
                {para.np}
              </p>
            )}
          </div>
        ))}
      </div>

      {item.benefits && item.benefits.length > 0 && (
        <div className="border-t border-[#e8edf5] px-6 py-5">
          <p className="text-[11px] font-bold uppercase tracking-[.07em] text-[#0f2557] mb-3">Benefits</p>
          <div className="space-y-2">
            {item.benefits.map((b, i) => (
              <div key={i} className="flex gap-2">
                <span className="mt-1 size-1.5 rounded-full bg-[#cd2028] shrink-0" />
                <div>
                  <p className="text-xs text-[#3d526e] leading-relaxed">{b.en}</p>
                  {b.np && <p className="text-[10px] text-[#5a6e8a] leading-relaxed">{b.np}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {item.description?.en && (
        <div className="border-t border-[#e8edf5] px-6 py-5">
          <p className="text-sm text-[#3d526e] leading-relaxed">{item.description.en}</p>
          {item.description.np && (
            <p className="text-xs text-[#5a6e8a] mt-2 leading-relaxed border-l-2 border-[#cd2028]/20 pl-3">
              {item.description.np}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
