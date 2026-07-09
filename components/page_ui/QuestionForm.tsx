"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { ConsultationPublic } from "@/api/services/consultation.service";

export function QuestionForm() {
  const [question, setQuestion]     = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [submitCount, setSubmitCount] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || !question.trim()) return;
    setSubmitting(true);
    try {
      await ConsultationPublic.submit({ name: "Visitor", phone: "N/A", description: question.trim() });
      setSubmitted(true);
      setSubmitCount((c) => c + 1);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="mt-6 flex items-center gap-5 max-w-[500px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={submitCount}
          src="/video-gif/email.svg"
          alt="Message sent"
          className="w-[80px] h-[80px] object-contain shrink-0"
        />
        <div>
          <p className="text-white font-semibold text-sm leading-snug">Thank you!</p>
          <p className="text-white/60 text-xs mt-0.5 leading-relaxed">
            We got your question. Our team will reply within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex gap-3 max-w-[500px]">
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type your question here..."
        required
        className="flex-1 h-11 px-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/35 text-sm focus:outline-none focus:ring-2 focus:ring-[#93c5fd] focus:border-transparent transition"
      />
      <button
        type="submit"
        disabled={submitting}
        className="h-11 px-5 bg-[#cd2028] hover:bg-[#b91c1c] text-white font-semibold text-sm rounded-xl transition-colors flex items-center gap-2 shrink-0 focus-visible:ring-2 focus-visible:ring-[#cd2028] focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? <Loader2 className="size-4 animate-spin" /> : <>Ask <ArrowRight className="size-4" /></>}
      </button>
    </form>
  );
}
