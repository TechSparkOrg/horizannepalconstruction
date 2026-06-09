'use server'

import { cacheLife, cacheTag, updateTag } from 'next/cache'
import { cookies } from 'next/headers'

export async function revalidateAdminTag(tag: string) {
  updateTag(tag)
}
import type { Page as ApiPage, PageSection } from '@/api/types/page.types'
import type { SiteSettings } from '@/api/types/settings.types'
import type { TeamMember } from '@/stores/admin-types'
import type { Review } from '@/api/types/review.types'
import type { ModelItem } from '@/api/types/model3d.types'
import type { Project } from '@/api/types/project.types'
import type { ConsultationSettings, ConsultationSubmission } from '@/api/types/consultation.types'
import type { MediaItem } from '@/api/types/media.types'
import type { VastuConfig } from '@/stores/admin-types'
import type { BuildingPermitConfig } from '@/api/types/building-permit.types'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
const CACHE_PROFILE = { stale: 60, revalidate: 60, expire: 300 }

async function authHeaders() {
  const token = (await cookies()).get('access_token')?.value
  return { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
}

// ─── Pages ─────────────────────────────────────────────────────
export async function getAdminPages() {
  const h = await authHeaders()
  return _cachedPages(h)
}

async function _cachedPages(h: Record<string, string>) {
  'use cache'
  cacheTag('admin-pages')
  cacheLife(CACHE_PROFILE)
  const res = await fetch(`${API}/admin/pages/`, { headers: h })
  if (!res.ok) throw new Error('Failed to fetch pages')
  return res.json() as Promise<{ count: number; results: ApiPage[] }>
}

export async function getAdminPageSections(pageSlug: string) {
  const h = await authHeaders()
  return _cachedPageSections(pageSlug, h)
}

async function _cachedPageSections(pageSlug: string, h: Record<string, string>) {
  'use cache'
  cacheTag('admin-page-sections', `admin-page-sections-${pageSlug}`)
  cacheLife(CACHE_PROFILE)
  const res = await fetch(`${API}/admin/page-sections/?page=${pageSlug}`, { headers: h })
  if (!res.ok) throw new Error('Failed to fetch page sections')
  return res.json() as Promise<{ count: number; results: PageSection[] }>
}

// ─── Settings ───────────────────────────────────────────────────
export async function getAdminSettings() {
  const h = await authHeaders()
  return _cachedSettings(h)
}

async function _cachedSettings(h: Record<string, string>) {
  'use cache'
  cacheTag('admin-settings')
  cacheLife(CACHE_PROFILE)
  const res = await fetch(`${API}/settings/`, { headers: h })
  if (!res.ok) throw new Error('Failed to fetch settings')
  return res.json() as Promise<SiteSettings>
}

// ─── Team ───────────────────────────────────────────────────────
export async function getAdminTeam() {
  const h = await authHeaders()
  return _cachedTeam(h)
}

async function _cachedTeam(h: Record<string, string>) {
  'use cache'
  cacheTag('admin-team')
  cacheLife(CACHE_PROFILE)
  const res = await fetch(`${API}/admin/team/`, { headers: h })
  if (!res.ok) throw new Error('Failed to fetch team')
  return res.json() as Promise<{ count: number; results: TeamMember[] }>
}

// ─── Reviews ────────────────────────────────────────────────────
export async function getAdminReviews() {
  const h = await authHeaders()
  return _cachedReviews(h)
}

async function _cachedReviews(h: Record<string, string>) {
  'use cache'
  cacheTag('admin-reviews')
  cacheLife(CACHE_PROFILE)
  const res = await fetch(`${API}/admin/reviews/`, { headers: h })
  if (!res.ok) throw new Error('Failed to fetch reviews')
  return res.json() as Promise<{ count: number; results: Review[] }>
}

// ─── Models & Projects ──────────────────────────────────────────
export async function getAdminModels() {
  const h = await authHeaders()
  return _cachedModels(h)
}

async function _cachedModels(h: Record<string, string>) {
  'use cache'
  cacheTag('admin-models')
  cacheLife(CACHE_PROFILE)
  const res = await fetch(`${API}/admin/models/`, { headers: h })
  if (!res.ok) throw new Error('Failed to fetch models')
  return res.json() as Promise<{ count: number; results: ModelItem[] }>
}

export async function getAllProjects() {
  const h = await authHeaders()
  return _cachedAllProjects(h)
}

async function _cachedAllProjects(h: Record<string, string>) {
  'use cache'
  cacheTag('admin-all-projects')
  cacheLife(CACHE_PROFILE)
  const res = await fetch(`${API}/admin/projects/`, { headers: h })
  if (!res.ok) throw new Error('Failed to fetch projects')
  return res.json() as Promise<{ count: number; results: Project[] }>
}

// ─── Consultation ───────────────────────────────────────────────
export async function getAdminConsultationSettings() {
  const h = await authHeaders()
  return _cachedConsultationSettings(h)
}

async function _cachedConsultationSettings(h: Record<string, string>) {
  'use cache'
  cacheTag('admin-consultation-settings')
  cacheLife(CACHE_PROFILE)
  const res = await fetch(`${API}/admin/consultation/settings/`, { headers: h })
  if (!res.ok) throw new Error('Failed to fetch consultation settings')
  return res.json() as Promise<ConsultationSettings>
}

export async function getAdminConsultationSubmissions() {
  const h = await authHeaders()
  return _cachedConsultationSubmissions(h)
}

async function _cachedConsultationSubmissions(h: Record<string, string>) {
  'use cache'
  cacheTag('admin-consultation-submissions')
  cacheLife(CACHE_PROFILE)
  const res = await fetch(`${API}/admin/consultation/submissions/`, { headers: h })
  if (!res.ok) throw new Error('Failed to fetch submissions')
  return res.json() as Promise<ConsultationSubmission[]>
}

// ─── Vastu ──────────────────────────────────────────────────────
export async function getAdminVastu() {
  const h = await authHeaders()
  return _cachedVastu(h)
}

async function _cachedVastu(h: Record<string, string>) {
  'use cache'
  cacheTag('admin-vastu')
  cacheLife(CACHE_PROFILE)
  const res = await fetch(`${API}/vastu/`, { headers: h })
  if (!res.ok) throw new Error('Failed to fetch vastu config')
  return res.json() as Promise<VastuConfig>
}

// ─── Media ──────────────────────────────────────────────────────
export async function getAdminMedia(page: number = 1) {
  const h = await authHeaders()
  return _cachedMedia(page, h)
}

async function _cachedMedia(page: number, h: Record<string, string>) {
  'use cache'
  cacheTag('admin-media')
  cacheLife(CACHE_PROFILE)
  const params = page ? `?page=${page}` : ''
  const res = await fetch(`${API}/admin/media/${params}`, { headers: h })
  if (!res.ok) throw new Error('Failed to fetch media')
  return res.json() as Promise<{ count: number; next: string | null; results: MediaItem[] }>
}

// ─── Building Permit ────────────────────────────────────────────
export async function getAdminBuildingPermit() {
  const h = await authHeaders()
  return _cachedBuildingPermit(h)
}

async function _cachedBuildingPermit(h: Record<string, string>) {
  'use cache'
  cacheTag('admin-building-permit')
  cacheLife(CACHE_PROFILE)
  const res = await fetch(`${API}/admin/building-permit/`, { headers: h })
  if (!res.ok) throw new Error('Failed to fetch building permit config')
  return res.json() as Promise<BuildingPermitConfig>
}
