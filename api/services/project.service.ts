import { apiGet, type PaginatedResponse } from "@/api/ServiceHelper"
import type { Project } from "@/api/types/project.types"

export function getProjects(): Promise<PaginatedResponse<Project>> {
  return apiGet<PaginatedResponse<Project>>("/projects/")
}

export async function getProjectBySlugSafe(slug: string): Promise<Project | null> {
  try {
    return await apiGet<Project>(`/projects/${slug}/`)
  } catch (err) {
    console.error("Failed to fetch project:", err)
    return null
  }
}

export const ProjectPublic = { list: getProjects }

export async function getProjectsListSafe(): Promise<Project[]> {
  try {
    const res = await getProjects();
    return res.results ?? [];
  } catch (err) {
    console.error("Failed to fetch projects:", err);
    return [];
  }
}

export async function getProjectsByCategorySafe(categorySlug: string): Promise<Project[]> {
  try {
    const res = await apiGet<PaginatedResponse<Project>>(`/projects/?category=${categorySlug}`);
    return res.results ?? [];
  } catch (err) {
    console.error("Failed to fetch projects by category:", err);
    return [];
  }
}
