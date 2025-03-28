import {apiSlice} from './apiSlice.js'
import { USERS_URL } from '../constant.js'

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints :(builder) => ({

        login : builder.mutation({
            query : (data) => ({
                url : `${USERS_URL}/auth`,
                method : "POST",
                body : data,
            }),
        }),
            logout : builder.mutation({
                query : () => ({
                    url : `${USERS_URL}/logout`,
                    method : "POST",
                })
    }),
    register : builder.mutation({
        query : (data) => ({
            url : `${USERS_URL}`,
            method : "POST",
            body : data,
        }),
    }),

    profile : builder.mutation({
        query : data => ( {
            url : `${USERS_URL}/profile`,
            method : "PUT",
            body : data
        })
    }),

    getUsers : builder.query({
        query : () => ({
            url :USERS_URL,
        }),
        providesTags : ['Users'],
        keepUnusedDataFor : 5
    }),

    deleteUser : builder.mutation({
        query : userId => ({
            url : `${USERS_URL}/${userId}`,
            method : "DELETE",
        })
    }),

    getUserDetails : builder.query({
        query : userId => ( {
        url : `${USERS_URL}/${userId}`,
        }),
        keepUnusedDataFor :5,
    }),
    updateUser : builder.mutation({
        query : data => ({
            url : `${USERS_URL}/${data.userId}`,
            method : "PUT",
            body : data
        }),
        invalidatesTags : ["User"]
    })

})
});

export const 
{   useLoginMutation,
    useLogoutMutation ,
    useRegisterMutation,
    useProfileMutation,
    useGetUserDetailsQuery,
    useUpdateUserMutation,
    useGetUsersQuery,
    useDeleteUserMutation,
} = userApiSlice;
