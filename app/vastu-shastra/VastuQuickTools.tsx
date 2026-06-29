'use client'

import type { VastuNavItem } from '@/api/types/vastu.types'
import { VastuRoomAnalyzer } from './VastuRoomAnalyzer'
import { VastuDirectionAnalyzer } from './VastuDirectionAnalyzer'

interface Props {
  roomOptions: VastuNavItem[]
  directionOptions: VastuNavItem[]
}

export function VastuQuickTools({ roomOptions, directionOptions }: Props) {
  return (
    <div className="mt-16 border-t border-[#e8edf5] pt-10">
      <div className="text-center mb-8">
        <p className="text-[#cd2028] text-[10px] font-bold tracking-[.12em] uppercase">Tools</p>
        <h2 className="mt-1 text-lg font-bold text-[#0f2557]">Vastu Analysis Tools</h2>
        <p className="mt-1 text-xs text-[#5a6e8a]">Select a room or direction to get Vastu recommendations.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <VastuRoomAnalyzer roomOptions={roomOptions} />
        <VastuDirectionAnalyzer directionOptions={directionOptions} />
      </div>
    </div>
  )
}
