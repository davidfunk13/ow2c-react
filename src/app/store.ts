import { configureStore } from "@reduxjs/toolkit";
import authenticationSlice, { AUTHENTICATION_STATE } from "../state/authenticationSlice";
import baseApi from "../services/baseApi";
import appDrawerSlice, { APP_DRAWER_STATE } from "../features/AppDrawer/appDrawerSlice";
import appModalSlice, { APP_MODAL_STATE } from "../features/AppModal/appModalSlice";

export const store = configureStore({
    reducer: {
        [APP_DRAWER_STATE]: appDrawerSlice,
        [APP_MODAL_STATE]: appModalSlice,
        [AUTHENTICATION_STATE]: authenticationSlice,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(baseApi.middleware);
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
