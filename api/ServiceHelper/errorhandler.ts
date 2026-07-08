// ponytail: Django error parser for raw fetch responses
import { toast } from "sonner";

const STATUS_MESSAGES: Record<number, string> = {
  400: "Invalid request. Please check your input.",
  401: "Session expired. Please log in again.",
  403: "You dont have permission to do this.",
  404: "Resource not found.",
  422: "Validation failed. Check your input.",
  429: "Too many requests. Please wait.",
  500: "Server error. Please try again later.",
};

export interface AppError {
  message: string;
  status: number;
  raw?: unknown;
}

export class ApiError extends Error {
  status: number;
  raw?: unknown;

  constructor(message: string, status: number, raw?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.raw = raw;
  }
}

function extractDjangoMessage(data: unknown): string | null {
  if (!data || typeof data !== "object" || Array.isArray(data)) return null;

  const obj = data as Record<string, unknown>;

  if (typeof obj.detail === "string") return obj.detail;
  if (typeof obj.message === "string") return obj.message;
  if (Array.isArray(obj.non_field_errors)) return obj.non_field_errors.join(", ");

  const messages: string[] = [];
  for (const key in obj) {
    const val = obj[key];
    if (Array.isArray(val)) {
      messages.push(key + ": " + val.join(", "));
    } else if (typeof val === "string") {
      messages.push(val);
    }
  }

  return messages.length > 0 ? messages.join(" | ") : null;
}

export async function parseApiError(res: Response): Promise<AppError> {
  try {
    const data = await res.json();
    const message =
      extractDjangoMessage(data) ??
      STATUS_MESSAGES[res.status] ??
      "Request failed (" + res.status + ")";
    return { message, status: res.status, raw: data };
  } catch {
    return {
      message: STATUS_MESSAGES[res.status] ?? "Request failed (" + res.status + ")",
      status: res.status,
    };
  }
}

export function showErrorToast(message: string): void {
  toast.error(message);
}
