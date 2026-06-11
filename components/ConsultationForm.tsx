"use client";

import { useState, useEffect } from "react";
import { ArrowRight, MapPin, Mail, Phone } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ConsultationPublic } from "@/api/services/consultation.service";
import { CategoryPublic } from "@/api/services/category.service";
import { useSettings } from "@/stores/settings-store";
import type { Category } from "@/api/types/category.types";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      await ConsultationPublic.submit({
        name,
        email,
        phone,
        service,
        description: desc,
        preferred_date: preferredDate,
      });
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
          <SectionLabel>{sectionLabel}</SectionLabel>
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
