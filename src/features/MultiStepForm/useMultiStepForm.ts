
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { MULTI_STEP_FORM, goToNextStep, goToPreviousStep, resetForm, setCurrentStep } from "./multiStepFormSlice";

export const useMultiStepForm = () => {
    const dispatch = useDispatch();
    const currentStep = useAppSelector((state: RootState) => state[MULTI_STEP_FORM].currentStep);
    const nextStep = () => dispatch(goToNextStep());
    const previousStep = () => dispatch(goToPreviousStep());
    const reset = () => dispatch(resetForm());
    const setStep = (step: number) => dispatch(setCurrentStep(step));

    return {
        currentStep,
        nextStep,
        previousStep,
        reset,
        setStep,
    };
};
