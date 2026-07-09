"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

const KEEP_DIST  = 160   // px — distance bot maintains from cursor
const LERP       = 0.07  // chase smoothness
const BOB_AMP    = 6     // idle bob amplitude
const BOB_SPEED  = 0.0013

export function ScrollAiBot() {
  const botRef = useRef<HTMLDivElement>(null)
  const pos    = useRef({ x: -999, y: -999 })
  const target = useRef({ x: -999, y: -999 })
  const mouse  = useRef({ x: -999, y: -999 })
  const active = useRef(false) // true once mouse enters
  const rafId  = useRef<number | undefined>(undefined)

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }

      if (!active.current) {
        // First mouse event — place bot immediately near cursor
        pos.current = { x: e.clientX, y: e.clientY - KEEP_DIST }
        active.current = true
      }
    }

    const animate = () => {
      if (active.current) {
        const bob = Math.sin(Date.now() * BOB_SPEED) * BOB_AMP

        // Vector from mouse → bot current position
        const dx = pos.current.x - mouse.current.x
        const dy = pos.current.y - mouse.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist > 1) {
          // Project bot onto circle of KEEP_DIST around mouse
          const nx = dx / dist  // unit vector mouse→bot
          const ny = dy / dist
          target.current.x = mouse.current.x + nx * KEEP_DIST
          target.current.y = mouse.current.y + ny * KEEP_DIST + bob
        } else {
          // Exactly on mouse — push bot straight up
          target.current.x = mouse.current.x
          target.current.y = mouse.current.y - KEEP_DIST + bob
        }

        // Clamp to viewport
        target.current.x = Math.max(50, Math.min(window.innerWidth  - 50, target.current.x))
        target.current.y = Math.max(50, Math.min(window.innerHeight - 50, target.current.y))

        // Smooth lerp
        pos.current.x += (target.current.x - pos.current.x) * LERP
        pos.current.y += (target.current.y - pos.current.y) * LERP

        if (botRef.current) {
          botRef.current.style.left = `${pos.current.x}px`
          botRef.current.style.top  = `${pos.current.y}px`
        }
      }

      rafId.current = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true })
    rafId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      if (rafId.current !== undefined) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <div
      className="hidden md:block fixed inset-0 pointer-events-none z-[99990]"
      aria-hidden="true"
    >
      <div
        ref={botRef}
        className="absolute"
        style={{
          left: "50vw",
          top: "33vh",
          transform: "translate(-50%, -50%)",
          filter: "drop-shadow(0 6px 18px rgba(15,37,87,0.3)) drop-shadow(0 0 8px rgba(147,197,253,0.18))",
          willChange: "left, top",
        }}
      >
        <Image
          src="/video-gif/ai-bot-vetor.svg"
          alt=""
          width={90}
          height={90}
          className="w-[70px] sm:w-[90px] h-auto select-none"
          priority
          unoptimized
        />
      </div>
    </div>
  )
}
