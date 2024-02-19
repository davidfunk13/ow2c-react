import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectTheme, toggleTheme as toggle } from "./themeToggleSlice";
import { darkTheme, lightTheme } from "../../utils/theme";

const useThemeToggle = () => {
    const dispatch = useAppDispatch();
    const theme = useAppSelector(selectTheme);
    const toggleTheme = () => dispatch(toggle());
    const selectedThemeObject = theme ? darkTheme : lightTheme;
    const selectedThemeString = theme ? "dark" : "light";
    const isDarkTheme = theme ? true : false;
        return {
            theme,
            toggleTheme,
            isDarkTheme,
            selectedThemeObject,
            selectedThemeString,
        };
    };

    export default useThemeToggle;
