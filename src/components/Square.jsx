



import React from 'react';
import { Input } from '@chakra-ui/react';

function Square({ cell, onChange, rowIndex, colIndex, isBorderRight, isBorderBottom }) {
    const handleChange = (e) => {
        if (!cell.isDefault) {
            onChange(e, rowIndex, colIndex);
        }
    };

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
            borderColor={cell.isHinted ? 'blue' : 'gray.300'}
            _hover={{ borderColor: 'gray.400' }}
            fontSize={["xs", "sm", "md"]}  // Responsive font size
            width={["40px", "45px", "50px"]}  // Responsive widths
            height={["40px", "45px", "50px"]}  // Responsive heights
            border-Color={isBorderRight || isBorderBottom ? "black" : "gray.300"}
            borderWidth="2px"
            backgroundColor={cell.isHinted ? 'yellow' : (cell.isDefault ? 'white' : 'white')}
            color={cell.isDefault ? 'black' : 'black'}
        />
    );
}

export default Square;
