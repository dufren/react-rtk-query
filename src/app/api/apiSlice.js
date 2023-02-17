import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://dufren-api.onrender.com/" }),
  tagTypes: ["User", "Package", "Payment"],
  endpoints: (builder) => ({}),
});
