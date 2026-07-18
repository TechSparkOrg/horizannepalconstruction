import { apiPost, apiPostFormData } from "@/api/ServiceHelper"
import type { ConsultationData, ConsultationResponse } from "@/api/types/consultation.types"

export const ConsultationPublic = {
  submit: (data: ConsultationData, photos?: File[]): Promise<ConsultationResponse> => {
    if (photos && photos.length > 0) {
      const fd = new FormData();
      Object.entries(data).forEach(([key, val]) => {
        if (val !== undefined && val !== null && key !== 'site_photos') fd.append(key, val);
      });
      photos.forEach((file) => fd.append("site_photos", file));
      return apiPostFormData<ConsultationResponse>("/consultation/", fd);
    }
    return apiPost<ConsultationResponse>("/consultation/", data);
  },
}
