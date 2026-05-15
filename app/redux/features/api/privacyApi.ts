import { apiSlice } from "./apiSlice";

export interface PageContent {
  key: string;
  title: string;
  content: string;
  version: string;
  published_at: string;
  updated_at: string;
}

export interface PrivacyResponse {
  success: boolean;
  status: number;
  message: string;
  data: {
    page: PageContent;
  };
  errors: any;
}

export const privacyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacyPolicy: builder.query<PrivacyResponse, void>({
      query: () => 'pages/privacy_policy',
      providesTags: ['FAQ'],
    }),
  }),
});

export const { useGetPrivacyPolicyQuery } = privacyApi;
