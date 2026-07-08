export default function ReviewsLoading() {
  return (
    <div className="bg-[#f5f7fb]">

      {/* Hero skeleton — matches new SVG hero */}
      <section className="relative bg-[#0f2557] min-h-[60svh] sm:min-h-[72svh] flex items-end">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-8 pb-8 sm:pb-14 space-y-3">
          <div className="h-3 w-28 rounded-full bg-white/20 animate-pulse" />
          <div className="h-10 w-[300px] sm:w-[460px] rounded-lg bg-white/20 animate-pulse" />
          <div className="h-5 w-[220px] sm:w-[340px] rounded bg-white/15 animate-pulse" />
          <div className="h-4 w-[200px] sm:w-[300px] rounded bg-white/10 animate-pulse" />
          <div className="flex gap-3 pt-2">
            <div className="h-11 w-[152px] rounded-xl bg-[#cd2028]/50 animate-pulse" />
            <div className="h-11 w-[120px] rounded-xl bg-white/10 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Masonry skeleton */}
      <section className="py-16 sm:py-20 bg-[#f5f7fb]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden sm:grid sm:grid-cols-3 gap-4 items-start">
            {[0, 1, 2].map((col) => (
              <div key={col} className={`flex flex-col gap-4 ${col === 1 ? "sm:mt-8" : ""}`}>
                {Array.from({ length: col === 1 ? 4 : 3 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-[#e2e8f0] p-5 sm:p-6 space-y-4">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <div key={s} className="size-3.5 rounded bg-[#e2e8f0] animate-pulse" />
                      ))}
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 w-full rounded bg-[#f1f5f9] animate-pulse" />
                      <div className="h-3 w-11/12 rounded bg-[#f1f5f9] animate-pulse" />
                      <div className="h-3 w-4/5 rounded bg-[#f1f5f9] animate-pulse" />
                    </div>
                    <div className="flex items-center gap-3 pt-3 border-t border-[#f1f5f9]">
                      <div className="size-9 rounded-full bg-[#e2e8f0] animate-pulse shrink-0" />
                      <div className="space-y-1.5">
                        <div className="h-3 w-24 rounded bg-[#e2e8f0] animate-pulse" />
                        <div className="h-2.5 w-16 rounded bg-[#f1f5f9] animate-pulse" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Mobile skeleton */}
          <div className="flex flex-col gap-4 sm:hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className="size-3.5 rounded bg-[#e2e8f0] animate-pulse" />
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-full rounded bg-[#f1f5f9] animate-pulse" />
                  <div className="h-3 w-5/6 rounded bg-[#f1f5f9] animate-pulse" />
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-[#f1f5f9]">
                  <div className="size-9 rounded-full bg-[#e2e8f0] animate-pulse shrink-0" />
                  <div className="h-3 w-24 rounded bg-[#e2e8f0] animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
