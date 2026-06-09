export default function OurWorkLoading() {
  return (
    <div className="bg-off-white">
      <section className="relative min-h-[70vh] flex items-center bg-brand-dark">
        <div className="absolute inset-0 grid grid-cols-3 gap-0">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-full bg-brand-dark/80 animate-pulse" />
          ))}
        </div>
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20">
          <div className="max-w-2xl space-y-4">
            <div className="h-4 w-32 rounded-full bg-white/10 animate-pulse" />
            <div className="h-14 w-[500px] max-w-full rounded-lg bg-white/10 animate-pulse" />
            <div className="h-5 w-[400px] max-w-full rounded bg-white/10 animate-pulse" />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 bg-white rounded-xl border border-light-gray/40 p-3">
              <div className="size-16 sm:size-20 rounded-lg bg-light-gray/30 animate-pulse shrink-0" />
              <div className="flex-1 min-w-0 space-y-2">
                <div className="h-4 w-3/4 rounded bg-light-gray/40 animate-pulse" />
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <div className="h-3 w-24 rounded bg-light-gray/30 animate-pulse" />
                  <div className="h-3 w-20 rounded bg-light-gray/30 animate-pulse" />
                  <div className="h-5 w-16 rounded-full bg-light-gray/30 animate-pulse" />
                </div>
              </div>
              <div className="h-4 w-20 rounded bg-light-gray/30 animate-pulse shrink-0" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
