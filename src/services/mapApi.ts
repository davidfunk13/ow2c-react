import { baseApi } from "./baseApi";
import OverwatchMap from "../types/OverwatchMap.type";
import GameType from "../types/GameTypes.type";

export const mapApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMaps: builder.query<{ data: OverwatchMap[] }, GameType | undefined>({
            query: (gameType) => gameType ? `/api/maps/${gameType.toLowerCase()}` : "/api/maps",
            providesTags: ["Map"],
        })

    }),
});

export const { useGetMapsQuery } = mapApi;
