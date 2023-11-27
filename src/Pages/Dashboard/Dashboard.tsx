/** @jsxImportSource @emotion/react */
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import AppDrawer from "../../components/AppDrawer/AppDrawer";
import { Button, Grid, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toggleDrawer } from "../../state/slices/uiSlice";
import { css } from "@emotion/react";
import { Outlet, useNavigate } from "react-router-dom";
import UserBadge from "../../components/UserBadge/UserBadge";
import { useGetUserQuery } from "../../services/userApi";
import { dispatchLogout, selectUser } from "../../state/slices/authenticationSlice";
import { useLogoutMutation } from "../../services/authApi";
import { EmptyPromise } from "../../types/EmptyPromise.type";

interface DashboardProps { }

const Dashboard: FC<DashboardProps> = () => {
    const [logout] = useLogoutMutation();
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();
    useGetUserQuery(undefined, { skip: user?.id ? true : false });

    const dispatch = useAppDispatch();
    const theme = useTheme();
    const menuIconStyle = css`color: ${theme.palette.common.white}`;
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

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
            await logout();
            dispatch(dispatchLogout());
            navigate("/login");
        } catch (error) {
            console.error("Logout failed", error);
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
                {/* This is where /games content will render */}
                <Outlet />
            </Box>
        </Box >
    );
};

export default Dashboard;
