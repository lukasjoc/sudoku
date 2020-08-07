<template>
  <div class="solve">
    <h3>Odd/Even Base Sudoku</h3>
    <Board :data="puzzle"  />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Board from "../components/Board.vue";
import Parser from "../Parser";

export default Vue.extend({
  name: "Edit",
  components: {
    Board,
  },
  data: () => {
    return {
      default_puzzle: "",
      puzzle: [[{}]]
    }
  },
  mounted(){
    this.setDefaultPuzzle()
    this.getPuzzle()
    this.parsePuzzle()
  },
  methods: {
    parsePuzzle() {
      const p = new Parser()
      this.puzzle = p.fromStr(this.default_puzzle)
      // console.log(data)
    },
   setDefaultPuzzle() {
      interface SudokuStringItem {
        id: number,
        puzzle: string,
      }
      let item: SudokuStringItem = {
        "id": 1,
        "puzzle": "1oeoeeoe3ooeo6eooeee3oo1oeee7o1oeeoeoe8eeo5oooeooe3e4oeoo8oo6oeoooe1eeeo6eeeoooo7",
      }
      localStorage.setItem("puzzles", JSON.stringify(item))
    },
    getPuzzle() {
      let puzzleStringObject: any = JSON.parse(localStorage.getItem("puzzles"))
      console.log(`Data: ${puzzleStringObject}`)
      this.default_puzzle = puzzleStringObject.puzzle
    }
  }

});
</script>

