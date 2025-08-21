
import { createApi } from "@reduxjs/toolkit/query/react"
import axiosBaseQuery from "./axiosBaseQuery"
export const baseApi = createApi({
    reducerPath: "baseAPi",
    baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    tagTypes: ["USER", "TOUR_TYPE", "DIVISSION"],
    endpoints: () => ({})
})