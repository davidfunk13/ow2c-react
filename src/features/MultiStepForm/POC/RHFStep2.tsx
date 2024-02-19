import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { object, string } from "yup";
import { Grid } from "@mui/material";

export const Step2ValidationSchema = object().shape({
    email: string().email("Invalid email").required("Email is required"),
});

export const RHFStep2: React.FC = () => {
    const { control } = useFormContext();

    return (
        <Grid container spacing={2}>
            <Grid item>
                <Controller
                    name={"email"}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <TextField
                            {...field}
                            label={"Email"}
                            error={!!error}
                            helperText={error ? error.message : null}
                        />
                    )}
                />
            </Grid>
        </Grid>
    );
};
