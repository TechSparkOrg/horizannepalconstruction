export default function ProjectDetailLoading() {
  return (
    <div className="bg-off-white">
      <section className="relative min-h-[70vh] flex items-center bg-brand-dark">
        <div className="absolute inset-0 bg-brand-dark/60 animate-pulse" />
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20">
          <div className="max-w-2xl space-y-4">
            <div className="h-4 w-32 rounded-full bg-white/10 animate-pulse" />
            <div className="h-14 w-[500px] max-w-full rounded-lg bg-white/10 animate-pulse" />
            <div className="flex items-center gap-4">
              <div className="h-4 w-40 rounded bg-white/10 animate-pulse" />
              <div className="h-4 w-32 rounded bg-white/10 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-4">
              <div className="h-4 w-24 rounded-full bg-light-gray/40 animate-pulse" />
              <div className="h-8 w-72 rounded-lg bg-light-gray/40 animate-pulse" />
              <div className="space-y-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-4 w-full rounded bg-light-gray/30 animate-pulse" />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-light-gray/40 p-4 space-y-2">
                  <div className="h-3 w-16 rounded bg-light-gray/30 animate-pulse" />
                  <div className="h-5 w-24 rounded bg-light-gray/40 animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="h-8 w-48 rounded-lg bg-light-gray/40 animate-pulse" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-light-gray/40 p-4 flex items-start gap-3">
                  <div className="size-5 rounded bg-light-gray/30 animate-pulse shrink-0 mt-0.5" />
                  <div className="space-y-1 flex-1">
                    <div className="h-4 w-32 rounded bg-light-gray/40 animate-pulse" />
                    <div className="h-3 w-full rounded bg-light-gray/30 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="h-8 w-64 rounded-lg bg-light-gray/40 animate-pulse" />
            <div className="bg-white rounded-xl border border-light-gray/40 overflow-hidden">
              <div className="p-6 space-y-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-light-gray/20 last:border-0">
                    <div className="h-4 w-40 rounded bg-light-gray/30 animate-pulse" />
                    <div className="h-4 w-24 rounded bg-light-gray/30 animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="aspect-video max-h-[500px] rounded-2xl bg-light-gray/30 animate-pulse" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="aspect-[4/3] rounded-lg bg-light-gray/30 animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
