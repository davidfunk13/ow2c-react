import React from "react";
import { Grid } from "@mui/material";
import { GridProps } from "@mui/material/Grid";

type ResponsiveGridProps = {
    items: React.ReactNode[]; // Array of items to display in the grid
    spacing?: GridProps["spacing"]; // The spacing between grid items
};

const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
    items,
    spacing = 2, // Default spacing
}) => {
    // Determine the grid item size
    const getItemSize = (itemsCount: number, breakpointCols: number) => {
        const lastRowItemCount = itemsCount % breakpointCols;
        // If last row is not full, items should fill the row
        return lastRowItemCount ? 12 / lastRowItemCount : 12 / breakpointCols;
    };

    return (
        <Grid container spacing={spacing}>
            {items.map((item, index) => {
                // Get the current breakpoint column setting based on MUI grid sizing
                const xs = 12; // full width on extra small screens
                const sm = items.length <= 2 ? 12 : 6; // 1 or 2 items per row on small screens
                const md = items.length <= 3 ? 12 : 4; // 1 to 3 items per row on medium screens
                const lg = items.length <= 3 ? 12 : 4; // 1 to 3 items per row on large screens
                const xl = items.length <= 3 ? 12 : 4; // 1 to 3 items per row on extra-large screens

                // Calculate the size for the item based on the current index and items length
                const colSize = {
                    xs: xs as GridProps["xs"],
                    sm: index >= items.length - (items.length % 2) ? getItemSize(items.length, 2) : sm,
                    md: index >= items.length - (items.length % 3) ? getItemSize(items.length, 3) : md,
                    lg: index >= items.length - (items.length % 3) ? getItemSize(items.length, 3) : lg,
                    xl: index >= items.length - (items.length % 3) ? getItemSize(items.length, 3) : xl,
                };

                return (
                    <Grid item {...colSize} key={index}>
                        {item}
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default ResponsiveGrid;
