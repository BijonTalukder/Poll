import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../../helpers/axios/axiosBaseQuery';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl:'https://books-backend-dulw.vercel.app/api/v1' }),
  endpoints: (builder) => ({
    getProductType: builder.query({
      query: () => ({
        url: `/productType/`,
        method: 'GET',
      }),
    }),
    getSingleProdutType: builder.query({
      query: (id) => ({
        url: `/productType/${id}`,
        method: 'GET',
      }),
    }),
    updateProductType: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/${id}`,
        method: 'PATCH',
        data,
      }),
    }),
    getStoreProductType:builder.query({
      query:(id)=>({
        url:`/productType/get-productType-store/${id}`,
        method:'GET'
      })
    })
  }),
});

export const {
  useGetProductTypeQuery,
  useGetSingleProdutTypeQuery,
  useUpdateProductTypeMutation,
  useGetStoreProductTypeQuery
} = baseApi;
