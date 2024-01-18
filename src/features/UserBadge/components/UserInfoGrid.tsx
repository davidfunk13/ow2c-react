import { FC } from "react";
import User from "../../../types/User.type";
import { Divider, Grid, Typography } from "@mui/material";

type UserInfoGridProps = {
    user: User;
};

const UserInfoGrid: FC<UserInfoGridProps> = ({ user }) => {

    return (
        <Grid container alignItems={"center"} spacing={1.5}>
            <Grid item xs={12}>
                <Typography variant={"body2"} fontWeight={"bold"}>
                    User Profile
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={6} pr={2}>
                <Typography variant={"body2"} fontWeight={"bold"}>
                    Battletag:
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant={"body1"}>
                    {user.name}
                </Typography>
            </Grid>
            <Grid item xs={6} pr={2}>
                <Typography variant={"body2"} fontWeight={"bold"}>
                    Sub:
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant={"body1"}>
                    {user.sub}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default UserInfoGrid;