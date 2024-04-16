import OverwatchHero, { OverwatchHeroTypeIdEnum } from "../types/OverwatchHero.type";
import { baseApi } from "./baseApi";

export const heroApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getHeroes: builder.query<{ data: OverwatchHero[] }, OverwatchHeroTypeIdEnum | undefined>({
            query: (typeId) => typeId ? `/api/heroes/${typeId}` : "/api/heroes",
            providesTags: ["Hero"],
        })
    }),
});

export const { useGetHeroesQuery } = heroApi;
