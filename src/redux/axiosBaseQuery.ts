/* eslint-disable @typescript-eslint/no-unused-vars */
import type { BaseQueryFn } from "@reduxjs/toolkit/query";

import type { AxiosRequestConfig, AxiosError } from "axios";
import { axiosinstance } from "../lib/axios";

const axiosBaseQuery =
  ({ baseUrl }: { baseUrl: string }): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method = "GET", data, params, headers }) => {
    try {
      const result = await axiosinstance({
  url, // এখানে baseUrl আবার concat করার দরকার নাই, axiosinstance-এ baseURL আগেই দেওয়া আছে
  method,
  data,
  params,
  headers,
});
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export default axiosBaseQuery;
