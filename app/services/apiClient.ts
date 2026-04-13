import type { ApiResponse } from "@/app/types/api";

// ─── Config from .env ───
const API_BASE_URL = process.env.API_BASE_URL ?? "";
const API_BEARER_TOKEN = process.env.API_BEARER_TOKEN ?? "";

// ─── Error Class ───
export class ApiError extends Error {
  status: number;
  errors: string | null;

  constructor(message: string, status: number, errors: string | null = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

// ─── Core fetch helper (server-side only) ───
export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit & { timeout?: number } = {}
): Promise<ApiResponse<T>> {
  const { timeout = 15_000, ...fetchOpts } = options;

  // Build URL relative to base
  const base = API_BASE_URL.replace(/\/+$/, "");
  const path = endpoint.replace(/^\/+/, "");
  const url = `${base}/${path}`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, {
      ...fetchOpts,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${API_BEARER_TOKEN}`,
        ...fetchOpts.headers,
      },
      signal: controller.signal,
    });

    const json = await res.json();

    if (!res.ok) {
      throw new ApiError(
        json?.message ?? `Request failed (${res.status})`,
        res.status,
        json?.errors ?? null
      );
    }

    return json as ApiResponse<T>;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    if ((err as Error).name === "AbortError") {
      throw new ApiError("Request timed out", 408);
    }
    throw new ApiError((err as Error).message || "Network error", 0);
  } finally {
    clearTimeout(timer);
  }
}