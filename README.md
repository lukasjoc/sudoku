# sudoku

> Odd/Even Sudoku App and Solving API

The Sudoku Size is 9x9 and generally a good Sudoku Puzzle only has 1 solution

## How does Sudoku work?
Rules --> You cant write the same number:
- vertivally
- horizontally
- in a box of 3x3
- diagonally

## Specialities (Odd/Even Sudoku):
- colored boxes can ONLY contain even numbers
- all other boxes MUST contain ONLY odd numbers

## Setup:
- `docker-compose up --build -d` the server
- `docker-compose up --build -d` the vue app

--> Visit localhost:3000
