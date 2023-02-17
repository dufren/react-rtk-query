import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    userInfo: {},
    isLoggedIn: false,
  },
  reducers: {
    getLoginData: (state, action) => {
      state.userInfo = action.payload;
      state.isLoggedIn = true;
    },
  },
});

export const { getLoginData } = loginSlice.actions;

export default loginSlice.reducer;
