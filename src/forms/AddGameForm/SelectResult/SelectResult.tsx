import { Grid, Typography } from "@mui/material";
import { FC, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import ImageCard from "../../../components/ImageCard/ImageCard";
import { selectResultInitialValues } from "./selectResultValidationSchema";
import baseURL from "../../../utils/baseUrl";

type SelectResultProps = Record<string, unknown>;

const SelectResult: FC<SelectResultProps> = () => {
    const { setValue, watch, clearErrors } = useFormContext();
    const cardFieldName = Object.keys(selectResultInitialValues)[0];
    const selectedCard = watch(cardFieldName);
    const isSelected = useCallback((id: number) => selectedCard === id, [selectedCard]);

    const handleCardClick = useCallback((id: number | string) => {
        if (selectedCard === id) {
            setValue(cardFieldName, null);
            clearErrors(cardFieldName);
            return;
        }

        setValue(cardFieldName, id);
        clearErrors(cardFieldName);
        return;
    }, [selectedCard, setValue, cardFieldName, clearErrors]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant={"h6"} gutterBottom >
                    Select Result
                </Typography>
            </Grid>
            <Typography
                component={Grid}
                container
                item
                xs={12}
                variant={"h6"}
                gutterBottom
            >
                Choose the result of the game
            </Typography>
            <Grid
                container
                item
                xs={12}
                spacing={2}
            >
                <Grid
                    item
                    xs={4}
                >
                    <ImageCard
                        src={baseURL + "/storage/icons/misc/win.webp"}
                        id={1}
                        imageHeight={200}
                        name={"Win"}
                        isSelected={isSelected(1)}
                        onCardClick={handleCardClick}
                    />
                </Grid>
                <Grid
                    item
                    xs={4}
                >
                    <ImageCard
                        imageHeight={200}
                        src={baseURL + "/storage/icons/misc/loss.webp"}
                        id={0}
                        name={"Loss"}
                        isSelected={isSelected(0)}
                        onCardClick={handleCardClick}
                    />
                </Grid>
                <Grid
                    item
                    xs={4}
                >
                    <ImageCard
                        imageHeight={200}
                        src={baseURL + "/storage/icons/misc/draw.webp"}
                        id={2}
                        name={"Draw"}
                        isSelected={isSelected(2)}
                        onCardClick={handleCardClick}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default SelectResult;
