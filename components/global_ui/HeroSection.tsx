import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BannerCarousel } from "@/components/global_ui/BannerCarousel";
import type { MediaItem } from "@/api/types/media.types";

const stats = [
  { num: "500", suffix: "+", label: "Projects Completed" },
  { num: "12", suffix: "+", label: "Years Experience" },
  { num: "98", suffix: "%", label: "Client Satisfaction" },
];

export function HeroSection({ initialBanners }: { initialBanners?: MediaItem[] }) {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">

      <BannerCarousel
        carousel
        imgClassName="object-cover"
        overlay="linear-gradient(100deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.75) 45%, rgba(255,255,255,0.0) 100%)"
        initialBanners={initialBanners}
      />

      <div
        className="absolute bottom-0 inset-x-0 h-24 pointer-events-none bg-gradient-to-t from-white to-transparent"
        aria-hidden="true"
      />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-24">
        <div className="max-w-[540px]">

          {/* Label */}
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-brand-primary">
            Architecture &amp; Design &amp; Construction
          </p>

          {/* Heading */}
          <h1 className="mt-4 text-[clamp(2.2rem,4.5vw,3.6rem)] font-bold text-brand-dark leading-[1.1] tracking-tight">
            Building Dreams,<br />Shaping Nepal&apos;s Future
          </h1>

          {/* Body */}
          <p className="mt-5 text-[15px] text-mid-gray leading-[1.7] max-w-[420px]">
            From concept to completion — exceptional architectural solutions across Nepal with precision and care.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-brand-primary hover:bg-blue-700 text-white font-semibold text-[13.5px] transition-colors"
            >
              Start Your Project
              <ArrowRight className="size-3.5" />
            </Link>
            <Link
              href="/our-work"
              className="inline-flex items-center h-10 px-5 rounded-full border border-light-gray text-mid-gray font-semibold text-[13.5px] hover:border-brand-secondary hover:text-brand-dark transition-colors"
            >
              View Our Works
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-10 pt-8 border-t border-light-gray flex items-center gap-8">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-[26px] font-bold text-brand-dark leading-none tracking-tight">
                  {s.num}<span className="text-brand-primary">{s.suffix}</span>
                </div>
                <div className="mt-1.5 text-[12px] text-muted-foreground font-medium">{s.label}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}