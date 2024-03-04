import { css } from "@mui/material";

const useButtonAppBarStyles = () => {
    return {
        flexGrow: css`
            flex-grow: 1;
        `,
        iconButton: css`
            margin-right: 2px;
        `,
    };
};

export default useButtonAppBarStyles;
