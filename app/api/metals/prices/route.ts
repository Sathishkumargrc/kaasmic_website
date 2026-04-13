import { NextResponse } from "next/server";
import { fetchMetalPrices } from "@/app/services/metalPricesService";
import { ApiError } from "@/app/services/apiClient";
import type { RawMetalPrice, MetalPrice } from "@/app/types/api";

/** Transform raw snake_case API response into clean MetalPrice objects */
function transformPrices(raw: RawMetalPrice[]): MetalPrice[] {
  return raw.map((p) => ({
    metal: p.metal_name.toLowerCase(),
    buyPrice: parseFloat(p.buy_price_per_gram) || 0,
    sellPrice: parseFloat(p.sell_price_per_gram) || 0,
    unit: p.unit,
    purity: p.purity,
  }));
}

/**
 * GET /api/metals/prices
 *
 * Server-side proxy — calls external API with Bearer token server-side,
 * so credentials never reach the browser.
 * Cached for 10 minutes (matches client polling interval).
 */
export async function GET() {
  try {
    const response = await fetchMetalPrices();

    const rawPrices = (response?.data?.prices ?? []) as unknown as RawMetalPrice[];
    const prices = transformPrices(rawPrices);

    return NextResponse.json(
      { success: true, data: { prices }, message: response.message, errors: null },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=600, stale-while-revalidate=60",
        },
      }
    );
  } catch (err) {
    const status = err instanceof ApiError ? err.status : 500;
    const message = err instanceof ApiError ? err.message : "Failed to fetch metal prices";

    return NextResponse.json(
      { success: false, data: { prices: [] }, message, errors: null },
      { status: 200 }
    );
  }
}