import type { IResponse, ISentotp, IVerifyOTP } from "../../../types";
import { baseApi } from "../../baseApi";
export const authAPi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        regiser: builder.mutation({
            query: (userInfo) => ({
                url: "/user/register",
                method: "POST",
                data: userInfo
            }),
        }),

        login: builder.mutation({
            query: (logInfo) => ({
                url: "/auth/login",
                method: "POST",
                data: logInfo
            })
        }),

        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            invalidatesTags: ["USER"]
        }),
        sendOTP: builder.mutation<IResponse<null>, ISentotp>({
            query: (userInfo) => ({
                url: "/OTP/send",
                method: "POST",
                data: userInfo
            })
        }),
        verifyOTP: builder.mutation<IResponse<null>, IVerifyOTP>({
            query: (userInfo) => ({
                url: "/OTP/verify",
                method: "POST",
                data: userInfo
            })
        }),
        userInfo: builder.query({
            query: () => ({
                url: "/user/me",
                method: "GET"
            }),
            providesTags: ["USER"]
        }),

    }),
});

export const { 
    useRegiserMutation, 
    useLoginMutation,
    useSendOTPMutation, 
    useVerifyOTPMutation,
    useUserInfoQuery,
    useLogoutMutation
} = authAPi;