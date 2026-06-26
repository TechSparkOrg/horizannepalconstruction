export interface FaqItem {
  id: string
  question: { en: string; np?: string }
  answer: { en: string; np?: string }
  order?: number
  category_id?: string
}

export interface FaqGroup {
  id: string
  title: string
  items: FaqItem[]
}
