import { Grid } from "@mui/material";
// import { useState } from "react";
// import { useFormContext } from "react-hook-form";

// type GameTypes = {
//     Assault: string[];
//     Escort: string[];
//     Hybrid: string[];
//     // Add other game types as needed
// };

const OverwatchMapSelector = () => {
    // const { register, formState: { errors } } = useFormContext();
    // const [gameType, setGameType] = useState<keyof GameTypes | "">("");

    // // get maps from database.

    // const handleGameTypeSelection = (type: keyof GameTypes) => {
    //     setGameType(type);
    // };

    return (
        <Grid container>
ass
        </Grid>
        // <div>
        //     <div>
        //         {Object.keys(gameTypes).map(type => (
        //             <button key={type} onClick={() => handleGameTypeSelection(type as keyof GameTypes)}>
        //                 {type}
        //             </button>
        //         ))}
        //     </div>

        //     {gameType && (
        //         <div>
        //             <label htmlFor={"overwatchMap"}>Select an Overwatch Map for {gameType}:</label>
        //             <select id={"overwatchMap"} {...register("overwatchMap", { required: "Map selection is required" })}>
        //                 <option value={""}>--Choose a Map--</option>
        //                 {gameTypes[gameType].map(map => (
        //                     <option key={map} value={map}>{map}</option>
        //                 ))}
        //             </select>
        //             {errors.overwatchMap && <p>{String(errors.overwatchMap.message)}</p>}
        //         </div>
        //     )}
        // </div>
    );
};

export default OverwatchMapSelector;
