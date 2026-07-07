export default function BlogDetailLoading() {
  return (
    <div className="bg-off-white">
      <section className="relative min-h-[75vh] flex items-end bg-brand-dark px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-[1160px] mx-auto pb-16 pt-32 space-y-4">
          <div className="h-5 w-24 rounded-full bg-white/10 animate-pulse" />
          <div className="h-10 w-[600px] max-w-full rounded-lg bg-white/10 animate-pulse" />
          <div className="h-4 w-3/4 max-w-[500px] rounded bg-white/10 animate-pulse" />
        </div>
      </section>

      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4">
        <div className="flex items-center gap-4">
          <div className="size-10 rounded-full bg-light-gray/30 animate-pulse" />
          <div className="space-y-1.5 flex-1">
            <div className="h-3 w-32 rounded bg-light-gray/40 animate-pulse" />
            <div className="h-2.5 w-24 rounded bg-light-gray/30 animate-pulse" />
          </div>
        </div>
      </div>

      <section className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={`h-4 rounded bg-light-gray/30 animate-pulse ${i % 3 === 0 ? "w-full" : i % 3 === 1 ? "w-11/12" : "w-4/5"}`} />
        ))}
        <div className="h-4 w-3/4 rounded bg-light-gray/30 animate-pulse" />
      </section>
    </div>
  );
}
