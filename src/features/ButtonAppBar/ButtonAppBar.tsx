import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { FC } from "react";
import useButtonAppBarStyles from "./useButtonAppBarStyles";

type ButtonAppBarProps = Record<string, unknown>;

const ButtonAppBar: FC<ButtonAppBarProps> = () => {
  const { flexGrow, iconButton } = useButtonAppBarStyles();
  return (
    <Box css={flexGrow}>
      <AppBar position={"static"}>
        <Toolbar>
          <IconButton
            size={"large"}
            edge={"start"}
            color={"inherit"}
            aria-label={"menu"}
            css={iconButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant={"h6"} component={"div"} css={flexGrow}>
            News
          </Typography>
          <Button color={"inherit"}>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ButtonAppBar;
