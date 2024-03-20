import { Card, CardActionArea, CardContent, CardMedia, Typography, useTheme } from "@mui/material";
import OverwatchMap from "../../types/OverwatchMap.type";
import { FC } from "react";
import useImageCardStyles from "./useImageCardStyles";

type ImageCardProps = {
    src:string
    map: OverwatchMap;
    isSelected: boolean;
    onCardClick: (id: number) => void;
};

const ImageCard: FC<ImageCardProps> = ({ src, map: { id, name }, isSelected, onCardClick }) => {
    const theme = useTheme();
    const classes = useImageCardStyles();
    const { constants: { mediaCardHeight } } = theme;

    return (
        <Card
            onClick={() => onCardClick(id)} variant={"outlined"}
            css={isSelected ? classes.cardIsSelected : undefined}
        >
            <CardActionArea>
                <CardMedia
                    height={mediaCardHeight}
                    component={"img"}
                    alt={name}
                    // image={`src/assets/maps/${snakeCase(name)}.webp`}
                    image={src}
                />
                <CardContent>
                    <Typography
                        whiteSpace={"nowrap"}
                        overflow={"hidden"}
                        textOverflow={"ellipsis"}
                        gutterBottom
                        variant={"subtitle1"}
                    >
                        {name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
export default ImageCard;
