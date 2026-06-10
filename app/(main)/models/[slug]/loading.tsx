export default function ModelDetailLoading() {
  return (
    <div className="bg-brand-dark min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="h-4 w-32 rounded bg-white/10 animate-pulse mb-8" />
        <div className="space-y-4 mb-10">
          <div className="h-12 w-[500px] max-w-full rounded-lg bg-white/10 animate-pulse" />
          <div className="h-5 w-[350px] max-w-full rounded bg-white/10 animate-pulse" />
        </div>
        <div className="aspect-video max-h-[600px] w-full rounded-xl bg-white/8 animate-pulse" />
      </div>
    </div>
  );
}
