export interface ReviewItem {
  name: string
  text: string
  rating?: number
  image?: string
}

export interface ReviewGroup {
  id: string
  title: string
  items: ReviewItem[]
}

export interface Review {
  id: string
  name: string
  role?: string
  rating: number
  quote: { en: string; np?: string }
  initials?: string
}
