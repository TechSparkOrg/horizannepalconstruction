"use client"

export const Events = {
  BANNER_CLICK: "banner_click",
  BANNER_HOVER: "banner_hover",
  PROJECT_CLICK: "project_click",
  PROJECT_HOVER: "project_hover",
  PROJECT_READ: "project_read",
  PROJECT_CATEGORY_CLICK: "project_category_click",
  BLOG_CLICK: "blog_click",
  BLOG_HOVER: "blog_hover",
  BLOG_READ: "blog_read",
  BLOG_CATEGORY_CLICK: "blog_category_click",
  REVIEW_CLICK: "review_click",
  REVIEW_CREATED: "review_created",
  REVIEW_LOAD_MORE: "review_load_more",
  SERVICE_CLICK: "service_click",
  SERVICE_HOVER: "service_hover",
  MATERIAL_CLICK: "material_click",
  MATERIAL_HOVER: "material_hover",
  CONVERTER_CLICK: "converter_click",
  CONVERTER_USED: "converter_used",
  WHATSAPP_CLICK: "whatsapp_click",
  NAV_CLICK: "nav_click",
  CONSULTATION_CREATED: "consultation_created",
  QUESTION_CREATED: "question_created",
  ESTIMATE_USED: "estimate_used",
  VASTU_ANALYZE: "vastu_analyze",
  FAQ_READ: "faq_read",
  FOOTER_CLICK: "footer_click",
} as const

export type EventName = (typeof Events)[keyof typeof Events]

export function trackEvent(action: EventName, data?: Record<string, unknown>) {
  if (typeof window === "undefined") return
  try {
    const w = window as unknown as Record<string, unknown>
    if (typeof w.gtag === "function") w.gtag("event", action, data)
    if (typeof w.fbq === "function") w.fbq("track", action, data)
  } catch {
    /* analytics errors never break the UI */
  }
}
