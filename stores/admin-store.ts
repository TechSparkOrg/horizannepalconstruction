import { create } from "zustand";
import { persist } from "zustand/middleware";
import { defaultVastuConfig } from "./vastu-defaults";
import { defaultPermitConfig } from "./permit-defaults";
import { defaultReviews } from "./review-defaults";
import type { AdminAuthState } from "@/api/types/auth.types";

export interface SiteSettings {
  socialLinks: { platform: string; url: string; label: string }[];
  contactInfo: { phone: string; email: string; address: string; mapEmbed: string };
  seo: { title: string; description: string; keywords: string };
  scripts: { head: string; body: string };
}

export interface SubService {
  name: string;
  description: string;
}

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  services: SubService[];
}

export interface AdminProject {
  id: string;
  title: string;
  slug: string;
  categoryId: string;
  file: string;
  location: string;
  startDate: string;
  completion: string;
  thumbnail: string;
  images: string[];
  description: string;
  materials: { name: string; desc: string }[];
  costEstimation: { item: string; amount: string }[];
  specs: { label: string; value: string }[];
  gallery: string[];
  socialLinks: { platform: string; url: string }[];
}

export interface FaqItem {
  id: string;
  categoryId: string;
  questionEn: string;
  answerEn: string;
  questionNp: string;
  answerNp: string;
  order: number;
}

export interface MediaItem {
  id: string;
  url: string;
  alt: string;
  metaTitle: string;
  description: string;
  keywords: string;
  projectLink: string;
  banner: boolean;
  groupTitle: string;
  customFields: { key: string; value: string }[];
}

export interface BlogContentBlock {
  type: "heading" | "paragraph" | "image" | "quote" | "list" | "subheading";
  value?: string;
  items?: string[];
  caption?: string;
  src?: string;
}

export interface ModelItem {
  id: string;
  url: string;
  title: string;
  slug: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  projectId: string;
}

export interface AdminBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  categoryId: string;
  projectId: string;
  image: string;
  date: string;
  author: string;
  authorRole: string;
  authorImage: string;
  content: BlogContentBlock[];
}

export interface CalcMaterial {
  id: string;
  name: string;
  parentName: string;
  buildingType: string;
  unitPrice: number;
  unitsPerSqft: number;
  size: string;
  custom: { key: string; value: string }[];
}

export interface AdminPagePolicy {
  id: string;
  title: string;
  slug: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  createdAt: string;
}

// ─── Team Member ──────────────────────────────────────────────────────────────

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  role: string;
  specialisation: string;
  experience: string;
  email: string;
  linkedin: string;
}

// ─── Review ───────────────────────────────────────────────────────────────────

export interface Review {
  id: string;
  name: string;
  initials: string;
  role: string;
  quote: BPText;
  rating: number;
}

// ─── Consultation Form ────────────────────────────────────────────────────────

export interface ConsultationFormSettings {
  sectionLabel: string;
  heading: string;
  description: string;
  formTitle: string;
  serviceOptions: string[];
  privacyText: string;
  successHeading: string;
  successMessage: string;
}

export interface ConsultationSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  description: string;
  preferredDate: string;
  createdAt: string;
}

// ─── Building Permit Types ────────────────────────────────────────────────────

export interface BPText {
  en: string;
  np: string;
}

export interface BPStep {
  num: number;
  title: BPText;
  desc: BPText;
  duration: string;
  docs: string[];
}

export interface BPDocCategory {
  label: BPText;
  items: BPText[];
}

export interface BPRegulation {
  title: BPText;
  items: BPText[];
}

export interface BPMunicipality {
  name: string;
  district: string;
  phone: string;
}

export interface BuildingPermitConfig {
  workflowSteps: BPStep[];
  docCategories: BPDocCategory[];
  regulations: BPRegulation[];
  municipalities: BPMunicipality[];
}

// ─── Vastu Shastra Types ──────────────────────────────────────────────────────

export interface VastuBilingualText {
  en: string;
  np: string;
}

export interface VastuCustomTopic {
  title: string;
  titleNp: string;
  items: VastuBilingualText[];
}

export interface VastuSectionData {
  title: string;
  titleNp: string;
  content: VastuBilingualText[];
  customTopics: VastuCustomTopic[];
}

export interface VastuRoomData {
  idealDirection: VastuBilingualText;
  facingDirection: VastuBilingualText;
  tips: VastuBilingualText[];
  avoid: VastuBilingualText[];
}

export interface VastuDirectionData {
  deity: string;
  element: string;
  description: VastuBilingualText;
  recommended: VastuBilingualText[];
  avoid: VastuBilingualText[];
}

export interface VastuConfig {
  hero: {
    title: string;
    subtitle: string;
    bgImage: string;
    badge: string;
  };
  quickTools: {
    badge: string;
    title: string;
    description: string;
    roomToolTitle: string;
    roomToolDesc: string;
    directionToolTitle: string;
    directionToolDesc: string;
  };
  sectionIcons: Record<string, string>;
  sectionKeys: string[];
  sections: Record<string, VastuSectionData>;
  rooms: Record<string, VastuRoomData>;
  directions: Record<string, VastuDirectionData>;
  roomOptions: { id: string; label: string; labelNp: string }[];
  directionOptions: { id: string; label: string; subtitle: string }[];
}

type AdminState = AdminAuthState & {
  settings: SiteSettings;
  projects: AdminProject[];
  categories: AdminCategory[];
  faqItems: FaqItem[];
  mediaItems: MediaItem[];
  blogPosts: AdminBlogPost[];
  modelItems: ModelItem[];
  calcBuildingTypes: string[];
  calcMaterials: CalcMaterial[];
  pages: AdminPagePolicy[];
  vastuConfig: VastuConfig;
  teamMembers: TeamMember[];
  buildingPermitConfig: BuildingPermitConfig;
  reviews: Review[];
  consultationForm: ConsultationFormSettings;
  submissions: ConsultationSubmission[];
  updateVastuConfig: (patch: Partial<VastuConfig>) => void;
  updateBuildingPermitConfig: (patch: Partial<BuildingPermitConfig>) => void;
  addReview: (r: Review) => void;
  updateReview: (id: string, r: Partial<Review>) => void;
  deleteReview: (id: string) => void;
  updateConsultationForm: (patch: Partial<ConsultationFormSettings>) => void;
  addSubmission: (s: ConsultationSubmission) => void;
  deleteSubmission: (id: string) => void;
  addTeamMember: (m: TeamMember) => void;
  updateTeamMember: (id: string, m: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;
  logout: () => void;
  updateSettings: (s: Partial<SiteSettings>) => void;
  addProject: (p: AdminProject) => void;
  updateProject: (id: string, p: Partial<AdminProject>) => void;
  deleteProject: (id: string) => void;
  addCategory: (c: AdminCategory) => void;
  updateCategory: (id: string, c: Partial<AdminCategory>) => void;
  deleteCategory: (id: string) => void;
  addFaqItem: (f: FaqItem) => void;
  updateFaqItem: (id: string, f: Partial<FaqItem>) => void;
  deleteFaqItem: (id: string) => void;
  addMediaItem: (m: MediaItem) => void;
  updateMediaItem: (id: string, m: Partial<MediaItem>) => void;
  deleteMediaItem: (id: string) => void;
  addBlogPost: (b: AdminBlogPost) => void;
  updateBlogPost: (id: string, b: Partial<AdminBlogPost>) => void;
  deleteBlogPost: (id: string) => void;
  addModelItem: (m: ModelItem) => void;
  updateModelItem: (id: string, m: Partial<ModelItem>) => void;
  deleteModelItem: (id: string) => void;
  addCalcBuildingType: (name: string) => void;
  removeCalcBuildingType: (name: string) => void;
  addCalcMaterial: (m: CalcMaterial) => void;
  updateCalcMaterial: (id: string, m: Partial<CalcMaterial>) => void;
  deleteCalcMaterial: (id: string) => void;
  addPage: (p: AdminPagePolicy) => void;
  updatePage: (id: string, p: Partial<AdminPagePolicy>) => void;
  deletePage: (id: string) => void;
};

const defaultSettings: SiteSettings = {
  socialLinks: [
    { platform: "facebook", url: "https://facebook.com/horizonnepal", label: "Facebook" },
    { platform: "instagram", url: "https://instagram.com/horizonnepal", label: "Instagram" },
    { platform: "linkedin", url: "https://linkedin.com/company/horizonnepal", label: "LinkedIn" },
    { platform: "tiktok", url: "https://tiktok.com/@horizonnepal", label: "TikTok" },
    { platform: "youtube", url: "https://youtube.com/@horizonnepal", label: "YouTube" },
  ],
  contactInfo: {
    phone: "+977 1 441 1222",
    email: "hello@horizonnepal.com.np",
    address: "Tinkune, Kathmandu, Nepal",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.4!2d85.3!3d27.7",
  },
  seo: {
    title: "Horizan Nepal — Building Nepal's Tomorrow",
    description: "Horizan Nepal — Architecture, Engineering & Construction",
    keywords: "architecture, construction, nepal, building design, horizon nepal",
  },
  scripts: { head: "", body: "" },
};

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      settings: defaultSettings,
      projects: [],
      categories: [],
      faqItems: [],
      mediaItems: [],
      blogPosts: [],
      modelItems: [],
      calcBuildingTypes: ["Residential", "Commercial", "Industrial"],
      calcMaterials: [],
      pages: [],
      vastuConfig: defaultVastuConfig,
      teamMembers: [],
      buildingPermitConfig: defaultPermitConfig,
      reviews: defaultReviews,
      consultationForm: {
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
      },
      submissions: [],
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          settings: defaultSettings,
          projects: [],
          categories: [],
      faqItems: [],
      mediaItems: [],
      blogPosts: [],
      modelItems: [],
      calcBuildingTypes: ["Residential", "Commercial", "Industrial"],
      calcMaterials: [],
      pages: [],
      vastuConfig: defaultVastuConfig,
      teamMembers: [],
      buildingPermitConfig: defaultPermitConfig,
      reviews: [],
      consultationForm: {
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
      },
      submissions: [],
        });
      },
      updateSettings: (s) =>
        set((state) => ({ settings: { ...state.settings, ...s } })),
      addProject: (p) =>
        set((state) => ({ projects: [...state.projects, p] })),
      updateProject: (id, p) =>
        set((state) => ({
          projects: state.projects.map((proj) =>
            proj.id === id ? { ...proj, ...p } : proj
          ),
        })),
      deleteProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((proj) => proj.id !== id),
        })),
      addCategory: (c) =>
        set((state) => ({ categories: [...state.categories, c] })),
      updateCategory: (id, c) =>
        set((state) => ({
          categories: state.categories.map((cat) =>
            cat.id === id ? { ...cat, ...c } : cat
          ),
        })),
      deleteCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter(
            (cat) => cat.id !== id && cat.parentId !== id
          ),
        })),
      addFaqItem: (f) =>
        set((state) => ({ faqItems: [...state.faqItems, f] })),
      updateFaqItem: (id, f) =>
        set((state) => ({
          faqItems: state.faqItems.map((item) =>
            item.id === id ? { ...item, ...f } : item
          ),
        })),
      deleteFaqItem: (id) =>
        set((state) => ({
          faqItems: state.faqItems.filter((item) => item.id !== id),
        })),
      addMediaItem: (m) =>
        set((state) => ({ mediaItems: [...state.mediaItems, m] })),
      updateMediaItem: (id, m) =>
        set((state) => ({
          mediaItems: state.mediaItems.map((item) =>
            item.id === id ? { ...item, ...m } : item
          ),
        })),
      deleteMediaItem: (id) =>
        set((state) => ({
          mediaItems: state.mediaItems.filter((item) => item.id !== id),
        })),
      addBlogPost: (b) =>
        set((state) => ({ blogPosts: [...state.blogPosts, b] })),
      updateBlogPost: (id, b) =>
        set((state) => ({
          blogPosts: state.blogPosts.map((post) =>
            post.id === id ? { ...post, ...b } : post
          ),
        })),
      deleteBlogPost: (id) =>
        set((state) => ({
          blogPosts: state.blogPosts.filter((post) => post.id !== id),
        })),
      addModelItem: (m) =>
        set((state) => ({ modelItems: [...state.modelItems, m] })),
      updateModelItem: (id, m) =>
        set((state) => ({
          modelItems: state.modelItems.map((item) =>
            item.id === id ? { ...item, ...m } : item
          ),
        })),
      deleteModelItem: (id) =>
        set((state) => ({
          modelItems: state.modelItems.filter((item) => item.id !== id),
        })),
      addCalcBuildingType: (name) =>
        set((state) => ({
          calcBuildingTypes: [...state.calcBuildingTypes, name],
        })),
      removeCalcBuildingType: (name) =>
        set((state) => ({
          calcBuildingTypes: state.calcBuildingTypes.filter((t) => t !== name),
          calcMaterials: state.calcMaterials.filter((m) => m.buildingType !== name),
        })),
      addCalcMaterial: (m) =>
        set((state) => ({ calcMaterials: [...state.calcMaterials, m] })),
      updateCalcMaterial: (id, m) =>
        set((state) => ({
          calcMaterials: state.calcMaterials.map((mat) =>
            mat.id === id ? { ...mat, ...m } : mat
          ),
        })),
      deleteCalcMaterial: (id) =>
        set((state) => ({
          calcMaterials: state.calcMaterials.filter((mat) => mat.id !== id),
        })),
      addPage: (p) =>
        set((state) => ({ pages: [...state.pages, p] })),
      updatePage: (id, p) =>
        set((state) => ({
          pages: state.pages.map((page) =>
            page.id === id ? { ...page, ...p } : page
          ),
        })),
      deletePage: (id) =>
        set((state) => ({
          pages: state.pages.filter((page) => page.id !== id),
        })),
      addTeamMember: (m) =>
        set((state) => ({ teamMembers: [...state.teamMembers, m] })),
      updateTeamMember: (id, m) =>
        set((state) => ({
          teamMembers: state.teamMembers.map((t) =>
            t.id === id ? { ...t, ...m } : t
          ),
        })),
      deleteTeamMember: (id) =>
        set((state) => ({
          teamMembers: state.teamMembers.filter((t) => t.id !== id),
        })),
      addReview: (r) =>
        set((state) => ({ reviews: [...state.reviews, r] })),
      updateReview: (id, r) =>
        set((state) => ({
          reviews: state.reviews.map((rev) =>
            rev.id === id ? { ...rev, ...r } : rev
          ),
        })),
      deleteReview: (id) =>
        set((state) => ({
          reviews: state.reviews.filter((rev) => rev.id !== id),
        })),
      updateConsultationForm: (patch) =>
        set((state) => ({
          consultationForm: { ...state.consultationForm, ...patch },
        })),
      addSubmission: (s) =>
        set((state) => ({ submissions: [...state.submissions, s] })),
      deleteSubmission: (id) =>
        set((state) => ({
          submissions: state.submissions.filter((sub) => sub.id !== id),
        })),
      updateVastuConfig: (patch) =>
        set((state) => ({
          vastuConfig: { ...state.vastuConfig, ...patch },
        })),
      updateBuildingPermitConfig: (patch) =>
        set((state) => ({
          buildingPermitConfig: { ...state.buildingPermitConfig, ...patch },
        })),
    }),
    { name: "horizan-admin" },
  ),
);
