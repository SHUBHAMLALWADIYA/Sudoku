import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import Square from './Square';

function Board({ grid, onChange, hintedCell }) {
    return (
        <SimpleGrid columns={9} spacing={1} width="100%" autoFlow="row dense">
            {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                    <Square
                        key={`${rowIndex}-${colIndex}`}
                        cell={cell}
                        onChange={onChange}
                        rowIndex={rowIndex}
                        colIndex={colIndex}
                        isBorderRight={(colIndex + 1) % 3 === 0}
                        isBorderBottom={(rowIndex + 1) % 3 === 0}
                    />
                ))
            )}
        </SimpleGrid>
    );
}

export default Board