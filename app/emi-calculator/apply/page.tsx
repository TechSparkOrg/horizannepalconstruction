import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Apply for EMI — Coming Soon | Horizan Nepal",
  robots: { index: false },
}

export default function EmiApplyPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">

      {/* Navy hero */}
      <div className="relative bg-[#0f2557] overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1 bg-[#cd2028]" aria-hidden="true" />
        <div
          className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
          style={{ background: "linear-gradient(to top, #0f2557 10%, transparent)" }}
        />
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-8 pt-28 pb-10">
          <Link
            href="/emi-calculator"
            className="inline-flex items-center gap-2 text-white/55 hover:text-white text-xs font-medium transition-colors mb-6"
          >
            <ArrowLeft className="size-3.5" />
            Back to Calculator
          </Link>
          <div className="inline-flex items-center gap-2.5 mb-3">
            <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
            <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-white/60">EMI Application</span>
            <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
          </div>
          <h1
            className="font-display font-black text-white leading-tight tracking-[-0.02em]"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            Coming Soon
          </h1>
          <p className="mt-3 text-white/65 text-[15px] max-w-[460px] leading-relaxed">
            {"We're building a seamless loan application experience. Check back soon."}
          </p>
        </div>
      </div>

      {/* SVG + content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-14 sm:py-20">

        <Image
          src="/video-gif/coming-soon.svg"
          alt="Coming soon illustration"
          width={600}
          height={480}
          className="w-full max-w-[320px] sm:max-w-[460px] lg:max-w-[540px] h-auto object-contain select-none pointer-events-none"
          unoptimized
          priority
        />

        <div className="mt-10 text-center max-w-[480px]">
          <h2 className="font-display font-bold text-[#0f2557] text-xl sm:text-2xl tracking-tight">
            Loan Application Portal
          </h2>
          <p className="mt-3 text-[14px] text-[#64748b] leading-relaxed">
            Our online EMI application system is under development. In the meantime, visit us directly or contact our finance team to start your loan application.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/emi-calculator"
              className="inline-flex items-center gap-2 h-11 px-6 bg-[#0f2557] hover:bg-[#1a3a7a] text-white font-semibold text-sm rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-[#0f2557] focus-visible:ring-offset-2"
            >
              <ArrowLeft className="size-4" />
              Back to Calculator
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 h-11 px-6 border border-[#e2e8f0] hover:border-[#cd2028] text-[#0f2557] hover:text-[#cd2028] font-semibold text-sm rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-[#cd2028] focus-visible:ring-offset-2"
            >
              Contact Us
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
