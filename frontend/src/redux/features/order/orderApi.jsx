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
        })
    })
})

export const { useGetOrdersByEmailQuery, useGetOrdersByIdQuery } = orderApi;
export default orderApi;