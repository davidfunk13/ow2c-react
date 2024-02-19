import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectFilter, setFilter } from "./filterButtonsSlice";
import GameType from "../../types/GameTypes.type";

export type FilterOption = {
    label: string;
    value: string;
};

type FilterButtonsProps = {
    options: FilterOption[];
    onFilterChange?: (value: string) => void;
};

const FilterButtons: React.FC<FilterButtonsProps> = ({ options, onFilterChange = undefined }) => {
    const selectedFilter = useAppSelector(selectFilter);
    const dispatch = useAppDispatch();

    const handleFilterChange = (
        event: React.MouseEvent<HTMLElement>,
        newFilter: GameType | null
    ) => {
        if (newFilter !== null) {
            dispatch(setFilter(newFilter));
            if (onFilterChange) {
                onFilterChange(newFilter);
            }
        }
    };

    return (
        <ToggleButtonGroup
            fullWidth
            value={selectedFilter}
            exclusive
            onChange={handleFilterChange}
        >
            {options.map((option) => (
                <ToggleButton key={option.value} value={option.value}>
                    {option.label}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    );
};

export default FilterButtons;
