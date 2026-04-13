"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type {
  ApiResponse,
  MetalPrice,
  MetalPricesData,
  ParsedMetalPrice,
  ParsedMetalPrices,
} from "@/app/types/api";
import { DEFAULT_METAL_PRICES } from "@/app/types/api";

// ─── Poll every 10 minutes ───
const POLL_INTERVAL_MS = 10 * 60 * 1000;

// ─── Context shape ───
interface MetalPricesContextValue {
  prices: ParsedMetalPrices;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const MetalPricesContext = createContext<MetalPricesContextValue>({
  prices: DEFAULT_METAL_PRICES,
  loading: true,
  error: null,
  refresh: async () => { },
});

// ─── Parse API prices → store ALL fields (purity, unit, buy, sell) ───
function parsePrices(raw: MetalPrice[]): ParsedMetalPrices {
  const toEntry = (p: MetalPrice): ParsedMetalPrice => ({
    metal: p.metal,
    purity: p.purity,
    unit: p.unit,
    buyPrice: p.buyPrice,
    sellPrice: p.sellPrice,
  });

  const gold = raw.find((p) => p.metal === "gold");
  const silver = raw.find((p) => p.metal === "silver");

  return {
    gold: gold ? toEntry(gold) : null,
    silver: silver ? toEntry(silver) : null,
    lastUpdated: new Date(),
  };
}

// ─── Provider ───
export function MetalPricesProvider({ children }: { children: ReactNode }) {
  const [prices, setPrices] = useState<ParsedMetalPrices>(DEFAULT_METAL_PRICES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isFetchingRef = useRef(false);

  const fetchPrices = useCallback(async () => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    try {
      const res = await fetch("/api/metals/prices");
      const json: ApiResponse<MetalPricesData> = await res.json();

      if (json.success && json.data.prices.length > 0) {
        setPrices(parsePrices(json.data.prices));
        setError(null);
      }
    } catch (err) {
      setError((err as Error).message || "Failed to fetch prices");
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, []);

  const startPolling = useCallback(() => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(fetchPrices, POLL_INTERVAL_MS);
  }, [fetchPrices]);

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    fetchPrices();
    startPolling();

    const onVisibilityChange = () => {
      if (document.hidden) {
        stopPolling();
      } else {
        fetchPrices();
        startPolling();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      stopPolling();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [fetchPrices, startPolling, stopPolling]);

  return (
    <MetalPricesContext.Provider value={{ prices, loading, error, refresh: fetchPrices }}>
      {children}
    </MetalPricesContext.Provider>
  );
}

// ─── Hook ───
export function useMetalPrices() {
  const ctx = useContext(MetalPricesContext);
  if (!ctx) throw new Error("useMetalPrices must be used within <MetalPricesProvider>");
  return ctx;
}