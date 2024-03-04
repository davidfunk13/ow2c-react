import { useCallback, useEffect, useState } from "react";
import { MultiStepFormProps,  } from "./types";
import { FieldErrors, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const useMultiStepForm = <T,>({ steps, submitAction }: MultiStepFormProps<T>) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [hasError, setHasError] = useState(false);

    const currentValidationSchema = steps[currentStep].validationSchema;
    function getErrorMessageForStep(errors: FieldErrors<Record<string, unknown>>, currentStep: number): string | null {
        const errorEntries = Object.values(errors);
        const errorForCurrentStep = errorEntries[currentStep];
        return errorForCurrentStep?.message || null;
    }
    const methods = useForm({
        resolver: yupResolver(currentValidationSchema),
        defaultValues: steps.reduce(
            (acc, step) => ({ ...acc, ...step.initialValues }),
            {}
        ),
    });

    const { handleSubmit, formState: { errors } } = methods;

    const errorObjectLength = Object.keys(errors).length;

    useEffect(() => {
        const errorMessage = getErrorMessageForStep(errors, currentStep);
        setHasError(!!errorMessage);
    }, [errors, errorObjectLength, currentStep]);

    const onSubmit = useCallback((data: T) => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
            return;
        }
        submitAction(data);
    }, [currentStep, steps.length, submitAction]);

    const errorMessageForStep = getErrorMessageForStep(errors, currentStep);

    const handleBack = useCallback(() => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    }, [currentStep]);

    return { currentStep, hasError, methods, errorMessageForStep, handleSubmit, onSubmit, handleBack };
};

export default useMultiStepForm;
