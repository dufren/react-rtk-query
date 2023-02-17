import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import loginReducer from "../features/login/loginSlice";
import cartReducer from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    login: loginReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: false,
});
