
import { number, object } from "yup";

export const selectResultValidationSchema = object().shape({
    result: number().required("Result selection is required").oneOf([0, 1, 2]),
});

export const selectResultInitialValues = {
    result: ""
};
