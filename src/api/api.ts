import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL from "../utils/baseUrl";
import User from "../types/User.type";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: `${baseURL}/api`, credentials: "include" }),
    endpoints: (builder) => ({
        getUser: builder.query<User, void>({
            query: () => "user",
        }),
        // ... other endpoints ...
    }),
});

// Auto-generated hooks and matcher functions
export const { useGetUserQuery } = api;
