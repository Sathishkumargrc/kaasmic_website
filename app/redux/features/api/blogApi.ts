import { apiSlice } from "./apiSlice";

export interface BlogArticle {
  uuid: string;
  title: string;
  description: string | null;
  snippet: string | null;
  url: string;
  image_url: string | null;
  source: string;
  published_at: string;
}

export interface BlogMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface BlogResponse {
  success: boolean;
  status: number;
  message: string;
  data: {
    posts: BlogArticle[];
    meta: BlogMeta;
  };
  errors: any;
}

export const blogApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query<BlogResponse, { search: string; page: number; limit: number }>({
      query: ({ search, page, limit }) => ({
        url: 'blog', // Adjust if the internal route is different, but FAQContent used 'faqs'
        params: { search, page, limit },
      }),
      providesTags: ['Blog'],
    }),
  }),
});

export const { useGetBlogsQuery } = blogApi;
