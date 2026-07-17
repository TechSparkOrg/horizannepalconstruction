import Image from "next/image";

export function OurWorkHero({ svgUrl }: { svgUrl?: string }) {
  return (
    <section className="relative w-full overflow-hidden bg-[#0f2557] min-h-[85svh] sm:min-h-[115svh]">
      {/* Full-bleed SVG background */}
      <Image
        src={svgUrl || "/video-gif/maintainace-building.svg"}
        alt="Construction and building projects illustration"
        fill
        className="object-contain object-center"
        sizes="100vw"
        priority
        unoptimized
      />

      {/* Top fade — navy to transparent */}
      <div
        className="absolute inset-x-0 top-0 h-48 pointer-events-none z-10"
        aria-hidden="true"
        style={{ background: "linear-gradient(to bottom, #0f2557 5%, transparent)" }}
      />

      {/* Bottom fade — transparent to navy */}
      <div
        className="absolute inset-x-0 bottom-0 h-72 pointer-events-none z-10"
        aria-hidden="true"
        style={{ background: "linear-gradient(to top, #0f2557 40%, transparent)" }}
      />

      {/* Content — anchored to bottom, centered */}
      <div className="absolute inset-x-0 bottom-2 z-20 px-4 sm:px-10 pb-6 sm:pb-14">

        {/* Badge + heading */}
        <div className="mb-4 text-center">
          <div className="inline-flex items-center gap-2.5 mb-2.5">
            <span className="block w-6 h-px bg-[#cd2028]" aria-hidden="true" />
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/70 m-0">
              Our Portfolio
            </p>
            <span className="block w-6 h-px bg-[#cd2028]" aria-hidden="true" />
          </div>

          <h1
            className="font-display font-black text-white leading-none tracking-[-0.03em]"
            style={{ fontSize: "clamp(2rem, 6vw, 3.6rem)" }}
          >
            Projects That{" "}
            <span className="text-[#cd2028]">Speak</span>{" "}
            for Themselves
          </h1>

          <p className="mt-3 text-white/65 text-sm sm:text-base max-w-[520px] mx-auto leading-relaxed">
            Every project tells a story of collaboration, craftsmanship, and commitment to lasting quality — across Nepal.
          </p>
        </div>

      </div>
    </section>
  );
}
