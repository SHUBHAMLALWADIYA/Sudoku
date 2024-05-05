// src/App.js
import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Button, VStack, Select, useToast ,Image,Grid} from '@chakra-ui/react';
import Board from './components/Board'; // Make sure this path matches your file structure
import { generateSudoku, getHint } from './utils/sudokuGenerator';
import { solveSudoku, checkSudoku } from './utils/sudokuSolver';
import meera from './image/meera.png'
const App = () => {
    const [grid, setGrid] = useState(generateSudoku('easy'));
    const [difficulty, setDifficulty] = useState('easy');
    const [hintedCell, setHintedCell] = useState(null);
    const [timer, setTimer] = useState(0);
    const [timerActive, setTimerActive] = useState(true);
    const toast = useToast();

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (timerActive) {
                setTimer(timer => timer + 1);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timerActive]);

    const handleChange = (e, rowIndex, colIndex) => {
      const value = e.target.value || ''; // Ensure empty string instead of undefined
      const newGrid = grid.map((row, ri) => 
          row.map((cell, ci) => {
              if (ri === rowIndex && ci === colIndex) {
                  return { ...cell, value: value };
              }
              return cell;
          })
      );
      setGrid(newGrid);
  };

    const handleCheck = () => {
        if (checkSudoku(grid)) {
            setTimerActive(false);
            toast({
                title: "Congratulations!",
                description: "You have successfully completed the puzzle!",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Incorrect Solution",
                description: "There seems to be a mistake. Keep trying!",
                status: "warning",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleSolve = () => {
        const solvedGrid = solveSudoku(grid);
        if (solvedGrid) {
            setGrid(solvedGrid);
            setTimerActive(false);
            toast({
                title: "Puzzle Solved.",
                description: "The puzzle was solved successfully!",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Failed to solve.",
                description: "No solution could be found for this puzzle!",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleReset = () => {
        setGrid(generateSudoku(difficulty));
        setHintedCell(null);
        setTimer(0);
        setTimerActive(true);
    };

    const newPuzzle = () => {
        setGrid(generateSudoku(difficulty));
        setHintedCell(null);
        setTimer(0);
        setTimerActive(true);
    };

    const handleHint = () => {
      const hintResult = getHint(grid);
      if (hintResult) {
          const { row, col, hint } = hintResult;
          const newGrid = grid.map((gridRow, ri) =>
              gridRow.map((cell, ci) => {
                  if (ri === row && ci === col) {
                      return { ...cell, value: hint, isHinted: true }; // Mark this cell as hinted
                  }
                  return cell;
              })
          );
          setGrid(newGrid);
          setHintedCell({ row, col });
      } else {
          alert('No hints available or puzzle is complete.');
      }
  };
  

    return (
      <ChakraProvider>
      <Box maxW={{ base: "90vw", md: "450px" }} mx="auto">
          <VStack spacing={4} align="stretch">
              <Box textAlign="center">
                  <h1>Sudoku Game</h1>
                  <Select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} size="sm">
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                  </Select>
              </Box>
              <Box textAlign="center">
                  Timer: {Math.floor(timer / 60)}:{('0' + (timer % 60)).slice(-2)}
              </Box>
              <Board grid={grid} onChange={handleChange} hintedCell={hintedCell} />
              <Grid templateColumns="repeat(auto-fit, minmax(120px, 1fr))" gap={2}>
                  <Button onClick={handleCheck}>Check Solution</Button>
                  <Button colorScheme="blue" onClick={handleSolve}>Solve Puzzle</Button>
                  <Button colorScheme="red" onClick={handleReset}>Reset Puzzle</Button>
                  <Button colorScheme="green" onClick={newPuzzle}>New Puzzle</Button>
                  <Button colorScheme="purple" onClick={handleHint}>Get Hint</Button>
              </Grid>
          </VStack>
      </Box>
  </ChakraProvider>
    );
};

export default App;
