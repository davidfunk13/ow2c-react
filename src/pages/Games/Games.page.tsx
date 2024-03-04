import { Button, Grid, Typography } from "@mui/material";
import { FC } from "react";
import { useGetGamesQuery, useStoreGameMutation } from "../../services/gameApi";
import { DataGrid } from "@mui/x-data-grid";
import Game from "../../types/Game.interface";
import gameTableColumns from "./components/gamesTableColumns";
import AppModal from "../../features/AppModal/AppModal";
import { useAppModal } from "../../features/AppModal/useAppModal";
import { StepType } from "../../features/MultiStepForm/types";
import { selectMapInitialValues, selectMapValidationSchema } from "../../features/MultiStepForm/forms/AddGameForm/SelectMap/selectMapValidationSchema";
import MultiStepForm from "../../features/MultiStepForm/MultiStepForm";
import SelectMap from "../../features/MultiStepForm/forms/AddGameForm/SelectMap/SelectMap";

interface GamesPageProps { }

const GamesPage: FC<GamesPageProps> = () => {
    // Minimum information needed info to store a game.

    // const storeGameData: Partial<Game> = {
    //     result: 1,
    //     map_played: "King’s Row",
    //     hero_played: "Illari",
    //     additional_hero_played_1: "Ana",
    //     additional_hero_played_2: "",
    //     game_mode: 1,
    // };

    const { data: games,
        isLoading: getGamesLoading,
        // handle errors.
        // dispatch snackbar with these in handleStoreGame or something.
        // -----------------------------
        // isError,
        // error
    } = useGetGamesQuery();
    const { toggleModal } = useAppModal();
    const [storeGame, { isLoading: storeGameLoading }] = useStoreGameMutation();

    const handleStoreGame = async (data: Game) => {
        try {
            await storeGame(data);
        } catch (error) {
            console.error("Store Game failed", error);
        }
    };

    const addGameFormSteps: StepType[] = [
        {
            label: "Select Map",
            component: SelectMap,
            initialValues: selectMapInitialValues,
            validationSchema: selectMapValidationSchema,
        }
    ];

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant={"h2"}>
                    Games
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Button onClick={toggleModal}>
                    Add Game
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Typography variant={"h2"}>
                    <DataGrid
                        columns={gameTableColumns}
                        rows={games?.data.length ? games.data : []}
                        loading={getGamesLoading || storeGameLoading}
                        autoHeight
                    />
                </Typography>
            </Grid>
            <AppModal>
                <MultiStepForm submitAction={handleStoreGame} steps={addGameFormSteps} />
            </AppModal>
        </Grid >
    );
};

export default GamesPage;
