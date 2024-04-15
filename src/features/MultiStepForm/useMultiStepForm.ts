import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MultiStepFormProps, } from "./types";

const useMultiStepForm = <T,>({ steps, submitAction }: MultiStepFormProps<T>) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [hasError, setHasError] = useState(false);
    const currentValidationSchema = steps[currentStep].validationSchema;

    const methods = useForm({
        resolver: yupResolver(currentValidationSchema),
        defaultValues: steps.reduce(
            (acc, step) => ({ ...acc, ...step.initialValues }),
            {}
        ),
    });

    const { handleSubmit, formState: { errors } } = methods;
    const watchErrors = Object.keys(errors).length > 0;

    useEffect(() => {
        setHasError(watchErrors);
    }, [errors, currentStep, watchErrors, submitAction]);

    const onSubmit = useCallback((data: T) => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
            return;
        }
        submitAction(data);
    }, [currentStep, steps.length, submitAction]);

    const handleBack = useCallback(() => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    }, [currentStep]);

    return { currentStep, hasError, methods, errors, handleSubmit, onSubmit, handleBack };
};

export default useMultiStepForm;
