'use client'

import Image from 'next/image'
import type { VastuNavItem } from '@/api/types/vastu.types'
import { VastuRoomAnalyzer } from './VastuRoomAnalyzer'
import { VastuDirectionAnalyzer } from './VastuDirectionAnalyzer'

interface Props {
  roomOptions: VastuNavItem[]
  directionOptions: VastuNavItem[]
}

export function VastuQuickTools({ roomOptions, directionOptions }: Props) {
  return (
    <div id="vastu-tools" className="mt-16 border-t border-[#e2e8f0] pt-12 pb-4">

      {/* Heading — SVGs flank the text */}
      <div className="flex items-center justify-center gap-6 mb-10">

        <Image
          src="/video-gif/Lord-Ganesha.svg"
          alt="Lord Ganesha — divine protector and remover of obstacles"
          width={90} height={140}
          className="hidden sm:block w-[70px] lg:w-[90px] h-auto object-contain shrink-0"
          unoptimized
        />

        <div className="text-center shrink-0">
          <div className="inline-flex items-center gap-3 mb-2">
            <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#cd2028]">Interactive</p>
            <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
          </div>
          <p className="text-[18px] font-bold text-[#0f2557] leading-tight">Analysis Tools</p>
          <p className="mt-1.5 text-[12.5px] text-[#64748b] max-w-[320px] leading-relaxed">
            Select a room or direction for personalized Vastu recommendations.
          </p>
        </div>

        <Image
          src="/video-gif/saftey-warning.svg"
          alt="Vastu safety — follow principles for balanced energy"
          width={80} height={120}
          className="hidden sm:block w-[60px] lg:w-[80px] h-auto object-contain shrink-0"
          unoptimized
        />

      </div>

      {/* Tool cards */}
      <div className="grid md:grid-cols-2 gap-5">
        <VastuRoomAnalyzer roomOptions={roomOptions} />
        <VastuDirectionAnalyzer directionOptions={directionOptions} />
      </div>

    </div>
  )
}
