import { CircularProgress, Grid, Typography } from "@mui/material";
import { FC, useCallback, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useAppSelector } from "../../../app/hooks";
import ImageCard from "../../../components/ImageCard/ImageCard";
import FilterButtons, { FilterOption } from "../../../features/FilterButtons/FilterButtons";
import { selectFilter } from "../../../features/FilterButtons/filterButtonsSlice";
import { useGetMapsQuery } from "../../../services/mapApi";
import GameType, { GameTypes } from "../../../types/GameTypes.type";

import { selectMapInitialValues } from "./selectMapValidationSchema";

type SelectMapProps = Record<string, unknown>;

const SelectMap: FC<SelectMapProps> = () => {
  const { setValue, watch, clearErrors } = useFormContext();
  const cardFieldName = Object.keys(selectMapInitialValues)[0];
  const selectedCard = watch(cardFieldName);
  const selectedFilter = useAppSelector(selectFilter);
  const { data: maps, isLoading: mapsLoading } = useGetMapsQuery(selectedFilter);
  const gameTypeArray: GameType[] = Object.values(GameTypes);
  const filteredMaps = useMemo(() => maps?.data.filter(({ type }) => type === selectedFilter), [maps?.data, selectedFilter]);

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

  const filterOptions: FilterOption[] = useMemo(() => gameTypeArray.map((type) => ({ label: type, value: type })), [gameTypeArray]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} >
        <Typography variant={"h6"} gutterBottom>
          Select Game Type
        </Typography>
      </Grid>
      {mapsLoading && (
        <Grid container>
          <Grid item xs={12}>
            <CircularProgress size={100} />
          </Grid>
        </Grid>
      )}
      <Grid item xs={12}>
        <FilterButtons
          onFilterChange={() => setValue("map", null)}
          options={filterOptions}
        />
      </Grid>
      <Typography
        component={Grid}
        container
        item
        xs={12}
        variant={"h6"}
        gutterBottom
      >
        Select Map
      </Typography>
      <Grid
        container
        item
        xs={12}
        spacing={2}
        sx={{ maxHeight: 500, minHeight: 500, overflowY: "auto" }}
      >
        {!mapsLoading && selectedFilter &&
          filteredMaps?.map((map) => {
            const { id, name, thumbnail_url } = map;
            const isSelected = selectedCard === id;
            return (
              <Grid
                item
                xs={12}
                sm={6}
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

export default SelectMap;
