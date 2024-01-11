import { createSlice } from "@reduxjs/toolkit";

interface UIState {
    open: boolean
}

const initialState: UIState = {
    open: false,
};

export const APP_MODAL_STATE = "state/appModal";

export const appModalSlice = createSlice({
    name: APP_MODAL_STATE,
    initialState,
    reducers: {
        toggleModal: (state) => {
            state.open = !state.open;
        },
        openModal: (state) => {
            state.open = true;
        },
        closeModal: (state) => {
            state.open = false;
        }
    },
});

export const { toggleModal, openModal, closeModal } = appModalSlice.actions;

export default appModalSlice.reducer;
