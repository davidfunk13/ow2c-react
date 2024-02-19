import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import GameType from "../../types/GameTypes.type";

interface FilterButtonsState {
    filter?: GameType
}

const initialState: FilterButtonsState = {
    filter: undefined
};

export const FILTER_BUTTONS_STATE = "state/filterButtons";

const filterButtonsSlice = createSlice({
    name: FILTER_BUTTONS_STATE,
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<GameType>) => {
            state.filter = action.payload;
        }
    },
});

export const { setFilter } = filterButtonsSlice.actions;

export const selectFilter = (state: RootState) => state["state/filterButtons"].filter;

export default filterButtonsSlice.reducer;
