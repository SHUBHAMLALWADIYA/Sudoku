import React from 'react';
import { Grid } from '@chakra-ui/react';
import Square from './Square';

function Board({ grid, onChange, hintedCell }) {
    return (
        <Grid
            templateColumns="repeat(9, 1fr)"
            gap={1}  // Small gap for visibility of lines
            p={2}    // Padding to ensure grid is within a box-model
            width="auto"  // Auto width based on content
            height="auto"  // Auto height based on content
            autoFlow="row dense"  // Ensures the grid adjusts to screen size, maintaining row integrity
        >
            {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                    <Square
                        key={`${rowIndex}-${colIndex}`}
                        cell={cell}
                        onChange={onChange}
                        rowIndex={rowIndex}
                        colIndex={colIndex}
                        isBorderRight={(colIndex + 1) % 3 === 0 && colIndex !== 8}
                        isBorderBottom={(rowIndex + 1) % 3 === 0 && rowIndex !== 8}
                    />
                ))
            )}
        </Grid>
    );
}

export default Board;
