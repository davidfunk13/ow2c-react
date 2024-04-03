import { object, string } from "yup";

export const selectMapValidationSchema = object().shape({
  map_played_id: string().required("Map selection is required"),
});

export const selectMapInitialValues = {
  map_played_id: "",
};
