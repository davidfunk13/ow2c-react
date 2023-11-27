import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "../state/slices/uiSlice";
import { userApi } from "../services/userApi";
import { authApi } from "../services/authApi";
import authenticationSlice from "../state/slices/authenticationSlice";
import { gameApi } from "../services/gameApi";

export const store = configureStore({
    reducer: {
        ["state/ui"]: uiSlice,
        ["state/authentication"]: authenticationSlice,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [gameApi.reducerPath]: gameApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(userApi.middleware, authApi.middleware, gameApi.middleware);
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
