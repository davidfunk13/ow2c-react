import { Grid, IconButton, Switch, Typography } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import useThemeToggle from "./useThemeToggle";

type ThemeToggleProps = Record<string, unknown>;

const ThemeToggle: React.FC<ThemeToggleProps> = () => {
    const { toggleTheme, isDarkTheme, } = useThemeToggle();
    const themeText = isDarkTheme ? "Dark" : "Light";

    return (
        <Grid container spacing={2}>
            <Grid
                display={"flex"}
                alignSelf={"center"}
                item
                xs={4}
            >
                <IconButton onClick={toggleTheme}>
                    <DarkModeIcon />
                </IconButton>
            </Grid>
            <Grid
                display={"flex"}
                alignSelf={"center"}
                item
                xs={8}
            >
                <Typography variant={"subtitle2"}>{themeText} Mode</Typography>
            </Grid>
        </Grid>
    );
};

export default ThemeToggle;
