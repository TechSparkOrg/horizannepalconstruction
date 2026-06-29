export interface VastuConfig {
  id: string
  title: string
  description?: string
  rules?: VastuRule[]
  hero?: {
    badge?: string
    title?: string
    subtitle?: string
  }
  sections?: Record<string, VastuSection>
  rooms?: Record<string, VastuRoomInfo>
  directions?: Record<string, VastuDirectionInfo>
  section_keys?: string[]
  section_icons?: Record<string, string>
  room_options?: Array<{ id: string; label: string; labelNp: string }>
  direction_options?: Array<{ id: string; label: string; subtitle: string }>
  quick_tools?: VastuQuickTools
}

export interface VastuRule {
  title: string
  description: string
}

export interface VastuSection {
  title?: string
  titleNp?: string
  content?: Array<{ en: string; np: string }>
  customTopics?: Array<{
    title: string
    titleNp: string
    items: Array<{ en: string; np: string }>
  }>
}

export interface VastuRoomInfo {
  idealDirection?: { en: string; np: string }
  facingDirection?: { en: string; np: string }
  tips?: Array<{ en: string; np: string }>
  avoid?: Array<{ en: string; np: string }>
}

export interface VastuDirectionInfo {
  deity: string
  element: string
  description?: { en: string; np: string }
  recommended?: Array<{ en: string; np: string }>
  avoid?: Array<{ en: string; np: string }>
}

export interface VastuQuickTools {
  badge?: string
  title?: string
  description?: string
  roomToolTitle?: string
  roomToolDesc?: string
  directionToolTitle?: string
  directionToolDesc?: string
}

export interface VastuItemDetail {
  id: string
  type: 'section' | 'room' | 'direction'
  title: string
  slug: string
  order: number
  is_active: boolean
  content_list: Array<{ en: string; np: string }>
  benefits: Array<{ en: string; np: string }>
  avoids: Array<{ en: string; np: string }>
  ideal_direction: { en: string; np: string }
  facing_direction: { en: string; np: string }
  deity: string
  element: string
  description: { en: string; np: string }
}

export interface VastuNavItem {
  slug: string
  title: string
}

export interface VastuNavResponse {
  sections: VastuNavItem[]
  rooms: VastuNavItem[]
  directions: VastuNavItem[]
}
