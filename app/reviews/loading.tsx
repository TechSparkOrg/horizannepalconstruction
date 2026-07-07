export default function ReviewsLoading() {
  return (
    <div className="bg-off-white">
      <section className="relative min-h-[72vh] flex items-end bg-brand-dark px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-[1200px] mx-auto pb-16 pt-32 space-y-4">
          <div className="h-3 w-24 rounded bg-white/10 animate-pulse" />
          <div className="h-10 w-[500px] max-w-full rounded-lg bg-white/10 animate-pulse" />
          <div className="h-10 w-[180px] rounded-lg bg-white/10 animate-pulse" />
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-[#f5f7fb]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden sm:grid sm:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, col) => (
              <div key={col} className={`flex flex-col gap-4 ${col === 1 ? "sm:mt-8" : ""}`}>
                {Array.from({ length: col === 1 ? 4 : 3 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-xl border border-light-gray/40 p-6 space-y-3">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <div key={s} className="size-3.5 rounded bg-light-gray/30 animate-pulse" />
                      ))}
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 w-full rounded bg-light-gray/30 animate-pulse" />
                      <div className="h-3 w-11/12 rounded bg-light-gray/30 animate-pulse" />
                      <div className="h-3 w-4/5 rounded bg-light-gray/30 animate-pulse" />
                    </div>
                    <div className="flex items-center gap-3 pt-2 border-t border-light-gray/20">
                      <div className="size-9 rounded-full bg-light-gray/30 animate-pulse" />
                      <div className="h-3 w-24 rounded bg-light-gray/40 animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
