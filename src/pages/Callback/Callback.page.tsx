import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckAuthQuery } from "../../services/authApi";
import { useAppSelector } from "../../app/hooks";
import { selectIsAuthenticated } from "../../state/authenticationSlice";
import { CircularProgress, Grid, Typography } from "@mui/material";

interface CallbackPageProps {

}

const CallbackPage: FC<CallbackPageProps> = () => {
    const navigate = useNavigate();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);

    useCheckAuthQuery(undefined, { skip: isAuthenticated });

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [
        navigate,
        isAuthenticated
    ]);

    return (
        <Grid
            marginTop={50}
            container
            spacing={4}
            justifyContent={"center"}
            alignItems={"center"}
            style={{ height: "100%" }}
        >
            <Grid item xs={12}>
                <Typography variant={"h4"} align={"center"}>
                    Authenticating...
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <CircularProgress size={100} style={{ display: "block", marginLeft: "auto", marginRight: "auto" }} />
            </Grid>
        </Grid>
    );
};

export default CallbackPage;
