export default function PageDetailLoading() {
  return (
    <div className="bg-off-white">
      <section className="relative min-h-[50vh] flex items-center bg-brand-dark px-4 sm:px-6 lg:px-8">
        <div className="max-w-[800px] mx-auto w-full pt-32 pb-20 space-y-4">
          <div className="h-12 w-[500px] max-w-full rounded-lg bg-white/10 animate-pulse" />
          <div className="h-5 w-[400px] max-w-full rounded bg-white/10 animate-pulse" />
        </div>
      </section>

      <section className="py-16 sm:py-28">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="h-4 w-full rounded bg-light-gray/30 animate-pulse" />
          <div className="h-4 w-full rounded bg-light-gray/30 animate-pulse" />
          <div className="h-4 w-11/12 rounded bg-light-gray/30 animate-pulse" />
          <div className="h-4 w-full rounded bg-light-gray/30 animate-pulse" />
          <div className="h-4 w-3/4 rounded bg-light-gray/30 animate-pulse" />
          <div className="h-4 w-full rounded bg-light-gray/30 animate-pulse" />
          <div className="h-4 w-5/6 rounded bg-light-gray/30 animate-pulse" />
          <div className="h-4 w-full rounded bg-light-gray/30 animate-pulse" />
          <div className="h-4 w-4/5 rounded bg-light-gray/30 animate-pulse" />
        </div>
      </section>
    </div>
  );
}
