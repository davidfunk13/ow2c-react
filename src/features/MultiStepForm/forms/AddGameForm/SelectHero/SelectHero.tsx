import { useState } from "react";
import { useFormContext } from "react-hook-form";

type HeroCategories = {
    Tanks: string[];
    Damage: string[];
    Support: string[];
    // Add other hero categories as needed
};

const OverwatchHeroSelector = () => {
    const { register, formState: { errors } } = useFormContext();
    const [heroCategory, setHeroCategory] = useState<keyof HeroCategories | "">("");
    const [, setSelectedHero] = useState("");

    const heroCategories: HeroCategories = {
        Tanks: ["Reinhardt", "D.Va", "Winston"],
        Damage: ["Tracer", "Reaper", "Soldier: 76"],
        Support: ["Mercy", "Ana", "Zenyatta"],
        // Add more hero categories and heroes as needed
    };

    const handleHeroCategorySelection = (category: keyof HeroCategories) => {
        setHeroCategory(category);
        setSelectedHero(""); // Reset selected hero when category changes
    };

    return (
        <div>
            <div>
                {Object.keys(heroCategories).map(category => (
                    <button key={category} onClick={() => handleHeroCategorySelection(category as keyof HeroCategories)}>
                        {category}
                    </button>
                ))}
            </div>

            {heroCategory && (
                <div>
                    <label htmlFor={"overwatchHero"}>Select an Overwatch Hero in {heroCategory}:</label>
                    <select id={"overwatchHero"} {...register("overwatchHero", { required: "Hero selection is required" })}>
                        <option value={""}>--Choose a Hero--</option>
                        {heroCategories[heroCategory].map(hero => (
                            <option key={hero} value={hero}>{hero}</option>
                        ))}
                    </select>
                    {errors.overwatchHero && <p>{String(errors.overwatchHero.message)}</p>}
                </div>
            )}
        </div>
    );
};

export default OverwatchHeroSelector;
