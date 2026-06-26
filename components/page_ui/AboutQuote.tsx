"use client";

import { useEffect, useState } from "react";

const quotes = [
  {
    text: "Horizon Nepal transformed our vision into a beautiful reality. Their attention to detail and commitment to quality exceeded our expectations at every stage.",
    author: "Rajesh Shrestha",
    role: "Homeowner, Lalitpur",
  },
  {
    text: "Professional, transparent, and incredibly skilled. The team managed our commercial project with precision and delivered on time despite challenging conditions.",
    author: "Anita Gurung",
    role: "CEO, Green Valley Resorts",
  },
  {
    text: "We have worked with many construction firms, but Horizon Nepal stands out for their integrity and craftsmanship. They truly care about the end result.",
    author: "Dr. Kamal Thapa",
    role: "Architect Consultant",
  },
];

export function AboutQuote() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((c) => (c + 1) % quotes.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const q = quotes[index];

  return (
    <section className="relative py-20 sm:py-32 overflow-hidden" style={{ backgroundColor: "oklch(0.293 0.065 257.8)" }}>
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="block font-display text-7xl text-brand-primary/30 leading-none mb-6">&ldquo;</span>
        <p className="text-white/90 text-xl sm:text-2xl leading-relaxed font-medium">
          {q.text}
        </p>
        <div className="mt-8 flex flex-col items-center">
          <div className="size-10 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary text-sm font-bold">
            {q.author.charAt(0)}
          </div>
          <span className="mt-3 text-white font-semibold text-sm">{q.author}</span>
          <span className="text-white/50 text-xs mt-0.5">{q.role}</span>
        </div>
        <div className="mt-8 flex justify-center gap-2">
          {quotes.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`rounded-full transition-all duration-300 ${
                i === index ? "w-6 h-2 bg-brand-primary" : "w-2 h-2 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Quote ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
