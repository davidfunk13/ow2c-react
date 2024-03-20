import { FC, Fragment, useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";
import UserBadgeContent from "./components/UserBadgeContent";

interface UserBadgeProps { }

const UserBadge: FC<UserBadgeProps> = () => {
    const [showCard, setShowCard] = useState<boolean>(false);
    const { user, userLoading } = useAuthentication();

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
