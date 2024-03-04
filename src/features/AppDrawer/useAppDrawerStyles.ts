import { css } from "@emotion/react";
import drawerWidth from "../../utils/drawerWidth";

const useAppDrawerStyles = () => {
  return {
    drawer: css`
    width: ${drawerWidth}px;
    flex-shrink: 0;
    
    & .MuiDrawer-paper {
      width: ${drawerWidth}px;
      box-sizing: border-box;
    }
    `,
    box: css`
    overflow: auto;
    `,
  };

};

export default useAppDrawerStyles;
