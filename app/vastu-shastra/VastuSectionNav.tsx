'use client'

import { cn } from '@/lib/utils'
import type { VastuSection } from '@/api/types/vastu.types'

const FALLBACK_ICONS: Record<string, string> = {
  overview: '🪷', elements: '🌍', land: '🏞️',
  entrance: '🚪', 'room-placement': '🏠', 'kitchen-dining': '🍳',
}

interface Props {
  sectionKeys: string[]
  sections: Record<string, VastuSection>
  sectionIcons?: Record<string, string>
  activeSection: string
  onSelect: (key: string) => void
}

export function VastuSectionNav({ sectionKeys, sections, sectionIcons, activeSection, onSelect }: Props) {
  const icon = (key: string) => sectionIcons?.[key] || FALLBACK_ICONS[key] || '📄'

  return (
    <>
      {/* Mobile — horizontal pills */}
      <div className="flex lg:hidden gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {sectionKeys.map((key) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={cn(
              'flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition shrink-0',
              activeSection === key
                ? 'bg-[#0f2557] text-white shadow-sm'
                : 'bg-white text-[#3d526e] border border-[#e8edf5] hover:border-[#0f2557]/40',
            )}
          >
            <span className="text-sm">{icon(key)}</span>
            <span>{sections?.[key]?.title || key}</span>
          </button>
        ))}
      </div>

      {/* Desktop — sidebar */}
      <div className="hidden lg:flex flex-col gap-1">
        {sectionKeys.map((key) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={cn(
              'w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition border-l-2',
              activeSection === key
                ? 'bg-[#ebf0fb] text-[#0f2557] border-[#cd2028] font-bold'
                : 'text-[#5a6e8a] border-transparent hover:bg-[#f4f6fb] hover:text-[#0f2557]',
            )}
          >
            <div className="flex items-center gap-2.5">
              <span>{icon(key)}</span>
              <div>
                <p className="text-sm font-semibold">{sections?.[key]?.title || key}</p>
                {sections?.[key]?.titleNp && (
                  <p className="text-[10px] text-[#5a6e8a]">{sections[key].titleNp}</p>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </>
  )
}
