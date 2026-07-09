export default function FaqLoading() {
  return (
    <div className="bg-[#f5f7fb]">
      {/* Hero skeleton — matches split-panel layout */}
      <section className="relative min-h-[62svh] sm:min-h-[68svh] flex flex-col justify-end bg-[#0f2557] px-4 sm:px-8 pb-10 sm:pb-14 pt-28 overflow-hidden">
        {/* faint SVG placeholder */}
        <div className="absolute right-0 top-0 h-full w-full lg:w-[55%] bg-white/[0.03] rounded-none" />
        <div className="max-w-[1200px] mx-auto w-full space-y-4">
          <div className="h-3 w-20 rounded-full bg-white/20 animate-pulse" />
          <div className="h-10 w-[280px] sm:w-[420px] rounded-lg bg-white/20 animate-pulse" />
          <div className="h-5 w-[200px] sm:w-[340px] rounded bg-white/10 animate-pulse" />
          <div className="flex gap-3 pt-1">
            <div className="h-11 w-[172px] rounded-xl bg-[#cd2028]/50 animate-pulse" />
            <div className="h-11 w-[100px] rounded-xl bg-white/10 animate-pulse" />
          </div>
        </div>
      </section>

      {/* FAQ section skeleton */}
      <section className="py-16 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-xl mb-14 space-y-3">
            <div className="h-3 w-24 rounded-full bg-[#e2e8f0] animate-pulse" />
            <div className="h-9 w-64 rounded-lg bg-[#e2e8f0] animate-pulse" />
            <div className="h-4 w-48 rounded bg-[#f1f5f9] animate-pulse" />
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
            {/* Left: category tabs */}
            <div className="w-full lg:w-72 shrink-0 space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3.5 rounded-lg bg-white border border-[#e2e8f0]">
                  <div className="size-8 rounded-md bg-[#e2e8f0] animate-pulse shrink-0" />
                  <div className="h-4 flex-1 rounded bg-[#f1f5f9] animate-pulse" />
                </div>
              ))}
              <div className="hidden lg:block mt-6 bg-[#0f2557]/10 rounded-xl p-5 space-y-2">
                <div className="h-3 w-20 rounded bg-[#e2e8f0] animate-pulse" />
                <div className="h-8 w-16 rounded bg-[#e2e8f0] animate-pulse" />
              </div>
            </div>

            {/* Right: accordion panel */}
            <div className="flex-1 min-w-0 bg-white rounded-xl border border-[#e2e8f0] overflow-hidden">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-[#e2e8f0]">
                <div className="size-4 rounded bg-[#e2e8f0] animate-pulse" />
                <div className="h-4 w-40 rounded bg-[#e2e8f0] animate-pulse" />
              </div>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-start gap-4 px-6 py-4 border-b border-[#f1f5f9] last:border-b-0">
                  <div className="h-4 w-6 rounded bg-[#f1f5f9] animate-pulse shrink-0 mt-0.5" />
                  <div className="flex-1 h-4 rounded bg-[#f1f5f9] animate-pulse" />
                  <div className="size-6 rounded-md bg-[#e2e8f0] animate-pulse shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
