"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const NAV = [
  { href: "/", label: "Home" },

  {
    label: "Services",
    children: [
      { href: "/design", label: "Design" },
      { href: "/floor-planner", label: "Floor Planner" },
      { href: "/vastu-shastra", label: "Vastu Shastra" },
      { href: "/building-permit", label: "Building Permit" },
      { href: "/material", label: "Materials" },
    ],
  },
  { href: "/our-work", label: "Projects" },
  {
    label: "Tools",
    children: [
      { href: "/emi-calculator", label: "EMI Calculator" },
      { href: "/unit-convert", label: "Unit Converter" },
    ],
  },
  { href: "/blog", label: "Blog" },
  { href: "/reviews", label: "Reviews" },
  { href: "/faq", label: "FAQ" },
    { href: "/about", label: "About" },
];

type NavItem =
  | { href: string; label: string; children?: never }
  | { href?: never; label: string; children: { href: string; label: string }[] };

/* ─── Desktop Dropdown ──────────────────────────────────────── */
function DropdownItem({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const show = () => { clearTimeout(timer.current); setOpen(true); };
  const hide = () => { timer.current = setTimeout(() => setOpen(false), 120); };
  useEffect(() => () => clearTimeout(timer.current), []);

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className="flex items-center h-9 px-3 text-[13.5px] font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="relative shrink-0" onMouseEnter={show} onMouseLeave={hide}>
      <button
        type="button"
        className={cn(
          "flex items-center h-9 gap-1 px-3 text-[13.5px] font-medium rounded-lg transition-colors",
          open ? "text-white bg-white/15" : "text-white/80 hover:text-white hover:bg-white/10"
        )}
      >
        {item.label}
        <ChevronDown className={cn("size-3 opacity-50 transition-transform duration-200", open && "rotate-180")} />
      </button>

      <div
        className={cn(
          "absolute top-full left-0 pt-2 z-50 transition-all duration-150",
          open ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1"
        )}
        onMouseEnter={show}
        onMouseLeave={hide}
      >
        <div className="w-[192px] rounded-xl border border-light-gray bg-white shadow-[0_4px_16px_rgba(15,37,87,0.08)] p-1.5">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="flex items-center h-9 px-3 text-[13.5px] font-medium text-mid-gray hover:text-brand-dark hover:bg-accent rounded-lg transition-colors"
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Mobile Sidebar ────────────────────────────────────────── */
function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="lg:hidden flex items-center justify-center size-9 text-white/80 hover:text-white transition-colors">
          <Menu className="size-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[288px] border-r border-light-gray bg-white p-0">
        <SheetHeader className="px-5 py-[18px] border-b border-light-gray">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Horizon Nepal" width={30} height={30} className="object-contain shrink-0" />
            <div className="flex flex-col gap-[3px]">
              <span className="text-brand-dark font-bold text-[15px] leading-none tracking-tight">
                Horizon <span className="text-brand-primary">Nepal</span>
              </span>
              <span className="text-[9px] font-semibold tracking-[0.2em] uppercase text-muted-foreground leading-none">Construction</span>
            </div>
          </Link>
        </SheetHeader>

        <nav className="px-2.5 py-3 space-y-0.5">
          {NAV.map((item) =>
            !item.children ? (
              <Link
                key={item.label}
                href={(item as { href: string; label: string }).href}
                className="flex items-center h-10 px-3 text-[13.5px] font-medium text-mid-gray hover:text-brand-dark hover:bg-accent rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <Collapsible key={item.label} className="group/collapsible">
                <CollapsibleTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center w-full h-10 px-3 text-[13.5px] font-medium text-mid-gray hover:text-brand-dark hover:bg-accent rounded-lg transition-colors"
                  >
                    {item.label}
                    <ChevronDown className="ml-auto size-3.5 opacity-40 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="mt-0.5 mb-1 ml-2.5 pl-3 border-l border-light-gray space-y-0.5">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="flex items-center h-9 px-3 text-[13px] font-medium text-mid-gray hover:text-brand-dark hover:bg-accent rounded-lg transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )
          )}
        </nav>

        <div className="absolute bottom-0 inset-x-0 px-4 pb-6 pt-4 border-t border-light-gray">
          <Link
            href="/contact"
            className="flex items-center justify-center w-full h-10 rounded-full bg-brand-dark hover:bg-[#0c1f4a] text-white font-semibold text-[13.5px] transition-colors"
          >
            Get a Quote
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}

/* ─── Header ────────────────────────────────────────────────── */
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      requestAnimationFrame(() => { setScrolled(window.scrollY > 20); ticking = false; });
      ticking = true;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 inset-x-0 z-50 bg-brand-dark border-b transition-all duration-200",
      scrolled ? "border-white/10 shadow-[0_1px_8px_rgba(0,0,0,0.25)]" : "border-white/10"
    )}>
      <div className="max-w-[1280px] mx-auto h-[64px] px-4 sm:px-6 lg:px-10 grid grid-cols-[auto_1fr_auto] items-center gap-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image src="/logo.png" alt="Horizon Nepal" width={32} height={32} className="object-contain shrink-0" />
          <div className="flex flex-col gap-[3px]">
            <span className="text-white font-bold text-[15.5px] leading-none tracking-tight">
              Horizon Nepal
            </span>
            <span className="text-[9px] font-semibold tracking-[0.2em] uppercase text-white/60 leading-none">Construction</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center justify-center gap-0.5">
          {NAV.map((item) => (
            <DropdownItem key={item.label} item={item as NavItem} />
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/contact"
            className="hidden sm:flex items-center h-9 px-6 rounded-full bg-white hover:bg-gray-100 text-brand-dark font-semibold text-[13.5px] leading-none transition-colors"
          >
            Get a Quote
          </Link>
          <MobileSidebar />
        </div>

      </div>
    </header>
  );
}