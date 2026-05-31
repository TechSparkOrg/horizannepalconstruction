import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function ContactHero() {
  return (
    <section className="relative min-h-[55vh] flex items-center overflow-hidden bg-brand-dark">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=2000&q=80"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 to-brand-dark" />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20 text-center">
        <span className="text-xs font-semibold tracking-[0.15em] uppercase text-white/60 bg-white/10 px-3 py-1 rounded-full border border-white/10 inline-block">
          Contact
        </span>

        <h1
          className="font-display font-bold text-white mt-6 leading-[1.05] max-w-3xl mx-auto"
          style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
        >
          Let&apos;s Start a Conversation
        </h1>

        <p className="mt-6 text-white/70 text-lg max-w-[600px] mx-auto leading-relaxed">
          Whether you have a project in mind or just want to learn more — we&apos;re here to help.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="#consultation-form"
            className="inline-flex items-center gap-2 h-12 px-6 rounded bg-brand-primary text-white font-semibold hover:brightness-110 transition"
          >
            Send a Message <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
