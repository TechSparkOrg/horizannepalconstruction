"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, MapPin, Mail, Phone, ChevronDown, X, Link, MapPinHouse, Camera, Check, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { ConsultationPublic } from "@/api/services/consultation.service";
import { CategoryPublic } from "@/api/services/category.service";
import { useSettings } from "@/stores/settings-store";
import type { Category } from "@/api/types/category.types";
import type { LocationData } from "@/components/global_ui/Googlemap";

const GoogleMapAddress = dynamic(() => import("@/components/global_ui/Googlemap"), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center">
      <Loader2 className="size-8 animate-spin text-brand-primary" />
    </div>
  ),
});

const sectionLabel = "Get in Touch";
const heading = "Let's Build Together";
const description = "Tell us about your project and we'll get back to you within 24 hours.";
const formTitle = "Send Us a Message";
const privacyText = "Your information is safe with us. We'll never share your details.";
const successHeading = "Thank You!";
const successMessage = "We've received your message and will get back to you shortly.";

export function ConsultationForm({
  initialCategories,
}: {
  initialCategories?: Category[];
}) {
  const contactInfo = useSettings((s) => s.settings?.contact_info);

  const [categories, setCategories] = useState<Category[]>(initialCategories ?? []);

  useEffect(() => {
    if (initialCategories) return;
    if (!CategoryPublic?.list) return;
    CategoryPublic.list().then((r) => {
      setCategories(r.results ?? []);
    }).catch(() => {});
  }, []);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [desc, setDesc] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [showLocation, setShowLocation] = useState(false);
  const [locationMethod, setLocationMethod] = useState<"gps" | "landmark">("gps");
  const [mapLocation, setMapLocation] = useState<LocationData | null>(null);
  const [mapDialogOpen, setMapDialogOpen] = useState(false);
  const [landmark, setLandmark] = useState("");
  const [sitePhotos, setSitePhotos] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setSitePhotos((prev) => [...prev, ...files]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removePhoto = (idx: number) => {
    setSitePhotos((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      await ConsultationPublic.submit(
        {
          name,
          email,
          phone,
          service,
          description: desc,
          preferred_date: preferredDate,
          landmark,
        },
        sitePhotos.length > 0 ? sitePhotos : undefined,
      );
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="consultation-form" className="bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-28 grid lg:grid-cols-2 gap-0 lg:gap-10 items-stretch">
        <div
          className="relative rounded-l-2xl lg:rounded-l-2xl rounded-t-2xl lg:rounded-tr-none bg-brand-dark text-white p-8 sm:p-12 overflow-hidden"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, oklch(1 0 0 / 0.03) 0 2px, transparent 2px 14px)",
          }}
        >
          <Label className="text-xs font-semibold tracking-[0.15em] uppercase text-brand-primary bg-brand-primary/5 px-3 py-1 rounded-full">{sectionLabel}</Label>
          <h2 className="mt-3 font-display font-bold text-white text-3xl sm:text-4xl leading-tight">
            {heading}
          </h2>
          <p className="mt-5 text-white/85 leading-relaxed max-w-md font-semibold">
            {description}
          </p>
          <div className="mt-8 rounded-xl overflow-hidden h-32 sm:h-36 bg-white/8 flex items-center justify-center text-white/30">
            <Mail className="size-12" />
          </div>
          <ul className="mt-6 space-y-5 text-white/90">
            <li className="flex items-center gap-3.5">
              <Phone className="size-6 text-brand-primary" />
              <a href={`tel:${contactInfo?.phone ?? ""}`} className="hover:text-brand-primary font-semibold">
                {contactInfo?.phone ?? ""}
              </a>
            </li>
            <li className="flex items-center gap-3.5">
              <Mail className="size-6 text-brand-primary" />
              <a href={`mailto:${contactInfo?.email ?? ""}`} className="hover:text-brand-primary font-semibold">
                {contactInfo?.email ?? ""}
              </a>
            </li>
            <li className="flex items-center gap-3.5">
              <MapPin className="size-6 text-brand-primary" />
              <span className="font-semibold">{contactInfo?.address ?? ""}</span>
            </li>
          </ul>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-off-white rounded-r-2xl rounded-b-2xl lg:rounded-b-2xl lg:rounded-bl-none p-8 sm:p-10"
        >
          <h3 className="font-display text-2xl font-bold text-brand-secondary">
            {formTitle}
          </h3>

          {submitted ? (
            <div className="mt-6 text-center py-12">
              <div className="size-16 mx-auto rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="mt-4 font-display font-bold text-xl text-brand-dark">{successHeading}</h3>
              <p className="mt-2 text-mid-gray text-sm">{successMessage}</p>
            </div>
          ) : (
            <>
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-brand-secondary mb-1" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-11 px-3 rounded-md border border-light-gray bg-white text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-secondary mb-1" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 px-3 rounded-md border border-light-gray bg-white text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-secondary mb-1" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-11 px-3 rounded-md border border-light-gray bg-white text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    placeholder="+977 98XXXXXXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-secondary mb-1" htmlFor="service">
                    Service Needed
                  </label>
                  <select
                    id="service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full h-11 px-3 rounded-md border border-light-gray bg-white text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  >
                    <option value="">Select a service</option>
                    {categories?.map((cat) => (
                      <option key={cat.id} value={  cat.name ?? ""}>{cat.name ?? ""}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-brand-secondary mb-1" htmlFor="description">
                    Project Details
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-light-gray bg-white text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-brand-secondary mb-1" htmlFor="date">
                    Preferred Date
                  </label>
                  <input
                    id="date"
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full h-11 px-3 rounded-md border border-light-gray bg-white text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>

                <div className="sm:col-span-2 border-t border-light-gray/60 pt-4 mt-2">
                  <button
                    type="button"
                    onClick={() => setShowLocation(!showLocation)}
                    className="flex items-center gap-2 text-sm font-medium text-brand-secondary hover:text-brand-primary transition-colors"
                  >
                    <MapPin className="size-4" />
                    <span>Add location details?</span>
                    <ChevronDown className={`size-4 ml-auto transition-transform duration-300 ${showLocation ? "rotate-180" : ""}`} />
                  </button>

                  <div
                    className="grid transition-all duration-300 ease-out mt-2"
                    style={{ gridTemplateRows: showLocation ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <div className="space-y-4 pt-2">

                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={() => setLocationMethod("gps")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium border transition-colors ${
                              locationMethod === "gps"
                                ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
                                : "border-light-gray text-mid-gray hover:border-brand-primary/40"
                            }`}
                          >
                            <Link className="size-3.5" />
                            GPS Link
                          </button>
                          <button
                            type="button"
                            onClick={() => setLocationMethod("landmark")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium border transition-colors ${
                              locationMethod === "landmark"
                                ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
                                : "border-light-gray text-mid-gray hover:border-brand-primary/40"
                            }`}
                          >
                            <MapPinHouse className="size-3.5" />
                            Landmark
                          </button>
                        </div>

                        {locationMethod === "gps" ? (
                          <div >
                            <label className="block text-xs font-medium text-brand-secondary mb-1">
                              Pin Location on Map
                            </label>
                            <Dialog open={mapDialogOpen} onOpenChange={setMapDialogOpen}>
                              <DialogTrigger asChild>
                                <button
                                  type="button"
                                  className={`w-full flex items-center gap-2 h-10 px-3 rounded-lg border text-xs font-medium transition-colors ${
                                    mapLocation
                                      ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
                                      : "border-dashed border-light-gray text-mid-gray hover:border-brand-primary/40 hover:text-brand-primary"
                                  }`}
                                >
                                  {mapLocation ? <Check className="size-4" /> : <MapPin className="size-4" />}
                                  <span className="truncate">
                                    {mapLocation ? mapLocation.address : "Pick on map"}
                                  </span>
                                </button>
                              </DialogTrigger>
                              {/* <DialogContent className="flex flex-col bg-white [max-width:90vw!important] sm:[max-width:75vw!important] [height:85vh!important] p-0! gap-0! overflow-hidden">
                                <div className="flex items-center justify-between px-4 pt-4 pb-2 shrink-0">
                                  <DialogTitle className="text-sm font-medium">Pin Your Location</DialogTitle>
                                </div>
                                <div className="flex-1 min-h-0 relative">
                                  <GoogleMapAddress
                                    onLocationSelect={(loc) => {
                                      setMapLocation(loc);
                                      setMapDialogOpen(false);
                                    }}
                                    initialPosition={mapLocation ?? undefined}
                                  />
                                </div>
                              </DialogContent> */}
                            </Dialog>
                          </div>
                        ) : (
                          <div className="px-2">
                            <label className="block text-xs font-medium text-brand-secondary mb-1" htmlFor="landmark">
                              Landmark
                            </label>
                            <input
                              id="landmark"
                              value={landmark}
                              onChange={(e) => setLandmark(e.target.value)}
                              className="w-full h-10 px-3 rounded-md border border-light-gray bg-white text-brand-dark text-xs focus:outline-none focus:ring-2 focus:ring-brand-primary"
                              placeholder="Near Ratna Park, Kathmandu"
                            />
                          </div>
                        )}

                        <div>
                          <label className="block text-xs font-medium text-brand-secondary mb-1">
                            Site Photos
                          </label>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="flex items-center gap-2 h-10 px-4 rounded-lg border border-dashed border-light-gray text-xs text-mid-gray hover:border-brand-primary/40 hover:text-brand-primary transition-colors"
                            >
                              <Camera className="size-4" />
                              Add Photos
                            </button>
                            {sitePhotos.length > 0 && (
                              <span className="text-[11px] text-mid-gray">{sitePhotos.length} selected</span>
                            )}
                          </div>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handlePhotoSelect}
                            className="hidden"
                          />
                          {sitePhotos.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {sitePhotos.map((file, idx) => (
                                <div key={`${file.name}-${idx}`} className="relative group">
                                  <img
                                    src={URL.createObjectURL(file)}
                                    alt={`Site photo ${idx + 1}`}
                                    className="size-20 rounded-md object-cover border border-light-gray"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removePhoto(idx)}
                                    className="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
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

              <button
                type="submit"
                disabled={submitting}
                className="mt-6 w-full h-[52px] rounded-md bg-brand-primary text-white font-semibold inline-flex items-center justify-center gap-2 hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Sending..." : "Send Message"} <ArrowRight className="size-4" />
              </button>
              <p className="mt-3 text-xs text-mid-gray">
                {privacyText}
              </p>
            </>
          )}
        </form>
      </div>

    </section>
  );
}
