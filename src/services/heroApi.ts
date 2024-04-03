import OverwatchHero, { OverwatchHeroType } from "../types/OverwatchHero.type";
import { baseApi } from "./baseApi";

export const heroApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getHeroes: builder.query<{ data: OverwatchHero[] }, OverwatchHeroType | undefined>({
            query: (heroType) => heroType ? `/api/heroes/${heroType.toLowerCase()}` : "/api/heroes",
            providesTags: ["Hero"],
        })
    }),
});

export const { useGetHeroesQuery } = heroApi;
