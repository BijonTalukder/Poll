import { baseApi } from "../baseApi";

export const productTypeApi=baseApi.injectEndpoints({
    endpoints:(build)=>({
        getAllProductType:build.query({
            query:()=>({
                url:'/productType',
                method:'GET'
            })
        })

    })
})

export const {useGetAllProductTypeQuery} = productTypeApi