import Image from "next/image"

interface ImageGridProps {
  initialItems?: { id: string; url: string; alt?: string }[]
  label: string
  heading: string
  description: string
  bg?: string
  priority?: boolean
}

function Skeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className={`rounded-2xl bg-[#e2e8f0] animate-pulse ${i >= 6 ? "hidden md:block" : ""} ${i === 0 || i === 7 ? "md:col-span-2 md:row-span-2" : ""}`}
        >
          <div className={i === 0 || i === 7 ? "aspect-[4/3]" : "aspect-square"} />
        </div>
      ))}
    </div>
  )
}

export function ImageGrid({
  initialItems,
  label,
  heading,
  description,
  bg = "bg-[#f8fafc]",
  priority: enablePriority = false,
}: ImageGridProps) {
  const images = (initialItems ?? []).filter((b) => b.url)

  return (
    <section className={`py-16 sm:py-24 border-t border-[#e2e8f0] ${bg}`}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
            <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-[#1d4ed8]">
              {label}
            </span>
          </div>
          <h2 className="font-display text-[26px] sm:text-[32px] font-bold text-[#0f2557] leading-tight">
            {heading}
          </h2>
          <p className="mt-2 text-[13.5px] text-[#475569] max-w-[480px] leading-relaxed">
            {description}
          </p>
        </div>

        {/* Grid */}
        {!initialItems ? (
          <Skeleton />
        ) : images.length === 0 ? null : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {images.map((b, i) => (
              <div
                key={b.id}
                className={`relative rounded-2xl overflow-hidden group cursor-pointer ${
                  i >= 6 ? "hidden md:block" : ""
                } ${i === 0 || i === 7 ? "md:col-span-2 md:row-span-2" : ""}`}
              >
                <div className={`relative ${i === 0 || i === 7 ? "aspect-[4/3]" : "aspect-square"}`}>
                  <Image
                    src={b.url}
                    alt={b.alt || "Gallery image"}
                    fill
                    priority={enablePriority && i === 0}
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    loading={enablePriority && i === 0 ? undefined : "lazy"}
                  />
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#0f2557]/0 group-hover:bg-[#0f2557]/40 transition-colors duration-300" />

                {/* Caption */}
                {b.alt && (
                  <div className="absolute bottom-0 inset-x-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-[#07112b]/80 to-transparent">
                    <p className="text-white text-[13px] font-medium leading-snug">{b.alt}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
