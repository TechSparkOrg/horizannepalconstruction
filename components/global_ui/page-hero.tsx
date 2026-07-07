import { BannerCarousel } from "@/components/global_ui/BannerCarousel"
import type { MediaItem } from "@/api/types/media.types"

interface PageHeroProps {
  slug: string
  badge?: string
  srHeading?: string
  heading: string
  description: string
  minHeight?: string
  descClassName?: string
  initialBanners?: MediaItem[]
}

export async function PageHero({
  slug,
  badge,
  srHeading,
  heading,
  description,
  minHeight = "55vh",
  descClassName,
  initialBanners,
}: PageHeroProps) {
  return (
    <section
      className="relative flex items-end overflow-hidden bg-[#0f2557]"
      style={{ minHeight }}
    >
      <BannerCarousel
        slug={slug}
        imgClassName="object-cover"
        initialBanners={initialBanners}
      />

      {/* Bottom-anchored gradient — image visible top, dark at base */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a3d]/95 via-[#0f2557]/50 to-transparent" />

      {/* Left-side vertical red rule — desktop only */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#cd2028] hidden lg:block" />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-36 pb-14 lg:pb-16">
        {srHeading && <h1 className="sr-only">{srHeading}</h1>}

        {badge && (
          <p className="text-[#cd2028] text-[11px] font-bold tracking-[0.22em] uppercase mb-4">
            {badge}
          </p>
        )}

        <h1
          className="font-display font-bold text-white leading-[1.05] max-w-3xl"
          style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
        >
          {heading}
        </h1>

        <div className="mt-5 flex items-center gap-4">
          <div className="w-10 h-[3px] bg-[#cd2028] shrink-0" />
          <p
            className={
              descClassName ??
              "text-white/60 text-[0.975rem] leading-relaxed"
            }
          >
            {description}
          </p>
        </div>
      </div>
    </section>
  )
}