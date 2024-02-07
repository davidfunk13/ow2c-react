import { Button, Grid, Typography } from "@mui/material";
import { FC } from "react";
import { useGetGamesQuery, useStoreGameMutation } from "../../services/gameApi";
import { DataGrid } from "@mui/x-data-grid";
import Game from "../../types/Game.interface";
import gameTableColumns from "./components/gamesTableColumns";
import AppModal from "../../features/AppModal/AppModal";
import { useAppModal } from "../../features/AppModal/useAppModal";
import { StepType } from "../../features/MultiStepForm/types";
import RHFMultiStepForm from "../../features/MultiStepForm/RHFMultiStepForm";
import { RHFStep1, Step1ValidationSchema } from "../../features/MultiStepForm/RHFStep1";
import { RHFStep2, Step2ValidationSchema } from "../../features/MultiStepForm/RHFStep2";
import { RHFStep3, Step3ValidationSchema } from "../../features/MultiStepForm/RHFStep3";

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
        isLoading: getGamesLoading,
        // handle errors. dispatch snackbar with these
        // isError,
        // error
    } = useGetGamesQuery();
    const { toggleModal } = useAppModal();
    const [storeGame, { isLoading: storeGameLoading }] = useStoreGameMutation();

    const handleStoreGame = async () => {
        try {
            await storeGame(storeGameData);
        } catch (error) {
            console.error("Store Game failed", error);
        }
    };
    const rhfSteps: StepType[] = [
        {
            label: "Name",
            component: RHFStep1,
            initialValues: { firstName: "", lastName: "" },
            validationSchema: Step1ValidationSchema,
        },
        {
            label: "Contact Information",
            component: RHFStep2,
            initialValues: { email: "" },
            validationSchema: Step2ValidationSchema,
        },
        {
            label: "Card Selection",
            component: RHFStep3,
            initialValues: { selectedCard: "" },
            validationSchema: Step3ValidationSchema,
        }
        // Add more steps as needed
    ];
    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant={"h2"}>
                    Games
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Button onClick={handleStoreGame}>
                    Store Game
                </Button>
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
                <RHFMultiStepForm steps={rhfSteps} />
            </AppModal>
        </Grid >
    );
};

export default GamesPage;
