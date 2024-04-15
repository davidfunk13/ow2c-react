import Game from "../types/Game.interface";
import { baseApi } from "./baseApi";

const gameApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getGames: builder.query<{ data: Game[] }, void>({
            query: () => "/api/games",
            providesTags: () => [{ type: "Game", id: "LIST" }],
        }),
        storeGame: builder.mutation<{ data: Game }, Partial<Game>>({
            query: (game) => {

                // TODO: add game mode to add game flow somewhere and remove this.
                game.game_mode = 1;

                return {
                    url: "/api/games",
                    method: "POST",
                    body: game,
                };
            },

            invalidatesTags: [{ type: "Game", id: "LIST" }],
        }),
    }),
});

export const { useGetGamesQuery, useStoreGameMutation } = gameApi;
