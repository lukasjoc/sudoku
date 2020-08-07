// Types and declarations for the Sudoku App and Parser

// SudokuStringItem defines how the Sudoku is saved in the localStorage
export interface SudokuStringItem {
  id: number,
  puzzle: string,
}
export type SudokuStringItems = SudokuStringItem[]

// SudokuCell defines the data for a single SudokuCell
export interface SudokuCell {
  value?: string,
  isEven: boolean,
  isOriginal: boolean
}

// SudokuGrid defines the 2D Data Structure for a 9x9 Sudoku Grid
export type SudokuGrid = SudokuCell[][]

// SudokuParser defines functions a SudokuParser has to at least implement
export interface SudokuDataParser {
  fromStr(s: string): SudokuGrid
  fromData(data: SudokuGrid): string
}
