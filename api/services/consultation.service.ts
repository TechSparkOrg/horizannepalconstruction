import { apiPost } from "@/api/ServiceHelper"
import type { ConsultationData, ConsultationResponse } from "@/api/types/consultation.types"

export function submitConsultation(data: ConsultationData): Promise<ConsultationResponse> {
  return apiPost<ConsultationResponse>("/consultation/", data)
}

export const ConsultationPublic = { submit: submitConsultation }
