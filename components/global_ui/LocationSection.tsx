import Image from "next/image";
import { MapPin, Phone, Clock } from "lucide-react";

const MAP_SRC = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4411.642001858354!2d85.3463617!3d27.6865864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190073c93d91%3A0x83adad7bcdcf20de!2sHorizon%20Nepal%20Engineering%20Research%20%26%20Construction%20Pvt.Ltd!5e1!3m2!1sen!2snp!4v1780822988692!5m2!1sen!2snp";

const details = [
  { icon: MapPin, label: "Address",  value: "Kathmandu, Nepal" },
  { icon: Phone,  label: "Phone",    value: "+977-01-XXXXXXX" },
  { icon: Clock,  label: "Hours",    value: "Sun – Fri, 9am – 6pm" },
];

export function LocationSection() {
  return (
    <section className="bg-[#f8fafc] border-t border-[#e2e8f0]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-10">

        {/* Header row */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-[#1d4ed8] bg-[#eff6ff] border border-[#bfdbfe] px-3 py-1 rounded-full mb-3">
              Location
            </span>
            <h2 className="font-display text-[26px] sm:text-[32px] font-bold text-[#0f2557] leading-tight">
              Visit Our Office
            </h2>
            <p className="mt-2 text-[13.5px] text-[#475569] leading-relaxed">
              We&apos;re based in Kathmandu — stop by for a consultation.
            </p>
          </div>

          <Image
            src="/video-gif/location-pin.svg"
            alt="Location pin illustration"
            width={140}
            height={90}
            className="w-[90px] h-[58px] sm:w-[140px] sm:h-[90px] shrink-0 object-contain"
            unoptimized
          />
        </div>

        {/* Map + info card */}
        <div className="relative rounded-2xl overflow-hidden border border-[#e2e8f0] shadow-sm h-[360px] sm:h-[460px]">
          <iframe
            title="Horizon Nepal office location in Kathmandu"
            src={MAP_SRC}
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Info card overlay */}
          <div className="absolute bottom-4 left-4 z-10 bg-white rounded-xl border border-[#e2e8f0] shadow-lg p-4 min-w-[180px] sm:min-w-[220px]">
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#1d4ed8] mb-3">
              Horizon Nepal
            </p>
            <div className="space-y-2.5">
              {details.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-2.5">
                  <div className="size-6 rounded-lg bg-[#eff6ff] flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="size-3 text-[#1d4ed8]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-[#94a3b8] uppercase tracking-wide">{label}</p>
                    <p className="text-[12.5px] font-medium text-[#0f2557]">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
