
import { useForm, FormProvider } from "react-hook-form";
import { useMultiStepForm } from "./useMultiStepForm";
import { FC } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Button, Grid, Typography } from "@mui/material";

type MultiStepFormProps = {
    steps: React.ComponentType[];
}
type FallBackProps = {
    error: Error;
}

const FallBack: FC<FallBackProps> = ({ error }) => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant={"h2"}>
                    Something went wrong
                </Typography>
                <Typography color={"error"} variant={"body1"}>
                    {error.message}
                </Typography>
            </Grid>
        </Grid>
    );
};

const MultiStepForm: FC<MultiStepFormProps> = ({ steps }) => {
    const methods = useForm();
    const { nextStep, previousStep, currentStep } = useMultiStepForm();
    const CurrentStepComponent = steps[currentStep];

    const onBack = () => {
        if (currentStep > 0) {
            previousStep();
        }
    };
    const onFinalSubmit = (data: unknown) => {
        console.log(data); // Data from all steps
    };

    const onNext = async () => {

        const isValid = await methods.trigger();
        if (isValid) {
            if (currentStep === steps.length - 1) {
                methods.handleSubmit(onFinalSubmit)();
            } else {
                nextStep();
            }
        }
    };

    return (
        <FormProvider {...methods}>
            <ErrorBoundary FallbackComponent={FallBack}>
                <form onSubmit={methods.handleSubmit(onNext)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <CurrentStepComponent />
                        </Grid>
                        {currentStep > 0 && (
                            <Grid item>
                                <Button variant={"outlined"} type={"button"} onClick={onBack}>
                                    Back
                                </Button>
                            </Grid>
                        )}
                        <Grid item>
                            <Button variant={"outlined"} type={"submit"}>
                                {currentStep === steps.length - 1 ? "Submit" : "Next"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </ErrorBoundary >
        </FormProvider>
    );
};

export default MultiStepForm;
