import { baseApi } from "../baseApi";

export const cartsApi = baseApi.injectEndpoints({
    endpoints: (build) => (
        {
            createCart: build.mutation({
                query: (data) => ({
                    url: `/cart/create`,
                    method: 'POST',
                    data

                })
            }),
            getCartByUser: build.query({
                query: (id) => ({
                    url: `/cart/user/${id}`,
                    method: 'GET'
                })

            })
        }
    )
})

export const { useCreateCartMutation ,useGetCartByUserQuery} = cartsApi