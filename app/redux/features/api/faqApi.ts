import { apiSlice } from "./apiSlice";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQCategory {
  category: string;
  items: FAQItem[];
}

export interface FAQResponse {
  success: boolean;
  status: number;
  message: string;
  data: {
    faqs: FAQCategory[];
    total: number;
  };
  errors: any;
}

export const faqApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFaqs: builder.query<FAQResponse, void>({
      query: () => 'faqs',
      providesTags: ['FAQ'],
    }),
  }),
});

export const { useGetFaqsQuery } = faqApi;
