import { api, type PaginatedResponse } from "@/api/ServiceHelper"
import type { TeamMember } from "@/api/types/team.types"

export async function getTeamSafe(): Promise<PaginatedResponse<TeamMember>> {
  try {
    return await api.get<PaginatedResponse<TeamMember>>("/team")
  } catch (err) {
    console.error("Failed to fetch team:", err)
    return { results: [], count: 0, next: null, previous: null }
  }
}
