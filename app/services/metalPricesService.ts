import { apiFetch } from "./apiClient";
import type { RawMetalPricesData } from "@/app/types/api";

/**
 * Fetches live metal prices from the external API.
 * SERVER-SIDE ONLY — called inside /api/metals/prices route.
 * Bearer token stays on the server; never reaches the browser.
 */
export async function fetchMetalPrices() {
  return apiFetch<RawMetalPricesData>("metals/prices");
}