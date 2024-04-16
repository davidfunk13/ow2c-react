
export enum OverwatchHeroTypeEnum {
    Tank = "Tank",
    Damage = "Damage",
    Support = "Support",
}

export enum OverwatchHeroTypeIdEnum {
    Tank = 0,
    Damage = 1,
    Support = 2,
}

type OverwatchHero = {
    id: number;
    name: string;
    type: OverwatchHeroTypeEnum;
    thumbnail_url: string;
    created_at: Date | string;
    updated_at: Date | string;
};

export default OverwatchHero;
