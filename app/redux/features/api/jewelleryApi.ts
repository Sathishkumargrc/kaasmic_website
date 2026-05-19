import { apiSlice } from "./apiSlice";

export interface JewelleryImage {
  id: string;
  url: string;
  sort_order: number;
}

export interface JewelleryCategory {
  id: string;
  name: string;
  slug: string;
}

export interface JewelleryDesign {
  id: string;
  name: string;
  category: JewelleryCategory;
  metal_type: string;
  purity: string;
  weight: string;
  gst_percentage: string;
  making_charge_type: string;
  making_charge_value: string;
  description: string | null;
  images: JewelleryImage[];
  created_at: string;
}

export interface JewelleryMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface JewelleryResponse {
  success: boolean;
  status: number;
  message: string;
  data: {
    designs: JewelleryDesign[];
    meta: JewelleryMeta;
  };
  errors: any;
}

export const jewelleryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJewelleryDesigns: builder.query<JewelleryResponse, { page?: number; limit?: number } | void>({
      query: (params) => ({
        url: "jewellery-designs",
        params: params || {},
      }),
      providesTags: ["Jewellery" as any],
    }),
  }),
});

export const { useGetJewelleryDesignsQuery } = jewelleryApi;
