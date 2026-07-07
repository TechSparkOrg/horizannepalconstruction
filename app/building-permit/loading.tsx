export default function BuildingPermitLoading() {
  return (
    <>
      <section className="relative min-h-[80vh] bg-brand-dark flex items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto w-full space-y-5">
          <div className="h-5 w-20 rounded-full bg-white/10 animate-pulse" />
          <div className="h-16 w-[500px] max-w-full rounded-lg bg-white/10 animate-pulse" />
          <div className="h-5 w-96 max-w-full rounded bg-white/10 animate-pulse" />
          <div className="h-12 w-48 rounded-xl bg-brand-primary/40 animate-pulse" />
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="text-center space-y-3">
            <div className="mx-auto h-5 w-20 rounded-full bg-light-gray/30 animate-pulse" />
            <div className="mx-auto h-8 w-72 rounded-lg bg-light-gray/30 animate-pulse" />
            <div className="mx-auto h-5 w-64 rounded bg-light-gray/30 animate-pulse" />
          </div>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-6">
              <div className="hidden sm:flex size-12 shrink-0 rounded-full bg-light-gray/30 animate-pulse" />
              <div className="flex-1 rounded-2xl bg-off-white border border-light-gray/40 p-6 sm:p-8 space-y-3">
                <div className="h-6 w-48 rounded bg-light-gray/30 animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 w-full rounded bg-light-gray/30 animate-pulse" />
                  <div className="h-4 w-3/4 rounded bg-light-gray/30 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
