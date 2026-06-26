export default function ContactLoading() {
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
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="bg-brand-dark rounded-2xl p-8 sm:p-12 space-y-6">
              <div className="h-4 w-32 rounded-full bg-white/10 animate-pulse" />
              <div className="h-10 w-72 rounded-lg bg-white/10 animate-pulse" />
              <div className="h-4 w-80 rounded bg-white/10 animate-pulse" />
              <div className="h-32 rounded-xl bg-white/8 animate-pulse" />
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3.5">
                    <div className="size-6 rounded bg-white/10 animate-pulse" />
                    <div className="h-4 w-48 rounded bg-white/10 animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-off-white rounded-2xl p-8 sm:p-10 space-y-6">
              <div className="h-8 w-56 rounded-lg bg-light-gray/40 animate-pulse" />
              <div className="grid sm:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="h-3 w-24 rounded bg-light-gray/40 animate-pulse" />
                    <div className="h-11 w-full rounded-md bg-light-gray/30 animate-pulse" />
                  </div>
                ))}
                <div className="sm:col-span-2 space-y-1.5">
                  <div className="h-3 w-24 rounded bg-light-gray/40 animate-pulse" />
                  <div className="h-24 w-full rounded-md bg-light-gray/30 animate-pulse" />
                </div>
                <div className="sm:col-span-2 space-y-1.5">
                  <div className="h-3 w-24 rounded bg-light-gray/40 animate-pulse" />
                  <div className="h-11 w-full rounded-md bg-light-gray/30 animate-pulse" />
                </div>
              </div>
              <div className="h-[52px] w-full rounded-md bg-light-gray/30 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-28 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <div className="mx-auto h-4 w-32 rounded-full bg-light-gray/40 animate-pulse" />
            <div className="mx-auto h-8 w-72 rounded-lg bg-light-gray/40 animate-pulse" />
          </div>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-off-white rounded-xl border border-light-gray/40 p-4">
                <div className="h-4 w-3/4 rounded bg-light-gray/40 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
