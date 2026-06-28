export interface ConsultationData {
  name: string
  email?: string
  phone: string
  message?: string
  category?: string
  service?: string
  description?: string
  preferred_date?: string
  landmark?: string
}

export interface ConsultationResponse {
  id: string
  message: string
}
