import { FC } from "react";
import { Grid, Typography } from "@mui/material";

interface DashboardPageProps { }

const DashboardPage: FC<DashboardPageProps> = () => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant={"h1"}>
                    Dashboard
                </Typography>
            </Grid>
        </Grid>
    );
};

export default DashboardPage;
