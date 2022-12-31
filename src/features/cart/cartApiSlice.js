import { apiSlice } from '../../app/api/apiSlice'

export const cartApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        payment: builder.mutation({
            query: (cardDetails) => ({
                url: "/payment",
                method: "POST",
                body: {
                    ...cardDetails
                }
            })
        })
    })
})

export const {
    usePaymentMutation,
} = cartApiSlice