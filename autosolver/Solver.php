<?php declare(strict_types=1);

/**
 * Solver
 */
class Solver {

  /**
   * puzzle 
   *
   * @var array
   * @access protected
   */
  protected $puzzle = [];

  /**
   * Constructor
   *
   * @param string $str
   * @access public
   */
  function __construct(string $str) {
    if (strlen($str) !== 81) {
      throw new \Exception("Invalid sudoku string");
    }
    $this->puzzle = $this::fromStr($str);
  }

  /**
   * fromStr
   *
   * @param string $chars
   * @static
   * @access private
   * @return array
   */
  private static function fromStr(string $chars): array {
    $arr = [];
    foreach (str_split($chars) as $_ => $ch) {
      $arr_item = [
        "value" => ($ch === "e" || $ch === "o") ? "" : intval($ch),
        "isEven" => ($ch === "e" || ($ch !== "o" && (intval($ch) % 2) === 0)) ? true : false,
        "isOriginal" => ($ch === "e" || $ch === "o") ? false : true,
      ];
      array_push($arr, $arr_item);
    }
    return array_chunk($arr, 9);
  }

  /**
   * valid
   *
   * @param int $row
   * @param int $col
   * @param int $value
   * @param bool $isEven
   * @access public
   * @return bool
   */
  function valid(int $row, int $col, int $value, bool $isEven): bool {

    // check value scope first
    if ($isEven && ($value % 2) !== 0) return false;
    if (!$isEven && ($value % 2) === 0) return false;

    // check row
    foreach (range(0, 8) as $r) {
      if ($this->puzzle[$row][$r]["value"] === $value) return false;
    }

    // check col
    foreach (range(0, 8) as $c) {
      if ($this->puzzle[$c][$col]["value"] === $value) return false;
    }

    // check region
    $x = (int) ((int)($row / 3) * 3);
    $y = (int) ((int)($col / 3) * 3);
    foreach (range(0, 2) as $i) {
      foreach (range(0, 2) as $j) {
        if ($this->puzzle[$i + $x][$j + $y]["value"] === $value) return false;
      }
    }

    return true;
  }

  /**
   * hasEmty
   *
   * @param mixed $row
   * @param mixed $col
   * @access public
   * @return void
   */
  function hasEmty($row, $col) {
    foreach (range(0, 8) as $row) {
      foreach (range(0, 8) as $col) {
        if ($this->puzzle[$row][$col]["value"] == "") return true;
      }
    }
    return false;
  }

  /**
   * solve
   *
   * @access public
   * @return void
   */
  function solve() {
    foreach (range(0, 8) as $row) {
      foreach (range(0, 8) as $col) {
        if (!$this->hasEmty($row, $col)) return true;
        if ($this->puzzle[$row][$col]["value"] == "") {
          foreach (range(1, 9) as $n) {
            if ($this->valid($row, $col, $n, $this->puzzle[$row][$col]["isEven"])) {
              $this->puzzle[$row][$col]["value"] = $n;
              if ($this->solve()) return true;
              $this->puzzle[$row][$col]["value"] = "";
            };
          }
          return false;
        }
      }
    }
  }

  /**
   * getSolvedPuzzle
   *
   * @access public
   * @return string
   */
  function getSolvedPuzzle(): string {
    return json_encode($this->puzzle);
  }
}
