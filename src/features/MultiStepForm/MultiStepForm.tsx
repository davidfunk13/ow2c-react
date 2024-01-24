// MultiStepForm.tsx
import React, { FC, useEffect, useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";

export const StepOne: React.FC = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div>
            <input {...register("firstName", { required: "First Name is required" })} placeholder={"First Name"} />
            {errors.firstName && <span style={{ color: "red" }}>{errors.firstName.message?.toString()}</span>}

            <input {...register("lastName", { required: "Last Name is required" })} placeholder={"Last Name"} />
            {errors.lastName && <span style={{ color: "red" }}>{errors.lastName.message?.toString()}</span>}
        </div>
    );
};

type ButtonOption = {
    title: string;
};

const buttonOptions: ButtonOption[] = [
    { title: "Option 1" },
    { title: "Option 2" },
    { title: "Option 3" },
    { title: "Option 4" },
    { title: "Option 5" }
];

export const StepTwo: React.FC = () => {
    const { register, setValue, watch, formState: { errors }, getValues } = useFormContext();
    const selectedOption = watch("selectedOption");

    // Handle button click
    const handleSelect = (title: string) => {
        // If already selected, unselect
        if (selectedOption === title) {
            setValue("selectedOption", null);
            return;
        }
        setValue("selectedOption", title, { shouldValidate: true });
    };

    // Effect for re-registering the field and setting its value when component mounts
    useEffect(() => {
        register("selectedOption", { required: "You must select an option" });

        // Set the value from the form state (useful when navigating back to this step)
        const currentValue = getValues("selectedOption");
        if (currentValue) {
            setValue("selectedOption", currentValue);
        }
    }, [register, setValue, getValues]);

    return (
        <div>
            {buttonOptions.map((option, index) => (
                <button
                    key={index}
                    type={"button"}
                    onClick={() => handleSelect(option.title)}
                    style={{ backgroundColor: selectedOption === option.title ? "blue" : "grey" }}
                >
                    {option.title}
                </button>
            ))}
            {errors.selectedOption && <span style={{ color: "red" }}>{errors.selectedOption.message?.toString()}</span>}
        </div>
    );
};

export const StepThree: React.FC = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div>
            <input {...register("email", { required: "Email is required", pattern: /^\S+@\S+$/i })} placeholder={"Email"} />
            {errors.email && <span style={{ color: "red" }}>{errors.email.message?.toString()}</span>}
        </div>
    );
};

type MultiStepFormProps = {
    steps: React.ReactNode[] | JSX.Element[];
}

export const MultiStepForm: FC<MultiStepFormProps> = ({steps}) => {
    const methods = useForm<FormData>({ mode: "onSubmit" });
    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = async () => {
        console.log("hit");
        const isValid = await methods.trigger();
        if (isValid && currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const previousStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const onSubmit = (data: FormData) => {
        console.log(data); // Final submit function
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                {steps[currentStep]}
                {currentStep > 0 && <button type={"button"} onClick={previousStep}>Back</button>}
                {currentStep < steps.length - 1 ? (
                    <button type={"button"} onClick={nextStep}>Next</button>
                ) : (
                    <button type={"submit"}>Submit</button>
                )}
            </form>
        </FormProvider>
    );
};

export default MultiStepForm;
