export default function VastuLoading() {
  return (
    <div className="min-h-screen bg-[#f4f6fb]">
      <div className="bg-[#0f2557] min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="mx-auto h-4 w-32 rounded-full bg-white/10 animate-pulse" />
          <div className="mx-auto h-14 w-[550px] max-w-full rounded-lg bg-white/10 animate-pulse" />
          <div className="mx-auto h-5 w-[400px] max-w-full rounded bg-white/10 animate-pulse" />
        </div>
      </div>
    </div>
  )
}
