"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

// Swap src to "/video-gif/constuction-up-carain.svg" once that file is added to public/video-gif/
const PARALLAX_SVG = "/video-gif/constuction-worker-building.svg"
const MIDDLE_SVG   = "/video-gif/Building-Build.svg"

export function HeroScrollSvg() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handler = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <>
      {/* Faint middle background SVG — subtle depth layer */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-[5]"
        aria-hidden="true"
      >
        <div
          className="w-[320px] h-[320px] opacity-[0.06]"
          style={{ animation: "float 5s ease-in-out infinite" }}
        >
          <Image
            src={MIDDLE_SVG}
            alt=""
            width={320}
            height={320}
            className="w-full h-full object-contain"
            unoptimized
          />
        </div>
      </div>

      {/* Scroll-parallax SVG — right side, desktop only, moves down as user scrolls */}
      <div
        className="absolute right-0 bottom-0 w-[42%] max-w-[520px] pointer-events-none z-[8] hidden lg:block"
        style={{ transform: `translateY(${scrollY * 0.35}px)` }}
        aria-hidden="true"
      >
        <Image
          src={PARALLAX_SVG}
          alt=""
          width={520}
          height={640}
          className="w-full h-auto object-contain object-bottom"
          unoptimized
          priority
        />
      </div>
    </>
  )
}
