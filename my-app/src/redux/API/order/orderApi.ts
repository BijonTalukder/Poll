import { baseApi } from "../baseApi";

export const orderApi = baseApi.injectEndpoints(
    {
        endpoints: (build) => (
            {
                createOrder: build.mutation({
                    query: (data) => ({
                        url: '/order/create',
                        method: 'POST',
                        data

                    })
                }),
                getOrderByStore: build.query({
                    query: ({ storeId, orderStatus, searchTerm, limit, page, sortBy, sortOrder }) => {
                        
                        // console.log(storeId);
                        
                        const params = new URLSearchParams();
                        if (orderStatus) params.append("orderStatus", orderStatus);
                        if (searchTerm) params.append("searchTerm", searchTerm);
                        if (limit) params.append("limit", limit);
                        if (page) params.append("page", page);
                        if (sortBy) params.append("sortBy", sortBy);
                        if (sortOrder) params.append("sortOrder", sortOrder);

                        return {
                            url: `/order/store/${storeId}?${params.toString()}`,
                            method: "GET",
                        };
                    },
                }),
                updateOrder:build.mutation({
                    query:({data,id})=>({

              
                        url:`/order/${id}`,
                        method:"PUT",
                        data

                    })

                })
            }
        )
    }
)

export const { useCreateOrderMutation, useGetOrderByStoreQuery,useUpdateOrderMutation } = orderApi