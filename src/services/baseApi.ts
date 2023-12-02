import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL from "../utils/baseUrl";

// Define the base query with the necessary configurations
const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  credentials: "include",
  prepareHeaders: (headers) => {
    const cookieValue = document.cookie
    .split("; ")
    .find(row => row.startsWith("XSRF-TOKEN="))
    ?.split("=")[1];

  if (cookieValue) {
    const csrfToken = decodeURIComponent(cookieValue);
    headers.set("X-XSRF-TOKEN", csrfToken);
  }
  headers.set("Accept", "application/json");
  return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: ["Game"],
  endpoints: (builder) => ({
    getCsrfToken: builder.mutation<void, void>({
      queryFn: async () => {
        await fetch(`${baseURL}/sanctum/csrf-cookie`, {
          credentials: "include",
        });
        return { data: void 0 }; // No data is expected to be returned
      },
    })
  }),
});

export const { useGetCsrfTokenMutation } = baseApi;

export default baseApi;
