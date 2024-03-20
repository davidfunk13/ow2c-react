import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import { FC } from "react";
import { Dashboard, Inbox as InboxIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useAppDrawer } from "./useAppDrawer";
import useAppDrawerStyles from "./useAppDrawerStyles";

interface AppDrawerProps { }

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
    const { drawer } = useAppDrawerStyles();

    return (
        <Drawer
            variant={"permanent"}
            css={drawer}
        >
            {generateDrawerItems()}
        </Drawer>
    );
};

const MobileDrawer: FC<AppDrawerProps> = () => {
    const { isOpen, toggleDrawer } = useAppDrawer();
    const { drawer } = useAppDrawerStyles();

    return (
        <SwipeableDrawer
            elevation={0}
            open={isOpen}
            onClose={toggleDrawer}
            onOpen={toggleDrawer}

            variant={"temporary"}
            css={drawer}
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
