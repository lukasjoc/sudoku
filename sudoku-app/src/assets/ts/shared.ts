"use-strict";

import client from "./axios"

import { SudokuGrid } from "@/@types/shims-sudoku";
import Parser from "./Parser";

export function changePageTitle(title: string): void {
  document.title = title;
};

// const parser = new Parser();
export function parseString(puzzle: string): SudokuGrid {
  const parser = new Parser();
  let data: SudokuGrid = parser.fromStr(puzzle);
  return data;
};

export function fromData(data: SudokuGrid): string {
  const parser = new Parser()
  return parser.fromData(data)
}

export function showMessage(message: string): void {
  alert(message);
};

export async function solvePuzzle(puzzle: string) {
  try {
    let target: string = `http://localhost:5050/solve/${puzzle}`
    let res = await client.get(target);
    return JSON.parse(res.data)
  } catch (err) {
    showMessage(`${err}: Server isn't reachable`)
  }
}

export function checkValue(data: SudokuGrid, row: number, col: number, value: number, isEven: boolean): boolean {
  if ((isEven && value % 2 !== 0) || (!isEven && value % 2 === 0)) {
    return true;
  }

  // search in row for dup value
  for (let c = 0; c < 9; c++) {
    if (data[row][c].value === value && c !== col) {
      return true;
    }
  }

  // search in column for dup value
  for (let r = 0; r < 9; r++) {
    if (data[r][col].value === value && r !== row) {
      return true;
    }
  }

  // search in region for dup value
  const rowStart = Math.floor(row / 3) * 3;
  const colStart = Math.floor(col / 3) * 3;
  for (let r = rowStart; r < rowStart + 3; r += 1) {
    for (let c = colStart; c < colStart + 3; c += 1) {
      if (data[r][c].value === value && !(r === row && c === col)) {
        return true;
      }
    }
  }
  return false;
}