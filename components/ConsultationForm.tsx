"use client";

import { useState } from "react";
import { ArrowRight, MapPin, Mail, Phone } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function ConsultationForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
          <SectionLabel>Get in Touch</SectionLabel>
          <h2 className="mt-3 font-display font-bold text-white text-3xl sm:text-4xl leading-tight">
            Let&apos;s Discuss Your Project
          </h2>
          <p className="mt-5 text-white/75 leading-relaxed max-w-md">
            Tell us about your vision, and we&apos;ll get back to you within 24 hours for a free consultation.
          </p>
          <div className="mt-8 rounded-xl overflow-hidden h-32 sm:h-36 bg-white/5 flex items-center justify-center text-white/20">
            <Mail className="size-10" />
          </div>
          <ul className="mt-6 space-y-4 text-white/85">
            <li className="flex items-center gap-3">
              <Phone className="size-5 text-brand-primary" />
              <a href="tel:+97714411222" className="hover:text-brand-primary">
                +977 1 441 1222
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="size-5 text-brand-primary" />
              <a href="mailto:hello@horizonnepal.com.np" className="hover:text-brand-primary">
                hello@horizonnepal.com.np
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="size-5 text-brand-primary" />
              <span>Tinkune, Kathmandu</span>
            </li>
          </ul>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-off-white rounded-r-2xl rounded-b-2xl lg:rounded-b-2xl lg:rounded-bl-none p-8 sm:p-10"
        >
          <h3 className="font-display text-2xl font-bold text-brand-secondary">
            Send Us a Message
          </h3>

          {submitted ? (
            <div className="mt-6 text-center py-12">
              <div className="size-16 mx-auto rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="mt-4 font-display font-bold text-xl text-brand-dark">Thank You!</h3>
              <p className="mt-2 text-mid-gray text-sm">We&apos;ll reach out within 24 hours to schedule your free consultation.</p>
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
                    className="w-full h-11 px-3 rounded-md border border-light-gray bg-white text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  >
                    <option value="">Select a service</option>
                    <option>Architectural Design</option>
                    <option>Engineering & Structure</option>
                    <option>Construction Management</option>
                    <option>Interior Design</option>
                    <option>Material Consultation</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-brand-secondary mb-1" htmlFor="description">
                    Project Details
                  </label>
                  <textarea
                    id="description"
                    rows={4}
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
                    className="w-full h-11 px-3 rounded-md border border-light-gray bg-white text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 w-full h-[52px] rounded-md bg-brand-primary text-white font-semibold inline-flex items-center justify-center gap-2 hover:brightness-110 transition"
              >
                Send Message <ArrowRight className="size-4" />
              </button>
              <p className="mt-3 text-xs text-mid-gray">
                We respect your privacy. Your information is safe with us.
              </p>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
