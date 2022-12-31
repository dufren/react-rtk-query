import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const packagesAdapter = createEntityAdapter({})

const initialState = packagesAdapter.getInitialState()

export const packagesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPackages: builder.query({
            query: () => ({
                url: "/packages",
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedPackages = responseData.map(item => {
                    item.id = item._id
                    return item
                })
                return packagesAdapter.setAll(initialState, loadedPackages)
            },
            providesTags: (result) => {
                if (result?.ids) {
                    return [
                        { type: "Package", id: "LIST" },
                        ...result.ids.map(id => ({ type: "Package", id }))
                    ]
                } else return [{ type: "Package", id: "LIST" }]
            }
        })
    })
})

export const {
    useGetPackagesQuery,
} = packagesApiSlice