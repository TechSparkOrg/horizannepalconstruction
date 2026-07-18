"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-[#f5f8ff] px-6">
      <div className="text-center max-w-md">
        <div className="flex items-center justify-center gap-3 mb-5">
          <span className="block w-6 h-px bg-[#cd2028]" aria-hidden="true" />
          <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#cd2028]">
            Error
          </span>
          <span className="block w-6 h-px bg-[#cd2028]" aria-hidden="true" />
        </div>
        <h1 className="text-2xl font-bold text-[#0f2557] mb-3">
          Something went wrong
        </h1>
        <p className="text-[#475569] text-[14.5px] leading-relaxed mb-7">
          An unexpected error occurred. Please try again, or return to the
          home page.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center h-11 px-7 bg-[#0f2557] hover:bg-[#0c1d4f] text-white font-semibold text-[13.5px] rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-[#1d4ed8] focus-visible:ring-offset-2"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
