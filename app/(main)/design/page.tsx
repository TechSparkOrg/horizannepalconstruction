import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { DesignHero } from "@/components/sections/DesignHero";
import { DesignServices } from "@/components/sections/DesignServices";
import { getProjects } from "@/api/cached/project";
import { getModels } from "@/api/cached/model3d";
import { getCategories } from "@/api/cached/category";
import { LdJson } from "@/components/JsonLd";

const Design3DShowcase = dynamic(() => import("@/components/sections/Design3DShowcase").then(m => ({ default: m.Design3DShowcase })));
const ConsultationForm = dynamic(() => import("@/components/ConsultationForm").then(m => ({ default: m.ConsultationForm })));

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://horizonnepalconstruction.com").replace(/\/+$/, "");

export const metadata: Metadata = {
  title: "Design | Horizan Nepal",
  description:
    "Explore Horizan Nepal's architectural design services — from conceptual 2D floor plans to stunning 3D visualizations. Turn your vision into reality.",
  openGraph: {
    title: "Design | Horizan Nepal",
    description:
      "Explore Horizan Nepal's architectural design services — 2D plans and 3D visualizations.",
    type: "website",
    url: `${siteUrl}/design`,
  },
  alternates: { canonical: `${siteUrl}/design` },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Design", item: `${siteUrl}/design` },
  ],
};

function modelSrc(file: string) {
  if (!file) return "";
  if (file.startsWith("/") || file.startsWith("http")) return file;
  return `/glb/${file}`;
}

export default async function DesignPage() {
  const [projectsRes, modelsRes, categoriesRes] = await Promise.allSettled([
    getProjects(),
    getModels(),
    getCategories(),
  ]);
  const categories = categoriesRes.status === "fulfilled" ? categoriesRes.value.results ?? [] : [];

  let modelCards: { key: string; src: string; title: string; subtitle: string; href?: string }[];
  if (projectsRes.status === "fulfilled" || modelsRes.status === "fulfilled") {
    const cards: { key: string; src: string; title: string; subtitle: string; href?: string }[] = [];
    if (projectsRes.status === "fulfilled") {
      for (const p of projectsRes.value.results ?? []) {
        if (!p.file) continue;
        cards.push({
          key: `project-${p.slug}`,
          src: modelSrc(p.file),
          title: p.title,
          subtitle: p.location,
          href: `/project-details/${p.slug}`,
        });
      }
    }
    if (modelsRes.status === "fulfilled") {
      const knownSlugs = new Set(cards.map((c) => c.key));
      for (const m of modelsRes.value.results ?? []) {
        if (!m.url) continue;
        const key = `model-${m.slug || m.id}`;
        if (knownSlugs.has(key)) continue;
        cards.push({
          key,
          src: m.url,
          title: m.title || "3D Model",
          subtitle: m.description || "",
          href: m.slug ? `/models/${m.slug}` : undefined,
        });
      }
    }
    modelCards = cards;
  }
  modelCards ??= [];

  return (
    <>
      <LdJson data={breadcrumb} />
      <DesignHero />
      <DesignServices />
      <Design3DShowcase initialItems={modelCards} />
      <ConsultationForm initialCategories={categories} />
    </>
  );
}
