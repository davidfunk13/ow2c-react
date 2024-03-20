import { FC, useRef } from "react";
import useUserBadgeStyles from "../useUserBadgeStyles";
import { Badge, Box, Card, CircularProgress, IconButton } from "@mui/material";
import User from "../../../types/User.type";
import { AccountCircle as AccountCircleIcon, TaxiAlert } from "@mui/icons-material";
import UserInfoGrid from "./UserInfoGrid";

type UserBadgeContentProps = {
    userLoading: boolean;
    user: User;
    showCard: boolean;
    onClick: () => void;
};

const UserBadgeContent: FC<UserBadgeContentProps> = ({ userLoading, user, showCard, onClick }) => {
    const badgeRef = useRef<HTMLButtonElement>(null);
    const {relativeAnchorStyles, userBadgeCardStyles} = useUserBadgeStyles();

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
                    <Card variant={"outlined"} css={userBadgeCardStyles}>
                        <UserInfoGrid user={user} />
                    </Card>
                )}
            </Box>
        );
    }

    return <TaxiAlert color={"error"} />;
};
export default UserBadgeContent;
