import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Horizan Nepal",
  description: "The page you are looking for does not exist or has been moved.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md mx-auto px-4 text-center">
        <FileQuestion className="size-16 text-brand-primary/30 mx-auto mb-6" />
        <h1 className="font-display font-bold text-5xl sm:text-6xl text-brand-dark mb-3">
          404
        </h1>
        <p className="text-mid-gray text-base sm:text-lg mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-brand-primary text-white font-bold text-sm hover:brightness-110 transition-all active:scale-[0.97]"
        >
          <ArrowLeft className="size-4" />
          Back to Home
        </Link>
      </div>
    </main>
  );
}
