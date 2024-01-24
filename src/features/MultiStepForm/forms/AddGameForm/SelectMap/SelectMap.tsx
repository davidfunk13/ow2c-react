import { Card, Grid, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useGetMapsQuery } from "../../../../../services/mapApi";
import OverwatchMap from "../../../../../types/OverwatchMap.type";
import ResponsiveGrid from "../../../../../components/ResponsiveGrid/ResponsiveGrid";
import { useEffect } from "react";
// import ResponsiveGrid from "../../../../../components/ResponsiveGrid/ResponsiveGrid";
type SelectMapProps = Record<string, unknown>;

const SelectMap: React.FC<SelectMapProps> = () => {
    const { register, formState: { errors }, getValues, unregister } = useFormContext();
    const gameType = getValues("selectedOption");
    const { data, isFetching, isLoading } = useGetMapsQuery(gameType);

    useEffect(() => {
        register("map", { required: "Map selection is required" });
        return () => {
            unregister("map");
        };
    }, [register, unregister]);

    const mapItems = data?.data?.map((map: OverwatchMap, index: number) => (
        <Card key={`${map.name}-${index}`}>
            <Typography>{map.name}</Typography>
        </Card>
    ));

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant={"h4"}>Select Map</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant={"body1"}>Select the map you are playing on</Typography>
            </Grid>
            <Grid item xs={12}>
                {mapItems ? <ResponsiveGrid items={mapItems} /> : null}
            </Grid>
            <Grid item xs={12}>
                <Typography color={"error"} variant={"body1"}>
                    {errors.map?.message?.toString()}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default SelectMap;
