import { Grid, Typography } from "@mui/material";
import { FC, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import ImageCard from "../../../components/ImageCard/ImageCard";
import baseURL from "../../../utils/baseUrl";
import { selectRoleInitialValues } from "./selectRoleValidationSchema";
import { OverwatchHeroTypeEnum } from "../../../types/OverwatchHero.type";

type SelectRoleProps = Record<string, unknown>;

const SelectRole: FC<SelectRoleProps> = () => {
    const { setValue, watch, clearErrors } = useFormContext();
    const cardFieldName = Object.keys(selectRoleInitialValues)[0];

    const selectedCard = watch(cardFieldName);
    const isSelected = useCallback((id: string | number) => selectedCard === id, [selectedCard]);

    const handleCardClick = useCallback((id: string | number) => {
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
                Choose the Role you&apos;re playing
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
                        src={baseURL + "/storage/icons/roles/tank.webp"}
                        id={OverwatchHeroTypeEnum.Tank.toString()}
                        name={OverwatchHeroTypeEnum.Tank.toString()}
                        imageHeight={200}
                        isSelected={isSelected(OverwatchHeroTypeEnum.Tank)}
                        onCardClick={handleCardClick}
                    />
                </Grid>
                <Grid
                    item
                    xs={4}
                >
                    <ImageCard
                        src={baseURL + "/storage/icons/roles/damage.webp"}
                        id={OverwatchHeroTypeEnum.Damage.toString()}
                        name={OverwatchHeroTypeEnum.Damage.toString()}
                        imageHeight={200}
                        isSelected={isSelected(OverwatchHeroTypeEnum.Damage)}
                        onCardClick={handleCardClick}
                    />
                </Grid>
                <Grid
                    item
                    xs={4}
                >
                    <ImageCard
                        src={baseURL + "/storage/icons/roles/support.webp"}
                        id={OverwatchHeroTypeEnum.Support.toString()}
                        name={OverwatchHeroTypeEnum.Support.toString()}
                        imageHeight={200}
                        isSelected={isSelected(OverwatchHeroTypeEnum.Support)}
                        onCardClick={handleCardClick}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default SelectRole;
