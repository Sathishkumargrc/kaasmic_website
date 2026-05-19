import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://dev.mystacks.in/api/v1/',
    prepareHeaders: (headers) => {
      // You can add headers here, like Authorization
      // const token = localStorage.getItem('token');
      // if (token) {
      //   headers.set('authorization', `Bearer ${token}`);
      // }
      return headers;
    },
  }),
  tagTypes: ['FAQ', 'Blog', 'Jewellery'], // Add tags here for cache invalidation
  endpoints: (builder) => ({
    // We will inject endpoints in separate files or add them here
  }),
});
