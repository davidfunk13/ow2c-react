
import { object, string } from "yup";
import { OverwatchHeroTypeEnum } from "../../../types/OverwatchHero.type";

export const selectRoleValidationSchema = object().shape({
    role: string().required("Role selection is required").oneOf([OverwatchHeroTypeEnum.Tank, OverwatchHeroTypeEnum.Damage, OverwatchHeroTypeEnum.Support]),
});

type SelectRoleInitialValues = {
    role?: OverwatchHeroTypeEnum;
};

export const selectRoleInitialValues: SelectRoleInitialValues = {
    role: undefined
};
