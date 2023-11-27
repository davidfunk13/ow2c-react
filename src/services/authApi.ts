import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL from "../utils/baseUrl";
import AuthCheckResponse from "../types/AuthCheckResponse.type";
const baseQuery = fetchBaseQuery({
    baseUrl: `${baseURL}`,
    credentials: "include",
});

const FETCH_ERROR = "FETCH_ERROR";

export const authApi = createApi({
    reducerPath: "api/auth",
    baseQuery: async (args, api, extraOptions) => {
        const result = await baseQuery(args, api, extraOptions);
        // Check for unauthorized status and redirect if necessary
        if (result.error?.status === 401 || result.error?.status === 419 || result.error?.status === FETCH_ERROR) {
            window.location.href = "/login";
        }

        // Return result for all other cases
        return result;
    },
    endpoints: (builder) => ({
        checkAuth: builder.query<AuthCheckResponse, void>({
            query: () => "/api/auth/check",
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: "/api/logout",
                method: "POST",
            }),
        }),
    }),
});

export const { useCheckAuthQuery, useLogoutMutation } = authApi;
