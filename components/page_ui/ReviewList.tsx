"use client";

import { useState, useCallback } from "react";
import { Star, ArrowRight, Quote } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { ReviewPublic } from "@/api/services/review.service";
import type { Review } from "@/api/types/review.types";
import { SocialQrGrid } from "@/components/global_ui/SocialQrGrid";
import { ReviewSubmitDialog } from "@/components/global_ui/ReviewSubmitDialog";

function Stars({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`size-3.5 ${s <= value ? "fill-amber-400 text-amber-400" : "fill-[#e2e8f0] text-[#e2e8f0]"}`}
        />
      ))}
    </div>
  );
}

function getInitials(name: string): string {
  return (
    name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "?"
  );
}

function ReviewCard({ r, accent }: { r: Review; accent?: boolean }) {
  return (
    <article
      className={`relative flex flex-col gap-4 rounded-2xl p-5 sm:p-6 border transition-shadow hover:shadow-md ${
        accent
          ? "bg-[#0f2557] border-[#0f2557]"
          : "bg-white border-[#e2e8f0]"
      }`}
    >
      <Quote
        className={`absolute top-4 right-5 size-7 opacity-10 ${accent ? "text-white" : "text-[#0f2557]"}`}
        aria-hidden
      />

      <Stars value={r.rating} />

      <p
        className={`text-[13.5px] leading-relaxed flex-1 ${
          accent ? "text-white" : "text-[#334155]"
        }`}
      >
        {r.description}
      </p>

      <div className={`flex items-center gap-3 pt-3 border-t ${accent ? "border-white/15" : "border-[#f1f5f9]"}`}>
        <div
          className={`size-9 rounded-full grid place-items-center font-bold text-[11px] shrink-0 ${
            accent ? "bg-white/20 text-white" : "bg-[#0f2557] text-white"
          }`}
        >
          {getInitials(r.name)}
        </div>
        <div>
          <p className={`font-semibold text-[13px] ${accent ? "text-white" : "text-[#0f2557]"}`}>
            {r.name}
          </p>
          {r.rating >= 4 && (
            <p className={`text-[10.5px] mt-0.5 ${accent ? "text-[#93c5fd]" : "text-[#1d4ed8]"}`}>
              Verified Client
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

interface Props {
  initialReviews: Review[];
  initialTotal: number;
}

export function ReviewList({ initialReviews, initialTotal }: Props) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [total, setTotal] = useState(initialTotal);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const hasMore = page * 20 < total;

  const loadMore = useCallback(async () => {
    setLoading(true);
    try {
      const nextPage = page + 1;
      const res = await ReviewPublic.list(nextPage);
      setReviews((prev) => [...prev, ...(res.results ?? [])]);
      setPage(nextPage);
      setTotal(res.count);
    } catch {
      toast.error("Failed to load more reviews");
    } finally {
      setLoading(false);
    }
  }, [page]);

  const handleSubmit = async (data: { name: string; rating: number; description: string }) => {
    try {
      await ReviewPublic.submit(data);
      toast.success("Review submitted! It will appear after approval.");
    } catch {
      toast.error("Failed to submit review. Please try again.");
      throw new Error("submit failed");
    }
  };

  const firstNine = reviews.slice(0, 9);
  const rest = reviews.slice(9);

  const col1 = firstNine.filter((_, i) => i % 3 === 0);
  const col2 = firstNine.filter((_, i) => i % 3 === 1);
  const col3 = firstNine.filter((_, i) => i % 3 === 2);

  const rCol1 = rest.filter((_, i) => i % 3 === 0);
  const rCol2 = rest.filter((_, i) => i % 3 === 1);
  const rCol3 = rest.filter((_, i) => i % 3 === 2);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative w-full overflow-hidden bg-[#0f2557] min-h-[60svh] sm:min-h-[72svh]">
        <Image
          src="/video-gif/developing-qanda.svg"
          alt="Client reviews and testimonials illustration"
          fill
          className="object-contain object-center"
          unoptimized
          priority
        />
        <div
          className="absolute inset-x-0 top-0 h-40 z-10 pointer-events-none"
          aria-hidden="true"
          style={{ background: "linear-gradient(to bottom, #0f2557 5%, transparent)" }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-64 z-10 pointer-events-none"
          aria-hidden="true"
          style={{ background: "linear-gradient(to top, #0f2557 40%, transparent)" }}
        />
        <div className="absolute inset-x-0 bottom-0 z-20 w-full max-w-[1200px] mx-auto px-4 sm:px-8 pb-8 sm:pb-14">
          <div className="inline-flex items-center gap-2.5 mb-3">
            <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
            <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-white/70">
              Client Voices
            </span>
            <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
          </div>
          <h1
            className="font-display font-black text-white leading-none tracking-[-0.02em]"
            style={{ fontSize: "clamp(2rem, 5.5vw, 3.5rem)" }}
          >
            What Our<br />
            <span className="text-[#93c5fd]">Clients Say</span>
          </h1>
          <p className="mt-3 text-white/70 text-sm sm:text-base max-w-[460px] leading-relaxed">
            Real experiences from homeowners and businesses we&apos;ve built for across Nepal.
          </p>
          <div className="mt-6 flex items-center gap-4 flex-wrap">
            <button
              type="button"
              onClick={() => setDialogOpen(true)}
              className="inline-flex items-center gap-2 h-11 px-6 bg-[#cd2028] hover:bg-[#b91c1c] text-white font-semibold text-sm rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-[#cd2028] focus-visible:ring-offset-2"
            >
              Write a Review
              <ArrowRight className="size-4" />
            </button>
            {total > 0 && (
              <span className="text-white/70 text-sm font-medium">
                {total} verified review{total !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ── First 9 Reviews (Masonry) ── */}
      {firstNine.length > 0 && (
        <section className="py-16 sm:py-20 bg-[#f5f7fb]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="hidden sm:grid sm:grid-cols-3 gap-4 items-start">
              <div className="flex flex-col gap-4">
                {col1.map((r, i) => (
                  <ReviewCard key={r.id} r={r} accent={i === 1} />
                ))}
              </div>
              <div className="flex flex-col gap-4 sm:mt-8">
                {col2.map((r, i) => (
                  <ReviewCard key={r.id} r={r} accent={i === 0} />
                ))}
              </div>
              <div className="flex flex-col gap-4">
                {col3.map((r, i) => (
                  <ReviewCard key={r.id} r={r} accent={i === 2} />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4 sm:hidden">
              {firstNine.map((r, i) => (
                <ReviewCard key={r.id} r={r} accent={i % 5 === 2} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── QR / Social Share band ── */}
      {reviews.length > 0 && (
        <section className="bg-[#0f2557] py-14">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start gap-8 sm:gap-16">
            <div className="flex-1 text-center sm:text-left">
              <SocialQrGrid
                title="Qr On Social Media"
                description="Scan to follow us on social platforms"
                qrSize={100}
              />
            </div>
          </div>
        </section>
      )}

      {/* ── Remaining Reviews (Masonry) ── */}
      {rest.length > 0 && (
        <section className="py-16 sm:py-20 bg-[#f5f7fb]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="hidden sm:grid sm:grid-cols-3 gap-4 items-start">
              <div className="flex flex-col gap-4">
                {rCol1.map((r) => (
                  <ReviewCard key={r.id} r={r} />
                ))}
              </div>
              <div className="flex flex-col gap-4 sm:mt-8">
                {rCol2.map((r) => (
                  <ReviewCard key={r.id} r={r} />
                ))}
              </div>
              <div className="flex flex-col gap-4">
                {rCol3.map((r) => (
                  <ReviewCard key={r.id} r={r} />
                ))}
              </div>
            </div>
            {/* mobile single-col for rest — was orphaned outside section before */}
            <div className="flex flex-col gap-4 sm:hidden">
              {rest.map((r) => (
                <ReviewCard key={r.id} r={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Load More ── */}
      {hasMore && (
        <div className="text-center py-10 bg-[#f5f7fb]">
          <button
            type="button"
            onClick={loadMore}
            disabled={loading}
            className="inline-flex items-center gap-2 h-10 px-7 rounded-xl border border-[#e2e8f0] bg-white text-[#475569] font-semibold text-sm hover:border-[#0f2557] hover:text-[#0f2557] transition-colors disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load more"}
          </button>
        </div>
      )}

      {/* ── Empty state ── */}
      {reviews.length === 0 && (
        <section className="py-32 bg-[#f5f7fb]">
          <div className="max-w-[1200px] mx-auto px-4 text-center">
            <Quote className="size-12 text-[#cbd5e1] mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-[#475569]">No reviews yet</h2>
            <p className="text-sm text-[#64748b] mt-1">Be the first to share your experience!</p>
            <button
              type="button"
              onClick={() => setDialogOpen(true)}
              className="mt-6 inline-flex items-center gap-2 h-10 px-6 bg-[#0f2557] text-white font-semibold text-sm rounded-xl hover:bg-[#1e3a8a] transition-colors"
            >
              Write a Review <ArrowRight className="size-4" />
            </button>
          </div>
        </section>
      )}

      <ReviewSubmitDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
}
