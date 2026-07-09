export interface FaqItem {
  id: string;
  question: { en: string; np?: string };
  answer: { en: string; np?: string };
  order?: number;
  group_id: string;
}

export interface FaqGroupResponse {
  id: string;
  title: string;
  slug: string;
  items?: FaqItem[];
  order: number;
  is_active: boolean;
}
