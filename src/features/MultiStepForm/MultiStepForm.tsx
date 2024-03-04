import { useMemo } from "react";
import { FormProvider } from "react-hook-form";
import Button from "@mui/material/Button";
import { Alert, Grid, Step, StepLabel, Stepper } from "@mui/material";
import useMultiStepForm from "./useMultiStepForm";
import { MultiStepFormProps } from "./types";

const MultiStepForm = <T,>({ steps, submitAction }: MultiStepFormProps<T>) => {
    const {
        currentStep,
        hasError,
        methods,
        handleSubmit,
        onSubmit,
        handleBack,
        errorMessageForStep
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
            <Grid item xs={12}>
                {(hasError && Boolean(errorMessageForStep)) && (
                    <Alert severity={"error"}>
                        {errorMessageForStep}
                    </Alert>
                )}
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
