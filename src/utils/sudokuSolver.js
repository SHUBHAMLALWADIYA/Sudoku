// solveSudoku.js
function findEmpty(grid) {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (grid[r][c].value === '') return { row: r, col: c };
        }
    }
    return null;
}

function isValid(grid, row, col, num) {
    const blockRow = Math.floor(row / 3) * 3;
    const blockCol = Math.floor(col / 3) * 3;

    for (let i = 0; i < 9; i++) {
        if (grid[row][i].value === num || grid[i][col].value === num) {
            return false;
        }
        const boxRow = blockRow + Math.floor(i / 3);
        const boxCol = blockCol + i % 3;
        if (grid[boxRow][boxCol].value === num) {
            return false;
        }
    }
    return true;
}

function solve(grid) {
    const empty = findEmpty(grid);
    if (!empty) {
        return true; // Puzzle solved
    }

    const { row, col } = empty;
    for (let num = 1; num <= 9; num++) {
        const numStr = num.toString();
        if (isValid(grid, row, col, numStr)) {
            grid[row][col].value = numStr; // Try this number

            if (solve(grid)) {
                return true; // If it leads to a solution, return true
            }

            grid[row][col].value = ''; // Otherwise, backtrack
        }
    }

    return false; // Trigger backtracking
}

export function solveSudoku(grid) {
    const newGrid = JSON.parse(JSON.stringify(grid)); // Make a deep copy to avoid directly mutating state
    if (solve(newGrid)) {
        return newGrid;
    }
    return false;
}


  export function checkSudoku(grid) {
    let rows = new Array(9).fill().map(() => new Set());
    let cols = new Array(9).fill().map(() => new Set());
    let boxes = new Array(9).fill().map(() => new Set());

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const num = grid[r][c].value;

            if (num === '') continue; // Skip empty cells

            const boxIndex = Math.floor(r / 3) * 3 + Math.floor(c / 3);

            if (rows[r].has(num) || cols[c].has(num) || boxes[boxIndex].has(num)) {
                return false; // Found a duplicate
            }

            rows[r].add(num);
            cols[c].add(num);
            boxes[boxIndex].add(num);
        }
    }

    return true; // No duplicates found, sudoku is correct
}
