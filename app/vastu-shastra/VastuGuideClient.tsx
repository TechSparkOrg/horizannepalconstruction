"use client";

import { useState, useEffect } from "react";
import { getVastuItem } from "@/api/services/vastu.service";
import type { VastuItemDetail, VastuNavItem } from "@/api/types/vastu.types";
import { VastuSectionNav } from "./VastuSectionNav";
import { VastuSectionContent } from "./VastuSectionContent";

interface Props {
  sectionKeys: VastuNavItem[];
}

export function VastuGuideClient({ sectionKeys }: Props) {
  const [activeSection, setActiveSection] = useState(sectionKeys[0]?.slug || "");
  const [sectionItem, setSectionItem] = useState<VastuItemDetail | null>(null);
  const [sectionLoading, setSectionLoading] = useState(false);

  useEffect(() => {
    if (!activeSection) return;
    setSectionLoading(true);
    getVastuItem(activeSection)
      .then(setSectionItem)
      .catch(() => setSectionItem(null))
      .finally(() => setSectionLoading(false));
  }, [activeSection]);

  const slugs = sectionKeys.map((s) => s.slug);
  const sections = Object.fromEntries(sectionKeys.map((s) => [s.slug, s]));

  return (
    <div className="w-full mx-auto max-w-6xl">
      <div className="flex lg:hidden mb-6">
        <VastuSectionNav sectionKeys={slugs} sections={sections} activeSection={activeSection} onSelect={setActiveSection} />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
        <div className="hidden lg:block w-[240px] shrink-0 sticky top-24">
          <VastuSectionNav sectionKeys={slugs} sections={sections} activeSection={activeSection} onSelect={setActiveSection} />
        </div>
        <div className="flex-1 min-w-0">
          <VastuSectionContent item={sectionItem} loading={sectionLoading} />
        </div>
      </div>
    </div>
  );
}
