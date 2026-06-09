import { create } from "zustand";
import { BlogService } from "@/api/services/blog.service";
import { ProjectService } from "@/api/services/project.service";
import { CategoryService } from "@/api/services/category.service";
import { FaqService } from "@/api/services/faq.service";
import { TeamService } from "@/api/services/team.service";
import { ReviewService } from "@/api/services/review.service";
import { SettingsService } from "@/api/services/settings.service";
import { VastuService } from "@/api/services/vastu.service";
import { BuildingPermitService } from "@/api/services/building-permit.service";
import { Model3dService } from "@/api/services/model3d.service";
import type { BlogPost } from "@/api/types/blog.types";
import type { Project } from "@/api/types/project.types";
import type { Category } from "@/api/types/category.types";
import type { FaqItem } from "@/api/types/faq.types";
import type { TeamMember } from "@/api/types/team.types";
import type { Review } from "@/api/types/review.types";
import type { SiteSettings } from "@/api/types/settings.types";
import type { VastuConfig } from "@/stores/admin-types";
import type { BuildingPermitConfig } from "@/api/types/building-permit.types";
import type { ModelItem } from "@/api/types/model3d.types";

export interface ClientStore {
  blogs: BlogPost[];
  blogDetail: BlogPost | null;
  blogsLoading: boolean;
  projects: Project[];
  projectDetail: Project | null;
  projectsLoading: boolean;
  categories: Category[];
  categoriesLoading: boolean;
  faqItems: FaqItem[];
  faqsLoading: boolean;
  teamMembers: TeamMember[];
  teamLoading: boolean;
  reviews: Review[];
  reviewsLoading: boolean;
  settings: SiteSettings | null;
  settingsLoading: boolean;
  vastuConfig: VastuConfig | null;
  vastuLoading: boolean;
  buildingPermitConfig: BuildingPermitConfig | null;
  buildingPermitLoading: boolean;
  modelItems: ModelItem[];
  modelsLoading: boolean;
  fetchBlogs: () => Promise<void>;
  fetchBlogBySlug: (slug: string) => Promise<void>;
  fetchProjects: () => Promise<void>;
  fetchProjectBySlug: (slug: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchFaqs: () => Promise<void>;
  fetchTeam: () => Promise<void>;
  fetchReviews: () => Promise<void>;
  fetchSettings: () => Promise<void>;
  fetchVastuConfig: () => Promise<void>;
  fetchBuildingPermitConfig: () => Promise<void>;
  fetchModels: () => Promise<void>;
}

export const useClientStore = create<ClientStore>()((set) => ({
  blogs: [],
  blogDetail: null,
  blogsLoading: false,
  projects: [],
  projectDetail: null,
  projectsLoading: false,
  categories: [],
  categoriesLoading: false,
  faqItems: [],
  faqsLoading: false,
  teamMembers: [],
  teamLoading: false,
  reviews: [],
  reviewsLoading: false,
  settings: null,
  settingsLoading: false,
  vastuConfig: null,
  vastuLoading: false,
  buildingPermitConfig: null,
  buildingPermitLoading: false,
  modelItems: [],
  modelsLoading: false,

  fetchBlogs: async () => {
    set({ blogsLoading: true });
    try {
      const res = await BlogService.list();
      set({ blogs: res.results ?? [], blogsLoading: false });
    } catch {
      set({ blogsLoading: false });
    }
  },

  fetchBlogBySlug: async (slug: string) => {
    set({ blogDetail: null, blogsLoading: true });
    try {
      const post = await BlogService.getBySlug(slug);
      set({ blogDetail: post, blogsLoading: false });
    } catch {
      set({ blogsLoading: false });
    }
  },

  fetchProjects: async () => {
    set({ projectsLoading: true });
    try {
      const res = await ProjectService.list();
      set({ projects: res.results ?? [], projectsLoading: false });
    } catch {
      set({ projectsLoading: false });
    }
  },

  fetchProjectBySlug: async (slug: string) => {
    set({ projectDetail: null, projectsLoading: true });
    try {
      const project = await ProjectService.getBySlug(slug);
      set({ projectDetail: project, projectsLoading: false });
    } catch {
      set({ projectsLoading: false });
    }
  },

  fetchCategories: async () => {
    set({ categoriesLoading: true });
    try {
      const res = await CategoryService.list();
      set({ categories: res.results ?? [], categoriesLoading: false });
    } catch {
      set({ categoriesLoading: false });
    }
  },

  fetchFaqs: async () => {
    set({ faqsLoading: true });
    try {
      const res = await FaqService.list();
      set({ faqItems: res.results ?? [], faqsLoading: false });
    } catch {
      set({ faqsLoading: false });
    }
  },

  fetchTeam: async () => {
    set({ teamLoading: true });
    try {
      const res = await TeamService.list();
      set({ teamMembers: res.results ?? [], teamLoading: false });
    } catch {
      set({ teamLoading: false });
    }
  },

  fetchReviews: async () => {
    set({ reviewsLoading: true });
    try {
      const res = await ReviewService.list();
      set({ reviews: res.results ?? [], reviewsLoading: false });
    } catch {
      set({ reviewsLoading: false });
    }
  },

  fetchSettings: async () => {
    set({ settingsLoading: true });
    try {
      const settings = await SettingsService.get();
      set({ settings, settingsLoading: false });
    } catch {
      set({ settingsLoading: false });
    }
  },

  fetchVastuConfig: async () => {
    set({ vastuLoading: true });
    try {
      const config = await VastuService.getPublic();
      set({ vastuConfig: config, vastuLoading: false });
    } catch {
      set({ vastuLoading: false });
    }
  },

  fetchBuildingPermitConfig: async () => {
    set({ buildingPermitLoading: true });
    try {
      const config = await BuildingPermitService.get();
      set({ buildingPermitConfig: config, buildingPermitLoading: false });
    } catch {
      set({ buildingPermitLoading: false });
    }
  },

  fetchModels: async () => {
    set({ modelsLoading: true });
    try {
      const res = await Model3dService.publicList();
      set({ modelItems: res.results ?? [], modelsLoading: false });
    } catch {
      set({ modelsLoading: false });
    }
  },
}));
