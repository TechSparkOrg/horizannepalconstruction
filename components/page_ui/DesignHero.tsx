import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

const stats = [
  { val: "150+", label: "Projects Designed" },
  { val: "12yr",  label: "Experience"         },
  { val: "98%",  label: "Client Satisfaction" },
];

export function DesignHero({ svgUrl }: { svgUrl?: string }) {
  return (
    <section
      className="relative bg-brand-dark overflow-hidden"
      style={{ minHeight: "88vh" }}
      aria-label="Design services hero"
    >
      {/* Architectural grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Left brand rule */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#cd2028] hidden lg:block" aria-hidden="true" />

      {/* Radial blue glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 72% 50%, rgba(29,78,216,0.09) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center min-h-[88vh]">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-28 lg:py-0 w-full">

          {/* ── Left content ── */}
          <div>
            <p className="text-[#cd2028] text-[11px] font-bold tracking-[0.26em] uppercase mb-5 flex items-center gap-2.5">
              <span className="block w-4 h-px bg-[#cd2028]" aria-hidden="true" />
              Architectural Design
            </p>

            <h1
              className="font-display font-black text-white leading-[1.03] tracking-[-0.02em]"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
            >
              Design That<br />
              <span className="text-[#3b82f6]">Inspires.</span>
            </h1>

            <p className="mt-6 text-white/60 text-[15px] leading-[1.78] max-w-[420px]">
              From concept sketches to stunning 3D visualisations — our design team crafts spaces that are beautiful, functional, and built to endure.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/request"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-[#cd2028] hover:bg-[#b91c1c] text-white font-bold text-[13.5px] transition-colors focus-visible:ring-2 focus-visible:ring-[#cd2028] focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
              >
                Request a Design <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/project-details"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-full border border-white/20 hover:border-white/40 text-white/80 hover:text-white font-semibold text-[13.5px] transition-colors focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
              >
                View Our Work <ChevronRight className="size-4" />
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 pt-8 border-t border-white/10 flex gap-8 sm:gap-12">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-white font-black text-[28px] leading-none">{s.val}</p>
                  <p className="text-white/40 text-[10px] font-semibold mt-1.5 uppercase tracking-[0.16em]">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right — Rumble.svg ── */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-[520px] mx-auto">
              {/* Outer glow rings */}
              <div className="absolute -inset-5 rounded-3xl border border-white/6" aria-hidden="true" />
              <div className="absolute -inset-10 rounded-[2rem] border border-white/[0.03]" aria-hidden="true" />

              {/* Main container */}
              <div className="relative rounded-2xl overflow-hidden bg-white/[0.04] border border-white/10 p-3 backdrop-blur-sm">
                <Image
                  src={svgUrl || "/video-gif/Rumble.svg"}
                  alt="Architectural design process — structural rumble animation"
                  width={520}
                  height={420}
                  className="w-full h-auto object-contain"
                  priority
                  unoptimized
                />
              </div>

              {/* Floating badge */}
              <div
                className="absolute -bottom-5 -left-4 bg-[#cd2028] text-white rounded-2xl px-4 py-3 shadow-[0_8px_30px_rgba(205,32,40,0.35)]"
                aria-hidden="true"
              >
                <p className="text-[9.5px] font-bold uppercase tracking-[0.2em] opacity-80">Design Studio</p>
                <p className="text-[15px] font-black leading-tight">Nepal&apos;s #1 Choice</p>
              </div>

              {/* Precision badge */}
              <div
                className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-md border border-white/15 text-white rounded-xl px-3.5 py-2.5"
                aria-hidden="true"
              >
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/60">Since</p>
                <p className="text-[18px] font-black leading-tight">2012</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom gradient fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#f8fafc] to-transparent" aria-hidden="true" />
    </section>
  );
}
