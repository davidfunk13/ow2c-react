import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import ControlCardImage from "../../../../../assets/icons/control-card.webp";
import EscortCardImage from "../../../../../assets/icons/escort-card.webp";
import HybridCardImage from "../../../../../assets/icons/hybrid-card.webp";
import PushCardImage from "../../../../../assets/icons/push-card.webp";
import FlashpointCardImage from "../../../../../assets/icons/flashpoint-card.webp";
import ResponsiveGrid from "../../../../../components/ResponsiveGrid/ResponsiveGrid";
import GameType from "../../../../../types/GameTypes.type";

type GameTypesMap = { name: GameType, image: string }[];

const gameTypes: GameTypesMap = [
    { name: "Control", image: ControlCardImage },
    { name: "Escort", image: EscortCardImage },
    { name: "Hybrid", image: HybridCardImage },
    { name: "Push", image: PushCardImage },
    { name: "Flashpoint", image: FlashpointCardImage }
];

type CardItemProps = {
    image: string;
    title: string;
    error: boolean;
    selected: boolean;
    onClick: () => void;
};

const CardItem: FC<CardItemProps> = ({ image, title, onClick, error, selected }) => {
    return (
        <Card
            variant={selected ? "elevation" : "outlined"}
            onClick={onClick}
            sx={{
                cursor: "pointer",
                borderColor: error ? "red" : "default", // Change border color based on error
            }}
        >
            <CardMedia
                component={"img"}
                height={"140"}
                image={image}
                alt={title}
            />
            <CardContent>
                <Typography gutterBottom variant={"h5"} component={"div"}>
                    {title}
                </Typography>
            </CardContent>
        </Card>
    );
};

type SelectGameTypeProps = Record<string, unknown>;

const SelectGameType: FC<SelectGameTypeProps> = () => {
    const [selectedGameType, setSelectedGameType] = useState<GameType | null>(null);
    const { register, setValue, clearErrors, formState: { errors }, getValues } = useFormContext();

    const handleSelectGameType = (gameType: GameType) => {
        // if already selected, unselect
        if (selectedGameType === gameType) {
            setSelectedGameType(null);
            setValue("gameType", null);
            return;
        }

        setSelectedGameType(gameType);
        setValue("gameType", gameType, { shouldValidate: true });
        clearErrors("gameType");
    };

    useEffect(() => {
        register("gameType", { required: "Must Select a Game Type", shouldUnregister: false });
        console.log(getValues("gameType"));
    }, [register]);
    const cardItems = gameTypes.map((item) => (
        <CardItem
            key={item.name}
            selected={item.name === selectedGameType}
            error={!!errors.gameType}
            image={item.image}
            title={item.name}
            onClick={() => handleSelectGameType(item.name)}
        />
    ));

    useEffect(() => {
        const gameType = getValues("gameType");

        if (gameType) {
            setSelectedGameType(gameType);
        }

    }, [getValues]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant={"h4"}>Select Game Type</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant={"body1"}>Select the game type you are playing.</Typography>
            </Grid>
            <Grid item xs={12}>
                <ResponsiveGrid items={cardItems} />
            </Grid>
            <Grid item xs={12}>
                <Typography color={"error"} variant={"body1"}>
                    {errors.gameType?.message?.toString()}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default SelectGameType;
