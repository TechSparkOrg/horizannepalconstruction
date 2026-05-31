"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronRight, ChevronDown, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/our-work", label: "Project" },
  { href: "/contact", label: "Contact" },
    { href: "/design", label: "Design" },
  { href: "/cost-estimation", label: "Cost Estimation" },
];

const TOOLS_ITEMS = [

  { href: "/vastu-shastra", label: "Vastu Shastra Guide" },
  { href: "/building-permit", label: "Building Permit Assistant" },
  { href: "/floor-planner", label: "2D Floor Planner" },
  { href: "/green-calculator", label: "Green Builder Calculator" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<"en" | "np">("en");
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const toolsRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const main = document.getElementById("main-content");
    if (!main?.firstElementChild) return;
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-20% 0px 0px 0px" },
    );
    observer.observe(main.firstElementChild);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-brand-primary focus:text-white focus:text-sm focus:font-bold"
      >
        Skip to content
      </a>

      <nav
        aria-label="Primary navigation"
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled
            ? "bg-brand-dark/90 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center h-[68px]">
          {/* Logo */}
          <Link
            href="/"
            prefetch={false}
            className="flex items-center gap-2.5 group flex-shrink-0"
          >
            <div className="relative">
              <img
                src="/favicon.png"
                alt="Horizon Nepal Logo"
                className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-110"
              />
              <span className="absolute -inset-1 rounded-full bg-brand-primary/20 scale-0 group-hover:scale-100 transition-transform duration-300" />
            </div>
            <span className="flex items-center text-xl sm:text-2xl drop-shadow-md leading-none">
              <span className="text-brand-primary font-extrabold tracking-tight">Horizon</span>
              <span className="text-white ml-1.5 font-medium tracking-wide">Nepal</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center justify-center gap-0.5 flex-1" role="list">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  prefetch={false}
                  className="relative px-3 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 text-white/80 hover:text-white hover:bg-white/8"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li ref={toolsRef} className="relative">
              <button
                type="button"
                onClick={() => setToolsOpen(!toolsOpen)}
                onMouseEnter={() => setToolsOpen(true)}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 text-white/80 hover:text-white hover:bg-white/8"
              >
                Tools
                <ChevronDown className={`size-3.5 transition-transform duration-200 ${toolsOpen ? "rotate-180" : ""}`} />
              </button>

              <div
                onMouseEnter={() => setToolsOpen(true)}
                className={`absolute top-full right-0 pt-2 transition-all duration-200 ${
                  toolsOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1 pointer-events-none"
                }`}
              >
                <div className="bg-brand-dark border border-white/10 rounded-xl shadow-2xl shadow-black/40 overflow-hidden min-w-[220px]">
                  {TOOLS_ITEMS.map((t) => (
                    <Link
                      key={t.href}
                      href={t.href}
                      prefetch={false}
                      onClick={() => setToolsOpen(false)}
                      className="block px-4 py-2.5 text-sm font-medium text-white/70 hover:text-white hover:bg-white/8 transition-colors"
                    >
                      {t.label}
                    </Link>
                  ))}
                </div>
              </div>
            </li>
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={() => setLang(lang === "en" ? "np" : "en")}
              className="flex items-center gap-1.5 h-9 px-2.5 rounded-lg border border-white/15 hover:border-white/30 transition"
              aria-label={lang === "en" ? "Switch to Nepali" : "Switch to English"}
            >
              {lang === "en" ? (
                <Image src="/staticimg/flag-for-flag-nepal.svg" alt="NP" width={20} height={14} className="size-5 object-contain" />
              ) : (
                <Image src="/staticimg/US-UK_Flag.png" alt="US" width={20} height={14} className="size-5 object-contain" />
              )}
              <span className="text-xs font-semibold text-white/70 hidden sm:inline">{lang === "en" ? "NP" : "EN"}</span>
            </button>

            <a
              href="https://wa.me/97714411222?text=Hello!%20I'd%20like%20to%20know%20more%20about%20Horizon%20Nepal's%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center size-9 rounded-lg bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/30 hover:bg-[#25D366] hover:text-white transition"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="size-4.5" />
            </a>

            <Link
              href="/contact"
              prefetch={false}
              className="hidden sm:inline-flex items-center justify-center gap-1.5 px-5 h-9 rounded-full bg-brand-primary text-white text-sm font-bold tracking-wide shadow-md shadow-brand-primary/25 hover:shadow-lg hover:shadow-brand-primary/40 hover:-translate-y-px active:translate-y-0 active:scale-[0.97] transition-all duration-200"
            >
              Get a Quote
              <ChevronRight className="size-3.5 opacity-80" />
            </Link>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-white hover:bg-white/10 hover:text-brand-primary transition-all duration-200"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[108] bg-black/40 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      />

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed inset-y-0 right-0 z-[110] w-[min(320px,100vw)] bg-brand-dark border-l border-white/8 flex flex-col lg:hidden transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-[68px] px-5 border-b border-white/8 flex-shrink-0">
          <Link
            href="/"
            prefetch={false}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5"
          >
            <img src="/favicon.png" alt="Horizon Nepal Logo" className="h-7 w-7 object-contain" />
            <span className="flex items-center text-lg leading-none">
              <span className="text-brand-primary font-extrabold">Horizon</span>
              <span className="text-white ml-1 font-medium">Nepal</span>
            </span>
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="flex flex-col gap-1" role="list">
            {NAV_ITEMS.map((item, i) => (
              <li key={item.href}>
                <Link
                  onClick={() => setOpen(false)}
                  href={item.href}
                  prefetch={false}
                  style={{ animationDelay: `${i * 40}ms` }}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold tracking-wide transition-all duration-200 text-white/75 hover:text-white hover:bg-white/6"
                >
                  {item.label}
                  <ChevronRight className="size-4 opacity-30" />
                </Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
                className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-base font-semibold tracking-wide transition-all duration-200 text-white/75 hover:text-white hover:bg-white/6"
              >
                Tools
                <ChevronDown className={`size-4 opacity-50 transition-transform duration-200 ${mobileToolsOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-200 ${mobileToolsOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="ml-4 border-l border-white/10 pl-3 space-y-0.5 py-1">
                  {TOOLS_ITEMS.map((t) => (
                    <Link
                      key={t.href}
                      onClick={() => setOpen(false)}
                      href={t.href}
                      prefetch={false}
                      className="block px-4 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/6 transition-colors"
                    >
                      {t.label}
                    </Link>
                  ))}
                </div>
              </div>
            </li>
          </ul>
        </nav>

        <div className="p-5 border-t border-white/8 flex-shrink-0 space-y-3">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setLang(lang === "en" ? "np" : "en")}
              className="flex-1 flex items-center justify-center gap-2 h-10 rounded-full border border-white/15 text-white/70 text-sm font-semibold hover:bg-white/6 transition"
            >
              {lang === "en" ? (
                <Image src="/staticimg/flag-for-flag-nepal.svg" alt="NP" width={20} height={14} className="size-5 object-contain" />
              ) : (
                <Image src="/staticimg/US-UK_Flag.png" alt="US" width={20} height={14} className="size-5 object-contain" />
              )}
              {lang === "en" ? "नेपाली" : "English"}
            </button>
            <a
              href="https://wa.me/97714411222?text=Hello!%20I'd%20like%20to%20know%20more%20about%20Horizon%20Nepal's%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 h-10 rounded-full bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/30 text-sm font-semibold transition hover:bg-[#25D366] hover:text-white"
            >
              <MessageCircle className="size-4" />
              WhatsApp
            </a>
          </div>
          <Link
            onClick={() => setOpen(false)}
            href="/contact"
            prefetch={false}
            className="flex items-center justify-center gap-2 w-full h-12 rounded-full bg-brand-primary text-white text-base font-bold tracking-wide shadow-lg shadow-brand-primary/25 hover:shadow-brand-primary/40 active:scale-[0.98] transition-all duration-200"
          >
            Get a Quote
            <ChevronRight className="size-4 opacity-80" />
          </Link>
        </div>
      </div>
    </>
  );
}
