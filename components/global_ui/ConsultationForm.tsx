"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, MapPin, Mail, Phone, ChevronDown, X, Link, MapPinHouse, Camera, Check, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { ConsultationPublic } from "@/api/services/consultation.service";
import { CategoryPublic } from "@/api/services/category.service";
import { useSettings } from "@/stores/settings-store";
import type { Category } from "@/api/types/category.types";
import type { LocationData } from "@/components/global_ui/Googlemap";
import Image from "next/image";

const GoogleMapAddress = dynamic(() => import("@/components/global_ui/Googlemap"), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center">
      <Loader2 className="size-8 animate-spin text-[#1d4ed8]" />
    </div>
  ),
});

const INPUT = "w-full h-11 px-3.5 rounded-xl border border-[#e2e8f0] bg-white text-[#0f172a] text-[13.5px] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#1d4ed8] focus:border-transparent transition";
const LABEL = "block text-[12.5px] font-semibold text-[#0f2557] mb-1.5";

const trust = [
  { num: "50+",  txt: "Projects" },
  { num: "12+",  txt: "Years"    },
  { num: "98%",  txt: "Satisfaction" },
];

export function ConsultationForm({ initialCategories, headerSvgUrl, emailSvgUrl }: { initialCategories?: Category[]; headerSvgUrl?: string; emailSvgUrl?: string }) {
  const contactInfo = useSettings((s) => s.settings?.contact_info);
  const [categories, setCategories] = useState<Category[]>(initialCategories ?? []);

  useEffect(() => {
    if (initialCategories) return;
    if (!CategoryPublic?.listSafe) return;
    let mounted = true;
    CategoryPublic.listSafe().then((r) => { if (mounted) setCategories(r.results ?? []); });
    return () => { mounted = false; };
  }, [initialCategories]);

  const [submitted, setSubmitting2] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);
  const [name, setName]             = useState("");
  const [email, setEmail]           = useState("");
  const [phone, setPhone]           = useState("");
  const [service, setService]       = useState("");
  const [desc, setDesc]             = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showLocation, setShowLocation]   = useState(false);
  const [locationMethod, setLocationMethod] = useState<"gps" | "landmark">("gps");
  const [mapLocation, setMapLocation]     = useState<LocationData | null>(null);
  const [mapDialogOpen, setMapDialogOpen] = useState(false);
  const [landmark, setLandmark]           = useState("");
  const [sitePhotos, setSitePhotos]       = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setSitePhotos((prev) => [...prev, ...files]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const removePhoto = (idx: number) => setSitePhotos((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      await ConsultationPublic.submit(
        { name, email, phone, service, description: desc, preferred_date: preferredDate, landmark },
        sitePhotos.length > 0 ? sitePhotos : undefined,
      );
      setSubmitting2(true);
      setSubmitCount((c) => c + 1);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="consultation-form" className="w-full flex flex-col lg:flex-row-reverse">

      {/* ── LEFT PANEL ── */}
      <div
        className="relative lg:w-[55%] flex flex-col px-4 sm:px-8 lg:px-14 py-10 lg:py-14 overflow-hidden"
        style={{
          background: "#07112b",
          backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.025) 0 2px, transparent 2px 16px)",
        }}
      >
        {/* Red top accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#cd2028]" aria-hidden="true" />

        {/* Eyebrow */}
        <div className="flex items-center gap-2.5 mb-4">
          <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
          <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#93c5fd]">
            Get in Touch
          </span>
        </div>

        {/* Heading */}
        <h2
          className="font-display font-black text-white leading-none tracking-[-0.02em]"
          style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
        >
          Let&apos;s Build<br />
          <span className="text-[#cd2028]">Together</span>
        </h2>

        <p className="mt-4 text-white/65 text-[14px] leading-relaxed max-w-xs">
          Tell us about your project and we&apos;ll get back to you within 24 hours.
        </p>

        {/* SVG illustration */}
        <div className="my-5">
          <Image
            src={headerSvgUrl || "/video-gif/customer-inquires.svg"}
            alt="Consultation illustration"
            width={200}
            height={120}
            unoptimized
            className="w-[140px] h-[84px] sm:w-[200px] sm:h-[120px] object-contain"
            sizes="(max-width: 640px) 140px, 200px"
          />
        </div>

        {/* Contact list */}
        <ul className="space-y-3 mb-6">
          {[
            { Icon: Phone, href: `tel:${contactInfo?.phone ?? ""}`,      text: contactInfo?.phone   ?? "+977 01-XXXXXXX" },
            { Icon: Mail,  href: `mailto:${contactInfo?.email ?? ""}`,   text: contactInfo?.email   ?? "info@horizannepal.com" },
            { Icon: MapPin, href: "#",                                    text: contactInfo?.address ?? "Kathmandu, Nepal" },
          ].map(({ Icon, href, text }) => (
            <li key={href} className="flex items-center gap-3.5">
              <div className="size-8 rounded-lg bg-white/8 flex items-center justify-center shrink-0">
                <Icon className="size-4 text-[#93c5fd]" />
              </div>
              <a href={href} className="text-white/80 text-[13.5px] font-medium hover:text-white transition-colors">
                {text}
              </a>
            </li>
          ))}
        </ul>

        {/* Trust strip */}
        <div className="mt-auto flex gap-4">
          {trust.map((t) => (
            <div key={t.txt} className="flex-1 rounded-xl bg-white/6 border border-white/10 px-3 py-3 text-center">
              <p className="text-[#cd2028] font-black text-[22px] leading-none">{t.num}</p>
              <p className="text-white/55 text-[9px] sm:text-[10px] font-semibold mt-1 uppercase tracking-wide">{t.txt}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="lg:w-[45%] bg-[#f8fafc] flex flex-col px-4 sm:px-8 lg:px-14 py-10 lg:py-14">

        <h3 className="font-display text-[20px] sm:text-[24px] font-bold text-[#0f2557] mb-5">
          Send Us a Message
        </h3>

        {submitted ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-16">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={submitCount}
              src={emailSvgUrl || "/video-gif/email.svg"}
              alt="Message sent"
              className="w-[110px] h-[110px] object-contain mb-4"
            />
            <h4 className="font-display font-bold text-[22px] text-[#0f2557]">Thank You!</h4>
            <p className="mt-2 text-[#475569] text-[14px]">
              We&apos;ve received your message and will get back to you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col flex-1">
            <div className="grid sm:grid-cols-2 gap-4">

              <div>
                <label className={LABEL} htmlFor="cf-name">Full Name</label>
                <input id="cf-name" required value={name} onChange={(e) => setName(e.target.value)}
                  className={INPUT} placeholder="Your name" />
              </div>

              <div>
                <label className={LABEL} htmlFor="cf-email">Email Address</label>
                <input id="cf-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className={INPUT} placeholder="your@email.com" />
              </div>

              <div>
                <label className={LABEL} htmlFor="cf-phone">Phone Number</label>
                <input id="cf-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                  className={INPUT} placeholder="+977 98XXXXXXXX" />
              </div>

              <div>
                <label className={LABEL} htmlFor="cf-service">Service Needed</label>
                <select id="cf-service" value={service} onChange={(e) => setService(e.target.value)} className={INPUT}>
                  <option value="">Select a service</option>
                  {categories?.map((cat) => (
                    <option key={cat.id} value={cat.name ?? ""}>{cat.name ?? ""}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className={LABEL} htmlFor="cf-desc">Project Details</label>
                <textarea id="cf-desc" rows={4} value={desc} onChange={(e) => setDesc(e.target.value)}
                  className={`${INPUT} h-auto py-3 resize-none`}
                  placeholder="Tell us about your project..." />
              </div>

              <div className="sm:col-span-2">
                <label className={LABEL} htmlFor="cf-date">Preferred Date</label>
                <input id="cf-date" type="date" value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)}
                  className={INPUT} />
              </div>

              {/* Location accordion */}
              <div className="sm:col-span-2 border-t border-[#e2e8f0] pt-4 mt-1">
                <button type="button" onClick={() => setShowLocation(!showLocation)}
                  className="flex items-center gap-2 text-[13px] font-semibold text-[#475569] hover:text-[#1d4ed8] transition-colors w-full">
                  <MapPin className="size-4" />
                  <span>Add location details?</span>
                  <ChevronDown className={`size-4 ml-auto transition-transform duration-300 ${showLocation ? "rotate-180" : ""}`} />
                </button>

                <div className="grid transition-all duration-300 ease-out mt-2" style={{ gridTemplateRows: showLocation ? "1fr" : "0fr" }}>
                  <div className="overflow-hidden">
                    <div className="space-y-4 pt-2">
                      <div className="flex gap-2">
                        {(["gps", "landmark"] as const).map((m) => (
                          <button key={m} type="button" onClick={() => setLocationMethod(m)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-semibold border transition-all ${
                              locationMethod === m
                                ? "border-[#1d4ed8] bg-[#eff6ff] text-[#1d4ed8]"
                                : "border-[#e2e8f0] text-[#64748b] hover:border-[#1d4ed8]/40"
                            }`}>
                            {m === "gps" ? <Link className="size-3.5" /> : <MapPinHouse className="size-3.5" />}
                            {m === "gps" ? "GPS Link" : "Landmark"}
                          </button>
                        ))}
                      </div>

                      {locationMethod === "gps" ? (
                        <div>
                          <label className={LABEL}>Pin Location on Map</label>
                          <Dialog open={mapDialogOpen} onOpenChange={setMapDialogOpen}>
                            <DialogTrigger asChild>
                              <button type="button"
                                className={`w-full flex items-center gap-2 h-11 px-3.5 rounded-xl border text-[13px] font-medium transition-colors ${
                                  mapLocation
                                    ? "border-[#1d4ed8] bg-[#eff6ff] text-[#1d4ed8]"
                                    : "border-dashed border-[#e2e8f0] text-[#94a3b8] hover:border-[#1d4ed8]/50 hover:text-[#1d4ed8]"
                                }`}>
                                {mapLocation ? <Check className="size-4" /> : <MapPin className="size-4" />}
                                <span className="truncate">{mapLocation ? mapLocation.address : "Pick on map"}</span>
                              </button>
                            </DialogTrigger>
                            <DialogContent className="flex flex-col bg-white [max-width:90vw!important] sm:[max-width:75vw!important] [height:85vh!important] p-0! gap-0! overflow-hidden">
                              <div className="flex items-center justify-between px-4 pt-4 pb-2 shrink-0">
                                <DialogTitle className="text-sm font-medium">Pin Your Location</DialogTitle>
                              </div>
                              <div className="flex-1 min-h-0 relative">
                                <GoogleMapAddress
                                  onLocationSelect={(loc) => { setMapLocation(loc); setMapDialogOpen(false); }}
                                  initialPosition={mapLocation ?? undefined}
                                />
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      ) : (
                        <div>
                          <label className={LABEL} htmlFor="cf-landmark">Landmark</label>
                          <input id="cf-landmark" value={landmark} onChange={(e) => setLandmark(e.target.value)}
                            className={INPUT} placeholder="Near Ratna Park, Kathmandu" />
                        </div>
                      )}

                      {/* Photos */}
                      <div>
                        <label className={LABEL}>Site Photos</label>
                        <div className="flex items-center gap-3">
                          <button type="button" onClick={() => fileInputRef.current?.click()}
                            className="flex items-center gap-2 h-10 px-4 rounded-xl border border-dashed border-[#e2e8f0] text-[12.5px] text-[#64748b] hover:border-[#1d4ed8]/50 hover:text-[#1d4ed8] transition-colors font-medium">
                            <Camera className="size-4" /> Add Photos
                          </button>
                          {sitePhotos.length > 0 && (
                            <span className="text-[11.5px] text-[#64748b]">{sitePhotos.length} selected</span>
                          )}
                        </div>
                        <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handlePhotoSelect} className="hidden" />
                        {sitePhotos.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {sitePhotos.map((file, idx) => (
                              <div key={`${file.name}-${idx}`} className="relative group">
                                <Image src={URL.createObjectURL(file)} alt={`Site photo ${idx + 1}`}
                                  width={80} height={80} unoptimized
                                  className="size-20 rounded-xl object-cover border border-[#e2e8f0]" />
                                <button type="button" onClick={() => removePhoto(idx)}
                                  className="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-[#ef4444] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <X className="size-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" disabled={submitting}
              className="mt-8 w-full h-[54px] rounded-xl bg-[#1d4ed8] text-white font-bold text-[15px] inline-flex items-center justify-center gap-2 hover:bg-[#1e40af] active:scale-[0.99] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#1d4ed8]/25 focus-visible:ring-2 focus-visible:ring-[#1d4ed8] focus-visible:ring-offset-2">
              {submitting ? <><Loader2 className="size-4 animate-spin" /> Sending…</> : <>Send Message <ArrowRight className="size-4" /></>}
            </button>

            <p className="mt-3 text-[11.5px] text-[#94a3b8] text-center">
              Your information is safe with us. We&apos;ll never share your details.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
