import { css } from "@mui/material";

const styles = {
    flexGrow: css`
        flex-grow: 1;
    `,
};

const useButtonAppBarStyles = () => {
    return {
        flexGrow: styles.flexGrow
    };
};

export default useButtonAppBarStyles;
