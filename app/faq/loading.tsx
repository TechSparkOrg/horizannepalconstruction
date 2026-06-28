export default function FaqLoading() {
  return (
    <div className="bg-off-white">
      <section className="relative min-h-[50vh] flex items-center bg-brand-dark px-4 sm:px-6 lg:px-8">
        <div className="max-w-[700px] mx-auto w-full pt-32 pb-20 text-center space-y-4">
          <div className="mx-auto h-4 w-32 rounded-full bg-white/10 animate-pulse" />
          <div className="mx-auto h-12 w-[450px] max-w-full rounded-lg bg-white/10 animate-pulse" />
          <div className="mx-auto h-5 w-[350px] max-w-full rounded bg-white/10 animate-pulse" />
        </div>
      </section>

      <section className="py-16 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <div className="mx-auto h-8 w-72 rounded-lg bg-light-gray/40 animate-pulse" />
            <div className="mx-auto h-5 w-80 rounded bg-light-gray/30 animate-pulse" />
          </div>
          <div className="space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-light-gray/40 overflow-hidden">
                <div className="flex items-center gap-4 p-6">
                  <div className="size-12 rounded-full bg-light-gray/30 animate-pulse shrink-0" />
                  <div className="h-5 w-48 rounded bg-light-gray/40 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
