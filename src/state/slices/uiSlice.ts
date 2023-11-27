import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

interface UIState {
    open: boolean
}

const initialState: UIState = {
    open: false,
};

export const uiSlice = createSlice({
    name: "state/ui",
    initialState,
    reducers: {
        toggleDrawer: (state) => {
            state.open = !state.open;
        },
        openDrawer: (state) => {
            state.open = true;
        },
        closeDrawer: (state) => {
            state.open = false;
        }
    },
});

export const { toggleDrawer, openDrawer, closeDrawer } = uiSlice.actions;

export const selectDrawerOpen = (state: RootState): boolean => state["state/ui"].open;

export default uiSlice.reducer;
