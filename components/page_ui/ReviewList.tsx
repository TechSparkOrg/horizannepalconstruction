"use client";

import { useState, useCallback } from "react";
import { Star, ArrowRight, Quote } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { ReviewPublic } from "@/api/services/review.service";
import type { Review } from "@/api/types/review.types";
import { SocialQrGrid } from "@/components/global_ui/SocialQrGrid";

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
        accent ? "bg-[#0f2557] border-[#0f2557]" : "bg-white border-[#e2e8f0]"
      }`}
    >
      <Quote
        className={`absolute top-4 right-5 size-7 opacity-10 ${accent ? "text-white" : "text-[#0f2557]"}`}
        aria-hidden
      />
      <Stars value={r.rating} />
      <p className={`text-[13.5px] leading-relaxed flex-1 ${accent ? "text-white" : "text-[#334155]"}`}>
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
          <p className={`font-semibold text-[13px] ${accent ? "text-white" : "text-[#0f2557]"}`}>{r.name}</p>
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
  svgUrl1?: string;
  svgUrl2?: string;
  svgUrl3?: string;
  svgUrl4?: string;
}

export function ReviewList({ initialReviews, initialTotal, svgUrl1, svgUrl2, svgUrl3, svgUrl4 }: Props) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [total, setTotal] = useState(initialTotal);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Inline form state
  const [formName, setFormName] = useState("");
  const [formRating, setFormRating] = useState(5);
  const [formText, setFormText] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);

  const hasMore = page * 20 < total;

  const loadMore = useCallback(async () => {
    setLoading(true);
    try {
      const nextPage = page + 1;
      const res = await ReviewPublic.listSafe(nextPage);
      setReviews((prev) => [...prev, ...(res.results ?? [])]);
      setPage(nextPage);
      setTotal(res.count);
    } catch {
      toast.error("Failed to load more reviews");
    } finally {
      setLoading(false);
    }
  }, [page]);

  const handleInlineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    try {
      await ReviewPublic.submit({ name: formName, rating: formRating, description: formText });
      setReviewSubmitted(true);
      setSubmitCount((c) => c + 1);
      setFormName("");
      setFormRating(5);
      setFormText("");
      toast.success("Review submitted! It will appear after approval.");
    } catch {
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setFormSubmitting(false);
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
          src={svgUrl1 || "/video-gif/developing-qanda.svg"}
          alt="Client reviews and testimonials illustration"
          fill
          sizes="100vw"
          className="object-contain object-center"
          priority
          unoptimized
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
            <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-white/70">Client Voices</span>
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
            <a
              href="#write-review"
              className="inline-flex items-center gap-2 h-11 px-6 bg-[#cd2028] hover:bg-[#b91c1c] text-white font-semibold text-sm rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-[#cd2028] focus-visible:ring-offset-2"
            >
              Write a Review
              <ArrowRight className="size-4" />
            </a>
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
                {col1.map((r, i) => <ReviewCard key={r.id} r={r} accent={i === 1} />)}
              </div>
              <div className="flex flex-col gap-4 sm:mt-8">
                {col2.map((r, i) => <ReviewCard key={r.id} r={r} accent={i === 0} />)}
              </div>
              <div className="flex flex-col gap-4">
                {col3.map((r, i) => <ReviewCard key={r.id} r={r} accent={i === 2} />)}
              </div>
            </div>
            <div className="flex flex-col gap-4 sm:hidden">
              {firstNine.map((r, i) => <ReviewCard key={r.id} r={r} accent={i % 5 === 2} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── Social + Form (single dark section) ── */}
      {reviews.length > 0 && (
        <section id="write-review" className="relative bg-[#0f2557] overflow-hidden">

          {/* Row 1 — SocialQrGrid (left) · card-scoll-animation.svg (right) */}
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

              <div className="flex-1 min-w-0">
                <SocialQrGrid
                  title="Follow Us Online"
                  description="Scan to follow us on social platforms"
                  qrSize={100}
                />
              </div>

              <div className="shrink-0 flex flex-col items-center gap-3">
                <Image
                  src={svgUrl2 || "/video-gif/card-scoll-animation.svg"}
                  alt="Social media connection animation"
                  width={500}
                  height={220}
                  unoptimized
                  className="h-auto object-contain"
                />
                <p className="text-white/50 text-xs text-center max-w-[220px] leading-relaxed">
                  Stay connected — follow us for project updates and design inspiration.
                </p>
              </div>

            </div>
          </div>

          {/* Divider */}
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-px bg-white/10" />
          </div>

          {/* Row 2 — breakout: left padded, form card bleeds to right edge */}
          <div className="py-14 sm:py-20 pl-4 sm:pl-6 lg:pl-[max(2rem,calc((100vw-1200px)/2+2rem))]">
            <div className="flex flex-col lg:flex-row items-center gap-2 mx-auto lg:mx-0 max-w-[1200px] lg:max-w-none">

              {/* Left: Review.svg + heading */}
              <div className=" flex items-center  flex-col">
                <Image
                  src={svgUrl3 || "/video-gif/Review.svg"}
                  alt="Share your review illustration"
                  width={320}
                  height={240}
                  className="w-[180px] sm:w-[280px] h-auto object-contain"
                  unoptimized
                />
                <div>
                  <div className="inline-flex items-center gap-2.5 mb-3">
                    <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
                    <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-white/60">
                      Your Experience
                    </span>
                    <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
                  </div>
                  <h2 className="font-display font-bold text-white text-[26px] sm:text-[34px] leading-tight">
                    Share Your<br />
                    <span className="text-[#93c5fd]">Experience</span>
                  </h2>
                  <p className="mt-3 text-white/60 text-[14px] leading-relaxed max-w-[320px]">
                    Your feedback helps others make informed decisions and helps us improve our services.
                  </p>
                </div>
              </div>

              {/* Right: form card — bleeds to right viewport edge on desktop */}
              <div className="w-full lg:flex-1   ">
                <div className="bg-white rounded-2xl lg:rounded-r-none p-6 sm:p-8 shadow-[0_8px_40px_rgba(0,0,0,0.18)]">

                  {reviewSubmitted ? (
                    /* ── Success: email.svg plays once per submission ── */
                    <div className="text-center py-6 flex flex-col items-center gap-3">
                      <img
                        key={submitCount}
                        src={svgUrl4 || "/video-gif/email.svg"}
                        alt="Review submitted"
                        className="w-[110px] h-[110px] object-contain"
                      />
                      <h3 className="font-semibold text-[#0f2557] text-lg">Thank You!</h3>
                      <p className="text-[#475569] text-sm max-w-[260px]">
                        Your review has been submitted and will appear after approval.
                      </p>
                      <button
                        type="button"
                        onClick={() => setReviewSubmitted(false)}
                        className="mt-1 text-[#1d4ed8] text-sm font-semibold hover:underline underline-offset-2"
                      >
                        Submit another review
                      </button>
                    </div>
                  ) : (
                    /* ── Form ── */
                    <form onSubmit={handleInlineSubmit} className="space-y-5">
                      <div className="mb-1">
                        <p className="text-[13px] font-bold text-[#0f2557]">Leave a Review</p>
                        <p className="text-[11.5px] text-[#94a3b8] mt-0.5">Takes less than a minute</p>
                      </div>

                      <div>
                        <label className="block text-[12px] font-semibold text-[#475569] uppercase tracking-wide mb-1.5">
                          Your Name <span className="text-[#cd2028]">*</span>
                        </label>
                        <input
                          type="text"
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="John Doe"
                          required
                          className="w-full h-10 px-3.5 rounded-xl border border-[#e2e8f0] text-[13.5px] text-[#0f2557] placeholder:text-[#cbd5e1] bg-[#f8fafc] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1d4ed8] focus:border-transparent transition"
                        />
                      </div>

                      <div>
                        <label className="block text-[12px] font-semibold text-[#475569] uppercase tracking-wide mb-1.5">
                          Rating
                        </label>
                        <div className="flex gap-1.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setFormRating(s)}
                              aria-label={`${s} star${s !== 1 ? "s" : ""}`}
                              className={`size-9 rounded-xl flex items-center justify-center transition-all ${
                                s <= formRating
                                  ? "bg-amber-400/10 ring-1 ring-amber-300"
                                  : "bg-[#f8fafc] hover:bg-[#f1f5f9]"
                              }`}
                            >
                              <Star
                                className={`size-5 transition-colors ${
                                  s <= formRating
                                    ? "fill-amber-400 text-amber-400"
                                    : "fill-[#e2e8f0] text-[#e2e8f0]"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[12px] font-semibold text-[#475569] uppercase tracking-wide mb-1.5">
                          Your Review
                        </label>
                        <textarea
                          value={formText}
                          onChange={(e) => setFormText(e.target.value)}
                          placeholder="Tell us about your experience..."
                          rows={4}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] text-[13.5px] text-[#0f2557] placeholder:text-[#cbd5e1] bg-[#f8fafc] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1d4ed8] focus:border-transparent transition resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={!formName.trim() || formSubmitting}
                        className="w-full h-11 rounded-xl bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-[#1d4ed8] focus-visible:ring-offset-2"
                      >
                        {formSubmitting ? "Submitting..." : <><span>Submit Review</span><ArrowRight className="size-4" /></>}
                      </button>
                    </form>
                  )}

                </div>
              </div>

            </div>
          </div>

        </section>
      )}

      {/* ── Remaining Reviews (Masonry) ── */}
      {rest.length > 0 && (
        <section className="py-16 sm:py-20 bg-[#f5f7fb] border-t border-[#e2e8f0]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="hidden sm:grid sm:grid-cols-3 gap-4 items-start">
              <div className="flex flex-col gap-4">
                {rCol1.map((r) => <ReviewCard key={r.id} r={r} />)}
              </div>
              <div className="flex flex-col gap-4 sm:mt-8">
                {rCol2.map((r) => <ReviewCard key={r.id} r={r} />)}
              </div>
              <div className="flex flex-col gap-4">
                {rCol3.map((r) => <ReviewCard key={r.id} r={r} />)}
              </div>
            </div>
            <div className="flex flex-col gap-4 sm:hidden">
              {rest.map((r) => <ReviewCard key={r.id} r={r} />)}
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
            <a
              href="#write-review"
              className="mt-6 inline-flex items-center gap-2 h-10 px-6 bg-[#0f2557] text-white font-semibold text-sm rounded-xl hover:bg-[#1e3a8a] transition-colors"
            >
              Write a Review <ArrowRight className="size-4" />
            </a>
          </div>
        </section>
      )}
    </>
  );
}
