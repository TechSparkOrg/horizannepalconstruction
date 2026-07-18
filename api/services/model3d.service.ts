import { apiGet, type PaginatedResponse } from "@/api/ServiceHelper"
import type { DesignModel, Model3D } from "@/api/types/model3d.types"

export async function getModelsSafe(): Promise<PaginatedResponse<Model3D>> {
  try {
    return await apiGet<PaginatedResponse<Model3D>>("/models/")
  } catch (err) {
    console.error("Failed to fetch 3D models:", err)
    return { results: [], count: 0, next: null, previous: null }
  }
}

export async function getModelBySlugSafe(slug: string): Promise<Model3D | null> {
  try {
    return await apiGet<Model3D>(`/models/${slug}/`)
  } catch (err) {
    console.error("Failed to fetch 3D model:", err)
    return null
  }
}

export async function getDesignModelsSafe(): Promise<{ results: DesignModel[] }> {
  try {
    return await apiGet<{ results: DesignModel[] }>("/models/designs/")
  } catch (err) {
    console.error("Failed to fetch design models:", err)
    return { results: [] }
  }
}

export const Model3dPublic = { list: getModelsSafe }
