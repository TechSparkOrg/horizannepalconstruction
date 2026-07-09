import Image from "next/image"

const stats = [
  { num: "500+", label: "Projects Completed" },
  { num: "12+",  label: "Years Experience"   },
  { num: "98%",  label: "Client Satisfaction" },
  { num: "50+",  label: "Expert Team"         },
];

export function HeroSection() {
  return (
    <section id="home" className="relative w-full overflow-hidden bg-brand-dark" style={{ minHeight: "100svh" }}>

      {/* ── Bulldozer SVG — full bleed ── */}
      <Image
        src="/video-gif/construnction-bull-dozer.svg"
        alt="Construction bulldozer illustration"
        fill
        sizes="100vw"
        className="object-cover object-center"
        priority
        unoptimized
      />

      {/* Top fade */}
      <div
        className="absolute inset-x-0 top-0 h-48 pointer-events-none z-10"
        aria-hidden="true"
        style={{ background: "linear-gradient(to bottom, var(--color-brand-dark) 5%, transparent)" }}
      />

      {/* Bottom fade — toward brand-dark */}
      <div
        className="absolute inset-x-0 bottom-0 h-72 pointer-events-none z-10"
        aria-hidden="true"
        style={{ background: "linear-gradient(to top, var(--color-brand-dark) 40%, transparent)" }}
      />

      {/* ── Bottom: company name + stats — stacked, no gap ── */}
      <div className="absolute inset-x-0 bottom-2 z-20 px-4 sm:px-10 pb-14">

        {/* Company name */}
        <div className="mb-4 text-center">
          <div className="inline-flex items-center gap-2.5 mb-2.5">
            <span className="block w-6 h-px bg-[#cd2028]" aria-hidden="true" />
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-black m-0">
              Nepal&apos;s Premier Construction
            </p>
            <span className="block w-6 h-px bg-[#cd2028]" aria-hidden="true" />
          </div>
          <h1 className="text-[clamp(2rem,6vw,3.6rem)] font-black text-white leading-none tracking-[-0.03em]">
            Horizon{" "}
            <span className="text-[#cd2028]">Nepal</span>{" "}
            Construction
          </h1>
        </div>

        {/* Stats card — white */}
        <div
          className="grid grid-cols-4 rounded-full overflow-hidden border border-[#e8edf5] bg-white"
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center py-3 px-2"
              style={{
                borderRight: i < stats.length - 1 ? "1px solid #e8edf5" : "none",
              }}
            >
              <span className="text-[clamp(1.4rem,3vw,2rem)] font-black text-[#0f2557] leading-none tabular-nums">
                {s.num}
              </span>
              <span className="mt-1 text-[9px] font-semibold text-[#cd2028] uppercase tracking-[0.14em] text-center leading-tight">
                {s.label}
              </span>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
