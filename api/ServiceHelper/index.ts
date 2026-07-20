import { parseApiError, ApiError } from "./errorhandler";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api").replace(/\/+$/, "")

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

const inflight = new Map<string, Promise<unknown>>()

async function get<T>(path: string, timeoutMs = 5000): Promise<T> {
  const url = `${API_BASE}${path}`
  if (inflight.has(url)) return inflight.get(url)! as Promise<T>
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)
  const promise = (async () => {
    try {
      const res = await fetch(url, { signal: controller.signal })
      clearTimeout(timeout)
      if (!res.ok) {
        const err = await parseApiError(res)
        throw new ApiError(err.message, err.status, err.raw)
      }
      return res.json()
    } catch (err) {
      clearTimeout(timeout)
      throw err
    } finally {
      inflight.delete(url)
    }
  })()
  inflight.set(url, promise)
  return promise as Promise<T>
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const err = await parseApiError(res)
    throw new ApiError(err.message, err.status, err.raw)
  }
  return res.json()
}

async function upload<T>(path: string, formData: FormData): Promise<T> {
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

export const api = { get, post, upload }
