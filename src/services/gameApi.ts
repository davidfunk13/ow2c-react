/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL from "../utils/baseUrl";
import Game from "../types/Game.interface";
const baseQuery = fetchBaseQuery({
    baseUrl: `${baseURL}`,
    credentials: "include",
});

const FETCH_ERROR = "FETCH_ERROR";

export const gameApi = createApi({
    reducerPath: "api/games",
    tagTypes: ["Game"],
    baseQuery: async (args, api, extraOptions) => {
        const result = await baseQuery(args, api, extraOptions);

        // Check for unauthorized status and redirect if necessary
        // this likely needs to be handled another way, and seems to mess with the query and mutation urls.
        if (result.error?.status === 401 || result.error?.status === 419 || result.error?.status === FETCH_ERROR) {
            window.location.href = "/login";
        }

        // Return result for all other cases
        return result;
    },
    endpoints: (builder) => ({
        getGames: builder.query<{ data: Game[] }, void>({
            query: () => "/api/games",
            providesTags: (result) =>
                result
                    ? [
                        ...result.data.map(({ id }) => ({ type: "Game" as const, id })),
                        { type: "Game", id: "LIST" },
                    ]
                    : [{ type: "Game", id: "LIST" }],
        }),
        storeGame: builder.mutation<Game, Partial<Game>>({
            query: (post) => ({
                url: "/api/games",
                method: "Post",
                body: post,
            }),
            transformResponse: (response: { data: Game }) => response.data,
            transformErrorResponse: (
                response: { status: string | number },
                // meta,
                // arg
            ) => response.status,
            invalidatesTags: ["Game"],
        }),
    }),
});

export const { useGetGamesQuery, useStoreGameMutation } = gameApi;
