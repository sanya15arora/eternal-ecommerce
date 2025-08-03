import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseURL from '../../../utils/baseURL';

const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseURL()}/api/product`,
        credentials: 'include',
    }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: ({ category, color, minPrice, maxPrice, page = 1, limit = 10 }) => {
                const queryParams = new URLSearchParams({
                    category: category || '',
                    color: color || '',
                    minPrice: minPrice || 0,
                    maxPrice: maxPrice || '',
                    page: page.toString(),
                    limit: limit.toString()
                }).toString();
                return `/all?${queryParams}`
            },
            providesTags: ["Product"]
        }),
        getProductById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: "Product", id }]
        }),
        createProduct: builder.mutation({
            query: (newProduct) => ({
                url: '/create-product',
                method: 'POST',
                body: newProduct,
                credentials: "include"
            }),
            invalidatesTags: ["Product"]
        }),
        getRelatedProducts: builder.query({
            query: (id) => `/related/${id}`,
        }),
        getTrendingProducts: builder.query({
            query: () => '/trending',
        }),
        updateProduct: builder.mutation({
            query: ({ id, ...updatedProduct }) => ({
                url: `/update/${id}`,
                method: 'PATCH',
                body: updatedProduct,
                credentials: "include"
            }),
            invalidatesTags: ["Product"]
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/delete/${id}`,
                method: 'DELETE',
                credentials: "include"
            }),
            invalidatesTags: (result, error, id) => { { type: "Product", id } }
        }),
        searchProducts: builder.query({
            query: (searchQuery) => `/search?q=${encodeURIComponent(searchQuery)}`,
            providesTags: ["Product"],
        }),
        getProductsByCategory: builder.query({
            query: (categoryName) => `/category/${categoryName}`,
            providesTags: ["Product"],
        }),
    })

});

export const {
    useGetAllProductsQuery,
    useGetProductByIdQuery,
    useCreateProductMutation,
    useGetRelatedProductsQuery,
    useGetTrendingProductsQuery,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useSearchProductsQuery,
    useGetProductsByCategoryQuery
} = productApi;

export default productApi;