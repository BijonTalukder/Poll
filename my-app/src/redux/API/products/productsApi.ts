import { baseApi } from "../baseApi";

export const productsApi= baseApi.injectEndpoints({
    endpoints:(build)=>( {
        createProduct:build.mutation({
           query :(data)=>({
                url:"/product/create",
                method:"POST",
                data  ,
                contentType:"multipart/form-data"
              
               })
        }),
        getProductByStore:build.query({
            query:(id)=>({
                url:`/product/get-product-by-store/${id}`,
                method:"GET"
            })

        })
    })
})
export const {useCreateProductMutation,useGetProductByStoreQuery} = productsApi;