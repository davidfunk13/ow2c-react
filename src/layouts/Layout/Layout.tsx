/** @jsxImportSource @emotion/react */
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import AppDrawer from "../../features/AppDrawer/AppDrawer";
import { Button, Grid, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Outlet, useNavigate } from "react-router-dom";
import UserBadge from "../../features/UserBadge/UserBadge";
import { useGetUserQuery } from "../../services/userApi";
import { dispatchLogout, selectUser } from "../../state/authenticationSlice";
import { useLogoutMutation } from "../../services/authApi";
import { EmptyPromise } from "../../types/EmptyPromise.type";
import { useAppDrawer } from "../../features/AppDrawer/useAppDrawer";
import useLayoutStyles from "./useLayoutStyles";
import ThemeToggle from "../../features/ThemeToggle/ThemeToggle";

interface LayoutProps { }

const Layout: FC<LayoutProps> = () => {
    const [logout] = useLogoutMutation();
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();
    const { appBarStyles } = useLayoutStyles();

    useGetUserQuery(undefined, { skip: user?.id ? true : false });

    const dispatch = useAppDispatch();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

    const OpenMenuButton = (): JSX.Element | null => {
        const { toggleDrawer } = useAppDrawer();
        const { menuIconStyles } = useLayoutStyles();

        return !isDesktop ?
            <Grid item>
                <IconButton onClick={toggleDrawer}>
                    <MenuIcon css={menuIconStyles} />
                </IconButton>
            </Grid>
            : null;
    };

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
                            <ThemeToggle />
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

export default Layout;
