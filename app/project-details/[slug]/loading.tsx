export default function ProjectDetailLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <section className="bg-[#07112b]" style={{ minHeight: "72vh" }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-10 space-y-4">
          <div className="h-3 w-24 rounded bg-white/10" />
          <div className="flex gap-2">
            <div className="h-7 w-20 rounded-md bg-white/10" />
            <div className="h-7 w-24 rounded-md bg-white/10" />
          </div>
          <div className="h-14 w-[480px] max-w-full rounded-lg bg-white/10" />
          <div className="flex gap-4">
            <div className="h-4 w-36 rounded bg-white/8" />
            <div className="h-4 w-28 rounded bg-white/8" />
          </div>
        </div>
      </section>

      {/* Overview skeleton */}
      <section className="bg-white py-14 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_300px] gap-10 lg:gap-12 items-start">
          <div className="space-y-4">
            <div className="h-3 w-28 rounded bg-muted-foreground/20" />
            <div className="h-9 w-64 rounded-lg bg-muted-foreground/15" />
            <div className="space-y-2 pt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-4 rounded bg-muted-foreground/10" style={{ width: `${95 - i * 7}%` }} />
              ))}
            </div>
          </div>
          <div className="h-[350px] rounded-2xl bg-muted-foreground/10" />
        </div>
      </section>

      {/* Gallery skeleton */}
      <section className="bg-[#1b2f52] py-14 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="h-3 w-24 rounded bg-white/20" />
          <div className="h-8 w-48 rounded-lg bg-white/15" />
          <div className="h-4 w-72 rounded bg-white/10" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="col-span-2 row-span-2 rounded-xl bg-white/10" style={{ aspectRatio: "16/10" }} />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-xl bg-white/10" style={{ aspectRatio: "1/1" }} />
            ))}
          </div>
        </div>
      </section>

      {/* Milestones skeleton */}
      <section className="bg-white py-14 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="h-3 w-24 rounded bg-muted-foreground/20" />
          <div className="h-8 w-56 rounded-lg bg-muted-foreground/15" />
          <div className="space-y-5 pl-11 sm:pl-16">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="relative">
                <div className="size-9 sm:size-12 rounded-xl bg-muted-foreground/15 absolute left-0 top-0" />
                <div className="rounded-2xl border border-muted-foreground/10 bg-muted-foreground/5 p-5 sm:p-6 ml-0 space-y-3">
                  <div className="flex gap-2">
                    <div className="h-6 w-32 rounded-full bg-muted-foreground/10" />
                    <div className="h-6 w-28 rounded-full bg-muted-foreground/10" />
                  </div>
                  <div className="h-4 w-full rounded bg-muted-foreground/10" />
                  <div className="h-4 w-3/4 rounded bg-muted-foreground/10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3D Model skeleton */}
      <section className="bg-[#1b2f52] py-14 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="h-3 w-24 rounded bg-white/20" />
          <div className="h-8 w-40 rounded-lg bg-white/15" />
          <div className="h-4 w-64 rounded bg-white/10" />
          <div className="w-full rounded-2xl bg-white/10" style={{ aspectRatio: "16/9", maxHeight: 520 }} />
        </div>
      </section>
    </div>
  );
}
