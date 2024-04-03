import { Card, CardActionArea, CardContent, CardMedia, Typography, useTheme } from "@mui/material";
import useImageCardStyles from "./useImageCardStyles";
import { FC } from "react";

interface ImageCardProps {
    src: string;
    isSelected: boolean;
    id?: number;
    name?: string;
    onCardClick: (id: number) => void;
}

const ImageCard: FC<ImageCardProps> = ({ src, isSelected, id, name, onCardClick }) => {
    const theme = useTheme();
    const classes = useImageCardStyles();
    const { constants: { mediaCardHeight } } = theme;

    const handleCardClick = () => {
        if (id !== undefined) {
            onCardClick(id);
        }

    };
    const cardText = name || "Unknown Image";

    return (
        <Card
            onClick={handleCardClick}
            variant={"outlined"}
            css={isSelected ? classes.cardIsSelected : undefined}
        >
            <CardActionArea>
                <CardMedia
                    height={mediaCardHeight}
                    component={"img"}
                    alt={cardText}
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
                        {cardText}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
export default ImageCard;
