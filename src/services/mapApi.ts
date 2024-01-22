import { baseApi } from "./baseApi";
import OverwatchMap from "../types/OverwatchMap.type";

// function createMapTags(result: { data: OverwatchMap[] } | undefined): Array<{ type: "Map"; id: number | string }> | Array<{ type: "Map"; id: "LIST" }> {
//     if (result?.data) {
//         const tags = result.data
//             .filter((map) => map.id !== undefined)
//             .map(({ id }) => ({ type: "Map", id })) as Array<{ type: "Map"; id: number | string }>;

//         tags.push({ type: "Map", id: "LIST" });
//         return tags;
//     }
//     return [{ type: "Map", id: "LIST" }];
// }

export const mapApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMaps: builder.query<{ data: OverwatchMap[] }, void>({
            query: () => "/api/maps",
            // providesTags: (result) => createMapTags(result),
            providesTags: () => [{ type: "Map", id: "LIST" }],
        })

    }),
});

export const { useGetMapsQuery } = mapApi;
