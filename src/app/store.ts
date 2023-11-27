import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "../state/slices/uiSlice";
import userReducer from "../state/slices/userSlice";
import { api } from "../api/api";

export const store = configureStore({
    reducer: {
        ["state/ui"]: uiReducer,
        ["state/user"]: userReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(api.middleware);
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
