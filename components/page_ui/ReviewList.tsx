"use client";

import { useState, useCallback } from "react";
import { Star, ArrowRight, Quote } from "lucide-react";
import { toast } from "sonner";
import { ReviewPublic } from "@/api/services/review.service";
import type { Review } from "@/api/types/review.types";
import type { MediaItem } from "@/api/types/media.types";
import { BannerCarousel } from "@/components/global_ui/BannerCarousel";
import { SocialQrGrid } from "@/components/global_ui/SocialQrGrid";
import { ReviewSubmitDialog } from "@/components/global_ui/ReviewSubmitDialog";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://horizonnepalconstruction.com").replace(/\/+$/, "");

function Stars({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`size-3.5 ${s <= value ? "fill-amber-400 text-amber-400" : "fill-gray-100 text-gray-100"}`}
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
      className={`relative flex flex-col gap-4 rounded-xl p-6 border transition-shadow hover:shadow-md ${
        accent
          ? "bg-[#0f2557] border-[#0f2557] text-white"
          : "bg-white border-[#e8edf5] text-[#1a2b4a]"
      }`}
    >
      {/* Large decorative quote */}
      <Quote
        className={`absolute top-4 right-5 size-8 opacity-10 ${accent ? "text-white" : "text-[#0f2557]"}`}
        aria-hidden
      />

      <Stars value={r.rating} />

      <p
        className={`text-sm leading-relaxed flex-1 ${
          accent ? "text-white/80" : "text-[#3d526e]"
        }`}
      >
        {r.description}
      </p>

      <div className="flex items-center gap-3 pt-2 border-t border-current/10">
        <div
          className={`size-9 rounded-full grid place-items-center font-bold text-xs shrink-0 ${
            accent ? "bg-white/20 text-white" : "bg-[#0f2557] text-white"
          }`}
        >
          {getInitials(r.name)}
        </div>
        <p className={`font-semibold text-sm ${accent ? "text-white" : "text-[#0f2557]"}`}>
          {r.name}
        </p>
      </div>
    </article>
  );
}

interface Props {
  initialReviews: Review[];
  initialTotal: number;
  initialBanners?: MediaItem[];
}

export function ReviewList({ initialReviews, initialTotal, initialBanners }: Props) {
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

  // Split first 9 into 3 columns for masonry
  const col1 = firstNine.filter((_, i) => i % 3 === 0);
  const col2 = firstNine.filter((_, i) => i % 3 === 1);
  const col3 = firstNine.filter((_, i) => i % 3 === 2);

  // Split rest into 3 columns for masonry
  const rCol1 = rest.filter((_, i) => i % 3 === 0);
  const rCol2 = rest.filter((_, i) => i % 3 === 1);
  const rCol3 = rest.filter((_, i) => i % 3 === 2);

  const galleryImgs = (initialBanners ?? []).filter((b) => b.url).slice(0, 5);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[72vh] flex items-end overflow-hidden">
        <BannerCarousel
          slug="reviews-page-hero"
          imgClassName="object-cover"
          overlay="linear-gradient(to top, rgba(15,37,87,0.92) 0%, rgba(15,37,87,0.3) 60%, transparent 100%)"
          initialBanners={initialBanners}
        />
        <div className="relative w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-32">
          <p className="text-[#cd2028] text-xs font-bold tracking-[0.2em] uppercase mb-3">
            Client Voices
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white font-bold leading-tight max-w-2xl">
            What Our Clients<br />
            <span className="text-white/50">Are Saying</span>
          </h1>
          <div className="mt-8 flex items-center gap-4">
            <button
              type="button"
              onClick={() => setDialogOpen(true)}
              className="inline-flex items-center gap-2 h-11 px-6 bg-[#cd2028] hover:bg-red-700 text-white font-semibold text-sm rounded-lg transition-colors"
            >
              Write a Review
              <ArrowRight className="size-4" />
            </button>
            {total > 0 && (
              <span className="text-white/50 text-sm">
                {total} review{total !== 1 ? "s" : ""}
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
            className="inline-flex items-center gap-2 h-10 px-7 rounded-lg border border-[#e8edf5] bg-white text-[#3d526e] font-semibold text-sm hover:border-[#0f2557] hover:text-[#0f2557] transition-colors disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load more"}
          </button>
        </div>
      )}

                  <div className="flex flex-col gap-4 sm:hidden">
              {rest.map((r) => (
                <ReviewCard key={r.id} r={r} />
              ))}
            </div>

      {/* ── Empty state ── */}
      {reviews.length === 0 && (
        <section className="py-32 bg-[#f5f7fb]">
          <div className="max-w-[1200px] mx-auto px-4 text-center">
            <Quote className="size-12 text-gray-200 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-400">No reviews yet</h2>
            <p className="text-sm text-gray-300 mt-1">Be the first to share your experience!</p>
            <button
              type="button"
              onClick={() => setDialogOpen(true)}
              className="mt-6 inline-flex items-center gap-2 h-10 px-6 bg-[#0f2557] text-white font-semibold text-sm rounded-lg hover:bg-blue-900 transition-colors"
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