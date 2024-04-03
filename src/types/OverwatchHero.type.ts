
export type OverwatchHeroType = "Tank" | "Damage" | "Support";

type OverwatchHero = {
    id: number;
    name: string;
    type: OverwatchHeroType
    thumbnail_url: string;
    created_at: Date | string;
    updated_at: Date | string;
};

export default OverwatchHero;
