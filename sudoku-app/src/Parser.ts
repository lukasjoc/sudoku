"use-strict"

import { SudokuDataParser, SudokuGrid, SudokuCell } from '@/shims-sudoku'

// Sudoku Parser offers methods to parse from string and to data structure and vice versa
class Parser implements SudokuDataParser {

  // fromData parses from Array of Arrays of Objects to a simple string representation
  fromData(data: SudokuGrid): string {
    let tmpl: string = ""
    for (const x of data) {
      for (const y of x) {
        if (y.value) {
          tmpl += y.value
        } else if (y.isEven) {
          tmpl += 'e'
        } else {
          tmpl += 'o'
        }
      }
    }
    return tmpl
  }

  // fromString parses from string to Array of Arrays of Objects representaton
  fromStr(chars: string): SudokuGrid {
    const arr: SudokuCell[] = []
    let ch: any;
    for (ch of chars) {
      const arr_item: SudokuCell = {
        "value": (ch === 'e' || ch === 'o') ? '' : parseInt(ch),
        "isEven": (ch === 'e' || (ch % 2) === 0) ? true : false,
        "isOriginal": (ch === 'e' || ch === 'o') ? false : true
      }
      arr.push(arr_item)
    }

    const res: SudokuGrid = []
    while (arr.length) res.push(arr.splice(0, 9))
    return res
  }

}

export default Parser
