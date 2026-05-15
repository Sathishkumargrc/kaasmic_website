import { apiSlice } from "./apiSlice";

export interface PageContent {
  key: string;
  title: string;
  content: string;
  version: string;
  published_at: string;
  updated_at: string;
}

export interface TermsResponse {
  success: boolean;
  status: number;
  message: string;
  data: {
    page: PageContent;
  };
  errors: any;
}

export const termsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTerms: builder.query<TermsResponse, void>({
      query: () => 'pages/terms',
      providesTags: ['FAQ'],
    }),
  }),
});

export const { useGetTermsQuery } = termsApi;
