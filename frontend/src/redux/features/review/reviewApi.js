import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseURL from '../../../utils/baseURL';

const reviewApi = createApi({
    reducerPath: 'reviewApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseURL()}/api/review`,
        credentials: 'include',
    }),
    tagTypes: ['Review'],
    endpoints: (builder) => ({
        postReview: builder.mutation({
            query: (reviewData) => ({
                url: '/post-review',
                method: 'POST',
                body: reviewData,
                credentials: 'include',
            }),
            invalidatesTags: (result, error, { postId }) => [{ type: 'Review', id: postId }],
        }),
        getTotalReviewsCount: builder.query({
            query: () => '/total-reviews-count',
        }),
        getReviewsByUserId: builder.query({
            query: (userId) => `/${userId}`,
            providesTags: (result) => result ? [{ type: 'Review', id: result[0]?.email }] : [],
        }),
        // getReviewsByProductId: builder.query({
        //     query: (productId) => `/${productId}`,
        //     providesTags: (result) => result ? [{ type: 'Review', id: result[0]?.email }] : [],
        // }),
    }),
});

export const {
    usePostReviewMutation,
    useGetTotalReviewsCountQuery,
    useGetReviewsByUserIdQuery,
    // useGetReviewsByProductIdQuery,
} = reviewApi;

export default reviewApi;
