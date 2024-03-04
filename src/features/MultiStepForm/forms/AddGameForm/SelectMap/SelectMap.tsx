import { FC, useCallback, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { Card, CardActionArea, CardMedia, CardContent, Typography, Grid, CircularProgress, useTheme } from "@mui/material";
import { useGetMapsQuery } from "../../../../../services/mapApi";
import FilterButtons, { FilterOption } from "../../../../FilterButtons/FilterButtons";
import { useAppSelector } from "../../../../../app/hooks";
import { selectFilter } from "../../../../FilterButtons/filterButtonsSlice";
import GameType, { GameTypes } from "../../../../../types/GameTypes.type";
import OverwatchMap from "../../../../../types/OverwatchMap.type";

type MapCardProps = {
  map: OverwatchMap;
  isSelected: boolean;
  onCardClick: (id: number) => void;
};

type SelectMapProps = Record<string, unknown>;

const MapCard: FC<MapCardProps> = ({ map: { id, name }, isSelected, onCardClick }) => {
  const theme = useTheme();
  const { constants: { mediaCardHeight } } = theme;

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
    >
      <Card onClick={() => onCardClick(id)} raised={isSelected}>
        <CardActionArea>
          <CardMedia
            height={mediaCardHeight}
            component={"img"}
            alt={name}
          />
          <CardContent>
            <Typography whiteSpace={"nowrap"}
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
    </Grid>
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
      {!mapsLoading && selectedFilter &&
        filteredMaps?.map((map) => (
          <MapCard
            key={map.id}
            map={map}
            isSelected={selectedCard === map.id}
            onCardClick={handleCardClick}
          />
        ))}
    </Grid>
  );
};

export default SelectMap;
