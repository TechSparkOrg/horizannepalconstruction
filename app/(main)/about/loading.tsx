export default function AboutLoading() {
  return (
    <div className="bg-off-white">
      <section className="relative min-h-[60vh] flex items-center bg-brand-dark px-4 sm:px-6 lg:px-8">
        <div className="max-w-[800px] mx-auto w-full pt-32 pb-20 text-center space-y-4">
          <div className="mx-auto h-4 w-32 rounded-full bg-white/10 animate-pulse" />
          <div className="mx-auto h-12 w-[500px] max-w-full rounded-lg bg-white/10 animate-pulse" />
          <div className="mx-auto h-5 w-[400px] max-w-full rounded bg-white/10 animate-pulse" />
        </div>
      </section>

      <section className="py-16 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <div className="mx-auto h-4 w-24 rounded-full bg-light-gray/40 animate-pulse" />
            <div className="mx-auto h-8 w-64 rounded-lg bg-light-gray/40 animate-pulse" />
            <div className="mx-auto h-4 w-80 rounded bg-light-gray/30 animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-light-gray/40 p-6 text-center space-y-3">
                <div className="mx-auto size-8 rounded-lg bg-light-gray/30 animate-pulse" />
                <div className="mx-auto h-4 w-28 rounded bg-light-gray/40 animate-pulse" />
                <div className="space-y-2">
                  <div className="h-3 w-full rounded bg-light-gray/30 animate-pulse" />
                  <div className="h-3 w-3/4 mx-auto rounded bg-light-gray/30 animate-pulse" />
                </div>
                <div className="flex justify-center gap-2">
                  <div className="size-6 rounded-md bg-light-gray/30 animate-pulse" />
                  <div className="size-6 rounded-md bg-light-gray/30 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-28 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <div className="mx-auto h-4 w-32 rounded-full bg-light-gray/40 animate-pulse" />
            <div className="mx-auto h-8 w-72 rounded-lg bg-light-gray/40 animate-pulse" />
            <div className="mx-auto h-4 w-96 rounded bg-light-gray/30 animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-off-white rounded-xl border border-light-gray/40 p-6 space-y-3">
                <div className="flex gap-1">
                  {[1,2,3,4,5].map((s) => <div key={s} className="size-4 rounded bg-light-gray/30 animate-pulse" />)}
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-full rounded bg-light-gray/40 animate-pulse" />
                  <div className="h-3 w-11/12 rounded bg-light-gray/40 animate-pulse" />
                  <div className="h-3 w-3/4 rounded bg-light-gray/40 animate-pulse" />
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-light-gray/30">
                  <div className="size-11 rounded-full bg-light-gray/30 animate-pulse" />
                  <div className="space-y-1.5">
                    <div className="h-3 w-24 rounded bg-light-gray/40 animate-pulse" />
                    <div className="h-2.5 w-16 rounded bg-light-gray/30 animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`rounded-xl bg-light-gray/30 animate-pulse ${
                  i >= 6 ? "hidden md:block" : ""
                } ${i === 0 || i === 7 ? "md:col-span-2 md:row-span-2" : ""}`}
              >
                <div className={`${i === 0 || i === 7 ? "aspect-[4/3]" : "aspect-square"}`} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
