import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface FormState {
    currentStep: number;
}

const initialState: FormState = {
    currentStep: 0,
};

export const MULTI_STEP_FORM = "state/multiStepForm";

const multiStepFormSlice = createSlice({
    name: MULTI_STEP_FORM,
    initialState,
    reducers: {
        goToNextStep: (state) => {
            state.currentStep += 1;
        },
        goToPreviousStep: (state) => {
            state.currentStep = Math.max(state.currentStep - 1, 0);
        },
        resetForm: (state) => {
            state.currentStep = 0;
        },
        setCurrentStep: (state, action: PayloadAction<number>) => {
            state.currentStep = action.payload;
        },
    },
});

export const { goToNextStep, goToPreviousStep, resetForm, setCurrentStep } = multiStepFormSlice.actions;

export default multiStepFormSlice.reducer;
