import React from "react";
import * as Yup from "yup";

export interface StepType {
    label: string;
    component: React.ComponentType;
    initialValues: Record<string, unknown>;
    validationSchema: Yup.AnyObjectSchema;
}

export interface MultiStepFormProps {
    steps: StepType[];
}

export interface Step1Values {
    firstName: string;
    lastName: string;
}

export interface Step2Values {
    email: string;
}

export interface Step3Values {
    selectedCard: number | null; // Assuming `null` is the initial state before any card is selected.
}

// Combine all step values for the complete form values type
export type FormValues = Step1Values & Step2Values & Step3Values;
