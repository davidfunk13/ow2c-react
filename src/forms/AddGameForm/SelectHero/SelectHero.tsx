import { CircularProgress, Grid, Typography } from "@mui/material";
import { FC, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import ImageCard from "../../../components/ImageCard/ImageCard";
import { useGetHeroesQuery } from "../../../services/heroApi";
import { selectHeroInitialValues } from "./selectHeroValidationSchema";

type SelectHeroProps = Record<string, unknown>;

const SelectHero: FC<SelectHeroProps> = () => {
  const { setValue, watch, clearErrors, getValues } = useFormContext();
  const formValues = getValues();
  const { role } = formValues;
  const cardFieldName = Object.keys(selectHeroInitialValues)[0];
  const selectedCard = watch(cardFieldName);
  const { data: heroes, isLoading: heroesLoading, } = useGetHeroesQuery(role.toLowerCase(), { skip: !role });

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
          Select Hero
        </Typography>
      </Grid>
      {heroesLoading && (
        <Grid container>
          <Grid item xs={12}>
            <CircularProgress size={100} />
          </Grid>
        </Grid>
      )}
      <Grid
        container
        item
        display={"flex"}
        xs={12}
        spacing={2}
        maxHeight={500}
        minHeight={500}
        overflow={"auto"}
      >
        {!heroesLoading && heroes?.data?.map((map) => {
          const { id, name, thumbnail_url } = map;
          const isSelected = selectedCard === id;
          return (
            <Grid
              item
              sm={"auto"}
              flexGrow={1}
              key={id}
            >
              <ImageCard
                src={thumbnail_url}
                id={id}
                name={name}
                isSelected={isSelected}
                onCardClick={handleCardClick}
              />
            </Grid>
          );
        }
        )}
      </Grid>
    </Grid>
  );
};

export default SelectHero;
