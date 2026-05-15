import { apiSlice } from "./apiSlice";

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  // Add other fields if necessary based on actual data
}

export interface FAQResponse {
  success: boolean;
  status: number;
  message: string;
  data: {
    faqs: FAQ[];
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
