import { NextRequest, NextResponse } from "next/server";

const MARKETAUX_BASE = "https://api.marketaux.com/v1/news/all";

export async function GET(request: NextRequest) {
  const apiToken = process.env.MARKETAUX_API_TOKEN ?? process.env.NEXT_PUBLIC_MARKETAUX_API_TOKEN;
  if (!apiToken) {
    return NextResponse.json(
      { error: "API token not configured", data: [], meta: { found: 0, returned: 0, limit: 10, page: 1 } },
      { status: 200 }
    );
  }

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const limit = Math.min(20, Math.max(5, parseInt(searchParams.get("limit") ?? "10", 10)));
  const search = searchParams.get("search")?.trim() || "gold investment finance";

  const params = new URLSearchParams({
    api_token: apiToken,
    language: "en",
    limit: String(limit),
    page: String(page),
    search,
  });

  try {
    const res = await fetch(`${MARKETAUX_BASE}?${params.toString()}`, {
      next: { revalidate: 300 },
    });
    const json = await res.json();
    if (!res.ok) {
      return NextResponse.json(
        { error: json?.error?.message ?? "API error", data: [], meta: { found: 0, returned: 0, limit, page } },
        { status: 200 }
      );
    }
    return NextResponse.json({
      data: json.data ?? [],
      meta: json.meta ?? { found: 0, returned: 0, limit, page },
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to fetch news", data: [], meta: { found: 0, returned: 0, limit, page } },
      { status: 200 }
    );
  }
}
