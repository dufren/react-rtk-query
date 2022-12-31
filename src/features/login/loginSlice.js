import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: "login",
    initialState: {
        name: {},
        isLoggedIn: false,
    },
    reducers: {
        getUserInfo: (state, action) => {
            state.name = action.payload
        },
        isLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        }
    }
})

export const { getUserInfo, isLoggedIn } = loginSlice.actions

export default loginSlice.reducer