/** @jsxImportSource @emotion/react */
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import BnetLogo from "../../assets/logos/bnet.png";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { EmptyPromise } from "../../types/EmptyPromise.type";
import { FC } from "react";
import { useTheme } from "@mui/material";
import useRandomSplashImage from "../../hooks/useRandomSplashImage";
import { splashImages } from "../../utils/splashImages"; // Assuming this is your generated list of images
import loginString from "../../utils/loginString";
import { gridStyle, logoStyle, paperGridStyle, rootContainerStyle } from "./LandingPage.styles";
// import { Navigate } from "react-router-dom";

const handleLogin: () => EmptyPromise = async () => {
    window.location.href = loginString;
};

interface LandingPageProps {

}

const LandingPage: FC<LandingPageProps> = () => {
    const theme = useTheme();
    const selectedImage = useRandomSplashImage(splashImages);
    const gridBgColor = theme.palette.mode === "light" ? theme.palette.grey[50] : theme.palette.grey[900];

    return (
        <Grid container
            component={"main"}
            css={rootContainerStyle}
        >
            <Grid item
                xs={false}
                sm={4}
                md={7}
                css={gridStyle(selectedImage, gridBgColor)}
            />
            <Grid item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                variant={"outlined"}
                css={paperGridStyle}
            >
                <Grid
                    container
                    spacing={10}
                    p={4}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Grid item
                        xs={12}
                    >
                        <Typography
                            align={"center"}
                            fontWeight={"bold"}
                            component={"h1"}
                            variant={"h1"}
                        >
                            Overwatch 2 Companion
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        display={"flex"}
                        justifyContent={"center"}
                    >
                        <Box
                            component={"img"}
                            css={logoStyle}
                            alt={"Battle.Net Logo"}
                            src={BnetLogo}
                        />
                    </Grid>
                    <Grid item
                        xs={12}
                    >
                        <Typography align={"center"}
                            component={"h1"}
                            variant={"h5"}
                        >
                            Sign in with Battle.net
                        </Typography>
                    </Grid>
                    <Grid mt={3}
                        mb={2}
                        item
                        xs={12}
                    >
                        <Button onClick={handleLogin}
                            fullWidth
                            variant={"contained"}
                        >
                            Log In
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default LandingPage;
