"use client";

import { useEffect } from "react";
import { useAdminStore } from "@/stores/admin-store";
import { BlogAdmin } from "@/api/services/blog.service";
import { CategoryAdmin } from "@/api/services/category.service";
import { FaqAdmin } from "@/api/services/faq.service";
import { MediaService } from "@/api/services/media.service";
import { Model3dAdmin } from "@/api/services/model3d.service";
import { PageAdmin } from "@/api/services/page.service";
import { ProjectAdmin } from "@/api/services/project.service";
import { ReviewAdmin } from "@/api/services/review.service";
import { TeamAdmin } from "@/api/services/team.service";
import { CalculatorAdmin } from "@/api/services/calculator.service";
import type { AdminBlogPost, AdminCategory, FaqItem, MediaItem, ModelItem, AdminPagePolicy, AdminProject, Review, TeamMember, CalcMaterial } from "@/stores/admin-types";
import type { BlogPost } from "@/api/types/blog.types";
import type { Category } from "@/api/types/category.types";
import type { FaqItem as ApiFaqItem } from "@/api/types/faq.types";
import type { MediaItem as ApiMediaItem } from "@/api/types/media.types";
import type { ModelItem as ApiModelItem } from "@/api/types/model3d.types";
import type { Page } from "@/api/types/page.types";
import type { Project } from "@/api/types/project.types";
import type { Review as ApiReview } from "@/api/types/review.types";
import type { TeamMember as ApiTeamMember } from "@/api/types/team.types";
import type { CalcMaterial as ApiCalcMaterial } from "@/api/types/calculator.types";

function mapBlogPost(p: BlogPost): AdminBlogPost {
  return { ...p, titleNp: p.title_np ?? "", excerptNp: p.excerpt_np ?? "", contentNp: p.content_np ?? [], categoryId: p.category_id, projectId: p.project_id, authorRole: p.author_role, authorImage: p.author_image };
}

function mapCategory(c: Category): AdminCategory {
  return { id: c.id, name: c.name, nameNp: c.name_np ?? "", slug: c.slug, iconName: c.icon_name ?? "", parentId: c.parent_id, services: c.services ?? [] };
}

function mapFaqItem(f: ApiFaqItem): FaqItem {
  return { id: f.id, categoryId: f.category_id, questionEn: f.question.en, answerEn: f.answer.en, questionNp: f.question.np, answerNp: f.answer.np, order: f.order };
}

function mapMediaItem(m: ApiMediaItem): MediaItem {
  return {
    id: m.id, url: m.url ?? "", alt: m.alt ?? "", metaTitle: m.meta_title ?? "",
    description: m.description ?? "", keywords: m.keywords ?? "", projectLink: m.project_link ?? "",
    banner: m.banner ?? false, groupTitle: m.group_title ?? "", customFields: m.custom_fields ?? [],
  };
}

function mapModelItem(m: ApiModelItem): ModelItem {
  return { id: m.id, url: m.url ?? "", title: m.title ?? "", slug: m.slug ?? "", description: m.description ?? "", metaTitle: m.meta_title ?? "", metaDescription: m.meta_description ?? "", keywords: m.keywords ?? "", projectId: m.project_id ?? "" };
}

function mapPage(p: Page): AdminPagePolicy {
  return { id: p.id, title: p.title, titleNp: p.title_np ?? "", slug: p.slug, content: p.content ?? "", contentNp: p.content_np ?? "", iconName: p.icon_name ?? "", metaTitle: p.meta_title ?? "", metaTitleNp: p.meta_title_np ?? "", metaDescription: p.meta_description ?? "", metaDescriptionNp: p.meta_description_np ?? "", createdAt: p.created_at ?? "" };
}

function mapProject(p: Project): AdminProject {
  return {
    id: p.id, title: p.title, slug: p.slug, categoryId: p.category_id ?? "", file: p.file ?? "",
    location: p.location ?? "", startDate: p.start_date ?? "", completion: p.completion ?? "",
    thumbnail: p.thumbnail ?? "", images: p.images ?? [], description: p.description ?? "",
    materials: p.materials ?? [], costEstimation: p.cost_estimation ?? [],
    specs: p.specs ?? [], gallery: p.gallery ?? [], socialLinks: p.social_links ?? [],
  };
}

function mapReview(r: ApiReview): Review {
  return { id: r.id, name: r.name, initials: r.initials ?? "", role: r.role ?? "", quote: r.quote, rating: r.rating };
}

function mapTeamMember(t: ApiTeamMember): TeamMember {
  return { id: t.id, name: t.name, initials: t.initials ?? "", role: t.role ?? "", specialisation: t.specialisation ?? "", experience: t.experience ?? "", email: t.email ?? "", linkedin: t.linkedin ?? "" };
}

function mapCalcMaterial(m: ApiCalcMaterial): CalcMaterial {
  return { id: m.id, name: m.name, parentName: m.parent_name ?? "", buildingType: m.building_type ?? "", unitPrice: m.unit_price, unitsPerSqft: m.units_per_sqft, size: m.size ?? "", custom: m.custom ?? [] };
}

export function AdminStoreHydrator() {
  const hydrated = useAdminStore((s) => s.hydrated);
  const {
    setBlogPosts, setCategories, setFaqItems, setMediaItems,
    setModelItems, setPages, setProjects, setReviews, setTeamMembers,
    setCalcMaterials, setHydrated,
  } = useAdminStore();

  useEffect(() => {
    if (hydrated) return;
    Promise.allSettled([
      BlogAdmin.list().then((r) => setBlogPosts((r.results ?? []).map(mapBlogPost))),
      CategoryAdmin.list().then((r) => setCategories((r.results ?? []).map(mapCategory))),
      FaqAdmin.list().then((r) => setFaqItems((r.results ?? []).map(mapFaqItem))),
      MediaService.list().then((r) => setMediaItems((r.results ?? []).map(mapMediaItem))),
      Model3dAdmin.list().then((r) => setModelItems((r.results ?? []).map(mapModelItem))),
      PageAdmin.list().then((r) => setPages((r.results ?? []).map(mapPage))),
      ProjectAdmin.list().then((r) => setProjects((r.results ?? []).map(mapProject))),
      ReviewAdmin.list().then((r) => setReviews((r.results ?? []).map(mapReview))),
      TeamAdmin.list().then((r) => setTeamMembers((r.results ?? []).map(mapTeamMember))),
      CalculatorAdmin.listMaterials().then((r) => setCalcMaterials((r.results ?? []).map(mapCalcMaterial))),
    ]).finally(() => setHydrated());
  }, [
    hydrated, setHydrated,
    setBlogPosts, setCategories, setFaqItems, setMediaItems,
    setModelItems, setPages, setProjects, setReviews, setTeamMembers,
    setCalcMaterials,
  ]);

  return null;
}
