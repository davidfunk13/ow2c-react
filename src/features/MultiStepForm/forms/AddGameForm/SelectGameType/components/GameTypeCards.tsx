import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import ControlCardImage from "../../../../../../assets/icons/control-card.webp";
import EscortCardImage from "../../../../../../assets/icons/escort-card.webp";
import HybridCardImage from "../../../../../../assets/icons/hybrid-card.webp";
import PushCardImage from "../../../../../../assets/icons/push-card.webp";
import FlashpointCardImage from "../../../../../../assets/icons/flashpoint-card.webp";
import ResponsiveGrid from "../../../../../../components/ResponsiveGrid/ResponsiveGrid";

type CardItemProps = {
    image: string;
    title: string;
};

const gameTypes = [
    { name: "Control", image: ControlCardImage },
    { name: "Escort", image: EscortCardImage },
    { name: "Hybrid", image: HybridCardImage },
    { name: "Push", image: PushCardImage },
    { name: "Flashpoint", image: FlashpointCardImage }
];

const CardItem: React.FC<CardItemProps> = ({ image, title }) => {
    return (
        <Card variant={"outlined"} sx={{ width: "100%", height: "100%" }}>
            <CardMedia
                component={"img"}
                height={"140"}
                image={image}
                alt={title}
            />
            <CardContent>
                <Typography gutterBottom variant={"h5"} component={"div"}>
                    {title}
                </Typography>
            </CardContent>
        </Card>
    );
};

const GameTypeCards: React.FC = () => {

    const cardItems = gameTypes.map((item, index) => {
        const { name, image } = item;

        return <CardItem key={index} image={image} title={name} />;
    });

    return (
        <ResponsiveGrid items={cardItems} />
    );
};

export default GameTypeCards;
