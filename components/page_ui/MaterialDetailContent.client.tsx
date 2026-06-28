"use client";

import { useState, useEffect, useCallback } from "react";
import ParsedContent from "@/lib/Parse-Content";
import type { TocItem } from "@/lib/extractTocItems";
import { cn } from "@/lib/utils";

interface Props {
  content: string;
}

const HEADER_HEIGHT = 80;

export default function MaterialDetailContent({ content }: Props) {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  const handleTocExtracted = useCallback((items: TocItem[]) => {
    setTocItems(items);
  }, []);

  useEffect(() => {
    if (tocItems.length === 0) return;
    const ids = tocItems.map((item) => item.id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-50px 0px -60% 0px" }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [tocItems]);

  const handleTocClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
      window.scrollTo({ top, behavior: "smooth" });
      setActiveId(id);
    }
  };

  return (
    <article className="bg-white py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[1fr_260px] lg:gap-8">
          <div className="min-w-0">
            <ParsedContent
              description={content}
              onTocExtracted={handleTocExtracted}
            />
          </div>

          {tocItems.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <h3 className="text-sm font-semibold text-brand-dark uppercase tracking-wider mb-3">
                  On this page
                </h3>
                <nav className="relative space-y-1 border-l border-mid-gray/20 pl-0">
                  {tocItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleTocClick(item.id)}
                      className={cn(
                        "block w-full text-left text-sm py-1.5 transition-all relative -ml-[1px] border-l-2",
                        activeId === item.id
                          ? "text-brand-primary border-brand-primary font-medium"
                          : "text-mid-gray border-transparent hover:text-brand-dark"
                      )}
                      style={{ paddingLeft: `${16 + (item.level - 2) * 12}px` }}
                    >
                      {item.text}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>
          )}
        </div>
      </div>
    </article>
  );
}
