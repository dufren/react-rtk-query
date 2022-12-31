import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [],
        cartTotal: 0
    },
    reducers: {
        addToCart: (state, action) => {
            const { id, price } = action.payload
            const pushOrRemove = state.cart.some(item => item.id === id)

            if (pushOrRemove) {
                state.cart = state.cart.filter((item) => item.id !== id)
                state.cartTotal -= price
            } else {
                state.cart.push(action.payload)
                state.cartTotal += price
            }
        },
        paymentReset: (state, action) => {
            state.cart = []
            state.cartTotal = 0
        }
    }
})

export const { addToCart, paymentReset } = cartSlice.actions

export default cartSlice.reducer
