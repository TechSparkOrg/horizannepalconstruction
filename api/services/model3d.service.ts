import { api } from "@/api/ServiceHelper"
import type { DesignModel, Model3D } from "@/api/types/model3d.types"

export interface ModelListResponse {
  results: Model3D[]
}

export async function getModelsSafe(): Promise<ModelListResponse> {
  try {
    return await api.get<ModelListResponse>("/models/")
  } catch (err) {
    console.error("Failed to fetch 3D models:", err)
    return { results: [] }
  }
}

export async function getModelBySlugSafe(slug: string): Promise<Model3D | null> {
  try {
    return await api.get<Model3D>(`/models/${slug}/`)
  } catch (err) {
    console.error("Failed to fetch 3D model:", err)
    return null
  }
}

export async function getDesignModelsSafe(): Promise<{ results: DesignModel[] }> {
  try {
    return await api.get<{ results: DesignModel[] }>("/models/designs/")
  } catch (err) {
    console.error("Failed to fetch design models:", err)
    return { results: [] }
  }
}

export const Model3dPublic = { list: getModelsSafe }
