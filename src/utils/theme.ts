
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
    interface Theme {
        constants: {
            gridSpacing: number;
            mediaCardHeight: number;
        };
    }
}

const commonThemeSettings = {
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    minWidth: 100,
                },
            },
        },
    },
    constants: {
        gridSpacing: 2,
        mediaCardHeight: 100,
    }
};

export const lightTheme = createTheme({
    ...commonThemeSettings,
    palette: {
        mode: "light",
    },
});

export const darkTheme = createTheme({
    ...commonThemeSettings,
    palette: {
        mode: "dark",
    },

});
