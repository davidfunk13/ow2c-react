import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckAuthQuery } from "../../services/authApi";
import { useAppSelector } from "../../app/hooks";
import { selectIsAuthenticated } from "../../state/authenticationSlice";

interface CallbackPageProps {

}

const CallbackPage: FC<CallbackPageProps> = () => {
    const navigate = useNavigate();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    useCheckAuthQuery(undefined, { skip: isAuthenticated });
    useEffect(() => {
        if (isAuthenticated) {

            navigate("/");
        }
    }, [navigate, isAuthenticated]);
    return (
        <>
            Callback...
        </>
    );
};

export default CallbackPage;
