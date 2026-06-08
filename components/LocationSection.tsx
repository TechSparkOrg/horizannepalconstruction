"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";

const MAP_SRC = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4411.642001858354!2d85.3463617!3d27.6865864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190073c93d91%3A0x83adad7bcdcf20de!2sHorizon%20Nepal%20Engineering%20Research%20%26%20Construction%20Pvt.Ltd!5e1!3m2!1sen!2snp!4v1780822988692!5m2!1sen!2snp";

export function LocationSection() {
  return (
    <section className="relative bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-28 pb-8 sm:pb-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <SectionLabel>Location</SectionLabel>
          <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-brand-dark">
            Visit Our Office
          </h2>
          <p className="mt-4 text-base leading-relaxed text-mid-gray font-semibold">
            We&apos;re based in Kathmandu — stop by for a consultation.
          </p>
        </div>
      </div>
      <div className="relative w-full h-[450px]">
        <iframe
          title="Horizon Nepal office location in Kathmandu"
          src={MAP_SRC}
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
