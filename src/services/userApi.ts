import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL from "../utils/baseUrl";
import User from "../types/User.type";

const baseQuery = fetchBaseQuery({
    baseUrl: `${baseURL}/api`,
    credentials: "include",
});

export const userApi = createApi({
    reducerPath: "api/user",
    baseQuery: async (args, api, extraOptions) => {
        const result = await baseQuery(args, api, extraOptions);

        // Check for unauthorized status and redirect if necessary
        if (result.error && "status" in result.error && (result.error.status === 401 || result.error.status === 419)) {
            // Perform side effect on error
            window.location.href = "/login";
            // You might want to return a standardized error structure here instead of redirecting
        }

        // Return result for all other cases
        return result;
    },
    endpoints: (builder) => ({
        getUser: builder.query<User, void>({
            query: () => "user",
        }),
    }),
});

// Auto-generated hooks and matcher functions
export const { useGetUserQuery } = userApi;
