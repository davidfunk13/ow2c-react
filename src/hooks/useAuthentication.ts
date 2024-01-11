import { useDispatch } from 'react-redux';
import { AUTHENTICATION_STATE } from '../state/authenticationSlice';
import { RootState } from '../app/store';
import { useAppSelector } from '../app/hooks';

export const useAuthentication = () => {
    const user = useAppSelector((state: RootState) => state[AUTHENTICATION_STATE].user);
    const userLoading = useAppSelector((state: RootState) => state[AUTHENTICATION_STATE].userLoading);
    const authLoading = useAppSelector((state: RootState) => state[AUTHENTICATION_STATE].authLoading);
    const isAuthenticated = useAppSelector((state: RootState) => state[AUTHENTICATION_STATE].isAuthenticated);

    return {
        user,
        userLoading,
        authLoading,
        isAuthenticated,
    };
};
