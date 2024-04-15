import { object, string } from "yup";

export const selectHeroValidationSchema = object().shape({
    hero_played_id: string().required("Hero is required"),
});

export const selectHeroInitialValues = {
    hero_played_id: "",
};
