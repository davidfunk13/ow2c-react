type OverwatchMapType = "Control" | "Escort" | "Hybrid" | "Push" | "Flashpoint";
type Area = string | null;

type OverwatchMap = {
    id: number;
    name: string;
    type: OverwatchMapType;
    area_1: Area;
    area_2: Area;
    area_3: Area;
    country: string;
    created_at: Date | string; // Depending on whether you convert to Date object or not
    updated_at: Date | string; // Same as above
};

export default OverwatchMap;
