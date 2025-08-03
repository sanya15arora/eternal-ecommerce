import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseURL from '../../../utils/baseURL';


const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseURL()}/api/order`,
        credentials: 'include',
    }),
    tagTypes: ['Order'],
    endpoints: (builder) => ({
        getOrdersByEmail: builder.query({
            query: (email) => ({
                url: `/email/${email}`,
                method: 'GET'
            }),
            providesTag: ['Order']
        }),
        getOrdersById: builder.query({
            query: (orderId) => ({
                url: `/id/${orderId}`,
                method: 'GET'
            }),
            providesTag: ['Order']
        }),
        getAllOrders: builder.query({
            query: () => ({
                url: "/all",
                method: 'GET',
            }),
            providesTag: ['Order']
        }),
        updateOrderStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/update-status/${id}`,
                method: 'PUT',
                body: { status },
            }),
            invalidatesTags: ['Order']
        }),
        deleteOrder: builder.mutation({
            query: ({ id }) => ({
                url: `/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Order']
        }),
    })
})

export const { useGetOrdersByEmailQuery, useGetOrdersByIdQuery, useGetAllOrdersQuery, useUpdateOrderStatusMutation, useDeleteOrderMutation } = orderApi;
export default orderApi;