import { css } from "@emotion/react";
import drawerWidth from "../../utils/drawerWidth";

const styles = {
    drawerStyles: css`
    width: ${drawerWidth}px;
    flex-shrink: 0;
    
    & .MuiDrawer-paper {
      width: ${drawerWidth}px;
      box-sizing: border-box;
    }
    `
};

export default styles;
