
import { useForm, FormProvider } from "react-hook-form";
import { useMultiStepForm } from "./useMultiStepForm";
import { FC } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Grid, Typography } from "@mui/material";

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
                    <CurrentStepComponent />
                    <div>
                        {currentStep > 0 && (
                            <button type={"button"} onClick={onBack}>
                                Back
                            </button>
                        )}
                        <button type={"submit"}>
                            {currentStep === steps.length - 1 ? "Submit" : "Next"}
                        </button>
                    </div>

                </form>
            </ErrorBoundary >
        </FormProvider>
    );
};

export default MultiStepForm;
