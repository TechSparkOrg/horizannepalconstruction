export default function GreenCalculatorLoading() {
  return (
    <div className="bg-off-white">
      <section className="relative min-h-[55vh] flex items-center bg-brand-dark px-4 sm:px-6 lg:px-8">
        <div className="max-w-[800px] mx-auto w-full pt-32 pb-20 space-y-4">
          <div className="h-4 w-32 rounded-full bg-white/10 animate-pulse" />
          <div className="h-12 w-[500px] max-w-full rounded-lg bg-white/10 animate-pulse" />
          <div className="h-5 w-[400px] max-w-full rounded bg-white/10 animate-pulse" />
        </div>
      </section>

      <section className="py-16 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <div className="mx-auto h-8 w-64 rounded-lg bg-light-gray/40 animate-pulse" />
            <div className="mx-auto h-4 w-80 rounded bg-light-gray/30 animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-light-gray/40 p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-light-gray/30 animate-pulse" />
                  <div className="h-5 w-40 rounded bg-light-gray/40 animate-pulse" />
                </div>
                <div className="space-y-2">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <div className="size-4 rounded-full bg-light-gray/30 animate-pulse" />
                      <div className="h-3 flex-1 rounded bg-light-gray/30 animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl border border-light-gray/40 overflow-hidden">
            <div className="p-6 space-y-4">
              <div className="h-6 w-64 rounded bg-light-gray/40 animate-pulse" />
              <div className="space-y-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4 py-2 border-b border-light-gray/20 last:border-0">
                    <div className="h-4 flex-1 rounded bg-light-gray/30 animate-pulse" />
                    <div className="h-4 w-28 rounded bg-light-gray/30 animate-pulse" />
                    <div className="h-4 w-28 rounded bg-light-gray/30 animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
