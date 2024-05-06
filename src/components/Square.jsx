import React from 'react';
import { Input } from '@chakra-ui/react';

function Square({ cell, onChange, rowIndex, colIndex, isBorderRight, isBorderBottom }) {
    const handleChange = (e) => {
        if (!cell.isDefault) {
            onChange(e, rowIndex, colIndex);
        }
    };

    const borderRight = isBorderRight ? "2px solid black" : "1px solid gray.300";
    const borderBottom = isBorderBottom ? "2px solid black" : "1px solid gray.300";

    return (
        <Input
            type="number"
            value={cell.value || ''}
            onChange={handleChange}
            readOnly={cell.isDefault}
            min={1}
            max={9}
            variant="filled"
            textAlign="center"
            size="lg"
            borderColor="gray.300"
            _hover={{ borderColor: 'gray.400' }}
            fontSize={["xs", "sm", "md"]}  // Responsive font sizes
            width={["40px", "45px", "50px"]}  // Responsive widths
            height={["40px", "45px", "50px"]}  // Responsive heights, matching widths
            borderRight={borderRight}
            borderBottom={borderBottom}
            padding="0px"  // Remove padding
            backgroundColor={cell.isHinted ? 'yellow' : (cell.isDefault ? 'black' : 'white')}
            color={cell.isDefault ? 'white' : 'black'}
        />
    );
}

export default Square;
