import type { VastuItemDetail } from '@/api/types/vastu.types'

interface Props {
  item: VastuItemDetail | null
  loading?: boolean
}

export function VastuSectionContent({ item, loading }: Props) {

  if (loading) {
    return (
      <div className="rounded-lg border border-[#e8edf5] bg-white overflow-hidden animate-pulse">
        <div className="px-6 py-5 border-b border-[#e8edf5]">
          <div className="h-2.5 w-16 rounded-sm bg-[#f4f6fa] mb-2.5" />
          <div className="h-6 w-52 rounded-sm bg-[#f4f6fa]" />
        </div>
        <div className="px-6 py-6 space-y-3">
          <div className="h-4 w-full rounded-sm bg-[#f4f6fa]" />
          <div className="h-4 w-[92%] rounded-sm bg-[#f4f6fa]" />
          <div className="h-4 w-[84%] rounded-sm bg-[#f4f6fa]" />
          <div className="h-4 w-[70%] rounded-sm bg-[#f4f6fa]" />
        </div>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="rounded-lg border border-[#e8edf5] bg-white px-6 py-16 text-center">
        <p className="text-[13px] text-[#7a8699] tracking-wide">Select a section to begin</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-[#e8edf5] bg-white overflow-hidden">

      {/* Title bar */}
      <div className="px-6 py-5 border-b border-[#e8edf5] flex gap-3 items-start">
        <div className="w-1 self-stretch bg-[#cd2028] rounded-full shrink-0" />
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="size-4 rounded-full bg-[#0f2557] inline-flex items-center justify-center">
              <span className="size-1.5 rounded-full bg-[#cd2028]" />
            </span>
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#cd2028]">
              Vastu Wisdom
            </p>
          </div>
          <h2 className="font-display text-[22px] font-bold text-[#0f2557] leading-snug tracking-tight">
            {item.title}
          </h2>
        </div>
      </div>

      {/* Content paragraphs */}
      {item.content_list && item.content_list.length > 0 && (
        <div className="px-6 py-6 space-y-4">
          {item.content_list.map((para, i) => (
            <div key={i}>
              <p className="text-[14.5px] text-[#1e2a3f] leading-[1.8]">
                {para.en}
              </p>
              {para.np && (
                <p className="mt-1.5 text-[12.5px] text-[#5b6472] leading-relaxed italic pl-3 border-l-2 border-[#cd2028] rounded-none">
                  {para.np}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Description */}
      {item.description?.en && (
        <div className="px-6 py-5 border-t border-[#e8edf5]">
          <p className="text-[14px] text-[#334155] leading-[1.75]">
            {item.description.en}
          </p>
          {item.description.np && (
            <p className="mt-2 text-[12px] text-[#7a8699] leading-relaxed italic">
              {item.description.np}
            </p>
          )}
        </div>
      )}

      {/* Benefits */}
      {item.benefits && item.benefits.length > 0 && (
        <div className="px-6 py-5 border-t border-[#e8edf5] bg-[#f7f8fb]">
          <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#0f2557] mb-3.5">
            Benefits
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            {item.benefits.map((b, i) => (
              <div key={i} className="bg-white border border-[#e8edf5] rounded-lg p-3.5">
                <span
                  className={`inline-flex items-center justify-center size-6 rounded-md text-white text-[11px] font-bold mb-2.5 ${
                    i % 2 === 0 ? 'bg-[#0f2557]' : 'bg-[#cd2028]'
                  }`}
                >
                  {i + 1}
                </span>
                <p className="text-[13px] text-[#1e2a3f] leading-snug font-medium">{b.en}</p>
                {b.np && (
                  <p className="mt-1 text-[11px] text-[#7a8699] italic">{b.np}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}