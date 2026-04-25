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

// ─── Poll every 5 minutes ───
const POLL_INTERVAL_MS = 5 * 60 * 1000;

// ─── Context shape ───
interface MetalPricesContextValue {
  prices: ParsedMetalPrices;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  countdown: number; // in seconds
}

const MetalPricesContext = createContext<MetalPricesContextValue>({
  prices: DEFAULT_METAL_PRICES,
  loading: true,
  error: null,
  refresh: async () => { },
  countdown: POLL_INTERVAL_MS / 1000,
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
  const [countdown, setCountdown] = useState(POLL_INTERVAL_MS / 1000);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
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
        setCountdown(POLL_INTERVAL_MS / 1000);
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
    
    // Countdown timer
    if (countdownRef.current) clearInterval(countdownRef.current);
    countdownRef.current = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : POLL_INTERVAL_MS / 1000));
    }, 1000);
  }, [fetchPrices]);

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
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
    <MetalPricesContext.Provider value={{ prices, loading, error, refresh: fetchPrices, countdown }}>
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