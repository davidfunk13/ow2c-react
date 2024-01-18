import { createSlice } from "@reduxjs/toolkit";

interface UIState {
    open: boolean
}

const initialState: UIState = {
    open: false,
};

export const APP_DRAWER_STATE = "state/appDrawer";

const appDrawerSlice = createSlice({
    name: APP_DRAWER_STATE,
    initialState,
    reducers: {
        toggleDrawer: (state) => {
            state.open = !state.open;
        }
    },
});

export const { toggleDrawer } = appDrawerSlice.actions;

export default appDrawerSlice.reducer;
