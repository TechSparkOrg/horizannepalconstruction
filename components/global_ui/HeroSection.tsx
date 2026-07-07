"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

const TABS = [
  { id: "projects", label: "Projects" },
  { id: "corp",     label: "Corp."    },
] as const;

type TabId = (typeof TABS)[number]["id"];

const stats = [
  { num: "500+", label: "Projects Completed" },
  { num: "12+",  label: "Years Experience"   },
  { num: "98%",  label: "Client Satisfaction" },
  { num: "50+",  label: "Expert Team"         },
];

export function HeroSection() {
  const [active, setActive] = useState<TabId>("projects");
  const [showSecond, setShowSecond] = useState(false);

  /* On mount: worker plays first (~2.8s), then Rumble fades in clean */
  useEffect(() => {
    const t = setTimeout(() => setShowSecond(true), 2800);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="home"
      className="relative flex flex-col min-h-screen overflow-hidden bg-brand-dark"
    >
      {/* Architectural grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Left glow */}
      <div
        className="absolute top-1/3 -left-32 w-[420px] h-[420px] rounded-full pointer-events-none"
        aria-hidden="true"
        style={{ background: "radial-gradient(circle, rgba(29,78,216,0.18) 0%, transparent 70%)" }}
      />

      {/* Right glow */}
      <div
        className="absolute top-1/4 -right-24 w-[520px] h-[520px] rounded-full pointer-events-none"
        aria-hidden="true"
        style={{ background: "radial-gradient(circle, rgba(29,78,216,0.12) 0%, transparent 70%)" }}
      />

      {/* Hero content */}
      <div className="relative flex-1 flex items-center">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* ── Left: text ── */}
            <div>
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-6">
                <span className="block w-10 h-px bg-brand-secondary shrink-0" aria-hidden="true" />
                <p className="text-[10.5px] font-semibold tracking-[0.28em] uppercase text-brand-secondary">
                  Architecture · Engineering · Construction
                </p>
              </div>

              {/* Pill tabs */}
              <div
                className="inline-flex items-center gap-1 p-1 rounded-full mb-8"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
                role="tablist"
                aria-label="View mode"
              >
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={active === tab.id}
                    onClick={() => setActive(tab.id)}
                    className="relative px-5 py-1.5 rounded-full text-[12px] font-semibold transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
                    style={{
                      background: active === tab.id ? "var(--color-brand-primary, #1d4ed8)" : "transparent",
                      color: active === tab.id ? "#fff" : "rgba(255,255,255,0.5)",
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <h1 className="text-[clamp(2.8rem,5vw,4.6rem)] font-bold text-white leading-[1.02] tracking-[-0.02em]">
                Horizon<br />
                <em className="not-italic text-brand-secondary">Construction</em>
              </h1>

              {/* Divider */}
              <div className="mt-8 mb-6 flex items-center gap-4">
                <span className="block w-12 h-px bg-white/20" aria-hidden="true" />
                <span className="block flex-1 h-px bg-white/10 max-w-[200px]" aria-hidden="true" />
              </div>

              <p
                className="text-[15.5px] leading-[1.8] max-w-[440px]"
                style={{ color: "rgba(255,255,255,0.62)" }}
              >
                {active === "projects"
                  ? "From concept to completion — exceptional architectural solutions across Nepal with precision and care."
                  : "Partnering with businesses and corporations to build landmark infrastructure across Nepal."}
              </p>

              {/* CTAs */}
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-brand-primary hover:bg-blue-700 text-white font-semibold text-[14px] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
                >
                  Start Your Project
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/our-work"
                  className="inline-flex items-center h-12 px-7 rounded-full border border-white/20 text-white/75 font-semibold text-[14px] hover:border-white/45 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
                >
                  View Our Works
                </Link>
              </div>
            </div>

            {/* ── Right: SVG animations ── */}
            <div className="hidden lg:flex items-center justify-center relative w-full" style={{ minHeight: "420px" }}>

              {/* Worker building — always present, fades out when Rumble is visible */}
              <div
                className="absolute inset-0 flex items-center justify-center transition-opacity duration-700"
                style={{
                  opacity: active === "projects" ? 1 : 0,
                  pointerEvents: active === "projects" ? "auto" : "none",
                }}
                aria-hidden={active !== "projects"}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/video-gif/constuction-worker-building.svg"
                  alt="Construction worker building illustration"
                  width={480}
                  height={360}
                  className="w-full max-w-[480px] h-auto drop-shadow-2xl"
                />
              </div>

              {/* Rumble — slides in clean after initial load or on Corp. tab */}
              <div
                className="absolute inset-0 flex items-center justify-center transition-all duration-700"
                style={{
                  opacity: active === "corp" ? 1 : 0,
                  transform: active === "corp" ? "translateY(0)" : "translateY(24px)",
                  pointerEvents: active === "corp" ? "auto" : "none",
                }}
                aria-hidden={active !== "corp"}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/video-gif/Rumble.svg"
                  alt="Construction site activity animation"
                  width={480}
                  height={360}
                  className="w-full max-w-[480px] h-auto drop-shadow-2xl"
                />
              </div>

              {/* Auto-sequence hint dot indicators */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-1.5" aria-hidden="true">
                {TABS.map((tab) => (
                  <span
                    key={tab.id}
                    className="block h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: active === tab.id ? "20px" : "6px",
                      background: active === tab.id ? "var(--color-brand-secondary, #60a5fa)" : "rgba(255,255,255,0.2)",
                    }}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="relative flex justify-center pb-6" aria-hidden="true">
        <div className="flex flex-col items-center gap-1.5 text-white/30">
          <span className="text-[9px] font-semibold tracking-[0.3em] uppercase">Scroll</span>
          <ChevronDown className="size-4 animate-bounce" />
        </div>
      </div>

      {/* Stats strip */}
      <div
        className="relative border-t border-white/10"
        style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(8px)" }}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {stats.map((s) => (
              <div key={s.label} className="py-5 sm:py-7 text-center">
                <p
                  className="text-[clamp(1.5rem,3vw,2rem)] font-bold text-white leading-none"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {s.num}
                </p>
                <p className="mt-2 text-[10.5px] font-semibold text-white/45 uppercase tracking-[0.14em]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
