import { FC } from "react";
import { useFormContext, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { object, string } from "yup";
import { Grid } from "@mui/material";

export const Step1ValidationSchema = object().shape({
    firstName: string().required("First Name is required"),
    lastName: string().required("Last Name is required"),
});

export const RHFStep1: FC = () => {
    const { control } = useFormContext();

    // EXTRACT SPACING TO GLOBAL COMPONENT OR HOC SO IT CAN BE USED EVERY TIME AUTOMATICALLY.
    return (
        <Grid container spacing={2}>
            <Grid item>
                <Controller
                    name={"firstName"}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            {...field}
                            label={"First Name"}
                            error={!!error}
                            helperText={error ? error.message : null}
                        />
                    )}
                />
            </Grid>
            <Grid item>
                <Controller
                    name={"lastName"}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            {...field}
                            label={"Last Name"}
                            error={!!error}
                            helperText={error ? error.message : null}
                        />
                    )}
                />
            </Grid>
        </Grid>
    );
};
