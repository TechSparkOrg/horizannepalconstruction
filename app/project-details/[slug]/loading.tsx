export default function ProjectDetailLoading() {
  return (
    <div className="bg-[#f8fafc]">
      {/* Hero skeleton */}
      <section className="bg-[#07112b]" style={{ minHeight: "72vh" }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-10 space-y-4">
          <div className="h-3 w-24 rounded bg-white/10 animate-pulse" />
          <div className="flex gap-2">
            <div className="h-7 w-20 rounded-md bg-white/10 animate-pulse" />
            <div className="h-7 w-24 rounded-md bg-white/10 animate-pulse" />
          </div>
          <div className="h-14 w-[480px] max-w-full rounded-lg bg-white/10 animate-pulse" />
          <div className="flex gap-4">
            <div className="h-4 w-36 rounded bg-white/8 animate-pulse" />
            <div className="h-4 w-28 rounded bg-white/8 animate-pulse" />
          </div>
        </div>
      </section>

      {/* About section skeleton */}
      <section className="py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_420px] gap-16 items-start">
          <div className="space-y-4">
            <div className="h-3 w-28 rounded bg-[#dde6f8] animate-pulse" />
            <div className="h-9 w-64 rounded-lg bg-[#dde6f8] animate-pulse" />
            <div className="space-y-2 pt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-4 rounded bg-[#e8edf8] animate-pulse" style={{ width: `${95 - i * 7}%` }} />
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-[#e2e8f0] p-4 space-y-1.5">
                  <div className="h-3 w-16 rounded bg-[#e2e8f0] animate-pulse" />
                  <div className="h-5 w-24 rounded bg-[#dde6f8] animate-pulse" />
                </div>
              ))}
            </div>
          </div>
          <div className="aspect-[4/3] rounded-2xl bg-[#dde6f8] animate-pulse" />
        </div>
      </section>

      {/* Materials skeleton */}
      <section className="bg-white py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2">
            <div className="h-3 w-24 rounded bg-[#e2e8f0] animate-pulse" />
            <div className="h-7 w-44 rounded-lg bg-[#dde6f8] animate-pulse" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex gap-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-5">
                <div className="size-9 rounded-lg bg-[#e2e8f0] animate-pulse shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-4 w-32 rounded bg-[#dde6f8] animate-pulse" />
                  <div className="h-3 w-full rounded bg-[#e8edf8] animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery skeleton */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="h-7 w-44 rounded-lg bg-[#dde6f8] animate-pulse" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            <div className="rounded-xl bg-[#dde6f8] animate-pulse col-span-2" style={{ aspectRatio: "16/9" }} />
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="rounded-xl bg-[#dde6f8] animate-pulse aspect-[4/3]" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
