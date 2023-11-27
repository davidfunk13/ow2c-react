import { Button, Grid, Typography } from "@mui/material";
import { FC } from "react";
import { useGetGamesQuery, useStoreGameMutation } from "../../services/gameApi";
import { DataGrid } from "@mui/x-data-grid";
import Game from "../../types/Game.interface";

interface GamesPageProps { }

const GamesPage: FC<GamesPageProps> = () => {
    const storeGameData: Partial<Game> = {
        result: 1,
        map_played: "King’s Row",
        hero_played: "Illari",
        additional_hero_played_1: "Ana",
        additional_hero_played_2: "",
        game_mode: 1,
    };
    const { data: games,
        // isLoading: getGamesLoading,
        // isError,
        // error
    } = useGetGamesQuery();

    const [storeGame,
        // { isLoading: storeGameLoading },
    ] = useStoreGameMutation();

    const handleStoreGame = async () => {
        try {
            await storeGame(storeGameData);
        } catch (error) {
            console.error("Store Game failed", error);
        }
    };
    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant={"h2"}>
                    Games
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Button onClick={handleStoreGame}>Store Game</Button>
            </Grid>

            <Grid item xs={12}>
                <Typography variant={"h2"}>
                    <DataGrid
                        columns={[
                            {
                                field: "id",
                                headerName: "ID",
                                width: 70
                            },
                            {
                                headerName: "Game Type",
                                field: "game_type",
                                width: 130
                            },
                            {
                                headerName: "Result",
                                field: "result",
                                width: 130
                            },
                            {
                                headerName: "Map",
                                field: "map_played",
                                width: 130
                            },
                            {
                                headerName: "Hero",
                                field: "hero_played",
                                width: 130
                            },
                            {
                                headerName: "Additional Hero 1",
                                field: "additional_hero_played_1",
                                width: 130
                            },
                            {
                                headerName: "Additional Hero 2",
                                field: "additional_hero_played_2",
                                width: 130
                            },
                            {
                                headerName: "Game Mode",
                                field: "game_mode",
                                width: 130
                            },
                            {
                                headerName: "Date",
                                field: "created_at",
                                width: 130
                            },
                            {
                                headerName: "Updated",
                                field: "updated_at",
                                width: 130
                            },
                            {
                                headerName: "Deleted",
                                field: "deleted_at",
                                width: 130
                            },
                        ]}
                        rows={games?.data.length ? games.data : []}
                    />

                </Typography>
            </Grid>
        </Grid >
    );
};

export default GamesPage;
