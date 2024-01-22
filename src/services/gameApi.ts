import Game from "../types/Game.interface";
import { baseApi } from "./baseApi";

// function createGameTags(result: { data: Game[] } | undefined): Array<{ type: "Game"; id: number | string }> | Array<{ type: "Game"; id: "LIST" }> {
//     if (result?.data) {
//         const tags = result.data
//             .filter((game) => game.id !== undefined)
//             .map(({ id }) => ({ type: "Game", id })) as Array<{ type: "Game"; id: number | string }>;

//         tags.push({ type: "Game", id: "LIST" });
//         return tags;
//     }
//     return [{ type: "Game", id: "LIST" }];
// }

const gameApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getGames: builder.query<{ data: Game[] }, void>({
            query: () => "/api/games",
            // providesTags: (result) => createGameTags(result),
            providesTags: () => [{ type: "Game", id: "LIST" }],
        }),
        storeGame: builder.mutation<{ data: Game }, Partial<Game>>({
            query: (post) => ({
                url: "/api/games",
                method: "POST",
                body: post,
            }),
            invalidatesTags: [{ type: "Game", id: "LIST" }],
        }),
    }),
});

export const { useGetGamesQuery, useStoreGameMutation } = gameApi;
