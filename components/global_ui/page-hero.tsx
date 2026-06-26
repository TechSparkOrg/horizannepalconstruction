import { BannerCarousel } from "@/components/global_ui/BannerCarousel"
import { getBanners } from "@/api/services/banner.service"

interface PageHeroProps {
  slug: string
  badge?: string
  srHeading?: string
  heading: string
  description: string
  minHeight?: string
  descClassName?: string
}

export async function PageHero({
  slug,
  badge,
  srHeading,
  heading,
  description,
  minHeight = "55vh",
  descClassName,
}: PageHeroProps) {
  const banners = await getBanners(slug).catch(() => null)

  return (
    <section
      className="relative flex items-center overflow-hidden bg-[#162d62]"
      style={{ minHeight }}
    >
      <BannerCarousel
        slug={slug}
        imgClassName="object-cover opacity-50"
        initialBanners={banners ?? undefined}
      />

      {/* Single directional gradient — bottom-heavy so text reads cleanly */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f2557]/90 via-[#0f2557]/40 to-transparent" />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20 text-center">
        {badge && (
          <span className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase text-white/70 border border-white/20 px-3 py-1 rounded mb-5">
            {badge}
          </span>
        )}

        {srHeading && <h1 className="sr-only">{srHeading}</h1>}

        <h1
          className="font-display font-bold text-white leading-[1.05] max-w-3xl mx-auto"
          style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
        >
          {heading}
        </h1>

        {/* Accent rule under heading */}
        <div className="mt-5 mb-5 mx-auto w-12 h-[3px] bg-[#cd2028]" />

        <p
          className={
            descClassName ??
            "text-white/65 text-[1.05rem] max-w-[580px] mx-auto leading-relaxed"
          }
        >
          {description}
        </p>
      </div>
    </section>
  )
}