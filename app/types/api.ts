// ─── Common API Response Wrapper ───
export interface ApiResponse<T> {
  success: boolean;
  status: number;
  message: string;
  data: T;
  errors: string | null;
}

// ─── Raw Metal Price from external API (snake_case) ───
export interface RawMetalPrice {
  metal_name: string;           // e.g. "GOLD", "SILVER"
  purity: string;               // e.g. "99.99"
  unit: string;                 // e.g. "GRAM"
  buy_price_per_gram: string;   // e.g. "15812.00"
  sell_price_per_gram: string;  // e.g. "15094.00"
}

// ─── Transformed Metal Price (camelCase, numbers) ───
export interface MetalPrice {
  metal: string;      // "gold" | "silver"
  purity: string;     // "99.99"
  unit: string;       // "GRAM"
  buyPrice: number;   // 15812.00
  sellPrice: number;  // 15094.00
}

export interface MetalPricesData {
  prices: MetalPrice[];
}

export interface RawMetalPricesData {
  prices: RawMetalPrice[];
}

// ─── Full parsed price entry stored in context ───
export interface ParsedMetalPrice {
  metal: string;      // "gold" | "silver"
  purity: string;     // "99.99"
  unit: string;       // "GRAM"
  buyPrice: number;   // 15812.00
  sellPrice: number;  // 15094.00
}

// ─── Context state shape ───
export interface ParsedMetalPrices {
  gold: ParsedMetalPrice | null;
  silver: ParsedMetalPrice | null;
  lastUpdated: Date | null;
}

// ─── Default fallback (before first API response) ───
export const DEFAULT_METAL_PRICES: ParsedMetalPrices = {
  gold: null,
  silver: null,
  lastUpdated: null,
};