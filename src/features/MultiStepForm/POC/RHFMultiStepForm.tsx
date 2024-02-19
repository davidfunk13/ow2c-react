import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormValues, MultiStepFormProps } from "../types";
import Button from "@mui/material/Button";
import { Grid, Step, StepLabel, Stepper } from "@mui/material";

const RHFMultiStepForm: React.FC<MultiStepFormProps> = ({ steps }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const currentValidationSchema = steps[currentStep].validationSchema;

    const methods = useForm({
        resolver: yupResolver(currentValidationSchema),
        defaultValues: steps.reduce(
            (acc, step) => ({ ...acc, ...step.initialValues }),
            {}
        ),
    });

    // add a way to get errors for a specific step so we can indicate it on the horizontal stepper
    const { handleSubmit } = methods;

    const onSubmit = (data: FormValues) => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            console.log("hit final");
            console.log(data);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const StepComponent = steps[currentStep].component;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Stepper activeStep={currentStep} alternativeLabel>
                    {steps.map((step) => {
                        const { label } = step;
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            </Grid>
            <Grid item xs={12}>
                <FormProvider {...methods}>
                    <Grid
                        container
                        component={"form"}
                        spacing={2}
                        onSubmit={handleSubmit(onSubmit)}
                        alignItems={"flex-start"}
                        justifyContent={"flex-start"}
                    >
                        <Grid item xs={12}>
                            <StepComponent />
                        </Grid>
                        <Grid item>
                            <Button
                                fullWidth
                                // EXTRACT THIS TO GLOBAL COMPONENT SO WHEN I USE THE BUTTON ITS THERE ALREADY
                                sx={{ minWidth: 100 }}
                                variant={"outlined"}
                                color={"error"}
                                onClick={() => console.log("close modal")}
                            >
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                // EXTRACT THIS TO GLOBAL COMPONENT SO WHEN I USE THE BUTTON ITS THERE ALREADY
                                sx={{ minWidth: 100 }}
                                fullWidth
                                variant={"contained"}
                                color={"primary"}
                                onClick={handleBack}
                                disabled={currentStep === 0}
                            >
                                Back
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                // EXTRACT THIS TO GLOBAL COMPONENT SO WHEN I USE THE BUTTON ITS THERE ALREADY
                                sx={{ minWidth: 100 }}
                                fullWidth
                                variant={"contained"}
                                color={"primary"}
                                type={"submit"}
                            >
                                {currentStep === steps.length - 1 ? "Finish" : "Next"}
                            </Button>
                        </Grid>
                    </Grid>
                </FormProvider>
            </Grid>
        </Grid>
    );
};

export default RHFMultiStepForm;
