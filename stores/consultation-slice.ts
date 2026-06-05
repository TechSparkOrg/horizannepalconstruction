import type { ConsultationFormSettings, ConsultationSubmission } from "./admin-types";

export interface ConsultationSlice {
  consultationForm: ConsultationFormSettings;
  submissions: ConsultationSubmission[];
  updateConsultationForm: (patch: Partial<ConsultationFormSettings>) => void;
  addSubmission: (s: ConsultationSubmission) => void;
  deleteSubmission: (id: string) => void;
}

const defaultConsultationForm: ConsultationFormSettings = {
  sectionLabel: "Get in Touch",
  heading: "Let's Discuss Your Project",
  description: "Tell us about your vision, and we'll get back to you within 24 hours for a free consultation.",
  formTitle: "Send Us a Message",
  serviceOptions: [
    "Architectural Design",
    "Engineering & Structure",
    "Construction Management",
    "Interior Design",
    "Material Consultation",
    "Other",
  ],
  privacyText: "We respect your privacy. Your information is safe with us.",
  successHeading: "Thank You!",
  successMessage: "We'll reach out within 24 hours to schedule your free consultation.",
};

export const initialConsultationState = {
  consultationForm: defaultConsultationForm,
  submissions: [],
};

export const createConsultationSlice = (set: any): ConsultationSlice => ({
  ...initialConsultationState,
  updateConsultationForm: (patch) => set((s: any) => ({ consultationForm: { ...s.consultationForm, ...patch } })),
  addSubmission: (s) => set((state: any) => ({ submissions: [...state.submissions, s] })),
  deleteSubmission: (id) => set((state: any) => ({ submissions: state.submissions.filter((sub: any) => sub.id !== id) })),
});
