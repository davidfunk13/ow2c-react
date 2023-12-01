import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "../state/slices/uiSlice";
import authenticationSlice from "../state/slices/authenticationSlice";
import baseApi from "../services/baseApi";

export const store = configureStore({
    reducer: {
        ["state/ui"]: uiSlice,
        ["state/authentication"]: authenticationSlice,
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
