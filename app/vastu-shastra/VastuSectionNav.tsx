'use client'

import { cn } from '@/lib/utils'
import type { VastuSection } from '@/api/types/vastu.types'

interface Props {
  sectionKeys: string[]
  sections: Record<string, VastuSection>
  activeSection: string
  onSelect: (key: string) => void
}

export function VastuSectionNav({ sectionKeys, sections, activeSection, onSelect }: Props) {
  return (
    <>
      {/* Mobile — horizontal scroll pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide w-full lg:hidden">
        {sectionKeys.map((key) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={cn(
              'px-4 py-2 rounded-lg text-[12.5px] font-semibold whitespace-nowrap shrink-0 border transition-all',
              activeSection === key
                ? 'bg-[#0f2557] text-white border-[#0f2557]'
                : 'bg-white text-[#475569] border-[#e8edf5] hover:border-[#0f2557] hover:text-[#0f2557]',
            )}
          >
            {sections?.[key]?.title || key}
          </button>
        ))}
      </div>

      {/* Desktop — clean white sidebar */}
      <div className="hidden lg:flex flex-col rounded-lg border border-[#e8edf5] overflow-hidden bg-white">

        <div className="px-4 py-3.5 border-b border-[#e8edf5] flex items-center gap-2.5">
          <span className="size-4 rounded-full bg-[#0f2557] inline-flex items-center justify-center shrink-0">
            <span className="size-1.5 rounded-full bg-[#cd2028]" />
          </span>
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#cd2028] mb-0.5">Guide</p>
            <p className="text-[13.5px] font-bold text-[#0f2557] leading-none">Vastu Sections</p>
          </div>
        </div>

        <nav className="flex flex-col py-1.5">
          {sectionKeys.map((key) => {
            const isActive = activeSection === key
            return (
              <button
                key={key}
                onClick={() => onSelect(key)}
                className={cn(
                  'w-full text-left px-4 py-2.5 transition-all duration-150 flex items-center justify-between gap-3 group border-l-[3px] rounded-none',
                  isActive
                    ? 'bg-[#f7f8fb] border-[#0f2557]'
                    : 'border-transparent hover:bg-[#f7f8fb] hover:border-[#e8edf5]',
                )}
              >
                <div className="min-w-0">
                  <p className={cn(
                    'text-[13px] font-semibold leading-snug truncate',
                    isActive ? 'text-[#0f2557]' : 'text-[#475569] group-hover:text-[#0f2557]'
                  )}>
                    {sections?.[key]?.title || key}
                  </p>
                  {sections?.[key]?.titleNp && (
                    <p className="text-[10.5px] text-[#7a8699] truncate mt-0.5">
                      {sections[key].titleNp}
                    </p>
                  )}
                </div>
                {isActive && (
                  <span className="size-1.5 rounded-full bg-[#cd2028] shrink-0" aria-hidden="true" />
                )}
              </button>
            )
          })}
        </nav>

        <div className="px-4 py-3 border-t border-[#e8edf5] mt-auto">
          <p className="text-[10px] text-[#7a8699] leading-snug">
            शुभ लाभ — May wisdom guide your spaces
          </p>
        </div>

      </div>
    </>
  )
}