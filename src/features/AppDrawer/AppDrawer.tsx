/** @jsxImportSource @emotion/react */
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import { FC } from "react";
import { Dashboard, Inbox as InboxIcon } from "@mui/icons-material";
import styles from "./AppDrawer.styles";
import { Link } from "react-router-dom";
import { useAppDrawer } from "./useAppDrawer";

interface AppDrawerProps { }

//convert these styles to new hook pattern.
const { drawerStyles } = styles;

const generateDrawerItems = (): JSX.Element => {
    return (
        <>
            <Toolbar />
            <Box sx={{ overflow: "auto" }}>
                <List>
                    <ListItem key={"dashboard"} disablePadding >
                        <ListItemButton component={Link} to={"/"}>
                            <ListItemIcon>
                                <Dashboard />
                            </ListItemIcon>
                            <ListItemText primary={"Dashboard"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={"games"} disablePadding >
                        <ListItemButton component={Link} to={"/games"}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Games"} />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
            </Box>
        </>
    );
};

const DesktopDrawer: FC<AppDrawerProps> = () => {
    return (
        <Drawer
            variant={"permanent"}
            css={drawerStyles}
        >
            {generateDrawerItems()}
        </Drawer>
    );
};

const MobileDrawer: FC<AppDrawerProps> = () => {
    const { isOpen, toggleDrawer } = useAppDrawer();

    return (
        <SwipeableDrawer
            elevation={0}
            open={isOpen}
            onClose={toggleDrawer}
            onOpen={toggleDrawer}

            variant={"temporary"}
            css={drawerStyles}
        >
            {generateDrawerItems()}
        </SwipeableDrawer>
    );
};

const AppDrawer: FC<AppDrawerProps> = () => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

    return isDesktop ? <DesktopDrawer /> : <MobileDrawer />;
};

export default AppDrawer;
