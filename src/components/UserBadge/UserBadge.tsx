/** @jsxImportSource @emotion/react */
import { FC, Fragment, useRef, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectUser, selectUserLoading } from "../../state/slices/userSlice";
import { Badge, Box, Card, CircularProgress, Divider, Grid, IconButton, Typography, useTheme } from "@mui/material";
import { AccountCircle as AccountCircleIcon, TaxiAlert } from "@mui/icons-material";
import styles from "./UserBadge.styles";
import User from "../../types/User.type";

interface UserBadgeProps { }

const UserInfoGrid: FC<{ user: User }> = ({ user }) => {

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

const UserBadgeContent: FC<{ userLoading: boolean, user: User, showCard: boolean, onClick: () => void }> = ({ userLoading, user, showCard, onClick }) => {
    const badgeRef = useRef<HTMLButtonElement>(null);
    const theme = useTheme();
    const { relativeAnchorStyles, userBadgeCardStyles } = styles;

    if (userLoading) {
        return <CircularProgress thickness={4} color={"secondary"} />;
    }

    if (user?.name) {
        return (
            <Box component={"div"} css={relativeAnchorStyles}>
                <IconButton color={"inherit"} onClick={onClick} ref={badgeRef}>
                    <Badge color={"secondary"} variant={"standard"}>
                        <AccountCircleIcon fontSize={"large"} />
                    </Badge>
                </IconButton>
                {showCard && (
                    <Card variant={"outlined"} css={userBadgeCardStyles(theme)}>
                        <UserInfoGrid user={user} />
                    </Card>
                )}
            </Box>
        );
    }

    return <TaxiAlert color={"error"} />;
};

const UserBadge: FC<UserBadgeProps> = () => {
    const user = useAppSelector(selectUser);
    const userLoading = useAppSelector(selectUserLoading);
    const [showCard, setShowCard] = useState<boolean>(false);

    const handleBadgeClick = (): void => {
        setShowCard(!showCard);
    };

    // maybe return a not found component here? idk. if there's no user,
    // there shouldnt be a way to see this anyway
    if (!user) {
        return null;
    }

    return (
        <Fragment>
            <UserBadgeContent
                userLoading={userLoading}
                user={user}
                showCard={showCard}
                onClick={handleBadgeClick}
            />
        </Fragment>
    );
};

export default UserBadge;
