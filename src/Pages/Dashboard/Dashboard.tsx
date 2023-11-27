/** @jsxImportSource @emotion/react */
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import AppDrawer from "../../components/AppDrawer/AppDrawer";
import { Button, Grid, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useAppDispatch } from "../../app/hooks";
import { toggleDrawer } from "../../state/slices/uiSlice";
import { css } from "@emotion/react";
import axios from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { EmptyPromise } from "../../types/EmptyPromise.type";
import UserBadge from "../../components/UserBadge/UserBadge";
import { useGetUserQuery } from "../../api/api";

interface DashboardProps { }

const Dashboard: FC<DashboardProps> = () => {
    // Get the user from the API
    useGetUserQuery();

    const dispatch = useAppDispatch();
    const theme = useTheme();
    const menuIconStyle = css`color: ${theme.palette.common.white}`;
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
    const navigate = useNavigate();

    const OpenMenuButton = (): JSX.Element | null => {
        return !isDesktop ?
            <Grid item>
                <IconButton onClick={(): { payload: undefined, type: "state/ui/toggleDrawer" } => dispatch(toggleDrawer())}>
                    <MenuIcon css={menuIconStyle} />
                </IconButton>
            </Grid> : null;
    };

    const appBarStyles = css`z-index: ${theme.zIndex.drawer + 1}`;

    const handleLogout = async (): EmptyPromise => {
        try {
            await axios.post("/logout");
            navigate("/");
        } catch (error) {
            //logout error
            console.error({ error });
        }
    };

    return (
        <Box display={"flex"}>
            <AppBar elevation={0} position={"fixed"} css={appBarStyles}>
                <Toolbar>
                    <Grid
                        container
                        spacing={4}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                    >
                        <OpenMenuButton />
                        <Grid item component={"div"} flexGrow={1}>
                            <Typography variant={"h5"} noWrap>
                                Overwatch 2 Companion
                            </Typography>
                        </Grid>
                        <Grid item>
                            <UserBadge />
                        </Grid>
                        <Grid item>
                            <Button onClick={handleLogout} variant={"contained"} color={"secondary"}>
                                Logout
                            </Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <AppDrawer />
            <Box component={"main"} sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
            </Box>
        </Box >
    );
};

export default Dashboard;
