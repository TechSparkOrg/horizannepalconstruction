import { api, type PaginatedResponse } from "@/api/ServiceHelper"
import type { Project } from "@/api/types/project.types"

export async function getProjectBySlugSafe(slug: string): Promise<Project | null> {
  try {
    return await api.get<Project>(`/projects/${slug}/`)
  } catch (err) {
    console.error("Failed to fetch project:", err)
    return null
  }
}

export async function getProjectsListSafe(): Promise<Project[]> {
  try {
    const res = await api.get<PaginatedResponse<Project>>("/projects/");
    return res.results ?? [];
  } catch (err) {
    console.error("Failed to fetch projects:", err);
    return [];
  }
}

export async function getProjectsByCategorySafe(categorySlug: string): Promise<Project[]> {
  try {
    const res = await api.get<PaginatedResponse<Project>>(`/projects/?category=${categorySlug}`);
    return res.results ?? [];
  } catch (err) {
    console.error("Failed to fetch projects by category:", err);
    return [];
  }
}

export const ProjectPublic = { list: getProjectsListSafe }
