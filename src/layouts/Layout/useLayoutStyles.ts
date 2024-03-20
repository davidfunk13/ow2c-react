
import { css, useTheme } from "@mui/material";

const useLayoutStyles = () => {
    const theme = useTheme();

    return {
        menuIconStyles: css`color: ${theme.palette.common.white}`,
        appBarStyles: css`z-index: ${theme.zIndex.drawer + 1}`
    };
};

export default useLayoutStyles;
