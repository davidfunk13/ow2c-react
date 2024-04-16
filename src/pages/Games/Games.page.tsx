import { Button, Grid, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { FC } from "react";
import AppModal from "../../features/AppModal/AppModal";
import { useAppModal } from "../../features/AppModal/useAppModal";
import MultiStepForm from "../../features/MultiStepForm/MultiStepForm";
import { StepType } from "../../features/MultiStepForm/types";
import SelectHero from "../../forms/AddGameForm/SelectHero/SelectHero";
import { selectHeroInitialValues, selectHeroValidationSchema } from "../../forms/AddGameForm/SelectHero/selectHeroValidationSchema";
import SelectMap from "../../forms/AddGameForm/SelectMap/SelectMap";
import { selectMapInitialValues, selectMapValidationSchema } from "../../forms/AddGameForm/SelectMap/selectMapValidationSchema";
import SelectResult from "../../forms/AddGameForm/SelectResult/SelectResult";
import { selectResultInitialValues, selectResultValidationSchema } from "../../forms/AddGameForm/SelectResult/selectResultValidationSchema";
import { useGetGamesQuery, useStoreGameMutation } from "../../services/gameApi";
import Game from "../../types/Game.interface";
import gameTableColumns from "./components/gamesTableColumns";
import SelectRole from "../../forms/AddGameForm/SelectRole/SelectRole";
import { selectRoleInitialValues, selectRoleValidationSchema } from "../../forms/AddGameForm/SelectRole/selectRoleValidationSchema";

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
            label: "Select Role",
            component: SelectRole,
            initialValues: selectRoleInitialValues,
            validationSchema: selectRoleValidationSchema,
        },
        {
            label: "Select Map",
            component: SelectMap,
            initialValues: selectMapInitialValues,
            validationSchema: selectMapValidationSchema,
        },
        {
            label: "Select Hero",
            component: SelectHero,
            initialValues: selectHeroInitialValues,
            validationSchema: selectHeroValidationSchema,
        },
        {
            label: "Select Result",
            component: SelectResult,
            initialValues: selectResultInitialValues,
            validationSchema: selectResultValidationSchema,
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
