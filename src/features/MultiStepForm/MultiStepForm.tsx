import { Alert, Grid, Step, StepLabel, Stepper } from "@mui/material";
import Button from "@mui/material/Button";
import { useMemo } from "react";
import { FormProvider } from "react-hook-form";
import { MultiStepFormProps } from "./types";
import useMultiStepForm from "./useMultiStepForm";

const MultiStepForm = <T,>({ steps, submitAction }: MultiStepFormProps<T>) => {
    const {
        currentStep,
        hasError,
        methods,
        handleSubmit,
        onSubmit,
        handleBack,
        errors
    } = useMultiStepForm({ steps, submitAction });

    const StepComponent = useMemo(() => steps[currentStep].component, [currentStep, steps]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Stepper activeStep={currentStep} alternativeLabel>
                    {steps.map(({ label }, index) => {
                        const isStepError = hasError && currentStep === index;

                        return (
                            <Step key={label}>
                                <StepLabel error={isStepError} >
                                    {label}
                                </StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            </Grid>
            {hasError && Object.entries(errors).map(([key, value]) => (
                <Grid item xs={12} key={key}>
                    <Alert severity={"error"}>{String(value?.message)}</Alert>
                </Grid>
            ))}
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
                                variant={"outlined"}
                                color={"error"}
                                onClick={() => console.log("close modal")}
                            >
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
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

export default MultiStepForm;
