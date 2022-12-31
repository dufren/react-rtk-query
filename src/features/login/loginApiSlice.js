import { apiSlice } from "../../app/api/apiSlice";

export const loginApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: (initialUserData) => ({
                url: "/users",
                method: "POST",
                body: {
                    ...initialUserData
                }
            })
        })
    })
})

export const {
    useLoginMutation,
} = loginApiSlice