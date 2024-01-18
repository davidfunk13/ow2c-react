import { createSlice } from "@reduxjs/toolkit";

interface UIState {
    open: boolean
}

const initialState: UIState = {
    open: false,
};

export const APP_MODAL_STATE = "state/appModal";

const appModalSlice = createSlice({
    name: APP_MODAL_STATE,
    initialState,
    reducers: {
        toggleModal: (state) => {
            state.open = !state.open;
        }
    },
});

export const { toggleModal } = appModalSlice.actions;

export default appModalSlice.reducer;
