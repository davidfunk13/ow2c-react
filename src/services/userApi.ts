// src/services/userApi.ts
import { baseApi } from "./baseApi";
import User from "../types/User.type";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, void>({
      query: () => "/api/user",
    }),
  }),
});

export const { useGetUserQuery } = userApi;
