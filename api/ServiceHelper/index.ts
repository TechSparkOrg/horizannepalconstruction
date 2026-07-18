import { parseApiError, ApiError } from "./errorhandler";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api").replace(/\/+$/, "")

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export async function apiGet<T>(path: string, timeoutMs = 5000): Promise<T> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(`${API_BASE}${path}`, { signal: controller.signal, cache: "no-store" })
    clearTimeout(timeout)
    if (!res.ok) {
      const err = await parseApiError(res)
      throw new ApiError(err.message, err.status, err.raw)
    }
    return res.json()
  } catch (err) {
    clearTimeout(timeout)
    throw err
  }
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  })
  if (!res.ok) {
    const err = await parseApiError(res)
    throw new ApiError(err.message, err.status, err.raw)
  }
  return res.json()
}

export async function apiPostFormData<T>(path: string, formData: FormData): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    body: formData,
  })
  if (!res.ok) {
    const err = await parseApiError(res)
    throw new ApiError(err.message, err.status, err.raw)
  }
  return res.json()
}
