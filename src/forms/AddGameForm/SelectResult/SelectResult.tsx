import { Grid, Typography } from "@mui/material";
import { FC, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import ImageCard from "../../../components/ImageCard/ImageCard";
import { selectResultInitialValues } from "./selectResultValidationSchema";

type SelectResultProps = Record<string, unknown>;

const SelectResult: FC<SelectResultProps> = () => {
    const { setValue, watch, clearErrors } = useFormContext();
    const cardFieldName = Object.keys(selectResultInitialValues)[0];
    const selectedCard = watch(cardFieldName);
    const isSelected = useCallback((id: number) => selectedCard === id, [selectedCard]);
    const handleCardClick = useCallback((id: number) => {
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
                    Select Game Type
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
                Select Result
            </Typography>
            <Grid
                container
                item
                xs={12}
                spacing={2}
                maxHeight={500}
                minHeight={500}
                overflow={"auto"}
            >
                <Grid
                    item
                    xs={12}
                    sm={6}
                >
                    <ImageCard
                        src={""}
                        id={0}
                        name={"Loss"}
                        isSelected={isSelected(0)}
                        onCardClick={handleCardClick}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={6}
                >
                    <ImageCard
                        src={""}
                        id={0}
                        name={"Win"}
                        isSelected={isSelected(1)}
                        onCardClick={handleCardClick}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={6}
                >
                    <ImageCard
                        src={""}
                        id={0}
                        name={"Draw"}
                        isSelected={isSelected(1)}
                        onCardClick={handleCardClick}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default SelectResult;
