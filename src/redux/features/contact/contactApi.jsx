import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseURL from '../../../utils/baseURL';

export const contactApi = createApi({
    reducerPath: 'contactApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${getBaseURL()}/api/contact` }),
    tagTypes: ['Contact'],
    endpoints: (builder) => ({
        submitContact: builder.mutation({
            query: (formData) => ({
                url: '/submit-contact',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Contact'],
        }),

        getContacts: builder.query({
            query: () => '/get-contact',
            providesTags: ['Contact'],
        }),
    }),
});

export const {
    useSubmitContactMutation,
    useGetContactsQuery
} = contactApi;

export default contactApi;
