/** @jsxImportSource @emotion/react */
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import { FC } from "react";
import { Inbox as InboxIcon } from "@mui/icons-material";
import { Mail as MailIcon } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { closeDrawer, openDrawer, selectDrawerOpen } from "../../state/slices/uiSlice";
import styles from "./AppDrawer.styles";

interface AppDrawerProps { }

const { drawerStyles } = styles;

const generateDrawerItems = (): JSX.Element => {
    return (
        <>
            <Toolbar />
            <Box sx={{ overflow: "auto" }}>
                <List>
                    {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
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
    const dispatch = useAppDispatch();
    const drawerOpen = useAppSelector(selectDrawerOpen);

    return (
        <SwipeableDrawer
            elevation={0}
            open={drawerOpen}
            onClose={(): { payload: undefined; type: "state/ui/closeDrawer"; } => dispatch(closeDrawer())}
            onOpen={(): { payload: undefined; type: "state/ui/openDrawer"; } => dispatch(openDrawer())}

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
