import { SerializedStyles } from "@emotion/react";
import { Theme, css, useTheme } from "@mui/material";

const styles = {
    menuIconStyles: (theme: Theme): SerializedStyles => css`color: ${theme.palette.common.white}`,
    appBarStyles: (theme: Theme): SerializedStyles => css`z-index: ${theme.zIndex.drawer + 1}`
};

const useDashboardStyles = () => {
    const theme = useTheme();

    return {
        menuIconStyles: styles.menuIconStyles(theme),
        appBarStyles: styles.appBarStyles(theme),
    };
};

export default useDashboardStyles;
