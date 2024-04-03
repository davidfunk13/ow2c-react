import GameType from "../types/GameTypes.type";
import OverwatchMap from "../types/OverwatchMap.type";
import { baseApi } from "./baseApi";

export const mapApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMaps: builder.query<{ data: OverwatchMap[] }, GameType | undefined>({
            query: (gameType) => gameType ? `/api/maps/${gameType.toLowerCase()}` : "/api/maps",
            providesTags: ["Map"],
        })
    }),
});

export const { useGetMapsQuery } = mapApi;
