import { object, string } from "yup";

export const selectMapValidationSchema = object().shape({
    map: string().required("Map selection is required"),
});

export const selectMapInitialValues = {
    map: "",
};
