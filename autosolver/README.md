# autosolver
>  Odd/Even Sudoku solver using a recursive backtracking approach

## Get started for development with (devel):
Execute `composer serve` \
Visit `localhost:5050/solve/{VALID_PUZZLE_STRING}`

## How does the solver work?

### Intro:
This solver uses a [recursive](https://en.wikipedia.org/wiki/Recursion) algorithm to solve the sudoku. \
In addion to calling itself it uses [backtracking](https://en.wikipedia.org/wiki/Backtracking) to step back if the solver gets into a dead end.

### In depth:
Firstly we need to find an emty field.
If there isn't an emty field anymore we are done and return true. \
Otherwise the we trie to call a validation function on a numeric range from 1..9 until the validation function \
returns true then we set the value and call the the solver again. \
If the validation function never returns true we use [backtracking](https://en.wikipedia.org/wiki/Backtracking) and reset 
the field to an emty field. \
The solver is done calling itself if it can't find emty fields anymore then it returns true

### This is one approach of 3 common ones
- [Dancing Links](https://en.wikipedia.org/wiki/Dancing_Links)
- [Brute-force search (BFS)](https://en.wikipedia.org/wiki/Brute-force_search)
- Recursion & Backtracking

```php
/**
 * solve
 *
 * @access public
 * @return bool
 */
public function solve(): bool {
  foreach (range(0, 8) as $row) {
    foreach (range(0, 8) as $col) {
      if (!$this->hasEmty($row, $col)) return true; // check for emty cells
      if ($this->puzzle[$row][$col]["value"] == "") { // only do this for emty cells that's why backtracking is important here
        foreach (range(1, 9) as $n) { // range from 1 to 9 inclusively
          if ($this->valid($row, $col, $n, $this->puzzle[$row][$col]["isEven"])) {
            $this->puzzle[$row][$col]["value"] = $n; // set the value $this->valid(..) returned true with
            if ($this->solve()) return true; // recursively calling solve until it returns true then return true and done
            $this->puzzle[$row][$col]["value"] = ""; // backtracking
          };
        }
        return false;
      }
    }
  }
}

```

[lukasjoc](https://lukasjoc.com), 2020
