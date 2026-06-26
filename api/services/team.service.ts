import { apiGet, type PaginatedResponse } from "@/api/ServiceHelper"
import type { TeamMember } from "@/api/types/team.types"

export function getTeam(): Promise<PaginatedResponse<TeamMember>> {
  return apiGet<PaginatedResponse<TeamMember>>("/team/")
}

export const TeamPublic = { list: getTeam }
