import { create } from "zustand";
import {
  createAuthSlice,
  initialAuthState,
  type AuthSlice,
} from "./auth-slice";
import {
  createListSlice,
  initialListState,
  type ListSlice,
} from "./list-slice";
import {
  createConfigSlice,
  initialConfigState,
  type ConfigSlice,
} from "./config-slice";
import {
  createConsultationSlice,
  initialConsultationState,
  type ConsultationSlice,
} from "./consultation-slice";

type AdminStore = AuthSlice & ListSlice & ConfigSlice & ConsultationSlice;

const initialAdminState = {
  ...initialAuthState,
  ...initialListState,
  ...initialConfigState,
  ...initialConsultationState,
};

export const useAdminStore = create<AdminStore>()((set, get, api) => ({
  ...initialAdminState,
  ...createAuthSlice(set),
  ...createListSlice(set),
  ...createConfigSlice(set),
  ...createConsultationSlice(set),
  logout: () => {
    set(initialAdminState);
  },
}));

export type {
  AdminProject,
  AdminCategory,
  SubService,
  FaqItem,
  MediaItem,
  BlogContentBlock,
  ModelItem,
  AdminBlogPost,
  CalcMaterial,
  AdminPagePolicy,
  TeamMember,
  Review,
  ConsultationFormSettings,
  ConsultationSubmission,
  BPText,
  BPStep,
  BPDocCategory,
  BPRegulation,
  BPMunicipality,
  BuildingPermitConfig,
  VastuBilingualText,
  VastuCustomTopic,
  VastuSectionData,
  VastuRoomData,
  VastuDirectionData,
  VastuConfig,
} from "./admin-types";
