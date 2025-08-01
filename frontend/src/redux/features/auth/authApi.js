import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseURL from '../../../utils/baseURL';


export const authApi = createApi({

    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseURL()}/api/auth/user`,
        credentials: 'include',
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (newUser) => ({
                url: '/register',
                method: 'POST',
                body: newUser,
            }),
        }),

        loginUser: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
        }),

        logoutUser: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
        }),

        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
        getUser: builder.query({
            query: (id) => ({
                url: `/${id}`,
                method: 'GET',
            }),
            refechOnMount: true,
            invalidatesTags: ['User'],
            // providesTags: (result, error, id) => [{ type: 'Users', id }],
            // refetchOnMountOrArgChange: true,
        }),
        editprofile: builder.mutation({
            query: ({ id, userData }) => ({
                url: `/edit/${id}`,
                method: 'PATCH',
                body: userData,
            }),
        }),
        updateUserRole: builder.mutation({
            query: ({ id, role }) => ({
                url: `/${id}/role`,
                method: 'PUT',
                body: { role }
            }),
            refetchOnMount: true,
            invalidatesTags: ['User'],
        }),
    })
});


export const { useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation, useGetUserQuery,
    useDeleteUserMutation, useUpdateUserRoleMutation, useEditprofileMutation } = authApi;
export default authApi;       