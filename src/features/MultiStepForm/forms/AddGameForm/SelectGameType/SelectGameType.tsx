import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import ControlCardImage from "../../../../../assets/icons/control-card.webp";
import EscortCardImage from "../../../../../assets/icons/escort-card.webp";
import HybridCardImage from "../../../../../assets/icons/hybrid-card.webp";
import PushCardImage from "../../../../../assets/icons/push-card.webp";
import FlashpointCardImage from "../../../../../assets/icons/flashpoint-card.webp";
import ResponsiveGrid from "../../../../../components/ResponsiveGrid/ResponsiveGrid";
import GameType from "../../../../../types/GameTypes.type";
import { get } from "http";

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
    selected?: boolean;
    onClick: () => void;
};

const CardItem: FC<CardItemProps> = ({ image, title, onClick, error, selected = false }) => {
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
    const { register, setValue, watch, formState: { errors }, getValues } = useFormContext();
    const selectedOption = watch("selectedOption");

    // Handle button click
    const handleSelect = (title: string) => {
        // If already selected, unselect
        if (selectedOption === title) {
            setValue("selectedOption", null);
            return;
        }
        setValue("selectedOption", title, { shouldValidate: true });
    };

    const cardItems = gameTypes.map((item) => (
        <CardItem
            key={item.name}
            selected={item.name === selectedOption}
            error={!!errors.gameType}
            image={item.image}
            title={item.name}
            onClick={() => handleSelect(item.name)}
        />
    ));

    // Effect for re-registering the field and setting its value when component mounts
    useEffect(() => {
        register("selectedOption", { required: "You must select an option" });

        // Set the value from the form state (useful when navigating back to this step)
        const currentValue = getValues("selectedOption");
        if (currentValue) {
            setValue("selectedOption", currentValue);
        }
    }, [register, setValue, getValues]);
console.log(getValues(), errors);
    return (
        <div>
            {cardItems ? <ResponsiveGrid items={cardItems} /> : null}
            {errors.selectedOption && <span style={{ color: "red" }}>{errors.selectedOption.message?.toString()}</span>}
        </div>
    );
};

export default SelectGameType;
