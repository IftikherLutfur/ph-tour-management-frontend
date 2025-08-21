/* eslint-disable @typescript-eslint/no-unused-vars */
import { baseApi } from "../../baseApi";

export const divissionAPi = baseApi.injectEndpoints({
    endpoints:(builder) =>({

        divissionPost: builder.mutation({
            query:(divissionInfo) => ({
            url:"/division/create",
            method: "POST",
            data: divissionInfo
            }),
            invalidatesTags: ["DIVISSION"]
        }),
        getDivission: builder.query({
            query:(divissionInfo) => ({
            url:"/division",
            method: "GET",
            data: divissionInfo
            }),
           providesTags: ["DIVISSION"]
        }),
    })
})
export const {
    useDivissionPostMutation,
    useGetDivissionQuery
} = divissionAPi;