export default function CostEstimationLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <section className="relative bg-[#07112b]" style={{ minHeight: "78vh" }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-14 space-y-4">
          <div className="h-3 w-24 rounded bg-white/10" />
          <div className="h-14 w-[550px] max-w-full rounded-lg bg-white/10" />
          <div className="h-5 w-[400px] max-w-full rounded bg-white/10" />
          <div className="flex gap-2.5 pt-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-9 w-32 rounded-full bg-white/10" />
            ))}
          </div>
        </div>
      </section>

      {/* Calculator skeleton */}
      <section className="bg-white py-16 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="h-10 w-64 rounded-lg bg-muted-foreground/15 mx-auto" />
          <div className="h-5 w-80 rounded bg-muted-foreground/10 mx-auto" />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
            <div className="space-y-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-32 rounded bg-muted-foreground/15" />
                  <div className="h-10 w-full rounded-lg bg-muted-foreground/10" />
                </div>
              ))}
            </div>
            <div className="rounded-2xl bg-muted-foreground/5 p-6 space-y-4">
              <div className="h-6 w-40 rounded bg-muted-foreground/15" />
              <div className="h-12 w-full rounded-lg bg-muted-foreground/10" />
              <div className="h-px bg-muted-foreground/10" />
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 w-24 rounded bg-muted-foreground/10" />
                    <div className="h-4 w-20 rounded bg-muted-foreground/15" />
                  </div>
                ))}
              </div>
              <div className="h-px bg-muted-foreground/10" />
              <div className="flex justify-between">
                <div className="h-5 w-16 rounded bg-muted-foreground/15" />
                <div className="h-6 w-28 rounded bg-muted-foreground/20" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
