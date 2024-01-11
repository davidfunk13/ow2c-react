/** @jsxImportSource @emotion/react */
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import { FC } from "react";
import { Inbox as InboxIcon } from "@mui/icons-material";
import { Mail as MailIcon } from "@mui/icons-material";
import styles from "./AppDrawer.styles";
import { Link } from "react-router-dom";
import { useAppDrawer } from "./appDrawerHooks";

interface AppDrawerProps { }

//convert these styles to new hook pattern.
const { drawerStyles } = styles;

const generateDrawerItems = (): JSX.Element => {
    return (
        <>
            <Toolbar />
            <Box sx={{ overflow: "auto" }}>
                <List>
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
                <List>
                    {["All mail", "Trash", "Spam"].map((text, index) => (
                        <ListItem key={text}
                            disablePadding
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
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
