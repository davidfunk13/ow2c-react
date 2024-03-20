import React from "react";
import * as Yup from "yup";
import { EmptyPromise } from "../../types/EmptyPromise.type";

export type StepType = {
    label: string;
    component: React.ComponentType;
    initialValues: Record<string, unknown>;
    validationSchema: Yup.AnyObjectSchema;
};

export type MultiStepFormProps<T> = {
    steps: StepType[];
    submitAction: (data: T) => EmptyPromise;
};

// can be used as a template to specifity the form values if you need to I guess.
// export type Step1Values = {
//     firstName: string;
//     lastName: string;
// };

// export type Step2Values = {
//     email: string;
// };

// export type Step3Values = {
//     selectedCard: number | null;
// };

// export type FormValues = Step1Values & Step2Values & Step3Values;
