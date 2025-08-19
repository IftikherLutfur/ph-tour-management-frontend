import { baseApi } from "../../baseApi";
export const tourApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        tourTypePost: builder.mutation({
            query: (tourInfo) => ({
                url: "/tour/create-tour-type",
                method: "POST",
                data: tourInfo
            }),
            invalidatesTags:["TOUR_TYPE"]
        }),

        tourInfo: builder.query({
            query: () => ({
                url: "/tour/tour-types",
                method: "GET"
            }),
            providesTags: ["TOUR_TYPE"],
            transformResponse: (response) => response.data
        }),

    }),
});

export const { 
    useTourTypePostMutation,
    useTourInfoQuery
} = tourApi;