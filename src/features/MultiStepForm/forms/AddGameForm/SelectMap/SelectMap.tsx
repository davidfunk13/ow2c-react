/** @jsxImportSource @emotion/react */
import { FC, useCallback, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { Card, CardActionArea, CardMedia, CardContent, Typography, Grid, CircularProgress, useTheme } from "@mui/material";
import { useGetMapsQuery } from "../../../../../services/mapApi";
import FilterButtons, { FilterOption } from "../../../../FilterButtons/FilterButtons";
import { useAppSelector } from "../../../../../app/hooks";
import { selectFilter } from "../../../../FilterButtons/filterButtonsSlice";
import GameType, { GameTypes } from "../../../../../types/GameTypes.type";
import OverwatchMap from "../../../../../types/OverwatchMap.type";
import snakeCase from "../../../../../utils/snakeCase";
import useSelectMapStyles from "./useSelectMapStyles";

type MapCardProps = {
  map: OverwatchMap;
  isSelected: boolean;
  onCardClick: (id: number) => void;
};

type SelectMapProps = Record<string, unknown>;

// refactor this into a re-usable card.
const MapCard: FC<MapCardProps> = ({ map: { id, name }, isSelected, onCardClick }) => {
  const theme = useTheme();
  const classes = useSelectMapStyles();
  const { constants: { mediaCardHeight } } = theme;

  return (
    <Card
      onClick={() => onCardClick(id)} variant={"outlined"}
      css={isSelected ? classes.cardIsSelected : undefined}
    >
      <CardActionArea>
        <CardMedia
          height={mediaCardHeight}
          component={"img"}
          alt={name}
          image={`src/assets/maps/${snakeCase(name)}.webp`}
        />
        <CardContent>
          <Typography
            whiteSpace={"nowrap"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            gutterBottom
            variant={"subtitle1"}
          >
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const SelectMap: FC<SelectMapProps> = () => {
  const { setValue, watch, clearErrors } = useFormContext();
  const selectedCard = watch("map");
  const selectedFilter = useAppSelector(selectFilter);
  const { data: maps, isLoading: mapsLoading } = useGetMapsQuery(selectedFilter);
  const gameTypeArray: GameType[] = Object.values(GameTypes);
  const filteredMaps = useMemo(() => maps?.data.filter(({ type }) => type === selectedFilter), [maps?.data, selectedFilter]);

  const handleCardClick = useCallback((id: number) => {
    if (selectedCard === id) {
      setValue("map", null);
      clearErrors("map");
      return;
    }

    setValue("map", id);
    clearErrors("map");
    return;
  }, [selectedCard, setValue, clearErrors]);

  const filterOptions: FilterOption[] = useMemo(() => gameTypeArray.map((type) => ({ label: type, value: type })), [gameTypeArray]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
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
        <FilterButtons onFilterChange={() => setValue("map", null)} options={filterOptions} />
      </Grid>
      <Typography component={Grid} container item
        xs={12}
        variant={"h6"} gutterBottom
      >
        Select Map
      </Typography>
      <Grid container item xs={12}
        spacing={2}
        sx={{ maxHeight: 500, minHeight: 500, overflowY: "auto" }}
      >
        {!mapsLoading && selectedFilter &&
          filteredMaps?.map((map) => (
            <Grid
              item
              xs={12}
              sm={6}
              key={map.id}
            >
              <MapCard
                map={map}
                isSelected={selectedCard === map.id}
                onCardClick={handleCardClick}
              />
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
};

export default SelectMap;
