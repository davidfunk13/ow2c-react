import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { Card, CardActionArea, CardMedia, CardContent, Typography, FormHelperText, Grid } from "@mui/material";
import { object, number } from "yup";

export const Step3ValidationSchema = object().shape({
    selectedCard: number().nullable().required("Please select a card."),
});

export const RHFStep3: FC = () => {
    const { setValue, watch, formState: { errors }, clearErrors } = useFormContext();
    const selectedCard = watch("selectedCard");

    const cardLabels = ["Card 1", "Card 2", "Card 3", "Card 4", "Card 5"];

    const handleCardClick = (index: number) => {
        console.log({ selectedCard, index });
        // Set the value and clear any errors if the card is selected
        if (selectedCard === index) {
            setValue("selectedCard", null);
            clearErrors("selectedCard"); // Clear errors when deselecting
        } else {
            setValue("selectedCard", index);
            clearErrors("selectedCard"); // Clear errors when a new card is selected
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item>
                {cardLabels.map((label, index) => (
                    <Card
                        key={label}
                        variant={"outlined"}
                        sx={{
                            margin: 1,
                            borderColor: selectedCard === index ? "primary.main" : errors.selectedCard ? "error.main" : "grey.300",
                            borderWidth: 2,
                            mb: 2
                        }}
                        onClick={() => handleCardClick(index)}
                    >
                        <CardActionArea>
                            <CardMedia
                                component={"img"}
                                height={"20"}
                                image={"/static/images/cards/contemplative-reptile.jpg"}
                                alt={label}
                            />
                            <CardContent>
                                <Typography gutterBottom variant={"h5"} component={"div"}>
                                    {label}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
                <FormHelperText error={Boolean(errors.selectedCard)}>
                    {errors.selectedCard?.message?.toString()}
                </FormHelperText>
            </Grid>
        </Grid>
    );
};
