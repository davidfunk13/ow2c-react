import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import getInitialTheme from "../../utils/getInitialTheme";

interface ThemeToggleState {
    theme: boolean
}

const initialState: ThemeToggleState = {
    theme: getInitialTheme(),
};

export const THEME_TOGGLE_STATE = "state/themeToggle";

const themeToggleSlice = createSlice({
    name: THEME_TOGGLE_STATE,
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = !state.theme;
            localStorage.setItem("theme", JSON.stringify(state.theme));
        },
        setTheme: (state, action: PayloadAction<boolean>) => {
            state.theme = action.payload;
            localStorage.setItem("theme", JSON.stringify(action.payload));
        }
    },
});

export const { toggleTheme, setTheme } = themeToggleSlice.actions;

export const selectTheme = (state: RootState) => state[THEME_TOGGLE_STATE].theme;

export default themeToggleSlice.reducer;
