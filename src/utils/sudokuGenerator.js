export function generateSudoku(difficulty) {
  let grid = Array.from({ length: 9 }, () => 
      Array.from({ length: 9 }, () => ({ value: '', isDefault: false })));
  fillGrid(grid);
  removeNumbers(grid, difficulty);
  return grid;
}

function fillGrid(grid) {
  let empty = findEmpty(grid);
  if (!empty) {
      return true; // No empty cells, puzzle solved
  }
  let [row, col] = empty;

  const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  for (let num of numbers) {
      if (isValid(grid, row, col, num.toString())) {
          grid[row][col].value = num.toString(); // Corrected to maintain object structure
          grid[row][col].isDefault = true; // Set isDefault to true when filling grid initially
          if (fillGrid(grid)) {
              return true; // If successful, propagate true
          }
          grid[row][col] = { value: '', isDefault: false }; // Reset maintaining the structure
      }
  }
  return false; // Trigger backtracking
}

function removeNumbers(grid, difficulty) {
  let attempts = difficulty === 'easy' ? 20 : difficulty === 'medium' ? 40 : difficulty === 'hard' ? 60 : 20;
  while (attempts > 0) {
      let row = Math.floor(Math.random() * 9);
      let col = Math.floor(Math.random() * 9);
      if (grid[row][col].value !== '') {
          grid[row][col] = { value: '', isDefault: false }; // Maintain structure when removing numbers
          attempts--;
      }
  }
}

function findEmpty(grid) {
  for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
          if (grid[row][col].value === '') return [row, col];
      }
  }
  return null;
}

function isValid(grid, row, col, num) {
  for (let i = 0; i < 9; i++) {
      if (grid[row][i].value === num && i !== col) return false;
      if (grid[i][col].value === num && i !== row) return false;
      let boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
      let boxCol = 3 * Math.floor(col / 3) + i % 3;
      if (grid[boxRow][boxCol].value === num && !(boxRow === row && boxCol === col)) return false;
  }
  return true;
}

export function getHint(grid) {
  for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
          if (grid[row][col].value === '') { // Find the first empty cell
              const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
              for (let num of numbers) {
                  if (isValid(grid, row, col, num.toString())) {
                      return { row, col, hint: num.toString() };
                  }
              }
          }
      }
  }
  return null; // No hints available or puzzle is complete
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // ES6 array destructuring swap
  }
  return array;
}
