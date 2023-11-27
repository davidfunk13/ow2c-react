import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import User from "../../types/User.type";
import { api } from "../../api/api";

interface UserState {
    loading: boolean
    user: null | User
}

const initialState: UserState = {
    user: null,
    loading: false
};

export const userReducer = createSlice({
    name: "state/user",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(api.endpoints.getUser.matchPending, (state) => {
                state.loading = true;
            })
            .addMatcher(api.endpoints.getUser.matchFulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.user = action.payload;
                // Handle the fulfilled case
            })
            .addMatcher(api.endpoints.getUser.matchRejected, (state) => {
                state.loading = false;
                // Handle the rejected case
            });
    }

});

export const selectUser = (state: RootState): User | null => state["state/user"].user;
export const selectUserLoading = (state: RootState): boolean => state["state/user"].loading;

export default userReducer.reducer;
