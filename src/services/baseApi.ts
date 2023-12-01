import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL from "../utils/baseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseURL}/api`,
  credentials: "include",
    prepareHeaders: (headers) => {
      const csrfToken = document.cookie.split("; ").find(row => row.startsWith("XSRF-TOKEN"))?.split("=")[1];
      if (csrfToken) {
        headers.set("X-XSRF-TOKEN", csrfToken);
      }

      return headers;
    },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["Game"],
  baseQuery: baseQuery,
  endpoints: () => ({}),
});

export default baseApi;
