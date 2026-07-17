import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

const stats = [
  { val: "500+", label: "Projects Completed" },
  { val: "12+",  label: "Years Experience"   },
  { val: "98%",  label: "Client Satisfaction" },
  { val: "50+",  label: "Expert Team"         },
];

export function HeroSection({ svgUrl }: { svgUrl?: string }) {
  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-[#07112b] flex flex-col"
      style={{ minHeight: "90vh" }}
      aria-label="Horizon Nepal Construction — homepage hero"
    >
      {/* Bulldozer SVG — full bleed background */}
      <Image
        src={svgUrl || "/video-gif/construnction-bull-dozer.svg"}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
        priority
        unoptimized
        aria-hidden="true"
      />

      {/* Top fade */}
      <div
        className="absolute inset-x-0 top-0 h-36 pointer-events-none z-10"
        aria-hidden="true"
        style={{ background: "linear-gradient(to bottom, #07112b 15%, transparent)" }}
      />

      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-56 pointer-events-none z-10"
        aria-hidden="true"
        style={{ background: "linear-gradient(to top, #07112b 40%, transparent)" }}
      />

      {/* Left brand rule */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#cd2028] z-20 hidden lg:block" aria-hidden="true" />

      {/* Main content */}
      <div className="relative z-20 flex-1 flex items-center">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-6">

          {/* Eyebrow */}
          <p className="text-[#cd2028] text-[11px] font-bold tracking-[0.26em] uppercase mb-5 flex items-center gap-2.5">
            <span className="block w-4 h-px bg-[#cd2028]" aria-hidden="true" />
            Nepal&apos;s Premier Construction
          </p>

          {/* Headline */}
          <h1
            className="font-display font-black text-white leading-[1.03] tracking-[-0.025em] max-w-2xl"
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 4rem)" }}
          >
            Building{" "}
            <span className="text-[#cd2028]">Nepal&apos;s</span>
            <br />
            Future Together
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-white/58 text-[15px] leading-[1.78] max-w-[460px]">
            Architecture, engineering, and construction under one roof — delivering quality projects across Nepal since 2012.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/request"
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-[#cd2028] hover:bg-[#b91c1c] text-white font-bold text-[13.5px] transition-colors focus-visible:ring-2 focus-visible:ring-[#cd2028] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07112b]"
            >
              Start Your Project <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/project-details"
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full border border-white/20 hover:border-white/40 text-white/80 hover:text-white font-semibold text-[13.5px] transition-colors"
            >
              View Our Work <ChevronRight className="size-4" />
            </Link>
          </div>

        </div>
      </div>

      {/* Stats strip — same as AboutHero */}
      <div className="relative z-20 border-t border-white/10 bg-[#07112b]/85 backdrop-blur-sm">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {stats.map((s) => (
              <div key={s.label} className="px-4 sm:px-8 py-5 text-center">
                <dt className="sr-only">{s.label}</dt>
                <dd
                  className="font-black text-white leading-none"
                  style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}
                >
                  {s.val}
                </dd>
                <p className="text-white/38 text-[10px] sm:text-[10.5px] font-semibold mt-1.5 uppercase tracking-[0.16em]">
                  {s.label}
                </p>
              </div>
            ))}
          </dl>
        </div>
      </div>

    </section>
  );
}
