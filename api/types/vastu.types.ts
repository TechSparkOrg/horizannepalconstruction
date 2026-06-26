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
