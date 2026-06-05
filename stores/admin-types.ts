import type { AdminAuthState } from "@/api/types/auth.types";

export interface SubService {
  name: string;
  description: string;
}

export interface AdminCategory {
  id: string;
  name: string;
  nameNp: string;
  slug: string;
  iconName: string;
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
  titleNp: string;
  excerpt: string;
  excerptNp: string;
  categoryId: string;
  projectId: string;
  image: string;
  date: string;
  author: string;
  authorRole: string;
  authorImage: string;
  content: BlogContentBlock[];
  contentNp: BlogContentBlock[];
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
  titleNp: string;
  slug: string;
  content: string;
  contentNp: string;
  iconName: string;
  metaTitle: string;
  metaTitleNp: string;
  metaDescription: string;
  metaDescriptionNp: string;
  createdAt: string;
}

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

export interface Review {
  id: string;
  name: string;
  initials: string;
  role: string;
  quote: BPText;
  rating: number;
}

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
  quick_tools: {
    badge: string;
    title: string;
    description: string;
    roomToolTitle: string;
    roomToolDesc: string;
    directionToolTitle: string;
    directionToolDesc: string;
  };
  section_icons: Record<string, string>;
  section_keys: string[];
  sections: Record<string, VastuSectionData>;
  rooms: Record<string, VastuRoomData>;
  directions: Record<string, VastuDirectionData>;
  room_options: { id: string; label: string; labelNp: string }[];
  direction_options: { id: string; label: string; subtitle: string }[];
}

export type { AdminAuthState };
