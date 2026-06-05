import type {
  AdminProject,
  AdminCategory,
  FaqItem,
  MediaItem,
  AdminBlogPost,
  ModelItem,
  CalcMaterial,
  AdminPagePolicy,
  TeamMember,
  Review,
} from "./admin-types";

export interface ListSlice {
  projects: AdminProject[];
  categories: AdminCategory[];
  faqItems: FaqItem[];
  mediaItems: MediaItem[];
  blogPosts: AdminBlogPost[];
  modelItems: ModelItem[];
  calcMaterials: CalcMaterial[];
  pages: AdminPagePolicy[];
  teamMembers: TeamMember[];
  reviews: Review[];
  calcBuildingTypes: string[];
  hydrated: boolean;
  setHydrated: () => void;
  setProjects: (items: AdminProject[]) => void;
  addProject: (p: AdminProject) => void;
  updateProject: (id: string, p: Partial<AdminProject>) => void;
  deleteProject: (id: string) => void;
  setCategories: (items: AdminCategory[]) => void;
  addCategory: (c: AdminCategory) => void;
  updateCategory: (id: string, c: Partial<AdminCategory>) => void;
  deleteCategory: (id: string) => void;
  setFaqItems: (items: FaqItem[]) => void;
  addFaqItem: (f: FaqItem) => void;
  updateFaqItem: (id: string, f: Partial<FaqItem>) => void;
  deleteFaqItem: (id: string) => void;
  setMediaItems: (items: MediaItem[]) => void;
  addMediaItem: (m: MediaItem) => void;
  updateMediaItem: (id: string, m: Partial<MediaItem>) => void;
  deleteMediaItem: (id: string) => void;
  setBlogPosts: (items: AdminBlogPost[]) => void;
  addBlogPost: (b: AdminBlogPost) => void;
  updateBlogPost: (id: string, b: Partial<AdminBlogPost>) => void;
  deleteBlogPost: (id: string) => void;
  setModelItems: (items: ModelItem[]) => void;
  addModelItem: (m: ModelItem) => void;
  updateModelItem: (id: string, m: Partial<ModelItem>) => void;
  deleteModelItem: (id: string) => void;
  setCalcMaterials: (items: CalcMaterial[]) => void;
  addCalcMaterial: (m: CalcMaterial) => void;
  updateCalcMaterial: (id: string, m: Partial<CalcMaterial>) => void;
  deleteCalcMaterial: (id: string) => void;
  setPages: (items: AdminPagePolicy[]) => void;
  addPage: (p: AdminPagePolicy) => void;
  updatePage: (id: string, p: Partial<AdminPagePolicy>) => void;
  deletePage: (id: string) => void;
  setTeamMembers: (items: TeamMember[]) => void;
  addTeamMember: (m: TeamMember) => void;
  updateTeamMember: (id: string, m: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;
  setReviews: (items: Review[]) => void;
  addReview: (r: Review) => void;
  updateReview: (id: string, r: Partial<Review>) => void;
  deleteReview: (id: string) => void;
  addCalcBuildingType: (name: string) => void;
  removeCalcBuildingType: (name: string) => void;
}

export const initialListState = {
  projects: [],
  categories: [],
  faqItems: [],
  mediaItems: [],
  blogPosts: [],
  modelItems: [],
  calcMaterials: [],
  pages: [],
  teamMembers: [],
  reviews: [],
  calcBuildingTypes: ["Residential", "Commercial", "Industrial"],
  hydrated: false,
};

export const createListSlice = (set: any): ListSlice => ({
  ...initialListState,
  setHydrated: () => set({ hydrated: true }),
  setProjects: (items) => set({ projects: items }),
  addProject: (p) => set((s: any) => ({ projects: [...s.projects, p] })),
  updateProject: (id, p) => set((s: any) => ({ projects: s.projects.map((x: any) => (x.id === id ? { ...x, ...p } : x)) })),
  deleteProject: (id) => set((s: any) => ({ projects: s.projects.filter((x: any) => x.id !== id) })),
  setCategories: (items) => set({ categories: items }),
  addCategory: (c) => set((s: any) => ({ categories: [...s.categories, c] })),
  updateCategory: (id, c) => set((s: any) => ({ categories: s.categories.map((x: any) => (x.id === id ? { ...x, ...c } : x)) })),
  deleteCategory: (id) => set((s: any) => ({ categories: s.categories.filter((x: any) => x.id !== id && x.parentId !== id) })),
  setFaqItems: (items) => set({ faqItems: items }),
  addFaqItem: (f) => set((s: any) => ({ faqItems: [...s.faqItems, f] })),
  updateFaqItem: (id, f) => set((s: any) => ({ faqItems: s.faqItems.map((x: any) => (x.id === id ? { ...x, ...f } : x)) })),
  deleteFaqItem: (id) => set((s: any) => ({ faqItems: s.faqItems.filter((x: any) => x.id !== id) })),
  setMediaItems: (items) => set({ mediaItems: items }),
  addMediaItem: (m) => set((s: any) => ({ mediaItems: [...s.mediaItems, m] })),
  updateMediaItem: (id, m) => set((s: any) => ({ mediaItems: s.mediaItems.map((x: any) => (x.id === id ? { ...x, ...m } : x)) })),
  deleteMediaItem: (id) => set((s: any) => ({ mediaItems: s.mediaItems.filter((x: any) => x.id !== id) })),
  setBlogPosts: (items) => set({ blogPosts: items }),
  addBlogPost: (b) => set((s: any) => ({ blogPosts: [...s.blogPosts, b] })),
  updateBlogPost: (id, b) => set((s: any) => ({ blogPosts: s.blogPosts.map((x: any) => (x.id === id ? { ...x, ...b } : x)) })),
  deleteBlogPost: (id) => set((s: any) => ({ blogPosts: s.blogPosts.filter((x: any) => x.id !== id) })),
  setModelItems: (items) => set({ modelItems: items }),
  addModelItem: (m) => set((s: any) => ({ modelItems: [...s.modelItems, m] })),
  updateModelItem: (id, m) => set((s: any) => ({ modelItems: s.modelItems.map((x: any) => (x.id === id ? { ...x, ...m } : x)) })),
  deleteModelItem: (id) => set((s: any) => ({ modelItems: s.modelItems.filter((x: any) => x.id !== id) })),
  setCalcMaterials: (items) => set({ calcMaterials: items }),
  addCalcMaterial: (m) => set((s: any) => ({ calcMaterials: [...s.calcMaterials, m] })),
  updateCalcMaterial: (id, m) => set((s: any) => ({ calcMaterials: s.calcMaterials.map((x: any) => (x.id === id ? { ...x, ...m } : x)) })),
  deleteCalcMaterial: (id) => set((s: any) => ({ calcMaterials: s.calcMaterials.filter((x: any) => x.id !== id) })),
  setPages: (items) => set({ pages: items }),
  addPage: (p) => set((s: any) => ({ pages: [...s.pages, p] })),
  updatePage: (id, p) => set((s: any) => ({ pages: s.pages.map((x: any) => (x.id === id ? { ...x, ...p } : x)) })),
  deletePage: (id) => set((s: any) => ({ pages: s.pages.filter((x: any) => x.id !== id) })),
  setTeamMembers: (items) => set({ teamMembers: items }),
  addTeamMember: (m) => set((s: any) => ({ teamMembers: [...s.teamMembers, m] })),
  updateTeamMember: (id, m) => set((s: any) => ({ teamMembers: s.teamMembers.map((x: any) => (x.id === id ? { ...x, ...m } : x)) })),
  deleteTeamMember: (id) => set((s: any) => ({ teamMembers: s.teamMembers.filter((x: any) => x.id !== id) })),
  setReviews: (items) => set({ reviews: items }),
  addReview: (r) => set((s: any) => ({ reviews: [...s.reviews, r] })),
  updateReview: (id, r) => set((s: any) => ({ reviews: s.reviews.map((x: any) => (x.id === id ? { ...x, ...r } : x)) })),
  deleteReview: (id) => set((s: any) => ({ reviews: s.reviews.filter((x: any) => x.id !== id) })),
  addCalcBuildingType: (name) => set((s: any) => ({ calcBuildingTypes: [...s.calcBuildingTypes, name] })),
  removeCalcBuildingType: (name) =>
    set((s: any) => ({
      calcBuildingTypes: s.calcBuildingTypes.filter((t: string) => t !== name),
      calcMaterials: s.calcMaterials.filter((m: any) => m.buildingType !== name),
    })),
});
