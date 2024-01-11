import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import User from "../types/User.type";
import { userApi } from "../services/userApi";
import { authApi } from "../services/authApi";
import AuthCheckResponse from "../types/AuthCheckResponse.type";

interface AuthenticationState {
    authLoading: boolean
    user: null | User
    userLoading: boolean
    isAuthenticated: boolean
}

const initialState: AuthenticationState = {
    user: null,
    authLoading: false,
    userLoading: false,
    isAuthenticated: localStorage.getItem("isAuthenticated") ? JSON.parse(localStorage.getItem("isAuthenticated")!) : false,
};

export const AUTHENTICATION_STATE = "state/authentication";

export const authenticationSlice = createSlice({
    name: AUTHENTICATION_STATE,
    initialState,
    reducers: {
        dispatchLogout: (state) => {
            state.isAuthenticated = false;
            localStorage.removeItem("isAuthenticated");
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(userApi.endpoints.getUser.matchPending, (state) => {
                state.userLoading = true;
            })
            .addMatcher(userApi.endpoints.getUser.matchFulfilled, (state, action: PayloadAction<User>) => {
                state.userLoading = false;

                state.user = action.payload;
            })
            .addMatcher(userApi.endpoints.getUser.matchRejected, (state) => {
                state.userLoading = false;
                // Handle the rejected case, dispatch a snackbar, etc.
            })
            .addMatcher(authApi.endpoints.checkAuth.matchPending, (state) => {
                state.authLoading = true;
            })
            .addMatcher(authApi.endpoints.checkAuth.matchFulfilled, (state, action: PayloadAction<AuthCheckResponse>) => {
                state.authLoading = false;

                if (action.payload.authenticated === true) {
                    state.isAuthenticated = true;
                    localStorage.setItem("isAuthenticated", JSON.stringify(true));
                    return;
                }

                state.isAuthenticated = false;
            })
            .addMatcher(authApi.endpoints.checkAuth.matchRejected, (state) => {
                state.authLoading = false;
                localStorage.removeItem("isAuthenticated");
                state.isAuthenticated = false;
            });
    }

});

export const selectUser = (state: RootState): User | null => state[AUTHENTICATION_STATE].user;
export const selectUserLoading = (state: RootState): boolean => state[AUTHENTICATION_STATE].userLoading;
export const selectAuthLoading = (state: RootState): boolean => state[AUTHENTICATION_STATE].authLoading;
export const selectIsAuthenticated = (state: RootState): boolean => state[AUTHENTICATION_STATE].isAuthenticated;

export const { dispatchLogout } = authenticationSlice.actions;

export default authenticationSlice.reducer;
