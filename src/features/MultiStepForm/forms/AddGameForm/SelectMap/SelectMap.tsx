import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { Card, CardActionArea, CardMedia, CardContent, Typography, Grid, CircularProgress } from "@mui/material";
import { useGetMapsQuery } from "../../../../../services/mapApi";
import FilterButtons, { FilterOption } from "../../../../FilterButtons/FilterButtons";
import { useAppSelector } from "../../../../../app/hooks";
import { selectFilter } from "../../../../FilterButtons/filterButtonsSlice";
import GameType, { GameTypes } from "../../../../../types/GameTypes.type";

// refactor a lot of this to actually fetch maps from the api by filter instead of filter the existing maps.

const SelectMap: FC = () => {
  const { setValue, watch, clearErrors } = useFormContext();
  const selectedCard = watch("map");
  const selectedFilter = useAppSelector(selectFilter);

  const { data: maps,
    isLoading: mapsLoading,
    // handle errors. dispatch snackbar with these
    // you need to actually handle a failure to get the maps.
    // isError,
    // error
  } = useGetMapsQuery(selectedFilter);

  const gameTypeArray: GameType[] = Object.values(GameTypes);
  const filteredMaps = maps?.data.filter((map) => map.type === selectedFilter);

  const handleCardClick = (index: number) => {
    if (selectedCard === index) {
      setValue("map", null);
      clearErrors("map");
    } else {
      setValue("map", index);
      clearErrors("map");
    }
  };

  const filterOptions: FilterOption[] = gameTypeArray.map((type) => {
    return {
      label: type,
      value: type,
    };
  }) || [];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant={"h6"} gutterBottom>
          Select Game Type
        </Typography>
      </Grid>
      {mapsLoading ?
        <Grid container>
          <Grid item xs={12}>
            <CircularProgress size={100} />
          </Grid>
        </Grid> : null}
      <Grid item xs={12}>
        <FilterButtons
          onFilterChange={() => setValue("map", null)}
          options={filterOptions}
        />
      </Grid>
      {!mapsLoading && selectedFilter && filteredMaps?.map((map, index) => {
        return (
          <Grid
            key={map.id}
            item
            xs={12}
            sm={6}
            md={4}
          >
            <Card
              onClick={() => handleCardClick(index)}
              raised={selectedCard === index}
            >
              <CardActionArea>
                <CardMedia
                  component={"img"}
                  height={"3"}
                  alt={map.name}
                />
                <CardContent>
                  <Typography gutterBottom variant={"h5"} component={"div"}>
                    {map.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default SelectMap;
