import AuthCheckResponse from "../types/AuthCheckResponse.type";
import baseApi from "./baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        checkAuth: builder.query<AuthCheckResponse, void>({
            query: () => "/auth/check",
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: "/logout",
                method: "POST",
            }),
        }),
    }),
});

export const { useCheckAuthQuery, useLogoutMutation } = authApi;
