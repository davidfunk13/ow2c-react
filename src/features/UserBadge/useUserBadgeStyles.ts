import { css, useTheme } from "@mui/material";

const useUserBadgeStyles = () => {
    const theme = useTheme();

    return {
        userBadgeCardStyles: css`
      position: absolute;
      top: 8vh;
      left: -10rem;
      width: 20rem; 
      padding: ${theme.spacing(2)};
      border-radius: ${theme.shape.borderRadius}px;
      background-color: ${theme.palette.background.paper};
      z-index: 10;
      .MuiTypography-h6 {
        font-weight: bold;
        color: ${theme.palette.text.primary};
        margin-bottom: ${theme.spacing(1)};
      }
      .MuiTypography-body1 {
        color: ${theme.palette.text.secondary};
      }
    `,
        relativeAnchorStyles: css`
      position: relative;
    `,
    };
};

export default useUserBadgeStyles;
