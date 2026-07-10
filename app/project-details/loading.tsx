export default function ProjectLoading() {
  return (
    <div className="bg-[#f8fafc]">
      {/* Hero skeleton */}
      <section className="bg-[#0f2557]" style={{ minHeight: "88vh" }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-10 space-y-5">
          <div className="h-3 w-28 rounded-full bg-white/10 animate-pulse" />
          <div className="h-14 w-[520px] max-w-full rounded-lg bg-white/10 animate-pulse" />
          <div className="flex gap-4 pt-1">
            <div className="h-4 w-40 rounded bg-white/8 animate-pulse" />
            <div className="h-4 w-32 rounded bg-white/8 animate-pulse" />
          </div>
          <div className="flex gap-3 pt-2">
            <div className="h-12 w-44 rounded-full bg-white/10 animate-pulse" />
            <div className="h-12 w-32 rounded-full bg-white/8 animate-pulse" />
          </div>
        </div>

        {/* Stats strip */}
        <div className="border-t border-white/10 bg-[#07112b]/80">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-3 divide-x divide-white/10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="px-6 py-5 flex flex-col items-center gap-1.5">
                <div className="h-7 w-20 rounded-lg bg-white/10 animate-pulse" />
                <div className="h-3 w-28 rounded bg-white/6 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grid section skeleton */}
      <section className="py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div className="space-y-2">
              <div className="h-3 w-20 rounded bg-[#dde6f8] animate-pulse" />
              <div className="h-8 w-52 rounded-lg bg-[#dde6f8] animate-pulse" />
            </div>
            <div className="h-8 w-24 rounded-full bg-[#dde6f8] animate-pulse" />
          </div>
          <div className="flex gap-2 mb-7">
            {[80, 96, 104, 88].map((w, i) => (
              <div key={i} className="h-9 rounded-full bg-[#dde6f8] animate-pulse" style={{ width: w }} />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-[#dde6f8] animate-pulse aspect-[4/3]" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
