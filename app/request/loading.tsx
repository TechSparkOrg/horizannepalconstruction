export default function RequestLoading() {
  return (
    <div className="bg-off-white">
      {/* Hero skeleton */}
      <section className="bg-brand-dark pt-28 pb-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="h-3 w-28 rounded-full bg-white/10 animate-pulse" />
          <div className="h-10 w-[380px] max-w-full rounded-lg bg-white/10 animate-pulse" />
          <div className="h-4 w-[300px] max-w-full rounded bg-white/8 animate-pulse" />
          <div className="flex gap-3 pt-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-24 h-16 rounded-xl bg-white/6 border border-white/10 animate-pulse" />
            ))}
          </div>
        </div>
      </section>

      {/* Steps skeleton */}
      <section className="bg-[#f8fafc] py-14 border-b border-[#e2e8f0]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="w-8 h-6 rounded bg-light-gray/40 animate-pulse shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-light-gray/40 animate-pulse" />
                  <div className="h-3 w-full rounded bg-light-gray/30 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form skeleton */}
      <div className="flex flex-col lg:flex-row-reverse">
        <div className="lg:w-[55%] bg-[#07112b] px-8 lg:px-14 py-12 space-y-5">
          <div className="h-3 w-24 rounded bg-white/10 animate-pulse" />
          <div className="h-8 w-56 rounded-lg bg-white/10 animate-pulse" />
          <div className="h-4 w-72 rounded bg-white/8 animate-pulse" />
          <div className="h-24 rounded-xl bg-white/6 animate-pulse mt-6" />
          <div className="flex gap-3 mt-auto pt-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-1 h-16 rounded-xl bg-white/6 border border-white/10 animate-pulse" />
            ))}
          </div>
        </div>
        <div className="lg:w-[45%] bg-[#f8fafc] px-8 lg:px-14 py-12 space-y-4">
          <div className="h-6 w-44 rounded-lg bg-light-gray/40 animate-pulse" />
          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-1.5">
                <div className="h-3 w-20 rounded bg-light-gray/40 animate-pulse" />
                <div className="h-11 w-full rounded-xl bg-light-gray/30 animate-pulse" />
              </div>
            ))}
            <div className="sm:col-span-2 space-y-1.5">
              <div className="h-3 w-20 rounded bg-light-gray/40 animate-pulse" />
              <div className="h-24 w-full rounded-xl bg-light-gray/30 animate-pulse" />
            </div>
          </div>
          <div className="h-[54px] w-full rounded-xl bg-light-gray/30 animate-pulse mt-4" />
        </div>
      </div>
    </div>
  );
}
